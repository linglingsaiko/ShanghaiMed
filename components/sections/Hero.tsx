'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Button from '../ui/Button'
import { events } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'

const Hero: React.FC = () => {
  const { t } = useLanguage()

  const stats = [
    t('hero.badge1'),
    t('hero.badge2'),
    t('hero.badge3'),
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/首屏.png"
          alt="Shanghai Medical"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute left-[16.67%] bottom-0 z-10 w-[83.33%]">
        <div className="max-w-4xl">
          {/* Main Headline + CTA */}
          <div className="flex items-end gap-6 mb-4 md:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              {t('hero.title')}
              <br />
              <span className="text-white">{t('hero.titleHighlight')}</span>
            </h1>
            {/* CTA Button */}
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border-2 border-white text-white font-semibold text-base md:text-lg rounded-full hover:bg-white hover:text-primary transition-all duration-300 whitespace-nowrap"
            >
              {t('hero.cta')}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap"
              >
                <CheckCircle className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
                <span className="text-sm sm:text-base font-bold text-white/90">{stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero
