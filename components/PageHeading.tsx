'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface PageHeadingProps {
  titleKey: string
  subtitleKey: string
  fallbackTitle: string
  fallbackSubtitle: string
}

/**
 * 子页面标题组件：根据当前语言渲染标题/副标题。
 * 翻译缺失时回退到英文原文，保证页面永不空白。
 */
const PageHeading: React.FC<PageHeadingProps> = ({
  titleKey,
  subtitleKey,
  fallbackTitle,
  fallbackSubtitle,
}) => {
  const { t } = useLanguage()
  const title = t(titleKey)
  const subtitle = t(subtitleKey)

  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          {title !== titleKey ? title : fallbackTitle}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          {subtitle !== subtitleKey ? subtitle : fallbackSubtitle}
        </p>
      </div>
    </div>
  )
}

export default PageHeading
