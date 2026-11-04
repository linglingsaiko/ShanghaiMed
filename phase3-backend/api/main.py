"""Phase 3 medical-records API.

Run from the project directory:
    uvicorn api.main:app --host 0.0.0.0 --port 8000

AI credentials are intentionally not read or stored here. The AI pipeline in
``lib/ai_pipeline.py`` is responsible for reading its credentials from
``lib/config.py``.

By default, POST /api/analyze waits for the analysis and returns the free
preview. Clients that prefer polling can call POST /api/analyze?wait=false and
then poll GET /api/status/{task_id}.

This prototype keeps metadata and reports in memory. Use one Uvicorn worker;
a shared persistent store is required before running multiple workers.
"""

from __future__ import annotations

import asyncio
import inspect
import logging
import math
import os
import sys
import time
import uuid
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable, Deque, Dict, Optional

import aiofiles
from fastapi import FastAPI, File, HTTPException, Query, Request, UploadFile
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

# Support both `uvicorn api.main:app` from the project root and
# `uvicorn main:app` from the api/ directory.
PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

logger = logging.getLogger("medical_records_api")
logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO").upper(),
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)


def _env_int(name: str, default: int) -> int:
    try:
        value = int(os.getenv(name, str(default)))
        return value if value > 0 else default
    except (TypeError, ValueError):
        return default


# The directory is dedicated to this service and contains original uploads only.
TEMP_DIR = Path(
    os.getenv("MEDICAL_RECORDS_TEMP_DIR", "/tmp/medical-records")
).expanduser().resolve()
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB per file, enforced while streaming.
MAX_FILES_PER_BATCH = 20
UPLOAD_CHUNK_SIZE = 1024 * 1024
UPLOAD_TTL_SECONDS = _env_int("UPLOAD_TTL_SECONDS", 24 * 60 * 60)
RESULT_TTL_SECONDS = _env_int("RESULT_TTL_SECONDS", 7 * 24 * 60 * 60)
CLEANUP_INTERVAL_SECONDS = _env_int("CLEANUP_INTERVAL_SECONDS", 15 * 60)
ALLOWED_EXTENSIONS = {".jpg", ".png", ".pdf", ".zip"}

# In-memory prototype stores. File contents are never placed in these stores.
_uploads: Dict[str, "UploadedRecord"] = {}
_tasks: Dict[str, "AnalysisTask"] = {}
_store_lock = asyncio.Lock()
_background_jobs: set[asyncio.Task] = set()


@dataclass
class UploadedRecord:
    file_id: str
    original_name: str
    stored_name: str
    path: Optional[Path]
    size: int
    content_type: Optional[str]
    created_at: float
    status: str = "uploaded"
    analysis_task_id: Optional[str] = None


@dataclass
class AnalysisTask:
    task_id: str
    file_ids: list[str]
    created_at: float
    updated_at: float
    status: str = "queued"
    current_step: str = "queued"
    progress: int = 0
    preview: Any = None
    error: Optional[str] = None
    error_status: int = 500
    # Private: never serialize this field in the free preview/status response.
    result: Any = field(default=None, repr=False)


class AnalyzeRequest(BaseModel):
    file_ids: list[str] = Field(..., min_length=1, max_length=20)


class ReportRequest(BaseModel):
    file_id: str = Field(..., min_length=1, max_length=64)
    payment_proof: str = Field(..., min_length=1, max_length=4096)


class SlidingWindowRateLimiter:
    """Small in-memory limiter suitable for this single-process prototype."""

    def __init__(self) -> None:
        self._hits: Dict[tuple[str, str], Deque[float]] = defaultdict(deque)
        self._lock = asyncio.Lock()

    async def check(self, key: tuple[str, str], limit: int, window: int = 60) -> int:
        now = time.monotonic()
        async with self._lock:
            hits = self._hits[key]
            while hits and hits[0] <= now - window:
                hits.popleft()
            if len(hits) >= limit:
                retry_after = max(1, math.ceil(window - (now - hits[0])))
                if not hits:
                    self._hits.pop(key, None)
                return retry_after
            hits.append(now)
            # Avoid keeping empty/inactive buckets indefinitely.
            if len(self._hits) > 5000:
                for old_key in list(self._hits):
                    old_hits = self._hits[old_key]
                    if not old_hits or old_hits[-1] <= now - window:
                        self._hits.pop(old_key, None)
            return 0


_rate_limiter = SlidingWindowRateLimiter()


