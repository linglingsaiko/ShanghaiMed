import type { Metadata } from 'next'
import LegalContent from '@/components/pages/LegalContent'

export const metadata: Metadata = {
  title: 'Refund Policy | ShanghaiMed',
  description: 'Refund terms for ShanghaiMed coordination service fees. Hospital and clinical fees are paid directly to the treating hospital under the hospital\u2019s own rules.',
  alternates: { canonical: 'https://shanghaimedhealth.com/refund-policy' },
}

export default function RefundPolicyPage() {
  return <LegalContent docKey="refund" />
}
