'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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
    whyShanghai: {
      title: "The World's Leading Medical Tourism Destination",
      subtitle: 'Shanghai combines world-class medical expertise with unmatched cost savings, making it the top choice for international patients seeking quality healthcare.',
      globalRecognition: 'Global Recognition',
      costAdvantage: 'Unbeatable Cost Advantage',
      medicalExcellence: 'Medical Excellence',
      convenience: 'Convenience & Comfort',
    },
    careTeam: {
      title: 'Bilingual Registered Nurses',
      subtitle: 'Dedicated healthcare companions at every stage of your medical journey in Shanghai.',
      expertTeam: 'Expert Care Team',
      ispnCertified: 'ISPN Certified',
      ispnDesc: 'International Standards for Professional Nurses',
      ispnIssuer: 'Certified by CGFNS (USA)',
      credentialsTitle: 'Nurse Credentials',
      servicesTitle: 'Our Services',
      nursingCare: 'Bilingual Nursing Care',
      appointmentCoordination: 'Appointment Coordination',
      translationServices: 'Translation Services',
      transportation: 'Transportation Arrangements',
      medicalReports: 'Medical Report Translation',
      emergencySupport: 'Emergency Support',
    },
    hero: {
        badge1: 'International Insurance Hospitals',
        badge2: 'Bilingual Registered Nurses',
        badge3: '24/7 AI + Human Support',
        title: 'Healthcare in Shanghai',
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
    treatments: {
      title: 'Shanghai\'s Leading Hospitals',
      subtitle: 'Access leading hospitals across Shanghai, with recommendations tailored to your medical needs.',
      hospitalNetwork: 'Hospital Network',
      publicHospitals: 'Public Tier 1 Hospitals',
      privateHospitals: 'Private International Hospitals',
      viewAll: 'View All Hospitals',
      keyDepartments: 'Key Departments',
      certifications: 'International Certifications',
      insurance: 'Insurance:',
      all: 'All',
    },
    howItWorks: {
      title: 'Five Simple Steps',
      subtitle: 'From your first inquiry to post-treatment follow-up, we support every step of your medical journey in Shanghai.',
      simpleProcess: 'Simple Process',
      step1Title: 'AI Consultation',
      step1Desc: 'Our AI Navigator responds instantly to understand your needs.',
      step2Title: 'Care Team Assignment',
      step2Desc: 'An experienced nurse is assigned as your care coordinator.',
      step3Title: 'Arrival in Shanghai',
      step3Desc: 'Complete support including airport transfer and hotel booking.',
      step4Title: 'Treatment & Recovery',
      step4Desc: 'Seamless integration of specialist treatment, bilingual support, and post-care follow-up.',
    },
    contact: {
      title: 'Start Your Medical Tourism Today',
      subtitle: 'Get a free consultation from our medical team. Our AI Navigator responds instantly. Human coordinator follows up within 24 hours.',
      cta: 'Start Your Medical Tourism Today',
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
      successMessage: 'Thank you! Our AI Navigator has received your inquiry and our team will follow up within 24 hours. You can also reach us on WhatsApp — we\'ll respond as soon as possible.',
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
    whyShanghai: {
      title: '世界有数の医療ツーリズム目的地',
      subtitle: '上海は世界クラスの医療技術と比較にならないコスト削減を組み合わせ、質の高い医療を求める国際患者にとって最高の選択肢となっています。',
      globalRecognition: '国際的な評価',
      costAdvantage: '圧倒的なコスト優位',
      medicalExcellence: '医療の優位性',
      convenience: '利便性と快適さ',
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
    treatments: {
      title: '上海のトップ医療機関',
      subtitle: '中国有数の病院へアクセス。トップクラスの公立病院から国際的な民間施設まで。',
      hospitalNetwork: '病院ネットワーク',
      publicHospitals: '公立三級甲等病院',
      privateHospitals: '国際民間病院',
      viewAll: '全病院を表示',
      keyDepartments: '重点科室',
      certifications: '国際認証',
      insurance: '保険:',
      all: '全て',
    },
    howItWorks: {
      title: '仕組み',
      subtitle: '最初のお問い合わせから完全回復まで、上海での医療ツーリズムの各段階をサポートします。',
      simpleProcess: 'シンプルなプロセス',
      step1Title: 'AIによる問診',
      step1Desc: 'AIナビゲーターが即座に応答し、あなたのニーズを理解します。',
      step2Title: '医療チームの割り当て',
      step2Desc: '経験豊富な看護師がケアコーディネーターとして同行します。',
      step3Title: '上海への到着',
      step3Desc: '空港から病院までの移動手配、ホテル予約を含む完全なサポート。',
      step4Title: '治療とリカバリー',
      step4Desc: '専門医の治療、バイリンガルサポート、術後ケアの完璧な統合。',
    },
    careTeam: {
      title: 'バイリンガル登録看護師',
      subtitle: '上海での医療の旅の各段階における専任のヘルスケアコンパニオン。',
      expertTeam: '専門ケアチーム',
      ispnCertified: 'ISPN認定',
      ispnDesc: '国際看護基準',
      credentialsTitle: '看護師の資格',
      servicesTitle: '提供サービス',
      nursingCare: 'バイリンガル看護',
      appointmentCoordination: '予約調整',
      translationServices: '通訳サービス',
      transportation: '交通手配',
      medicalReports: '医療レポートの翻訳',
      emergencySupport: '緊急時サポート',
    },
    trust: {
      title: 'なぜ私たちを信じていただけるのか',
      subtitle: '透明度、安全性、結果に焦点を当てた確立されたプロセス。',
      trustPillars: '信頼の基盤',
      safety: '安全性',
      transparency: '透明性',
      quality: '品質',
      support: 'サポート',
      safetyDesc: 'すべての提携病院は国際基準を満たしています。',
      transparencyDesc: '料金、リスク、代替案を明確に説明します。',
      qualityDesc: '厳しい基準を満たす医師と病院のみを提携先としています。',
      supportDesc: '24時間体制でのサポートで安心です。',
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
      cta: '今日から医療ツーリズムを始めましょう',
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
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shanghaimed-lang')
      if (saved === 'en' || saved === 'ja') return saved
    }
    return 'en'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('shanghaimed-lang', lang)
      document.documentElement.lang = lang
    }
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

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