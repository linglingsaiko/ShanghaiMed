import React from 'react'
import { ArrowRight, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { allHospitals, featuredHospitalIds } from '@/lib/constants'

const FeaturedHospitals: React.FC = () => {
  const featuredHospitals = featuredHospitalIds
    .map(id => allHospitals.find(h => h.id === id))
    .filter((h): h is NonNullable<typeof h> => h != null)

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Hospital Network
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Trusted Hospitals
          </h2>
          <p className="text-gray-600 text-lg">
            China&apos;s top-ranked public hospitals with dedicated international departments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHospitals.map((hospital) => (
            <article
              key={hospital.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={hospital.image}
                  alt={hospital.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {hospital.name}
                </h3>

                {hospital.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hospital.certifications.slice(0, 2).map((cert, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
                      >
                        <Shield className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  {hospital.specialties.map((specialty, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {specialty}
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {hospital.internationalFeatures}
                </p>

                <p className="text-xs text-gray-500 mb-4">
                  {hospital.insuranceStatus}
                </p>

                <Link
                  href="/why-shanghai"
                  className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedHospitals