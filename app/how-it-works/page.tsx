import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works - Your Medical Journey in Shanghai',
  description:
    'Learn about our streamlined 4-step process for international patients. From initial inquiry to post-treatment care, we guide you through every step of your medical journey in Shanghai.',
}

export default function HowItWorksPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          How It Works
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Our streamlined process makes it easy to access world-class medical
          care in Shanghai.
        </p>
      </div>
    </div>
  )
}