def _iso(timestamp: float) -> str:
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).isoformat()


def _task_public(task: AnalysisTask) -> dict[str, Any]:
    """Whitelist public fields so a paid/full report cannot leak via status."""
    response: dict[str, Any] = {
        "task_id": task.task_id,
        "status": task.status,
        "current_step": task.current_step,
        "progress": task.progress,
        "file_ids": task.file_ids,
        "created_at": _iso(task.created_at),
        "updated_at": _iso(task.updated_at),
        "status_url": f"/api/status/{task.task_id}",
        "preview": task.preview if task.status == "completed" else None,
    }
    if task.status == "failed":
        response["error"] = task.error or "Analysis failed."
    return response


def _include_safety_notes(result: dict[str, Any], content: Any) -> Any:
    """Keep urgent/safety information outside the paid-report boundary."""
    notes = {
        key: result[key]
        for key in ("emergency_message", "safety_notes")
        if key in result
    }
    if not notes:
        return content
    if isinstance(content, dict):
        return {**content, **notes}
    return {"content": content, **notes}


def _free_preview(result: Any) -> Any:
    """Select the pipeline's free preview without exposing its full report."""
    if isinstance(result, dict):
        for key in ("preview", "free_preview", "report_preview"):
            if key in result:
                return _include_safety_notes(result, result[key])

        # Common pipeline shape: summary/findings plus a separate full report.
        preview = {
            key: result[key]
            for key in ("summary", "key_findings", "recommendations", "disclaimer")
            if key in result
        }
        if preview:
            return _include_safety_notes(result, preview)
        if any(key in result for key in ("full_report", "report_full", "report")):
            return _include_safety_notes(
                result,
                {"message": "Analysis complete. The full report is available after payment."},
            )

    # Pipelines without a separate paid report may return a preview directly.
    return result


def _full_report(result: Any) -> Any:
    if isinstance(result, dict):
        for key in ("full_report", "report_full", "report"):
            if key in result:
                return _include_safety_notes(result, result[key])
    return result


class PipelineUnavailableError(RuntimeError):
    pass


def _resolve_pipeline() -> Callable[..., Any]:
    """Resolve the AI pipeline lazily so config errors become safe API errors.

    Preferred contract:
        analyze_medical_records(file_paths: list[str]) -> dict

    For interoperability, the common aliases below are also accepted. A return
    value may contain ``preview``/``free_preview``/``report_preview`` and
    ``full_report``/``report_full``/``report``.
    """
    try:
        from lib import ai_pipeline
    except (ImportError, ModuleNotFoundError) as exc:
        raise PipelineUnavailableError("AI analysis pipeline is unavailable.") from exc

    for name in (
        "analyze_medical_records",
        "analyze_files",
        "run_analysis_pipeline",
        "run_pipeline",
        "analyze",
    ):
        function = getattr(ai_pipeline, name, None)
        if callable(function):
            return function
    raise PipelineUnavailableError(
        "lib/ai_pipeline.py does not expose a supported analysis function."
    )


async def _invoke_pipeline(
    file_paths: list[str], task_id: str, progress_callback: Callable[..., Any]
) -> Any:
    function = _resolve_pipeline()

    # Pass only arguments explicitly supported by the pipeline. This avoids
    # swallowing a TypeError raised *inside* the pipeline and retrying it.
    try:
        parameters = inspect.signature(function).parameters
    except (TypeError, ValueError):
        parameters = {}

    args: list[Any] = []
    kwargs: dict[str, Any] = {}
    accepts_kwargs = any(
        parameter.kind == inspect.Parameter.VAR_KEYWORD
        for parameter in parameters.values()
    )

    if "file_paths" in parameters or accepts_kwargs:
        kwargs["file_paths"] = file_paths
    elif "paths" in parameters:
        kwargs["paths"] = file_paths
    elif "files" in parameters:
        kwargs["files"] = file_paths
    else:
        args.append(file_paths)

    if "task_id" in parameters:
        kwargs["task_id"] = task_id
    if "progress_callback" in parameters:
        kwargs["progress_callback"] = progress_callback
    elif "callback" in parameters:
        kwargs["callback"] = progress_callback

    if inspect.iscoroutinefunction(function):
        return await function(*args, **kwargs)

    result = await asyncio.to_thread(function, *args, **kwargs)
    if inspect.isawaitable(result):
        return await result
    return result


