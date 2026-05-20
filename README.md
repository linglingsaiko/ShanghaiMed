# ShanghaiMed - International Medical Tourism Platform

> World-class medical care in Shanghai at a fraction of the cost.

## 📋 项目说明 / Project Overview

ShanghaiMed 是一个面向国际患者的上海医疗机构对接平台英文官网。平台连接全球患者与上海顶级医院、双语护士，以及24/7 AI支持服务。

ShanghaiMed is an English website for an international medical tourism platform connecting global patients with Shanghai's top-tier hospitals, bilingual nurses, and 24/7 AI support.

### 核心功能 / Key Features

- 🏥 医院网络展示 - 47+国际保险直付医院
- 👩‍⚕️ 双语护士服务 - ISPN认证护士团队
- 💬 AI客服机器人 - 24/7在线支持
- 📱 WhatsApp浮窗 - 即时通讯集成
- 📝 预约咨询表单 - 免费初步评估

## 🚀 快速开始 / Quick Start

### 环境要求 / Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm

### 安装步骤 / Installation

```bash
# 进入项目目录
cd shanghai-medical

# 安装依赖
npm install
# 或
yarn install
# 或
pnpm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看网站。

### 构建生产版本 / Build for Production

```bash
npm run build
npm run start
```

## 🛠️ Trae IDE 使用指南 / Trae IDE Guide

本项目专为在 [Trae IDE](https://trae.ai/) 中开发和修改而设计。

### 在 Trae 中打开项目

1. 打开 Trae IDE
2. 选择 "Open Project" 或使用快捷键 `Cmd/Ctrl + O`
3. 选择 `shanghai-medical` 文件夹
4. 项目会自动识别为 Next.js 项目

### 项目结构说明

```
shanghai-medical/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 全局布局（含Header/Footer）
│   ├── page.tsx           # 首页（7大Section组装）
│   ├── globals.css        # 全局样式
│   └── [page]/page.tsx    # 各子页面
├── components/            # React 组件
│   ├── Header.tsx         # 导航栏
│   ├── Footer.tsx         # 页脚
│   ├── WhatsAppFloat.tsx  # WhatsApp浮窗
│   ├── AgentChat.tsx      # AI聊天组件
│   ├── sections/          # 首页各Section组件
│   └── ui/                # 通用UI组件（Button, Card, Badge）
├── lib/                   # 工具库
│   ├── constants.ts       # 数据常量（医院信息、流程步骤等）
│   └── analytics.ts       # Google Analytics配置
└── public/               # 静态资源
```

### 修改指南 / Modification Guide

#### 1. 修改医院数据

编辑 `lib/constants.ts` 中的医院数据：

```typescript
// Tier 1 公立三甲医院
export const tier1Hospitals: Hospital[] = [
  {
    id: 'hospital-id',
    name: '医院名称',
    specialties: ['专科1', '专科2'],
    // ... 其他字段
  }
]
```

#### 2. 修改文案内容

所有页面文案都在 `lib/constants.ts` 中集中管理，便于维护：

- `statistics` - 统计数据
- `costComparison` - 费用对比
- `processSteps` - 流程步骤
- `faqData` - FAQ问答
- `patientStories` - 患者故事
- `nurseServices` - 护士服务

#### 3. 添加新页面

在 `app/` 下创建新文件夹并添加 `page.tsx`：

```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return (
    <div className="pt-24">
      {/* 页面内容 */}
    </div>
  )
}
```

#### 4. 添加新组件

在 `components/` 下创建组件文件：

```typescript
// components/NewComponent.tsx
export default function NewComponent() {
  return <div>...</div>
}
```

## 🌐 Vercel 部署指南 / Deploy to Vercel

### 方式一：GitHub 导入（推荐）

1. 将项目推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. Vercel 会自动检测 Next.js 项目并配置

### 方式二：Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 环境变量配置

在 Vercel Dashboard 中设置：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | `G-XXXXXXXXXX` |

## 📁 文件结构详解 / File Structure

```
shanghai-medical/
├── app/
│   ├── layout.tsx              # 全局布局 + SEO metadata + JSON-LD
│   ├── page.tsx                # 首页（所有Section组装）
│   ├── globals.css             # Tailwind + 自定义样式
│   ├── why-shanghai/           # 为什么选上海
│   ├── how-it-works/           # 就医流程
│   ├── treatments/             # 医院/科室
│   ├── care-team/              # 护士团队
│   ├── patient-stories/         # 患者故事
│   ├── faq/                    # 常见问题
│   └── contact/                # 联系我们
├── components/
│   ├── Header.tsx              # 响应式导航栏
│   ├── Footer.tsx              # 页脚
│   ├── WhatsAppFloat.tsx       # WhatsApp浮窗按钮
│   ├── AgentChat.tsx           # AI客服聊天窗口
│   ├── sections/               # 首页Section组件
│   │   ├── Hero.tsx           # 首屏大图
│   │   ├── WhyShanghai.tsx     # 为什么选上海
│   │   ├── HowItWorks.tsx      # 4步流程
│   │   ├── TreatmentAreas.tsx  # 医院卡片
│   │   ├── CareTeam.tsx        # 护士团队
│   │   ├── PatientStories.tsx   # 患者故事
│   │   ├── FAQ.tsx             # 问答
│   │   └── Contact.tsx         # 联系表单
│   └── ui/                     # 通用UI组件
│       ├── Button.tsx          # 按钮
│       ├── Card.tsx            # 卡片
│       └── Badge.tsx           # 标签
├── lib/
│   ├── constants.ts            # 所有数据常量
│   └── analytics.ts           # GA追踪配置
├── public/
│   └── images/                 # 图片资源目录
├── tailwind.config.ts          # Tailwind配置
├── next.config.js             # Next.js配置
├── tsconfig.json              # TypeScript配置
└── package.json               # 依赖管理
```

## 🎨 设计规范 / Design System

### 配色 / Colors

| 颜色 | 用途 | 色值 |
|------|------|------|
| Primary | 主色（导航、标题） | `#0A2540` |
| Accent | 辅助色（CTA、强调） | `#00B37E` |
| White | 背景、文字 | `#FFFFFF` |
| Gray | 分隔、次要文字 | `#F3F4F6` |

### 字体 / Typography

- 字体族：`Inter, system-ui, sans-serif`
- 通过 Google Fonts 加载

### 组件样式

- 圆角：Card `rounded-xl` (12px)
- 阴影：`shadow-sm` → `shadow-lg`
- 间距：使用 Tailwind spacing scale

## 🔧 开发规范 / Development Guidelines

### 代码风格

- 使用 TypeScript 保持类型安全
- 组件使用 React Functional Components
- 样式优先使用 Tailwind CSS
- 使用 lucide-react 图标库

### 提交规范

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
```

## 📝 待办事项 / TODO

- [ ] 接入真实 WhatsApp 商务账号
- [ ] 接入 Coze AI Agent
- [ ] 添加真实医院图片
- [ ] 实现多语言支持（中文/英文）
- [ ] 添加 CMS 内容管理
- [ ] 集成预约系统
- [ ] 添加更多患者故事
- [ ] 实现保险验证功能

## 📄 License

© 2026 ShanghaiMed. All rights reserved.

## 联系方式 / Contact

- Email: Available upon request
- WhatsApp: Available upon request

---

Built with ❤️ for international patients seeking world-class medical care.
