#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Phase 3 AI 流水线配置。

密钥只从环境变量读取，禁止把真实 ARK_API_KEY 写入本文件或提交到版本库。
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SHANGHAIMED_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_MATCHER_PATH = (
    SHANGHAIMED_ROOT / "doctor-database" / "matching-engine" / "matcher.py"
)

API_BASE_URL = "https://ark.cn-beijing.volces.com/api/v3"
API_KEY_ENV = "ARK_API_KEY"

# 主力模型
MODEL_KIMI = "kimi-k3-1-pro-261024"
MODEL_DOUBAO = "doubao-seed-2-1-pro-260915"  # 新版，比 260628 更快
MODEL_GLM = "glm-5-2-260617"

# 备选模型（主力超时/失败时自动切换）
MODEL_GLM_FLASH = "glm-5-3-flash-260828"
MODEL_DEEPSEEK = "deepseek-v4-1-flash-261017"

# 每个阶段的主力+备选模型链
MODEL_CHAINS: Dict[str, List[str]] = {
    "ocr_kimi": [MODEL_KIMI, MODEL_GLM, MODEL_GLM_FLASH],
    "ocr_doubao": [MODEL_GLM, MODEL_DOUBAO, MODEL_GLM_FLASH],
    "ocr_integrate": [MODEL_KIMI, MODEL_GLM_FLASH, MODEL_DEEPSEEK],
    "timeline_kimi": [MODEL_KIMI, MODEL_GLM, MODEL_GLM_FLASH],
    "timeline_doubao": [MODEL_GLM, MODEL_GLM_FLASH, MODEL_KIMI],
    "timeline_integrate": [MODEL_KIMI, MODEL_GLM_FLASH, MODEL_DEEPSEEK],
    "report_generate": [MODEL_KIMI, MODEL_GLM_FLASH, MODEL_DEEPSEEK],
    "report_review": [MODEL_KIMI, MODEL_GLM_FLASH, MODEL_DEEPSEEK],
}


def _env_int(name: str, default: int) -> int:
    value = os.getenv(name)
    if value is None or not value.strip():
        return default
    try:
        return int(value)
    except ValueError:
        return default


def _env_float(name: str, default: float) -> float:
    value = os.getenv(name)
    if value is None or not value.strip():
        return default
    try:
        return float(value)
    except ValueError:
        return default


@dataclass(frozen=True)
class PipelineConfig:
    """AI 调用、文件处理和匹配引擎配置。"""

    api_key: str = ""
    base_url: str = API_BASE_URL
    kimi_model: str = MODEL_KIMI
    doubao_model: str = MODEL_DOUBAO
    glm_model: str = MODEL_GLM
    glm_flash_model: str = MODEL_GLM_FLASH
    deepseek_model: str = MODEL_DEEPSEEK
    model_chains: Dict[str, List[str]] = field(default_factory=lambda: dict(MODEL_CHAINS))
    timeout_seconds: float = 45.0
    max_retries: int = 1
    retry_backoff_seconds: float = 1.0
    max_tokens: int = 8192
    temperature: float = 0.1
    max_file_bytes: int = 20 * 1024 * 1024
    max_total_bytes: int = 80 * 1024 * 1024
    max_documents: int = 40
    max_zip_compression_ratio: int = 200
    max_document_chars: int = 60_000
    matcher_path: Path = DEFAULT_MATCHER_PATH

    def __post_init__(self) -> None:
        if self.timeout_seconds <= 0:
            raise ValueError("timeout_seconds 必须大于 0")
        if not 0 <= self.max_retries <= 2:
            raise ValueError("max_retries 必须在 0 到 2 之间")
        if self.max_documents <= 0 or self.max_file_bytes <= 0:
            raise ValueError("文件数量与大小限制必须大于 0")


def load_config() -> PipelineConfig:
    """从环境变量加载配置；未设置的项使用安全默认值。"""

    matcher_path = Path(
        os.getenv("SHANGHAIMED_MATCHER_PATH", str(DEFAULT_MATCHER_PATH))
    ).expanduser()
    return PipelineConfig(
        api_key=os.getenv(API_KEY_ENV, "").strip(),
        base_url=os.getenv("ARK_BASE_URL", API_BASE_URL).strip().rstrip("/"),
        kimi_model=os.getenv("ARK_KIMI_MODEL", MODEL_KIMI).strip(),
        doubao_model=os.getenv("ARK_DOUBAO_MODEL", MODEL_DOUBAO).strip(),
        glm_model=os.getenv("ARK_GLM_MODEL", MODEL_GLM).strip(),
        timeout_seconds=_env_float("ARK_TIMEOUT_SECONDS", 45.0),
        max_retries=_env_int("ARK_MAX_RETRIES", 1),
        retry_backoff_seconds=_env_float("ARK_RETRY_BACKOFF_SECONDS", 1.0),
        max_tokens=_env_int("ARK_MAX_TOKENS", 8192),
        max_file_bytes=_env_int("MEDICAL_MAX_FILE_BYTES", 20 * 1024 * 1024),
        max_total_bytes=_env_int("MEDICAL_MAX_TOTAL_BYTES", 80 * 1024 * 1024),
        max_documents=_env_int("MEDICAL_MAX_DOCUMENTS", 40),
        max_document_chars=_env_int("MEDICAL_MAX_DOCUMENT_CHARS", 60_000),
        matcher_path=matcher_path,
    )
