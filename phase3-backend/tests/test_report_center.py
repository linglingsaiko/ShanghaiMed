"""Offline MediMatch report-center integration and adversarial tests.

All records are synthetic. SQLite/temp files stay under this tests directory;
AI, SMTP and PayPal functions are mocked, and no external service is contacted.
"""

from __future__ import annotations

import asyncio
import importlib.util
import itertools
import json
import sqlite3
import sys
import tempfile
import time
from pathlib import Path

import httpx
import pytest

TESTS_DIR = Path(__file__).resolve().parent
MAIN_PATH = TESTS_DIR.parent / "api" / "main.py"
_MODULE_SEQUENCE = itertools.count()
_LOADED_MODULES = []


def load_main(label="case"):
    """Load an isolated backend instance without touching the real api.main module."""
    module_name = f"medi_match_test_{label}_{next(_MODULE_SEQUENCE)}"
    spec = importlib.util.spec_from_file_location(module_name, MAIN_PATH)
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    sys.modules[module_name] = module
    spec.loader.exec_module(module)
    _LOADED_MODULES.append(module)
    return module


@pytest.fixture()
def service(monkeypatch):
    with tempfile.TemporaryDirectory(prefix="case_", dir=TESTS_DIR) as directory:
        root = Path(directory)
        (root / "uploads").mkdir(mode=0o700)
        monkeypatch.setenv("MEDICAL_RECORDS_TEMP_DIR", str(root / "uploads"))
        monkeypatch.setenv("MEDICAL_RECORDS_DB", str(root / "medi-match-test.db"))
        monkeypatch.setenv("TRUST_PROXY_HEADERS", "0")
        monkeypatch.setenv("PAYPAL_ENV", "sandbox")
        monkeypatch.setenv("PAYPAL_MERCHANT_ID", "synthetic-merchant")
        for name in (
            "UPSTASH_REDIS_REST_URL",
            "UPSTASH_REDIS_REST_TOKEN",
            "SMTP_HOST",
            "SMTP_PORT",
            "SMTP_USERNAME",
            "SMTP_PASSWORD",
            "SMTP_FROM",
            "PAYPAL_CLIENT_ID",
            "PAYPAL_CLIENT_SECRET",
        ):
            monkeypatch.delenv(name, raising=False)

        main = load_main()

        async def fake_analysis(task_id, paths, chief_complaint=""):
            task = main._tasks[task_id]
            task.result = {
                "preview": {"summary": "Synthetic free preview"},
                "full_report": {"text": "Synthetic paid report"},
            }
            task.preview = {"summary": "Synthetic free preview"}
            task.status = "completed"
            task.current_step = "completed"
            task.progress = 100
            task.updated_at = time.time()
            main._tasks[task_id] = task
            for file_id in task.file_ids:
                record = main._uploads[file_id]
                record.path = None
                record.status = "deleted"
                main._uploads[file_id] = record

        main._real_run_analysis = main._run_analysis
        monkeypatch.setattr(main, "_run_analysis", fake_analysis)
        try:
            yield main, root
        finally:
            for module in _LOADED_MODULES:
                close_stores(module)
            _LOADED_MODULES.clear()


def close_stores(main):
    for store in (
        main._uploads,
        main._tasks,
        main._reports,
        main._sessions,
        main._users,
        main._otps,
        main._payment_orders,
    ):
        store.close()


def client_for(main):
    return httpx.AsyncClient(
        transport=httpx.ASGITransport(app=main.app),
        base_url="https://testserver",
    )


async def create_report(client, main, email=None):
    upload = await client.post(
        "/api/upload",
        files={"files": ("synthetic.pdf", b"%PDF-1.4\nsynthetic\n", "application/pdf")},
    )
    assert upload.status_code == 200, upload.text
    file_id = upload.json()["file_ids"][0]
    payload = {"file_ids": [file_id], "chief_complaint": "synthetic test"}
    if email is not None:
        payload["email"] = email
    analyzed = await client.post("/api/analyze?wait=true", json=payload)
    assert analyzed.status_code == 200, analyzed.text
    body = analyzed.json()
    assert body["report_id"].startswith("SM-")
    assert body["access_code"]
    return {
        "file_id": file_id,
        "task_id": body["task_id"],
        "report_id": body["report_id"],
        "access_code": body["access_code"],
        "upload_response": upload,
        "analyze_response": analyzed,
    }


