'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface AuthorBioProps {
  author?: string
}

const text = {
  en: {
    writtenBy: 'Written by',
    role: 'Founder & Medical Director',
    bio: "ISPN-certified registered nurse with 10+ years of experience in premium healthcare operations and guiding international patients through Shanghai's healthcare system. Founded ShanghaiMed to bridge the gap between world-class medical care and the patients who need it most.",
    learnMore: 'Learn more about Sara Ma',
  },
  ja: {
    writtenBy: '執筆者',
    role: '創業者 兼 メディカルディレクター',
    bio: 'ISPN認定看護師。10年以上にわたりハイエンド医療機関の運営と、国際患者の上海での受診サポートに従事。世界水準の医療を、それを最も必要とする患者に届けるためShanghaiMedを創業。',
    learnMore: 'Sara Maについて詳しく見る',
  },
}

export default function AuthorBio({ author }: AuthorBioProps) {
  const { language } = useLanguage()
  const t = text[language]

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <div className="bg-gray-50 rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex-shrink-0">
            <Image
              src="/images/sara-ma-headshot.jpg"
              alt="Sara Ma"
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-teal-100"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs text-teal-600 font-medium uppercase tracking-wide mb-1">{t.writtenBy}</p>
            <h3 className="text-lg font-bold text-gray-900">Sara Ma</h3>
            <p className="text-sm text-teal-600 font-medium mb-3">{t.role}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{t.bio}</p>
            <Link
              href="/founder"
              className="inline-flex items-center mt-4 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
            >
              {t.learnMore}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
