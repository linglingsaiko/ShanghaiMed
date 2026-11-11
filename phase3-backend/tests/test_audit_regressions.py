"""Regressions for the second independent security review.

Every external service and failure is synthetic. A passing test now means the
unsafe transition was rejected or recovered, never that a vulnerability was
successfully reproduced.
"""
from __future__ import annotations

import asyncio
import json

import httpx

from test_report_center import (
    client_for,
    close_stores,
    create_report,
    enable_fake_mail,
    load_main,
    mock_paypal,
    service,  # noqa: F401
)


def test_claim_transaction_failure_preserves_recovery_after_restart(service, monkeypatch):  # noqa: F811
    main, _ = service

    async def scenario():
        async with client_for(main) as creator, client_for(main) as claimant:
            report = await create_report(creator, main)

            def fail_commit(operations):
                raise main.PersistenceError("synthetic claim transaction failure")

            monkeypatch.setattr(main, "_commit_durable", fail_commit)
            claimed = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert claimed.status_code == 503, claimed.text
            assert main._reports[report["report_id"]].access_code_consumed is False
            # A confirmed pre-commit failure does not expose a useless cookie.
            assert claimant.cookies.get(main.SESSION_COOKIE_NAME) is None

        close_stores(main)
        restarted = load_main("claim_transaction_failure_restart")
        async with client_for(restarted) as recovered:
            replay = await recovered.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert replay.status_code == 200, replay.text
            assert (await recovered.get(f"/api/reports/{report['report_id']}")).status_code == 200
            consumed = await recovered.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert consumed.status_code == 403

    asyncio.run(scenario())