def enable_fake_mail(main, monkeypatch):
    monkeypatch.setenv("SMTP_HOST", "smtp.invalid")
    monkeypatch.setenv("SMTP_FROM", "no-reply@example.invalid")
    delivered = []

    async def deliver(email, code):
        delivered.append((email, code))

    monkeypatch.setattr(main, "_deliver_otp", deliver)
    return delivered


def mock_paypal(main, monkeypatch, capture_factory=None, concurrent_delay=0, on_capture=None):
    """Synthetic stateful PayPal: capture is sparse; GET returns the full contract."""
    calls = {"create": 0, "capture": 0, "get": 0, "token": 0}

    async def token(client):
        calls["token"] += 1
        return "synthetic-token"

    async def create(client, access_token, task_id):
        calls["create"] += 1
        order_id = f"ORDER-TEST-{calls['create']:04d}"
        return {
            "id": order_id,
            "links": [{"rel": "approve", "href": f"https://paypal.invalid/{order_id}"}],
        }

    def authoritative_order(order_id):
        if capture_factory is not None:
            return capture_factory(order_id)
        report_order = main._payment_orders[order_id]
        return completed_provider_order(
            order_id, report_order.task_id, report_order.amount, report_order.currency
        )

    async def capture(client, access_token, order_id):
        calls["capture"] += 1
        if concurrent_delay:
            await asyncio.sleep(concurrent_delay)
        if on_capture is not None:
            await on_capture()
        # Deliberately omit custom_id, payee and amounts. This body must never
        # be accepted as payment proof by the endpoint.
        return {
            "id": order_id,
            "status": "COMPLETED",
            "purchase_units": [{"payments": {"captures": [{"id": "SPARSE", "status": "COMPLETED"}]}}],
        }

    async def get_order(client, access_token, order_id):
        calls["get"] += 1
        return authoritative_order(order_id)

    monkeypatch.setattr(main, "_paypal_access_token", token)
    monkeypatch.setattr(main, "_paypal_create_order", create)
    monkeypatch.setattr(main, "_paypal_capture_order", capture)
    monkeypatch.setattr(main, "_paypal_get_order", get_order)
    return calls


def completed_provider_order(
    order_id, task_id, amount="9.90", currency="USD", merchant_id="synthetic-merchant"
):
    return {
        "id": order_id,
        "status": "COMPLETED",
        "purchase_units": [
            {
                "custom_id": task_id,
                "payee": {"merchant_id": merchant_id},
                "amount": {"value": amount, "currency_code": currency},
                "payments": {
                    "captures": [
                        {
                            "id": f"CAPTURE-{order_id}",
                            "status": "COMPLETED",
                            "amount": {"value": amount, "currency_code": currency},
                        }
                    ]
                },
            }
        ],
    }


def test_same_device_list_status_whitelist_and_cookie(service):
    main, _ = service

    async def scenario():
        async with client_for(main) as client:
            disabled = await client.get("/api/auth/config")
            assert disabled.status_code == 200
            assert disabled.json()["email_enabled"] is False
            unavailable = await client.post(
                "/api/auth/request", json={"email": "person@example.invalid"}
            )
            assert unavailable.status_code == 503

            report = await create_report(client, main)
            cookie = report["upload_response"].headers["set-cookie"].lower()
            for attribute in ("httponly", "secure", "samesite=lax", "path=/", "max-age="):
                assert attribute in cookie
            assert report["analyze_response"].headers["cache-control"] == "no-store"
            analyze_cookie = report["analyze_response"].headers["set-cookie"].lower()
            for attribute in ("httponly", "secure", "samesite=lax", "path=/", "max-age="):
                assert attribute in analyze_cookie

            listed = await client.get("/api/reports")
            assert listed.status_code == 200
            assert [item["report_id"] for item in listed.json()["reports"]] == [report["report_id"]]
            assert "access_code" not in listed.text
            assert "full_report" not in listed.text
            assert "preview" not in listed.text

            detail = await client.get(f"/api/reports/{report['report_id']}")
            assert detail.status_code == 200
            assert detail.json()["preview"] == {"summary": "Synthetic free preview"}
            assert "full_report" not in detail.json()
            assert "access_code" not in detail.text

            status = await client.get(f"/api/status/{report['task_id']}")
            assert status.status_code == 200
            assert status.json()["report_id"] == report["report_id"]
            assert "full_report" not in status.text
            assert "access_code" not in status.text
            stored = main._reports[report["report_id"]]
            assert stored.access_hash != report["access_code"]
            assert report["access_code"] not in json.dumps(main.asdict(stored))

    asyncio.run(scenario())


