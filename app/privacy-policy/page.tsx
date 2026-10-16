import type { Metadata } from 'next'
import LegalContent from '@/components/pages/LegalContent'

export const metadata: Metadata = {
  title: 'Privacy Policy | ShanghaiMed',
  description: 'How ShanghaiMed collects, uses, discloses and protects the personal and health information of international patients using our medical travel coordination services.',
  alternates: { canonical: 'https://shanghaimedhealth.com/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return <LegalContent docKey="privacy" />
}