def test_otp_transaction_failure_does_not_consume_or_replay(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with client_for(main) as browser:
            requested = await browser.post(
                "/api/auth/request", json={"email": "transaction@example.invalid"}
            )
            assert requested.status_code == 200, requested.text
            code = delivered[-1][1]

            def fail_commit(operations):
                raise main.PersistenceError("synthetic OTP transaction failure")

            monkeypatch.setattr(main, "_commit_durable", fail_commit)
            verified = await browser.post(
                "/api/auth/verify", json={"email": "transaction@example.invalid", "code": code}
            )
            assert verified.status_code == 503, verified.text
            assert main.email_key("transaction@example.invalid") in main._otps
            # This injected failure happens before commit, so the candidate
            # cookie is not authenticated and the OTP remains reusable.
            assert (await browser.get("/api/auth/me")).json()["authenticated"] is False

        close_stores(main)
        restarted = load_main("otp_transaction_failure_restart")
        assert restarted.email_key("transaction@example.invalid") in restarted._otps
        async with client_for(restarted) as browser, client_for(restarted) as attacker:
            recovered = await browser.post(
                "/api/auth/verify", json={"email": "transaction@example.invalid", "code": code}
            )
            assert recovered.status_code == 200, recovered.text
            replay = await attacker.post(
                "/api/auth/verify", json={"email": "transaction@example.invalid", "code": code}
            )
            assert replay.status_code == 401, replay.text
            assert (await attacker.get("/api/auth/me")).json()["authenticated"] is False

    asyncio.run(scenario())


def test_ambiguous_capture_blocks_second_order_and_same_order_recovers(service, monkeypatch):  # noqa: F811
    main, _ = service
    calls = mock_paypal(main, monkeypatch)
    provider_capture = main._paypal_capture_order

    async def ambiguous_timeout(*args):
        raise httpx.TimeoutException("synthetic timeout after provider may have captured")

    async def scenario():
        transport = httpx.ASGITransport(app=main.app, raise_app_exceptions=False)
        async with httpx.AsyncClient(transport=transport, base_url="https://testserver") as client:
            report = await create_report(client, main)
            first = await client.post("/api/pay/orders", json={"file_id": report["file_id"]})
            first_id = first.json()["order_id"]
            monkeypatch.setattr(main, "_paypal_capture_order", ambiguous_timeout)
            failed = await client.post(
                "/api/pay/capture", json={"file_id": report["file_id"], "order_id": first_id}
            )
            assert failed.status_code == 500
            assert main._payment_orders[first_id].status == "review_required"
            second = await client.post("/api/pay/orders", json={"file_id": report["file_id"]})
            assert second.status_code == 409, second.text
            assert calls["create"] == 1
            assert main._reports[report["report_id"]].paid_order_id is None

            monkeypatch.setattr(main, "_paypal_capture_order", provider_capture)
            recovered = await client.post(
                "/api/pay/capture", json={"file_id": report["file_id"], "order_id": first_id}
            )
            assert recovered.status_code == 200, recovered.text
            assert recovered.json()["payment_verified"] is True
            # The retry reconciles the authoritative COMPLETED order by GET.
            # It must not issue another capture after the ambiguous attempt.
            assert calls["capture"] == 0
            assert calls["get"] == 1

    asyncio.run(scenario())


def test_initial_order_must_be_durable_before_returning_id(service, monkeypatch):  # noqa: F811
    main, _ = service
    calls = mock_paypal(main, monkeypatch)

    async def scenario():
        async with client_for(main) as client:
            report = await create_report(client, main)
            original_persist = main._payment_orders._persist
            monkeypatch.setattr(main._payment_orders, "_persist", lambda key, item: False)
            failed = await client.post("/api/pay/orders", json={"file_id": report["file_id"]})
            assert failed.status_code == 503, failed.text
            assert not list(main._payment_orders.values())
            assert calls["create"] == 1

            monkeypatch.setattr(main._payment_orders, "_persist", original_persist)
            recovered = await client.post("/api/pay/orders", json={"file_id": report["file_id"]})
            assert recovered.status_code == 200, recovered.text
            order_id = recovered.json()["order_id"]
            assert order_id in main._payment_orders
            assert order_id in main._payment_orders._last_synced

    asyncio.run(scenario())


def test_nested_unknown_preview_fields_never_reach_unpaid_responses(service, monkeypatch):  # noqa: F811
    main, _ = service
    marker = "SYNTHETIC_NESTED_PAID_PHI_MARKER"
    monkeypatch.setattr(main, "_run_analysis", main._real_run_analysis)

    async def malformed_pipeline(*args, **kwargs):
        return {
            "status": "success",
            "preview": {
                "summary": "Safe synthetic summary",
                "full_report": marker,
                "unknown_field": {"nested": marker},
                "key_findings": ["Safe finding", {"unexpected": marker}],
            },
            "full_report": {"text": marker},
            "safety_notes": ["Safe urgent note"],
        }

    monkeypatch.setattr(main, "_invoke_pipeline", malformed_pipeline)

    async def scenario():
        async with client_for(main) as client:
            report = await create_report(client, main)
            responses = (
                report["analyze_response"],
                await client.get(f"/api/reports/{report['report_id']}"),
                await client.get(f"/api/status/{report['task_id']}"),
            )
            for response in responses:
                assert response.status_code == 200
                assert marker not in response.text
                assert "unknown_field" not in response.text
                assert "Safe synthetic summary" in response.text
                assert "Safe urgent note" in response.text
            preview = responses[1].json()["preview"]
            assert preview["key_findings"] == ["Safe finding"]
            assert "full_report" not in preview
            assert main._reports[report["report_id"]].paid_order_id is None

    asyncio.run(scenario())


def test_claim_sqlite_rolls_back_every_store_on_second_table_error(service):  # noqa: F811
    main, _ = service

    async def scenario():
        async with client_for(main) as creator, client_for(main) as claimant:
            report = await create_report(creator, main)
            old_cookie = creator.cookies.get(main.SESSION_COOKIE_NAME)
            assert old_cookie
            table = main._reports._table
            trigger = "test_reject_claim_report_update"
            conn = main._reports._conn
            conn.execute(
                f"CREATE TRIGGER {trigger} BEFORE UPDATE ON {table} "
                "BEGIN SELECT RAISE(ABORT, 'synthetic second-table failure'); END"
            )
            conn.commit()
            before_sessions = set(main._sessions.keys())
            claimed = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert claimed.status_code == 503, claimed.text
            assert set(main._sessions.keys()) == before_sessions
            assert main._reports[report["report_id"]].access_code_consumed is False
            restored = await creator.get(f"/api/reports/{report['report_id']}")
            assert restored.status_code == 200, restored.text

            # The schema trigger is test-only; remove it in the isolated DB and
            # prove the still-unconsumed bearer credential remains usable.
            conn.execute(f"DROP TRIGGER {trigger}")
            conn.commit()
            recovered = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert recovered.status_code == 200, recovered.text
            assert (await claimant.get(f"/api/reports/{report['report_id']}")).status_code == 200

    asyncio.run(scenario())


def test_claim_committed_readback_recovers_before_and_after_restart(service, monkeypatch):  # noqa: F811
    main, _ = service

    async def scenario():
        async with client_for(main) as creator, client_for(main) as claimant:
            report = await create_report(creator, main)
            commit = main._commit_durable

            def committed_but_response_lost(operations):
                commit(operations)
                raise main.PersistenceError("synthetic lost response after commit")

            monkeypatch.setattr(main, "_commit_durable", committed_but_response_lost)
            response = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            # The lost EVAL result is reconciled by a complete durable read.
            assert response.status_code == 200, response.text
            assert response.json()["status"] == "claimed"
            token = claimant.cookies.get(main.SESSION_COOKIE_NAME)
            assert token
            assert main._reports[report["report_id"]].access_code_consumed is True
            immediate = await claimant.get(f"/api/reports/{report['report_id']}")
            assert immediate.status_code == 200, immediate.text
            # Claim adds a recovery session; it must not revoke the original
            # report owner's independent browser session.
            original_owner = await creator.get(f"/api/reports/{report['report_id']}")
            assert original_owner.status_code == 200

        close_stores(main)
        restarted = load_main("claim_ambiguous_commit_restart")
        async with client_for(restarted) as recovered:
            recovered.cookies.set(restarted.SESSION_COOKIE_NAME, token)
            detail = await recovered.get(f"/api/reports/{report['report_id']}")
            assert detail.status_code == 200, detail.text
            replay = await recovered.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert replay.status_code == 403

    asyncio.run(scenario())


def test_otp_committed_readback_recovers_and_code_cannot_replay(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with client_for(main) as browser:
            await browser.post("/api/auth/request", json={"email": "ambiguous@example.invalid"})
            code = delivered[-1][1]
            commit = main._commit_durable

            def committed_but_response_lost(operations):
                commit(operations)
                raise main.PersistenceError("synthetic lost response after commit")

            monkeypatch.setattr(main, "_commit_durable", committed_but_response_lost)
            response = await browser.post(
                "/api/auth/verify", json={"email": "ambiguous@example.invalid", "code": code}
            )
            assert response.status_code == 200, response.text
            assert response.json()["authenticated"] is True
            token = browser.cookies.get(main.SESSION_COOKIE_NAME)
            assert token
            assert main.email_key("ambiguous@example.invalid") not in main._otps
            immediate = await browser.get("/api/auth/me")
            assert immediate.json()["authenticated"] is True

        close_stores(main)
        restarted = load_main("otp_ambiguous_commit_restart")
        async with client_for(restarted) as recovered, client_for(restarted) as attacker:
            recovered.cookies.set(restarted.SESSION_COOKIE_NAME, token)
            me = await recovered.get("/api/auth/me")
            assert me.json()["authenticated"] is True, me.text
            replay = await attacker.post(
                "/api/auth/verify", json={"email": "ambiguous@example.invalid", "code": code}
            )
            assert replay.status_code == 401

    asyncio.run(scenario())


def test_claim_unavailable_readback_recovers_on_next_same_process_request(service, monkeypatch):  # noqa: F811
    main, _ = service

    async def scenario():
        async with client_for(main) as creator, client_for(main) as claimant:
            report = await create_report(creator, main)
            commit = main._commit_durable
            reconcile = main._reconcile_durable
            reads = {"count": 0}

            def committed_but_response_lost(operations):
                commit(operations)
                raise main.PersistenceError("synthetic lost commit response")

            def first_readback_unavailable(operations):
                reads["count"] += 1
                if reads["count"] == 1:
                    raise main.PersistenceError("synthetic read-back outage")
                return reconcile(operations)

            monkeypatch.setattr(main, "_commit_durable", committed_but_response_lost)
            monkeypatch.setattr(main, "_reconcile_durable", first_readback_unavailable)
            response = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert response.status_code == 503
            assert response.json()["recovery_pending"] is True
            assert claimant.cookies.get(main.SESSION_COOKIE_NAME)
            # No restart: the pending candidate cookie forces read-before-auth.
            immediate = await claimant.get(f"/api/reports/{report['report_id']}")
            assert immediate.status_code == 200, immediate.text
            assert reads["count"] == 2
            assert not main._pending_session_reconciliations
            assert not main._pending_claim_reconciliations
            assert (await creator.get(f"/api/reports/{report['report_id']}")).status_code == 200

    asyncio.run(scenario())


def test_otp_unavailable_readback_fails_closed_and_fresh_code_recovers(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with client_for(main) as browser:
            await browser.post("/api/auth/request", json={"email": "pending@example.invalid"})
            code = delivered[-1][1]
            commit = main._commit_durable
            reconcile = main._reconcile_durable
            reads = {"count": 0}

            def committed_but_response_lost(operations):
                commit(operations)
                raise main.PersistenceError("synthetic lost commit response")

            def first_readback_unavailable(operations):
                reads["count"] += 1
                if reads["count"] == 1:
                    raise main.PersistenceError("synthetic read-back outage")
                return reconcile(operations)

            monkeypatch.setattr(main, "_commit_durable", committed_but_response_lost)
            monkeypatch.setattr(main, "_reconcile_durable", first_readback_unavailable)
            response = await browser.post(
                "/api/auth/verify", json={"email": "pending@example.invalid", "code": code}
            )
            assert response.status_code == 503
            assert response.json()["auth_pending"] is True
            # An uncertain OTP transaction must never expose its candidate
            # authenticated session, even if the EVAL actually completed.
            assert browser.cookies.get(main.SESSION_COOKIE_NAME) is None
            me = await browser.get("/api/auth/me")
            assert me.status_code == 200
            assert me.json()["authenticated"] is False, me.text
            replay = await browser.post(
                "/api/auth/verify", json={"email": "pending@example.invalid", "code": code}
            )
            assert replay.status_code == 401
            # The original OTP was consumed, so a fresh email code is the safe
            # recovery path and does not depend on an ambiguous bearer token.
            monkeypatch.setattr(main, "_commit_durable", commit)
            monkeypatch.setattr(main, "_reconcile_durable", reconcile)
            requested = await browser.post(
                "/api/auth/request", json={"email": "pending@example.invalid"}
            )
            assert requested.status_code == 200, requested.text
            fresh_code = delivered[-1][1]
            assert fresh_code != code or len(delivered) >= 2
            recovered = await browser.post(
                "/api/auth/verify", json={"email": "pending@example.invalid", "code": fresh_code}
            )
            assert recovered.status_code == 200, recovered.text
            assert (await browser.get("/api/auth/me")).json()["authenticated"] is True

    asyncio.run(scenario())


def test_otp_partial_commit_candidate_is_never_exposed_or_restored(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with client_for(main) as browser:
            await browser.post("/api/auth/request", json={"email": "partial@example.invalid"})
            code = delivered[-1][1]
            commit = main._commit_durable
            reconcile = main._reconcile_durable
            reads = {"count": 0}

            def partial_commit(operations):
                # Persist only the authenticated candidate session. The OTP DEL
                # has not run, exactly the dangerous Lua partial-write shape.
                commit([operations[0]])
                raise main.PersistenceError("synthetic partial OTP commit")

            def first_readback_unavailable(operations):
                reads["count"] += 1
                if reads["count"] == 1:
                    raise main.PersistenceError("synthetic read-back outage")
                return reconcile(operations)

            monkeypatch.setattr(main, "_commit_durable", partial_commit)
            monkeypatch.setattr(main, "_reconcile_durable", first_readback_unavailable)
            response = await browser.post(
                "/api/auth/verify", json={"email": "partial@example.invalid", "code": code}
            )
            assert response.status_code == 503
            assert browser.cookies.get(main.SESSION_COOKIE_NAME) is None
            assert main.email_key("partial@example.invalid") in main._otps

        close_stores(main)
        restarted = load_main("otp_partial_commit_restart")
        # The orphaned durable candidate exists but its token was never sent to
        # any browser. The original OTP remains the only usable recovery path.
        assert len(restarted._sessions) == 1
        async with client_for(restarted) as recovered, client_for(restarted) as attacker:
            assert (await recovered.get("/api/auth/me")).json()["authenticated"] is False
            monkeypatch.setattr(restarted, "_commit_durable", restarted._commit_durable)
            retry = await recovered.post(
                "/api/auth/verify", json={"email": "partial@example.invalid", "code": code}
            )
            assert retry.status_code == 200, retry.text
            assert (await recovered.get("/api/auth/me")).json()["authenticated"] is True
            replay = await attacker.post(
                "/api/auth/verify", json={"email": "partial@example.invalid", "code": code}
            )
            assert replay.status_code == 401

    asyncio.run(scenario())


class _LostEvalRemote:
    """Apply EVAL, lose its first response, and allow injected MGET outages."""

    def __init__(self, stores):
        self.values = {}
        self.lose_next_eval_response = True
        self.fail_next_mget = True
        self.mget_always_fails = False
        self.eval_fail_after = None
        for store in stores:
            for key, payload in store._last_synced.items():
                self.values[store._redis_key(key)] = payload

    def command(self, command, *args):
        if command == "EVAL":
            _script, key_count, *rest = args
            keys = rest[:key_count]
            values = rest[key_count:]
            assert len(keys) == len(values) == key_count
            fail_after = self.eval_fail_after
            self.eval_fail_after = None
            for index, (key, value) in enumerate(zip(keys, values)):
                if fail_after is not None and index == fail_after:
                    raise RuntimeError(f"synthetic Lua failure after {index} writes")
                if value == "":
                    self.values.pop(key, None)
                else:
                    self.values[key] = value
            if self.lose_next_eval_response:
                self.lose_next_eval_response = False
                raise RuntimeError("synthetic lost EVAL response after full durable commit")
            return 1
        if command == "MGET":
            if self.mget_always_fails:
                raise RuntimeError("synthetic persistent read-back outage")
            if self.fail_next_mget:
                self.fail_next_mget = False
                raise RuntimeError("synthetic read-back outage")
            return [self.values.get(key) for key in args]
        if command == "SET":
            key, value = args
            self.values[key] = value
            return "OK"
        if command == "DEL":
            self.values.pop(args[0], None)
            return 1
        if command == "KEYS":
            prefix = args[0][:-1] if args[0].endswith("*") else args[0]
            return [key for key in self.values if key.startswith(prefix)]
        if command == "GET":
            return self.values.get(args[0])
        raise AssertionError(f"unexpected remote command: {command}")

    def pipeline(self, commands):
        results = []
        for command in commands:
            try:
                results.append({"result": self.command(*command)})
            except Exception as exc:
                results.append({"error": str(exc)})
        return results

    def http_post(self, url, json=None, **kwargs):
        if str(url).endswith("/pipeline"):
            return httpx.Response(
                200, json=self.pipeline(json), request=httpx.Request("POST", str(url))
            )
        return httpx.Response(
            200,
            json={"result": self.command(*json)},
            request=httpx.Request("POST", str(url)),
        )


def _attach_lost_eval_remote(main):
    stores = (
        main._uploads,
        main._tasks,
        main._reports,
        main._sessions,
        main._users,
        main._otps,
        main._payment_orders,
    )
    remote = _LostEvalRemote(stores)
    for store in stores:
        store._remote = remote
    return remote


def test_consumed_claim_code_cannot_replay_from_stale_mirror(service):  # noqa: F811
    main, _ = service

    async def scenario():
        async with client_for(main) as creator, client_for(main) as claimant, client_for(main) as attacker:
            report = await create_report(creator, main)
            remote = _attach_lost_eval_remote(main)
            first = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert first.status_code == 503, first.text
            assert first.json()["recovery_pending"] is True
            durable = json.loads(remote.values[main._reports._redis_key(report["report_id"])])
            assert durable["access_code_consumed"] is True
            assert main._reports[report["report_id"]].access_code_consumed is False

            # While the durable read is still down, even a cookieless browser
            # must receive 503 rather than a decision from the stale mirror.
            remote.fail_next_mget = True
            blocked = await attacker.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert blocked.status_code == 503, blocked.text
            replay = await attacker.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert replay.status_code == 403, replay.text
            recovered = await claimant.get(f"/api/reports/{report['report_id']}")
            assert recovered.status_code == 200, recovered.text
            assert not main._pending_claim_reconciliations
            assert not main._pending_session_reconciliations

    asyncio.run(scenario())


def test_consumed_otp_cannot_replay_from_stale_mirror(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with client_for(main) as browser, client_for(main) as attacker:
            requested = await browser.post(
                "/api/auth/request", json={"email": "stale-mirror@example.invalid"}
            )
            assert requested.status_code == 200, requested.text
            code = delivered[-1][1]
            key = main.email_key("stale-mirror@example.invalid")
            remote = _attach_lost_eval_remote(main)
            first = await browser.post(
                "/api/auth/verify", json={"email": "stale-mirror@example.invalid", "code": code}
            )
            assert first.status_code == 503, first.text
            assert first.json()["auth_pending"] is True
            assert browser.cookies.get(main.SESSION_COOKIE_NAME) is None
            assert main._otps._redis_key(key) not in remote.values
            assert key in main._otps

            remote.fail_next_mget = True
            blocked = await attacker.post(
                "/api/auth/verify", json={"email": "stale-mirror@example.invalid", "code": code}
            )
            assert blocked.status_code == 503, blocked.text
            replay = await attacker.post(
                "/api/auth/verify", json={"email": "stale-mirror@example.invalid", "code": code}
            )
            assert replay.status_code == 401, replay.text
            assert attacker.cookies.get(main.SESSION_COOKIE_NAME) is None
            assert not main._pending_otp_reconciliations

    asyncio.run(scenario())


def test_partial_claim_candidate_cannot_read_until_code_is_consumed(service, monkeypatch):  # noqa: F811
    main, _ = service

    async def scenario():
        async with client_for(main) as creator, client_for(main) as claimant:
            report = await create_report(creator, main)
            commit = main._commit_durable
            reconcile = main._reconcile_durable
            reads = {"count": 0}

            def partial_commit(operations):
                # The candidate Session is durable, but the final report/code
                # consumption operation has not run.
                commit([operations[0]])
                raise main.PersistenceError("synthetic partial claim commit")

            def first_readback_unavailable(operations):
                reads["count"] += 1
                if reads["count"] == 1:
                    raise main.PersistenceError("synthetic read-back outage")
                return reconcile(operations)

            monkeypatch.setattr(main, "_commit_durable", partial_commit)
            monkeypatch.setattr(main, "_reconcile_durable", first_readback_unavailable)
            first = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert first.status_code == 503
            token = claimant.cookies.get(main.SESSION_COOKIE_NAME)
            assert token
            blocked = await claimant.get(f"/api/reports/{report['report_id']}")
            assert blocked.status_code == 404, blocked.text
            assert main._reports[report["report_id"]].access_code_consumed is False

        close_stores(main)
        restarted = load_main("partial_claim_candidate_restart")
        async with client_for(restarted) as recovered, client_for(restarted) as second_browser, client_for(restarted) as replay_browser:
            recovered.cookies.set(restarted.SESSION_COOKIE_NAME, token)
            # The marker is durable, so a restart cannot turn a partial claim
            # into report access before the one-time code is consumed.
            still_blocked = await recovered.get(f"/api/reports/{report['report_id']}")
            assert still_blocked.status_code == 404, still_blocked.text
            claimed = await second_browser.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert claimed.status_code == 200, claimed.text
            replay = await replay_browser.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert replay.status_code == 403
            # Once a complete claim consumes the code, the original candidate
            # is a valid recovery session for the same bearer-credential holder.
            recovered_report = await recovered.get(f"/api/reports/{report['report_id']}")
            assert recovered_report.status_code == 200, recovered_report.text

    asyncio.run(scenario())


def test_otp_login_cannot_bind_an_unfinished_claim(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with client_for(main) as creator, client_for(main) as claimant:
            report = await create_report(creator, main)
            commit = main._commit_durable
            reconcile = main._reconcile_durable

            def partial_commit(operations):
                commit([operations[0]])
                raise main.PersistenceError("synthetic partial claim before OTP")

            monkeypatch.setattr(main, "_commit_durable", partial_commit)
            monkeypatch.setattr(
                main,
                "_reconcile_durable",
                lambda operations: (_ for _ in ()).throw(
                    main.PersistenceError("synthetic claim read-back outage")
                ),
            )
            first = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert first.status_code == 503
            monkeypatch.setattr(main, "_commit_durable", commit)
            monkeypatch.setattr(main, "_reconcile_durable", reconcile)
            assert (await claimant.get(f"/api/reports/{report['report_id']}")).status_code == 404

            await claimant.post(
                "/api/auth/request", json={"email": "unfinished-claim@example.invalid"}
            )
            code = delivered[-1][1]
            verified = await claimant.post(
                "/api/auth/verify",
                json={"email": "unfinished-claim@example.invalid", "code": code},
            )
            assert verified.status_code == 200, verified.text
            assert main._reports[report["report_id"]].owner_user_id is None
            token = claimant.cookies.get(main.SESSION_COOKIE_NAME)
            session = main._sessions[main.hash_session_token(token)]
            assert report["report_id"] not in session.report_ids
            assert (await claimant.get(f"/api/reports/{report['report_id']}")).status_code == 404

        close_stores(main)
        restarted = load_main("unfinished_claim_otp_restart")
        async with client_for(restarted) as browser:
            browser.cookies.set(restarted.SESSION_COOKIE_NAME, token)
            assert restarted._reports[report["report_id"]].owner_user_id is None
            assert (await browser.get("/api/auth/me")).json()["authenticated"] is True
            assert (await browser.get(f"/api/reports/{report['report_id']}")).status_code == 404

    asyncio.run(scenario())


def test_consecutive_claim_preserves_every_pending_report_marker(service, monkeypatch):  # noqa: F811
    main, _ = service

    async def scenario():
        async with client_for(main) as creator, client_for(main) as claimant:
            first_report = await create_report(creator, main)
            second_report = await create_report(creator, main)
            commit = main._commit_durable
            reconcile = main._reconcile_durable

            def partial_commit(operations):
                commit([operations[0]])
                raise main.PersistenceError("synthetic first partial claim")

            monkeypatch.setattr(main, "_commit_durable", partial_commit)
            monkeypatch.setattr(
                main,
                "_reconcile_durable",
                lambda operations: (_ for _ in ()).throw(
                    main.PersistenceError("synthetic first claim read-back outage")
                ),
            )
            response = await claimant.post(
                "/api/reports/claim",
                json={
                    "report_id": first_report["report_id"],
                    "access_code": first_report["access_code"],
                },
            )
            assert response.status_code == 503
            monkeypatch.setattr(main, "_reconcile_durable", reconcile)
            assert (await claimant.get(f"/api/reports/{first_report['report_id']}")).status_code == 404

            captured = []

            def capture_second_candidate(operations):
                captured.extend(operations)
                raise main.PersistenceError("synthetic second pre-commit failure")

            monkeypatch.setattr(main, "_commit_durable", capture_second_candidate)
            second = await claimant.post(
                "/api/reports/claim",
                json={
                    "report_id": second_report["report_id"],
                    "access_code": second_report["access_code"],
                },
            )
            assert second.status_code == 503
            candidate = captured[0][3]
            assert set(candidate.pending_claim_report_ids or []) == {
                first_report["report_id"], second_report["report_id"]
            }

    asyncio.run(scenario())


def test_partial_claim_readback_preserves_prior_assets_and_retry(service, monkeypatch):  # noqa: F811
    main, _ = service

    async def scenario():
        async with client_for(main) as creator, client_for(main) as claimant:
            target = await create_report(creator, main)
            prior = await create_report(claimant, main)
            pending = await claimant.post(
                "/api/upload",
                files={"files": ("prior-pending.pdf", b"%PDF-1.4\nprior\n", "application/pdf")},
            )
            pending_file_id = pending.json()["file_ids"][0]
            old_token = claimant.cookies.get(main.SESSION_COOKIE_NAME)
            old_hash = main.hash_session_token(old_token)
            remote = _attach_lost_eval_remote(main)
            migrated_upload_count = sum(
                record.owner_session_hash == old_hash for record in main._uploads.values()
            )
            # Persist candidate Session, migrated uploads and old Session DEL,
            # but fail immediately before the target Report/code SET.
            remote.eval_fail_after = 1 + migrated_upload_count + 1
            remote.fail_next_mget = False
            first = await claimant.post(
                "/api/reports/claim",
                json={"report_id": target["report_id"], "access_code": target["access_code"]},
            )
            assert first.status_code == 503, first.text
            assert first.json()["recovery_pending"] is True
            candidate_token = claimant.cookies.get(main.SESSION_COOKIE_NAME)
            assert candidate_token and candidate_token != old_token
            assert old_hash not in main._sessions
            assert main._reports[target["report_id"]].access_code_consumed is False
            # Existing anonymous assets remain usable, while the target stays
            # fail-closed until its one-time code is actually consumed.
            assert (await claimant.get(f"/api/reports/{prior['report_id']}")).status_code == 200
            assert (await claimant.get(f"/api/reports/{target['report_id']}")).status_code == 404

            retry = await claimant.post(
                "/api/reports/claim",
                json={"report_id": target["report_id"], "access_code": target["access_code"]},
            )
            assert retry.status_code == 200, retry.text
            retry_token = claimant.cookies.get(main.SESSION_COOKIE_NAME)
            assert retry_token != candidate_token
            assert (await claimant.get(f"/api/reports/{prior['report_id']}")).status_code == 200
            assert (await claimant.get(f"/api/reports/{target['report_id']}")).status_code == 200
            analyzed = await claimant.post(
                "/api/analyze?wait=true", json={"file_ids": [pending_file_id]}
            )
            assert analyzed.status_code == 200, analyzed.text
            pending_report_id = analyzed.json()["report_id"]

        close_stores(main)
        monkeypatch.setenv("UPSTASH_REDIS_REST_URL", "https://upstash.invalid")
        monkeypatch.setenv("UPSTASH_REDIS_REST_TOKEN", "synthetic-not-a-credential")
        monkeypatch.setattr(httpx, "post", remote.http_post)
        restarted = load_main("partial_claim_prior_assets_restart")
        async with client_for(restarted) as browser:
            browser.cookies.set(restarted.SESSION_COOKIE_NAME, retry_token)
            for report_id in (prior["report_id"], target["report_id"], pending_report_id):
                restored = await browser.get(f"/api/reports/{report_id}")
                assert restored.status_code == 200, restored.text

    asyncio.run(scenario())


def test_partial_claim_mid_upload_migration_keeps_lineage_access(service, monkeypatch):  # noqa: F811
    main, _ = service

    async def scenario():
        async with client_for(main) as creator, client_for(main) as claimant:
            target = await create_report(creator, main)
            await create_report(claimant, main)
            pending_ids = []
            for index in range(2):
                uploaded = await claimant.post(
                    "/api/upload",
                    files={"files": (f"pending-{index}.pdf", b"%PDF-1.4\npending\n", "application/pdf")},
                )
                pending_ids.append(uploaded.json()["file_ids"][0])
            remote = _attach_lost_eval_remote(main)
            # Candidate + only the first Upload SET; the old Session and the
            # second Upload ownership remain untouched.
            remote.eval_fail_after = 2
            remote.fail_next_mget = False
            response = await claimant.post(
                "/api/reports/claim",
                json={"report_id": target["report_id"], "access_code": target["access_code"]},
            )
            assert response.status_code == 503, response.text
            candidate_token = claimant.cookies.get(main.SESSION_COOKIE_NAME)
            assert candidate_token
            candidate_hash = main.hash_session_token(candidate_token)
            candidate = main._sessions[candidate_hash]
            old_hashes = set(candidate.claim_source_session_hashes or [])
            assert len(old_hashes) == 1
            assert main._sessions[next(iter(old_hashes))] is not None
            assert any(
                main._uploads[file_id].owner_session_hash in old_hashes
                for file_id in pending_ids
            )
            # Lineage closes both halves of a partial migration without making
            # the not-yet-consumed target report readable.
            for file_id in pending_ids:
                analyzed = await claimant.post(
                    "/api/analyze?wait=true", json={"file_ids": [file_id]}
                )
                assert analyzed.status_code == 200, analyzed.text
            assert (await claimant.get(f"/api/reports/{target['report_id']}")).status_code == 404
            retry = await claimant.post(
                "/api/reports/claim",
                json={"report_id": target["report_id"], "access_code": target["access_code"]},
            )
            assert retry.status_code == 200, retry.text
            final_token = claimant.cookies.get(main.SESSION_COOKIE_NAME)

        close_stores(main)
        monkeypatch.setenv("UPSTASH_REDIS_REST_URL", "https://upstash.invalid")
        monkeypatch.setenv("UPSTASH_REDIS_REST_TOKEN", "synthetic-not-a-credential")
        monkeypatch.setattr(httpx, "post", remote.http_post)
        restarted = load_main("partial_claim_mid_migration_restart")
        async with client_for(restarted) as browser:
            browser.cookies.set(restarted.SESSION_COOKIE_NAME, final_token)
            assert (await browser.get(f"/api/reports/{target['report_id']}")).status_code == 200

    asyncio.run(scenario())


def test_stale_claim_source_cannot_cross_account_owner_boundary(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with client_for(main) as creator, client_for(main) as claimant, client_for(main) as stale:
            target = await create_report(creator, main)
            prior = await create_report(claimant, main)
            uploaded = await claimant.post(
                "/api/upload",
                files={"files": ("owner-boundary.pdf", b"%PDF-1.4\nowner\n", "application/pdf")},
            )
            pending_file_id = uploaded.json()["file_ids"][0]
            source_token = claimant.cookies.get(main.SESSION_COOKIE_NAME)
            source_hash = main.hash_session_token(source_token)
            remote = _attach_lost_eval_remote(main)
            remote.eval_fail_after = 2
            remote.fail_next_mget = False
            partial = await claimant.post(
                "/api/reports/claim",
                json={"report_id": target["report_id"], "access_code": target["access_code"]},
            )
            assert partial.status_code == 503, partial.text
            retry = await claimant.post(
                "/api/reports/claim",
                json={"report_id": target["report_id"], "access_code": target["access_code"]},
            )
            assert retry.status_code == 200, retry.text
            email_a = "stale-owner-a@example.invalid"
            await claimant.post("/api/auth/request", json={"email": email_a})
            login_a = await claimant.post(
                "/api/auth/verify", json={"email": email_a, "code": delivered[-1][1]}
            )
            assert login_a.status_code == 200, login_a.text
            token_a = login_a.cookies.get(main.SESSION_COOKIE_NAME)
            user_a = main._sessions[main.hash_session_token(token_a)].user_id
            assert main._reports[prior["report_id"]].owner_user_id == user_a
            assert main._uploads[pending_file_id].owner_user_id == user_a

            # S0 survives the mid-migration failure, but account ownership now
            # overrides both its report_ids and its server-generated lineage.
            stale.cookies.set(
                main.SESSION_COOKIE_NAME, source_token, domain="testserver.local", path="/"
            )
            assert (await stale.get(f"/api/reports/{prior['report_id']}")).status_code == 404
            stale_upload = await stale.post(
                "/api/analyze?wait=true", json={"file_ids": [pending_file_id]}
            )
            assert stale_upload.status_code == 404, stale_upload.text

            email_b = "stale-owner-b@example.invalid"
            await stale.post("/api/auth/request", json={"email": email_b})
            login_b = await stale.post(
                "/api/auth/verify", json={"email": email_b, "code": delivered[-1][1]}
            )
            assert login_b.status_code == 200, login_b.text
            token_b = login_b.cookies.get(main.SESSION_COOKIE_NAME)
            session_b = main._sessions[main.hash_session_token(token_b)]
            assert prior["report_id"] not in session_b.report_ids
            assert not session_b.claim_source_session_hashes
            assert main._reports[prior["report_id"]].owner_user_id == user_a
            assert main._uploads[pending_file_id].owner_user_id == user_a
            stale.cookies.clear()
            stale.cookies.set(
                main.SESSION_COOKIE_NAME, token_b, domain="testserver.local", path="/"
            )
            assert (await stale.get(f"/api/reports/{prior['report_id']}")).status_code == 404
            assert (await stale.post(
                "/api/analyze?wait=true", json={"file_ids": [pending_file_id]}
            )).status_code == 404
            # The owner retains normal use of both the report and pending upload.
            assert (await claimant.get(f"/api/reports/{prior['report_id']}")).status_code == 200
            assert (await claimant.post(
                "/api/analyze?wait=true", json={"file_ids": [pending_file_id]}
            )).status_code == 200

        close_stores(main)
        monkeypatch.setenv("UPSTASH_REDIS_REST_URL", "https://upstash.invalid")
        monkeypatch.setenv("UPSTASH_REDIS_REST_TOKEN", "synthetic-not-a-credential")
        monkeypatch.setattr(httpx, "post", remote.http_post)
        restarted = load_main("stale_claim_source_owner_restart")
        async with client_for(restarted) as restarted_b, client_for(restarted) as restarted_a:
            restarted_b.cookies.set(restarted.SESSION_COOKIE_NAME, token_b)
            assert (await restarted_b.get(
                f"/api/reports/{prior['report_id']}"
            )).status_code == 404
            assert (await restarted_b.post(
                "/api/analyze?wait=true", json={"file_ids": [pending_file_id]}
            )).status_code == 404
            restarted_a.cookies.set(restarted.SESSION_COOKIE_NAME, token_a)
            assert (await restarted_a.get(
                f"/api/reports/{prior['report_id']}"
            )).status_code == 200

    asyncio.run(scenario())


def test_successful_claim_grant_survives_claimant_otp_rotation(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)

    async def scenario():
        async with client_for(main) as creator, client_for(main) as alice, client_for(main) as bob:
            report = await create_report(creator, main, "claim-rotation-owner@example.invalid")

            async def login(client, email):
                await client.post("/api/auth/request", json={"email": email})
                verified = await client.post(
                    "/api/auth/verify", json={"email": email, "code": delivered[-1][1]}
                )
                assert verified.status_code == 200, verified.text
                return verified.cookies.get(main.SESSION_COOKIE_NAME)

            await login(alice, "claim-rotation-owner@example.invalid")
            owner_id = main._reports[report["report_id"]].owner_user_id
            assert owner_id
            await login(bob, "claim-rotation-claimant@example.invalid")
            claimed = await bob.post(
                "/api/reports/claim",
                json={"report_id": report["report_id"], "access_code": report["access_code"]},
            )
            assert claimed.status_code == 200, claimed.text
            assert main._reports[report["report_id"]].owner_user_id == owner_id
            rotated_token = await login(bob, "claim-rotation-claimant@example.invalid")
            rotated = main._sessions[main.hash_session_token(rotated_token)]
            assert report["report_id"] in rotated.report_ids
            assert report["report_id"] in (rotated.pending_claim_report_ids or [])
            assert (await bob.get(f"/api/reports/{report['report_id']}")).status_code == 200
            assert main._reports[report["report_id"]].owner_user_id == owner_id

        close_stores(main)
        restarted = load_main("successful_claim_otp_rotation_restart")
        async with client_for(restarted) as restored:
            restored.cookies.set(restarted.SESSION_COOKIE_NAME, rotated_token)
            assert (await restored.get(f"/api/reports/{report['report_id']}")).status_code == 200
            assert restarted._reports[report["report_id"]].owner_user_id == owner_id

    asyncio.run(scenario())


async def _claim_replay_login(client, main, delivered, email):
    requested = await client.post("/api/auth/request", json={"email": email})
    assert requested.status_code == 200, requested.text
    verified = await client.post(
        "/api/auth/verify", json={"email": email, "code": delivered[-1][1]}
    )
    assert verified.status_code == 200, verified.text
    token = verified.cookies.get(main.SESSION_COOKIE_NAME)
    assert token
    return token


async def _claim_replay_pay(browser, report):
    order = await browser.post("/api/pay/orders", json={"file_id": report["file_id"]})
    assert order.status_code == 200, order.text
    captured = await browser.post(
        "/api/pay/capture",
        json={"file_id": report["file_id"], "order_id": order.json()["order_id"]},
    )
    assert captured.status_code == 200, captured.text
    assert captured.json()["payment_verified"] is True


def _restart_claim_replay_remote(main, remote, monkeypatch, label):
    close_stores(main)
    monkeypatch.setenv("UPSTASH_REDIS_REST_URL", "https://upstash.invalid")
    monkeypatch.setenv("UPSTASH_REDIS_REST_TOKEN", "synthetic-not-a-credential")
    monkeypatch.setattr(httpx, "post", remote.http_post)
    return load_main(label)


def test_superseded_successful_claim_cannot_replay_paid_report_into_b(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)
    mock_paypal(main, monkeypatch)
    paid_marker = "Synthetic paid report"

    async def scenario():
        async with (
            client_for(main) as owner,
            client_for(main) as creator,
            client_for(main) as claimant,
            client_for(main) as stale,
        ):
            report_x = await create_report(owner, main)
            remote = _attach_lost_eval_remote(main)
            remote.lose_next_eval_response = False
            remote.fail_next_mget = False
            owner_token = await _claim_replay_login(
                owner, main, delivered, "superseded-replay-owner@example.invalid"
            )
            owner_id = main._reports[report_x["report_id"]].owner_user_id
            await _claim_replay_pay(owner, report_x)
            claimed_x = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_x["report_id"], "access_code": report_x["access_code"]},
            )
            assert claimed_x.status_code == 200, claimed_x.text
            source_token = claimed_x.cookies.get(main.SESSION_COOKIE_NAME)
            source_hash = main.hash_session_token(source_token)
            assert report_x["report_id"] in main._sessions[source_hash].pending_claim_report_ids
            assert paid_marker in (await claimant.get(
                f"/api/reports/{report_x['report_id']}"
            )).text

            report_t = await create_report(creator, main)
            remote.eval_fail_after = 1
            partial = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_t["report_id"], "access_code": report_t["access_code"]},
            )
            assert partial.status_code == 503, partial.text
            retry = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_t["report_id"], "access_code": report_t["access_code"]},
            )
            assert retry.status_code == 200, retry.text
            successor_hash = main.hash_session_token(
                retry.cookies.get(main.SESSION_COOKIE_NAME)
            )
            assert main._sessions[source_hash].superseded_by_session_hash == successor_hash
            token_a = await _claim_replay_login(
                claimant, main, delivered, "superseded-replay-a@example.invalid"
            )
            session_a = main._sessions[main.hash_session_token(token_a)]
            assert report_x["report_id"] in session_a.report_ids
            assert report_x["report_id"] in (session_a.pending_claim_report_ids or [])

            stale.cookies.set(
                main.SESSION_COOKIE_NAME, source_token, domain="testserver.local", path="/"
            )
            stale_read = await stale.get(f"/api/reports/{report_x['report_id']}")
            assert stale_read.status_code == 404, stale_read.text
            assert paid_marker not in stale_read.text
            token_b = await _claim_replay_login(
                stale, main, delivered, "superseded-replay-b@example.invalid"
            )
            session_b = main._sessions[main.hash_session_token(token_b)]
            assert session_b.user_id not in {owner_id, session_a.user_id}
            assert report_x["report_id"] not in session_b.report_ids
            assert not session_b.pending_claim_report_ids
            b_read = await stale.get(f"/api/reports/{report_x['report_id']}")
            assert b_read.status_code == 404, b_read.text
            assert paid_marker not in b_read.text
            assert main._reports[report_x["report_id"]].owner_user_id == owner_id

        restarted = _restart_claim_replay_remote(
            main, remote, monkeypatch, "superseded_successful_claim_replay_restart"
        )
        async with client_for(restarted) as restarted_b, client_for(restarted) as restored_owner:
            restarted_b.cookies.set(restarted.SESSION_COOKIE_NAME, token_b)
            restored_owner.cookies.set(restarted.SESSION_COOKIE_NAME, owner_token)
            restarted_read = await restarted_b.get(f"/api/reports/{report_x['report_id']}")
            assert restarted_read.status_code == 404, restarted_read.text
            assert paid_marker not in restarted_read.text
            owner_read = await restored_owner.get(f"/api/reports/{report_x['report_id']}")
            assert owner_read.status_code == 200, owner_read.text
            assert paid_marker in owner_read.text

    asyncio.run(scenario())


def test_superseded_unfinished_marker_cannot_revive_after_other_claim(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)
    mock_paypal(main, monkeypatch)
    paid_marker = "Synthetic paid report"

    async def scenario():
        async with (
            client_for(main) as owner,
            client_for(main) as creator,
            client_for(main) as claimant,
            client_for(main) as completer,
            client_for(main) as stale,
        ):
            report_x = await create_report(owner, main)
            remote = _attach_lost_eval_remote(main)
            remote.lose_next_eval_response = False
            remote.fail_next_mget = False
            owner_token = await _claim_replay_login(
                owner, main, delivered, "superseded-revive-owner@example.invalid"
            )
            owner_id = main._reports[report_x["report_id"]].owner_user_id
            await _claim_replay_pay(owner, report_x)

            remote.eval_fail_after = 1
            partial_x = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_x["report_id"], "access_code": report_x["access_code"]},
            )
            assert partial_x.status_code == 503, partial_x.text
            source_token = claimant.cookies.get(main.SESSION_COOKIE_NAME)
            source_hash = main.hash_session_token(source_token)
            assert main._reports[report_x["report_id"]].access_code_consumed is False

            report_t = await create_report(creator, main)
            remote.eval_fail_after = 1
            partial_t = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_t["report_id"], "access_code": report_t["access_code"]},
            )
            assert partial_t.status_code == 503, partial_t.text
            retry_t = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_t["report_id"], "access_code": report_t["access_code"]},
            )
            assert retry_t.status_code == 200, retry_t.text
            successor_hash = main.hash_session_token(
                retry_t.cookies.get(main.SESSION_COOKIE_NAME)
            )
            assert main._sessions[source_hash].superseded_by_session_hash == successor_hash
            token_a = await _claim_replay_login(
                claimant, main, delivered, "superseded-revive-a@example.invalid"
            )
            session_a = main._sessions[main.hash_session_token(token_a)]
            assert report_x["report_id"] not in session_a.report_ids
            assert report_x["report_id"] not in (session_a.pending_claim_report_ids or [])
            stale.cookies.set(
                main.SESSION_COOKIE_NAME, source_token, domain="testserver.local", path="/"
            )
            assert (await stale.get(f"/api/reports/{report_x['report_id']}")).status_code == 404

            await _claim_replay_login(
                completer, main, delivered, "superseded-revive-completer@example.invalid"
            )
            completed_x = await completer.post(
                "/api/reports/claim",
                json={"report_id": report_x["report_id"], "access_code": report_x["access_code"]},
            )
            assert completed_x.status_code == 200, completed_x.text
            revived = await stale.get(f"/api/reports/{report_x['report_id']}")
            assert revived.status_code == 404, revived.text
            assert paid_marker not in revived.text
            token_b = await _claim_replay_login(
                stale, main, delivered, "superseded-revive-b@example.invalid"
            )
            session_b = main._sessions[main.hash_session_token(token_b)]
            assert report_x["report_id"] not in session_b.report_ids
            assert not session_b.pending_claim_report_ids
            b_read = await stale.get(f"/api/reports/{report_x['report_id']}")
            assert b_read.status_code == 404, b_read.text
            assert paid_marker not in b_read.text
            assert main._reports[report_x["report_id"]].owner_user_id == owner_id

        restarted = _restart_claim_replay_remote(
            main, remote, monkeypatch, "superseded_unfinished_marker_revive_restart"
        )
        async with client_for(restarted) as restarted_b, client_for(restarted) as restored_owner:
            restarted_b.cookies.set(restarted.SESSION_COOKIE_NAME, token_b)
            restored_owner.cookies.set(restarted.SESSION_COOKIE_NAME, owner_token)
            restarted_read = await restarted_b.get(f"/api/reports/{report_x['report_id']}")
            assert restarted_read.status_code == 404, restarted_read.text
            assert paid_marker not in restarted_read.text
            owner_read = await restored_owner.get(f"/api/reports/{report_x['report_id']}")
            assert owner_read.status_code == 200, owner_read.text
            assert paid_marker in owner_read.text

    asyncio.run(scenario())


