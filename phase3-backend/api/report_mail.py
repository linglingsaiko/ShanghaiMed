"""Environment-configured transactional email delivery for MediMatch OTPs."""

from __future__ import annotations

import os
import smtplib
import ssl
from email.message import EmailMessage


def _flag(name: str, default: bool) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def email_enabled() -> bool:
    """Expose only whether delivery is configured, never connection details."""
    return bool(os.getenv("SMTP_HOST", "").strip() and os.getenv("SMTP_FROM", "").strip())


def send_otp_email(recipient: str, code: str) -> None:
    """Send one OTP synchronously; the caller should use asyncio.to_thread.

    Credentials are read only from environment variables. Exceptions propagate
    so the API can return a truthful delivery error instead of pretending success.
    """
    if not email_enabled():
        raise RuntimeError("SMTP is not configured.")

    host = os.environ["SMTP_HOST"].strip()
    sender = os.environ["SMTP_FROM"].strip()
    username = os.getenv("SMTP_USERNAME", "").strip()
    password = os.getenv("SMTP_PASSWORD", "")
    try:
        port = int(os.getenv("SMTP_PORT", "587"))
    except ValueError as exc:
        raise RuntimeError("Invalid SMTP port.") from exc
    try:
        timeout = float(os.getenv("SMTP_TIMEOUT_SECONDS", "15"))
    except ValueError as exc:
        raise RuntimeError("Invalid SMTP timeout.") from exc
    if port <= 0 or port > 65535 or timeout <= 0:
        raise RuntimeError("Invalid SMTP configuration.")

    message = EmailMessage()
    message["Subject"] = "Your ShanghaiMed sign-in code"
    message["From"] = sender
    message["To"] = recipient
    message.set_content(
        "Your ShanghaiMed verification code is: "
        f"{code}\n\nThis code expires in 10 minutes and can be used once. "
        "If you did not request it, you can ignore this email."
    )

    context = ssl.create_default_context()
    if _flag("SMTP_USE_SSL", False):
        with smtplib.SMTP_SSL(host, port, timeout=timeout, context=context) as smtp:
            if username:
                smtp.login(username, password)
            smtp.send_message(message)
        return

    with smtplib.SMTP(host, port, timeout=timeout) as smtp:
        smtp.ehlo()
        if _flag("SMTP_USE_TLS", True):
            smtp.starttls(context=context)
            smtp.ehlo()
        if username:
            smtp.login(username, password)
        smtp.send_message(message)
