'use client'

import React from 'react'
import { CheckCircle, Stethoscope } from 'lucide-react'
import Card from '../ui/Card'
import { nurseServices } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'

const CareTeam: React.FC = () => {
  const { t, tArr } = useLanguage()

  const translatedServices = tArr('careTeam.services')
  const translatedCredentials = tArr('careTeam.credentials')

  // Credentials fallback (hard facts, verifiable)
  const credentialsFallback = [
    { name: 'Licensed Registered Nurses (RN)', detail: 'Verified by Shanghai Health Commission' },
    { name: 'Multilingual Certification', detail: 'Fluent in English and Chinese' },
    { name: 'JLPT N1 Certified', detail: '日本語能力試験 N1 — Japanese-Language Proficiency Test (highest level)' },
    { name: 'Medical Interpretation', detail: 'Clinical terminology, documentation, and on-site interpretation' },
    { name: 'International Patient Care', detail: '10+ years experience at Shanghai\'s top hospitals' },
  ]

  const credentials = translatedCredentials.length === credentialsFallback.length
    ? translatedCredentials
    : credentialsFallback

  return (
    <section id="care-team" className="py-20 lg:py-28 bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('careTeam.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            {t('careTeam.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('careTeam.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left Column — Credentials (2 cols wide) */}
          <div className="lg:col-span-2">
            <Card className="p-8">
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
                  <p className="text-xs text-accent mt-1 font-semibold">
                    {t('careTeam.ispnIssuer')}
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {credentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-800 font-semibold text-sm">{credential.name}</span>
                      {credential.detail && (
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{credential.detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Right Column — Services (3 cols wide) */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary">
                  {t('careTeam.servicesTitle')}
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {nurseServices.map((service, index) => {
                  const translated = translatedServices[index]
                  const title =
                    translatedServices.length === nurseServices.length && translated?.title
                      ? translated.title
                      : service.title
                  const description =
                    translatedServices.length === nurseServices.length && translated?.description
                      ? translated.description
                      : service.description
                  return (
                    <div key={index}>
                      <h4 className="font-semibold text-primary text-sm mb-1">
                        {title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareTeam
