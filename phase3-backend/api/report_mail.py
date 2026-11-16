"""Environment-configured transactional email delivery for MediMatch."""

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


def _send_message(message: EmailMessage) -> None:
    """Send a prepared message using the shared environment SMTP settings."""
    if not email_enabled():
        raise RuntimeError("SMTP is not configured.")

    host = os.environ["SMTP_HOST"].strip()
    sender = os.environ["SMTP_FROM"].strip()
    message["From"] = sender
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


def send_otp_email(recipient: str, code: str) -> None:
    """Send one OTP synchronously; the caller should use asyncio.to_thread.

    Credentials are read only from environment variables. Exceptions propagate
    so the API can return a truthful delivery error instead of pretending success.
    """
    message = EmailMessage()
    message["Subject"] = "Your ShanghaiMed sign-in code"
    message["To"] = recipient
    message.set_content(
        "Your ShanghaiMed verification code is: "
        f"{code}\n\nThis code expires in 10 minutes and can be used once. "
        "If you did not request it, you can ignore this email."
    )
    _send_message(message)


def send_report_email(recipient: str, report_id: str, report_text: str) -> None:
    """Send a plaintext medical report synchronously via the shared SMTP setup."""
    message = EmailMessage()
    message["Subject"] = f"Your MediMatch medical report / 您的病历分析报告 - {report_id}"
    message["To"] = recipient
    message.set_content(report_text)
    _send_message(message)
