"""Phase 3 medical-records API.

Run from the project directory:
    uvicorn api.main:app --host 0.0.0.0 --port 8000

AI credentials are intentionally not read or stored here. The AI pipeline in
``lib/ai_pipeline.py`` is responsible for reading its credentials from
``lib/config.py``.

By default, POST /api/analyze waits for the analysis and returns the free
preview. Clients that prefer polling can call POST /api/analyze?wait=false and
then poll GET /api/status/{task_id}.

Metadata and reports persist in SQLite (MEDICAL_RECORDS_DB); uploaded files
live under MEDICAL_RECORDS_TEMP_DIR. Point both at a mounted volume in
production so data survives deploys. Use one Uvicorn worker.
"""

from __future__ import annotations

import asyncio
import copy
import inspect
import json
import logging
import math
import os
import sqlite3
import sys
import time
import uuid
from decimal import Decimal, InvalidOperation

import httpx
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable, Deque, Dict, Optional

import aiofiles
from fastapi import FastAPI, File, HTTPException, Query, Request, Response, UploadFile
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

# Support both `uvicorn api.main:app` from the project root and
# `uvicorn main:app` from the api/ directory.
PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from api import report_mail
from api.report_security import (
    BrowserSession,
    EmailOTP,
    PaymentOrder,
    ReportAccess,
    User,
    email_key,
    hash_secret,
    hash_session_token,
    mask_email,
    new_access_code,
    new_otp_code,
    new_report_id,
    new_session_token,
    normalize_email,
    verify_secret,
)

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
MAX_FILE_SIZE = _env_int("MAX_FILE_SIZE_BYTES", 20 * 1024 * 1024)
MAX_BATCH_SIZE = _env_int("MAX_BATCH_SIZE_BYTES", 50 * 1024 * 1024)
MAX_UPLOAD_REQUEST_SIZE = MAX_BATCH_SIZE + 1024 * 1024
MAX_FILES_PER_BATCH = 20
UPLOAD_CHUNK_SIZE = 1024 * 1024
UPLOAD_TTL_SECONDS = _env_int("UPLOAD_TTL_SECONDS", 24 * 60 * 60)
RESULT_TTL_SECONDS = _env_int("RESULT_TTL_SECONDS", 7 * 24 * 60 * 60)
PAID_RESULT_TTL_SECONDS = _env_int("PAID_RESULT_TTL_SECONDS", 180 * 24 * 60 * 60)
SESSION_TTL_SECONDS = _env_int("SESSION_TTL_SECONDS", 30 * 24 * 60 * 60)
OTP_TTL_SECONDS = _env_int("OTP_TTL_SECONDS", 10 * 60)
OTP_RESEND_SECONDS = _env_int("OTP_RESEND_SECONDS", 60)
OTP_MAX_ATTEMPTS = _env_int("OTP_MAX_ATTEMPTS", 5)
SESSION_COOKIE_NAME = os.getenv("SESSION_COOKIE_NAME", "smed_session").strip() or "smed_session"
CLEANUP_INTERVAL_SECONDS = _env_int("CLEANUP_INTERVAL_SECONDS", 15 * 60)
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif", ".tif", ".tiff", ".heic", ".heif", ".pdf", ".zip"}

# Stores are initialized after the dataclass definitions below (SQLite-backed).
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
    # Ownership hashes are server-side only; raw session tokens are never stored.
    # Optional defaults keep pre-report-center SQLite/Upstash rows deserializable.
    owner_session_hash: Optional[str] = None
    owner_user_id: Optional[str] = None


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
    pipeline_error: Any = field(default=None, repr=False)


_UPSTASH_URL = os.getenv("UPSTASH_REDIS_REST_URL", "").strip()
_UPSTASH_TOKEN = os.getenv("UPSTASH_REDIS_REST_TOKEN", "").strip()
_UPSTASH_PREFIX = "smed:v1"


class PersistenceError(RuntimeError):
    """A required state transition was not durably persisted."""


class _UpstashClient:
    """Minimal synchronous REST client for Upstash Redis (https://upstash.com)."""

    def __init__(self, url: str, token: str) -> None:
        self._url = url.rstrip("/")
        self._token = token

    def command(self, *args: Any) -> Any:
        response = httpx.post(
            self._url,
            json=[*args],
            headers={"Authorization": f"Bearer {self._token}"},
            timeout=10.0,
        )
        response.raise_for_status()
        payload = response.json()
        if payload.get("error"):
            raise RuntimeError(payload["error"])
        return payload.get("result")

    def pipeline(self, commands: list) -> list:
        response = httpx.post(
            f"{self._url}/pipeline",
            json=commands,
            headers={"Authorization": f"Bearer {self._token}"},
            timeout=15.0,
        )
        response.raise_for_status()
        payload = response.json()
        if not isinstance(payload, list) or len(payload) != len(commands):
            raise PersistenceError("Upstash pipeline returned an invalid response")
        for item in payload:
            if not isinstance(item, dict):
                raise PersistenceError("Upstash pipeline returned an invalid item")
            if item.get("error"):
                raise PersistenceError("Upstash pipeline command failed")
        return payload


class _JsonStore:
    """Mapping with an in-memory mirror and a pluggable persistence backend.

    When Upstash Redis credentials are configured, every write is mirrored to
    the cloud and the store is rehydrated from it on startup, so uploads/tasks
    survive Railway deploys and container restarts. Otherwise a local SQLite
    file is used as a best-effort fallback.
    """

    def __init__(self, db_path: Path, table: str, to_json, from_json) -> None:
        self._table = table
        self._to_json = to_json
        self._from_json = from_json
        self._data: Dict[str, Any] = {}
        self._remote: Optional[_UpstashClient] = None
        self._conn: Optional[sqlite3.Connection] = None
        if _UPSTASH_URL and _UPSTASH_TOKEN:
            self._remote = _UpstashClient(_UPSTASH_URL, _UPSTASH_TOKEN)
            self._load_remote()
        else:
            db_path.parent.mkdir(parents=True, exist_ok=True)
            self._conn = sqlite3.connect(str(db_path), check_same_thread=False)
            self._conn.execute(
                f"CREATE TABLE IF NOT EXISTS {table} (key TEXT PRIMARY KEY, value TEXT NOT NULL)"
            )
            self._conn.commit()
            self._load_local()
        backend = "upstash" if self._remote is not None else "sqlite"
        self._last_synced: Dict[str, str] = {}
        for key, item in self._data.items():
            self._last_synced[key] = json.dumps(self._to_json(item), ensure_ascii=False, default=str)
        logger.info("Loaded %d %s records (backend=%s)", len(self._data), table, backend)

    def _redis_key(self, key: str) -> str:
        return f"{_UPSTASH_PREFIX}:{self._table}:{key}"

    def _decode(self, raw: Any) -> Any:
        if isinstance(raw, (bytes, bytearray)):
            raw = bytes(raw).decode("utf-8")
        return self._from_json(json.loads(raw))

    def _load_remote(self) -> None:
        try:
            keys = self._remote.command("KEYS", f"{_UPSTASH_PREFIX}:{self._table}:*") or []
            for full_key in keys:
                raw = self._remote.command("GET", full_key)
                if raw is None:
                    continue
                local_key = str(full_key).rsplit(":", 1)[-1]
                try:
                    self._data[local_key] = self._decode(raw)
                except Exception:  # noqa: BLE001
                    logger.warning("Skipping unreadable %s record: %s", self._table, local_key)
        except Exception as exc:  # noqa: BLE001
            raise PersistenceError(
                f"Upstash initial load failed for {self._table}"
            ) from exc

    def _load_local(self) -> None:
        for key, value in self._conn.execute(f"SELECT key, value FROM {self._table}"):
            try:
                self._data[key] = self._from_json(json.loads(value))
            except Exception:  # noqa: BLE001
                logger.warning("Skipping unreadable %s row: %s", self._table, key)

    def _persist(self, key: str, item: Any) -> bool:
        payload = json.dumps(self._to_json(item), ensure_ascii=False, default=str)
        if self._remote is not None:
            try:
                self._remote.command("SET", self._redis_key(key), payload)
                return True
            except Exception as exc:  # noqa: BLE001
                logger.warning("Upstash persist failed for %s/%s: %s", self._table, key, exc)
                return False
        if self._conn is not None:
            self._conn.execute(
                f"INSERT INTO {self._table}(key, value) VALUES(?, ?) "
                "ON CONFLICT(key) DO UPDATE SET value=excluded.value",
                (key, payload),
            )
            self._conn.commit()
            return True
        return False

    def _delete(self, key: str) -> bool:
        if self._remote is not None:
            try:
                self._remote.command("DEL", self._redis_key(key))
                return True
            except Exception as exc:  # noqa: BLE001
                logger.warning("Upstash delete failed for %s/%s: %s", self._table, key, exc)
                return False
        if self._conn is not None:
            self._conn.execute(f"DELETE FROM {self._table} WHERE key=?", (key,))
            self._conn.commit()
            return True
        return False

    def _snapshot(self, key: str, item: Any) -> str:
        return json.dumps(self._to_json(item), ensure_ascii=False, default=str)

    def sync_to_remote(self) -> int:
        """Persist in-place mutations to SQLite or Upstash.

        ``__setitem__`` cannot observe task progress/result mutations. The same
        serialized diff therefore handles both backends; previously SQLite only
        persisted the initial queued task and could lose a completed report on
        restart. Returns the number of keys written/deleted.
        """
        changed: list = []
        for key, item in list(self._data.items()):
            payload = self._snapshot(key, item)
            if self._last_synced.get(key) != payload:
                changed.append((key, payload))
        removed = [key for key in self._last_synced if key not in self._data]
        if self._remote is not None:
            if changed:
                self._remote.pipeline(
                    [["SET", self._redis_key(key), payload] for key, payload in changed]
                )
            if removed:
                self._remote.pipeline([["DEL", self._redis_key(key)] for key in removed])
        elif self._conn is not None:
            for key, payload in changed:
                self._conn.execute(
                    f"INSERT INTO {self._table}(key, value) VALUES(?, ?) "
                    "ON CONFLICT(key) DO UPDATE SET value=excluded.value",
                    (key, payload),
                )
            for key in removed:
                self._conn.execute(f"DELETE FROM {self._table} WHERE key=?", (key,))
            if changed or removed:
                self._conn.commit()
        for key, payload in changed:
            self._last_synced[key] = payload
        for key in removed:
            self._last_synced.pop(key, None)
        return len(changed) + len(removed)

    def set_durable(self, key: str, item: Any) -> None:
        """Commit a security-critical value or restore the last durable state."""
        had_previous = key in self._data
        previous = self._data.get(key)
        previous_snapshot = self._last_synced.get(key)
        self._data[key] = item
        if self._persist(key, item):
            self._last_synced[key] = self._snapshot(key, item)
            return
        if previous_snapshot is not None:
            self._data[key] = self._decode(previous_snapshot)
        elif had_previous:
            self._data[key] = previous
        else:
            self._data.pop(key, None)
        raise PersistenceError(f"Could not durably persist {self._table}/{key}")

    def __setitem__(self, key: str, item: Any) -> None:
        self._data[key] = item
        if self._persist(key, item):
            self._last_synced[key] = self._snapshot(key, item)
        # On failure retain the previous snapshot (or no snapshot) so the
        # periodic diff retries the dirty value instead of marking it synced.

    def __getitem__(self, key: str) -> Any:
        return self._data[key]

    def __delitem__(self, key: str) -> None:
        del self._data[key]
        if self._delete(key):
            self._last_synced.pop(key, None)
        # A failed remote delete remains visible to sync_to_remote as removed.

    def __contains__(self, key: object) -> bool:
        return key in self._data

    def __iter__(self):
        return iter(self._data)

    def __len__(self) -> int:
        return len(self._data)

    def get(self, key: str, default: Any = None) -> Any:
        return self._data.get(key, default)

    def pop(self, key: str, default: Any = None) -> Any:
        if key in self._data:
            item = self._data[key]
            del self[key]
            return item
        return default

    def values(self):
        return self._data.values()

    def items(self):
        return self._data.items()

    def keys(self):
        return self._data.keys()

    def close(self) -> None:
        """Close the local backend (primarily for clean reloads/test isolation)."""
        if self._conn is not None:
            self._conn.close()
            self._conn = None


