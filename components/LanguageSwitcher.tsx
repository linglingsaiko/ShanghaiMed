'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage()
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
  ]

  const current = options.find(o => o.value === language)!

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
              onClick={() => {
                setLanguage(option.value)
                setOpen(false)
              }}
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