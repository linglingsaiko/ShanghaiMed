import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Get a Free Consultation',
  description:
    'Contact ShanghaiMed for a free medical consultation. Get matched with Shanghai\'s top hospitals and bilingual nurses. WhatsApp, email, or online form available.',
}

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Get started with your medical journey today. Our team is ready to
          help 24/7.
        </p>
      </div>
    </div>
  )
}
