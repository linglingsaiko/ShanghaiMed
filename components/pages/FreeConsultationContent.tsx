'use client'

import React from 'react'
import Link from 'next/link'
import {
  CheckCircle, Shield, Lock, CreditCard,
  Stethoscope, Award, Building2, ChevronRight,
  MessageCircle, Phone, ArrowRight, Star,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// Static hospital lists (used for visual display; full network described in copy)
const publicHospitals = [
  "Huashan Hospital (Fudan University)",
  "Children's Hospital of Fudan University",
  "Ruijin Hospital (SJTU)",
  "Shanghai General Hospital",
  "Zhongshan Hospital (Fudan University)",
  "Renji Hospital (SJTU)",
  "Longhua Hospital (Shanghai Univ. of TCM)",
  "International Peace Maternity & Child Health Hospital",
  "Shanghai Children's Medical Center (SJTU)",
  "Shanghai Sixth People's Hospital",
  "Shanghai First Maternity & Infant Hospital",
  "Xinhua Hospital (SJTU)",
  "Huadong Hospital (Fudan University)",
  "Shanghai Ninth People's Hospital (SJTU)",
]

const privateHospitals = [
  "Jiahui International Hospital (Mass General affiliation)",
  "Shanghai United Family Hospital",
  "ParkwayHealth",
  "SinoUnited Health (Mayo Clinic collaboration)",
  "Shanghai Raffles Hospital",
]

export default function FreeConsultationContent() {
  const { t, tArr, localePath } = useLanguage()

  const badges = tArr('freeConsultation.badges')
  const badgeFallback = [
    { title: 'No Payment Required', desc: 'Free consultation, no upfront fees or deposits' },
    { title: 'No Obligation to Purchase', desc: 'Speak with us with zero pressure to book any service' },
    { title: 'Confidential', desc: 'Your medical information stays private and is never shared without consent' },
  ]
  const points = tArr('freeConsultation.specialistMatchPoints')
  const pointsFallback = [
    'Specialists matched to your specific medical condition — not the nearest or default option',
    'Connect with the right professors and chief physicians across Shanghai\'s public Grade 3A hospitals based on your case',
    'Priority access to leading international and private hospitals in Shanghai; appointments can typically be arranged on short notice',
    'Pre-consultation medical record review before you arrive in Shanghai',
  ]

  const badgeIcons = [CreditCard, Shield, Lock]

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#F0F7FF] via-white to-[#E6F7F8] pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href={localePath('/')} className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t('freeConsultation.badge')}</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <MessageCircle className="w-4 h-4" />
            {t('freeConsultation.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {t('freeConsultation.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed mb-8">
            {t('freeConsultation.subtitle')}
          </p>
          <a
            href="https://wa.me/message/VUS2JQZ7E52ZH1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5" />
            {t('freeConsultation.ctaButton')}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Three trust badges */}
      <section className="py-12 lg:py-16 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {(badges.length === 3 ? badges : badgeFallback).map((b, i) => {
              const Icon = badgeIcons[i]
              return (
                <div key={i} className="bg-gray-50 rounded-xl p-6 flex gap-4 items-start">
                  <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                    <p className="text-sm text-gray-600">{b.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Specialist Matching */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <Stethoscope className="w-3.5 h-3.5" />
                {t('freeConsultation.badge')}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t('freeConsultation.specialistMatchTitle')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {t('freeConsultation.specialistMatchDesc')}
              </p>
              <ul className="space-y-3">
                {(points.length === 4 ? points : pointsFallback).map((p, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary to-primary-700 rounded-2xl p-8 text-white shadow-xl">
              <Award className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">{t('freeConsultation.ctaTitle')}</h3>
              <p className="text-white/85 text-sm mb-6">{t('freeConsultation.ctaDesc')}</p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/message/VUS2JQZ7E52ZH1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white text-primary font-semibold px-5 py-3.5 rounded-xl hover:bg-accent hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </a>
                <div className="flex items-center justify-between bg-white/10 text-white/60 font-medium px-5 py-3.5 rounded-xl">
                  <span className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    WeChat: shanghaimed (link coming soon)
                  </span>
                </div>
              </div>
              <p className="text-white/60 text-xs mt-4">We reply as quickly as possible, typically within a few hours during business hours (UTC+8).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Network */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <Building2 className="w-3.5 h-3.5" />
              {t('freeConsultation.badge')}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('freeConsultation.hospitalNetworkTitle')}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('freeConsultation.hospitalNetworkDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Public */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                {t('freeConsultation.publicHospitals')}
              </h3>
              <ul className="space-y-2">
                {publicHospitals.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-accent mt-1">•</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            {/* Private */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                {t('freeConsultation.privateHospitals')}
              </h3>
              <ul className="space-y-2">
                {privateHospitals.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-primary mt-1">•</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Beyond */}
          <div className="bg-primary rounded-2xl p-6 lg:p-8 text-white">
            <h3 className="text-xl font-bold mb-2">{t('freeConsultation.beyondTitle')}</h3>
            <p className="text-white/85 leading-relaxed">
              {t('freeConsultation.beyondDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('freeConsultation.ctaTitle')}
          </h2>
          <p className="text-gray-600 mb-8">{t('freeConsultation.ctaDesc')}</p>
          <a
            href="https://wa.me/message/VUS2JQZ7E52ZH1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            {t('freeConsultation.ctaButton')}
          </a>
          <p className="mt-6 text-sm text-gray-500">
            Or see our <Link href={localePath('/') + '#pricing'} className="text-primary hover:underline">transparent pricing</Link> for concierge packages.
          </p>
        </div>
      </section>
    </div>
  )
}