def test_cross_session_idor_and_recovery_code(service):
    main, _ = service

    async def scenario():
        async with client_for(main) as owner, client_for(main) as other, client_for(main) as empty:
            report = await create_report(owner, main)
            assert (await empty.get("/api/reports")).json() == {"reports": []}
            assert (await other.get(f"/api/reports/{report['report_id']}")).status_code == 404
            assert (await other.get(f"/api/status/{report['task_id']}")).status_code == 404
            swapped_payment = await other.post(
                "/api/pay/orders", json={"file_id": report["file_id"]}
            )
            assert swapped_payment.status_code == 404
            swapped_analysis = await other.post(
                "/api/analyze?wait=true", json={"file_ids": [report["file_id"]]}
            )
            assert swapped_analysis.status_code == 404

            malformed = await other.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": "do-not-reflect"},
            )
            assert malformed.status_code == 422
            assert "do-not-reflect" not in malformed.text
            assert "input" not in malformed.text

            wrong = await other.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": "x" * 32},
            )
            assert wrong.status_code == 403
            assert (await other.get(f"/api/reports/{report['report_id']}")).status_code == 404

            claimed = await other.post(
                "/api/reports/claim",
                json={
                    "report_id": report["report_id"],
                    "access_code": report["access_code"],
                },
            )
            assert claimed.status_code == 200, claimed.text
            assert claimed.json()["report"]["report_id"] == report["report_id"]
            assert "access_code" not in claimed.text
            recovered = await other.get(f"/api/reports/{report['report_id']}")
            assert recovered.status_code == 200
            assert "full_report" not in recovered.json()

            csrf = await empty.post(
                "/api/reports/claim",
                headers={"Origin": "https://attacker.invalid"},
                json={
                    "report_id": report["report_id"],
                    "access_code": report["access_code"],
                },
            )
            assert csrf.status_code == 403
            assert (await empty.get(f"/api/reports/{report['report_id']}")).status_code == 404

            async with client_for(main) as fixed_session:
                fixed_session.cookies.set(
                    main.SESSION_COOKIE_NAME, "attacker-fixed-token", domain="testserver"
                )
                assert (
                    await fixed_session.get(f"/api/reports/{report['report_id']}")
                ).status_code == 404
                replay = await fixed_session.post(
                    "/api/reports/claim",
                    json={
                        "report_id": report["report_id"],
                        "access_code": report["access_code"],
                    },
                )
                assert replay.status_code == 403
                assert "full_report" not in replay.text
                assert (await fixed_session.get(f"/api/reports/{report['report_id']}")).status_code == 404

            brute_target = await create_report(owner, main)
            for _ in range(10):
                attempt = await other.post(
                    "/api/reports/claim",
                    json={
                        "report_id": brute_target["report_id"],
                        "access_code": "z" * 32,
                    },
                )
                assert attempt.status_code == 403
            limited = await other.post(
                "/api/reports/claim",
                json={
                    "report_id": brute_target["report_id"],
                    "access_code": "z" * 32,
                },
            )
            assert limited.status_code == 429

    asyncio.run(scenario())