def _unlink(path: Optional[Path]) -> None:
    if path is None:
        return
    try:
        path.unlink(missing_ok=True)
    except OSError:
        # Do not expose server paths in a client response.
        logger.exception("Could not delete a temporary medical-record file")


async def _save_upload(upload: UploadFile) -> UploadedRecord:
    original_name = Path((upload.filename or "").replace("\x00", "")).name
    if not original_name:
        raise HTTPException(status_code=400, detail="Every upload must have a filename.")

    extension = Path(original_name).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Unsupported file type '{extension or '(none)'}'. "
                "Allowed types: jpg, png, pdf, zip."
            ),
        )

    file_id = str(uuid.uuid4())
    stored_name = f"{file_id}{extension}"
    destination = TEMP_DIR / stored_name
    size = 0

    try:
        async with aiofiles.open(destination, "wb") as output:
            while chunk := await upload.read(UPLOAD_CHUNK_SIZE):
                size += len(chunk)
                if size > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=413,
                        detail=f"File '{original_name}' exceeds the 50 MB limit.",
                    )
                await output.write(chunk)
        if size == 0:
            raise HTTPException(
                status_code=400, detail=f"File '{original_name}' is empty."
            )
        os.chmod(destination, 0o600)
    except Exception:
        _unlink(destination)
        raise

    record = UploadedRecord(
        file_id=file_id,
        original_name=original_name,
        stored_name=stored_name,
        path=destination,
        size=size,
        content_type=upload.content_type,
        created_at=time.time(),
    )
    async with _store_lock:
        _uploads[file_id] = record
    return record


async def _run_analysis(task_id: str, paths: list[Path]) -> None:
    task = _tasks.get(task_id)
    if task is None:
        return

    def progress_callback(step: Any, progress: Optional[int] = None) -> None:
        current = _tasks.get(task_id)
        if current is None:
            return
        current.current_step = str(step)[:200]
        if progress is not None:
            current.progress = max(0, min(99, int(progress)))
        current.updated_at = time.time()

    task.status = "processing"
    task.current_step = "validating_uploaded_files"
    task.progress = 5
    task.updated_at = time.time()

    try:
        task.current_step = "ai_analysis"
        task.progress = 20
        task.updated_at = time.time()
        result = await _invoke_pipeline(
            [str(path) for path in paths], task_id, progress_callback
        )
        if isinstance(result, dict) and (
            result.get("success") is False or result.get("status") == "error"
        ):
            raise RuntimeError("The AI pipeline returned an unsuccessful result.")

        task.current_step = "generating_free_preview"
        task.progress = 90
        task.updated_at = time.time()
        task.result = jsonable_encoder(result)
        task.preview = jsonable_encoder(_free_preview(task.result))
        task.status = "completed"
        task.current_step = "completed"
        task.progress = 100
        task.error = None
        task.updated_at = time.time()
        logger.info("Analysis task %s completed", task_id)
    except asyncio.CancelledError:
        task.status = "failed"
        task.current_step = "cancelled"
        task.error = "Analysis was cancelled."
        task.updated_at = time.time()
        raise
    except Exception as exc:
        task.status = "failed"
        task.current_step = "failed"
        task.error_status = 503 if isinstance(exc, PipelineUnavailableError) else 500
        task.error = (
            "AI analysis pipeline is unavailable."
            if isinstance(exc, PipelineUnavailableError)
            else "AI analysis failed. Please try again later."
        )
        task.updated_at = time.time()
        # Log the exception for operators, but never log file contents/payment data.
        logger.exception("Analysis task %s failed", task_id)
    finally:
        # Original medical records are removed after every analysis attempt,
        # including pipeline failures. Only the derived report remains in memory.
        async with _store_lock:
            for file_id in task.file_ids:
                record = _uploads.get(file_id)
                if record is None:
                    continue
                _unlink(record.path)
                record.path = None
                record.status = "deleted"
        logger.info("Original files removed for analysis task %s", task_id)


def _schedule_analysis(task_id: str, paths: list[Path]) -> None:
    job = asyncio.create_task(_run_analysis(task_id, paths))
    _background_jobs.add(job)
    job.add_done_callback(_background_jobs.discard)


