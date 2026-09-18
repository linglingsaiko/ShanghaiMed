'use client'

import React from 'react'
import { Check, Clock, Calendar, Phone, Plane, Building2, FileText, Car, MessageCircle, Info, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Pricing: React.FC = () => {
  const { t, tArr } = useLanguage()

  const packageIcons = [Clock, Calendar, Calendar, Calendar]
  const packages = [
    {
      price: '$200',
      icon: Clock,
      type: 'addon',
    },
    {
      price: '$350',
      icon: Calendar,
      type: 'addon',
    },
    {
      price: '$1,000',
      icon: Calendar,
      type: 'core',
      tier: 'Standard',
      popular: true,
    },
    {
      price: '$1,650',
      icon: Calendar,
      type: 'core',
      tier: 'Extended',
      popular: false,
    },
  ]

  const includedServices = [
    { icon: Plane },
    { icon: Building2 },
    { icon: Phone },
    { icon: MessageCircle },
    { icon: FileText },
    { icon: Calendar },
    { icon: Car },
    { icon: Phone },
    { icon: Car },
    { icon: MessageCircle },
    { icon: FileText },
    { icon: Phone },
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
  ]

  const freeConsultationItems = [
    'Medical needs assessment',
    'Hospital & specialist recommendations',
    'Estimated medical budget',
    'Insurance direct billing guidance',
    'Shanghai healthcare system overview',
    'General patient questions',
  ]

  const importantNotes = [
    'Medical expenses are paid directly to hospitals or clinics.',
    'Emergency medical services are not included.',
    'Nighttime support may require additional fees.',
    'We are an independent medical concierge service, not a medical provider.',
  ]

  // 翻译表数据（缺失时回退英文）
  const translatedPackages = tArr('pricing.packages')
  const translatedFreeItems = tArr('pricing.freeItems')
  const translatedIncludedItems = tArr('pricing.includedItems')
  const translatedNotes = tArr('pricing.notes')

  const getPackage = (index: number, key: 'name' | 'duration' | 'description', fallback: string) =>
    translatedPackages.length === packages.length && translatedPackages[index]?.[key]
      ? translatedPackages[index][key]
      : fallback

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
                {(translatedFreeItems.length > 0 ? translatedFreeItems : freeConsultationItems).map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-block bg-accent text-primary font-bold text-lg px-6 py-3 rounded-full">
                {t('pricing.freeLabel')}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">{t('pricing.servicePricingTitle')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all hover:shadow-xl ${
                  pkg.type === 'core' ? 'border-accent' : pkg.type === 'addon' ? 'border-gray-200' : 'border-transparent'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-primary text-xs font-bold px-4 py-1 rounded-full">
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

                {/* Package Badge - Green background */}
                {pkg.type === 'core' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-white text-sm font-bold px-4 py-1 rounded-full">
                      {t('pricing.packageBadge')}
                    </span>
                  </div>
                )}

                <h4 className="text-lg font-bold text-gray-900 mb-2">{getPackage(index, 'name', index === 0 ? 'Half-Day Add-On' : index === 1 ? 'Full-Day Add-On' : index === 2 ? 'Essential Care Concierge' : 'Complex Care Concierge')}</h4>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-gray-500 text-sm ml-1">{t('pricing.currency')}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{getPackage(index, 'duration', index === 0 ? 'Up to 4 hours (daytime)' : index === 1 ? 'Up to 8 hours (daytime)' : index === 2 ? 'Up to 8 hours/day × 3 days (daytime)' : 'Up to 8 hours/day × 5 days (daytime)')}</p>
                <p className={`text-xs ${pkg.type === 'addon' ? 'text-amber-600' : 'text-amber-600'}`}>
                  {getPackage(index, 'description', index === 0 || index === 1 ? 'Only available as add-on to 3-Day / 5-Day packages' : index === 2 ? 'Meets routine medical needs' : 'For complex medical procedures / multi-department visits')}
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
            {includedServices.map((service, index) => {
              const text =
                translatedIncludedItems.length === includedServices.length && translatedIncludedItems[index]
                  ? translatedIncludedItems[index]
                  : includedFallback[index]
              const Icon = service.icon
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
            {(translatedNotes.length > 0 ? translatedNotes : importantNotes).map((note, index) => (
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
