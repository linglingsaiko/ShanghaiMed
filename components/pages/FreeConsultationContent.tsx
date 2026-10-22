'use client'

import React from 'react'
import Link from 'next/link'
import {
  CheckCircle, Shield, Lock, CreditCard,
  MessageCircle, ArrowRight,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const WHATSAPP_LINK = 'https://wa.me/8613818274110'
const WECHAT_LINK = 'https://work.weixin.qq.com/ca/cawcde1431152cb927'

export default function FreeConsultationContent() {
  const { t, tArr, localePath, language } = useLanguage()
  const isJapanese = language === 'ja'
  const primaryLink = isJapanese ? 'https://line.me/ti/p/cD_Ed4GHBM' : WHATSAPP_LINK

  const badges = tArr('freeConsultation.badges')
  const badgeFallback = [
    { title: 'No Payment Required', desc: 'Free consultation, no upfront fees or deposits' },
    { title: 'No Obligation to Purchase', desc: 'Speak with us with zero pressure to book any service' },
    { title: 'Confidential', desc: 'Your medical information stays private and is never shared without consent' },
  ]
  const badgeIcons = [CreditCard, Shield, Lock]

  return (
    <div className="bg-white">
      {/* Hero + 3 badges — single focused block per request */}
      <section className="relative bg-gradient-to-br from-[#F0F7FF] via-white to-[#E6F7F8] pt-28 pb-16 lg:pt-36 lg:pb-20">
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
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold px-7 py-3.5 rounded-full shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              {isJapanese ? 'LINEで相談する' : 'Chat on WhatsApp'}
              <ArrowRight className="w-4 h-4" />
            </a>
            {!isJapanese && (
              <a
                href={WECHAT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary font-semibold px-7 py-3.5 rounded-full hover:bg-primary/5 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WeChat (企业微信)
              </a>
            )}
          </div>

          {/* Three trust badges */}
          <div className="grid md:grid-cols-3 gap-5 max-w-3xl">
            {(badges.length === 3 ? badges : badgeFallback).map((b, i) => {
              const Icon = badgeIcons[i]
              return (
                <div key={i} className="bg-white/70 backdrop-blur rounded-xl p-5 flex gap-3 items-start border border-gray-100">
                  <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{b.title}</h3>
                    <p className="text-xs text-gray-600 leading-snug">{b.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="mt-6 text-sm text-gray-500">
            We reply as quickly as possible, typically within a few hours during business hours (UTC+8).
          </p>
        </div>
      </section>
    </div>
  )
}
