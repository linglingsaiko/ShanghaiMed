'use client'

import React from 'react'
import Link from 'next/link'
import { Check, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const WHATSAPP_LINK = 'https://wa.me/8613818274110'
const LINE_LINK = 'https://line.me/ti/p/cD_Ed4GHBM'

const Pricing: React.FC = () => {
  const { t, tArr, localePath, language } = useLanguage()
  const isJapanese = language === 'ja'
  const primaryLink = isJapanese ? LINE_LINK : WHATSAPP_LINK

  const ctaTextLink = isJapanese
    ? 'LINEでこのプランについて相談 →'
    : 'Ask about this package on WhatsApp →'

  // 3 core packages + add-on:
  // $500 Health Checkup (1 day) / $1000 Essential (3 days, POPULAR) / $1650 Surgery & Extended (5 days) / $50/hour add-on
  const packages = [
    {
      priceUsd: '$500',
      type: 'core',
      popular: false,
      highlight: false,
      ctaMsg: "Hi Sara, I'm interested in the Health Checkup Concierge ($500 / 1-day package). Can you share more details?",
    },
    {
      priceUsd: '$1,000',
      type: 'core',
      popular: true,
      highlight: true,
      ctaMsg: "Hi Sara, I'm interested in the Essential Care Concierge ($1,000 / 3-day package). Can you share more details?",
    },
    {
      priceUsd: '$1,650',
      type: 'core',
      popular: false,
      highlight: false,
      ctaMsg: "Hi Sara, I'm interested in the Surgery & Extended Care Concierge ($1,650 / 5-day package). Can you share more details?",
    },
    {
      priceUsd: '$50',
      type: 'addon',
      perUnit: '/hour',
    },
  ]

  // Fallback full service lists per package (used when translations aren't loaded yet)
  const coreItemsFallback = [
    [ // $500 — 1-day Health Checkup
      '1 full-day on-site nurse accompaniment (daytime)',
      'Airport pickup & drop-off',
      'Hotel coordination assistance',
      'Bilingual medical interpretation',
      'Health screening report translation & explanation',
      'Doctor appointment scheduling',
      'Medication pickup & coordination',
      'Hospital & specialist matching',
      'Local transportation & payment assistance',
      'Dedicated WhatsApp support throughout your stay',
      'Visa invitation letter support',
      '30-day post-care remote follow-up',
      'Insurance direct-billing & pre-authorization support',
    ],
    [ // $1,000 — 3-day Essential
      '3 full days on-site nurse accompaniment (daytime)',
      'Airport pickup & drop-off',
      'Hotel coordination assistance',
      'Bilingual medical interpretation',
      'Medical report translation & summaries',
      'Doctor appointment scheduling',
      'Medication pickup & coordination',
      'Hospital & specialist matching',
      'Local transportation & payment assistance',
      'Dedicated WhatsApp support throughout your stay',
      'Visa invitation letter support',
      '30-day post-care remote follow-up',
      'Insurance direct-billing & pre-authorization support',
    ],
    [ // $1,650 — 5-day Surgery & Extended
      '5 full days on-site nurse accompaniment (pre-op, surgery day & post-op)',
      'Airport pickup & drop-off',
      'Hotel & extended-stay coordination',
      'Bilingual medical interpretation (including surgery-day support)',
      'Full medical report translation & surgical summary',
      'Surgeon appointment & pre-admission scheduling',
      'Pre-surgery preparation & admission coordination',
      'Medication pickup & post-op prescription coordination',
      'Hospital & surgeon matching',
      'Inpatient check-ins during hospital stay',
      'Local transportation & payment assistance',
      'Dedicated WhatsApp support throughout your stay',
      'Medical visa invitation letter support',
      'Family communication & progress updates',
      '60-day post-care remote follow-up',
      'Insurance direct-billing, pre-authorization & surgical deposit coordination',
    ],
  ]

  const coreDescsFallback = [
    'For 1-day health checkup programs only',
    'Required for all specialist consultations and medical conditions',
    'Required for surgery and inpatient procedures',
  ]

  const coreNamesFallback = [
    'Health Checkup Concierge',
    'Essential Care Concierge',
    'Surgery & Extended Care Concierge',
  ]

  const freeItemsFallback = [
    'Medical needs assessment',
    'Hospital & specialist recommendations',
    'Estimated medical budget',
    'Insurance direct-billing guidance',
  ]

  const faqFallback = [
    {
      q: 'How much does a medical concierge service cost in Shanghai?',
      a: "Our concierge packages are $500 for a 1-day Health Checkup visit (health checkup programs only), $1,000 for a 3-day Essential Care package (required for all specialist consultations and medical conditions), and $1,650 for a 5-day Surgery & Extended Care package (required for surgery and inpatient procedures). Every package includes a dedicated trilingual nurse and full concierge support. Extra companion hours beyond your package are available at $50/hour as an add-on. Medical fees are paid directly to hospitals — we do not charge hospital commissions.",
    },
    {
      q: "What's included in the $1,000 Essential package?",
      a: 'The 3-day Essential package includes airport pickup & drop-off, hotel coordination, up to 8 hours/day of in-person nurse accompaniment for 3 full days (daytime), bilingual medical interpretation during all appointments, medical report translation & summaries, doctor appointment scheduling, medication pickup coordination, hospital & specialist matching, local transportation & payment assistance, dedicated WhatsApp support throughout your stay, visa invitation letter support, 30-day post-care remote follow-up, and insurance direct-billing & pre-authorization support — 13 services total.',
    },
    {
      q: 'Can I use my international insurance in Shanghai hospitals?',
      a: "Yes. Shanghai's major international departments and Grade 3A hospitals accept many international insurance plans including Cigna, AXA, Allianz, MSH, and Bupa. We help with policy benefit checks, pre-authorization letters, and direct-billing coordination so you don't have to pay out of pocket and file claims yourself.",
    },
    {
      q: 'Does the concierge fee include medical treatment costs?',
      a: "No. The concierge fee covers Sara's on-the-ground support services only. Medical fees (doctor consultations, tests, medication, procedures, health screening packages, surgery) are paid directly to hospitals and clinics at local rates — we do not mark up medical costs and we do not receive commissions from hospitals. This separation keeps our recommendations fully independent.",
    },
    {
      q: 'How much is a comprehensive health checkup in Shanghai, and what does the $500 package cover?',
      a: "Executive health screenings in Shanghai start from $700 at Grade 3A hospitals and premier international clinics (vs $2,500+ in the U.S.), with premium packages ranging up to $1,500+ depending on depth. Our $500 Health Checkup Concierge includes all concierge services — airport pickup, hotel coordination, bilingual nurse accompaniment for 1 full day, medical interpretation, report translation with explanation, insurance coordination, and 30-day follow-up. The $700+ medical screening fee is paid directly to the clinic.",
    },
    {
      q: "What's included in the $1,650 Surgery & Extended Care package?",
      a: "The 5-day Surgery & Extended Care package is designed for patients undergoing surgery, inpatient procedures, or extended treatment in Shanghai. It includes all the services in the Essential package plus surgery-specific support: pre-admission and surgical preparation coordination, inpatient check-ins during hospital stay, surgery-day nurse accompaniment, family communication and progress updates for loved ones back home, extended 60-day post-care remote follow-up, and insurance coordination for surgical deposits and pre-authorization.",
    },
  ]

  // Resolve items for a core package (from translations or fallback)
  const getCoreItems = (idx: number): string[] => {
    const translated = tArr(`pricing.packages.${idx}.allItems`)
    if (translated && translated.length >= 10) return translated
    return coreItemsFallback[idx]
  }

  return (
    <section id="pricing" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Pricing Cards — 3 core cards side by side */}
        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">{t('pricing.servicePricingTitle')}</h3>
          <p className="text-center text-gray-500 text-sm mb-10">{t('pricing.servicePricingDesc')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {packages.filter(p => p.type === 'core').map((pkg, index) => {
              const pkgName = t(`pricing.packages.${index}.name`) || coreNamesFallback[index]
              const pkgDesc = t(`pricing.packages.${index}.description`) || coreDescsFallback[index]
              const items = getCoreItems(index)
              const ctaHref = `${primaryLink}?text=${encodeURIComponent(pkg.ctaMsg || '')}`

              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl p-6 shadow-sm transition-all ${
                    pkg.highlight
                      ? 'border-2 border-accent md:scale-[1.03] md:shadow-lg z-10'
                      : 'border border-gray-200'
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

                  <h4 className="text-lg font-bold text-gray-900 mb-2 mt-1">{pkgName}</h4>
                  <div className="mb-4 flex items-baseline">
                    <span className={`text-3xl font-bold ${pkg.highlight ? 'text-accent' : 'text-primary'}`}>{pkg.priceUsd}</span>
                    <span className="text-gray-500 text-sm ml-1">{t('pricing.usdLabel')}</span>
                  </div>
                  <p className="text-xs text-amber-700 mb-5">{pkgDesc}</p>

                  {/* What's included — full list inside the card, 2 columns on sm+ */}
                  <div className="pt-4 border-t border-gray-100 mb-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      {t('pricing.whatsIncluded') || "What's included"}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {items.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-700 leading-snug">
                          <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Text-link CTA */}
                  <a
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-sm font-semibold text-accent hover:text-accent/80 pt-4 border-t border-gray-100 transition-colors"
                  >
                    {ctaTextLink}
                  </a>
                </div>
              )
            })}
          </div>

          {/* Add-on: Extra hours */}
          <div className="max-w-3xl mx-auto mt-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 flex items-center justify-between text-sm">
              <div>
                <span className="font-semibold text-gray-700">{t('pricing.addonTitle')}</span>
                <span className="text-gray-500 ml-2">{t('pricing.addonDesc')}</span>
              </div>
              <span className="font-bold text-primary flex-shrink-0 ml-4">$50<span className="text-gray-500 font-normal text-xs">/hour</span></span>
            </div>
          </div>
        </div>

        {/* Social Proof — no unsubstantiated country count */}
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
            {(tArr('pricing.faqItems').length >= 5 ? tArr('pricing.faqItems') : faqFallback).map((item: any, index: number) => {
              const q = typeof item === 'string' ? item : item.q
              const a = typeof item === 'string' ? '' : item.a
              return (
                <details key={index} className="bg-white rounded-xl border border-gray-200 group">
                  <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between font-semibold text-gray-900 text-sm hover:text-accent transition-colors">
                    <span>{q}</span>
                    <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {a}
                  </div>
                </details>
              )
            })}
          </div>
        </div>

        {/* Footer fine print */}
        <div className="text-center space-y-1 text-xs text-gray-500 max-w-2xl mx-auto">
          <p>{t('pricing.perPersonFooter') || '* All concierge packages are priced per person.'}</p>
          <p>
            {t('pricing.extraHoursNote')}
          </p>
          <p>
            {t('pricing.emergencyNote')}{' '}
            <Link href={localePath('/refund-policy')} className="text-accent hover:underline">{t('pricing.refundPolicy')}</Link>
            {' · '}
            {t('pricing.independentDisclaimer')}
          </p>
        </div>
      </div>

      {/* hide default details marker */}
      <style jsx global>{`
        details > summary::-webkit-details-marker { display: none; }
        details > summary { list-style: none; }
      `}</style>
    </section>
  )
}

export default Pricing
