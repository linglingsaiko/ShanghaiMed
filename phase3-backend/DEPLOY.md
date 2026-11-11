# MediMatch 部署与上线验收

## 架构与发布边界

- 官网：Next.js 15 / Vercel，入口 `/medical-records/index.html`。
- API：FastAPI / Railway，由官网 `/api/phase3/*` 同源代理访问。
- 持久化：生产使用 Upstash Redis；SQLite 仅用于本地或临时降级。
- 支付：PayPal 服务端创建订单并核实 capture；浏览器返回值不能作为解锁依据。
- 找回：HttpOnly Session、一次性报告提取码；SMTP 配置完成后才开放邮箱 OTP。

**当前锁、OTP 限流和支付幂等锁均为单进程实现。Railway 必须保持单个 Uvicorn worker、单 replica，并避免支付流量经过重叠部署。** 扩容前需改为共享原子锁/CAS 和共享限流；单进程测试不构成多实例安全证明。

## 1. Railway 后端配置

启动命令保持：

```bash
uvicorn api.main:app --host 0.0.0.0 --port $PORT
```

### 必需配置

| 配置 | 说明 |
| --- | --- |
| `ARK_API_KEY` | AI 服务密钥，仅通过 Railway 密钥管理设置 |
| `UPSTASH_REDIS_REST_URL` | Upstash REST 地址 |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash 密钥 |
| `PAYPAL_CLIENT_ID` | 与所选环境一致的 PayPal Client ID |
| `PAYPAL_CLIENT_SECRET` | PayPal 密钥 |
| `PAYPAL_MERCHANT_ID` | 预期收款方 Merchant ID；capture 必须明确返回且完全一致，未配置时支付默认关闭 |
| `PAYPAL_ENV` | 预发用 `sandbox`；正式收款用 `live` |
| `PAYPAL_PRICE_USD` | 服务端固定价格，当前默认 `9.90` |
| `CORS_ALLOW_ORIGINS` | `https://shanghaimedhealth.com,https://www.shanghaimedhealth.com` |
| `TRUST_PROXY_HEADERS` | 仅在 Railway 可信代理后设为 `1` |

### 找回与保留期

- `SESSION_TTL_SECONDS`：默认 30 天。
- `RESULT_TTL_SECONDS`：免费报告默认 7 天。
- `PAID_RESULT_TTL_SECONDS`：已支付报告默认 180 天。
- `OTP_TTL_SECONDS`：默认 10 分钟。
- `OTP_RESEND_SECONDS`、`OTP_MAX_ATTEMPTS`：OTP 重发与验证次数限制。
- `SESSION_COOKIE_NAME`：默认 `smed_session`，必须与 Vercel 的 `PHASE3_SESSION_COOKIE_NAME` 一致。
- `MEDICAL_RECORDS_TEMP_DIR`、`MEDICAL_RECORDS_DB`：本地文件/SQLite 路径；不能替代生产 Upstash。
- `MAX_FILE_SIZE_BYTES`、`MAX_BATCH_SIZE_BYTES`：默认单文件 20 MiB、单批次 50 MiB；流式保存时同步执行批次剩余额度检查。
- Upstash 初始加载或 pipeline 任一命令失败时默认拒绝继续，不得把失败数据标记为已同步。
- 报告认领与 OTP 登录使用跨 store durable 事务：SQLite 在同一事务提交，Upstash 在单次 EVAL 中执行；一次性提取码和 OTP 均在操作序列最后消费。
- EVAL 响应丢失时必须读回完整 durable 状态：完整提交可正常成功；明确未提交返回可重试 503。报告认领读回不可用，或读回确认候选 Session 已部分持久化时，返回 `recovery_pending=true` 和候选 Session Cookie，保住已迁移的原有匿名资产；下一次请求先完成 read-before-auth，未消费的新报告仍由 durable pending 标记隔离；OTP 读回不可用只返回 `auth_pending=true`，绝不下发不确定的候选认证 Cookie，完整提交可通过重新获取 OTP 安全恢复。
- 待定对账必须同时绑定 Session、报告编号和 OTP 邮箱键。任何报告提取码或 OTP 校验前先读回对应待定事务；没有原 Cookie 的干净浏览器也不能利用旧内存镜像重放已消费凭证，读回仍失败统一返回 503。
- 部分认领可能已持久化新 Session 但尚未消费提取码；该 Session 的 durable `pending_claim_report_ids` 必须阻止同进程及重启后的报告访问。连续认领继承全部待定标记，OTP 合并匿名 Session 时过滤未消费报告，完整消费后才清除标记。
- claim 候选必须持久化服务端生成的 `claim_source_session_hashes`。即使上传迁移中途失败、新旧 Session 各持有一部分上传，候选 Cookie 也能通过来源链恢复原匿名资产；后续 claim 与匿名 OTP 使用整条链完成迁移，但 OTP 不会把原始旧来源 Session 变成新的 bearer 来源链，账号 A→B 切换不得继承。后续 claim／OTP 成功提交时，以来源链中每个 Session 的 durable `superseded_by_session_hash` tombstone 撤销旧 bearer；被取代 Session 不得解析、读取报告／上传、claim 或作为 OTP 合并来源，远程重载后同样失效。若 Lua 结果不确定且 MGET 持续失败，当前 candidate／旧 Session 保持 read-back 恢复，本次正在撤销的全部祖先另入 fail-closed 门禁：read-back 恢复前一律按匿名处理，不得凭本地旧镜像读取或合并授权。报告绑定 `owner_user_id` 后，仅账号本人或当前未取代且持有该报告成功 claim 持久标记的 Session 可访问，普通旧 `report_ids`、全局提取码已消费状态和来源链不能复活旧授权；上传绑定后仅所属账号可访问。OTP 不得合并未完成 claim 或已属于其他账号的报告与上传。
- capture 超时或连接异常属于不确定金融结果，订单必须保持 `capturing` 或 `review_required`，不得回退 `created` 或开放第二订单。

