'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { studies } from '@/lib/content/research.en'
import { researchAr, researchArUi } from '@/lib/content/research.ar'

const categoriesBase = [
  { key: 'patient-experience', enLabel: 'Patient Experience', count: 0 },
  { key: 'medical-tourism', enLabel: 'Medical Tourism', count: 0 },
  { key: 'quality-safety', enLabel: 'Quality & Safety', count: 0 },
  { key: 'cost-value', enLabel: 'Cost & Value', count: 0 },
  { key: 'tcm', enLabel: 'Traditional Chinese Medicine', count: 0 },
  { key: 'dental', enLabel: 'Dental', count: 0 },
  { key: 'checkup', enLabel: 'Health Checkup', count: 0 },
]
const categoryCounts = categoriesBase.map(c => ({
  ...c,
  count: studies.filter(s => s.category === c.key).length,
}))

export default function ResearchView() {
  const { language, localePath } = useLanguage()
  const isAr = language === 'ar'
  const ui = isAr ? researchArUi : null

  const categories = [
    { key: 'all', label: isAr ? 'الكل' : 'All', count: studies.length },
    ...categoryCounts.map(c => ({
      key: c.key,
      label: isAr ? ui!.categoryLabels[c.key] : c.enLabel,
      count: c.count,
    })),
  ]

  const getField = (id: number, en: string, arKey: keyof typeof researchAr[0]) =>
    isAr && researchAr[id] ? researchAr[id][arKey] : en

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <p className="text-sm text-teal-600 font-medium mb-2">
            {isAr ? ui!.badge : 'Open Reference'}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isAr ? ui!.title : 'Medical Travel to China: Research Library'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {isAr
              ? `${studies.length} ${ui!.intro}`
              : `${studies.length} peer-reviewed studies and official data sources on international patient experience, healthcare quality, and medical tourism in China. Each entry is verified against its original publication and summarised with study type, sample size, key finding, and stated limitations.`}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            {isAr ? ui!.lastReviewed : 'Last reviewed and verified: October 10, 2026 · Each entry cross-checked against its original PubMed record or official publication.'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Why this page exists */}
        <div className="bg-white rounded-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isAr ? ui!.whyTitle : 'Why this page exists'}
          </h2>
          <div className="prose prose-gray max-w-none">
            <p>
              {isAr
                ? ui!.whyP1
                : 'Medical tourism to China is one of the most discussed topics in global health travel — and one of the most poorly sourced. Claims about cost savings, quality rankings, and patient outcomes circulate widely without traceable references. Numbers are often lifted from a single promotional source and presented as settled fact.'}
            </p>
            <p>
              {isAr
                ? ui!.whyP2
                : 'This library was built for patients, journalists, health writers, clinicians, and researchers who need the primary record rather than a repeated claim. Every entry links to a publication we opened and checked; nothing here is included on the strength of a secondary summary alone. Findings are phrased with hedged language ("was associated with", "may reduce") because that is what the underlying study designs support, and every entry carries at least one stated limitation so the weaknesses travel with the numbers.'}
            </p>
            <p className="text-sm text-gray-500">
              <strong>{isAr ? ui!.whyNote.split(':')[0] + ':' : 'What this page is not:'}</strong>
              {' '}
              {isAr
                ? ui!.whyNote.split(':').slice(1).join(':').trim()
                : 'It is not a clinical guideline, not a complete systematic search of the literature, and not medical advice. Inclusion here means a study exists and reports what we describe — not that its finding is definitive.'}
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <span
              key={cat.key}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-teal-50 text-teal-700 border border-teal-200"
            >
              {cat.label} ({cat.count})
            </span>
          ))}
        </div>

        {/* Studies */}
        <div className="space-y-6">
          {studies.map(study => (
            <div key={study.id} className="bg-white rounded-lg border overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        {isAr ? ui!.categoryLabels[study.category] : categories.find(c => c.key === study.category)?.label}
                      </span>
                      <span className="text-sm text-gray-500">{study.year}</span>
                      {study.pmid && (
                        <span className="text-xs text-gray-400">PMID {study.pmid}</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {study.url ? (
                        <a href={study.url} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:text-teal-900 hover:underline">
                          {study.title}
                        </a>
                      ) : (
                        study.title
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{study.source}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {isAr ? ui!.fieldLabels.type : 'Study Type'}
                    </dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {getField(study.id, study.type, 'type')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {isAr ? ui!.fieldLabels.population : 'Population / N'}
                    </dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {getField(study.id, study.population, 'population')}
                    </dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {isAr ? ui!.fieldLabels.finding : 'Key Finding'}
                    </dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {getField(study.id, study.finding, 'finding')}
                    </dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide text-amber-600">
                      {isAr ? ui!.fieldLabels.limitation : 'Limitations'}
                    </dt>
                    <dd className="text-sm text-amber-800 mt-1 bg-amber-50 rounded p-2">
                      {getField(study.id, study.limitation, 'limitation')}
                    </dd>
                  </div>
                </div>

                {study.url && (
                  <div className="mt-4 pt-4 border-t">
                    <a
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-teal-600 hover:text-teal-800"
                    >
                      {isAr ? ui!.viewOriginal : 'View original publication'}
                      <svg className={`${isAr ? 'mr-1 rotate-180' : 'ml-1'} w-4 h-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Blog ↔ Research cross-link */}
        <div className="mt-12 bg-teal-50 border border-teal-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {isAr ? ui!.crossTitle : 'Research behind the articles'}
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            {isAr
              ? <>
                  {ui!.crossBody}{' '}
                  <a href={localePath('/blog')} className="text-teal-700 font-medium hover:underline">
                    {ui!.crossBlog}
                  </a>
                  {' '}{ui!.crossTail}
                </>
              : <>
                  Every article we publish is grounded in peer-reviewed evidence. The studies above form the evidence base for our{' '}
                  <a href={`${localePath('/blog')}`} className="text-teal-700 font-medium hover:underline">blog guides</a>
                  {' '}on choosing hospitals, understanding costs, preparing for a dental or TCM visit, and navigating insurance. Read a guide first, then trace every claim back to the original research.
                </>}
          </p>
          <p className="text-xs text-gray-500">
            {isAr ? (
              <>
                {ui!.lastReviewed.split('·')[0].trim()} ·{' '}
                <a href={localePath('/editorial-policy')} className="hover:underline">{ui!.disclaimerPolicy}</a>
                {' · '}
                <a href={localePath('/glossary')} className="hover:underline">{ui!.disclaimerGlossary}</a>
              </>
            ) : (
              <>
                Last reviewed: October 2026 ·{' '}
                <a href={`${localePath('/editorial-policy')}`} className="hover:underline">Editorial Policy</a>
                {' · '}
                <a href={`${localePath('/glossary')}`} className="hover:underline">Medical tourism glossary</a>
              </>
            )}
          </p>
        </div>

        {/* Footer disclaimer */}
        <div className="mt-6 bg-gray-100 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            {isAr ? ui!.disclaimerTitle : 'Disclaimer'}
          </h3>
          <p className="text-sm text-gray-600">
            {isAr ? ui!.disclaimer : 'This research library is maintained by ShanghaiMed for informational purposes only. It does not constitute medical advice, diagnosis, or treatment recommendations. The inclusion of a study does not imply endorsement of its conclusions. Patients considering medical treatment in China should consult with qualified healthcare providers and verify all information independently. ShanghaiMed may benefit from patients choosing to use its services after reading this page.'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {isAr ? (
              <>
                {ui!.disclaimerSee}{' '}
                <a href={localePath('/editorial-policy')} className="text-teal-600 hover:underline">{ui!.disclaimerPolicy}</a>
                {' '}{ui!.disclaimerHow}
              </>
            ) : (
              <>
                See our{' '}
                <a href={`${localePath('/editorial-policy')}`} className="text-teal-600 hover:underline">Editorial Policy</a>
                {' '}for how we handle sourcing, corrections, and conflicts of interest.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
