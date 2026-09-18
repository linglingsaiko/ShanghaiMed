import type { Metadata } from 'next'
import PageHeading from '@/components/PageHeading'

export const metadata: Metadata = {
  title: 'How It Works - Your Medical Journey in Shanghai',
  description:
    'Learn about our streamlined 4-step process for international patients. From initial inquiry to post-treatment care, we guide you through every step of your medical journey in Shanghai.',
}

export default function HowItWorksPage() {
  return (
    <PageHeading
      titleKey="pages.howItWorksTitle"
      subtitleKey="pages.howItWorksSubtitle"
      fallbackTitle="How It Works"
      fallbackSubtitle="Our streamlined process makes it easy to access world-class medical care in Shanghai."
    />
  )
}
