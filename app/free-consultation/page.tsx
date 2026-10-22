import type { Metadata } from 'next'
import FreeConsultationContent from '@/components/pages/FreeConsultationContent'

export const metadata: Metadata = {
  title: 'Free Medical Consultation — ShanghaiMed',
  description: 'Book a free, confidential, no-obligation medical consultation with ShanghaiMed. Get matched with top specialists at Shanghai Grade 3A hospitals, receive a personalized treatment plan and transparent cost estimate before you travel.',
  alternates: {
    canonical: 'https://shanghaimedhealth.com/free-consultation',
    languages: {
      en: 'https://shanghaimedhealth.com/free-consultation',
      ja: 'https://shanghaimedhealth.com/ja/free-consultation',
      ar: 'https://shanghaimedhealth.com/ar/free-consultation',
      ru: 'https://shanghaimedhealth.com/ru/free-consultation',
      mn: 'https://shanghaimedhealth.com/mn/free-consultation',
    },
  },
}

export default function FreeConsultationPage() {
  const pageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Medical Consultation',
    description: 'Free, confidential, no-obligation medical consultation. Top specialist matching at Shanghai Grade 3A hospitals.',
    url: 'https://shanghaimedhealth.com/free-consultation',
    isPartOf: {
      '@type': 'MedicalBusiness',
      name: 'ShanghaiMed',
    },
    mainEntity: {
      '@type': 'Service',
      name: 'Free Initial Medical Consultation',
      serviceType: 'Medical consultation and specialist matching',
      provider: { '@type': 'MedicalBusiness', name: 'ShanghaiMed' },
      areaServed: { '@type': 'Place', name: 'Shanghai, China' },
      availableChannel: {
        '@type': 'ServiceChannel',
        availableLanguage: ['English', 'Chinese', 'Japanese', 'Arabic', 'Russian', 'Mongolian'],
        serviceUrl: 'https://wa.me/8613818274110',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <FreeConsultationContent />
    </>
  )
}
