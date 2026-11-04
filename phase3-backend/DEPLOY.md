# Phase 3 病历上传功能部署指南

## 架构

- **前端**：Next.js 官网（Vercel）→ `/medical-records` 路由
- **后端**：FastAPI（Railway）→ 独立服务
- **API 代理**：Next.js API 路由转发到 Railway

## 部署步骤

### 1. 部署后端到 Railway

1. 访问 [Railway.app](https://railway.app)
2. 点击 "New Project" → "Deploy from GitHub repo"
3. 选择 `ShanghaiMed/phase3-medical-records` 目录
4. Railway 会自动检测 Python 项目并安装依赖
5. 配置环境变量：
   - `ARK_API_KEY`: 火山引擎方舟 API Key
   - `PORT`: 8000（Railway 自动分配）
6. 部署完成后，记录服务 URL（如 `https://phase3-medical-records-production.up.railway.app`）

### 2. 配置 Next.js 环境变量

在 Vercel 项目设置中添加环境变量：
- `PHASE3_API_URL`: Railway 服务 URL（上一步获得的）

### 3. 部署前端到 Vercel

1. 将 `website` 目录推送到 GitHub
2. Vercel 会自动检测并部署
3. 访问 `https://shanghaimedhealth.com/medical-records`

### 4. 验证部署

访问 `https://shanghaimedhealth.com/medical-records`，测试：
- 文件上传
- AI 分析
- 报告生成

## 本地开发

### 启动后端

```bash
cd phase3-medical-records
export ARK_API_KEY="your-api-key"
uvicorn api.main:app --reload --port 8000
```

### 启动前端

```bash
cd website
export PHASE3_API_URL="http://localhost:8000"
npm run dev
```

访问 `http://localhost:3000/medical-records`

## 环境变量

### 后端（Railway）

- `ARK_API_KEY`: 火山引擎方舟 API Key（必需）
- `ARK_TIMEOUT_SECONDS`: AI 调用超时时间（默认 60）
- `ARK_MAX_TOKENS`: 最大生成 token 数（默认 2048）
- `ARK_MAX_RETRIES`: 最大重试次数（默认 0）

### 前端（Vercel）

- `PHASE3_API_URL`: Railway 后端服务 URL（必需）

## 支付集成（待 PayPal 审核通过后）

1. 在 Railway 后端添加 PayPal 环境变量：
   - `PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`
   - `PAYPAL_MODE`: sandbox / live

2. 实现 PayPal 支付回调处理

3. 更新前端支付按钮，接入 PayPal SDK

## 注意事项

- AI 流水线执行时间较长（约 2-3 分钟），前端需要显示进度
- 原始文件在分析完成后自动删除，不存储患者数据
- 免费预览和完整报告分离，付费后解锁完整报告
