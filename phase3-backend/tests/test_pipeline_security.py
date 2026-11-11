"""Offline security regression tests for ``lib.ai_pipeline``.

All PDF, ZIP and model-response data in this module is synthetic. No test reads
credentials, creates uploads, contacts AI providers, or accesses external services.
"""

from __future__ import annotations

import asyncio
import io
import logging
import sys
import traceback
import zipfile
import zlib
from pathlib import Path

import pytest

BACKEND_DIR = Path(__file__).resolve().parents[1]
LIB_DIR = BACKEND_DIR / "lib"
if str(LIB_DIR) not in sys.path:
    sys.path.insert(0, str(LIB_DIR))

import ai_pipeline
from config import PipelineConfig


PHI_MARKER = "SYNTHETIC_PHI_DO_NOT_EXPOSE_7F3A9C"


def make_pdf(streams):
    """Build a small synthetic PDF containing only content-stream objects."""
    parts = [b"%PDF-1.4\n"]
    for object_number, (content, use_flate) in enumerate(streams, start=1):
        encoded = zlib.compress(content) if use_flate else content
        filter_entry = b" /Filter /FlateDecode" if use_flate else b""
        parts.extend(
            [
                f"{object_number} 0 obj\n".encode("ascii"),
                f"<< /Length {len(encoded)}".encode("ascii"),
                filter_entry,
                b" >>\nstream\n",
                encoded,
                b"\nendstream\nendobj\n",
            ]
        )
    return b"".join(parts)


def formatted_exception(exc_info):
    exc = exc_info.value
    return "".join(traceback.format_exception(type(exc), exc, exc.__traceback__))


@pytest.mark.parametrize("use_flate", [False, True], ids=["plain", "flate"])
def test_normal_small_pdf_text_extraction(use_flate):
    expected = "Synthetic routine cardiology follow-up"
    content = f"BT ({expected}) Tj ET".encode("ascii")

    result = ai_pipeline.extract_pdf_text(make_pdf([(content, use_flate)]))

    assert result == expected


def test_normal_deflated_zip_with_pdf_remains_compatible():
    expected = "Synthetic ZIP-contained PDF"
    pdf = make_pdf([(f"BT ({expected}) Tj ET".encode("ascii"), True)])
    archive_bytes = io.BytesIO()
    with zipfile.ZipFile(archive_bytes, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        archive.writestr("synthetic_record.pdf", pdf)

    pipeline = ai_pipeline.AIPipeline(PipelineConfig())
    documents = pipeline._prepare_zip(archive_bytes.getvalue())

    assert len(documents) == 1
    assert documents[0].kind == "pdf_text"
    assert documents[0].text == expected


def test_single_flate_stream_over_limit_raises_without_expanded_content(monkeypatch):
    monkeypatch.setattr(ai_pipeline, "PDF_FLATE_MAX_STREAM_BYTES", 64)
    monkeypatch.setattr(ai_pipeline, "PDF_FLATE_MAX_TOTAL_BYTES", 1024)
    expanded = (PHI_MARKER.encode("ascii") + b"X") * 4
    pdf = make_pdf([(expanded, True)])

    with pytest.raises(ai_pipeline.PipelineError) as exc_info:
        ai_pipeline.extract_pdf_text(pdf)

    assert exc_info.value.stage == "prepare_files"
    assert "超过安全限制" in str(exc_info.value)
    assert PHI_MARKER not in str(exc_info.value)
    assert PHI_MARKER not in formatted_exception(exc_info)


def test_flate_streams_over_cumulative_limit_raise(monkeypatch):
    monkeypatch.setattr(ai_pipeline, "PDF_FLATE_MAX_STREAM_BYTES", 128)
    monkeypatch.setattr(ai_pipeline, "PDF_FLATE_MAX_TOTAL_BYTES", 160)
    # Each stream is individually valid, but 100 + 100 exceeds the total of 160.
    pdf = make_pdf([(b"A" * 100, True), (b"B" * 100, True)])

    with pytest.raises(ai_pipeline.PipelineError) as exc_info:
        ai_pipeline.extract_pdf_text(pdf)

    assert exc_info.value.stage == "prepare_files"
    assert "超过安全限制" in str(exc_info.value)


@pytest.mark.parametrize(
    "malformed_response",
    [
        "Synthetic non-JSON model output: " + PHI_MARKER,
        '{"diagnosis": "' + PHI_MARKER + '",}',
    ],
    ids=["no-json-object", "invalid-json-object"],
)
def test_json_errors_and_logs_never_contain_model_output(
    malformed_response, caplog
):
    pipeline = ai_pipeline.AIPipeline(PipelineConfig())

    async def fake_chat(model, messages, stage):
        return malformed_response

    pipeline._chat = fake_chat
    logger = logging.getLogger("synthetic.pipeline.security")

    with caplog.at_level(logging.ERROR, logger=logger.name):
        with pytest.raises(ai_pipeline.PipelineError) as exc_info:
            try:
                asyncio.run(pipeline._chat_json("synthetic-model", [], "ocr_kimi"))
            except ai_pipeline.PipelineError:
                logger.exception("Synthetic pipeline parsing failure")
                raise

    assert exc_info.value.stage == "ocr_kimi"
    assert exc_info.value.message == "模型未返回有效 JSON"
    assert PHI_MARKER not in str(exc_info.value)
    assert PHI_MARKER not in formatted_exception(exc_info)
    assert PHI_MARKER not in caplog.text
    assert "原始内容" not in str(exc_info.value)
    assert "解析错误" not in str(exc_info.value)
