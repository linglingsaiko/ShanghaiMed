'use client'

import React from 'react'
import Link from 'next/link'
import { Check, Clock, Calendar, ChevronDown, MessageCircle, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const WHATSAPP_LINK = 'https://wa.me/8613818274110'

const Pricing: React.FC = () => {
  const { t, tArr, localePath, language } = useLanguage()
  const isJapanese = language === 'ja'
  const primaryLink = isJapanese ? 'https://line.me/ti/p/cD_Ed4GHBM' : WHATSAPP_LINK

  const ctaTextLink = isJapanese
    ? 'LINEでこのプランについて相談 →'
    : 'Ask about this package on WhatsApp →'

  // 3 packages: Essential Care (POPULAR) / Extended Care / Extra Hours (add-on)
  const packages = [
    {
      priceUsd: '$1,000',
      type: 'core',
      popular: true,
      highlight: true,
      days: '3',
      ctaMsg: "Hi Sara, I'm interested in the Essential Care Concierge ($1,000 / 3-day package). Can you share more details?",
    },
    {
      priceUsd: '$1,650',
      type: 'core',
      popular: false,
      highlight: false,
      days: '5',
      ctaMsg: "Hi Sara, I'm interested in the Extended Care Concierge ($1,650 / 5-day package). Can you share more details?",
    },
    {
      priceUsd: '$50',
      type: 'addon',
      perUnit: '/hour',
    },
  ]

  const includedFallback = [
    'Airport pickup & drop-off',
    'Hotel coordination assistance',
    'In-person medical accompaniment (up to 8 hours/day)',
    'Bilingual medical interpretation',
    'Medical report translation & summaries',
    'Doctor appointment scheduling',
    'Medication pickup & coordination',
    'Hospital & specialist matching',
    'Local transportation & payment assistance',
    'Dedicated WeChat/WhatsApp support throughout your stay',
    'Visa invitation letter support',
    '30-day post-care remote follow-up',
    'Insurance direct-billing & pre-authorization support',
  ]

  const coreHighlightsFallback = [
    ['Airport pickup & drop-off', 'Bilingual medical interpretation', 'Medical report translation', '30-day post-care follow-up', 'Insurance billing support'],
    ['Everything in the 3-day package', 'Up to 8 hours/day for 5 days', 'Multi-department visit coordination', 'Inpatient discharge support', 'Extended post-care follow-up'],
  ]

  const freeItemsFallback = [
    'Medical needs assessment',
    'Hospital & specialist recommendations',
    'Estimated medical budget',
    'Insurance direct billing guidance',
  ]

  const faqFallback = [
    {
      q: 'How much does a medical concierge service cost in Shanghai?',
      a: 'Our escorted concierge packages start at $1,000 for a 3-day visit and $1,650 for a 5-day stay. Extra companion hours beyond your package are available at $50/hour as an add-on. Medical fees are paid directly to hospitals.',
    },
    {
      q: "What's included in the $1,000 Essential package?",
      a: 'The 3-day Essential package includes airport pickup, up to 8 hours/day of in-person nurse accompaniment, bilingual medical interpretation during appointments, medical report translation, insurance direct-billing support, and 30 days of post-care follow-up. See the full service list below.',
    },
    {
      q: 'Can I use my international insurance in Shanghai hospitals?',
      a: 'Yes. Shanghai\'s major international departments and Grade 3A hospitals accept many international insurance plans including Cigna, AXA, Allianz, MSH, and Bupa. We help with policy benefit checks, pre-authorization letters, and direct-billing coordination so you don\'t have to pay out of pocket and file claims yourself.',
    },
  ]

  return (
    <section id="pricing" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('pricing.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Free Consultation Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-8 md:p-10 mb-12 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{t('pricing.freeTitle')}</h3>
              <p className="text-white/80 mb-4">{t('pricing.freeDesc')}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(tArr('pricing.freeItems').length > 0 ? tArr('pricing.freeItems') : freeItemsFallback).map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <Link
                href={localePath('/free-consultation')}
                className="inline-flex items-center gap-2 bg-accent text-primary font-bold text-base px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
              >
                {t('pricing.freeLabel')}
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">{t('pricing.servicePricingTitle')}</h3>
          <p className="text-center text-gray-500 text-sm mb-10">{t('pricing.servicePricingDesc')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {packages.map((pkg, index) => {
              const isCore = pkg.type === 'core'
              const isAddon = pkg.type === 'addon'
              const pkgName = t(`pricing.packages.${index}.name`) || (index === 0 ? 'Essential Care Concierge' : index === 1 ? 'Extended Care Concierge' : 'Extra Companion Hours')
              const pkgDuration = t(`pricing.packages.${index}.duration`) || (index === 0 ? 'Up to 8 h/day × 3 days' : index === 1 ? 'Up to 8 h/day × 5 days' : '$50 per hour')
              const pkgDesc = t(`pricing.packages.${index}.description`) || (index === 0 ? 'Best for short consultations, check-ups and single-specialty visits' : index === 1 ? 'For extended treatment, multi-department visits or inpatient stays' : 'Add-on only — not sold separately')
              const ctaHref = isCore ? `${primaryLink}?text=${encodeURIComponent(pkg.ctaMsg || '')}` : undefined

              const highlights = tArr(`pricing.packages.${index}.highlights`)
              const displayHighlights = (highlights && highlights.length >= 4) ? highlights : coreHighlightsFallback[index] || []

              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl p-6 shadow-sm transition-all ${
                    pkg.highlight
                      ? 'border-2 border-accent md:scale-105 md:shadow-lg z-10'
                      : isCore
                        ? 'border border-gray-200'
                        : 'border border-gray-200 bg-gray-50'
                  }`}
                >
                  {/* Top Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">
                        {t('pricing.popularBadge')}
                      </span>
                    </div>
                  )}
                  {!pkg.popular && isCore && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="bg-gray-600 text-white text-xs font-medium px-4 py-1 rounded-full">
                        {t('pricing.extendedBadge')}
                      </span>
                    </div>
                  )}
                  {isAddon && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gray-400 text-white text-xs font-medium px-3 py-1 rounded-full">
                        {t('pricing.addonBadge')}
                      </span>
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-gray-900 mb-2 mt-1">{pkgName}</h4>
                  <div className="mb-3 flex items-baseline">
                    <span className={`text-3xl font-bold ${pkg.highlight ? 'text-accent' : 'text-primary'}`}>{pkg.priceUsd}</span>
                    {pkg.perUnit ? (
                      <span className="text-gray-500 text-sm ml-1">{pkg.perUnit}</span>
                    ) : (
                      <span className="text-gray-500 text-sm ml-1">{t('pricing.usdLabel')}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{pkgDuration}</p>
                  <p className={`text-xs mb-5 ${isAddon ? 'text-gray-500 italic' : 'text-amber-700'}`}>
                    {pkgDesc}
                  </p>

                  {/* Core package highlights */}
                  {isCore && displayHighlights.length > 0 && (
                    <ul className="space-y-2 mb-5 pt-4 border-t border-gray-100">
                      {displayHighlights.slice(0, 5).map((h: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Text-link CTA (only core packages) */}
                  {isCore && (
                    <a
                      href={ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-sm font-semibold text-accent hover:text-accent/80 mt-2 pt-4 border-t border-gray-100 transition-colors"
                    >
                      {ctaTextLink}
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Social Proof — right under price cards, when doubt is highest */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500">
            <Shield className="w-4 h-4 inline mr-1 -mt-0.5 text-accent" />
            {t('pricing.socialProof')}
          </p>
        </div>

        {/* Mini FAQ — GEO core asset */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">{t('pricing.faqTitle')}</h3>
          <div className="space-y-3 max-w-3xl mx-auto">
            {(tArr('pricing.faqItems').length >= 3 ? tArr('pricing.faqItems') : faqFallback).map((item: any, index: number) => {
              const q = typeof item === 'string' ? item : item.q
              const a = typeof item === 'string' ? '' : item.a
              return (
                <details key={index} className="bg-white rounded-xl border border-gray-200 group">
                  <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between font-semibold text-gray-900 text-sm hover:text-accent transition-colors">
                    <span>{q}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" />
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {a}
                  </div>
                </details>
              )
            })}
          </div>
        </div>

        {/* All 13 services — <details> for SSR visibility */}
        <div className="mb-10 max-w-3xl mx-auto">
          <details className="bg-white rounded-xl border border-gray-200">
            <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-center gap-2 font-semibold text-primary text-sm hover:text-accent transition-colors">
              <span>{t('pricing.seeAllServices')}</span>
              <ChevronDown className="w-4 h-4 transition-transform" />
            </summary>
            <div className="px-5 pb-5 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-gray-100">
              {(tArr('pricing.includedItems').length === 13 ? tArr('pricing.includedItems') : includedFallback).map((item, index) => (
                <div key={index} className="flex items-start gap-2 py-1.5 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* Footer fine print */}
        <div className="text-center space-y-2 text-xs text-gray-500 max-w-2xl mx-auto">
          <p>
            {t('pricing.extraHoursNote')}{' '}
            <Link href={localePath('/refund-policy')} className="text-accent hover:underline">{t('pricing.refundPolicy')}</Link>
            {' · '}
            {t('pricing.independentDisclaimer')}
          </p>
        </div>
      </div>

      {/* small CSS to hide default details marker */}
      <style jsx global>{`
        details > summary::-webkit-details-marker { display: none; }
        details > summary { list-style: none; }
      `}</style>
    </section>
  )
}

export default Pricing
