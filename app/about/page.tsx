import type { Metadata } from 'next'
import AboutContent from '@/components/pages/AboutContent'

export const metadata: Metadata = {
  title: 'About ShanghaiMed — Independent Medical Coordination in Shanghai',
  description:
    'ShanghaiMed is an independent medical concierge for international patients in Shanghai. Founded by Sara Ma, a registered nurse with 10+ years in premium healthcare operations. No hospital commissions; condition-first recommendations.',
  alternates: { canonical: 'https://shanghaimedhealth.com/about' },
}

export default function AboutPage() {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'ShanghaiMed',
    legalName: 'Shanghai Keling Information Technology Co., Ltd.',
    url: 'https://shanghaimedhealth.com',
    description: 'Independent medical coordination for international patients in Shanghai.',
    founder: {
      '@type': 'Person',
      name: 'Sara Ma',
      alternateName: ['Ma Lingling', 'Lingling Ma', '马玲玲'],
      url: 'https://shanghaimedhealth.com/founder',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <AboutContent />
    </>
  )
}