def _commit_durable(operations: list[tuple[_JsonStore, str, str, Any]]) -> None:
    """Commit a cross-store security transition before exposing it in memory.

    SQLite uses one database transaction across the fixed internal tables.
    Upstash uses one server-side Lua invocation so concurrent readers cannot
    observe the intermediate claim/login state. The caller must hold
    ``_store_lock`` and supply only candidate objects, never live objects that
    were mutated before this commit.
    """
    if not operations:
        return
    prepared: list[tuple[_JsonStore, str, str, Any, str]] = []
    for store, action, key, item in operations:
        if action not in {"set", "delete"}:
            raise ValueError(f"Unsupported durable action: {action}")
        payload = store._snapshot(key, item) if action == "set" else ""
        prepared.append((store, action, key, item, payload))

    first = prepared[0][0]
    remote = first._remote
    if any((store._remote is not None) != (remote is not None) for store, *_ in prepared):
        raise PersistenceError("Cannot mix persistence backends in one transaction")

    if remote is not None:
        # Empty ARGV is the delete sentinel; serialized JSON is never empty.
        script = (
            "for i, key in ipairs(KEYS) do "
            "if ARGV[i] == '' then redis.call('DEL', key) "
            "else redis.call('SET', key, ARGV[i]) end "
            "end return 1"
        )
        keys = [store._redis_key(key) for store, _, key, _, _ in prepared]
        values = [item[4] for item in prepared]
        try:
            remote.command("EVAL", script, len(keys), *keys, *values)
        except Exception as exc:  # noqa: BLE001
            raise PersistenceError("Could not commit the Upstash security transaction") from exc
    else:
        if any(store._conn is None for store, *_ in prepared):
            raise PersistenceError("SQLite connection is not available")
        conn = first._conn
        try:
            # One context commits every table together and rolls back on error.
            with conn:
                for store, action, key, _, payload in prepared:
                    if action == "set":
                        conn.execute(
                            f"INSERT INTO {store._table}(key, value) VALUES(?, ?) "
                            "ON CONFLICT(key) DO UPDATE SET value=excluded.value",
                            (key, payload),
                        )
                    else:
                        conn.execute(f"DELETE FROM {store._table} WHERE key=?", (key,))
        except Exception as exc:  # noqa: BLE001
            raise PersistenceError("Could not commit the SQLite security transaction") from exc

    # Nothing becomes visible to request handlers before durable success.
    for store, action, key, item, payload in prepared:
        if action == "set":
            store._data[key] = item
            store._last_synced[key] = payload
        else:
            store._data.pop(key, None)
            store._last_synced.pop(key, None)


def _reconcile_durable(
    operations: list[tuple[_JsonStore, str, str, Any]]
) -> bool:
    """Read back every operation after an ambiguous commit response.

    The in-memory mirror is updated only after every durable value has been
    fetched and decoded. Returns True only when the complete candidate commit
    is visible; False means a retryable pre-commit/partial state was read.
    """
    if not operations:
        return True
    prepared: list[tuple[_JsonStore, str, str, Any, str]] = []
    for store, action, key, item in operations:
        payload = store._snapshot(key, item) if action == "set" else ""
        prepared.append((store, action, key, item, payload))
    first = prepared[0][0]
    remote = first._remote
    if any((store._remote is not None) != (remote is not None) for store, *_ in prepared):
        raise PersistenceError("Cannot reconcile mixed persistence backends")
    try:
        if remote is not None:
            keys = [store._redis_key(key) for store, _, key, _, _ in prepared]
            raw_values = remote.command("MGET", *keys)
            if not isinstance(raw_values, list) or len(raw_values) != len(prepared):
                raise PersistenceError("Invalid durable read-back response")
        else:
            if any(store._conn is None for store, *_ in prepared):
                raise PersistenceError("SQLite connection is not available")
            raw_values = []
            for store, _, key, _, _ in prepared:
                row = store._conn.execute(
                    f"SELECT value FROM {store._table} WHERE key=?", (key,)
                ).fetchone()
                raw_values.append(row[0] if row else None)
        staged: list[tuple[_JsonStore, str, str, Any, str, Optional[str], Any]] = []
        for (store, action, key, _, payload), raw in zip(prepared, raw_values):
            if isinstance(raw, (bytes, bytearray)):
                raw = bytes(raw).decode("utf-8")
            if raw is not None and not isinstance(raw, str):
                raise PersistenceError("Invalid durable value type")
            item = store._decode(raw) if raw is not None else None
            staged.append((store, action, key, item, payload, raw, item))
    except PersistenceError:
        raise
    except Exception as exc:  # noqa: BLE001
        raise PersistenceError("Could not reconcile the durable security transition") from exc

    for store, _, key, _, _, raw, item in staged:
        if raw is None:
            store._data.pop(key, None)
            store._last_synced.pop(key, None)
        else:
            store._data[key] = item
            store._last_synced[key] = raw
    return all(
        (raw is None) if action == "delete" else (raw == payload)
        for _, action, _, _, payload, raw, _ in staged
    )


# A lost EVAL response can leave a candidate cookie whose session is not yet in
# the local mirror. These entries force a durable read-before-auth on the next
# request instead of trusting a stale login/logout state.
_pending_session_reconciliations: Dict[
    str, list[tuple[_JsonStore, str, str, Any]]
] = {}
# Ancestors being superseded have a different failure policy from the current
# candidate. If their read-back is unavailable, deny the old bearer instead of
# trusting its stale local grants or blocking the successor's recovery flow.
_pending_session_revocations: Dict[
    str, list[tuple[_JsonStore, str, str, Any]]
] = {}


def _register_pending_session_reconciliation(
    operations: list[tuple[_JsonStore, str, str, Any]], *session_hashes: Optional[str]
) -> None:
    for digest in session_hashes:
        if digest:
            _pending_session_reconciliations[digest] = operations


def _register_pending_session_revocation(
    operations: list[tuple[_JsonStore, str, str, Any]], *session_hashes: Optional[str]
) -> None:
    for digest in session_hashes:
        if digest:
            _pending_session_revocations[digest] = operations


def _clear_pending_session_reconciliation(
    operations: list[tuple[_JsonStore, str, str, Any]]
) -> None:
    for pending_by_digest in (
        _pending_session_reconciliations,
        _pending_session_revocations,
    ):
        for digest, pending in list(pending_by_digest.items()):
            if pending is operations:
                pending_by_digest.pop(digest, None)
    # Session-led recovery and credential-led recovery are two entrances to the
    # same transaction; either successful read-back retires every entry.
    for pending_by_key in (_pending_claim_reconciliations, _pending_otp_reconciliations):
        for key, pending in list(pending_by_key.items()):
            if pending is operations:
                pending_by_key.pop(key, None)


# Cookie-independent credential reconciliation. A different browser may retry a
# consumed report code or OTP while this process still holds a stale mirror.
_pending_claim_reconciliations: Dict[
    str, list[tuple[_JsonStore, str, str, Any]]
] = {}
_pending_otp_reconciliations: Dict[
    str, list[tuple[_JsonStore, str, str, Any]]
] = {}


def _reconcile_pending_credential(
    pending_by_key: Dict[str, list[tuple[_JsonStore, str, str, Any]]],
    key: str,
    error_detail: str,
) -> None:
    operations = pending_by_key.get(key)
    if operations is None:
        return
    try:
        _reconcile_durable(operations)
    except PersistenceError as exc:
        raise HTTPException(status_code=503, detail=error_detail) from exc
    pending_by_key.pop(key, None)
    _clear_pending_session_reconciliation(operations)


def _upload_to_json(record: UploadedRecord) -> dict:
    data = asdict(record)
    data["path"] = str(record.path) if record.path else None
    return data


def _upload_from_json(data: dict) -> UploadedRecord:
    data = dict(data)
    data["path"] = Path(data["path"]) if data.get("path") else None
    return UploadedRecord(**data)


STORE_DB_PATH = Path(
    os.getenv("MEDICAL_RECORDS_DB", str(TEMP_DIR / "shanghaimed.db"))
).expanduser()

_uploads: Dict[str, UploadedRecord] = _JsonStore(
    STORE_DB_PATH, "uploads", _upload_to_json, _upload_from_json
)
_tasks: Dict[str, AnalysisTask] = _JsonStore(
    STORE_DB_PATH, "tasks", asdict, lambda d: AnalysisTask(**d)
)
_reports: Dict[str, ReportAccess] = _JsonStore(
    STORE_DB_PATH, "reports", asdict, lambda d: ReportAccess(**d)
)
_sessions: Dict[str, BrowserSession] = _JsonStore(
    STORE_DB_PATH, "sessions", asdict, lambda d: BrowserSession(**d)
)
_users: Dict[str, User] = _JsonStore(
    STORE_DB_PATH, "users", asdict, lambda d: User(**d)
)
_otps: Dict[str, EmailOTP] = _JsonStore(
    STORE_DB_PATH, "email_otps", asdict, lambda d: EmailOTP(**d)
)
_payment_orders: Dict[str, PaymentOrder] = _JsonStore(
    STORE_DB_PATH, "payment_orders", asdict, lambda d: PaymentOrder(**d)
)
_payment_locks: Dict[str, asyncio.Lock] = {}


