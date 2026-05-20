'use client'

import React, { useState } from 'react'
import { CheckCircle, Shield, Award } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import {
  tier1Hospitals,
  tier2Hospitals,
  tier3Hospitals,
  Hospital,
} from '@/lib/constants'
import { events } from '@/lib/analytics'

const TreatmentAreas: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'all' | 'tier1' | 'tier2' | 'tier3'>('all')

  const hospitals =
    activeTier === 'all'
      ? [...tier1Hospitals, ...tier2Hospitals, ...tier3Hospitals]
      : activeTier === 'tier1'
      ? tier1Hospitals
      : activeTier === 'tier2'
      ? tier2Hospitals
      : tier3Hospitals

  const tierLabels = {
    tier1: 'Public Grade-A Hospitals',
    tier2: 'International Private',
    tier3: 'Specialized Centers',
  }

  const handleHospitalClick = (hospital: Hospital) => {
    events.hospitalView(hospital.name)
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Hospital Network
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            Shanghai&apos;s Top Medical Institutions
          </h2>
          <p className="text-gray-600 text-lg">
            Access to China&apos;s leading hospitals, from top-tier public
            institutions to world-class private facilities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { key: 'all', label: 'All Hospitals' },
            { key: 'tier1', label: 'Public Grade-A' },
            { key: 'tier2', label: 'International Private' },
            { key: 'tier3', label: 'Specialized Centers' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTier(tab.key as typeof activeTier)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTier === tab.key
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hospital Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <Card
              key={hospital.id}
              className="overflow-hidden"
              onClick={() => handleHospitalClick(hospital)}
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-primary to-primary-600">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="info" className="bg-white/20 text-white">
                    {tierLabels[hospital.tier]}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {hospital.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white/20 text-white px-2 py-1 rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">
                  {hospital.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {hospital.internationalFeatures}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {hospital.insuranceStatus}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-6 py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
                  Learn More
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Indicator */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-accent" />
            <span className="font-semibold text-primary">All Partner Hospitals</span>
          </div>
          <p className="text-gray-600">
            Every hospital in our network is verified, accredited, and
            equipped with English-speaking staff and international patient
            services.
          </p>
        </div>
      </div>
    </section>
  )
}

export default TreatmentAreas
