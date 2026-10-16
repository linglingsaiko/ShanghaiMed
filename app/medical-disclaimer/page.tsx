'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function MedicalDisclaimerPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('medicalDisclaimer.title')}</h1>
        <p className="text-gray-500 mb-12">{t('medicalDisclaimer.lastUpdated')}</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r">
              <p className="text-amber-900 font-semibold m-0">
                {t('medicalDisclaimer.warning')}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">{t('medicalDisclaimer.whatWeAre.heading')}</h2>
            <p>{t('medicalDisclaimer.whatWeAre.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">{t('medicalDisclaimer.whatWeDoNotDo.heading')}</h2>
            <ul>
              <li>{t('medicalDisclaimer.whatWeDoNotDo.item1')}</li>
              <li>{t('medicalDisclaimer.whatWeDoNotDo.item2')}</li>
              <li>{t('medicalDisclaimer.whatWeDoNotDo.item3')}</li>
              <li>{t('medicalDisclaimer.whatWeDoNotDo.item4')}</li>
              <li>{t('medicalDisclaimer.whatWeDoNotDo.item5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">{t('medicalDisclaimer.clinicalResponsibility.heading')}</h2>
            <p>{t('medicalDisclaimer.clinicalResponsibility.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">{t('medicalDisclaimer.contentInformational.heading')}</h2>
            <p>{t('medicalDisclaimer.contentInformational.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">{t('medicalDisclaimer.emergencies.heading')}</h2>
            <p>{t('medicalDisclaimer.emergencies.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">{t('medicalDisclaimer.noGuarantee.heading')}</h2>
            <p>{t('medicalDisclaimer.noGuarantee.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">{t('medicalDisclaimer.contact.heading')}</h2>
            <address className="not-italic">
              {t('medicalDisclaimer.contact.company')}<br />
              {t('medicalDisclaimer.contact.address')}<br />
              Email: <a href={`mailto:${t('medicalDisclaimer.contact.email')}`} className="text-teal-600 hover:underline">{t('medicalDisclaimer.contact.email')}</a>
            </address>
          </section>
        </div>
      </div>
    </div>
  )
}