def test_readback_outage_blocks_remotely_superseded_successful_grant(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)
    mock_paypal(main, monkeypatch)
    paid_marker = "Synthetic paid report"

    async def scenario():
        async with (
            client_for(main) as owner,
            client_for(main) as creator,
            client_for(main) as claimant,
            client_for(main) as stale,
        ):
            report_x = await create_report(owner, main)
            remote = _attach_lost_eval_remote(main)
            remote.lose_next_eval_response = False
            remote.fail_next_mget = False
            owner_token = await _claim_replay_login(
                owner, main, delivered, "readback-success-owner@example.invalid"
            )
            owner_id = main._reports[report_x["report_id"]].owner_user_id
            await _claim_replay_pay(owner, report_x)
            claimed_x = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_x["report_id"], "access_code": report_x["access_code"]},
            )
            assert claimed_x.status_code == 200, claimed_x.text
            source_token = claimed_x.cookies.get(main.SESSION_COOKIE_NAME)
            source_hash = main.hash_session_token(source_token)

            report_t = await create_report(creator, main)
            remote.eval_fail_after = 1
            partial_t = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_t["report_id"], "access_code": report_t["access_code"]},
            )
            assert partial_t.status_code == 503, partial_t.text
            # C2 SET, current C DEL and ancestor S0 tombstone all reach the
            # remote, but T is not consumed and every read-back fails.
            remote.eval_fail_after = 3
            remote.mget_always_fails = True
            retry_t = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_t["report_id"], "access_code": report_t["access_code"]},
            )
            assert retry_t.status_code == 503, retry_t.text
            remote_source = json.loads(
                remote.values[main._sessions._redis_key(source_hash)]
            )
            assert remote_source["superseded_by_session_hash"]
            assert main._sessions[source_hash].superseded_by_session_hash is None
            assert source_hash in main._pending_session_revocations

            stale.cookies.set(
                main.SESSION_COOKIE_NAME, source_token, domain="testserver.local", path="/"
            )
            stale_read = await stale.get(f"/api/reports/{report_x['report_id']}")
            assert stale_read.status_code == 404, stale_read.text
            assert paid_marker not in stale_read.text
            token_b = await _claim_replay_login(
                stale, main, delivered, "readback-success-b@example.invalid"
            )
            session_b = main._sessions[main.hash_session_token(token_b)]
            assert report_x["report_id"] not in session_b.report_ids
            assert not session_b.pending_claim_report_ids
            b_read = await stale.get(f"/api/reports/{report_x['report_id']}")
            assert b_read.status_code == 404, b_read.text
            assert paid_marker not in b_read.text
            assert main._reports[report_x["report_id"]].owner_user_id == owner_id

        restarted = _restart_claim_replay_remote(
            main, remote, monkeypatch, "readback_superseded_successful_restart"
        )
        async with client_for(restarted) as restarted_b, client_for(restarted) as restored_owner:
            restarted_b.cookies.set(restarted.SESSION_COOKIE_NAME, token_b)
            restored_owner.cookies.set(restarted.SESSION_COOKIE_NAME, owner_token)
            restarted_read = await restarted_b.get(f"/api/reports/{report_x['report_id']}")
            assert restarted_read.status_code == 404, restarted_read.text
            assert paid_marker not in restarted_read.text
            owner_read = await restored_owner.get(f"/api/reports/{report_x['report_id']}")
            assert owner_read.status_code == 200, owner_read.text
            assert paid_marker in owner_read.text

    asyncio.run(scenario())


