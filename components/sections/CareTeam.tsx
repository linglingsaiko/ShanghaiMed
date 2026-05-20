'use client'

import React from 'react'
import { CheckCircle, Stethoscope, Bed, Languages, Heart } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { nurseServices, nurseCredentials } from '@/lib/constants'

const CareTeam: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Stethoscope,
    Bed,
    Languages,
    Heart,
  }

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Expert Care Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            ISPN-Certified Bilingual Nurses
          </h2>
          <p className="text-gray-600 text-lg">
            Your dedicated healthcare companions throughout every step of your
            medical journey in Shanghai.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Credentials */}
          <div>
            <Card className="p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">
                    ISPN Certified
                  </h3>
                  <p className="text-sm text-gray-500">
                    International Standards of Nursing
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                All nurses in our network hold ISPN (International Professional
                Nursing) certification, ensuring they meet global standards of
                healthcare excellence.
              </p>

              <ul className="space-y-3">
                {nurseCredentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{credential}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '500+', label: 'Active Nurses' },
                { value: '15+', label: 'Languages' },
                { value: '24/7', label: 'Availability' },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Services */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-6">
              Our Nursing Services
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {nurseServices.map((service, index) => {
                const Icon = iconMap[service.icon]
                return (
                  <Card key={index} className="p-6">
                    <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="font-semibold text-primary mb-2">
                      {service.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <Badge variant="success">{service.price}</Badge>
                  </Card>
                )
              })}
            </div>

            {/* CTA Card */}
            <Card className="mt-6 p-6 bg-primary">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">
                    Need Nurse Services?
                  </h4>
                  <p className="text-sm text-gray-300">
                    Add nursing accompaniment to any hospital visit
                  </p>
                </div>
                <a
                  href="/contact"
                  className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-600 transition-colors whitespace-nowrap"
                >
                  Book Now
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareTeam
