"""Final-51 offline adversarial tests for GET-first PayPal reconciliation.

Every provider response, timeout and persistence state is synthetic. HTTP uses
only ASGI/MockTransport; no PayPal, AI, SMTP or Upstash endpoint is contacted.
"""

from __future__ import annotations

import asyncio
import copy
import time

import httpx
import pytest

from test_report_center import (
    client_for,
    completed_provider_order,
    create_report,
    mock_paypal,
    service,  # noqa: F401 - pytest fixture
)


def test_authoritative_get_contract_and_http_failure(service):  # noqa: F811
    main, _ = service
    requests = []

    async def scenario():
        def handler(request):
            requests.append(request)
            if request.url.path.endswith("/GOOD-ORDER"):
                return httpx.Response(200, json={"id": "GOOD-ORDER", "status": "CREATED"})
            return httpx.Response(503, json={"message": "synthetic unavailable"})

        transport = httpx.MockTransport(handler)
        async with httpx.AsyncClient(transport=transport, base_url="https://paypal.invalid") as client:
            result = await main._paypal_get_order(client, "synthetic-token", "GOOD-ORDER")
            assert result == {"id": "GOOD-ORDER", "status": "CREATED"}
            with pytest.raises(main.HTTPException) as exc_info:
                await main._paypal_get_order(client, "synthetic-token", "FAILED-ORDER")
            assert exc_info.value.status_code == 502

        assert [request.method for request in requests] == ["GET", "GET"]
        assert [request.url.path for request in requests] == [
            "/v2/checkout/orders/GOOD-ORDER",
            "/v2/checkout/orders/FAILED-ORDER",
        ]
        assert all(request.headers["authorization"] == "Bearer synthetic-token" for request in requests)

    asyncio.run(scenario())


def test_sparse_capture_body_unlocks_only_after_complete_get(service, monkeypatch):  # noqa: F811
    main, _ = service
    calls = mock_paypal(main, monkeypatch)

    async def scenario():
        async with client_for(main) as client:
            report = await create_report(client, main)
            order_id = (await client.post(
                "/api/pay/orders", json={"file_id": report["file_id"]}
            )).json()["order_id"]
            response = await client.post(
                "/api/pay/capture", json={"file_id": report["file_id"], "order_id": order_id}
            )
            assert response.status_code == 200, response.text
            assert response.json()["payment_verified"] is True
            assert response.json()["full_report"]["text"] == "Synthetic paid report"
            assert calls["capture"] == 1
            assert calls["get"] == 1
            # The default capture mock is intentionally too sparse for
            # _verify_capture; reaching this assertion proves the full GET was used.
            assert main._reports[report["report_id"]].paid_order_id == order_id

    asyncio.run(scenario())


@pytest.mark.parametrize("local_state", ["capturing", "review_required", "captured"])
def test_get_first_recovers_completed_order_without_second_capture(
    service, monkeypatch, local_state
):  # noqa: F811
    main, _ = service
    calls = mock_paypal(main, monkeypatch)

    async def scenario():
        async with client_for(main) as client:
            report = await create_report(client, main)
            order_id = (await client.post(
                "/api/pay/orders", json={"file_id": report["file_id"]}
            )).json()["order_id"]
            payment_order = main._payment_orders[order_id]
            payment_order.status = local_state
            payment_order.capture_started_at = time.time() if local_state == "capturing" else None
            payment_order.captured_at = time.time() if local_state == "captured" else None
            main._payment_orders[order_id] = payment_order

            response = await client.post(
                "/api/pay/capture", json={"file_id": report["file_id"], "order_id": order_id}
            )
            assert response.status_code == 200, response.text
            assert response.json()["payment_verified"] is True
            assert calls["capture"] == 0
            assert calls["get"] == 1
            assert main._reports[report["report_id"]].paid_order_id == order_id
            assert main._payment_orders[order_id].status == "captured"

    asyncio.run(scenario())


def test_get_timeout_after_capture_stays_locked_then_recovers_without_recapture(
    service, monkeypatch
):  # noqa: F811
    main, _ = service
    calls = mock_paypal(main, monkeypatch)
    authoritative_get = main._paypal_get_order

    async def timeout_get(*args):
        calls["get"] += 1
        raise httpx.TimeoutException("synthetic authoritative GET timeout")

    async def scenario():
        transport = httpx.ASGITransport(app=main.app, raise_app_exceptions=False)
        async with httpx.AsyncClient(transport=transport, base_url="https://testserver") as client:
            report = await create_report(client, main)
            order_id = (await client.post(
                "/api/pay/orders", json={"file_id": report["file_id"]}
            )).json()["order_id"]
            monkeypatch.setattr(main, "_paypal_get_order", timeout_get)
            failed = await client.post(
                "/api/pay/capture", json={"file_id": report["file_id"], "order_id": order_id}
            )
            assert failed.status_code == 500
            assert "full_report" not in failed.text
            assert main._reports[report["report_id"]].paid_order_id is None
            assert main._payment_orders[order_id].status == "review_required"
            assert calls["capture"] == 1
            assert calls["get"] == 1
            replacement = await client.post("/api/pay/orders", json={"file_id": report["file_id"]})
            assert replacement.status_code == 409
            assert calls["create"] == 1

            monkeypatch.setattr(main, "_paypal_get_order", authoritative_get)
            recovered = await client.post(
                "/api/pay/capture", json={"file_id": report["file_id"], "order_id": order_id}
            )
            assert recovered.status_code == 200, recovered.text
            assert recovered.json()["payment_verified"] is True
            assert calls["capture"] == 1
            assert calls["get"] == 2

    asyncio.run(scenario())