def test_readback_outage_blocks_remote_tombstone_marker_revival(service, monkeypatch):  # noqa: F811
    main, _ = service
    delivered = enable_fake_mail(main, monkeypatch)
    mock_paypal(main, monkeypatch)
    paid_marker = "Synthetic paid report"

    async def scenario():
        async with (
            client_for(main) as owner,
            client_for(main) as creator,
            client_for(main) as claimant,
            client_for(main) as completer,
            client_for(main) as stale,
        ):
            report_x = await create_report(owner, main)
            remote = _attach_lost_eval_remote(main)
            remote.lose_next_eval_response = False
            remote.fail_next_mget = False
            owner_token = await _claim_replay_login(
                owner, main, delivered, "readback-revive-owner@example.invalid"
            )
            owner_id = main._reports[report_x["report_id"]].owner_user_id
            await _claim_replay_pay(owner, report_x)
            remote.eval_fail_after = 1
            partial_x = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_x["report_id"], "access_code": report_x["access_code"]},
            )
            assert partial_x.status_code == 503, partial_x.text
            source_token = claimant.cookies.get(main.SESSION_COOKIE_NAME)
            source_hash = main.hash_session_token(source_token)
            assert main._reports[report_x["report_id"]].access_code_consumed is False

            report_t = await create_report(creator, main)
            remote.eval_fail_after = 1
            partial_t = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_t["report_id"], "access_code": report_t["access_code"]},
            )
            assert partial_t.status_code == 503, partial_t.text
            remote.eval_fail_after = 3
            remote.mget_always_fails = True
            retry_t = await claimant.post(
                "/api/reports/claim",
                json={"report_id": report_t["report_id"], "access_code": report_t["access_code"]},
            )
            assert retry_t.status_code == 503, retry_t.text
            remote_source = json.loads(
                remote.values[main._sessions._redis_key(source_hash)]
            )
            assert remote_source["superseded_by_session_hash"]
            assert main._sessions[source_hash].superseded_by_session_hash is None
            assert source_hash in main._pending_session_revocations
            stale.cookies.set(
                main.SESSION_COOKIE_NAME, source_token, domain="testserver.local", path="/"
            )
            before_completion = await stale.get(f"/api/reports/{report_x['report_id']}")
            assert before_completion.status_code == 404, before_completion.text

            await _claim_replay_login(
                completer, main, delivered, "readback-revive-completer@example.invalid"
            )
            completed_x = await completer.post(
                "/api/reports/claim",
                json={"report_id": report_x["report_id"], "access_code": report_x["access_code"]},
            )
            assert completed_x.status_code == 200, completed_x.text
            revived = await stale.get(f"/api/reports/{report_x['report_id']}")
            assert revived.status_code == 404, revived.text
            assert paid_marker not in revived.text
            token_b = await _claim_replay_login(
                stale, main, delivered, "readback-revive-b@example.invalid"
            )
            session_b = main._sessions[main.hash_session_token(token_b)]
            assert report_x["report_id"] not in session_b.report_ids
            assert not session_b.pending_claim_report_ids
            b_read = await stale.get(f"/api/reports/{report_x['report_id']}")
            assert b_read.status_code == 404, b_read.text
            assert paid_marker not in b_read.text
            assert main._reports[report_x["report_id"]].owner_user_id == owner_id

        restarted = _restart_claim_replay_remote(
            main, remote, monkeypatch, "readback_superseded_revival_restart"
        )
        async with client_for(restarted) as restarted_b, client_for(restarted) as restored_owner:
            restarted_b.cookies.set(restarted.SESSION_COOKIE_NAME, token_b)
            restored_owner.cookies.set(restarted.SESSION_COOKIE_NAME, owner_token)
            restarted_read = await restarted_b.get(f"/api/reports/{report_x['report_id']}")
            assert restarted_read.status_code == 404, restarted_read.text
            assert paid_marker not in restarted_read.text
            owner_read = await restored_owner.get(f"/api/reports/{report_x['report_id']}")
            assert owner_read.status_code == 200, owner_read.text
            assert paid_marker in owner_read.text

    asyncio.run(scenario())
