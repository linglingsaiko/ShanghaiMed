'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import Card from '../ui/Card'
import { faqData } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { t, tArr, language } = useLanguage()

  // 翻译表中的 FAQ 数据（缺失时回退英文常量）
  const translatedFaqs = tArr('faq.items')
  const faqs =
    translatedFaqs.length === faqData.length
      ? translatedFaqs
      : faqData

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('faq.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            {t('faq.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq: any, index: number) => (
            <Card
              key={index}
              className={`mb-4 transition-all duration-300 ${
                openIndex === index ? 'ring-2 ring-accent' : ''
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-start gap-4 flex-1">
                  <HelpCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-primary text-lg">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="pl-10">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Still Have Questions */}
        <Card className="mt-12 p-8 text-center max-w-3xl mx-auto bg-gradient-to-r from-primary to-primary-600">
          <h3 className="text-2xl font-bold text-white mb-6">
            {t('faq.stillTitle')}
          </h3>
          <div className="flex justify-center">
            <a
              href={language === 'ja' ? 'https://line.me/ti/p/cD_Ed4GHBM' : 'https://wa.me/+8613818274110'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              {t('faq.whatsappCta')}
            </a>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default FAQ