### 可选 SMTP

未配置 `SMTP_HOST` 和 `SMTP_FROM` 时，`/api/auth/config` 必须返回 `email_enabled=false`，OTP 请求返回不可用；用户仍可用报告编号和一次性提取码找回，不得显示邮件已发送。

启用 OTP 时配置：

- `SMTP_HOST`、`SMTP_PORT`、`SMTP_FROM`
- `SMTP_USE_TLS` 或 `SMTP_USE_SSL`
- `SMTP_TIMEOUT_SECONDS`
- 可选 `SMTP_USERNAME`
- 密钥管理中的 `SMTP_PASSWORD`

## 2. Vercel 官网配置

- `PHASE3_API_URL`：Railway 服务根 URL，不带 `/api`。
- `PHASE3_SESSION_COOKIE_NAME`：默认 `smed_session`，与后端一致。
- `NEXT_PUBLIC_SITE_URL=https://shanghaimedhealth.com`。
- `BLOG_ADMIN_PASSWORD`：仅服务端博客写入鉴权；未配置时创建、修改、删除默认拒绝。禁止改用 `NEXT_PUBLIC_` 密码变量。

安装与构建：

```bash
npm ci --registry=https://registry.npmjs.org
npm run build
npm audit --omit=dev --registry=https://registry.npmjs.org
```

## 3. 发布顺序

1. 发布 FastAPI，确认健康检查、Upstash 读写和单 worker。
2. 发布 Next.js，确认 `PHASE3_API_URL` 指向该后端。
3. 先验收匿名上传、报告恢复和权限隔离，再验收 OTP 与支付。
4. 生产只使用真实配置；本地 mock 的通过结果不能替代线上验收。

## 4. 上线前自动化门槛

在发布候选上完成并保留结果：

```bash
# 后端：合成数据、隔离数据库
cd phase3-backend
PYTHONPATH=$PWD pytest -q --tb=short \
  tests/test_report_center.py \
  tests/test_security_boundaries.py \
  tests/test_pipeline_security.py \
  tests/test_audit_regressions.py

# 前端异步安全回归
node ../../testing/medimatch_security_regression.cjs

# 真实 Next HTTP ↔ FastAPI HTTP；外部服务均为本地 mock
python ../../testing/medimatch_contract_driver.py
```

另需完成 Chromium E2E、关键多语言页面/API smoke test，以及独立安全审核。任何 P0/P1、契约失败或浏览器敏感数据写回均阻断上线。

## 5. 真实线上验收

- 上传合成测试病历并完成 AI 分析；确认报告编号、一次性提取码和免费 preview。
- 刷新、离开再进入、换 Session 和换设备恢复；跨用户访问必须为 403/404。
- 错误提取码拒绝，正确提取码一次性认领；不得从列表、状态或错误响应泄露完整报告。
- SMTP 未配置时验证诚实降级；配置后收取真实 OTP，验证轮换、退出和重放拒绝。
- 经授权完成一次 sandbox/live 支付验收：订单金额币种、报告绑定、最终 capture ID/status、收款方 Merchant ID、持久化订单金额、重复 capture 和刷新恢复均正确。不得用前端 mock 冒充真实支付。
- 故障注入验收：durable 写入失败只返回 `202 payment_pending`，不得返回或通过后续 GET 泄露 `full_report`；恢复后重试同一订单，不得引导用户另建订单重复付款。
- 真实 Upstash 故障注入必须覆盖 EVAL 成功但响应丢失、MGET 暂时失败、进程强杀与重启：认领和 OTP 均不得丢失唯一恢复路径或允许一次性凭证重放；同进程下一次请求与重启后都要核对恢复结果。
- capture 请求超时后必须核实原订单仍为 `capturing/review_required`，新订单创建返回 409；只能查询或重试原订单并完成对账，不能再次扣款。
- 检查上传、分析、报告、认证和支付响应均为 `Cache-Control: no-store`，Cookie 为 `HttpOnly / Secure / SameSite=Lax / Path=/`。
- 日志不得包含 OTP、提取码、Session token、Cookie、医疗正文或支付密钥。

真实 Upstash、SMTP、PayPal、AI 或浏览器链路未验收的项目必须明确保留为未完成，不能宣布报告中心已经上线。
