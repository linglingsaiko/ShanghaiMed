import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Shanghai - World-Class Medical Destination',
  description:
    'Discover why Shanghai has become a leading destination for international medical tourism. Learn about 47 international insurance direct-payment hospitals, 13 public Grade-A medical institutions, and affordable world-class healthcare.',
}

export default function WhyShanghaiPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Why Shanghai?
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Shanghai has emerged as a premier destination for international
          patients seeking world-class medical care at accessible prices.
        </p>
      </div>
    </div>
  )
}
