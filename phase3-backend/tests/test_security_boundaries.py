"""Adversarial regressions for the independent MediMatch security audits.

All data, PayPal responses, OTP delivery and persistence failures are synthetic.
No real external service is contacted.
"""

from __future__ import annotations

import asyncio
import copy
import json
import logging
import time

import pytest

from test_report_center import (
    client_for,
    completed_provider_order,
    create_report,
    enable_fake_mail,
    mock_paypal,
    service,  # noqa: F401 - pytest fixture
)


def test_free_preview_and_pipeline_errors_fail_closed(service, monkeypatch, caplog):  # noqa: F811
    main, _ = service
    marker = "SYNTHETIC-PAID-AND-PATIENT-MARKER"

    async def scenario():
        monkeypatch.setattr(main, "_run_analysis", main._real_run_analysis)

        async def unknown_schema(*args, **kwargs):
            return {
                "status": "success",
                "unexpected_paid_text": marker,
                "safety_notes": ["Synthetic urgent note"],
            }

        monkeypatch.setattr(main, "_invoke_pipeline", unknown_schema)
        async with client_for(main) as client:
            report = await create_report(client, main)
            for response in (
                report["analyze_response"],
                await client.get(f"/api/status/{report['task_id']}"),
                await client.get(f"/api/reports/{report['report_id']}"),
            ):
                assert response.status_code == 200
                assert marker not in response.text
                assert "Synthetic urgent note" in response.text
                assert "unexpected_paid_text" not in response.text
            stored = main._reports[report["report_id"]]
            assert stored.paid_order_id is None

            async def failing_pipeline(*args, **kwargs):
                raise RuntimeError(marker)

            monkeypatch.setattr(main, "_invoke_pipeline", failing_pipeline)
            caplog.set_level(logging.ERROR)
            caplog.clear()
            upload = await client.post(
                "/api/upload",
                files={"files": ("failure.pdf", b"%PDF-1.4\nsynthetic\n", "application/pdf")},
            )
            file_id = upload.json()["file_ids"][0]
            failed = await client.post(
                "/api/analyze?wait=true", json={"file_ids": [file_id]}
            )
            assert failed.status_code == 500
            assert marker not in failed.text
            task = main._tasks[failed.json()["task_id"]]
            assert marker not in json.dumps(task.pipeline_error)
            assert "message" not in task.pipeline_error
            assert marker not in caplog.text

    asyncio.run(scenario())


def test_capture_schema_is_fully_fail_closed(service, monkeypatch):  # noqa: F811
    main, _ = service
    current_case = {"name": "valid"}

    def provider(order_id):
        order = main._payment_orders[order_id]
        payload = completed_provider_order(order_id, order.task_id, order.amount, order.currency)
        unit = payload["purchase_units"][0]
        capture = unit["payments"]["captures"][0]
        case = current_case["name"]
        if case == "missing_order_id":
            payload.pop("id")
        elif case == "wrong_order_id":
            payload["id"] = "DIFFERENT-ORDER"
        elif case == "missing_unit_amount":
            unit.pop("amount")
        elif case == "missing_payee":
            unit.pop("payee")
        elif case == "wrong_payee":
            unit["payee"]["merchant_id"] = "WRONG-MERCHANT"
        elif case == "missing_capture_id":
            capture.pop("id")
        elif case == "missing_capture_status":
            capture.pop("status")
        elif case == "pending_capture":
            capture["status"] = "PENDING"
        elif case == "refunded_capture":
            capture["status"] = "REFUNDED"
        elif case == "two_captures":
            unit["payments"]["captures"].append(copy.deepcopy(capture))
        elif case == "wrong_unit_amount":
            unit["amount"]["value"] = "0.01"
        return payload

    calls = mock_paypal(main, monkeypatch, capture_factory=provider)

    async def scenario():
        async with client_for(main) as client:
            report = await create_report(client, main)
            order_id = (await client.post(
                "/api/pay/orders", json={"file_id": report["file_id"]}
            )).json()["order_id"]
            cases = [
                "missing_order_id",
                "wrong_order_id",
                "missing_unit_amount",
                "missing_payee",
                "wrong_payee",
                "missing_capture_id",
                "missing_capture_status",
                "pending_capture",
                "refunded_capture",
                "two_captures",
                "wrong_unit_amount",
            ]
            for index, case in enumerate(cases):
                current_case["name"] = case
                response = await client.post(
                    "/api/pay/capture",
                    json={"file_id": report["file_id"], "order_id": order_id},
                )
                assert response.status_code in {400, 402}, (case, response.text)
                assert "full_report" not in response.text
                assert main._reports[report["report_id"]].paid_order_id is None
                assert main._payment_orders[order_id].status == "review_required"
                if index == 0:
                    blocked = await client.post(
                        "/api/pay/orders", json={"file_id": report["file_id"]}
                    )
                    assert blocked.status_code == 409
                    assert calls["create"] == 1

            current_case["name"] = "valid"
            valid = await client.post(
                "/api/pay/capture",
                json={"file_id": report["file_id"], "order_id": order_id},
            )
            assert valid.status_code == 200, valid.text
            assert valid.json()["full_report"]["text"] == "Synthetic paid report"
            assert main._reports[report["report_id"]].paid_order_id == order_id

    asyncio.run(scenario())


