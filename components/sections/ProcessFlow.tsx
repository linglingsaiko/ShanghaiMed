'use client'

import React from 'react'
import { MessageCircle, Stethoscope, DollarSign, Plane, Car, Building2, Heart, FileText, Phone } from 'lucide-react'

interface ProcessStep {
  icon: React.ElementType
  title: string
  description: string
}

interface ProcessPhase {
  phase: string
  steps: ProcessStep[]
}

const ProcessFlow: React.FC = () => {
  const phases: ProcessPhase[] = [
    {
      phase: 'Before You Arrive',
      steps: [
        {
          icon: MessageCircle,
          title: 'Online Inquiry',
          description: 'AI Navigator responds instantly',
        },
        {
          icon: Stethoscope,
          title: 'Medical Assessment',
          description: 'Collect symptoms, recommend hospitals',
        },
        {
          icon: DollarSign,
          title: 'Cost Estimate',
          description: 'Transparent pricing for consultation & basic tests',
        },
        {
          icon: Plane,
          title: 'Visa & Travel',
          description: 'Visa-free/240h transit guidance, travel tips',
        },
      ],
    },
    {
      phase: 'During Your Visit',
      steps: [
        {
          icon: Car,
          title: 'Airport Pick-up',
          description: 'Bilingual nurse meets you',
        },
        {
          icon: Building2,
          title: 'Hospital Visit',
          description: 'Nurse-accompanied consultation & tests',
        },
        {
          icon: Heart,
          title: 'Treatment',
          description: 'World-class care at leading hospitals',
        },
        {
          icon: Stethoscope,
          title: 'Inpatient Care',
          description: 'Dedicated nursing support (if needed)',
        },
      ],
    },
    {
      phase: 'After Your Visit',
      steps: [
        {
          icon: FileText,
          title: 'Discharge & Translation',
          description: 'English medical reports',
        },
        {
          icon: Phone,
          title: 'Follow-up',
          description: 'Remote support, prescription coordination',
        },
      ],
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Your Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            From Inquiry to Care
          </h2>
          <p className="text-gray-600 text-lg">
            A complete timeline of your medical tourism experience in Shanghai<br />
            with professional support at every step.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="max-w-4xl mx-auto">
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="mb-12 last:mb-0">
              {/* Phase Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent"></div>
                <h3 className="text-lg font-bold text-primary px-4">
                  {phase.phase}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent"></div>
              </div>

              {/* Steps */}
              <div className="grid md:grid-cols-2 gap-4">
                {phase.steps.map((step, stepIndex) => {
                  const Icon = step.icon
                  const globalIndex = phases
                    .slice(0, phaseIndex)
                    .reduce((acc, p) => acc + p.steps.length, 0) + stepIndex + 1

                  return (
                    <div
                      key={stepIndex}
                      className="relative bg-gray-50 rounded-xl p-5 hover:bg-accent-50 transition-colors group"
                    >
                      {/* Step Number */}
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                        {globalIndex}
                      </div>

                      <div className="flex items-start gap-4 pl-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                          <Icon className="w-6 h-6 text-accent group-hover:text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1">
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Connector Line (Desktop) */}
                      {stepIndex < phase.steps.length - 1 && (
                        <div className="hidden md:block absolute -bottom-4 left-1/2 w-0.5 h-4 bg-accent/30"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default ProcessFlow
