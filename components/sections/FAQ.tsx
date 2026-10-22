'use client'

import React from 'react'
import Link from 'next/link'
import { HelpCircle, MessageCircle } from 'lucide-react'
import Card from '../ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'

const FAQ: React.FC = () => {
  const { t, language } = useLanguage()
  const faqPath = language === 'en' ? '/faq' : `/${language}/faq`
  const whatsappHref = language === 'ja' ? 'https://line.me/ti/p/cD_Ed4GHBM' : 'https://wa.me/+8613818274110'

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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

        {/* Two action cards */}
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-5">
          {/* FAQ page link */}
          <Link href={faqPath} className="group">
            <Card className="p-7 h-full transition-all duration-300 hover:ring-2 hover:ring-accent/30 hover:-translate-y-0.5 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <HelpCircle className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors">
                    {t('faq.viewAll')}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {t('faq.viewAllDesc')}
                  </p>
                  <span className="inline-flex items-center gap-1 text-accent font-medium text-sm group-hover:gap-2 transition-all">
                    {t('faq.browseFaq')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </span>
                </div>
              </div>
            </Card>
          </Link>

          {/* Direct contact */}
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="p-7 h-full transition-all duration-300 hover:ring-2 hover:ring-accent/30 hover:-translate-y-0.5 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors">
                    {t('faq.stillTitle')}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {t('faq.whatsappDesc')}
                  </p>
                  <span className="inline-flex items-center gap-1 text-accent font-medium text-sm group-hover:gap-2 transition-all">
                    {t('faq.whatsappCta')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </span>
                </div>
              </div>
            </Card>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ
