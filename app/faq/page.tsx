import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description:
    'Find answers to common questions about medical tourism in Shanghai. Learn about visa requirements, insurance coverage, costs, and what to expect during your medical journey.',
}

export default function FAQPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Everything you need to know about receiving medical care in Shanghai.
        </p>
      </div>
    </div>
  )
}
