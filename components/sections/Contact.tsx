'use client'

import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { events } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'

// 下拉选项：value 保持英文（提交后端的数据不变），仅显示文案随语言切换
const COUNTRY_OPTIONS = [
  { value: 'United States', key: 'United States' },
  { value: 'United Kingdom', key: 'United Kingdom' },
  { value: 'Canada', key: 'Canada' },
  { value: 'Australia', key: 'Australia' },
  { value: 'Japan', key: 'Japan' },
  { value: 'South Korea', key: 'South Korea' },
  { value: 'Singapore', key: 'Singapore' },
  { value: 'Germany', key: 'Germany' },
  { value: 'France', key: 'France' },
]

const MEDICAL_NEEDS_OPTIONS = [
  { value: 'consultation', key: 'consultation' },
  { value: 'cardiology', key: 'cardiology' },
  { value: 'neurology', key: 'neurology' },
  { value: 'oncology', key: 'oncology' },
  { value: 'orthopedics', key: 'orthopedics' },
  { value: 'checkup', key: 'checkup' },
  { value: 'dental', key: 'dental' },
  { value: 'plastic', key: 'plastic' },
  { value: 'other', key: 'other' },
]

const MEDICAL_NEEDS_FALLBACK: Record<string, string> = {
  consultation: 'Medical Consultation',
  cardiology: 'Cardiology',
  neurology: 'Neurology',
  oncology: 'Oncology',
  orthopedics: 'Orthopedics',
  checkup: 'Health Check-up',
  dental: 'Dental Care',
  plastic: 'Plastic Surgery',
  other: 'Other',
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    email: '',
    phone: '',
    medicalNeeds: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showCustomCountry, setShowCustomCountry] = useState(false)
  const { t, language } = useLanguage()

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'Other') {
      setShowCustomCountry(true);
      setFormData((prev) => ({ ...prev, country: '' }));
    } else {
      setShowCustomCountry(false);
      setFormData((prev) => ({ ...prev, country: val }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    events.formSubmit('contact')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          country: formData.country,
          phone: formData.phone,
          medicalNeeds: formData.medicalNeeds,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert(t('contact.alertFail'))
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(t('contact.alertFail'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // 医疗需求选项翻译（缺失时回退英文）
  const getNeedLabel = (key: string) => {
    const translated = t(`contact.medicalNeeds.${key}`)
    return translated !== `contact.medicalNeeds.${key}` ? translated : MEDICAL_NEEDS_FALLBACK[key]
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            {t('contact.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {language === 'ja' ? (
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#06C755]/10 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#06C755]" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{t('contact.lineTitle')}</h3>
                  <p className="text-sm text-gray-500">{t('contact.lineDesc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-28 h-28 shrink-0 rounded-xl border border-gray-100 overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/line-qr.jpg" alt={t('contact.lineQrAlt')} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{t('contact.lineIdLabel')}</p>
                  <p className="text-sm font-semibold text-gray-800 mb-3 break-all">{t('contact.lineId')}</p>
                  <Button
                    href="https://line.me/ti/p/cD_Ed4GHBM"
                    variant="outline"
                    className="w-full border-[#06C755] text-[#06C755] hover:bg-[#06C755] hover:text-white"
                    onClick={() => events.lineClick()}
                  >
                    {t('contact.lineButton')}
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">{t('contact.lineScanHint')}</p>
                </div>
              </div>
            </Card>
            ) : (
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{t('contact.whatsappTitle')}</h3>
                  <p className="text-sm text-gray-500">{t('contact.whatsappDesc')}</p>
                </div>
              </div>
              <Button
                href="https://wa.me/8613818274110"
                variant="outline"
                className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                onClick={() => events.whatsappClick()}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('contact.whatsapp')}
              </Button>
            </Card>
            )}

            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">{t('contact.locationLabel')}</h4>
                    <p className="text-sm text-gray-600">
                      {t('contact.locationValue')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">
                      {t('contact.responseLabel')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('contact.responseValue')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary">{t('contact.emailLabel')}</h4>
                    <a href="mailto:hello@shanghaimedhealth.com" className="text-sm text-gray-600 hover:text-primary transition-colors">
                      hello@shanghaimedhealth.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent-50 rounded-full flex items-center justify-center">
                  <Send className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {t('contact.successTitle')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('contact.successMessage')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    {t('contact.sendAnother')}
                  </Button>
                  {language === 'ja' ? (
                    <Button
                      href="https://line.me/ti/p/cD_Ed4GHBM"
                      variant="outline"
                      className="border-[#06C755] text-[#06C755] hover:bg-[#06C755] hover:text-white"
                      onClick={() => events.lineClick()}
                    >
                      {t('contact.lineButton')}
                    </Button>
                  ) : (
                  <Button
                    href="https://wa.me/8613818274110"
                    variant="outline"
                    className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                    onClick={() => events.whatsappClick()}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t('contact.whatsapp')}
                  </Button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('contact.emailLabel2')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('contact.countryLabel')}
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    value={showCustomCountry ? 'Other' : formData.country}
                    onChange={handleCountryChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                  >
                    <option value="">{t('contact.countryPlaceholder')}</option>
                    {COUNTRY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.value}</option>
                    ))}
                    <option value="Other">{t('contact.otherCountry')}</option>
                  </select>
                  {showCustomCountry && (
                    <input
                      type="text"
                      name="customCountry"
                      placeholder={t('contact.otherCountryPlaceholder')}
                      required
                      onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                      className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    />
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('contact.phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    placeholder={t('contact.phonePlaceholder')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="medicalNeeds"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('contact.medicalNeedsLabel')}
                  </label>
                  <select
                    id="medicalNeeds"
                    name="medicalNeeds"
                    required
                    value={formData.medicalNeeds}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                  >
                    <option value="">{t('contact.medicalNeedsPlaceholder')}</option>
                    {MEDICAL_NEEDS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{getNeedLabel(option.key)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none"
                    placeholder={t('contact.messagePlaceholder')}
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t('contact.submitting')}
                    </>
                  ) : (
                    <>
                      {t('contact.submit')}
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  {t('contact.privacyNote')}
                </p>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Contact
