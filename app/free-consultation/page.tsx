import type { Metadata } from 'next'
import FreeConsultationContent from '@/components/pages/FreeConsultationContent'

export const metadata: Metadata = {
  title: 'Free Initial Online Consultation — ShanghaiMed',
  description: 'Request a free, confidential, no-obligation preliminary online coordination consultation via WhatsApp. ShanghaiMed helps assess your needs, recommend suitable hospital and specialist options, and provide an estimated budget. This is not a hospital clinical consultation or a personalized treatment plan.',
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
    name: 'Free Initial Online Consultation',
    description: 'Free, confidential, no-obligation preliminary online coordination consultation via WhatsApp, including needs assessment and suitable hospital and specialist recommendations. This is not a hospital clinical consultation.',
    url: 'https://shanghaimedhealth.com/free-consultation',
    isPartOf: {
      '@type': 'MedicalBusiness',
      name: 'ShanghaiMed',
    },
    mainEntity: {
      '@type': 'Service',
      name: 'Free Initial Online Coordination Consultation',
      serviceType: 'Preliminary online coordination consultation and specialist matching',
      provider: { '@type': 'MedicalBusiness', name: 'ShanghaiMed' },
      areaServed: { '@type': 'Place', name: 'Shanghai, China' },
      availableChannel: {
        '@type': 'ServiceChannel',
        availableLanguage: ['English', 'Chinese', 'Japanese', 'Arabic', 'Russian', 'Mongolian'],
        serviceUrl: 'https://wa.me/8613818274110',
        description: 'Provided via WhatsApp; not a hospital clinical video consultation and not a replacement for physician diagnosis.',
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
