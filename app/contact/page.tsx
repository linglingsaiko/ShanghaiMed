import type { Metadata } from 'next'
import PageHeading from '@/components/PageHeading'

export const metadata: Metadata = {
  title: 'Contact Us - Free Initial Online Consultation',
  description:
    'Contact ShanghaiMed to request a free preliminary online coordination consultation via WhatsApp. We help assess your needs, identify suitable hospital options, and explain next steps. This is not a hospital clinical consultation.',
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