def test_persisted_amount_and_expired_capture(service, monkeypatch):  # noqa: F811
    main, _ = service

    def provider(order_id):
        order = main._payment_orders[order_id]
        return completed_provider_order(order_id, order.task_id, order.amount, order.currency)

    calls = mock_paypal(main, monkeypatch, capture_factory=provider)

    async def scenario():
        async with client_for(main) as client:
            first = await create_report(client, main)
            first_order = (await client.post(
                "/api/pay/orders", json={"file_id": first["file_id"]}
            )).json()["order_id"]
            main.PAYPAL_PRICE_USD = "1.00"
            captured = await client.post(
                "/api/pay/capture",
                json={"file_id": first["file_id"], "order_id": first_order},
            )
            assert captured.status_code == 200, captured.text
            assert main._reports[first["report_id"]].paid_order_id == first_order

            second = await create_report(client, main)
            second_order = (await client.post(
                "/api/pay/orders", json={"file_id": second["file_id"]}
            )).json()["order_id"]
            assert main._payment_orders[second_order].amount == "1.00"
            assert (await client.post(
                "/api/pay/capture",
                json={"file_id": second["file_id"], "order_id": second_order},
            )).status_code == 200

            third = await create_report(client, main)
            third_order = (await client.post(
                "/api/pay/orders", json={"file_id": third["file_id"]}
            )).json()["order_id"]
            main._reports[third["report_id"]].expires_at = time.time() - 1
            assert (await client.get(f"/api/reports/{third['report_id']}")).status_code == 404
            before = calls["capture"]
            expired = await client.post(
                "/api/pay/capture",
                json={"file_id": third["file_id"], "order_id": third_order},
            )
            assert expired.status_code == 410
            assert calls["capture"] == before
            assert main._reports[third["report_id"]].paid_order_id is None

    asyncio.run(scenario())


