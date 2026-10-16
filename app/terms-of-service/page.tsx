import type { Metadata } from 'next'
import LegalContent from '@/components/pages/LegalContent'

export const metadata: Metadata = {
  title: 'Terms of Service | ShanghaiMed',
  description: 'Terms governing use of the ShanghaiMed website and medical travel coordination services, including important medical disclaimers, payment terms and liability limits.',
  alternates: { canonical: 'https://shanghaimedhealth.com/terms-of-service' },
}

export default function TermsOfServicePage() {
  return <LegalContent docKey="terms" />
}
