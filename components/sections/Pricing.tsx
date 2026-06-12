'use client'

import React from 'react'
import { Check, Clock, Calendar, Phone, Plane, Building2, FileText, Car, MessageCircle, Info, AlertCircle } from 'lucide-react'

const Pricing: React.FC = () => {
  const packages = [
    {
      name: 'Half-Day Add-On',
      price: '$200',
      duration: 'Up to 4 hours (daytime)',
      icon: Clock,
      type: 'addon',
      description: 'Only available as add-on to 3-Day / 5-Day packages',
    },
    {
      name: 'Full-Day Add-On',
      price: '$350',
      duration: 'Up to 8 hours (daytime)',
      icon: Calendar,
      type: 'addon',
      description: 'Only available as add-on to 3-Day / 5-Day packages',
    },
    {
      name: 'Essential Care Concierge',
      price: '$1,000',
      duration: 'Up to 8 hours/day × 3 days (daytime)',
      icon: Calendar,
      type: 'core',
      tier: 'Standard',
      description: 'Meets routine medical needs',
      popular: true,
    },
    {
      name: 'Complex Care Concierge',
      price: '$1,650',
      duration: 'Up to 8 hours/day × 5 days (daytime)',
      icon: Calendar,
      type: 'core',
      tier: 'Extended',
      description: 'For complex medical procedures / multi-department visits',
      popular: false,
    },
  ]

  const includedServices = [
    { icon: Plane, text: 'Airport pickup or drop-off' },
    { icon: Building2, text: 'Hotel coordination assistance' },
    { icon: Phone, text: 'In-person medical accompaniment' },
    { icon: MessageCircle, text: 'Interpretation support' },
    { icon: FileText, text: 'Medical report translation summaries' },
    { icon: Calendar, text: 'Examination scheduling assistance' },
    { icon: Car, text: 'Medication coordination support' },
    { icon: Phone, text: 'Hospital & specialist matching' },
    { icon: Car, text: 'Transportation / payment / local guidance' },
    { icon: MessageCircle, text: 'WeChat / WhatsApp support' },
    { icon: FileText, text: 'Visa assistance' },
    { icon: Phone, text: 'Post-Care Remote Follow-up' },
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

  return (
    <section id="pricing" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Care Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Medical Concierge Program
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional support tailored to your medical journey in Shanghai
          </p>
        </div>

        {/* Free Consultation */}
        <div className="bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-8 md:p-10 mb-16 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Free Initial Consultation</h3>
              <p className="text-white/80 mb-4">Get started with a complimentary assessment of your medical needs</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {freeConsultationItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-block bg-accent text-primary font-bold text-lg px-6 py-3 rounded-full">
                FREE
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">Service Pricing</h3>

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
                      POPULAR
                    </span>
                  </div>
                )}

                {/* Add-On Badge */}
                {pkg.type === 'addon' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gray-400 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Add-On
                    </span>
                  </div>
                )}

                {/* Package Badge - Green background */}
                {pkg.type === 'core' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-white text-sm font-bold px-4 py-1 rounded-full">
                      Package
                    </span>
                  </div>
                )}

                <h4 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h4>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-gray-500 text-sm ml-1">USD</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{pkg.duration}</p>
                <p className={`text-xs ${pkg.type === 'addon' ? 'text-amber-600' : 'text-amber-600'}`}>
                  {pkg.description}
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
              <h4 className="font-bold text-gray-900 mb-2">Important Note</h4>
              <p className="text-gray-600 text-sm">
                <strong>Half-Day Add-On and Full-Day Add-On</strong> are supplementary items only, and cannot be purchased separately.<br />
                The <strong>3-Day Standard</strong> and <strong>5-Day Extended</strong> packages may be combined or extended based on your unique medical journey needs.
              </p>
            </div>
          </div>
        </div>

        {/* Included Services */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">Included Services</h3>
          <p className="text-center text-gray-600 mb-8">Depending on your medical needs, services may include:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {includedServices.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-gray-700 text-sm">{service.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gray-100 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">Important Notes</h3>
          </div>
          <ul className="space-y-2">
            {importantNotes.map((note, index) => (
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
