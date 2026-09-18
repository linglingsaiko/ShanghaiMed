import type { Metadata } from 'next'
import PageHeading from '@/components/PageHeading'

export const metadata: Metadata = {
  title: 'Contact Us - Get a Free Consultation',
  description:
    'Contact ShanghaiMed for a free medical consultation. Get matched with Shanghai\'s top hospitals and bilingual nurses. WhatsApp, email, or online form available.',
}

export default function ContactPage() {
  return (
    <PageHeading
      titleKey="pages.contactTitle"
      subtitleKey="pages.contactSubtitle"
      fallbackTitle="Contact Us"
      fallbackSubtitle="Get started with your medical journey today. Our team is ready to help 24/7."
    />
  )
}
