import type { Metadata } from 'next'
import LegalContent from '@/components/pages/LegalContent'

export const metadata: Metadata = {
  title: 'Editorial Policy | ShanghaiMed',
  description: 'How ShanghaiMed researches, writes, reviews, and corrects health and medical travel content.',
  alternates: { canonical: 'https://shanghaimedhealth.com/editorial-policy' },
}

export default function EditorialPolicyPage() {
  return <LegalContent docKey="editorial" />
}