@pytest.mark.parametrize("failure_store", ["reports", "payment_orders"])
def test_payment_persistence_failure_is_pending_and_retryable(
    service, monkeypatch, failure_store
):  # noqa: F811
    main, _ = service
    calls = mock_paypal(main, monkeypatch)

    async def scenario():
        async with client_for(main) as client:
            report = await create_report(client, main)
            order_id = (await client.post(
                "/api/pay/orders", json={"file_id": report["file_id"]}
            )).json()["order_id"]
            store = main._reports if failure_store == "reports" else main._payment_orders
            original_persist = store._persist

            def fail_required_write(key, item):
                # Let capture start normally; fail only the final required write.
                if failure_store == "payment_orders" and getattr(item, "status", None) == "capturing":
                    return original_persist(key, item)
                return False

            monkeypatch.setattr(store, "_persist", fail_required_write)
            pending = await client.post(
                "/api/pay/capture",
                json={"file_id": report["file_id"], "order_id": order_id},
            )
            assert pending.status_code == 202, pending.text
            assert pending.json()["payment_pending"] is True
            assert pending.json()["payment_verified"] is False
            assert "full_report" not in pending.text
            assert main._reports[report["report_id"]].paid_order_id is None
            assert main._payment_orders[order_id].status == "review_required"
            still_locked = await client.get(f"/api/reports/{report['report_id']}")
            assert still_locked.status_code == 200
            assert still_locked.json()["payment_verified"] is False
            assert "full_report" not in still_locked.text
            blocked = await client.post(
                "/api/pay/orders", json={"file_id": report["file_id"]}
            )
            assert blocked.status_code == 409

            monkeypatch.setattr(store, "_persist", original_persist)
            recovered = await client.post(
                "/api/pay/capture",
                json={"file_id": report["file_id"], "order_id": order_id},
            )
            assert recovered.status_code == 200, recovered.text
            assert recovered.json()["payment_verified"] is True
            assert calls["capture"] == 1
            assert calls["get"] == 2
            assert main._reports[report["report_id"]].paid_order_id == order_id

    asyncio.run(scenario())


