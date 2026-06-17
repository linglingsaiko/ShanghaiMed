'use client'

import React, { useState } from 'react'
import { CheckCircle, Shield, Award, X, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import {
  tier1Hospitals,
  tier2Hospitals,
  Hospital,
  featuredHospitalIds,
} from '@/lib/constants'
import { events } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'

const TreatmentAreas: React.FC = () => {
  const { t } = useLanguage()
  const [activeTier, setActiveTier] = useState<'all' | 'tier1' | 'tier2'>('all')
  const [showModal, setShowModal] = useState(false)

  const allHospitals = [...tier1Hospitals, ...tier2Hospitals]
  const featuredHospitals = featuredHospitalIds
    .map(id => allHospitals.find(h => h.id === id))
    .filter((h): h is NonNullable<typeof h> => h != null)

  const hospitals =
    activeTier === 'all'
      ? allHospitals
      : activeTier === 'tier1'
      ? tier1Hospitals
      : tier2Hospitals

  const tierLabels = {
    tier1: t('treatments.publicHospitals'),
    tier2: t('treatments.privateHospitals'),
  }

  const handleHospitalClick = (hospital: Hospital) => {
    events.hospitalView(hospital.name)
  }

  return (
    <section id="treatments" className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('treatments.hospitalNetwork')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            {t('treatments.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            Access leading hospitals across Shanghai,<br />
            with recommendations tailored to your medical needs.
          </p>
        </div>

        {/* Featured Hospitals Grid - Show 3 with photos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredHospitals.map((hospital) => (
            <Card
              key={hospital.id}
              className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleHospitalClick(hospital)}
            >
              {/* Hospital Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={hospital.image}
                  alt={hospital.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {hospital.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {hospital.description}
                </p>

                {/* Key Departments - Pill Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {hospital.specialties.slice(0, 3).map((specialty, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Certifications - Green Pills */}
                {hospital.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {hospital.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"
                      >
                        <Shield className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                )}

                {/* Insurance Partners - Blue Pills (show first 4) */}
                {hospital.insurancePartners.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-gray-500 mr-1">{t('treatments.insurance')}</span>
                    {hospital.insurancePartners.slice(0, 4).map((insurance, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {insurance}
                      </span>
                    ))}
                    {hospital.insurancePartners.length > 4 && (
                      <span className="text-xs text-gray-400">
                        +{hospital.insurancePartners.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            {t('treatments.viewAll')}
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Modal for All Hospitals */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">All Hospitals</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {allHospitals.length} hospitals available
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 p-4 border-b">
                {[
                  { key: 'all', label: 'All Hospitals' },
                  { key: 'tier1', label: 'Public Grade-A' },
                  { key: 'tier2', label: 'International Private' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTier(tab.key as typeof activeTier)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTier === tab.key
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Hospital List */}
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <div className="grid md:grid-cols-2 gap-4">
                  {hospitals.map((hospital) => (
                    <Card
                      key={hospital.id}
                      className="overflow-hidden flex gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleHospitalClick(hospital)}
                    >
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={hospital.image}
                          alt={hospital.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 truncate">
                            {hospital.name}
                          </h4>

                        </div>
                        {/* Specialties */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {hospital.specialties.slice(0, 3).map((specialty, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                        {/* Certifications */}
                        {hospital.certifications.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {hospital.certifications.map((cert, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1"
                              >
                                <Shield className="w-3 h-3" />
                                {cert}
                              </span>
                            ))}
                          </div>
                        )}
                        {/* Insurance Partners */}
                        {hospital.insurancePartners.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            <span className="text-xs text-gray-500 mr-1">Ins:</span>
                            {hospital.insurancePartners.slice(0, 4).map((insurance, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
                              >
                                {insurance}
                              </span>
                            ))}
                            {hospital.insurancePartners.length > 4 && (
                              <span className="text-xs text-gray-400">
                                +{hospital.insurancePartners.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default TreatmentAreas
