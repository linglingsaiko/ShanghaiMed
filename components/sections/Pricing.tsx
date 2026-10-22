'use client'

import React from 'react'
import Link from 'next/link'
import { Check, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const WHATSAPP_LINK = 'https://wa.me/8613818274110'
const LINE_LINK = 'https://line.me/ti/p/cD_Ed4GHBM'

type CardKind = 'free' | 'hourly' | 'checkup' | 'essential' | 'surgery'

interface CardDef {
  kind: CardKind
  priceLabel: string
  unitKey?: string
  unitFallback: string
  badgeFallback?: string
  badgeVariant?: 'free' | 'hourly' | ''
  badgeKey?: string
  nameKey: string
  nameFallback: string
  subtitleKey: string
  subtitleFallback: string
  scopeKey: string
  scopeFallback: string
  scopeVariant?: 'free' | 'hourly' | 'hard'
  itemsKey: string
  itemsFallback: string[]
  itemsLabelKey?: string
  itemsCountLabelFallback: string
  footnoteKey?: string
  footnoteFallback?: string
  calloutKey?: string
  calloutFallback?: string
  calloutVariant?: 'free' | 'warning' | ''
  socialProofKey?: string
  socialProofFallback?: string
  ctaMsg?: string
  ctaKey?: string
  ctaFallback: string
  ctaVariant?: 'muted' | 'gray' | 'primary'
}

const Pricing: React.FC = () => {
  const { t, tArr, localePath, language } = useLanguage()
  const isJapanese = language === 'ja'
  const primaryLink = isJapanese ? LINE_LINK : WHATSAPP_LINK
  const ctaTextPaid = isJapanese ? 'LINEでこのプランについて相談 →' : 'Ask about this package on WhatsApp →'

  // ---- FALLBACKS (EN) ----
  const freeItemsFallback = [
    'Medical needs assessment',
    'Hospital & specialist recommendations',
    'Treatment cost estimate',
    'Insurance guidance',
  ]
  const hourlyItemsFallback = [
    'On-site escort companion at the hospital',
    'English–Chinese on-site medical interpretation',
    'On-the-spot guidance (queue, payment, pharmacy pickup)',
    'Same-day check-in message after visit',
  ]
  const checkupItemsFallback = [
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
    '30-day post-checkup remote follow-up',
    'Insurance support',
  ]
  const essentialItemsFallback = [
    '3 full days on-site nurse accompaniment (daytime)',
    'Airport pickup & drop-off',
    'Hotel coordination assistance',
    'Bilingual medical interpretation during all appointments',
    'Medical report translation & summaries',
    'Doctor appointment scheduling',
    'Medication pickup & coordination',
    'Hospital & specialist matching',
    'Local transportation & payment assistance',
    'Dedicated WhatsApp support throughout your stay',
    'Visa invitation letter support',
    '30-day post-care remote follow-up',
    'Insurance support',
  ]
  const surgeryItemsFallback = [
    '5 full days on-site nurse accompaniment (daytime) · pre-op, surgery day & post-op',
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
    'Insurance & surgical deposit coordination',
  ]

  const cards: CardDef[] = [
    {
      kind: 'free',
      priceLabel: '$0',
      unitKey: 'pricing.freeCard.unit',
      unitFallback: 'Free',
      badgeKey: 'pricing.freeCard.badge',
      badgeFallback: 'No commitment',
      badgeVariant: 'free',
      nameKey: 'pricing.freeCard.name',
      nameFallback: 'Free Initial Consultation',
      subtitleKey: 'pricing.freeCard.subtitle',
      subtitleFallback: 'Get the information you need to decide — before you commit.',
      scopeKey: 'pricing.freeCard.scope',
      scopeFallback: 'Talk to Sara first — no obligation, no payment.',
      scopeVariant: 'free',
      itemsKey: 'pricing.freeCard.items',
      itemsFallback: freeItemsFallback,
      itemsLabelKey: 'pricing.freeCard.itemsLabel',
      itemsCountLabelFallback: 'What you get — 4 services',
      calloutKey: 'pricing.freeCard.callout',
      calloutFallback:
        'Decision-stage only. This free call helps you figure out the right hospital, doctor, and budget range. On-site services (accompaniment, booking, translation) start when you book an hourly escort or a concierge package.',
      calloutVariant: 'free',
      ctaKey: 'pricing.freeCard.cta',
      ctaFallback: 'Chat with Sara on WhatsApp →',
      ctaVariant: 'muted',
      ctaMsg: "Hi Sara, I'd like a free initial consultation about medical care in Shanghai.",
    },
    {
      kind: 'hourly',
      priceLabel: '$50',
      unitKey: 'pricing.hourlyCard.unit',
      unitFallback: 'per hour · min. 2 hours',
      badgeKey: 'pricing.hourlyCard.badge',
      badgeFallback: 'Standalone escort',
      badgeVariant: 'hourly',
      nameKey: 'pricing.hourlyCard.name',
      nameFallback: 'On-site Hospital Escort',
      subtitleKey: 'pricing.hourlyCard.subtitle',
      subtitleFallback: 'For patients who already booked their own doctor.',
      scopeKey: 'pricing.hourlyCard.scope',
      scopeFallback: 'Hospital accompaniment only — booked and paid per hour.',
      scopeVariant: 'hourly',
      itemsKey: 'pricing.hourlyCard.items',
      itemsFallback: hourlyItemsFallback,
      itemsLabelKey: 'pricing.hourlyCard.itemsLabel',
      itemsCountLabelFallback: "What's included — 4 services",
      footnoteKey: 'pricing.hourlyCard.footnote',
      footnoteFallback:
        'Interpretation in languages other than English requires an interpreter at additional cost.',
      calloutKey: 'pricing.hourlyCard.callout',
      calloutFallback:
        "Scope boundary. Hourly escort is on-site companion and English interpretation service only. The escort is not necessarily a licensed nurse. It does not include appointment scheduling, doctor matching, airport pickup, report translation, visa support, pre-authorization, languages other than English, or post-care follow-up — these are covered by concierge packages.",
      calloutVariant: 'warning',
      ctaKey: 'pricing.hourlyCard.cta',
      ctaFallback: 'Book hourly escort on WhatsApp →',
      ctaVariant: 'gray',
      ctaMsg: "Hi Sara, I'd like to book an on-site hospital escort at $50/hour (min. 2 hours).",
    },
    {
      kind: 'checkup',
      priceLabel: '$500',
      unitKey: 'pricing.packages.0.unit',
      unitFallback: 'per person · 1 day (daytime)',
      nameKey: 'pricing.packages.0.name',
      nameFallback: 'Health Checkup Concierge',
      subtitleKey: 'pricing.checkupCard.subtitle',
      subtitleFallback: 'Dedicated trilingual nurse for a single day.',
      scopeKey: 'pricing.packages.0.description',
      scopeFallback: 'For 1-day health checkup programs only.',
      scopeVariant: 'hard',
      itemsKey: 'pricing.packages.0.allItems',
      itemsFallback: checkupItemsFallback,
      itemsLabelKey: 'pricing.packages.0.itemsLabel',
      itemsCountLabelFallback: "What's included — 13 services",
      footnoteKey: 'pricing.paidFootnote',
      footnoteFallback:
        'Airport pickup & drop-off uses a standard sedan; special vehicles (wheelchair-accessible van, 7-seater, etc.) can be arranged at extra cost.',
      ctaFallback: ctaTextPaid,
      ctaVariant: 'primary',
      ctaMsg: "Hi Sara, I'm interested in the Health Checkup Concierge ($500 / 1-day package). Can you share more details?",
    },
    {
      kind: 'essential',
      priceLabel: '$1,000',
      unitKey: 'pricing.packages.1.unit',
      unitFallback: 'per person · 3 days (daytime)',
      nameKey: 'pricing.packages.1.name',
      nameFallback: 'Essential Care Concierge',
      subtitleKey: 'pricing.essentialCard.subtitle',
      subtitleFallback: 'Dedicated trilingual nurse for multi-day medical visits.',
      scopeKey: 'pricing.packages.1.description',
      scopeFallback: 'Required for all specialist consultations and medical conditions.',
      scopeVariant: 'hard',
      itemsKey: 'pricing.packages.1.allItems',
      itemsFallback: essentialItemsFallback,
      itemsLabelKey: 'pricing.packages.1.itemsLabel',
      itemsCountLabelFallback: "What's included — 13 services",
      footnoteKey: 'pricing.paidFootnote',
      footnoteFallback:
        'Airport pickup & drop-off uses a standard sedan; special vehicles (wheelchair-accessible van, 7-seater, etc.) can be arranged at extra cost.',
      socialProofKey: 'pricing.essentialSocialProof',
      socialProofFallback: '✓ Most commonly chosen package for medical visits',
      ctaFallback: ctaTextPaid,
      ctaVariant: 'primary',
      ctaMsg: "Hi Sara, I'm interested in the Essential Care Concierge ($1,000 / 3-day package). Can you share more details?",
    },
    {
      kind: 'surgery',
      priceLabel: '$1,650',
      unitKey: 'pricing.packages.2.unit',
      unitFallback: 'per person · 5 days (daytime)',
      nameKey: 'pricing.packages.2.name',
      nameFallback: 'Surgery & Extended Care Concierge',
      subtitleKey: 'pricing.surgeryCard.subtitle',
      subtitleFallback: 'Dedicated trilingual nurse covering the full surgical journey.',
      scopeKey: 'pricing.packages.2.description',
      scopeFallback: 'Required for surgery and inpatient procedures.',
      scopeVariant: 'hard',
      itemsKey: 'pricing.packages.2.allItems',
      itemsFallback: surgeryItemsFallback,
      itemsLabelKey: 'pricing.packages.2.itemsLabel',
      itemsCountLabelFallback: "What's included — 16 services",
      footnoteKey: 'pricing.paidFootnote',
      footnoteFallback:
        'Airport pickup & drop-off uses a standard sedan; special vehicles (wheelchair-accessible van, 7-seater, etc.) can be arranged at extra cost.',
      ctaFallback: ctaTextPaid,
      ctaVariant: 'primary',
      ctaMsg: "Hi Sara, I'm interested in the Surgery & Extended Care Concierge ($1,650 / 5-day package). Can you share more details?",
    },
  ]

  const faqFallback = [
    {
      q: 'Is the initial consultation really free? What does it cover?',
      a: 'Yes — the initial WhatsApp consultation with Sara is completely free with no obligation. On this call we assess your medical needs, recommend suitable hospitals and specialists, give you a realistic budget range for treatment, and explain how insurance works. It\u2019s a decision-stage conversation; on-site services (nurse accompaniment, appointment booking, in-person interpretation) begin when you book an hourly escort or a concierge package.',
    },
    {
      q: 'Can I book just an on-site hospital escort without a full concierge package?',
      a: 'Yes. Our on-site hospital escort is available standalone at $50/hour (minimum 2 hours). This is for patients who have already booked their own doctor appointment and only need an English-speaking companion to help with queues, payment, pharmacy pickup, and basic on-the-spot guidance. The escort is not necessarily a licensed nurse, and interpretation is English–Chinese only (other languages require an interpreter at additional cost). The hourly escort does not include appointment scheduling, doctor matching, airport pickup, report translation, visa support, or post-visit follow-up — those are covered by our concierge packages.',
    },
    {
      q: 'How much does a medical concierge service cost in Shanghai?',
      a: "Our concierge packages are $500 for a 1-day Health Checkup visit (health checkup programs only), $1,000 for a 3-day Essential Care package (required for all specialist consultations and medical conditions), and $1,650 for a 5-day Surgery & Extended Care package (required for surgery and inpatient procedures). Standalone on-site hospital escort is $50/hour (min. 2 hours). Every concierge package includes a dedicated trilingual nurse and full support. Extra companion hours beyond your package are available at $50/hour as an add-on. Medical fees are paid directly to hospitals — we do not charge hospital commissions.",
    },
    {
      q: "What's included in the $1,000 Essential package?",
      a: 'The 3-day Essential package includes 3 full days (daytime) of on-site trilingual nurse accompaniment, airport pickup & drop-off (standard vehicle — special vehicles such as wheelchair-accessible vans or larger cars can be arranged at extra cost), hotel coordination, bilingual medical interpretation during all appointments, medical report translation & summaries, doctor appointment scheduling, medication pickup coordination, hospital & specialist matching, local transportation & payment assistance, dedicated WhatsApp support throughout your stay, visa invitation letter support, 30-day post-care remote follow-up, and insurance support — 13 services total.',
    },
    {
      q: 'Can I use my international insurance in Shanghai hospitals?',
      a: "Shanghai's major international departments and Grade 3A hospitals accept many international insurance plans including Cigna, AXA, Allianz, MSH, and Bupa. We provide insurance support — including helping you check your policy benefits and obtaining pre-authorization letters. Where direct billing is available, we will coordinate with the hospital on your behalf; where it is not, you pay the hospital directly and claim reimbursement from your insurer with our documentation support.",
    },
    {
      q: 'Does the concierge fee include medical costs?',
      a: "No. ShanghaiMed charges an independent concierge fee for our coordination and accompaniment services. Medical fees — doctor consultations, tests, medication, procedures, and health checkup packages starting from around $700 — are paid directly to the hospital or clinic at local rates. We do not charge commissions from hospitals, and your concierge quote is presented upfront with no hidden fees.",
    },
  ]

  // ---- helpers ----
  const resolveArr = (key: string, fallback: string[]): string[] => {
    const v = tArr(key)
    if (v && v.length >= fallback.length - 2) return v
    return fallback
  }
  const resolveT = (key: string, fallback: string): string => {
    const v = t(key)
    if (!v || v === key) return fallback
    return v
  }

  const cardBorderClass = (c: CardDef) => {
    if (c.kind === 'essential') return 'border-2 border-accent shadow-lg z-10 bg-white'
    if (c.kind === 'free') return 'border border-[#cfeadc] bg-gradient-to-b from-[#f4fbf7] to-white'
    if (c.kind === 'hourly') return 'border border-[#d9dfe2] bg-gradient-to-b from-[#f6f8fa] to-white'
    return 'border border-gray-200 bg-white'
  }

  const scopeColorClass = (variant?: string) => {
    if (variant === 'free') return 'text-accent'
    if (variant === 'hourly') return 'text-gray-500'
    return 'text-amber-700'
  }

  const ctaClass = (variant?: string) => {
    if (variant === 'muted') return 'text-gray-500 hover:text-gray-600'
    if (variant === 'gray') return 'text-gray-700 hover:text-gray-900'
    return 'text-accent hover:text-accent/80'
  }

  return (
    <section id="pricing" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('pricing.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Cards — single column */}
        <div className="flex flex-col gap-5">
          {cards.map((card, idx) => {
            const name = resolveT(card.nameKey, card.nameFallback)
            const subtitle = resolveT(card.subtitleKey, card.subtitleFallback)
            const scope = resolveT(card.scopeKey, card.scopeFallback)
            const items = resolveArr(card.itemsKey, card.itemsFallback)
            const itemsLabel = card.itemsLabelKey ? resolveT(card.itemsLabelKey, card.itemsCountLabelFallback) : card.itemsCountLabelFallback
            const footnote = card.footnoteKey
              ? resolveT(card.footnoteKey, card.footnoteFallback || '')
              : ''
            const callout = card.calloutKey
              ? resolveT(card.calloutKey, card.calloutFallback || '')
              : ''
            const socialProof = card.socialProofKey
              ? resolveT(card.socialProofKey, card.socialProofFallback || '')
              : ''
            const ctaText = (() => {
              if (card.ctaKey) return resolveT(card.ctaKey, card.ctaFallback)
              return card.ctaFallback
            })()
            const ctaHref = card.ctaMsg
              ? `${primaryLink}?text=${encodeURIComponent(card.ctaMsg)}`
              : primaryLink

            return (
              <article
                key={card.kind}
                className={`relative rounded-2xl p-6 md:p-7 shadow-sm transition-all hover:shadow-md ${cardBorderClass(card)}`}
              >
                {/* Badge */}
                {card.badgeFallback && (
                  <div className="absolute -top-3 left-6 md:left-7">
                    <span
                      className={`text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white ${
                        card.badgeVariant === 'free'
                          ? 'bg-gray-500'
                          : card.badgeVariant === 'hourly'
                          ? 'bg-slate-600'
                          : 'bg-accent'
                      }`}
                    >
                      {resolveT(card.badgeKey || '', card.badgeFallback)}
                    </span>
                  </div>
                )}

                {/* Card head */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {name}
                      <span className="block text-[13px] font-normal text-gray-500 mt-1">{subtitle}</span>
                    </h3>
                  </div>
                  <div className="md:text-right flex-shrink-0">
                    <div className="flex items-baseline md:justify-end">
                      <span
                        className={`text-[32px] md:text-3xl font-bold leading-none tracking-tight ${
                          card.kind === 'essential' ? 'text-accent' : 'text-gray-900'
                        }`}
                      >
                        {card.priceLabel}
                      </span>
                      {card.kind !== 'free' && (
                        <span className="text-[15px] text-gray-500 font-medium ml-1">USD</span>
                      )}
                    </div>
                    <div className="text-[13px] text-gray-500 font-medium mt-1">
                      {card.unitKey ? resolveT(card.unitKey, card.unitFallback) : card.unitFallback}
                    </div>
                  </div>
                </div>

                {/* Scope line */}
                <p className={`mt-2 text-sm font-semibold ${scopeColorClass(card.scopeVariant)}`}>
                  {scope}
                </p>

                {/* Social proof */}
                {socialProof && (
                  <p className="mt-1.5 text-[12.5px] text-accent font-semibold">{socialProof}</p>
                )}

                <div className="h-px bg-gray-100 my-4" />

                {/* Service list */}
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                  {itemsLabel}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13.5px] text-gray-700 leading-snug">
                      <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Footnote (dashed) */}
                {footnote && (
                  <div className="mt-3.5 pt-3 border-t border-dashed border-gray-200 text-[12.5px] text-gray-500 leading-relaxed">
                    {footnote}
                  </div>
                )}

                {/* Callout */}
                {callout && (
                  <div
                    className={`mt-3.5 rounded-lg px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      card.calloutVariant === 'free'
                        ? 'bg-[#eaf5ee] border border-[#c6e3d2] text-[#23543d]'
                        : 'bg-amber-50 border border-amber-200 text-amber-900'
                    }`}
                  >
                    <strong>{callout}</strong>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <a
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-sm font-semibold border-b-2 border-transparent pb-0.5 transition-colors ${ctaClass(card.ctaVariant)}`}
                  >
                    {ctaText}
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        {/* Social Proof — no unsubstantiated country count */}
        <div className="text-center mt-10 mb-10">
          <p className="text-sm text-gray-500">
            <Shield className="w-4 h-4 inline mr-1 -mt-0.5 text-accent" />
            {t('pricing.socialProof')}
          </p>
        </div>

        {/* FAQ — GEO core asset */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-5">{t('pricing.faqTitle')}</h3>
          <div className="space-y-2.5">
            {(tArr('pricing.faqItems').length >= 5 ? tArr('pricing.faqItems') : faqFallback).map((item: any, index: number) => {
              const q = typeof item === 'string' ? item : item.q
              const a = typeof item === 'string' ? '' : item.a
              return (
                <details key={index} className="bg-white rounded-xl border border-gray-200 group" open={index === 0}>
                  <summary className="cursor-pointer list-none px-5 py-3.5 flex items-center justify-between font-semibold text-gray-900 text-[15px] hover:text-accent transition-colors">
                    <span>{q}</span>
                    <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                  </summary>
                  <div className="px-5 pb-4 text-[14px] text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {a}
                  </div>
                </details>
              )
            })}
          </div>
        </div>

        {/* Footer fine print */}
        <div className="text-center space-y-1 text-xs text-gray-500">
          <p>
            {t('pricing.extraHoursNote')}
          </p>
          <p>
            {t('pricing.emergencyNote')}{' '}
            <Link href={localePath('/refund-policy')} className="text-accent hover:underline">{t('pricing.refundPolicy')}</Link>
            {' · '}
            <Link href={localePath('/medical-disclaimer')} className="text-accent hover:underline">{t('pricing.medicalDisclaimer')}</Link>
          </p>
          <p>
            {t('pricing.independentDisclaimer')}
          </p>
        </div>
      </div>

      <style jsx global>{`
        details > summary::-webkit-details-marker { display: none; }
        details > summary { list-style: none; }
      `}</style>
    </section>
  )
}

export default Pricing
