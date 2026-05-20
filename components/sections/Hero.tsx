'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Button from '../ui/Button'
import { events } from '@/lib/analytics'

const Hero: React.FC = () => {
  const stats = [
    '47 International Insurance Direct-Payment Hospitals',
    'ISPN-Certified Bilingual Nurses',
    '24/7 AI & Human Support',
  ]

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary via-primary to-primary-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Shanghai Skyline Placeholder */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-primary to-transparent"></div>
        {/* Placeholder skyline silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 px-4">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="bg-white/30 rounded-t-sm"
              style={{
                height: `${Math.random() * 200 + 50}px`,
                width: '20px',
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-sm text-white/90">{stat}</span>
              </div>
            ))}
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            World-Class Medical Care in Shanghai.{' '}
            <span className="text-accent">At a Fraction of the Cost.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Connect with China&apos;s top hospitals, bilingual nurses, and 24/7
            AI support — all through one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/contact"
              size="lg"
              onClick={() => events.consultationClick()}
              className="group"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button href="/treatments" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Explore Hospitals
            </Button>
          </div>

          {/* Trust Logos Placeholder */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400 mb-6">
              Trusted by patients from 100+ countries
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              {/* Placeholder for hospital/partner logos */}
              {['Huashan', 'Ruijin', 'Renji', 'Zhongshan', 'Jiahui'].map(
                (name) => (
                  <div
                    key={name}
                    className="bg-white/20 px-6 py-3 rounded-lg text-white font-semibold"
                  >
                    {name}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
