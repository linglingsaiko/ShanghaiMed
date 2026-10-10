import type { Metadata } from 'next'
import FounderContent from '@/components/pages/FounderContent'

export const metadata: Metadata = {
  title: 'About the Founder — Sara Ma | ShanghaiMed',
  description: 'Sara Ma, Founder & Medical Director of ShanghaiMed. ISPN-certified registered nurse, senior registered nurse, and 10+ years of premium healthcare operations experience in Shanghai.',
  alternates: { canonical: 'https://shanghaimedhealth.com/founder' },
}

export default function FounderPage() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sara Ma',
    alternateName: '马玲玲',
    jobTitle: 'Founder',
    image: 'https://shanghaimedhealth.com/images/sara-ma-headshot.jpg',
    url: 'https://shanghaimedhealth.com/founder',
    worksFor: {
      '@type': 'MedicalBusiness',
      name: 'ShanghaiMed',
      legalName: 'Shanghai Keling Information Technology Co., Ltd.',
      url: 'https://shanghaimedhealth.com',
    },
    knowsLanguage: ['English', 'Chinese', 'Japanese'],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'ISPN — International Standards for Professional Nurses', credentialCategory: 'Nursing License' },
      { '@type': 'EducationalOccupationalCredential', name: 'Registered Nurse (RN), China', credentialCategory: 'Nursing License' },
      { '@type': 'EducationalOccupationalCredential', name: 'Senior Registered Nurse (主管护师)', credentialCategory: 'Professional Title' },
      { '@type': 'EducationalOccupationalCredential', name: 'JLPT N1', credentialCategory: 'Language Certification' },
    ],
    knowsAbout: [
      'International patient coordination',
      'Medical translation',
      'Healthcare operations management',
      'Medical tourism facilitation',
      'Hospital navigation in China',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <FounderContent />
    </>
  )
}