def test_capture_and_recovery_get_timeouts_remain_fail_closed(service, monkeypatch):  # noqa: F811
    main, _ = service
    calls = mock_paypal(main, monkeypatch)
    authoritative_get = main._paypal_get_order

    async def ambiguous_capture(*args):
        calls["capture"] += 1
        raise httpx.TimeoutException("synthetic capture timeout")

    async def timeout_get(*args):
        calls["get"] += 1
        raise httpx.TimeoutException("synthetic recovery GET timeout")

    async def scenario():
        transport = httpx.ASGITransport(app=main.app, raise_app_exceptions=False)
        async with httpx.AsyncClient(transport=transport, base_url="https://testserver") as client:
            report = await create_report(client, main)
            order_id = (await client.post(
                "/api/pay/orders", json={"file_id": report["file_id"]}
            )).json()["order_id"]
            monkeypatch.setattr(main, "_paypal_capture_order", ambiguous_capture)
            monkeypatch.setattr(main, "_paypal_get_order", timeout_get)

            first = await client.post(
                "/api/pay/capture", json={"file_id": report["file_id"], "order_id": order_id}
            )
            assert first.status_code == 500
            assert calls["capture"] == 1
            assert calls["get"] == 0
            assert main._payment_orders[order_id].status == "review_required"

            second = await client.post(
                "/api/pay/capture", json={"file_id": report["file_id"], "order_id": order_id}
            )
            assert second.status_code == 500
            assert calls["capture"] == 1
            assert calls["get"] == 1
            assert main._reports[report["report_id"]].paid_order_id is None
            assert main._payment_orders[order_id].status == "review_required"
            assert (await client.post(
                "/api/pay/orders", json={"file_id": report["file_id"]}
            )).status_code == 409
            assert calls["create"] == 1

            monkeypatch.setattr(main, "_paypal_get_order", authoritative_get)
            recovered = await client.post(
                "/api/pay/capture", json={"file_id": report["file_id"], "order_id": order_id}
            )
            assert recovered.status_code == 200, recovered.text
            assert calls["capture"] == 1
            assert calls["get"] == 2
            assert main._reports[report["report_id"]].paid_order_id == order_id

    asyncio.run(scenario())


def test_get_first_noncompleted_order_never_recaptures_or_allows_replacement(
    service, monkeypatch
):  # noqa: F811
    main, _ = service
    calls = mock_paypal(main, monkeypatch)

    async def approved_but_not_captured(client, token, order_id):
        calls["get"] += 1
        return {"id": order_id, "status": "APPROVED", "purchase_units": []}

    async def scenario():
        async with client_for(main) as client:
            report = await create_report(client, main)
            order_id = (await client.post(
                "/api/pay/orders", json={"file_id": report["file_id"]}
            )).json()["order_id"]
            payment_order = main._payment_orders[order_id]
            payment_order.status = "review_required"
            main._payment_orders[order_id] = payment_order
            monkeypatch.setattr(main, "_paypal_get_order", approved_but_not_captured)

            response = await client.post(
                "/api/pay/capture", json={"file_id": report["file_id"], "order_id": order_id}
            )
            assert response.status_code == 402, response.text
            assert "full_report" not in response.text
            assert calls["capture"] == 0
            assert calls["get"] == 1
            assert main._reports[report["report_id"]].paid_order_id is None
            assert main._payment_orders[order_id].status == "review_required"
            replacement = await client.post("/api/pay/orders", json={"file_id": report["file_id"]})
            assert replacement.status_code == 409
            assert calls["create"] == 1

    asyncio.run(scenario())


@pytest.mark.parametrize(
    "mutation",
    [
        "wrong_order_id",
        "wrong_task",
        "wrong_unit_amount",
        "wrong_capture_amount",
        "wrong_unit_currency",
        "wrong_capture_currency",
        "wrong_payee",
        "pending_capture",
        "refunded_capture",
        "missing_capture_id",
        "two_captures",
        "not_completed_order",
        "missing_payee",
        "missing_unit_amount",
        "missing_capture_amount",
    ],
)
def test_complete_get_validation_never_relaxes_payment_binding(service, mutation):  # noqa: F811
    main, _ = service
    order = completed_provider_order("ORDER-BOUND", "TASK-BOUND", "9.90", "USD")
    unit = order["purchase_units"][0]
    capture = unit["payments"]["captures"][0]
    if mutation == "wrong_order_id":
        order["id"] = "ORDER-OTHER"
    elif mutation == "wrong_task":
        unit["custom_id"] = "TASK-OTHER"
    elif mutation == "wrong_unit_amount":
        unit["amount"]["value"] = "0.01"
    elif mutation == "wrong_capture_amount":
        capture["amount"]["value"] = "0.01"
    elif mutation == "wrong_unit_currency":
        unit["amount"]["currency_code"] = "EUR"
    elif mutation == "wrong_capture_currency":
        capture["amount"]["currency_code"] = "EUR"
    elif mutation == "wrong_payee":
        unit["payee"]["merchant_id"] = "MERCHANT-OTHER"
    elif mutation == "pending_capture":
        capture["status"] = "PENDING"
    elif mutation == "refunded_capture":
        capture["status"] = "REFUNDED"
    elif mutation == "missing_capture_id":
        capture.pop("id")
    elif mutation == "two_captures":
        unit["payments"]["captures"].append(copy.deepcopy(capture))
    elif mutation == "not_completed_order":
        order["status"] = "APPROVED"
    elif mutation == "missing_payee":
        unit.pop("payee")
    elif mutation == "missing_unit_amount":
        unit.pop("amount")
    elif mutation == "missing_capture_amount":
        capture.pop("amount")

    with pytest.raises(main.HTTPException) as exc_info:
        main._verify_capture(order, "TASK-BOUND", "ORDER-BOUND", "9.90", "USD", "synthetic-merchant")
    assert exc_info.value.status_code in {400, 402}
