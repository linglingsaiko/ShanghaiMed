# i18n 架构设计（阶段 1a）

## 路由策略

**方案 B：英文根路径 + 其他语言 `/[lang]` 前缀**

```
/                          → 英文（现有页面不变）
/blog                      → 英文
/research                  → 英文
...                        → 所有现有英文路由保持不变

/ja /ja/blog /ja/research  → 日文
/ar /ar/blog /ar/research  → 阿拉伯语（阶段 1a MVP）
/ru /ru/blog /ru/research  → 俄语（阶段 1b）
/mn                        → 蒙古语（阶段 1b）
```

## 技术实现

### 1. 动态路由 `[lang]`

```
app/
├── page.tsx              # 英文首页（保留）
├── blog/
│   └── page.tsx          # 英文博客（保留）
├── [lang]/
│   ├── page.tsx          # 其他语言首页
│   ├── blog/
│   │   └── page.tsx      # 其他语言博客
│   └── ...
└── layout.tsx            # 根 layout（英文）
```

### 2. `[lang]` 路由限制

```ts
// app/[lang]/page.tsx
export function generateStaticParams() {
  return [{ lang: 'ja' }, { lang: 'ar' }, { lang: 'ru' }, { lang: 'mn' }]
}
```

### 3. 共享组件 + locale props

```tsx
// components/sections/Hero.tsx
export default function Hero({ locale }: { locale: Locale }) {
  const t = useLocale(locale)  // 不是 useLanguage()
  return <h1>{t('hero.title')}</h1>
}
```

### 4. URL 即语言（废除 localStorage）

- LanguageContext 改为接收 `locale` prop（从路由参数）
- 语言切换器 = `<Link href={`/${newLocale}${pathname}`}>`
- 删除 `localStorage.setItem('shanghaimed-lang')` 相关代码

### 5. 内部链接加前缀

```tsx
// 改造前
<Link href="/blog">Blog</Link>

// 改造后
<Link href={`${locale}/blog`}>Blog</Link>
// 或使用辅助函数
<Link href={localePath(locale, '/blog')}>Blog</Link>
```

### 6. RTL 支持（阿拉伯语）

```css
/* 逻辑属性，不翻转整个布局 */
[dir="rtl"] {
  text-align: start;  /* 不是 text-align: right */
}

/* 组件内使用 Tailwind 逻辑属性 */
<div className="ms-4 me-2">  /* margin-inline-start/end */
```

### 7. metadata/SEO

```ts
// app/[lang]/page.tsx
export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  return {
    title: arMeta.title,
    description: arMeta.description,
    alternates: {
      canonical: `https://shanghaimedhealth.com/${params.lang}`,
      languages: {
        'en': '/',
        'ja': '/ja',
        'ar': '/ar',
      }
    }
  }
}
```

### 8. sitemap 扩展

```xml
<url>
  <loc>https://shanghaimedhealth.com/</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://shanghaimedhealth.com/" />
  <xhtml:link rel="alternate" hreflang="ja" href="https://shanghaimedhealth.com/ja" />
  <xhtml:link rel="alternate" hreflang="ar" href="https://shanghaimedhealth.com/ar" />
</url>
```

## 阶段 1a 范围（MVP）

**只做 5 个页面的阿拉伯语版本：**
1. `/ar` 首页
2. `/ar/how-it-works` 服务流程
3. `/ar/pricing` 透明定价
4. `/ar/contact` 联系表单
5. `/ar/treatments` 医院网络（或并入首页）

**英文页面完全不变，零回归风险。**

## 迁移步骤

1. 创建 `app/[lang]/` 目录结构（仅 MVP 5 页）
2. 创建 `lib/i18n.ts` 辅助函数（localePath, useLocale）
3. 修改 `LanguageContext` 为 URL 驱动
4. 修改 `LanguageSwitcher` 为路由跳转
5. 修改 MVP 页面的内部 Link
6. 阿拉伯语 RTL 样式
7. metadata/hreflang/sitemap
8. 测试 + 回归验证
