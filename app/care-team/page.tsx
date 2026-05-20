import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Care Team - ISPN Certified Bilingual Nurses',
  description:
    'Meet our team of ISPN-certified bilingual nurses providing exceptional care for international patients. Professional nursing services including outpatient accompaniment, inpatient care, and translation support.',
}

export default function CareTeamPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Our Care Team
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          ISPN-certified bilingual nurses dedicated to your health and comfort.
        </p>
      </div>
    </div>
  )
}
