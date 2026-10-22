'use client'

import React from 'react'
import Link from 'next/link'
import { Check, Clock, Calendar, Phone, Plane, Building2, FileText, Car, MessageCircle, Info, Shield, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Pricing: React.FC = () => {
  const { t, tArr, localePath } = useLanguage()

  // 3 packages: Essential Care / Complex Care / Extra Companion Hours (add-on, last)
  const packages = [
    {
      priceUsd: '$1,000',
      icon: Calendar,
      type: 'core',
      popular: true,
    },
    {
      priceUsd: '$1,650',
      icon: Calendar,
      type: 'core',
      popular: false,
    },
    {
      priceUsd: '$50',
      icon: Clock,
      type: 'addon',
      perUnit: '/hour',
    },
  ]

  const includedServiceIcons = [
    Plane, Building2, Phone, MessageCircle, FileText,
    Calendar, Car, Phone, Car, MessageCircle, FileText, Phone,
    Shield, // #13 Insurance
  ]

  const includedFallback = [
    'Airport pickup or drop-off',
    'Hotel coordination assistance',
    'In-person medical accompaniment',
    'Interpretation support',
    'Medical report translation summaries',
    'Examination scheduling assistance',
    'Medication coordination support',
    'Hospital & specialist matching',
    'Transportation / payment / local guidance',
    'WeChat / WhatsApp support',
    'Visa assistance',
    'Post-Care Remote Follow-up',
    'Insurance direct-billing & pre-authorization help',
  ]

  const freeItemsFallback = [
    'Medical needs assessment',
    'Hospital & specialist recommendations',
    'Estimated medical budget',
    'Insurance direct billing guidance',
    'General patient questions',
  ]

  const notesFallback = [
    'Medical expenses are paid directly to hospitals or clinics.',
    'Emergency medical services are not included.',
    'Nighttime support may require additional fees.',
    'We are an independent medical concierge service, not a medical provider.',
  ]

  const packageNameFallback = ['Essential Care Concierge', 'Complex Care Concierge', 'Extra Companion Hours']
  const packageDurationFallback = ['Up to 8 hours/day × 3 days (daytime)', 'Up to 8 hours/day × 5 days (daytime)', '$50 per hour']
  const packageDescFallback = ['Meets routine medical needs', 'For complex medical procedures / multi-department visits', 'Add-on to 3-Day / 5-Day packages only — not sold separately']

  const translatedPackages = tArr('pricing.packages')
  const translatedFreeItems = tArr('pricing.freeItems')
  const translatedIncludedItems = tArr('pricing.includedItems')
  const translatedNotes = tArr('pricing.notes')

  const getPkg = (index: number, key: 'name' | 'duration' | 'description', fallback: string) => {
    if (translatedPackages.length === packages.length && translatedPackages[index]?.[key]) {
      return translatedPackages[index][key]
    }
    return fallback
  }

  return (
    <section id="pricing" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('pricing.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Free Consultation */}
        <div className="bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-8 md:p-10 mb-16 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{t('pricing.freeTitle')}</h3>
              <p className="text-white/80 mb-4">{t('pricing.freeDesc')}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(translatedFreeItems.length > 0 ? translatedFreeItems : freeItemsFallback).map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <Link
                href={localePath('/free-consultation')}
                className="inline-flex items-center gap-2 bg-accent text-primary font-bold text-base px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
              >
                {t('pricing.freeLabel')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">{t('pricing.servicePricingTitle')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all hover:shadow-xl ${
                  pkg.type === 'core'
                    ? pkg.popular
                      ? 'border-accent scale-[1.02]'
                      : 'border-gray-200'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {/* Popular Badge */}
                {pkg.type === 'core' && pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">
                      {t('pricing.popularBadge')}
                    </span>
                  </div>
                )}

                {/* Add-On Badge */}
                {pkg.type === 'addon' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gray-400 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {t('pricing.addonBadge')}
                    </span>
                  </div>
                )}

                <h4 className="text-lg font-bold text-gray-900 mb-2">{getPkg(index, 'name', packageNameFallback[index])}</h4>
                <div className="mb-3 flex items-baseline">
                  <span className="text-3xl font-bold text-primary">{pkg.priceUsd}</span>
                  {pkg.perUnit ? (
                    <span className="text-gray-500 text-sm ml-1">{pkg.perUnit}</span>
                  ) : (
                    <span className="text-gray-500 text-sm ml-1">{t('pricing.currency')}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{getPkg(index, 'duration', packageDurationFallback[index])}</p>
                <p className={`text-xs ${pkg.type === 'addon' ? 'text-gray-500 italic' : 'text-amber-600'}`}>
                  {getPkg(index, 'description', packageDescFallback[index])}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-16">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-900 mb-2">{t('pricing.noteTitle')}</h4>
              <p className="text-gray-600 text-sm">
                <strong>{t('pricing.noteS1')}</strong>{t('pricing.noteT1')}<br />
                <strong>{t('pricing.noteS2')}</strong>{t('pricing.noteT2')}
              </p>
            </div>
          </div>
        </div>

        {/* Included Services */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">{t('pricing.includedTitle')}</h3>
          <p className="text-center text-gray-600 mb-8">{t('pricing.includedDesc')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {includedServiceIcons.map((Icon, index) => {
              const items = translatedIncludedItems.length === includedServiceIcons.length
                ? translatedIncludedItems
                : includedFallback
              const text = items[index] || includedFallback[index]
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-gray-700 text-sm">{text}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gray-100 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">{t('pricing.notesTitle')}</h3>
          </div>
          <ul className="space-y-2">
            {(translatedNotes.length > 0 ? translatedNotes : notesFallback).map((note, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="text-gray-400 mt-1">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Pricing
