'use client'

import React from 'react'
import Link from 'next/link'
import { Check, Shield, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const WHATSAPP_LINK = 'https://wa.me/8613818274110'
const LINE_LINK = 'https://line.me/ti/p/cD_Ed4GHBM'

type CardKind = 'free' | 'hourly' | 'checkup' | 'essential' | 'surgery'

interface CardDef {
  kind: CardKind
  priceLabel: string
  unitKey?: string
  unitFallback?: string
  badgeFallback?: string
  badgeVariant?: 'free' | 'pop'
  badgeKey?: string
  nameKey: string
  nameFallback: string
  subtitleKey: string
  subtitleFallback: string
  scopeKey?: string
  scopeFallback?: string
  itemsKey: string
  itemsFallback: string[]
  itemsCountLabelKey?: string
  itemsCountLabelFallback: string
  twoColItems?: boolean
  calloutKey?: string
  calloutFallback?: string
  calloutVariant?: 'green' | 'amber'
  ctaMsg?: string
  ctaKey?: string
  ctaFallback: string
  ctaVariant?: 'muted' | 'ghost' | 'primary'
  twoRowLayout?: boolean
}

const Pricing: React.FC = () => {
  const { t, tArr, localePath, language } = useLanguage()
  const isJapanese = language === 'ja'
  const primaryLink = isJapanese ? LINE_LINK : WHATSAPP_LINK

  const interpLabel = isJapanese ? '日中医療現場通訳' : 'English–Chinese on-site medical interpretation'

  const freeItemsFallback = [
    'Medical needs assessment',
    'Hospital & specialist recommendations',
    'Treatment cost estimate',
    'Insurance guidance',
  ]
  const hourlyItemsFallback = [
    'On-site escort companion at the hospital',
    `${interpLabel} · other languages extra`,
    'On-the-spot guidance (queue, payment, pharmacy pickup)',
    'Same-day check-in message after visit',
  ]
  const checkupItemsFallback = [
    '1 full-day on-site nurse (daytime)',
    'Hotel coordination assistance',
    'Health screening report translation & explanation',
    'Medication pickup & delivery',
    'Local transportation & payment help',
    'Visa invitation letter support',
    'Insurance support',
    'Airport pickup & drop-off · standard sedan',
    interpLabel,
    'Doctor appointment scheduling',
    'Hospital & specialist matching',
    'Dedicated WhatsApp support',
    '30-day post-checkup remote follow-up',
  ]
  const essentialItemsFallback = [
    '3 days on-site nurse (daytime)',
    'Pre-visit medical records review',
    'Doctor & specialist matching',
    'Hospital appointment scheduling',
    'Airport pickup & drop-off · standard sedan',
    'Hotel & local transport coordination',
    interpLabel,
    'On-site navigation & payment help',
    'Medical report translation',
    'Medication pickup & delivery',
    'Dedicated WhatsApp support throughout',
    'Insurance support · pre-authorization',
    '30-day post-care remote follow-up',
  ]
  const surgeryItemsFallback = [
    '5 days on-site nurse (daytime)',
    'Pre-admission coordination',
    'Surgery-day accompaniment',
    'Inpatient check-ins during stay',
    'Family communication & progress updates',
    'Pre-surgery records review & briefing',
    'Doctor & hospital selection guidance',
    'Airport pickup & drop-off · standard sedan',
    'Hotel & extended-stay support',
    interpLabel,
    'On-site navigation & payment/billing assistance',
    'Surgical report translation',
    'Medication pickup & delivery',
    'Dedicated WhatsApp support',
    'Insurance & surgical deposit coordination',
    '60-day post-care follow-up',
  ]

  const cards: CardDef[] = [
    {
      kind: 'free',
      priceLabel: '$0',
      badgeKey: 'pricing.freeCard.badge',
      badgeFallback: 'Free',
      badgeVariant: 'free',
      nameKey: 'pricing.freeCard.name',
      nameFallback: 'Free Initial Consultation',
      subtitleKey: 'pricing.freeCard.subtitle',
      subtitleFallback: 'Get the information you need before you commit — no obligation, no payment.',
      itemsKey: 'pricing.freeCard.items',
      itemsFallback: freeItemsFallback,
      itemsCountLabelKey: 'pricing.freeCard.itemsLabel',
      itemsCountLabelFallback: 'What you get — 4 services',
      twoColItems: true,
      calloutKey: 'pricing.freeCard.callout',
      calloutFallback: '<strong>Decision-stage call only.</strong> This free call helps you figure out the right hospital, doctor, and budget range. On-site services begin when you book an hourly escort or a concierge package.',
      calloutVariant: 'green',
      ctaKey: 'pricing.freeCard.cta',
      ctaFallback: 'Chat with Sara on WhatsApp',
      ctaVariant: 'muted',
      ctaMsg: "Hi Sara, I'd like a free initial consultation about medical care in Shanghai.",
      twoRowLayout: true,
    },
    {
      kind: 'hourly',
      priceLabel: '$50',
      nameKey: 'pricing.hourlyCard.name',
      nameFallback: 'On-site Hospital Escort',
      subtitleKey: 'pricing.hourlyCard.subtitle',
      subtitleFallback: 'For patients who already booked their own doctor.',
      scopeKey: 'pricing.hourlyCard.scope',
      scopeFallback: 'Booked and paid by the hour, available standalone <em style="font-style:italic;color:#7b8c99">or</em> as an add-on to any package.',
      itemsKey: 'pricing.hourlyCard.items',
      itemsFallback: hourlyItemsFallback,
      itemsCountLabelKey: 'pricing.hourlyCard.itemsLabel',
      itemsCountLabelFallback: "What's included — 4 services",
      calloutKey: 'pricing.hourlyCard.callout',
      calloutFallback: `<strong>Scope boundary:</strong> Hourly escort is on-site companion and ${isJapanese ? 'Japanese–Chinese' : 'English–Chinese'} interpretation only. It does <strong>not</strong> include appointment scheduling, doctor matching, airport pickup, report translation, visa support, insurance pre-authorization, interpretation in languages other than ${isJapanese ? 'Japanese' : 'English'}, or post-care follow-up.`,
      calloutVariant: 'amber',
      ctaKey: 'pricing.hourlyCard.cta',
      ctaFallback: 'Book hourly escort',
      ctaVariant: 'ghost',
      ctaMsg: "Hi Sara, I'd like to book an on-site hospital escort at $50/hour.",
    },
    {
      kind: 'checkup',
      priceLabel: '$500',
      unitKey: 'pricing.packages.0.unit',
      unitFallback: 'per person · 1 day (daytime)',
      nameKey: 'pricing.packages.0.name',
      nameFallback: 'Health Checkup Concierge',
      subtitleKey: 'pricing.checkupCard.subtitle',
      subtitleFallback: 'Dedicated nurse for a single day.',
      scopeKey: 'pricing.packages.0.description',
      scopeFallback: 'For 1-day health checkup programs only.',
      itemsKey: 'pricing.packages.0.allItems',
      itemsFallback: checkupItemsFallback,
      itemsCountLabelKey: 'pricing.packages.0.itemsLabel',
      itemsCountLabelFallback: "What's included — 13 services",
      ctaFallback: isJapanese ? 'LINEでこのプランについて相談' : 'Ask about this package',
      ctaVariant: 'ghost',
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
      subtitleFallback: 'Complete coordination across appointments, interpretation, insurance, and logistics.',
      scopeKey: 'pricing.packages.1.description',
      scopeFallback: 'Required for all specialist consultations and medical conditions.',
      badgeKey: 'pricing.essentialBadge',
      badgeFallback: 'Most Commonly Chosen',
      badgeVariant: 'pop',
      itemsKey: 'pricing.packages.1.allItems',
      itemsFallback: essentialItemsFallback,
      itemsCountLabelKey: 'pricing.packages.1.itemsLabel',
      itemsCountLabelFallback: "What's included — 13 services",
      ctaFallback: isJapanese ? 'LINEでこのプランについて相談' : 'Ask about this package',
      ctaVariant: 'primary',
      ctaMsg: "Hi Sara, I'm interested in the Essential Care Concierge ($1,000 / 3-day package). Can you share more details?",
    },
    {
      kind: 'surgery',
      priceLabel: '$1,650',
      unitKey: 'pricing.packages.2.unit',
      unitFallback: 'per person · 5 days (daytime)',
      nameKey: 'pricing.packages.2.name',
      nameFallback: 'Surgery & Extended Care',
      subtitleKey: 'pricing.surgeryCard.subtitle',
      subtitleFallback: 'Coordinated support through surgery and inpatient stay.',
      scopeKey: 'pricing.packages.2.description',
      scopeFallback: 'Required for surgery and inpatient procedures.',
      itemsKey: 'pricing.packages.2.allItems',
      itemsFallback: surgeryItemsFallback,
      itemsCountLabelKey: 'pricing.packages.2.itemsLabel',
      itemsCountLabelFallback: "What's included — 16 services",
      ctaFallback: isJapanese ? 'LINEでこのプランについて相談' : 'Ask about this package',
      ctaVariant: 'ghost',
      ctaMsg: "Hi Sara, I'm interested in the Surgery & Extended Care package ($1,650 / 5-day). Can you share more details?",
    },
  ]

  const resolveArr = (key: string, fallback: string[]): string[] => {
    const v = tArr(key)
    if (v && v.length >= fallback.length - 3) return v
    return fallback
  }
  const resolveT = (key: string | undefined, fallback: string): string => {
    if (!key) return fallback
    const v = t(key)
    if (!v || v === key) return fallback
    return v
  }
  const resolveHtml = (key: string | undefined, fallback: string): React.ReactNode => {
    const raw = resolveT(key, fallback)
    // dangerouslySetInnerHTML is used because fallbacks and translations contain <strong> and <em>
    return <span dangerouslySetInnerHTML={{ __html: raw }} />
  }

  const cardClasses = (c: CardDef) => {
    const base = 'relative rounded-[20px] bg-white border shadow-sm transition-all duration-200 flex flex-col hover:-translate-y-1'
    if (c.kind === 'free') {
      return `${base} p-7 md:p-9 border-[#cfeadc] bg-gradient-to-b from-[#f2fbf6] to-white pt-9 hover:shadow-md`
    }
    if (c.kind === 'hourly') {
      return `${base} p-7 md:p-8 border-[#d4dde3] bg-gradient-to-b from-[#f7f9fb] to-white pt-9 hover:shadow-md`
    }
    if (c.kind === 'essential') {
      return `${base} p-8 md:p-9 border-2 border-accent pt-11 z-10 shadow-[0_8px_16px_rgba(0,179,126,0.10),0_24px_48px_rgba(0,179,126,0.14)] -translate-y-1 md:-translate-y-2 hover:-translate-y-2 md:hover:-translate-y-3 hover:shadow-[0_12px_24px_rgba(0,179,126,0.14),0_32px_64px_rgba(0,179,126,0.18)] bg-gradient-to-b from-[#f0faf5] to-white`
    }
    return `${base} p-7 md:p-8 border-[#e6ecf1] pt-9 hover:shadow-md`
  }

  const scopeColorClass = (c: CardDef) => {
    if (c.kind === 'free') return 'text-accent'
    if (c.kind === 'hourly') return 'text-[#486373]'
    return 'text-accent-dark'
  }

  const ctaClasses = (variant?: string) => {
    if (variant === 'muted') {
      return 'text-[#7b8c99] border-[#e6ecf1] hover:text-[#3e5668] hover:border-[#b8c5cf] bg-transparent border'
    }
    if (variant === 'primary') {
      return 'bg-accent text-white shadow-[0_2px_8px_rgba(0,179,126,0.25)] hover:bg-[#008a61] hover:shadow-[0_4px_12px_rgba(0,179,126,0.3)]'
    }
    return 'bg-transparent text-accent border-2 border-accent hover:bg-[#e6f7f0]'
  }

  const badgeClasses = (variant?: string) => {
    if (variant === 'free') return 'bg-accent text-white'
    if (variant === 'pop') return 'bg-gradient-to-r from-accent to-[#00c98d] text-white shadow-sm'
    return 'bg-[#e8eff3] text-[#486373]'
  }

  return (
    <section id="pricing" className="py-16 md:py-24" style={{ background: '#f6f8fb' }}>
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-[#007d5a] bg-[#e6f7f0] px-3 py-1.5 rounded-full mb-3">
            {t('pricing.eyebrow')}
          </span>
          <h2 className="text-[clamp(32px,4.5vw,48px)] font-extrabold tracking-tight text-[#0d1f2d] leading-tight mb-3">
            {t('pricing.title')}
          </h2>
          <p className="text-[17px] text-[#3e5668] max-w-xl mx-auto leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Row 1: Free */}
        {(() => {
          const free = cards.find(c => c.kind === 'free')!
          const name = resolveT(free.nameKey, free.nameFallback)
          const subtitle = resolveT(free.subtitleKey, free.subtitleFallback)
          const items = resolveArr(free.itemsKey, free.itemsFallback)
          const itemsLabel = resolveT(free.itemsCountLabelKey, free.itemsCountLabelFallback)
          const callout = resolveT(free.calloutKey, free.calloutFallback || '')
          const ctaText = resolveT(free.ctaKey, free.ctaFallback)
          const ctaHref = free.ctaMsg ? `${primaryLink}?text=${encodeURIComponent(free.ctaMsg)}` : primaryLink
          return (
            <div className="max-w-[760px] mx-auto mb-5">
              <article className={cardClasses(free)}>
                {free.badgeFallback && (
                  <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full whitespace-nowrap ${badgeClasses(free.badgeVariant)}`}>
                    {resolveT(free.badgeKey, free.badgeFallback)}
                  </span>
                )}
                <div className="grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-9 items-center">
                  <div>
                    <div className="mb-1.5">
                      <span className="text-[56px] font-extrabold leading-none tracking-tight text-[#007d5a] tabular-nums">{free.priceLabel}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0d1f2d] leading-tight mt-2">{name}</h3>
                    <p className="text-[14px] text-[#7b8c99] leading-snug mt-1">{subtitle}</p>
                    <a
                      href={ctaHref} target="_blank" rel="noopener noreferrer"
                      className={`mt-4 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${ctaClasses(free.ctaVariant)}`}
                    >
                      {ctaText}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#7b8c99] mb-2.5">
                      {itemsLabel}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                      {items.map((item, i) => (
                        <li key={i} className="relative pl-6 py-1 text-[13.5px] text-[#3e5668] leading-snug">
                          <span className="absolute left-0 top-[7px] w-4 h-4 rounded-full bg-[#e6f7f0] text-[#007d5a] text-[11px] font-bold flex items-center justify-center">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3.5 rounded-xl px-3.5 py-3 text-[12.5px] leading-relaxed bg-[#e6f7f0] text-[#1f5f47] border-l-[3px] border-l-accent">
                      <span dangerouslySetInnerHTML={{ __html: callout }} />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )
        })()}

        {/* Rows 2 & 3: 2-col grids */}
        {[
          cards.filter(c => c.kind === 'hourly' || c.kind === 'checkup'),
          cards.filter(c => c.kind === 'essential' || c.kind === 'surgery'),
        ].map((row, rIdx) => (
          <div key={rIdx} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 items-stretch">
            {row.map(card => {
              const name = resolveT(card.nameKey, card.nameFallback)
              const subtitle = resolveT(card.subtitleKey, card.subtitleFallback)
              const scope = card.scopeKey ? resolveT(card.scopeKey, card.scopeFallback || '') : ''
              const items = resolveArr(card.itemsKey, card.itemsFallback)
              const itemsLabel = resolveT(card.itemsCountLabelKey, card.itemsCountLabelFallback)
              const callout = card.calloutKey ? resolveT(card.calloutKey, card.calloutFallback || '') : ''
              const ctaText = card.ctaKey ? resolveT(card.ctaKey, card.ctaFallback) : card.ctaFallback
              const ctaHref = card.ctaMsg
                ? `${primaryLink}?text=${encodeURIComponent(card.ctaMsg)}`
                : primaryLink
              const isPriceLarge = card.kind === 'essential'
              return (
                <article key={card.kind} className={cardClasses(card)}>
                  {card.badgeFallback && (
                    <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full whitespace-nowrap ${badgeClasses(card.badgeVariant)}`}>
                      {resolveT(card.badgeKey, card.badgeFallback)}
                    </span>
                  )}
                  <div className="mb-4">
                    <h3 className="text-[17px] font-bold text-[#0d1f2d] leading-tight tracking-tight">{name}</h3>
                    <p className="text-[13px] text-[#7b8c99] leading-snug mt-0.5">{subtitle}</p>
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-3 mb-1">
                    <span className={`font-extrabold leading-none tracking-tight text-[#0d1f2d] tabular-nums ${isPriceLarge ? 'text-[52px]' : 'text-[44px]'}`}>
                      {card.priceLabel}
                    </span>
                    <span className="text-[16px] font-medium text-[#7b8c99]">USD</span>
                  </div>
                  {card.unitKey || card.kind !== 'free' ? (
                    <p className="text-[13px] text-[#7b8c99] font-medium mt-[-2px] mb-2">
                      {card.unitKey ? resolveT(card.unitKey, card.unitFallback || '') : (card.unitFallback || '')}
                    </p>
                  ) : null}
                  {scope && (
                    <p className={`text-[13px] font-semibold mb-3.5 pt-2 ${scopeColorClass(card)}`}>
                      {card.scopeKey && card.scopeKey.startsWith('pricing.hourlyCard.scope')
                        ? <span dangerouslySetInnerHTML={{ __html: scope }} />
                        : scope}
                    </p>
                  )}
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#7b8c99] mb-2.5 mt-2">
                    {itemsLabel}
                  </p>
                  <ul className="flex-1">
                    {items.map((item, i) => {
                      const hasEm = item.includes(' · ')
                      const [main, em] = hasEm ? item.split(' · ', 2) : [item, '']
                      return (
                        <li key={i} className="relative pl-6 py-1 text-[13.5px] text-[#3e5668] leading-snug">
                          <span className="absolute left-0 top-[7px] w-4 h-4 rounded-full bg-[#e6f7f0] text-[#007d5a] text-[11px] font-bold flex items-center justify-center">✓</span>
                          {main}
                          {em && <em className="not-italic text-[#7b8c99] text-[12.5px]"> · {em}</em>}
                        </li>
                      )
                    })}
                  </ul>
                  {callout && (
                    <div className={`mt-4 rounded-xl px-3.5 py-3 text-[12.5px] leading-relaxed ${
                      card.calloutVariant === 'green'
                        ? 'bg-[#e6f7f0] text-[#1f5f47] border-l-[3px] border-l-accent'
                        : 'bg-[#fdf3e4] text-[#7a4d12] border-l-[3px] border-l-[#b8741e]'
                    }`}>
                      <span dangerouslySetInnerHTML={{ __html: callout }} />
                    </div>
                  )}
                  <a
                    href={ctaHref} target="_blank" rel="noopener noreferrer"
                    className={`mt-5 inline-flex w-full items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${ctaClasses(card.ctaVariant)}`}
                  >
                    {ctaText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </article>
              )
            })}
          </div>
        ))}

        {/* Integrated Pricing FAQ — 9 questions */}
        <div className="mt-12">
          <h2 className="text-[22px] font-bold text-center text-[#0d1f2d] tracking-tight mb-1.5">
            {t('pricing.faqTitle')}
          </h2>
          <p className="text-center text-[#7b8c99] text-sm mb-5">
            {t('pricing.faqSub')}
          </p>
          {(() => {
            const items = tArr('pricing.faqItems') as any[]
            // Safety: ensure fallback
            const hasItems = Array.isArray(items) && items.length >= 9 && items.every((it: any) => it && it.q && it.a)
            const faq: { q: string; a: string }[] = hasItems
              ? items
              : [
                  { q: 'Is the free consultation really free?', a: 'Yes. Your initial consultation via WhatsApp is completely <strong>free with no obligation</strong>. We assess your medical needs, recommend hospitals and specialists, provide a cost estimate, and explain insurance options — all before you pay anything. On-site services begin only when you book an hourly escort or a concierge package.' },
                  { q: 'Can I book hourly escort without buying a package?', a: `Yes. The <strong>$50/hour on-site escort</strong> is designed as a standalone service for patients who have already booked their own doctor and only need in-hospital companion support. It is also available as an add-on to extend companion hours beyond the days included in a concierge package. Note: hourly escort covers on-site presence and ${isJapanese ? 'Japanese–Chinese' : 'English–Chinese'} interpretation only — scheduling, doctor matching, airport transfer, and insurance coordination require a concierge package. As an add-on to concierge packages, extra companion hours beyond included days are also billed at $50/hour.` },
                  { q: 'What does the $1,000 Essential package include?', a: `The <strong>Essential Care Concierge covers 3 full daytime companion days</strong>: pre-visit medical records review, doctor matching, multi-appointment scheduling, ${isJapanese ? 'Japanese–Chinese' : 'English–Chinese'} on-site interpretation at every visit, hospital navigation, airport pickup &amp; drop-off in a standard sedan (special vehicles cost extra), medical report translation, medication pickup &amp; delivery, dedicated WhatsApp support throughout your stay, insurance support including policy benefit checks and pre-authorization letters, and 30-day post-care follow-up. This package is required for all specialist consultations and any medical condition.` },
                  { q: 'Do you handle health insurance?', a: 'We provide <strong>insurance support</strong>, including checking your policy benefits, helping you obtain pre-authorization letters, and coordinating hospital paperwork. Where your insurer has a direct-billing arrangement with the hospital, we help coordinate the process. Where direct billing is not available, you pay the hospital directly and we provide the documentation your insurer needs for reimbursement. We do not guarantee coverage or direct-billing approval — decisions are made by your insurer.' },
                  { q: 'Are medical fees included in concierge pricing?', a: 'No. The concierge fee is for our coordination and companion services only. <strong>Medical fees (doctor consultations, hospital charges, lab tests, medications, surgery) are paid directly to the hospital at local rates</strong>. We provide you with a clear cost estimate before you arrive, and you will know the hospital\'s published prices before each procedure. We do not charge hospital commissions.' },
                  { q: 'Do you support emergency or after-hours situations?', a: 'In a medical emergency, <strong>call 120 immediately</strong> and go to the nearest hospital — concierge packages do not include emergency medical services. Once you are at the hospital, we offer <strong>24/7 emergency on-site coordination</strong> at an additional fee: <strong>$300 emergency call-out (available 24/7, includes the first 4 hours)</strong>, then <strong>$100/hour</strong> for additional on-site companion support. This covers urgent dispatch, senior nurse coordination, family communication, and hospital navigation during the emergency. Contact Sara on WhatsApp as soon as possible after calling 120.' },
                  { q: 'What languages are included? Do you support languages other than English and Chinese?', a: `All concierge packages include <strong>${isJapanese ? 'Japanese–Chinese' : 'English–Chinese'} on-site medical interpretation</strong>. ${isJapanese ? '' : 'Japanese–Chinese interpretation is included for Japanese-speaking clients booking via the Japanese page.'} If you need support in <strong>any other language</strong> (Arabic, Russian, Mongolian, Korean, French, Spanish, etc.), a dedicated interpreter can be arranged at an additional cost — rates are based on local Shanghai market pricing for that language. Please mention your language needs when you chat with Sara so we can give you an accurate quote.` },
                  { q: 'What is your refund and cancellation policy?', a: 'Cancellations made <strong>14 or more days</strong> before your scheduled arrival receive a full refund minus a small processing fee. Cancellations within <strong>14 days</strong> are eligible for a partial refund, as some hospital and logistics arrangements may already have been made. Same-day cancellations and no-shows are non-refundable. Cases involving genuine medical emergencies or visa denials with documentation are reviewed individually — we do our best to be fair. Specific refund terms will be included in your booking confirmation.' },
                  { q: 'Can I bring family members or my own interpreter?', a: '<strong>Yes — bringing family members or your own interpreter is welcome at no extra charge.</strong> Our nurse-escort focuses on medical coordination, hospital navigation, and interpretation regardless of party size. If you are traveling with a larger group and need a larger vehicle (e.g., a van instead of a standard sedan for airport pickup), an upgrade fee may apply based on vehicle type and availability. Let Sara know your group size when booking so we can arrange the right transport.' },
                ]
            return (
              <div className="space-y-2.5">
                {faq.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-white border border-[#e6ecf1] rounded-xl overflow-hidden transition-colors hover:border-[#cdd7de] [&[open]]:border-accent [&[open]]:shadow-[0_2px_8px_rgba(0,179,126,0.12)]"
                    open={i === 0}
                  >
                    <summary className="list-none cursor-pointer px-4 py-3.5 flex items-center gap-2.5 font-semibold text-[14.5px] text-[#0d1f2d] marker:content-none">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e6f7f0] text-[#007d5a] flex items-center justify-center text-[13px] font-bold">
                        {i + 1}
                      </span>
                      <span className="flex-1" dangerouslySetInnerHTML={{ __html: item.q }} />
                      <span className="ml-auto text-[20px] font-light text-[#7b8c99] transition-transform group-open:rotate-45 group-open:text-[#007d5a] flex-shrink-0">+</span>
                    </summary>
                    <div className="px-[52px] pb-4 text-[13.5px] text-[#3e5668] leading-relaxed">
                      <span dangerouslySetInnerHTML={{ __html: item.a }} />
                    </div>
                  </details>
                ))}
              </div>
            )
          })()}
        </div>

        {/* Footer fine print */}
        <div className="mt-7 text-center space-y-1.5 text-[12.5px] text-[#7b8c99] leading-relaxed max-w-[760px] mx-auto">
          <p className="flex items-center justify-center gap-1.5">
            <Link href={localePath('/refund-policy')} className="text-[#007d5a] hover:underline">
              {t('pricing.refundPolicy')}
            </Link>
            <span className="mx-1">·</span>
            <Link href={localePath('/medical-disclaimer')} className="text-[#007d5a] hover:underline">
              {t('pricing.medicalDisclaimer')}
            </Link>
          </p>
          <p>{t('pricing.independentDisclaimer')}</p>
        </div>
      </div>
    </section>
  )
}

export default Pricing
