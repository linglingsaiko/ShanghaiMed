'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'

/**
 * Sets <html lang> and <html dir> attributes based on the current language.
 * Must be a client component since it reads from LanguageContext.
 * Works alongside LanguageProvider which also sets these as a fallback.
 */
export default function HtmlLangDirSetter() {
  const { language } = useLanguage()

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  return null
}
