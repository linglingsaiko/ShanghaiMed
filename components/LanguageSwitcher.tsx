'use client'

import React from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{language === 'en' ? 'EN' : '日本語'}</span>
    </button>
  )
}

export default LanguageSwitcher