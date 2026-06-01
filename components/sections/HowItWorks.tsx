'use client'

import React from 'react'
import { MessageSquare, Users, Plane, Heart } from 'lucide-react'
import Card from '../ui/Card'
import { processSteps } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'

const HowItWorks: React.FC = () => {
  const { t } = useLanguage()
  const iconMap: Record<string, React.ElementType> = {
    MessageSquare,
    Users,
    Plane,
    Heart,
  }

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('howItWorks.simpleProcess')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            {t('howItWorks.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines (Desktop Only) */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-accent via-accent/50 to-accent"></div>

          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon]
            return (
              <div key={step.step} className="relative">
                <Card className="text-center p-8 h-full bg-white">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-6 mt-4 bg-accent-50 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-600 transition-colors shadow-lg hover:shadow-xl"
          >
            {t('contact.cta')}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
