'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Youtube } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type FooterLink = { key: string; href: string }

// Array order is stable; labels are looked up by key in the translation table.
const footerLinkStructure: Record<string, FooterLink[]> = {
  about: [
    { key: 'aboutUs', href: '/about' },
    { key: 'ourFounder', href: '/founder' },
    { key: 'whyShanghai', href: '/why-shanghai' },
    { key: 'ourSpecialties', href: '/treatments' },
    { key: 'careTeam', href: '/care-team' },
  ],
  services: [
    { key: 'medicalCheckup', href: '/#treatments' },
    { key: 'tcm', href: '/#treatments' },
    { key: 'surgeries', href: '/#treatments' },
    { key: 'pediatricCare', href: '/#treatments' },
  ],
  support: [
    { key: 'howItWorks', href: '/how-it-works' },
    { key: 'ourStandards', href: '/our-standards' },
    { key: 'faqs', href: '/faq' },
    { key: 'blog', href: '/blog' },
    { key: 'researchLibrary', href: '/research' },
    { key: 'glossary', href: '/glossary' },
  ],
  legal: [
    { key: 'privacyPolicy', href: '/privacy-policy' },
    { key: 'termsOfService', href: '/terms-of-service' },
    { key: 'editorialPolicy', href: '/editorial-policy' },
    { key: 'medicalDisclaimer', href: '/medical-disclaimer' },
    { key: 'refundPolicy', href: '/refund-policy' },
  ],
}

const footerFallback: Record<string, string[]> = {
  about: ['About Us', 'Our Founder', 'Why Shanghai', 'Our Specialties', 'Care Team'],
  services: ['Medical Checkup', 'Traditional Chinese Medicine', 'Surgeries', 'Pediatric Care'],
  support: ['How It Works', 'Our Standards', 'FAQs', 'Blog', 'Research Library', 'Glossary'],
  legal: ['Privacy Policy', 'Terms of Service', 'Editorial Policy', 'Medical Disclaimer', 'Refund Policy'],
}

const Footer: React.FC = () => {
  const { t, tArr, localePath, language } = useLanguage()

  const translateWithFallback = (key: string, fallback: string) => {
    const translated = t(key)
    return translated === key ? fallback : translated
  }

  const labels = (section: string) => tArr(`footer.${section}`)

  const getLinkLabel = (section: string, index: number) => {
    const fallbackLabels = footerFallback[section] || []
    const translatedLabels = labels(section)
    const translated = translatedLabels[index]
    return typeof translated === 'string' ? translated : (fallbackLabels[index] || '')
  }

  const renderLinks = (section: string) => {
    const items = footerLinkStructure[section] || []
    return items.map((link, index) => {
      const englishOnly = link.href === '/our-standards'
      return (
        <li key={`${link.key}-${index}`}>
          <Link
            href={englishOnly ? link.href : localePath(link.href)}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            {getLinkLabel(section, index)}{englishOnly && language !== 'en' ? ' (EN)' : ''}
          </Link>
        </li>
      )
    })
  }

  return (
    <footer className="bg-primary text-white">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold mb-4">
              Shanghai<span className="text-accent">Med</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {translateWithFallback('footer.tagline', 'World-class medical care in Shanghai with bilingual support. Your trusted partner for health and wellness in China.')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@linglingma-r9u6b"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{translateWithFallback('footer.aboutTitle', 'About')}</h4>
            <ul className="space-y-3">{renderLinks('about')}</ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{translateWithFallback('footer.servicesTitle', 'Our Services')}</h4>
            <ul className="space-y-3">{renderLinks('services')}</ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{translateWithFallback('footer.supportTitle', 'Support')}</h4>
            <ul className="space-y-3">{renderLinks('support')}</ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{translateWithFallback('footer.contactTitle', 'Contact Us')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>{translateWithFallback('footer.location', 'Shanghai, China')}</li>
              <li>
                <a href="mailto:hello@shanghaimedhealth.com" className="hover:text-white transition-colors break-all">
                  hello@shanghaimedhealth.com
                </a>
              </li>
              <li>{translateWithFallback('footer.languages', 'English / 中文 / 日本語')}</li>
            </ul>
            <div className="mt-6">
              <Link
                href={localePath('/free-consultation')}
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors text-sm"
              >
                {translateWithFallback('footer.freeConsultation', 'Free Consultation')}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            {renderLinks('legal')}
          </ul>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>{translateWithFallback('footer.copyright', `© ${new Date().getFullYear()} ShanghaiMed. All rights reserved.`)}</p>
            <p>{translateWithFallback('footer.operatedBy', 'Operated by Shanghai Keling Information Technology Co., Ltd.')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
