import type { Metadata } from 'next'
import PageHeading from '@/components/PageHeading'

export const metadata: Metadata = {
  title: 'Patient Stories - Real Experiences',
  description:
    'Read real stories from international patients who received world-class medical treatment in Shanghai. Learn about their journeys and the exceptional care they received.',
}

export default function PatientStoriesPage() {
  return (
    <PageHeading
      titleKey="pages.patientStoriesTitle"
      subtitleKey="pages.patientStoriesSubtitle"
      fallbackTitle="Patient Stories"
      fallbackSubtitle="Real experiences from patients who trusted us with their health."
    />
  )
}
