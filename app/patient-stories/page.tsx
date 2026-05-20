import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Patient Stories - Real Experiences',
  description:
    'Read real stories from international patients who received world-class medical treatment in Shanghai. Learn about their journeys and the exceptional care they received.',
}

export default function PatientStoriesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Patient Stories
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Real experiences from patients who trusted us with their health.
        </p>
      </div>
    </div>
  )
}