class AnalyzeRequest(BaseModel):
    file_ids: list[str] = Field(..., min_length=1, max_length=20)
    chief_complaint: str = Field(default="", max_length=2000)
    email: Optional[str] = Field(default=None, max_length=254)


class ClaimReportRequest(BaseModel):
    report_id: str = Field(..., min_length=6, max_length=64)
    access_code: str = Field(..., min_length=16, max_length=128)


class AuthEmailRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=254)


class AuthVerifyRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=254)
    code: str = Field(..., min_length=6, max_length=12)


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


def _client_ip(request: Request) -> str:
    """Use the socket peer unless explicitly running behind a trusted proxy."""
    if os.getenv("TRUST_PROXY_HEADERS", "0").strip().lower() in {"1", "true", "yes", "on"}:
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            # A trusted proxy appends the socket peer. Taking the rightmost
            # address avoids trusting a client-supplied leftmost XFF prefix.
            return forwarded.split(",")[-1].strip()[:128]
    return request.client.host if request.client else "unknown"


def _set_session_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        SESSION_COOKIE_NAME,
        token,
        max_age=SESSION_TTL_SECONDS,
        httponly=True,
        secure=True,
        samesite="lax",
        path="/",
    )


def _clear_session_cookie(response: Response) -> None:
    response.delete_cookie(
        SESSION_COOKIE_NAME,
        path="/",
        secure=True,
        httponly=True,
        samesite="lax",
    )


def _new_session_locked(user_id: Optional[str] = None) -> tuple[BrowserSession, str]:
    """Build a session candidate without writing it before a durable commit."""
    now = time.time()
    token = new_session_token()
    digest = hash_session_token(token)
    while digest in _sessions:
        token = new_session_token()
        digest = hash_session_token(token)
    return BrowserSession(
        session_hash=digest,
        report_ids=[],
        user_id=user_id,
        created_at=now,
        expires_at=now + SESSION_TTL_SECONDS,
    ), token


def _create_session_locked(user_id: Optional[str] = None) -> tuple[BrowserSession, str]:
    session, token = _new_session_locked(user_id)
    _sessions[session.session_hash] = session
    return session, token


def _resolve_session_locked(
    request: Request, create: bool = False
) -> tuple[Optional[BrowserSession], Optional[str]]:
    """Resolve a cookie session. Caller must hold ``_store_lock``."""
    raw_token = request.cookies.get(SESSION_COOKIE_NAME, "")
    if raw_token and len(raw_token) <= 256:
        digest = hash_session_token(raw_token)
        revocation = _pending_session_revocations.get(digest)
        if revocation is not None:
            try:
                _reconcile_durable(revocation)
            except PersistenceError:
                # The remote may already contain this ancestor's tombstone. A
                # stale mirror must never turn that uncertainty into access.
                if create:
                    return _create_session_locked()
                return None, None
            _clear_pending_session_reconciliation(revocation)
        pending = _pending_session_reconciliations.get(digest)
        if pending is not None:
            try:
                _reconcile_durable(pending)
            except PersistenceError as exc:
                raise HTTPException(
                    status_code=503,
                    detail="Session status is being recovered. Please retry shortly.",
                ) from exc
            _clear_pending_session_reconciliation(pending)
        session = _sessions.get(digest)
        if session is not None:
            if session.superseded_by_session_hash:
                # Keep the tombstone for lineage/recovery metadata, but never
                # resolve its old bearer as a live Session or OTP merge source.
                session = None
            elif session.expires_at > time.time():
                return session, None
            else:
                _sessions.pop(digest, None)
    if create:
        return _create_session_locked()
    return None, None


def _report_for_task(task_id: str) -> Optional[ReportAccess]:
    return next((report for report in _reports.values() if report.task_id == task_id), None)


def _session_can_access_report(
    session: Optional[BrowserSession], report: ReportAccess
) -> bool:
    if session is None or session.superseded_by_session_hash:
        return False
    # Account ownership is authoritative unless this exact Session completed
    # the report's one-time-code claim. A stale source Session or another account
    # must not regain access merely by retaining report_ids or claim lineage.
    if report.owner_user_id is not None:
        if session.user_id == report.owner_user_id:
            return True
        return bool(
            report.access_code_consumed
            and report.report_id in (session.pending_claim_report_ids or [])
            and report.report_id in session.report_ids
        )
    if (
        report.report_id in (session.pending_claim_report_ids or [])
        and not report.access_code_consumed
    ):
        return False
    return report.report_id in session.report_ids


def _session_can_access_upload(session: BrowserSession, record: UploadedRecord) -> bool:
    if session.superseded_by_session_hash:
        return False
    # Once an upload belongs to an account, Session hashes and claim lineage
    # are no longer an authorization path for anonymous or other-account users.
    if record.owner_user_id is not None:
        return session.user_id == record.owner_user_id
    allowed_owner_hashes = {
        session.session_hash,
        *(session.claim_source_session_hashes or []),
    }
    return bool(
        record.owner_session_hash
        and record.owner_session_hash in allowed_owner_hashes
    )


def _supersede_source_sessions(
    source_hashes: set[str], new_session_hash: str
) -> list[tuple[_JsonStore, str, str, Any]]:
    """Durably retire every ancestor bearer after a later generation commits."""
    operations: list[tuple[_JsonStore, str, str, Any]] = []
    for source_hash in sorted(source_hashes):
        source = _sessions.get(source_hash)
        if source is None or source.superseded_by_session_hash:
            continue
        superseded = copy.deepcopy(source)
        superseded.superseded_by_session_hash = new_session_hash
        operations.append((_sessions, "set", source_hash, superseded))
    return operations


def _report_metadata(report: ReportAccess, task: Optional[AnalysisTask]) -> dict[str, Any]:
    return {
        "report_id": report.report_id,
        "task_id": report.task_id,
        "status": task.status if task is not None else "expired",
        "current_step": task.current_step if task is not None else "expired",
        "progress": task.progress if task is not None else 0,
        "created_at": _iso(report.created_at),
        "expires_at": _iso(report.expires_at),
        "payment_verified": bool(report.paid_order_id),
        "paid_at": _iso(report.paid_at) if report.paid_at else None,
    }


def _legacy_task_public(task: AnalysisTask) -> dict[str, Any]:
    """Legacy IDs remain pollable without exposing medical/file/payment data."""
    response = {
        "task_id": task.task_id,
        "status": task.status,
        "current_step": task.current_step,
        "progress": task.progress,
        "created_at": _iso(task.created_at),
        "updated_at": _iso(task.updated_at),
        "code_version": "v3_doubao_ocr",
        "legacy": True,
    }
    if task.status == "failed":
        response["error"] = task.error or "Analysis failed."
    return response


def _validated_email(value: str) -> str:
    try:
        return normalize_email(value)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail="Invalid email address.") from exc


async def _deliver_otp(email: str, code: str) -> None:
    await asyncio.to_thread(report_mail.send_otp_email, email, code)


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
        "code_version": "v3_doubao_ocr",
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


_PREVIEW_STRING_FIELDS = {
    "summary",
    "specialty",
    "disclaimer",
    "emergency_message",
    "message",
}
_PREVIEW_LIST_FIELDS = {
    "key_findings",
    "recommendations",
    "safety_notes",
    "locked_sections",
}


def _sanitize_preview_mapping(value: Any) -> dict[str, Any]:
    """Recursively flatten the public preview contract to scalar allowlists."""
    if not isinstance(value, dict):
        return {}
    safe: dict[str, Any] = {}
    for key in _PREVIEW_STRING_FIELDS:
        item = value.get(key)
        if isinstance(item, str):
            safe[key] = item[:20000]
    for key in _PREVIEW_LIST_FIELDS:
        item = value.get(key)
        if isinstance(item, list):
            safe[key] = [entry[:20000] for entry in item[:100] if isinstance(entry, str)]
    return safe


def _free_preview(result: Any) -> Any:
    """Expose only known preview fields; never return an unknown nested shape."""
    fallback = {"message": "Analysis complete. The full report is available after payment."}
    if not isinstance(result, dict):
        return fallback
    safety = {
        key: result[key]
        for key in ("emergency_message", "safety_notes")
        if key in result
    }
    for key in ("preview", "free_preview", "report_preview"):
        candidate = result.get(key)
        if isinstance(candidate, dict):
            safe = _sanitize_preview_mapping({**candidate, **safety})
            if any(field in safe for field in _PREVIEW_STRING_FIELDS | _PREVIEW_LIST_FIELDS):
                return safe
    # Missing, malformed, or wholly unknown preview fields fail closed.
    return _sanitize_preview_mapping({**fallback, **safety})


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
    file_paths: list[str],
    task_id: str,
    progress_callback: Callable[..., Any],
    chief_complaint: str = "",
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

    if "chief_complaint" in parameters or accepts_kwargs:
        kwargs["chief_complaint"] = chief_complaint

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


async def _save_upload(
    upload: UploadFile,
    session: BrowserSession,
    max_bytes: Optional[int] = None,
) -> UploadedRecord:
    size_limit = MAX_FILE_SIZE if max_bytes is None else max(0, max_bytes)
    if size_limit <= 0:
        raise HTTPException(status_code=413, detail="The upload batch exceeds its total size limit.")
    original_name = Path((upload.filename or "").replace("\x00", "")).name
    if not original_name:
        raise HTTPException(status_code=400, detail="Every upload must have a filename.")

    extension = Path(original_name).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Unsupported file type '{extension or '(none)'}'. "
                "Allowed types: jpg, jpeg, png, webp, bmp, gif, tif, tiff, heic, heif, pdf, zip."
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
                if size > size_limit:
                    raise HTTPException(
                        status_code=413,
                        detail=f"File '{original_name}' exceeds the per-file or batch upload limit.",
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
        owner_session_hash=session.session_hash,
        owner_user_id=session.user_id,
    )
    async with _store_lock:
        try:
            _uploads[file_id] = record
        except Exception:
            _unlink(destination)
            raise
    return record


