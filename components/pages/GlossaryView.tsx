'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { glossaryEn, glossaryEnUi } from '@/lib/content/glossary.en'
import { glossaryAr, glossaryArCategories, glossaryArUi, type GlossaryTerm } from '@/lib/content/glossary.ar'
import { glossaryRu, glossaryRuCategories, glossaryRuUi } from '@/lib/content/glossary.ru'

export default function GlossaryView() {
  const { language, localePath } = useLanguage()
  const isAr = language === 'ar'
  const isRu = language === 'ru'
  const terms: GlossaryTerm[] = isAr ? glossaryAr : isRu ? glossaryRu : glossaryEn
  const ui = isAr ? glossaryArUi : isRu ? glossaryRuUi : glossaryEnUi

  // Preserve the declared category order.
  const categories = isAr || isRu
    ? [...(isAr ? glossaryArCategories : glossaryRuCategories)].filter(c => terms.some(t => t.category === c))
    : Array.from(new Set(terms.map(t => t.category)))

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <p className="text-sm text-teal-600 font-medium mb-2">{ui.badge}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{ui.title}</h1>
          <p className="text-lg text-gray-600">
            {isAr ? glossaryArUi.intro(terms.length) : `${terms.length} ${ui.intro}`}
          </p>
          <p className="text-sm text-gray-500 mt-4">{ui.lastReviewed}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick navigation */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat, ci) => (
            <a
              key={cat}
              href={`#cat-${ci}`}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors"
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Term sections */}
        {categories.map((cat, ci) => (
          <section key={cat} id={`cat-${ci}`} className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              {cat}
            </h2>
            <dl className="space-y-6">
              {terms
                .filter(t => t.category === cat)
                .map((t, ti) => (
                  <div
                    key={`${t.term}-${ti}`}
                    id={`term-${ci}-${ti}`}
                    className="bg-white rounded-lg border p-6 scroll-mt-24"
                  >
                    <dt className="text-lg font-semibold text-gray-900">{t.term}</dt>
                    {t.aliases && (
                      <p className="text-sm text-gray-500 mt-1">
                        {ui.aka} {t.aliases.join(' · ')}
                      </p>
                    )}
                    <dd className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
                      {t.definition}
                    </dd>
                    {t.context && (
                      <dd className="mt-3 text-sm text-gray-600 bg-gray-50 rounded p-3 leading-relaxed">
                        {t.context}
                      </dd>
                    )}
                  </div>
                ))}
            </dl>
          </section>
        ))}

        {/* Related links */}
        <div className="mt-12 bg-teal-50 border border-teal-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{ui.goDeeper}</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={localePath('/research')} className="text-teal-700 font-medium hover:underline">
                {ui.researchLink}
              </a>
              <span className="text-gray-600">{ui.researchDesc}</span>
            </li>
            <li>
              <a href={localePath('/editorial-policy')} className="text-teal-700 font-medium hover:underline">
                {ui.editorialLink}
              </a>
              <span className="text-gray-600">{ui.editorialDesc}</span>
            </li>
            <li>
              <a href={localePath('/founder')} className="text-teal-700 font-medium hover:underline">
                {ui.founderLink}
              </a>
              <span className="text-gray-600">{ui.founderDesc}</span>
            </li>
            <li>
              <a href={localePath('/blog')} className="text-teal-700 font-medium hover:underline">
                {ui.blogLink}
              </a>
              <span className="text-gray-600">{ui.blogDesc}</span>
            </li>
          </ul>
        </div>

        <p className="text-xs text-gray-400 mt-8">{ui.disclaimer}</p>
      </div>
    </div>
  )
}
