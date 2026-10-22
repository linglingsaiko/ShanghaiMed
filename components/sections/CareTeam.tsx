'use client'

import React from 'react'
import { CheckCircle, Stethoscope, Bed, Languages, Heart, Clipboard, Calendar, Map, FileText, Phone, Users } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { nurseServices, nurseCredentials } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'

const CareTeam: React.FC = () => {
  const { t, tArr } = useLanguage()
  const iconMap: Record<string, React.ElementType> = {
    Clipboard,
    Calendar,
    Languages,
    Map,
    FileText,
    Phone,
    Stethoscope,
    Bed,
    Heart,
  }

  // 翻译表数据（缺失时回退英文常量）
  const translatedServices = tArr('careTeam.services')
  const translatedCredentials = tArr('careTeam.credentials')

  return (
    <section id="care-team" className="py-20 lg:py-28 bg-gray-50">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('careTeam.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            {t('careTeam.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('careTeam.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Left Column — ISPN Credentials + Who We Are */}
          <div className="space-y-6">
            {/* Credentials Card */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">
                    {t('careTeam.ispnCertified')}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t('careTeam.ispnDesc')}
                  </p>
                  <p className="text-xs text-accent mt-1">
                    {t('careTeam.ispnIssuer')}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {(translatedCredentials.length === nurseCredentials.length
                  ? translatedCredentials
                  : nurseCredentials
                ).map((credential, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-700 font-medium">{credential.name}</span>
                      {credential.detail && (
                        <p className="text-sm text-gray-500">{credential.detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Who Accompanies You Card — balances left column height */}
            <Card className="p-8 bg-gradient-to-br from-primary to-[#082C42] text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Who Accompanies You</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                Every ShanghaiMed companion is a licensed RN registered with the Shanghai Health Commission — not a sales agent, not a translator with no medical background. Your nurse understands clinical terminology, hospital procedures, and the unwritten rules that make Shanghai's public hospitals move faster.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/10 rounded-lg py-3">
                  <div className="text-2xl font-bold text-white">EN/JP/CN</div>
                  <div className="text-[11px] text-white/70 mt-1">Trilingual</div>
                </div>
                <div className="bg-white/10 rounded-lg py-3">
                  <div className="text-2xl font-bold text-white">ISPN</div>
                  <div className="text-[11px] text-white/70 mt-1">Certified</div>
                </div>
                <div className="bg-white/10 rounded-lg py-3">
                  <div className="text-2xl font-bold text-white">10+</div>
                  <div className="text-[11px] text-white/70 mt-1">Years Experience</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column — Nursing Services (wrapped in a Card for visual balance) */}
          <div>
            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-accent" />
                </div>
                {t('careTeam.servicesTitle')}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {nurseServices.map((service, index) => {
                  const Icon = iconMap[service.icon] || Clipboard
                  const translated = translatedServices[index]
                  const title =
                    translatedServices.length === nurseServices.length && translated?.title
                      ? translated.title
                      : service.title
                  const description =
                    translatedServices.length === nurseServices.length && translated?.description
                      ? translated.description
                      : service.description
                  return (
                    <div key={index} className="p-4 rounded-xl bg-gray-50 hover:bg-accent/5 transition-colors border border-transparent hover:border-accent/20">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h4 className="font-semibold text-primary text-sm mb-1.5">
                        {title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareTeam
