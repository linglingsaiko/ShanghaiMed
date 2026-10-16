'use client'

import React from 'react'
import { Shield, Users, FileText, Headphones } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { trustPillars } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'

const TrustSection: React.FC = () => {
  const { t } = useLanguage()
  const iconMap: Record<string, React.ElementType> = {
    Shield,
    Users,
    FileText,
    Headphones,
  }

  return (
    <section id="trust" className="py-20 lg:py-28 bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('trust.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            {t('trust.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('trust.subtitle')}
          </p>
        </div>

        {/* Trust Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {trustPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon]
            return (
              <Card key={index} className="p-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">
                      {pillar.title}
                    </h3>
                    <ul className="space-y-3">
                      {pillar.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {t('trust.ctaText')}
          </p>
          <Button href="#contact" size="lg" className="group">
            {t('trust.ctaButton')}
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
