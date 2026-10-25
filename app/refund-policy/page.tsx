import type { Metadata } from 'next'
import LegalContent from '@/components/pages/LegalContent'

export const metadata: Metadata = {
  title: 'Refund Policy | ShanghaiMed',
  description: 'ShanghaiMed refund policy: transparent booking deposits, fair refund principles, individual service agreements, and clear processes for cancellations, visa denials, and force majeure situations.',
  alternates: { canonical: 'https://shanghaimedhealth.com/refund-policy' },
}

export default function RefundPolicyPage() {
  return <LegalContent docKey="refund" />
}
