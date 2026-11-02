import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

const pageUrl = 'https://shanghaimedhealth.com/our-standards'
const pageTitle = 'Our Service Standards & Your Protections'
const pageDescription = 'ShanghaiMed service standards: hospital coordination, transparent fees and refunds, record privacy, family consent, and 30- or 60-day follow-up.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
    languages: {
      en: pageUrl,
      'x-default': pageUrl,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: pageUrl,
    siteName: 'ShanghaiMed',
    title: `${pageTitle} | ShanghaiMed`,
    description: pageDescription,
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 2496,
        height: 1664,
        alt: 'ShanghaiMed service standards and patient protections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | ShanghaiMed`,
    description: pageDescription,
    images: ['/assets/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'Do you guarantee a hospital appointment or a specific doctor?',
    answer: 'No. We submit records and coordinate requests, but the hospital decides whether to accept a case and which doctor, schedule, tests and reports apply. We never present a request as a confirmed booking.',
  },
  {
    question: 'Are you a hospital or a medical provider?',
    answer: 'No. ShanghaiMed is a non-clinical coordination service. We do not diagnose, prescribe, provide clinical opinions, adjust medication or sign medical consent. Hospitals and doctors make all clinical decisions.',
  },
  {
    question: 'How do refunds work?',
    answer: 'Once a refund is approved, we process it within 5 business days. The amount follows your service agreement, less completed work and authorized non-refundable third-party costs. Banks and platforms control when funds arrive.',
  },
  {
    question: 'Who can see my medical records?',
    answer: 'Only the recipients needed for your agreed service and described to you in advance. We collect and share only what is necessary. We never use your identity, photos, records or story for marketing without separate, specific consent.',
  },
  {
    question: 'Can a family member manage everything for me?',
    answer: 'A relative or representative can handle logistics and communication. Each adult patient must still authorize the processing and sharing of their own information, unless a legally authorized representative is acting for them. A parent or legal guardian consents for a minor. Hospital medical consent is separate.',
  },
  {
    question: 'What happens after my visit?',
    answer: 'Health Checkup and Essential Care include 30 calendar days of follow-up; Surgery & Extended Care includes 60 calendar days. Support covers agreed records, translations and administrative coordination—not remote diagnosis, medical monitoring or a 24-hour emergency line.',
  },
  {
    question: 'Do you provide emergency or 24-hour medical response?',
    answer: 'No. Call 120 in Shanghai for a life-threatening emergency. Our separately priced 24/7 on-site coordination service helps with urgent logistics; it is not an ambulance or emergency medical service.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: `${pageTitle} | ShanghaiMed`,
      description: pageDescription,
      inLanguage: 'en',
      dateModified: '2026-11-02',
      about: {
        '@type': 'Organization',
        name: 'ShanghaiMed',
        url: 'https://shanghaimedhealth.com',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
}

function Section({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-gray-200 py-10 first:border-t-0 first:pt-0 sm:py-12">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">{number}</span>
        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function PromiseList({ items, positive = true }: { items: string[]; positive?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map(item => (
        <li key={item} className="flex gap-3 leading-7 text-gray-700">
          <span aria-hidden="true" className={`mt-1 font-bold ${positive ? 'text-accent' : 'text-red-600'}`}>{positive ? '✓' : '×'}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function OurStandardsPage() {
  return (
    <article className="bg-white">
      <header className="bg-gradient-to-br from-primary via-[#123b5a] to-[#075e61] pb-16 pt-28 text-white sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">ShanghaiMed · Service Standards</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Our Service Standards<br />&amp; Your Protections</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-50">
            Before you trust anyone with a medical trip to China, you deserve to know exactly what they do, what they cannot promise, and how your records, payments and refunds are handled. This page explains our standards plainly.
          </p>
          <div className="mt-8 border-t border-white/20 pt-6 text-sm leading-7 text-blue-50">
            <p className="font-semibold text-white">Sara Ma (Lingling Ma) · Founder &amp; Medical Coordination Lead</p>
            <p>Nurse founder · ISPN-certified · 10+ years in international patient services · English / Chinese / Japanese</p>
            <p className="mt-2 text-xs text-blue-100">Last updated: 2 November 2026</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <Section number="1" title="What we do — and what we don’t">
          <p className="mb-6 leading-7 text-gray-600">ShanghaiMed is a <strong className="text-primary">non-clinical coordination service</strong>, not a hospital or clinic.</p>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
              <h3 className="mb-4 font-bold text-primary">We help you with</h3>
              <PromiseList items={[
                'Organizing and translating your medical records',
                'Identifying suitable hospitals and departments to approach',
                'Coordinating appointment requests and schedules',
                'On-site accompaniment and interpretation at visits',
                'Administrative support before, during and after your trip',
              ]} />
            </div>
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6">
              <h3 className="mb-4 font-bold text-primary">We do not</h3>
              <PromiseList positive={false} items={[
                'Diagnose, prescribe or give clinical opinions on your results',
                'Adjust medication or sign medical consent for you',
                'Sell appointment slots or promise a specific doctor',
                'Guarantee treatment outcomes, visas or insurance payouts',
                'Act as an ambulance or emergency medical service',
              ]} />
            </div>
          </div>
          <p className="mt-6 leading-7 text-gray-700">Hospitals and doctors decide whether to accept your case and make every clinical decision. You—or your legal representative—make your own medical decisions. We remain responsible for our coordination, communication, translation, fees and confidentiality.</p>
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
            <strong>Emergency boundary:</strong> For severe or rapidly worsening symptoms, call local emergency services or go to the nearest appropriate hospital first. In Shanghai, call <strong>120</strong>. Our separately priced 24/7 on-site coordination service helps with urgent logistics; it is not emergency medical care.
          </div>
        </Section>

        <Section number="2" title="How hospital coordination really works">
          <p className="mb-6 leading-7 text-gray-600">We never present a request as a confirmed booking. You always know the real status. New to ShanghaiMed? Start with <Link href="/how-it-works" className="font-semibold text-primary underline decoration-accent/60 underline-offset-4 hover:text-accent">How It Works</Link>.</p>
          <ol className="space-y-4">
            {[
              ['Proposed', 'Based on your needs and verifiable public information, we suggest hospitals and departments to approach.'],
              ['Records submitted', 'Your records have been sent through a known channel. This does not mean the hospital has accepted you.'],
              ['Hospital assessing', 'The hospital has agreed to review your case. This is not yet a confirmed appointment or treatment plan.'],
              ['Appointment confirmed', 'Only when the hospital confirms a specific arrangement do we call it confirmed. Doctors, tests and report timing still follow hospital scheduling.'],
            ].map(([title, description], index) => (
              <li key={title} className="flex gap-4 rounded-xl border border-gray-200 p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{index + 1}</span>
                <p className="leading-7 text-gray-700"><strong className="text-primary">{title}.</strong> {description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 rounded-xl bg-gray-50 p-5 text-sm leading-7 text-gray-700">If an arrangement cannot be confirmed, we explain the real options: another request, a schedule change, or cancellation and settlement under your agreement. We do not call an alternative doctor or hospital “clinically equivalent” without an appropriate clinical basis.</p>
        </Section>

        <Section number="3" title="Transparent pricing and refunds">
          <PromiseList items={[
            'Hospital fees, our coordination fee and third-party costs are listed separately. Hospital medical fees are paid directly to the provider.',
            'Before payment, you receive the proposed service scope, budget, current booking status, and cancellation and refund terms in your service agreement.',
            'We do not use a blanket “non-refundable” rule. Cancellation settlement reflects completed work and authorized, documented, non-refundable third-party costs.',
            'Once a refund is approved, we process it within 5 business days. Banks and payment platforms control when the funds reach your account.',
            'Specific refundable and non-refundable items are governed by your signed agreement and disclosed before payment.',
          ]} />
          <p className="mt-6 text-sm leading-7 text-gray-600">Read the full <Link href="/refund-policy" className="font-semibold text-primary underline decoration-accent/60 underline-offset-4 hover:text-accent">Refund Policy</Link> and <Link href="/terms-of-service" className="font-semibold text-primary underline decoration-accent/60 underline-offset-4 hover:text-accent">Terms of Service</Link>.</p>
        </Section>

        <Section number="4" title="Your medical records and privacy">
          <PromiseList items={[
            'We collect only what is necessary for your agreed service and share it only with recipients described to you in advance.',
            'Health information is treated as sensitive personal data and processed with explicit consent.',
            'Translations and summaries remain faithful to the source. Uncertain terminology is marked for a doctor to confirm, not rewritten into a diagnosis.',
            'Access, correction, deletion and consent-withdrawal requests are handled under our Privacy Policy and applicable legal retention duties.',
            'Your identity, photos, records or story are never used for marketing without your separate, specific consent. Service authorization is not marketing consent.',
          ]} />
          <p className="mt-6 text-sm leading-7 text-gray-600">See our <Link href="/privacy-policy" className="font-semibold text-primary underline decoration-accent/60 underline-offset-4 hover:text-accent">Privacy Policy</Link> for the full data-handling terms.</p>
        </Section>

        <Section number="5" title="Family coordination with valid consent">
          <div className="space-y-4 leading-7 text-gray-700">
            <p>A family member or representative can help with logistics, scheduling, record submission and communication. This makes coordination easier without removing the patient’s rights.</p>
            <p><strong className="text-primary">Each adult patient must give their own consent</strong> for personal-information processing and medical-record sharing, unless a legally authorized representative is acting for them. A parent or legal guardian provides consent for a minor.</p>
            <p>Our coordination authorization does not replace the hospital’s medical consent process, does not give every relative access to all records, and does not include marketing consent. If authority is disputed or a hospital or law requires more, we confirm it before proceeding.</p>
          </div>
        </Section>

        <Section number="6" title="Post-care support that matches your package">
          <p className="mb-6 leading-7 text-gray-700">Follow-up starts after your last coordinated visit or treatment under the applicable package:</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-primary p-6 text-white">
              <p className="text-3xl font-bold">30 days</p>
              <p className="mt-2 leading-7 text-blue-50">Health Checkup Concierge and Essential Care Concierge</p>
            </div>
            <div className="rounded-2xl bg-[#075e61] p-6 text-white">
              <p className="text-3xl font-bold">60 days</p>
              <p className="mt-2 leading-7 text-blue-50">Surgery &amp; Extended Care Concierge</p>
            </div>
          </div>
          <p className="mt-6 leading-7 text-gray-700">During the included period, we provide the agreed record delivery, translations, follow-up appointment coordination and administrative communication. This is not remote diagnosis, medical monitoring, medication adjustment, a guarantee that your home doctor will take over, or a 24-hour emergency line. Any extension or additional coordination must be agreed separately in writing.</p>
        </Section>

        <section className="border-t border-gray-200 py-10 sm:py-12" id="faq">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">?</span>
            <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">Common questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, index) => (
              <details key={item.question} className="group rounded-xl border border-gray-200 bg-white" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold leading-6 text-primary marker:hidden">
                  <span>{item.question}</span>
                  <span aria-hidden="true" className="text-2xl font-normal text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="px-5 pb-5 leading-7 text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-primary/10 bg-primary/[0.04] p-6 sm:p-8">
          <h2 className="text-xl font-bold text-primary">A note from Sara</h2>
          <p className="mt-3 leading-7 text-gray-700">I started ShanghaiMed so that international patients and their families can navigate care in China with clear information, respectful support and transparent fees. These standards are how we hold ourselves accountable.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="mailto:hello@shanghaimedhealth.com" className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90">Email your question</a>
            <a href="https://wa.me/8613818274110" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-primary/20 bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent">WhatsApp +86 138-1827-4110</a>
          </div>
          <p className="mt-5 text-xs leading-6 text-gray-500">This page describes our service standards. It is not medical advice and does not replace your individual service agreement or the treating hospital’s decisions.</p>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
    </article>
  )
}
