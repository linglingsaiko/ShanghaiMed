"""Domain models and cryptographic helpers for MediMatch report access.

Only salted hashes of report access codes and OTPs are persisted. Browser session
cookies contain a random bearer token; only its SHA-256 digest is persisted.
"""

from __future__ import annotations

import hashlib
import hmac
import re
import secrets
from dataclasses import dataclass
from typing import Optional

_PBKDF2_ITERATIONS = 210_000
_EMAIL_RE = re.compile(
    r"^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@"
    r"[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?"
    r"(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$"
)


@dataclass
class ReportAccess:
    report_id: str
    task_id: str
    file_ids: list[str]
    access_salt: str
    access_hash: str
    created_at: float
    expires_at: float
    owner_user_id: Optional[str] = None
    pending_email: Optional[str] = None
    paid_order_id: Optional[str] = None
    paid_at: Optional[float] = None
    access_code_consumed: bool = False


@dataclass
class BrowserSession:
    session_hash: str
    report_ids: list[str]
    created_at: float
    expires_at: float
    user_id: Optional[str] = None
    # A claim candidate may be persisted before the one-time code if Redis Lua
    # fails mid-script. Such a session cannot read the report until the durable
    # report confirms code consumption, including after a process restart.
    pending_claim_report_ids: Optional[list[str]] = None
    # Server-generated claim lineage keeps prior anonymous uploads reachable
    # even if Redis fails part-way through ownership migration. It is never
    # inherited when switching to a different authenticated account.
    claim_source_session_hashes: Optional[list[str]] = None
    # A source bearer becomes unusable once a later claim/OTP generation has
    # consumed its lineage. The record remains only as durable lineage metadata.
    superseded_by_session_hash: Optional[str] = None


@dataclass
class User:
    user_id: str
    email: str
    created_at: float


@dataclass
class EmailOTP:
    email_key: str
    code_salt: str
    code_hash: str
    created_at: float
    expires_at: float
    last_sent_at: float
    attempts: int = 0


@dataclass
class PaymentOrder:
    order_id: str
    report_id: str
    task_id: str
    file_id: str
    amount: str
    currency: str
    created_at: float
    expires_at: float
    status: str = "created"
    capture_started_at: Optional[float] = None
    captured_at: Optional[float] = None


def normalize_email(value: str) -> str:
    """Return a conservative, canonical email or raise ValueError."""
    email = (value or "").strip().lower()
    if len(email) > 254 or not email or any(ord(char) < 33 for char in email):
        raise ValueError("Invalid email address.")
    local, separator, domain = email.partition("@")
    if not separator or len(local) > 64 or len(domain) > 253 or not _EMAIL_RE.fullmatch(email):
        raise ValueError("Invalid email address.")
    return email


def email_key(email: str) -> str:
    return hashlib.sha256(email.encode("utf-8")).hexdigest()


def mask_email(email: str) -> str:
    local, _, domain = email.partition("@")
    if len(local) == 1:
        masked = "*"
    else:
        masked = local[0] + "***" + local[-1]
    return f"{masked}@{domain}"


def new_session_token() -> str:
    return secrets.token_urlsafe(32)


def hash_session_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def new_report_id() -> str:
    return f"SM-{secrets.token_hex(16).upper()}"


def new_access_code() -> str:
    return secrets.token_urlsafe(24)


def new_otp_code() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"


def hash_secret(secret: str, salt_hex: Optional[str] = None) -> tuple[str, str]:
    salt = bytes.fromhex(salt_hex) if salt_hex else secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256", secret.encode("utf-8"), salt, _PBKDF2_ITERATIONS
    )
    return salt.hex(), digest.hex()


def verify_secret(secret: str, salt_hex: str, expected_hash: str) -> bool:
    try:
        _, actual_hash = hash_secret(secret, salt_hex)
    except (TypeError, ValueError):
        return False
    return hmac.compare_digest(actual_hash, expected_hash)
