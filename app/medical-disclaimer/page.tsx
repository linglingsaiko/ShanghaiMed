import type { Metadata } from 'next'
import MedicalDisclaimerContent from '@/components/pages/MedicalDisclaimerContent'

export const metadata: Metadata = {
  title: 'Medical Disclaimer | ShanghaiMed',
  description: 'ShanghaiMed is a medical travel coordination service, not a hospital or medical provider. Read our full medical disclaimer.',
  alternates: { canonical: 'https://shanghaimedhealth.com/medical-disclaimer' },
}

export default function MedicalDisclaimerPage() {
  return <MedicalDisclaimerContent />
}
