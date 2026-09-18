'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Globe, Award, Clock, Building2 } from 'lucide-react'
import Card from '../ui/Card'
import { statistics, priceReference } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'

const WhyShanghai: React.FC = () => {
  const statIcons = [Building2, Globe, Award, TrendingUp, Clock]
  const { t, tArr } = useLanguage()

  // 翻译表数据（缺失时回退英文常量）
  const statLabels = tArr('whyShanghai.stats')
  const healthSystem = tArr('whyShanghai.healthSystem.items')
  const healthSystemTitle = t('whyShanghai.healthSystem.title')
  const travelAccess = tArr('whyShanghai.travelAccess.items')
  const travelAccessTitle = t('whyShanghai.travelAccess.title')
  const priceRows = tArr('whyShanghai.pricing.rows')
  const valueItems = tArr('whyShanghai.pricing.valueItems')
  const notes = tArr('whyShanghai.pricing.notes')

  const getStatLabel = (index: number, fallback: string) =>
    statLabels.length === statistics.length && statLabels[index]?.label
      ? statLabels[index].label
      : fallback

  return (
    <section id="why-shanghai" className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('whyShanghai.badge')}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mt-4 mb-6">
            {t('whyShanghai.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('whyShanghai.subtitle')}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {statistics.map((stat, index) => {
            const Icon = statIcons[index]
            return (
              <Card key={index} className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-sm font-medium text-gray-800">
                  {getStatLabel(index, stat.label)}
                </p>
              </Card>
            )
          })}
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Internationally Recognized Healthcare System */}
          <Card className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {healthSystemTitle !== 'whyShanghai.healthSystem.title' ? healthSystemTitle : 'Internationally Recognized Healthcare System'}
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {(healthSystem.length > 0 ? healthSystem : [
                    'Leading hospitals serving patients from around the world',
                    'Dedicated international departments with English-language services',
                    'Public Grade-A hospitals designated for international medical services',
                    'Access to specialists across oncology, cardiology, neurology, orthopedics, fertility care, and more',
                  ]).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Convenient Travel and Medical Access */}
          <Card className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {travelAccessTitle !== 'whyShanghai.travelAccess.title' ? travelAccessTitle : 'Convenient Travel and Medical Access'}
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {(travelAccess.length > 0 ? travelAccess : [
                    '240-hour visa-free transit available for travelers from many countries',
                    'Medical visa support for extended treatment plans',
                    'Airport pickup and transportation assistance',
                    'End-to-end coordination throughout your healthcare journey',
                  ]).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Price Reference Section */}
        <Card className="p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-3">
                {t('whyShanghai.pricing.title')}
              </h3>
              <p className="text-gray-600">
                {t('whyShanghai.pricing.subtitleLine1')}
                <br />
                {t('whyShanghai.pricing.subtitleLine2')}
              </p>
            </div>
          </div>

          {/* Price Comparison Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-4 px-4 text-lg font-bold text-gray-700 rounded-tl-xl">{t('whyShanghai.pricing.tableService')}</th>
                  <th className="text-center py-4 px-4 text-lg font-bold text-accent">{t('whyShanghai.pricing.tableShanghai')}</th>
                  <th className="text-center py-4 px-4 text-lg font-bold text-gray-700 rounded-tr-xl">{t('whyShanghai.pricing.tableUs')}</th>
                </tr>
              </thead>
              <tbody>
                {(priceRows.length > 0 ? priceRows : [
                  { service: 'Executive Health Screening', shanghai: 'From $700', us: 'From $2,500' },
                  { service: 'MRI Scan', shanghai: 'From $300', us: 'From $1,000' },
                  { service: 'CT Scan', shanghai: 'From $150', us: 'From $500' },
                  { service: 'Specialist Consultation', shanghai: 'From $70', us: 'From $250' },
                  { service: 'IVF Treatment', shanghai: 'From $4,200', us: 'From $15,000' },
                  { service: 'Dental Implant', shanghai: 'From $800', us: 'From $3,000' },
                ]).map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-primary">{row.service}</td>
                    <td className="py-4 px-4 text-center font-semibold text-accent">{row.shanghai}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Why Patients Choose Shanghai */}
          <div className="bg-white rounded-xl p-6 mb-8">
            <h4 className="text-lg font-bold text-primary mb-4">{t('whyShanghai.pricing.valueTitle')}</h4>
            <ul className="space-y-3">
              {(valueItems.length > 0 ? valueItems : [
                'Access to leading hospitals and specialists',
                'Transparent pricing before treatment',
                'Faster access to consultations, imaging, and treatment',
                'Lower out-of-pocket healthcare costs',
                'Personalized bilingual support throughout the patient journey',
              ]).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Notes */}
          <div className="bg-accent-50 border border-accent/20 rounded-lg p-6">
            <h4 className="font-semibold text-primary mb-3">{t('whyShanghai.pricing.notesTitle')}</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              {(notes.length > 0 ? notes : [
                '• Prices are provided for illustrative purposes only and do not constitute a quotation.',
                '• Actual medical fees are determined by the hospital, physician, and treatment plan.',
                '• U.S. pricing reflects typical self-pay costs and may vary significantly based on insurance coverage and location.',
                '• Exchange rates are for reference only and may fluctuate.',
                '• Complex treatments, surgeries, cancer care, and inpatient services require an individualized quotation following medical review.',
              ]).map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default WhyShanghai