async def _cleanup_expired() -> None:
    now = time.time()
    async with _store_lock:
        expired_uploads = [
            file_id
            for file_id, record in _uploads.items()
            if record.status == "uploaded"
            and now - record.created_at > UPLOAD_TTL_SECONDS
        ]
        for file_id in expired_uploads:
            record = _uploads.pop(file_id)
            _unlink(record.path)

        expired_tasks = [
            task_id
            for task_id, task in _tasks.items()
            if task.status in {"completed", "failed"}
            and now - task.updated_at > RESULT_TTL_SECONDS
        ]
        for task_id in expired_tasks:
            task = _tasks.pop(task_id)
            for file_id in task.file_ids:
                record = _uploads.pop(file_id, None)
                if record is not None:
                    _unlink(record.path)

    # Also clean orphaned files left by an interrupted process. Only files in
    # the service's dedicated directory and older than the upload TTL are used.
    if TEMP_DIR.exists():
        for path in TEMP_DIR.iterdir():
            try:
                if path.is_file() and now - path.stat().st_mtime > UPLOAD_TTL_SECONDS:
                    _unlink(path)
            except OSError:
                logger.exception("Could not inspect an expired temporary file")


async def _cleanup_loop() -> None:
    while True:
        await asyncio.sleep(CLEANUP_INTERVAL_SECONDS)
        try:
            await _cleanup_expired()
        except Exception:
            logger.exception("Temporary-file cleanup pass failed")


@asynccontextmanager
async def lifespan(_: FastAPI):
    TEMP_DIR.mkdir(parents=True, exist_ok=True, mode=0o700)
    try:
        os.chmod(TEMP_DIR, 0o700)
    except OSError:
        logger.warning("Could not restrict permissions on the temporary directory")
    await _cleanup_expired()
    cleaner = asyncio.create_task(_cleanup_loop())
    try:
        yield
    finally:
        cleaner.cancel()
        jobs = list(_background_jobs)
        for job in jobs:
            job.cancel()
        await asyncio.gather(cleaner, *jobs, return_exceptions=True)


app = FastAPI(
    title="ShanghaiMed Medical Records API",
    version="1.0.0",
    description="Phase 3 upload, AI preview, simulated-payment report API.",
    lifespan=lifespan,
)

_cors_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ALLOW_ORIGINS", "*").split(",")
    if origin.strip()
] or ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials="*" not in _cors_origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
)


@app.middleware("http")
async def rate_limit_requests(request: Request, call_next):
    if request.method == "OPTIONS":
        return await call_next(request)

    path = request.url.path
    if path == "/api/upload":
        bucket, limit = "upload", 12
    elif path == "/api/analyze":
        bucket, limit = "analyze", 6
    elif path == "/api/report":
        bucket, limit = "report", 12
    elif path.startswith("/api/status/"):
        bucket, limit = "status", 120
    else:
        bucket, limit = "general", 60

    # Do not trust X-Forwarded-For unless the app is deployed behind a trusted
    # proxy that overwrites it. This prevents trivial rate-limit bypassing.
    client_ip = request.client.host if request.client else "unknown"
    retry_after = await _rate_limiter.check((client_ip, bucket), limit)
    if retry_after:
        return JSONResponse(
            status_code=429,
            content={"detail": "Rate limit exceeded. Please try again later."},
            headers={"Retry-After": str(retry_after)},
        )
    return await call_next(request)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception(
        "Unhandled API error: method=%s path=%s", request.method, request.url.path
    )
    return JSONResponse(status_code=500, content={"detail": "Internal server error."})


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/upload")
async def upload_files(files: list[UploadFile] = File(...)) -> dict[str, Any]:
    """Upload one or more jpg/png/pdf/zip files, each no larger than 50 MB."""
    if not files:
        raise HTTPException(status_code=400, detail="At least one file is required.")
    if len(files) > MAX_FILES_PER_BATCH:
        raise HTTPException(
            status_code=400,
            detail=f"No more than {MAX_FILES_PER_BATCH} files may be uploaded at once.",
        )

    created_ids: list[str] = []
    try:
        for upload in files:
            record = await _save_upload(upload)
            created_ids.append(record.file_id)
    except Exception:
        # A failed batch must not leave unknown/orphaned uploads behind.
        async with _store_lock:
            for file_id in created_ids:
                record = _uploads.pop(file_id, None)
                if record is not None:
                    _unlink(record.path)
        raise
    finally:
        for upload in files:
            try:
                await upload.close()
            except Exception:
                logger.warning("Could not close an uploaded file", exc_info=True)

    responses = []
    for file_id in created_ids:
        record = _uploads[file_id]
        responses.append(
            {
                "file_id": record.file_id,
                "filename": record.original_name,
                "size": record.size,
                "content_type": record.content_type,
                "status": record.status,
            }
        )
    logger.info("Accepted an upload batch containing %d file(s)", len(responses))
    return {
        "status": "success",
        "count": len(responses),
        "file_ids": created_ids,
        "files": responses,
    }