async def _run_analysis(task_id: str, paths: list[Path], chief_complaint: str = "") -> None:
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
        result = await asyncio.wait_for(
            _invoke_pipeline(
                [str(path) for path in paths], task_id, progress_callback, chief_complaint
            ),
            timeout=600,  # 任务级总超时兜底：任何模型 hang 都在 10 分钟内标 failed，不永久僵尸
        )
        if isinstance(result, dict) and (
            result.get("success") is False or result.get("status") == "error"
        ):
            err = result.get("error") or {}
            stage = err.get("stage", "pipeline") if isinstance(err, dict) else "pipeline"
            task.pipeline_error = {
                "stage": str(stage)[:80],
                "type": "PipelineError",
            }
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
        # Exception messages can contain model raw output or source medical text.
        task.pipeline_error = {
            "stage": "exception",
            "type": type(exc).__name__,
        }
        task.updated_at = time.time()
        logger.error("Analysis task %s failed (%s)", task_id, type(exc).__name__)
    finally:
        # Original medical records are removed after every analysis attempt,
        # including pipeline failures. Only the derived report remains in memory.
        async with _store_lock:
            # Persist the derived result immediately; periodic sync is only a
            # fallback for progress callbacks and other in-place mutations.
            _tasks[task_id] = task
            for file_id in task.file_ids:
                record = _uploads.get(file_id)
                if record is None:
                    continue
                _unlink(record.path)
                record.path = None
                record.status = "deleted"
                _uploads[file_id] = record
        logger.info("Original files removed for analysis task %s", task_id)


def _schedule_analysis(task_id: str, paths: list[Path], chief_complaint: str = "") -> None:
    job = asyncio.create_task(_run_analysis(task_id, paths, chief_complaint))
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

        # New reports own the task/upload lifecycle. Paid reports therefore
        # survive for 180 days from payment instead of being removed at 7 days.
        protected_task_ids = {report.task_id for report in _reports.values()}

        def active_capture(report_id: str) -> bool:
            return any(
                order.report_id == report_id
                and order.status == "capturing"
                and order.capture_started_at is not None
                and now - order.capture_started_at < 900
                for order in _payment_orders.values()
            )

        expired_reports = [
            report.report_id
            for report_id, report in _reports.items()
            if report.expires_at <= now and not active_capture(report_id)
        ]
        for report_id in expired_reports:
            report = _reports.pop(report_id, None)
            if report is None:
                continue
            task = _tasks.pop(report.task_id, None)
            for file_id in report.file_ids:
                record = _uploads.pop(file_id, None)
                if record is not None:
                    _unlink(record.path)
            for order_id, order in list(_payment_orders.items()):
                if order.report_id == report_id:
                    _payment_orders.pop(order_id, None)
            _payment_locks.pop(f"report:{report_id}", None)
            for session in _sessions.values():
                if report_id in session.report_ids:
                    session.report_ids = [
                        item for item in session.report_ids if item != report_id
                    ]
                    _sessions[session.session_hash] = session
            if task is not None:
                protected_task_ids.discard(task.task_id)

        expired_tasks = [
            task_id
            for task_id, task in _tasks.items()
            if task_id not in protected_task_ids
            and task.status in {"completed", "failed"}
            and now - task.updated_at > RESULT_TTL_SECONDS
        ]
        for task_id in expired_tasks:
            task = _tasks.pop(task_id)
            for file_id in task.file_ids:
                record = _uploads.pop(file_id, None)
                if record is not None:
                    _unlink(record.path)

        for digest, session in list(_sessions.items()):
            if session.expires_at <= now:
                _sessions.pop(digest, None)
        for key, otp in list(_otps.items()):
            if otp.expires_at <= now:
                _otps.pop(key, None)
        # Never retain an orphaned payment mapping indefinitely.
        for order_id, order in list(_payment_orders.items()):
            if order.report_id not in _reports:
                _payment_orders.pop(order_id, None)

    # Clean orphaned upload files only. Never delete the SQLite database or its
    # journal merely because it shares TEMP_DIR and is older than the file TTL.
    if TEMP_DIR.exists():
        for path in TEMP_DIR.iterdir():
            try:
                if (
                    path.is_file()
                    and path.suffix.lower() in ALLOWED_EXTENSIONS
                    and now - path.stat().st_mtime > UPLOAD_TTL_SECONDS
                ):
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


async def _sync_stores_once() -> None:
    stores = (_uploads, _tasks, _reports, _sessions, _users, _otps, _payment_orders)
    async with _store_lock:
        pushed = 0
        for store in stores:
            pushed += await asyncio.to_thread(store.sync_to_remote)
    if pushed:
        logger.info("Store sync persisted %d record update(s)", pushed)


async def _store_sync_loop() -> None:
    """Persist in-place mutations without weakening immediate payment writes."""
    while True:
        await asyncio.sleep(10)
        try:
            await _sync_stores_once()
        except asyncio.CancelledError:
            raise
        except Exception:  # noqa: BLE001
            logger.warning("Store sync iteration failed", exc_info=True)


@asynccontextmanager
async def lifespan(_: FastAPI):
    TEMP_DIR.mkdir(parents=True, exist_ok=True, mode=0o700)
    try:
        os.chmod(TEMP_DIR, 0o700)
    except OSError:
        logger.warning("Could not restrict permissions on the temporary directory")
    await _cleanup_expired()
    cleaner = asyncio.create_task(_cleanup_loop())
    syncer = asyncio.create_task(_store_sync_loop())
    try:
        yield
    finally:
        cleaner.cancel()
        syncer.cancel()
        jobs = list(_background_jobs)
        for job in jobs:
            job.cancel()
        await asyncio.gather(cleaner, syncer, *jobs, return_exceptions=True)
        try:
            await _sync_stores_once()
        except Exception:  # noqa: BLE001
            logger.warning("Final store sync failed", exc_info=True)


app = FastAPI(
    title="ShanghaiMed Medical Records API",
    version="1.0.0",
    description="Phase 3 upload, AI preview, payment-verified report API.",
    lifespan=lifespan,
)

_cors_origins = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ALLOW_ORIGINS",
        "https://shanghaimedhealth.com,https://www.shanghaimedhealth.com",
    ).split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials="*" not in _cors_origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
)


def _sensitive_path(path: str) -> bool:
    return path.startswith((
        "/api/upload",
        "/api/analyze",
        "/api/status/",
        "/api/reports",
        "/api/auth/",
        "/api/pay/",
    ))


def _private_response(response: Response, path: str) -> Response:
    if _sensitive_path(path):
        response.headers["Cache-Control"] = "no-store"
        vary = [item.strip() for item in response.headers.get("vary", "").split(",") if item.strip()]
        if "Cookie" not in vary:
            vary.append("Cookie")
        response.headers["Vary"] = ", ".join(vary)
    return response


def _origin_allowed(request: Request) -> bool:
    fetch_site = request.headers.get("sec-fetch-site", "").strip().lower()
    if fetch_site == "cross-site":
        return False
    origin = request.headers.get("origin", "").strip().rstrip("/")
    if not origin:
        # JSON endpoints + SameSite=Lax cookies remain the CSRF boundary for
        # non-browser API clients that do not emit Origin/Sec-Fetch-Site.
        return True
    if origin == "null":
        return False
    host = request.headers.get("host", "")
    same_origin = f"{request.url.scheme}://{host}".rstrip("/")
    return origin == same_origin or origin in _cors_origins


