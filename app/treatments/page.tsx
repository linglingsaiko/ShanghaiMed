import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Treatments & Hospitals - Shanghai Medical Network',
  description:
    'Explore our network of Shanghai\'s top hospitals and treatment centers. From Grade-A public hospitals to international private facilities, find the right medical care for your needs.',
}

export default function TreatmentsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Treatments & Hospitals
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Access to Shanghai&apos;s finest medical institutions across all
          specialties.
        </p>
      </div>
    </div>
  )
}