@app.post("/api/analyze")
async def analyze_files(
    payload: AnalyzeRequest,
    wait: bool = Query(
        True,
        description="Wait for the free preview; set false to receive HTTP 202 and poll status.",
    ),
):
    """Analyze uploaded files and return a free preview (or a polling handle)."""
    file_ids = list(dict.fromkeys(file_id.strip() for file_id in payload.file_ids))
    if any(not file_id for file_id in file_ids):
        raise HTTPException(status_code=422, detail="File IDs cannot be blank.")

    now = time.time()
    task_id = str(uuid.uuid4())
    async with _store_lock:
        records = []
        for file_id in file_ids:
            record = _uploads.get(file_id)
            if record is None:
                raise HTTPException(
                    status_code=404, detail=f"File ID not found: {file_id}"
                )
            if record.status != "uploaded" or record.path is None:
                raise HTTPException(
                    status_code=409,
                    detail=f"File {file_id} is not available for a new analysis.",
                )
            if not record.path.is_file():
                raise HTTPException(
                    status_code=410,
                    detail=f"Uploaded file is no longer available: {file_id}",
                )
            records.append(record)

        task = AnalysisTask(
            task_id=task_id,
            file_ids=file_ids,
            created_at=now,
            updated_at=now,
        )
        _tasks[task_id] = task
        paths = []
        for record in records:
            record.status = "analyzing"
            record.analysis_task_id = task_id
            # The existence check above guarantees this is a Path.
            paths.append(record.path)  # type: ignore[arg-type]

    if wait:
        await _run_analysis(task_id, paths)
        task = _tasks[task_id]
        if task.status == "failed":
            raise HTTPException(
                status_code=task.error_status,
                detail={"task_id": task_id, "message": task.error},
            )
        return _task_public(task)

    _schedule_analysis(task_id, paths)
    return JSONResponse(status_code=202, content=_task_public(task))


@app.post("/api/report")
async def get_full_report(payload: ReportRequest) -> dict[str, Any]:
    """Return the cached full report after simulated payment verification.

    Any non-blank proof is accepted in this prototype except explicit failure
    values such as ``failed``, ``invalid``, ``rejected`` or ``mock_failed``.
    No real charge is created and no payment credential is persisted or logged.
    """
    proof = payload.payment_proof.strip()
    if not proof:
        raise HTTPException(status_code=422, detail="Payment proof cannot be blank.")

    failure_values = {
        "fail",
        "failed",
        "failure",
        "invalid",
        "rejected",
        "mock_fail",
        "mock_failed",
    }
    if proof.lower() in failure_values:
        raise HTTPException(
            status_code=402, detail="Simulated payment verification failed."
        )

    file_id = payload.file_id.strip()
    async with _store_lock:
        record = _uploads.get(file_id)
        if record is None:
            raise HTTPException(status_code=404, detail="File ID not found.")
        if not record.analysis_task_id:
            raise HTTPException(
                status_code=409,
                detail="Analyze this file before requesting its full report.",
            )
        task = _tasks.get(record.analysis_task_id)
        if task is None:
            raise HTTPException(status_code=410, detail="The analysis result has expired.")
        if task.status != "completed":
            raise HTTPException(
                status_code=409,
                detail={
                    "message": "Analysis is not complete.",
                    "task_id": task.task_id,
                    "status": task.status,
                    "status_url": f"/api/status/{task.task_id}",
                },
            )
        full_report = _full_report(task.result)
        task_id = task.task_id

    # This boolean describes a simulation only; it is not a real payment claim.
    logger.info("Simulated payment accepted for report task %s", task_id)
    return {
        "file_id": file_id,
        "task_id": task_id,
        "payment_verified": True,
        "payment_mode": "simulated",
        "full_report": full_report,
        "generated_at": _iso(time.time()),
    }


@app.get("/api/status/{task_id}")
async def get_task_status(task_id: str) -> dict[str, Any]:
    async with _store_lock:
        task = _tasks.get(task_id)
        if task is None:
            raise HTTPException(status_code=404, detail="Task ID not found.")
        return _task_public(task)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "api.main:app",
        host=os.getenv("HOST", "127.0.0.1"),
        port=_env_int("PORT", 8000),
        reload=False,
    )
