'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { localePath, stripLocalePrefix } from '@/lib/i18n'

const ENGLISH_ONLY_PATHS = new Set(['/our-standards'])

interface LanguageSwitcherProps {
  /** dropdown：桌面右上角下拉；list：手机端汉堡菜单内平铺，避免小屏下拉被裁剪/遮挡 */
  variant?: 'dropdown' | 'list'
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'dropdown' }) => {
  const { language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const options = [
    { value: 'en' as const, label: 'EN', display: 'English' },
    { value: 'ja' as const, label: '日本語', display: '日本語' },
    { value: 'ar' as const, label: 'العربية', display: 'العربية' },
    { value: 'ru' as const, label: 'Русский', display: 'Русский' },
    { value: 'mn' as const, label: 'Монгол', display: 'Монгол' },
    { value: 'ms' as const, label: 'BM', display: 'Bahasa Melayu' },
    { value: 'id' as const, label: 'ID', display: 'Bahasa Indonesia' },
  ]

  const current = options.find(o => o.value === language)!

  const handleSwitch = (newLocale: string) => {
    const pathWithoutLocale = stripLocalePrefix(pathname) || '/'
    const destinationPath = ENGLISH_ONLY_PATHS.has(pathWithoutLocale) && newLocale !== 'en'
      ? '/'
      : pathWithoutLocale
    const newPath = localePath(newLocale as any, destinationPath)
    router.push(newPath)
    setOpen(false)
  }

  // 手机端：平铺所有语言，当前语言高亮，点击即切换（触摸目标足够大，无下拉）
  if (variant === 'list') {
    return (
      <div className="grid grid-cols-2 gap-2" dir="ltr">
        {options.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSwitch(option.value)}
            aria-current={language === option.value ? 'true' : undefined}
            className={`flex items-center gap-2 px-3 py-3 text-sm rounded-lg border text-left transition-colors ${
              language === option.value
                ? 'border-primary bg-primary/5 text-primary font-semibold'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50 active:bg-gray-100'
            }`}
          >
            <Globe className="w-4 h-4 shrink-0 opacity-60" />
            <span>{option.display}</span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-primary transition-colors rounded-md hover:bg-gray-50"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => handleSwitch(option.value)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                language === option.value
                  ? 'text-primary bg-primary/5 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {option.display}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
