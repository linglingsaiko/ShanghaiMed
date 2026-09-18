import type { Metadata } from 'next'
import PageHeading from '@/components/PageHeading'

export const metadata: Metadata = {
  title: 'Treatments & Hospitals - Shanghai Medical Network',
  description:
    'Explore our network of Shanghai\'s top hospitals and treatment centers. From Grade-A public hospitals to international private facilities, find the right medical care for your needs.',
}

export default function TreatmentsPage() {
  return (
    <PageHeading
      titleKey="pages.treatmentsTitle"
      subtitleKey="pages.treatmentsSubtitle"
      fallbackTitle="Treatments & Hospitals"
      fallbackSubtitle="Access to Shanghai's finest medical institutions across all specialties."
    />
  )
}