@app.middleware("http")
async def rate_limit_requests(request: Request, call_next):
    if request.method == "OPTIONS":
        return await call_next(request)

    path = request.url.path
    if path == "/api/upload" and request.method == "POST":
        try:
            content_length = int(request.headers.get("content-length", "0"))
        except ValueError:
            content_length = MAX_UPLOAD_REQUEST_SIZE + 1
        if content_length > MAX_UPLOAD_REQUEST_SIZE:
            return _private_response(
                JSONResponse(status_code=413, content={"detail": "Upload request is too large."}),
                path,
            )
    if request.method in {"POST", "PUT", "PATCH", "DELETE"} and not _origin_allowed(request):
        return _private_response(
            JSONResponse(status_code=403, content={"detail": "Cross-origin request rejected."}),
            path,
        )

    if path == "/api/upload":
        bucket, limit = "upload", 12
    elif path == "/api/analyze":
        bucket, limit = "analyze", 6
    elif path.startswith("/api/pay/"):
        bucket, limit = "pay", 20
    elif path.startswith("/api/status/"):
        bucket, limit = "status", 120
    elif path == "/api/auth/request":
        bucket, limit = "auth_request", 10
    elif path == "/api/auth/verify":
        bucket, limit = "auth_verify", 20
    elif path == "/api/reports/claim":
        bucket, limit = "report_claim", 20
    else:
        bucket, limit = "general", 60

    # X-Forwarded-For is trusted only with an explicit deployment setting.
    # Claim/OTP endpoints add identifier-based buckets below as a second layer.
    retry_after = await _rate_limiter.check((_client_ip(request), bucket), limit)
    if retry_after:
        return _private_response(JSONResponse(
            status_code=429,
            content={"detail": "Rate limit exceeded. Please try again later."},
            headers={"Retry-After": str(retry_after)},
        ), path)
    response = await call_next(request)
    return _private_response(response, path)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # FastAPI's default 422 payload includes the submitted ``input`` value.
    # Strip it so access codes/OTPs are never reflected into response logs.
    errors = [
        {"loc": error.get("loc"), "msg": error.get("msg"), "type": error.get("type")}
        for error in exc.errors()
    ]
    return JSONResponse(status_code=422, content={"detail": errors})


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception(
        "Unhandled API error: method=%s path=%s", request.method, request.url.path
    )
    return JSONResponse(status_code=500, content={"detail": "Internal server error."})


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/diag/ark")
async def diag_ark(
    probe: Optional[str] = Query(None),
    mode: Optional[str] = Query(None),
) -> dict[str, Any]:
    """Diagnose Volcengine ARK reachability/auth/model availability.

    Disabled unless ENABLE_DIAG=1 is set (guards against cost attacks and
    model-list/base_url disclosure in production). Enable only temporarily for
    debugging, then turn it back off.

    - No args: list available model IDs + configured chain models.
    - ?probe=<model_id>: send a 1-token chat request to verify the model works.
    - &mode=image: send a tiny 1x1 PNG instead of text (vision check).
    Never echoes the API key.
    """
    if os.getenv("ENABLE_DIAG", "0") != "1":
        raise HTTPException(status_code=404, detail="Not found")
    import base64 as _b64

    import httpx

    from lib.config import load_config

    cfg = load_config()
    if not cfg.api_key:
        return {"ark_configured": False, "hint": "ARK_API_KEY env var is empty"}
    headers = {"Authorization": f"Bearer {cfg.api_key}"}
    started = time.time()
    try:
        async with httpx.AsyncClient(base_url=cfg.base_url, headers=headers, timeout=30) as client:
            if probe:
                if mode == "image":
                    tiny_png = (
                        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ"
                        "AAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                    )
                    messages = [{
                        "role": "user",
                        "content": [
                            {"type": "image_url", "image_url": {
                                "url": f"data:image/png;base64,{tiny_png}"}},
                            {"type": "text", "text": "Reply with OK."},
                        ],
                    }]
                else:
                    messages = [{"role": "user", "content": "hi"}]
                chat = await client.post(
                    "/chat/completions",
                    json={
                        "model": probe,
                        "messages": messages,
                        "max_tokens": 5,
                    },
                )
                return {
                    "probe": probe,
                    "mode": mode or "text",
                    "http_status": chat.status_code,
                    "elapsed_ms": int((time.time() - started) * 1000),
                    "body_head": chat.text[:300],
                }
            response = await client.get("/models")
        elapsed_ms = int((time.time() - started) * 1000)
        payload: dict[str, Any] = {
            "ark_configured": True,
            "base_url": cfg.base_url,
            "http_status": response.status_code,
            "elapsed_ms": elapsed_ms,
        }
        if response.status_code == 200:
            try:
                ids = [m.get("id") for m in response.json().get("data", [])]
                payload["models"] = ids
                configured = {
                    "ocr_kimi": cfg.model_chains.get("ocr_kimi", []),
                    "report_generate": cfg.model_chains.get("report_generate", []),
                }
                payload["configured_models"] = configured
                payload["configured_in_catalog"] = {
                    stage: [m in (ids or []) for m in chain]
                    for stage, chain in configured.items()
                }
            except Exception:  # noqa: BLE001 - diag only
                payload["models_count"] = None
        else:
            payload["body_head"] = response.text[:200]
        return payload
    except Exception as exc:  # noqa: BLE001 - report type name only, no body
        return {
            "ark_configured": True,
            "base_url": cfg.base_url,
            "error": type(exc).__name__,
            "elapsed_ms": int((time.time() - started) * 1000),
        }


@app.post("/api/upload")
async def upload_files(
    request: Request,
    response: Response,
    files: list[UploadFile] = File(...),
) -> dict[str, Any]:
    """Upload files owned by the current anonymous or verified session."""
    if not files:
        raise HTTPException(status_code=400, detail="At least one file is required.")
    if len(files) > MAX_FILES_PER_BATCH:
        raise HTTPException(
            status_code=400,
            detail=f"No more than {MAX_FILES_PER_BATCH} files may be uploaded at once.",
        )

    async with _store_lock:
        session, new_token = _resolve_session_locked(request, create=True)
    assert session is not None
    created_ids: list[str] = []
    batch_size = 0
    try:
        for upload in files:
            remaining = min(MAX_FILE_SIZE, MAX_BATCH_SIZE - batch_size)
            record = await _save_upload(upload, session, remaining)
            created_ids.append(record.file_id)
            batch_size += record.size
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
    if new_token:
        _set_session_cookie(response, new_token)
    return {
        "status": "success",
        "count": len(responses),
        "file_ids": created_ids,
        "files": responses,
    }


@app.post("/api/analyze")
async def analyze_files(
    payload: AnalyzeRequest,
    request: Request,
    wait: bool = Query(
        True,
        description="Wait for the free preview; set false to receive HTTP 202 and poll status.",
    ),
):
    """Create an owned report and return its recovery code exactly once."""
    file_ids = list(dict.fromkeys(file_id.strip() for file_id in payload.file_ids))
    chief_complaint = (payload.chief_complaint or "").strip()
    if any(not file_id for file_id in file_ids):
        raise HTTPException(status_code=422, detail="File IDs cannot be blank.")
    pending_email = _validated_email(payload.email) if payload.email else None

    # The plaintext code exists only in this request/response scope.
    access_code = new_access_code()
    access_salt, access_hash = hash_secret(access_code)
    now = time.time()
    task_id = str(uuid.uuid4())
    async with _store_lock:
        session, new_token = _resolve_session_locked(request, create=True)
        assert session is not None
        records = []
        for file_id in file_ids:
            record = _uploads.get(file_id)
            if record is None or not _session_can_access_upload(session, record):
                raise HTTPException(status_code=404, detail="File ID not found.")
            if record.status != "uploaded" or record.path is None:
                raise HTTPException(
                    status_code=409,
                    detail="An uploaded file is not available for a new analysis.",
                )
            if not record.path.is_file():
                raise HTTPException(
                    status_code=410,
                    detail="An uploaded file is no longer available.",
                )
            records.append(record)

        report_id = new_report_id()
        while report_id in _reports:
            report_id = new_report_id()
        task = AnalysisTask(
            task_id=task_id,
            file_ids=file_ids,
            created_at=now,
            updated_at=now,
        )
        report = ReportAccess(
            report_id=report_id,
            task_id=task_id,
            file_ids=file_ids,
            access_salt=access_salt,
            access_hash=access_hash,
            pending_email=pending_email,
            owner_user_id=session.user_id,
            created_at=now,
            expires_at=now + RESULT_TTL_SECONDS,
        )
        _tasks[task_id] = task
        _reports[report_id] = report
        if report_id not in session.report_ids:
            session.report_ids.append(report_id)
            _sessions[session.session_hash] = session
        paths = []
        for record in records:
            record.status = "analyzing"
            record.analysis_task_id = task_id
            _uploads[record.file_id] = record
            # The existence check above guarantees this is a Path.
            paths.append(record.path)  # type: ignore[arg-type]

    active_session_token = new_token or request.cookies.get(SESSION_COOKIE_NAME)

    def creation_response(content: dict[str, Any], status_code: int) -> JSONResponse:
        result = JSONResponse(status_code=status_code, content=content)
        if active_session_token:
            _set_session_cookie(result, active_session_token)
        return result

    recovery = {"report_id": report_id, "access_code": access_code}
    if wait:
        await _run_analysis(task_id, paths, chief_complaint)
        async with _store_lock:
            task = _tasks.get(task_id)
            if task is None:
                raise HTTPException(status_code=410, detail="The analysis result has expired.")
            _tasks[task_id] = task
        if task.status == "failed":
            return creation_response({
                "task_id": task_id,
                **recovery,
                "status": "failed",
                "detail": {"task_id": task_id, "message": task.error},
            }, task.error_status)
        return creation_response({**_task_public(task), **recovery}, 200)

    _schedule_analysis(task_id, paths, chief_complaint)
    return creation_response({**_task_public(task), **recovery}, 202)


# ---------------------------------------------------------------------------
# Report recovery and passwordless email authentication
# ---------------------------------------------------------------------------


@app.get("/api/reports")
async def list_reports(request: Request) -> dict[str, Any]:
    async with _store_lock:
        session, _ = _resolve_session_locked(request)
        if session is None:
            return {"reports": []}
        now = time.time()
        accessible = {
            report.report_id: report
            for report in _reports.values()
            if report.expires_at > now and _session_can_access_report(session, report)
        }
        # Remove stale IDs opportunistically without treating them as readable.
        live_ids = set(_reports)
        cleaned = [report_id for report_id in session.report_ids if report_id in live_ids]
        if cleaned != session.report_ids:
            session.report_ids = cleaned
            _sessions[session.session_hash] = session
        items = [
            _report_metadata(report, _tasks.get(report.task_id))
            for report in accessible.values()
        ]
    items.sort(key=lambda item: item["created_at"], reverse=True)
    return {"reports": items}


@app.post("/api/reports/claim")
async def claim_report(payload: ClaimReportRequest, request: Request) -> JSONResponse:
    report_id = payload.report_id.strip().upper()
    retry_after = await _rate_limiter.check((f"report:{report_id}", "claim"), 10, 300)
    if retry_after:
        raise HTTPException(
            status_code=429,
            detail="Too many recovery attempts. Please try again later.",
            headers={"Retry-After": str(retry_after)},
        )
    async with _store_lock:
        _reconcile_pending_credential(
            _pending_claim_reconciliations,
            report_id,
            "Report recovery status is being reconciled. Please retry shortly.",
        )
        report = _reports.get(report_id)
        if (
            report is None
            or report.expires_at <= time.time()
            or report.access_code_consumed
            or not verify_secret(payload.access_code.strip(), report.access_salt, report.access_hash)
        ):
            raise HTTPException(status_code=403, detail="Report ID or access code is invalid.")
        old_session, _ = _resolve_session_locked(request)
        claimed_report = copy.deepcopy(report)
        if old_session and old_session.user_id and claimed_report.owner_user_id is None:
            claimed_report.owner_user_id = old_session.user_id
            claimed_report.pending_email = None
        claimed_report.access_code_consumed = True

        # The code, new session, old-session revocation and upload ownership
        # commit as one durable transition. A failure cannot consume the only
        # recovery credential while returning an unpersisted replacement cookie.
        new_session, new_token = _new_session_locked(
            old_session.user_id if old_session else None
        )
        new_session.report_ids = list(old_session.report_ids) if old_session else []
        new_session.pending_claim_report_ids = list(
            old_session.pending_claim_report_ids or []
        ) if old_session else []
        if report_id not in new_session.pending_claim_report_ids:
            new_session.pending_claim_report_ids.append(report_id)
        if report_id not in new_session.report_ids:
            new_session.report_ids.append(report_id)
        new_session.claim_source_session_hashes = list(
            old_session.claim_source_session_hashes or []
        ) if old_session else []
        if old_session and old_session.session_hash not in new_session.claim_source_session_hashes:
            new_session.claim_source_session_hashes.append(old_session.session_hash)
        claim_source_hashes = set(new_session.claim_source_session_hashes)
        operations: list[tuple[_JsonStore, str, str, Any]] = [
            (_sessions, "set", new_session.session_hash, new_session),
        ]
        if old_session is not None:
            for record in _uploads.values():
                if (
                    record.owner_session_hash in claim_source_hashes
                    and (
                        record.owner_user_id is None
                        or record.owner_user_id == old_session.user_id
                    )
                ):
                    migrated = copy.deepcopy(record)
                    migrated.owner_session_hash = new_session.session_hash
                    operations.append((_uploads, "set", migrated.file_id, migrated))
        # Consume the one-time code last, after every SET and old-session DEL.
        # A Redis runtime failure before it therefore leaves a retry path.
        if old_session is not None:
            operations.append((_sessions, "delete", old_session.session_hash, None))
        # If an old-session DEL or a later write is interrupted, tombstones on
        # every surviving ancestor still prevent stale bearer/grant replay.
        operations.extend(_supersede_source_sessions(
            claim_source_hashes - {
                old_session.session_hash if old_session is not None else ""
            },
            new_session.session_hash,
        ))
        operations.append((_reports, "set", report_id, claimed_report))
        try:
            _commit_durable(operations)
        except PersistenceError:
            try:
                # A lost response is a success if the entire commit is readable.
                committed = _reconcile_durable(operations)
            except PersistenceError:
                _pending_claim_reconciliations[report_id] = operations
                _register_pending_session_reconciliation(
                    operations,
                    new_session.session_hash,
                    old_session.session_hash if old_session else None,
                )
                _register_pending_session_revocation(
                    operations,
                    *(claim_source_hashes - {
                        old_session.session_hash if old_session else ""
                    }),
                )
                response = JSONResponse(
                    status_code=503,
                    content={
                        "detail": "Report recovery status is uncertain. Please retry or refresh.",
                        "recovery_pending": True,
                    },
                )
                _set_session_cookie(response, new_token)
                return response
            else:
                if not committed:
                    # A partial EVAL may already have persisted the candidate,
                    # migrated uploads and deleted the old session. If so, the
                    # browser must receive that candidate token or its existing
                    # anonymous assets become unreachable. The durable pending
                    # marker still denies the not-yet-claimed report itself.
                    if new_session.session_hash in _sessions:
                        response = JSONResponse(
                            status_code=503,
                            content={
                                "detail": "Your previous session was preserved. Please retry report recovery.",
                                "recovery_pending": True,
                            },
                        )
                        _set_session_cookie(response, new_token)
                        return response
                    # Nothing from the candidate was persisted. The old cookie
                    # remains valid and the one-time code can be retried safely.
                    return JSONResponse(
                        status_code=503,
                        content={
                            "detail": "Report recovery was not saved. Please retry.",
                            "recovery_pending": False,
                        },
                    )
        content = {
            "status": "claimed",
            "report": _report_metadata(claimed_report, _tasks.get(claimed_report.task_id)),
        }
    response = JSONResponse(content=content)
    _set_session_cookie(response, new_token)
    return response


@app.get("/api/reports/{report_id}")
async def get_report(report_id: str, request: Request) -> dict[str, Any]:
    report_id = report_id.strip().upper()
    async with _store_lock:
        session, _ = _resolve_session_locked(request)
        report = _reports.get(report_id)
        if (
            report is None
            or report.expires_at <= time.time()
            or not _session_can_access_report(session, report)
        ):
            raise HTTPException(status_code=404, detail="Report not found.")
        task = _tasks.get(report.task_id)
        if task is None:
            raise HTTPException(status_code=410, detail="The analysis result has expired.")
        response = {
            **_report_metadata(report, task),
            "file_ids": list(report.file_ids),
            "updated_at": _iso(task.updated_at),
            "preview": task.preview if task.status == "completed" else None,
        }
        if task.status == "failed":
            response["error"] = task.error or "Analysis failed."
        if report.paid_order_id and task.status == "completed":
            # This is the sole report-read path that can return paid content.
            response["full_report"] = _full_report(task.result)
    return response


@app.get("/api/auth/config")
async def auth_config() -> dict[str, Any]:
    return {
        "email_enabled": report_mail.email_enabled(),
        "otp_ttl_seconds": OTP_TTL_SECONDS,
    }


@app.post("/api/auth/request")
async def request_email_otp(payload: AuthEmailRequest, request: Request) -> dict[str, Any]:
    email = _validated_email(payload.email)
    if not report_mail.email_enabled():
        raise HTTPException(
            status_code=503,
            detail="Email sign-in is not configured. Use the report ID and access code instead.",
        )
    key = email_key(email)
    retry_after = await _rate_limiter.check((key, "otp_request"), 5, 3600)
    if retry_after:
        raise HTTPException(
            status_code=429,
            detail="Too many verification requests. Please try again later.",
            headers={"Retry-After": str(retry_after)},
        )
    now = time.time()
    code = new_otp_code()
    salt, digest = hash_secret(code)
    async with _store_lock:
        previous = _otps.get(key)
        if previous and now - previous.last_sent_at < OTP_RESEND_SECONDS:
            wait_seconds = max(1, math.ceil(OTP_RESEND_SECONDS - (now - previous.last_sent_at)))
            raise HTTPException(
                status_code=429,
                detail="Please wait before requesting another code.",
                headers={"Retry-After": str(wait_seconds)},
            )
        otp = EmailOTP(
            email_key=key,
            code_salt=salt,
            code_hash=digest,
            created_at=now,
            expires_at=now + OTP_TTL_SECONDS,
            last_sent_at=now,
        )
        try:
            _otps.set_durable(key, otp)
        except PersistenceError as exc:
            raise HTTPException(
                status_code=503,
                detail="Email sign-in is temporarily unavailable. Please try again.",
            ) from exc
    try:
        await _deliver_otp(email, code)
    except Exception as exc:  # noqa: BLE001 - deliberately do not leak SMTP details
        async with _store_lock:
            current = _otps.get(key)
            if current is not None and current.code_hash == digest:
                _otps.pop(key, None)
        logger.warning("OTP email delivery failed (%s)", type(exc).__name__)
        raise HTTPException(
            status_code=502,
            detail="The verification email could not be delivered. Please try again later.",
        ) from exc
    # The response is identical for new and existing users.
    return {"status": "accepted", "message": "If delivery is available, a verification code has been sent."}


@app.post("/api/auth/verify")
async def verify_email_otp(payload: AuthVerifyRequest, request: Request) -> JSONResponse:
    email = _validated_email(payload.email)
    key = email_key(email)
    retry_after = await _rate_limiter.check((key, "otp_verify"), 12, 600)
    if retry_after:
        raise HTTPException(
            status_code=429,
            detail="Too many verification attempts. Please try again later.",
            headers={"Retry-After": str(retry_after)},
        )
    invalid = HTTPException(status_code=401, detail="Invalid or expired verification code.")
    async with _store_lock:
        _reconcile_pending_credential(
            _pending_otp_reconciliations,
            key,
            "Sign-in status is being reconciled. Please retry shortly.",
        )
        otp = _otps.get(key)
        now = time.time()
        if otp is None or otp.expires_at <= now or otp.attempts >= OTP_MAX_ATTEMPTS:
            if otp is not None and otp.expires_at <= now:
                _otps.pop(key, None)
            raise invalid
        supplied_code = payload.code.strip()
        if not supplied_code.isdigit() or not verify_secret(
            supplied_code, otp.code_salt, otp.code_hash
        ):
            otp.attempts += 1
            if otp.attempts >= OTP_MAX_ATTEMPTS:
                _otps.pop(key, None)
            else:
                _otps[key] = otp
            raise invalid

        user = next((item for item in _users.values() if item.email == email), None)
        is_new_user = user is None
        if user is None:
            user = User(user_id=str(uuid.uuid4()), email=email, created_at=now)

        old_session, _ = _resolve_session_locked(request)
        new_session, new_token = _new_session_locked(user.user_id)
        can_merge_old_session = bool(
            old_session
            and not old_session.superseded_by_session_hash
            and (old_session.user_id is None or old_session.user_id == user.user_id)
        )
        merged_report_ids = list(old_session.report_ids) if can_merge_old_session else []
        successful_claim_report_ids = [
            report_id
            for report_id in (old_session.pending_claim_report_ids or [])
            if _reports.get(report_id) and _reports[report_id].access_code_consumed
        ] if can_merge_old_session and old_session is not None else []
        # A completed claim is an explicit bearer grant and survives that same
        # claimant's OTP rotation. Unfinished claim markers never merge.
        new_session.pending_claim_report_ids = successful_claim_report_ids or None
        if can_merge_old_session and old_session is not None:
            # Neither an unfinished claim nor a report already owned by another
            # account is anonymous inventory that OTP may merge into this user.
            merged_report_ids = [
                report_id for report_id in merged_report_ids
                if report_id in _reports
                and (
                    _reports[report_id].owner_user_id is None
                    or _reports[report_id].owner_user_id == user.user_id
                    or report_id in successful_claim_report_ids
                )
                and (
                    report_id not in (old_session.pending_claim_report_ids or [])
                    or _reports[report_id].access_code_consumed
                )
            ]
        # Preserve an existing claim-candidate lineage for recovery/audit, but
        # do not turn an original stale source Session into a new bearer lineage
        # after OTP. otp_source_hashes still migrates every eligible upload.
        if (
            can_merge_old_session
            and old_session is not None
            and old_session.claim_source_session_hashes
        ):
            new_session.claim_source_session_hashes = list(
                old_session.claim_source_session_hashes
            )
            if old_session.session_hash not in new_session.claim_source_session_hashes:
                new_session.claim_source_session_hashes.append(old_session.session_hash)
        otp_source_hashes = {
            old_session.session_hash,
            *(old_session.claim_source_session_hashes or []),
        } if can_merge_old_session and old_session is not None else set()
        operations: list[tuple[_JsonStore, str, str, Any]] = [
            (_sessions, "set", new_session.session_hash, new_session),
        ]
        if is_new_user:
            operations.append((_users, "set", user.user_id, user))
        for report in _reports.values():
            if report.expires_at <= now:
                continue
            # Switching from account A to B must never transfer A's reports.
            if report.owner_user_id == user.user_id or (
                report.owner_user_id is None
                and (
                    report.pending_email == email
                    or report.report_id in merged_report_ids
                )
            ):
                if report.owner_user_id != user.user_id or report.pending_email is not None:
                    bound_report = copy.deepcopy(report)
                    bound_report.owner_user_id = user.user_id
                    bound_report.pending_email = None
                    operations.append((_reports, "set", report.report_id, bound_report))
                merged_report_ids.append(report.report_id)
        new_session.report_ids = list(dict.fromkeys(
            report_id for report_id in merged_report_ids if report_id in _reports
        ))

        if old_session is not None:
            if can_merge_old_session:
                for record in _uploads.values():
                    if (
                        record.owner_session_hash in otp_source_hashes
                        and (
                            record.owner_user_id is None
                            or record.owner_user_id == user.user_id
                        )
                    ):
                        migrated = copy.deepcopy(record)
                        migrated.owner_session_hash = new_session.session_hash
                        migrated.owner_user_id = user.user_id
                        operations.append((_uploads, "set", record.file_id, migrated))
            operations.append((_sessions, "delete", old_session.session_hash, None))
        operations.extend(_supersede_source_sessions(
            otp_source_hashes - {
                old_session.session_hash if old_session is not None else ""
            },
            new_session.session_hash,
        ))
        # Consume the OTP last: if any earlier Redis write fails, the same code
        # remains usable for a retry instead of authenticating without a session.
        operations.append((_otps, "delete", key, None))
        try:
            _commit_durable(operations)
        except PersistenceError:
            try:
                committed = _reconcile_durable(operations)
            except PersistenceError:
                # Never expose an uncertain OTP session. A partial Lua failure
                # may have persisted an authenticated session while leaving the
                # OTP reusable; returning its bearer token would make that
                # partial state usable after a restart. A completed login can
                # always be recovered by requesting a fresh OTP.
                _pending_otp_reconciliations[key] = operations
                _register_pending_session_reconciliation(
                    operations,
                    old_session.session_hash if old_session else None,
                )
                _register_pending_session_revocation(
                    operations,
                    *(otp_source_hashes - {
                        old_session.session_hash if old_session else ""
                    }),
                )
                return JSONResponse(
                    status_code=503,
                    content={
                        "detail": "Sign-in status is uncertain. Please retry or request a new code.",
                        "auth_pending": True,
                    },
                )
            else:
                if not committed:
                    # The OTP still exists. Do not expose an authenticated
                    # candidate cookie; the same code remains safe to retry.
                    return JSONResponse(
                        status_code=503,
                        content={
                            "detail": "Sign-in was not saved. Please retry the verification code.",
                            "auth_pending": False,
                        },
                    )

    response = JSONResponse(content={"authenticated": True, "email": mask_email(email)})
    _set_session_cookie(response, new_token)
    return response


@app.post("/api/auth/logout")
async def logout(request: Request) -> JSONResponse:
    async with _store_lock:
        session, _ = _resolve_session_locked(request)
        if session is not None:
            try:
                _commit_durable([(_sessions, "delete", session.session_hash, None)])
            except PersistenceError as exc:
                raise HTTPException(
                    status_code=503,
                    detail="Sign-out could not be saved. Please try again.",
                ) from exc
    response = JSONResponse(content={"authenticated": False})
    _clear_session_cookie(response)
    return response


@app.get("/api/auth/me")
async def auth_me(request: Request) -> dict[str, Any]:
    async with _store_lock:
        session, _ = _resolve_session_locked(request)
        user = _users.get(session.user_id) if session and session.user_id else None
    return {
        "authenticated": user is not None,
        "email": mask_email(user.email) if user else None,
    }


# ---------------------------------------------------------------------------
# PayPal payments (unlock the full report)
# ---------------------------------------------------------------------------

PAYPAL_PRICE_USD = os.getenv("PAYPAL_PRICE_USD", "9.90").strip() or "9.90"


class PayOrderRequest(BaseModel):
    file_id: str = Field(..., min_length=1, max_length=64)


class PayCaptureRequest(BaseModel):
    order_id: str = Field(..., min_length=5, max_length=64)
    file_id: str = Field(..., min_length=1, max_length=64)


def _paypal_base() -> str:
    return (
        "https://api-m.paypal.com"
        if os.getenv("PAYPAL_ENV", "sandbox").strip().lower() == "live"
        else "https://api-m.sandbox.paypal.com"
    )


def _paypal_credentials() -> tuple[str, str]:
    client_id = os.getenv("PAYPAL_CLIENT_ID", "").strip()
    client_secret = os.getenv("PAYPAL_CLIENT_SECRET", "").strip()
    if not client_id or not client_secret:
        raise HTTPException(
            status_code=503,
            detail=(
                "Payment is not configured yet. "
                "Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET."
            ),
        )
    return client_id, client_secret


def _paypal_merchant_id() -> str:
    merchant_id = os.getenv("PAYPAL_MERCHANT_ID", "").strip()
    if not merchant_id:
        raise HTTPException(
            status_code=503,
            detail="Payment is not configured yet. Set PAYPAL_MERCHANT_ID.",
        )
    return merchant_id


async def _paypal_access_token(client: Any) -> str:
    client_id, client_secret = _paypal_credentials()
    response = await client.post(
        "/v1/oauth2/token",
        data={"grant_type": "client_credentials"},
        auth=(client_id, client_secret),
    )
    if response.status_code != 200:
        logger.warning("PayPal OAuth failed with HTTP %s", response.status_code)
        raise HTTPException(
            status_code=502, detail="Payment provider authentication failed."
        )
    return response.json()["access_token"]


async def _paypal_create_order(client: Any, token: str, task_id: str) -> dict:
    response = await client.post(
        "/v2/checkout/orders",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {"currency_code": "USD", "value": PAYPAL_PRICE_USD},
                    "payee": {"merchant_id": _paypal_merchant_id()},
                    "description": "ShanghaiMed full medical report",
                    "custom_id": task_id,
                }
            ],
        },
    )
    if response.status_code != 201:
        logger.warning("PayPal create order failed: HTTP %s", response.status_code)
        raise HTTPException(
            status_code=502,
            detail={"message": "Failed to create PayPal order."},
        )
    return response.json()


