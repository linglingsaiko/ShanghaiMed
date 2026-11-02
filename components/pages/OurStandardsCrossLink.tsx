'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function OurStandardsCrossLink() {
  const { language } = useLanguage()

  // The standards page currently exists in English only.
  if (language !== 'en') return null

  return (
    <section className="section-container pb-16">
      <div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-6 sm:p-8">
        <h2 className="text-xl font-bold text-primary">Want to know exactly what we promise — and what we don&apos;t?</h2>
        <p className="mt-3 leading-7 text-gray-600">
          Read our{' '}
          <Link href="/our-standards" className="font-semibold text-primary underline decoration-accent/60 underline-offset-4 hover:text-accent">
            Service Standards &amp; Your Protections
          </Link>
          : hospital coordination, transparent pricing and refunds, medical record privacy, family consent, and package-specific post-care support.
        </p>
      </div>
    </section>
  )
}
