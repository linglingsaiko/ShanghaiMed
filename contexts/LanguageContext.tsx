'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'ja'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations = {
  en: {
    nav: {
      whyShanghai: 'Why Shanghai',
      howItWorks: 'How It Works',
      treatments: 'Treatments',
      careTeam: 'Care Team',
      trust: 'Trust',
    },
    hero: {
        badge1: '47 International Insurance Hospitals',
        badge2: 'Bilingual Registered Nurses',
        badge3: '24/7 AI + Human Support',
        title: 'Healthcare in Shanghai,',
        titleHighlight: 'Designed Around You',
        subtitle: "Connect with China's top hospitals, bilingual nurses, and 24/7 AI support — all through one platform.",
        cta: 'Start Your Medical Tourism',
        testimonial: "I saved $45,000 on cardiac surgery vs. the US. Bilingual nurse support made it the best medical experience ever.",
        testimonialAuthor: 'Michael T.',
        testimonialRole: 'Cardiac Surgery, USA',
      },
    testimonials: {
      title: 'What Our Patients Say',
      subtitle: 'Real stories from real patients who transformed their health journey with us.',
      patientsServed: 'Patients Served',
      countries: 'Countries',
      satisfactionRate: 'Satisfaction Rate',
      totalSavings: 'Total Savings',
      saved: 'Saved',
    },
    contact: {
      title: 'Start Your Medical Tourism Today',
      subtitle: 'Get a free consultation from our medical team. Our AI Navigator responds instantly. Human coordinator follows up within 24 hours.',
      nameLabel: 'Full Name *',
      namePlaceholder: 'Your full name',
      emailLabel: 'Email *',
      emailPlaceholder: 'your@email.com',
      medicalNeedsLabel: 'Medical Needs *',
      medicalNeedsPlaceholder: 'Select your medical need',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Please describe your medical condition or inquiry...',
      submit: 'Get Free Consultation',
      submitting: 'Sending...',
      successTitle: 'Thank You!',
      successMessage: 'Our AI Navigator has received your inquiry and a human coordinator will follow up within 24 hours. For immediate assistance, reach us on WhatsApp.',
      sendAnother: 'Send Another Message',
      whatsapp: 'Chat on WhatsApp',
    },
  },
  ja: {
    nav: {
      whyShanghai: 'なぜ上海か',
      howItWorks: '仕組み',
      treatments: '治療',
      careTeam: 'ケアチーム',
      trust: '信頼',
    },
    hero: {
      badge1: '47の国際保険直接支払い病院',
      badge2: 'バイリンガル登録看護師',
      badge3: '24時間AIナビゲーター + 人間によるフォローアップ',
      title: '上海の世界クラスの医療。',
      titleHighlight: 'コストはわずか。',
      subtitle: '中国のトップ病院、バイリンガル看護師、24時間AIサポートを一つのプラットフォームで。',
      cta: '今日から医療ツーリズムを始めましょう',
      testimonial: '心臓手術で米国と比較して45,000ドル節約できました。バイリンガル看護師が一歩一歩付き添ってくれました。最高の医療体験でした。',
      testimonialAuthor: 'Michael T.',
      testimonialRole: '心臓手術患者、米国',
    },
    testimonials: {
      title: '患者の声',
      subtitle: '健康の旅を変えた実際の患者の物語。',
      patientsServed: '対応患者数',
      countries: '国',
      satisfactionRate: '満足度',
      totalSavings: '総節約額',
      saved: '節約',
    },
    contact: {
      title: '今日から医療ツーリズムを始めましょう',
      subtitle: '医療チームから無料相談を受けられます。AIナビゲーターが即座に応答します。人間のコーディネーターが24時間以内にフォローアップします。',
      nameLabel: 'お名前 *',
      namePlaceholder: 'お名前',
      emailLabel: 'メール *',
      emailPlaceholder: 'your@email.com',
      medicalNeedsLabel: '医療ニーズ *',
      medicalNeedsPlaceholder: '医療ニーズを選択',
      messageLabel: 'メッセージ',
      messagePlaceholder: '医療状態やお問い合わせをご記入ください...',
      submit: '無料相談を受ける',
      submitting: '送信中...',
      successTitle: 'ありがとうございます！',
      successMessage: 'AIナビゲーターがお問い合わせを受け取り、人間のコーディネーターが24時間以内にフォローアップします。即時のサポートが必要な場合は、WhatsAppをご利用ください。',
      sendAnother: '別のメッセージを送信',
      whatsapp: 'WhatsAppでチャット',
    },
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}