def test_account_switch_does_not_merge_previous_user(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with client_for(main) as browser:
            anonymous = await create_report(browser, main)

            async def login(email):
                requested = await browser.post("/api/auth/request", json={"email": email})
                assert requested.status_code == 200, requested.text
                code = delivered[-1][1]
                verified = await browser.post(
                    "/api/auth/verify", json={"email": email, "code": code}
                )
                assert verified.status_code == 200, verified.text

            await login("alice-switch@example.invalid")
            alice_report = await create_report(browser, main)
            pending_upload = await browser.post(
                "/api/upload",
                files={"files": ("alice.pdf", b"%PDF-1.4\nalice\n", "application/pdf")},
            )
            pending_file_id = pending_upload.json()["file_ids"][0]
            alice_user_id = main._reports[alice_report["report_id"]].owner_user_id
            paid = main._reports[alice_report["report_id"]]
            paid.paid_order_id = "SYNTHETIC-ALICE-PAID"
            paid.paid_at = time.time()
            main._reports[paid.report_id] = paid

            await login("bob-switch@example.invalid")
            assert (await browser.get("/api/auth/me")).json()["authenticated"] is True
            for report_id in (anonymous["report_id"], alice_report["report_id"]):
                denied = await browser.get(f"/api/reports/{report_id}")
                assert denied.status_code == 404
                assert "full_report" not in denied.text
                assert main._reports[report_id].owner_user_id == alice_user_id
            listed = await browser.get("/api/reports")
            assert anonymous["report_id"] not in listed.text
            assert alice_report["report_id"] not in listed.text
            reused_upload = await browser.post(
                "/api/analyze?wait=true", json={"file_ids": [pending_file_id]}
            )
            assert reused_upload.status_code == 404
            assert main._uploads[pending_file_id].owner_user_id == alice_user_id

    asyncio.run(scenario())


def test_claim_consumes_code_rotates_cookie_and_preserves_owner(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with (
            client_for(main) as anonymous,
            client_for(main) as alice,
            client_for(main) as bob,
        ):
            report = await create_report(anonymous, main, "alice-owner@example.invalid")

            async def login(client, email):
                await client.post("/api/auth/request", json={"email": email})
                verified = await client.post(
                    "/api/auth/verify",
                    json={"email": email, "code": delivered[-1][1]},
                )
                assert verified.status_code == 200, verified.text

            await login(alice, "alice-owner@example.invalid")
            alice_user_id = main._reports[report["report_id"]].owner_user_id
            assert alice_user_id
            await login(bob, "bob-claim@example.invalid")
            old_bob_cookie = bob.cookies.get(main.SESSION_COOKIE_NAME)
            claimed = await bob.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert claimed.status_code == 200, claimed.text
            new_bob_cookie = bob.cookies.get(main.SESSION_COOKIE_NAME)
            assert new_bob_cookie and new_bob_cookie != old_bob_cookie
            stored = main._reports[report["report_id"]]
            assert stored.owner_user_id == alice_user_id
            assert stored.access_code_consumed is True
            assert (await bob.get(f"/api/reports/{report['report_id']}")).status_code == 200
            assert (await alice.get(f"/api/reports/{report['report_id']}")).status_code == 200

            async with client_for(main) as old_cookie:
                old_cookie.cookies.set(main.SESSION_COOKIE_NAME, old_bob_cookie)
                assert (await old_cookie.get("/api/auth/me")).json()["authenticated"] is False
                assert (await old_cookie.get(f"/api/reports/{report['report_id']}")).status_code == 404
            replay = await anonymous.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert replay.status_code == 403

    asyncio.run(scenario())


def test_upload_batch_and_request_size_limits(service, monkeypatch):  # noqa: F811
    main, root = service
    monkeypatch.setattr(main, "MAX_FILE_SIZE", 16)
    monkeypatch.setattr(main, "MAX_BATCH_SIZE", 12)

    async def scenario():
        async with client_for(main) as client:
            response = await client.post(
                "/api/upload",
                files=[
                    ("files", ("a.pdf", b"12345678", "application/pdf")),
                    ("files", ("b.pdf", b"12345678", "application/pdf")),
                ],
            )
            assert response.status_code == 413, response.text
            assert list(main._uploads) == []
            assert list((root / "uploads").iterdir()) == []
            too_large = await client.post(
                "/api/upload",
                headers={"Content-Length": str(main.MAX_UPLOAD_REQUEST_SIZE + 1)},
                files={"files": ("a.pdf", b"tiny", "application/pdf")},
            )
            assert too_large.status_code == 413
            assert list(main._uploads) == []

    asyncio.run(scenario())


def test_upstash_pipeline_error_stays_dirty(service, monkeypatch):  # noqa: F811
    main, _ = service
    store = object.__new__(main._JsonStore)
    store._table = "reports"
    store._to_json = lambda item: item
    store._from_json = lambda item: item
    store._data = {"report": {"paid": False}}
    store._last_synced = {}
    store._conn = None
    store._remote = main._UpstashClient("https://upstash.invalid", "synthetic-token")
    response_payload = {"value": [{"error": "synthetic write denied"}]}

    class Response:
        def raise_for_status(self):
            return None

        def json(self):
            return response_payload["value"]

    monkeypatch.setattr(main.httpx, "post", lambda *args, **kwargs: Response())
    with pytest.raises(main.PersistenceError):
        store.sync_to_remote()
    assert store._last_synced == {}

    response_payload["value"] = [{"result": "OK"}]
    assert store.sync_to_remote() == 1
    assert store._last_synced["report"] == json.dumps({"paid": False})

    class BrokenRemote:
        def command(self, *args):
            raise RuntimeError("synthetic transport failure")

    store._remote = BrokenRemote()
    with pytest.raises(main.PersistenceError):
        store._load_remote()


def test_payment_configuration_requires_merchant(service, monkeypatch):  # noqa: F811
    main, _ = service
    calls = mock_paypal(main, monkeypatch)
    monkeypatch.delenv("PAYPAL_MERCHANT_ID")

    async def scenario():
        async with client_for(main) as client:
            config = await client.get("/api/pay/config")
            assert config.json()["enabled"] is False
            report = await create_report(client, main)
            order = await client.post("/api/pay/orders", json={"file_id": report["file_id"]})
            assert order.status_code == 503
            assert calls["create"] == 0
            assert calls["capture"] == 0

    asyncio.run(scenario())