def test_otp_rotation_claim_replay_and_cross_device_login(service, monkeypatch):
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with client_for(main) as browser, client_for(main) as new_device:
            report = await create_report(browser, main, "Person@Example.invalid")
            anonymous_report = await create_report(browser, main)
            old_token = browser.cookies.get(main.SESSION_COOKIE_NAME)
            assert old_token
            config = await browser.get("/api/auth/config")
            assert config.json()["email_enabled"] is True

            requested = await browser.post(
                "/api/auth/request", json={"email": "person@example.invalid"}
            )
            assert requested.status_code == 200, requested.text
            assert requested.json()["status"] == "accepted"
            assert len(delivered) == 1
            code = delivered[-1][1]
            frequent = await browser.post(
                "/api/auth/request", json={"email": "person@example.invalid"}
            )
            assert frequent.status_code == 429

            wrong = await browser.post(
                "/api/auth/verify",
                json={"email": "person@example.invalid", "code": "000000"},
            )
            assert wrong.status_code == 401
            verified = await browser.post(
                "/api/auth/verify",
                json={"email": "person@example.invalid", "code": code},
            )
            assert verified.status_code == 200, verified.text
            rotated_token = browser.cookies.get(main.SESSION_COOKIE_NAME)
            assert rotated_token and rotated_token != old_token
            assert main.hash_session_token(old_token) not in main._sessions
            assert main._reports[report["report_id"]].pending_email is None
            assert main._reports[report["report_id"]].owner_user_id

            me = await browser.get("/api/auth/me")
            assert me.json()["authenticated"] is True
            assert "Person@Example.invalid" not in me.text
            assert "person@example.invalid" not in me.text
            owned = await browser.get(f"/api/reports/{report['report_id']}")
            assert owned.status_code == 200

            old_browser = client_for(main)
            old_browser.cookies.set(main.SESSION_COOKIE_NAME, old_token)
            async with old_browser:
                assert (await old_browser.get("/api/auth/me")).json()["authenticated"] is False
                assert (await old_browser.get(f"/api/reports/{report['report_id']}")).status_code == 404

            replay = await browser.post(
                "/api/auth/verify",
                json={"email": "person@example.invalid", "code": code},
            )
            assert replay.status_code == 401

            await new_device.post(
                "/api/auth/request", json={"email": "person@example.invalid"}
            )
            second_code = delivered[-1][1]
            second_login = await new_device.post(
                "/api/auth/verify",
                json={"email": "person@example.invalid", "code": second_code},
            )
            assert second_login.status_code == 200
            remote_reports = await new_device.get("/api/reports")
            assert report["report_id"] in remote_reports.text
            assert anonymous_report["report_id"] in remote_reports.text
            assert main._reports[anonymous_report["report_id"]].owner_user_id == main._reports[report["report_id"]].owner_user_id
            assert (await new_device.get(f"/api/reports/{report['report_id']}")).status_code == 200
            assert (await new_device.get(f"/api/reports/{anonymous_report['report_id']}")).status_code == 200

    asyncio.run(scenario())


def test_otp_expiry_and_logout(service, monkeypatch):
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with client_for(main) as client:
            await client.post("/api/auth/request", json={"email": "expiry@example.invalid"})
            code = delivered[-1][1]
            key = main.email_key("expiry@example.invalid")
            otp = main._otps[key]
            otp.expires_at = time.time() - 1
            main._otps[key] = otp
            expired = await client.post(
                "/api/auth/verify", json={"email": "expiry@example.invalid", "code": code}
            )
            assert expired.status_code == 401
            assert key not in main._otps

            await client.post("/api/auth/request", json={"email": "expiry@example.invalid"})
            fresh_code = delivered[-1][1]
            assert (await client.post(
                "/api/auth/verify",
                json={"email": "expiry@example.invalid", "code": fresh_code},
            )).status_code == 200
            assert (await client.post("/api/auth/logout")).status_code == 200
            assert (await client.get("/api/auth/me")).json()["authenticated"] is False

    asyncio.run(scenario())


def test_payment_repeat_recovery_and_paid_ttl(service, monkeypatch):
    main, _ = service
    calls = mock_paypal(main, monkeypatch)

    async def scenario():
        async with client_for(main) as owner, client_for(main) as intruder, client_for(main) as recovered:
            report = await create_report(owner, main)
            order = await owner.post("/api/pay/orders", json={"file_id": report["file_id"]})
            assert order.status_code == 200, order.text
            order_id = order.json()["order_id"]
            forbidden = await intruder.post(
                "/api/pay/capture",
                json={"file_id": report["file_id"], "order_id": order_id},
            )
            assert forbidden.status_code == 404
            assert calls["capture"] == 0

            captured = await owner.post(
                "/api/pay/capture",
                json={"file_id": report["file_id"], "order_id": order_id},
            )
            assert captured.status_code == 200, captured.text
            assert captured.json()["full_report"] == {"text": "Synthetic paid report"}
            assert calls["capture"] == 1
            stored = main._reports[report["report_id"]]
            assert stored.paid_order_id == order_id
            assert stored.expires_at - stored.paid_at == main.PAID_RESULT_TTL_SECONDS

            repeated = await owner.post(
                "/api/pay/capture",
                json={"file_id": report["file_id"], "order_id": order_id},
            )
            assert repeated.status_code == 200
            assert calls["capture"] == 1
            assert (await owner.post(
                "/api/pay/orders", json={"file_id": report["file_id"]}
            )).status_code == 409
            assert calls["create"] == 1

            paid_detail = await owner.get(f"/api/reports/{report['report_id']}")
            assert paid_detail.json()["full_report"] == {"text": "Synthetic paid report"}
            paid_status = await owner.get(f"/api/status/{report['task_id']}")
            assert paid_status.json()["payment_verified"] is True
            assert "full_report" not in paid_status.text
            assert "access_code" not in paid_status.text

            assert (await recovered.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )).status_code == 200
            restored = await recovered.get(f"/api/reports/{report['report_id']}")
            assert restored.status_code == 200
            assert restored.json()["full_report"] == {"text": "Synthetic paid report"}

            free_report = await create_report(owner, main)
            free_detail = await owner.get(f"/api/reports/{free_report['report_id']}")
            assert free_detail.status_code == 200
            assert "full_report" not in free_detail.json()

    asyncio.run(scenario())


