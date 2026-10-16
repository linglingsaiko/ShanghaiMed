'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import Card from '../ui/Card'
import { patientTestimonials, socialProofStats } from '@/lib/constants'

const PatientTestimonials: React.FC = () => {
  const { t } = useLanguage()
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('testimonials.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {socialProofStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patientTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-primary truncate">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.country}
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {testimonial.testimonial}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {testimonial.treatment}
                </span>
                <span className="text-accent font-semibold">
                  {t('testimonials.saved')} {testimonial.savings}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PatientTestimonials