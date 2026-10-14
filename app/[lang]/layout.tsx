import { LanguageProvider } from '@/contexts/LanguageContext'
import type { Language } from '@/contexts/LanguageContext'
import { isValidLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

// Generate static params for non-English locales (English is served from root /)
export function generateStaticParams() {
  return [{ lang: 'ja' }, { lang: 'ar' }, { lang: 'ru' }, { lang: 'mn' }]
}

// Reject unknown locales with 404
export const dynamicParams = false

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isValidLocale(params.lang) || params.lang === 'en') {
    notFound()
  }

  return (
    <LanguageProvider locale={params.lang as Language}>
      {children}
    </LanguageProvider>
  )
}