def test_concurrent_capture_is_idempotent(service, monkeypatch):
    main, _ = service
    calls = mock_paypal(main, monkeypatch, concurrent_delay=0.05)

    async def scenario():
        async with client_for(main) as client:
            report = await create_report(client, main)
            order = await client.post("/api/pay/orders", json={"file_id": report["file_id"]})
            order_id = order.json()["order_id"]
            responses = await asyncio.gather(
                client.post(
                    "/api/pay/capture",
                    json={"file_id": report["file_id"], "order_id": order_id},
                ),
                client.post(
                    "/api/pay/capture",
                    json={"file_id": report["file_id"], "order_id": order_id},
                ),
            )
            assert [response.status_code for response in responses] == [200, 200]
            assert calls["capture"] == 1
            assert main._reports[report["report_id"]].paid_order_id == order_id

            # Two independently created orders for one report must share the
            # same serialization boundary; only one may reach PayPal.
            second_report = await create_report(client, main)
            order_a = (await client.post(
                "/api/pay/orders", json={"file_id": second_report["file_id"]}
            )).json()["order_id"]
            order_b = (await client.post(
                "/api/pay/orders", json={"file_id": second_report["file_id"]}
            )).json()["order_id"]
            different_orders = await asyncio.gather(
                client.post(
                    "/api/pay/capture",
                    json={"file_id": second_report["file_id"], "order_id": order_a},
                ),
                client.post(
                    "/api/pay/capture",
                    json={"file_id": second_report["file_id"], "order_id": order_b},
                ),
            )
            assert sorted(response.status_code for response in different_orders) == [200, 409]
            assert calls["capture"] == 2
            assert main._reports[second_report["report_id"]].paid_order_id in {order_a, order_b}

            # Provider success must still be persisted if the browser logs out
            # while capture is in flight; authorization already happened first.
            third_report = await create_report(client, main)
            third_order = (await client.post(
                "/api/pay/orders", json={"file_id": third_report["file_id"]}
            )).json()["order_id"]

            async def logout_during_capture():
                assert (await client.post("/api/auth/logout")).status_code == 200

            logout_calls = mock_paypal(
                main, monkeypatch, concurrent_delay=0.05, on_capture=logout_during_capture
            )
            captured = await client.post(
                "/api/pay/capture",
                json={"file_id": third_report["file_id"], "order_id": third_order},
            )
            assert captured.status_code == 200, captured.text
            assert logout_calls["capture"] == 1
            assert main._reports[third_report["report_id"]].paid_order_id == third_order
            async with client_for(main) as recovered:
                claim = await recovered.post(
                    "/api/reports/claim",
                    json={
                        "report_id": third_report["report_id"],
                        "access_code": third_report["access_code"],
                    },
                )
                assert claim.status_code == 200
                restored = await recovered.get(f"/api/reports/{third_report['report_id']}")
                assert restored.json()["full_report"]["text"] == "Synthetic paid report"

    asyncio.run(scenario())


