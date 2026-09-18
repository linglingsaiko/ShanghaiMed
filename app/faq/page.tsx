import type { Metadata } from 'next'
import PageHeading from '@/components/PageHeading'
import FaqContent from '@/components/pages/FaqContent'

export const metadata: Metadata = {
  title: 'FAQ - Medical Tourism in Shanghai | ShanghaiMed',
  description:
    'Answers to 10 common questions about medical tourism in Shanghai: costs, hospital safety, English-speaking doctors, visas, insurance, and bilingual support for international patients.',
  keywords: [
    'medical tourism Shanghai FAQ',
    'Shanghai hospitals international patients',
    'China healthcare costs',
    'medical visa China',
    'ShanghaiMed pricing',
  ],
}

export default function FAQPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <PageHeading
          titleKey="pages.faqTitle"
          subtitleKey="pages.faqSubtitle"
          fallbackTitle="Frequently Asked Questions"
          fallbackSubtitle="Everything you need to know about receiving medical care in Shanghai — costs, hospital quality, visas, insurance, and bilingual support."
        />
        <FaqContent />
      </div>
    </div>
  )
}
