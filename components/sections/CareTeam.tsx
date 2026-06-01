'use client'

import React from 'react'
import { CheckCircle, Stethoscope, Bed, Languages, Heart, Clipboard, Calendar, Map, FileText, Phone } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { nurseServices, nurseCredentials } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'

const CareTeam: React.FC = () => {
  const { t } = useLanguage()
  const iconMap: Record<string, React.ElementType> = {
    Clipboard,
    Calendar,
    Languages,
    Map,
    FileText,
    Phone,
    Stethoscope,
    Bed,
    Heart,
  }

  return (
    <section id="care-team" className="py-20 lg:py-28 bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('careTeam.expertTeam')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            {t('careTeam.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('careTeam.subtitle')}
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
                    {t('careTeam.ispnCertified')}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t('careTeam.ispnDesc')}
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
                    <div>
                      <span className="text-gray-700 font-medium">{credential.name}</span>
                      {credential.detail && (
                        <p className="text-sm text-gray-500">{credential.detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

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
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </Card>
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default CareTeam