async def _paypal_capture_order(client: Any, token: str, order_id: str) -> dict:
    response = await client.post(
        f"/v2/checkout/orders/{order_id}/capture",
        headers={
            "Authorization": f"Bearer {token}",
            # Stable idempotency key also protects a retry after a process crash.
            "PayPal-Request-Id": f"medimatch-capture-{order_id}",
        },
        json={},  # PayPal requires Content-Type: application/json on capture
    )
    if response.status_code in (200, 201):
        return response.json()
    issue = None
    try:
        body = response.json()
        issue = (body.get("details") or [{}])[0].get("issue") or body.get("message")
    except Exception:  # noqa: BLE001
        pass
    logger.warning(
        "PayPal capture failed for order %s: HTTP %s (%s)",
        order_id,
        response.status_code,
        issue,
    )
    raise HTTPException(
        status_code=402,
        detail={
            "message": "Payment capture failed.",
            "issue": issue or "UNKNOWN",
        },
    )


async def _paypal_get_order(client: Any, token: str, order_id: str) -> dict:
    """Fetch the authoritative order after capture or an uncertain local state."""
    response = await client.get(
        f"/v2/checkout/orders/{order_id}",
        headers={"Authorization": f"Bearer {token}"},
    )
    if response.status_code != 200:
        logger.warning(
            "PayPal order reconciliation failed for order %s: HTTP %s",
            order_id,
            response.status_code,
        )
        raise HTTPException(
            status_code=502,
            detail="Payment order status could not be confirmed.",
        )
    try:
        payload = response.json()
    except Exception as exc:  # noqa: BLE001 - malformed provider data is fail-closed
        raise HTTPException(
            status_code=502,
            detail="Payment provider returned an invalid order.",
        ) from exc
    if not isinstance(payload, dict):
        raise HTTPException(
            status_code=502,
            detail="Payment provider returned an invalid order.",
        )
    return payload


def _money_matches(actual: Any, expected: str) -> bool:
    if actual is None or isinstance(actual, (dict, list, bool)):
        return False
    try:
        return Decimal(str(actual)) == Decimal(expected)
    except (InvalidOperation, ValueError):
        return False


def _verify_capture(
    order: dict,
    task_id: str,
    order_id: str,
    expected_amount: str,
    expected_currency: str,
    expected_merchant_id: str,
) -> None:
    """Validate the complete provider contract; every required field is mandatory."""
    if not isinstance(order, dict) or order.get("status") != "COMPLETED":
        raise HTTPException(status_code=402, detail="Payment is not completed.")
    if order.get("id") != order_id:
        raise HTTPException(status_code=400, detail="Payment order ID mismatch.")
    units = order.get("purchase_units")
    if not isinstance(units, list) or len(units) != 1 or not isinstance(units[0], dict):
        raise HTTPException(status_code=400, detail="Payment order does not match this report.")
    unit = units[0]
    if unit.get("custom_id") != task_id:
        raise HTTPException(status_code=400, detail="Order does not match this file.")
    payee = unit.get("payee")
    if not isinstance(payee, dict) or payee.get("merchant_id") != expected_merchant_id:
        raise HTTPException(status_code=402, detail="Payment recipient mismatch.")
    unit_amount = unit.get("amount")
    if (
        not isinstance(unit_amount, dict)
        or unit_amount.get("currency_code") != expected_currency
        or not _money_matches(unit_amount.get("value"), expected_amount)
    ):
        raise HTTPException(status_code=402, detail="Payment amount mismatch.")
    payments = unit.get("payments")
    captures = payments.get("captures") if isinstance(payments, dict) else None
    if not isinstance(captures, list) or len(captures) != 1 or not isinstance(captures[0], dict):
        raise HTTPException(status_code=402, detail="No unique payment capture found for this order.")
    capture = captures[0]
    if not str(capture.get("id") or "").strip() or capture.get("status") != "COMPLETED":
        raise HTTPException(status_code=402, detail="Payment capture is not completed.")
    amount = capture.get("amount")
    if (
        not isinstance(amount, dict)
        or amount.get("currency_code") != expected_currency
        or not _money_matches(amount.get("value"), expected_amount)
    ):
        raise HTTPException(status_code=402, detail="Payment amount mismatch.")


@app.get("/api/pay/config")
async def pay_config() -> dict[str, Any]:
    """Public payment configuration; the client_id is public info."""
    client_id = os.getenv("PAYPAL_CLIENT_ID", "").strip()
    merchant_id = os.getenv("PAYPAL_MERCHANT_ID", "").strip()
    return {
        "enabled": bool(client_id and merchant_id),
        "client_id": client_id or None,
        "env": os.getenv("PAYPAL_ENV", "sandbox").strip() or "sandbox",
        "amount": PAYPAL_PRICE_USD,
        "currency": "USD",
    }