def test_capture_binding_amount_and_currency_validation(service, monkeypatch):
    main, _ = service
    provider_state = {"amount": "0.01", "currency": "USD", "wrong_task": False}

    def provider(order_id):
        payment = main._payment_orders[order_id]
        task_id = "wrong-task" if provider_state["wrong_task"] else payment.task_id
        return completed_provider_order(
            order_id, task_id, provider_state["amount"], provider_state["currency"]
        )

    calls = mock_paypal(main, monkeypatch, capture_factory=provider)

    async def scenario():
        async with client_for(main) as client:
            first = await create_report(client, main)
            second = await create_report(client, main)
            first_order = (await client.post(
                "/api/pay/orders", json={"file_id": first["file_id"]}
            )).json()["order_id"]
            await client.post("/api/pay/orders", json={"file_id": second["file_id"]})

            swapped = await client.post(
                "/api/pay/capture",
                json={"file_id": second["file_id"], "order_id": first_order},
            )
            assert swapped.status_code == 409
            assert calls["capture"] == 0

            bad_amount = await client.post(
                "/api/pay/capture",
                json={"file_id": first["file_id"], "order_id": first_order},
            )
            assert bad_amount.status_code == 402
            assert main._reports[first["report_id"]].paid_order_id is None

            provider_state.update(amount="9.90", currency="EUR")
            bad_currency = await client.post(
                "/api/pay/capture",
                json={"file_id": first["file_id"], "order_id": first_order},
            )
            assert bad_currency.status_code == 402

            provider_state.update(currency="USD", wrong_task=True)
            wrong_task = await client.post(
                "/api/pay/capture",
                json={"file_id": first["file_id"], "order_id": first_order},
            )
            assert wrong_task.status_code == 400
            assert main._reports[first["report_id"]].paid_order_id is None

            provider_state.update(wrong_task=False)
            valid = await client.post(
                "/api/pay/capture",
                json={"file_id": first["file_id"], "order_id": first_order},
            )
            assert valid.status_code == 200
            assert main._reports[first["report_id"]].paid_order_id == first_order
            assert main._reports[second["report_id"]].paid_order_id is None

    asyncio.run(scenario())


def test_sqlite_restart_and_legacy_deserialization(service, monkeypatch):
    main, root = service
    mock_paypal(main, monkeypatch)

    async def create_and_pay():
        async with client_for(main) as client:
            report = await create_report(client, main)
            order = await client.post("/api/pay/orders", json={"file_id": report["file_id"]})
            order_id = order.json()["order_id"]
            captured = await client.post(
                "/api/pay/capture",
                json={"file_id": report["file_id"], "order_id": order_id},
            )
            assert captured.status_code == 200
            token = client.cookies.get(main.SESSION_COOKIE_NAME)
            legacy = main.AnalysisTask(
                task_id="legacy-task",
                file_ids=["legacy-file"],
                created_at=time.time(),
                updated_at=time.time(),
                status="completed",
                current_step="completed",
                progress=100,
                preview={"private": "legacy preview"},
                result={"full_report": {"private": "legacy full"}},
            )
            main._tasks[legacy.task_id] = legacy
            return report, token

    report, token = asyncio.run(create_and_pay())
    # Simulate an old upload row that predates the two ownership columns.
    old_upload = {
        "file_id": "old-upload",
        "original_name": "old.pdf",
        "stored_name": "old.pdf",
        "path": None,
        "size": 10,
        "content_type": "application/pdf",
        "created_at": time.time(),
        "status": "deleted",
        "analysis_task_id": "legacy-task",
    }
    connection = sqlite3.connect(root / "medi-match-test.db")
    connection.execute(
        "INSERT INTO uploads(key, value) VALUES(?, ?)",
        ("old-upload", json.dumps(old_upload)),
    )
    connection.commit()
    connection.close()

    close_stores(main)
    main = load_main("restart")

    async def after_restart():
        async with client_for(main) as client:
            client.cookies.set(main.SESSION_COOKIE_NAME, token)
            restored = await client.get(f"/api/reports/{report['report_id']}")
            assert restored.status_code == 200, restored.text
            assert restored.json()["full_report"] == {"text": "Synthetic paid report"}
            assert restored.json()["payment_verified"] is True
            assert main._reports[report["report_id"]].paid_order_id
            assert main._uploads["old-upload"].owner_session_hash is None

            legacy_status = await client.get("/api/status/legacy-task")
            assert legacy_status.status_code == 200
            assert legacy_status.json()["legacy"] is True
            assert "preview" not in legacy_status.json()
            assert "file_ids" not in legacy_status.json()
            assert "full_report" not in legacy_status.text

    asyncio.run(after_restart())
