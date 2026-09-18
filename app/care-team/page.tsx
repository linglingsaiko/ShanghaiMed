import type { Metadata } from 'next'
import PageHeading from '@/components/PageHeading'

export const metadata: Metadata = {
  title: 'Care Team - ISPN Certified Bilingual Nurses',
  description:
    'Meet our team of ISPN-certified bilingual nurses providing exceptional care for international patients. Professional nursing services including outpatient accompaniment, inpatient care, and translation support.',
}

export default function CareTeamPage() {
  return (
    <PageHeading
      titleKey="pages.careTeamTitle"
      subtitleKey="pages.careTeamSubtitle"
      fallbackTitle="Our Care Team"
      fallbackSubtitle="ISPN-certified bilingual nurses dedicated to your health and comfort."
    />
  )
}
