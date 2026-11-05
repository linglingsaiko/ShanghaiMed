'use client'

import React from 'react'
import Link from 'next/link'
import { Upload, BrainCircuit, UserCheck } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const FindDoctor: React.FC = () => {
  const { t, tArr } = useLanguage()
  const fallbackSteps = ['Upload your records', 'AI reads your case', 'Meet your matched specialist']
  const translated = tArr('findDoctor.steps')
  const stepItems: string[] = translated.length === 3 ? translated : fallbackSteps
  const icons = [Upload, BrainCircuit, UserCheck]

  return (
    <section id="find-doctor" className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('findDoctor.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-primary mt-4 leading-snug">
            {t('findDoctor.title')}
          </h2>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto space-y-5 text-gray-600 text-lg leading-relaxed mb-14">
          <p>{t('findDoctor.body1')}</p>
          <p>{t('findDoctor.body2')}</p>
          <p>{t('findDoctor.body3')}</p>
        </div>

        {/* 3 Steps */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {stepItems.map((label, i) => {
            const Icon = icons[i] || Upload
            return (
              <div key={i} className="text-center p-6 rounded-2xl bg-accent-50">
                <div className="w-14 h-14 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <div className="text-accent font-bold text-xs tracking-wider uppercase mb-1">
                  Step {i + 1}
                </div>
                <div className="text-primary font-semibold leading-snug">{label}</div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/medical-records"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-600 transition-colors shadow-lg hover:shadow-xl"
          >
            {t('findDoctor.cta')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-gray-400 text-sm mt-6 max-w-xl mx-auto leading-relaxed">
            {t('findDoctor.disclaimer')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default FindDoctor