@app.post("/api/pay/orders")
async def create_payment_order(payload: PayOrderRequest, request: Request) -> dict[str, Any]:
    """Create a persistently bound PayPal order for an owned, unpaid report."""
    _paypal_merchant_id()
    file_id = payload.file_id.strip()
    async with _store_lock:
        session, _ = _resolve_session_locked(request)
        record = _uploads.get(file_id)
        task = _tasks.get(record.analysis_task_id) if record and record.analysis_task_id else None
        report = _report_for_task(task.task_id) if task else None
        if (
            record is None
            or task is None
            or report is None
            or file_id not in report.file_ids
            or not _session_can_access_report(session, report)
        ):
            raise HTTPException(status_code=404, detail="Report not found.")
        if report.expires_at <= time.time():
            raise HTTPException(status_code=410, detail="The analysis result has expired.")
        if task.status != "completed":
            raise HTTPException(status_code=409, detail="Analysis is not complete yet.")
        if report.paid_order_id:
            raise HTTPException(status_code=409, detail="This report is already unlocked.")
        now = time.time()
        # Reject duplicate verification before creating another provider order.
        # The second check after provider I/O closes the concurrent-create race.
        if any(
            item.report_id == report.report_id
            and item.status in {"capturing", "review_required", "captured"}
            and item.expires_at > now
            for item in _payment_orders.values()
        ):
            raise HTTPException(status_code=409, detail="A payment for this report is already being verified.")
        task_id = task.task_id
        report_id = report.report_id

    async with httpx.AsyncClient(base_url=_paypal_base(), timeout=30) as client:
        token = await _paypal_access_token(client)
        order = await _paypal_create_order(client, token, task_id)

    order_id = str(order.get("id") or "").strip()
    if not order_id or len(order_id) > 64:
        raise HTTPException(status_code=502, detail="Payment provider returned an invalid order.")
    now = time.time()
    async with _store_lock:
        if order_id in _payment_orders:
            raise HTTPException(status_code=502, detail="Payment provider returned a duplicate order.")
        current_report = _reports.get(report_id)
        if current_report is None or current_report.paid_order_id:
            raise HTTPException(status_code=409, detail="This report is already unlocked or expired.")
        if current_report.expires_at <= now:
            raise HTTPException(status_code=410, detail="The analysis result has expired.")
        if any(
            item.report_id == report_id
            and item.status in {"capturing", "review_required", "captured"}
            and item.expires_at > now
            for item in _payment_orders.values()
        ):
            raise HTTPException(status_code=409, detail="A payment for this report is already being verified.")
        payment_order = PaymentOrder(
            order_id=order_id,
            report_id=report_id,
            task_id=task_id,
            file_id=file_id,
            amount=PAYPAL_PRICE_USD,
            currency="USD",
            created_at=now,
            expires_at=current_report.expires_at,
        )
        try:
            _payment_orders.set_durable(order_id, payment_order)
        except PersistenceError as exc:
            raise HTTPException(
                status_code=503,
                detail="The payment order could not be saved. Please retry before approving payment.",
            ) from exc

    approve_url = next(
        (
            link.get("href")
            for link in order.get("links", [])
            if link.get("rel") in ("payer-action", "approve")
        ),
        None,
    )
    return {
        "order_id": order_id,
        "report_id": report_id,
        "amount": PAYPAL_PRICE_USD,
        "currency": "USD",
        "approve_url": approve_url,
        "env": os.getenv("PAYPAL_ENV", "sandbox").strip() or "sandbox",
    }


def _capture_context_locked(
    request: Request, file_id: str, order_id: str
) -> tuple[AnalysisTask, ReportAccess, PaymentOrder]:
    session, _ = _resolve_session_locked(request)
    record = _uploads.get(file_id)
    task = _tasks.get(record.analysis_task_id) if record and record.analysis_task_id else None
    report = _report_for_task(task.task_id) if task else None
    payment_order = _payment_orders.get(order_id)
    if (
        record is None
        or task is None
        or report is None
        or file_id not in report.file_ids
        or not _session_can_access_report(session, report)
    ):
        raise HTTPException(status_code=404, detail="Report not found.")
    if (
        payment_order is None
        or payment_order.report_id != report.report_id
        or payment_order.task_id != task.task_id
        or payment_order.file_id != file_id
    ):
        raise HTTPException(status_code=409, detail="Payment order does not match this report.")
    now = time.time()
    if report.expires_at <= now or payment_order.expires_at <= now:
        raise HTTPException(status_code=410, detail="The analysis result or payment session has expired.")
    if task.status != "completed":
        raise HTTPException(status_code=409, detail="Analysis is not complete yet.")
    return task, report, payment_order


def _payment_success(
    task: AnalysisTask, report: ReportAccess, file_id: str, order_id: str
) -> dict[str, Any]:
    return {
        "file_id": file_id,
        "task_id": task.task_id,
        "report_id": report.report_id,
        "payment_verified": True,
        "payment_mode": "paypal",
        "order_id": order_id,
        "full_report": _full_report(task.result),
        "generated_at": _iso(time.time()),
    }


@app.post("/api/pay/capture")
async def capture_payment(payload: PayCaptureRequest, request: Request) -> Any:
    """Capture at most once, reconcile by GET, and unlock only durable proof."""
    _paypal_merchant_id()
    file_id = payload.file_id.strip()
    order_id = payload.order_id.strip()
    async with _store_lock:
        task, report, _ = _capture_context_locked(request, file_id, order_id)
        if report.paid_order_id:
            if report.paid_order_id == order_id:
                return _payment_success(task, report, file_id, order_id)
            raise HTTPException(status_code=409, detail="Report was unlocked with another order.")
        if any(
            item.paid_order_id == order_id and item.report_id != report.report_id
            for item in _reports.values()
        ):
            raise HTTPException(status_code=409, detail="Payment order is already in use.")

    # A per-report lock closes both same-order retries and the more subtle
    # two-different-orders/one-report double-capture window. Stable PayPal
    # idempotency keys additionally cover the single initial capture attempt.
    lock = _payment_locks.setdefault(f"report:{report.report_id}", asyncio.Lock())
    async with lock:
        async with _store_lock:
            task, report, payment_order = _capture_context_locked(request, file_id, order_id)
            if report.paid_order_id:
                if report.paid_order_id == order_id:
                    return _payment_success(task, report, file_id, order_id)
                raise HTTPException(status_code=409, detail="Report was unlocked with another order.")
            # Any uncertain or post-capture local state is reconciled with GET
            # before money movement. In particular, a locally captured order whose
            # report write crashed must never be captured a second time.
            get_first = payment_order.status in {"capturing", "review_required", "captured"}
            if payment_order.status not in {"created", "capturing", "review_required", "captured"}:
                raise HTTPException(status_code=409, detail="Payment order requires manual review.")
            if not get_first:
                payment_order.status = "capturing"
                payment_order.capture_started_at = time.time()
                try:
                    _payment_orders.set_durable(order_id, payment_order)
                except PersistenceError as exc:
                    raise HTTPException(
                        status_code=503,
                        detail="Payment state is temporarily unavailable. No capture was attempted.",
                    ) from exc
            task_id = task.task_id

        provider_order: Any = None
        try:
            async with httpx.AsyncClient(base_url=_paypal_base(), timeout=30) as client:
                token = await _paypal_access_token(client)
                if not get_first:
                    # The capture response can be sparse. It is deliberately not
                    # used as proof of payment; only a subsequent full GET is.
                    await _paypal_capture_order(client, token, order_id)
                provider_order = await _paypal_get_order(client, token, order_id)
            _verify_capture(
                provider_order,
                task_id,
                order_id,
                payment_order.amount,
                payment_order.currency,
                _paypal_merchant_id(),
            )
        except Exception:
            async with _store_lock:
                current_order = _payment_orders.get(order_id)
                if current_order is not None and current_order.status == "capturing":
                    # Once capture may have reached PayPal, a timeout is also an
                    # uncertain financial result. Never reopen order creation.
                    current_order.status = "review_required"
                    current_order.capture_started_at = None
                    try:
                        _payment_orders.set_durable(order_id, current_order)
                    except PersistenceError:
                        # The last durable state remains "capturing", which is
                        # also fail-closed and blocks any replacement order.
                        logger.error("Could not persist review_required for order %s", order_id)
            raise

        async with _store_lock:
            # Authorization happens before provider I/O. Do not require the
            # browser session to remain logged in after money was captured.
            task = _tasks.get(task_id)
            report = _reports.get(report.report_id)
            payment_order = _payment_orders.get(order_id)
            if (
                task is None
                or report is None
                or payment_order is None
                or report.task_id != task_id
                or payment_order.report_id != report.report_id
                or payment_order.task_id != task_id
                or payment_order.file_id != file_id
                or file_id not in report.file_ids
            ):
                raise HTTPException(status_code=409, detail="Payment state changed during capture.")
            if report.paid_order_id:
                if report.paid_order_id == order_id:
                    return _payment_success(task, report, file_id, order_id)
                raise HTTPException(status_code=409, detail="Report was unlocked with another order.")
            if any(
                item.paid_order_id == order_id and item.report_id != report.report_id
                for item in _reports.values()
            ):
                raise HTTPException(status_code=409, detail="Payment order is already in use.")
            paid_at = time.time()
            # Keep the live report locked until both required writes complete.
            # The order is committed first so a report-write failure can be
            # reconciled by GET and finalized without another capture request.
            paid_report = copy.deepcopy(report)
            captured_order = copy.deepcopy(payment_order)
            paid_report.paid_order_id = order_id
            paid_report.paid_at = paid_at
            paid_report.expires_at = paid_at + PAID_RESULT_TTL_SECONDS
            captured_order.status = "captured"
            captured_order.captured_at = paid_at
            captured_order.capture_started_at = None
            captured_order.expires_at = paid_report.expires_at
            try:
                _payment_orders.set_durable(order_id, captured_order)
                _reports.set_durable(paid_report.report_id, paid_report)
            except PersistenceError:
                current_order = _payment_orders.get(order_id)
                if current_order is not None:
                    current_order.status = "review_required"
                    current_order.capture_started_at = None
                    try:
                        _payment_orders[order_id] = current_order
                    except Exception:  # noqa: BLE001 - remain fail-closed
                        logger.error("Could not mark payment order for review")
                return JSONResponse(
                    status_code=202,
                    content={
                        "file_id": file_id,
                        "task_id": task_id,
                        "report_id": report.report_id,
                        "payment_verified": False,
                        "payment_pending": True,
                        "order_id": order_id,
                        "message": "Payment is being confirmed. Retry this order; no new order is needed.",
                    },
                )
            report = paid_report
            result = _payment_success(task, report, file_id, order_id)

    logger.info("PayPal payment captured for report task %s (order %s)", task_id, order_id)
    return result


@app.get("/api/status/{task_id}")
async def get_task_status(task_id: str, request: Request) -> dict[str, Any]:
    async with _store_lock:
        task = _tasks.get(task_id)
        if task is None:
            raise HTTPException(status_code=404, detail="Task ID not found.")
        report = _report_for_task(task_id)
        if report is None:
            # Pre-report-center tasks have no safe ownership proof. Keep a
            # minimal polling response but never return preview/file/full data.
            return _legacy_task_public(task)
        session, _ = _resolve_session_locked(request)
        if report.expires_at <= time.time() or not _session_can_access_report(session, report):
            raise HTTPException(status_code=404, detail="Task ID not found.")
        return {
            **_task_public(task),
            "report_id": report.report_id,
            "expires_at": _iso(report.expires_at),
            "payment_verified": bool(report.paid_order_id),
        }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "api.main:app",
        host=os.getenv("HOST", "127.0.0.1"),
        port=_env_int("PORT", 8000),
        reload=False,
    )
