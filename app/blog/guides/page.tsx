import type { Metadata } from 'next'
import Link from 'next/link'
import { getSortedPosts } from '@/lib/blog-server'

export const dynamic = 'force-static'
import {
  languageAlternates,
  localizedUrl,
  OG_LOCALES,
  resolvePublicLocale,
} from '@/lib/public-seo'
import type { Locale } from '@/lib/i18n'
import type { BlogPost } from '@/lib/types'

type GuidesPageProps = { params?: { lang?: string } }

const guidesMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Practical Guides for Medical Care in China',
    description: 'Clear answers for international patients: choosing a hospital, requesting an appointment in English, preparing records, understanding costs, and planning follow-up.',
  },
  ja: {
    title: '中国での医療受診実用ガイド',
    description: '病院の選び方、英語での予約方法、診療記録の準備、費用の理解、フォローアップの計画まで、海外患者向けの実用的な回答。',
  },
  ar: {
    title: 'أدلة عملية للرعاية الطبية في الصين',
    description: 'إجابات واضحة للمرضى الدوليين: اختيار المستشفى، طلب موعد بالإنجليزية، إعداد السجلات، فهم التكاليف، والتخطيط للمتابعة.',
  },
  ru: {
    title: 'Практические руководства по медицинскому обслуживанию в Китае',
    description: 'Понятные ответы для иностранных пациентов: выбор больницы, запись на приём на английском, подготовка документов, расходы и последующее наблюдение.',
  },
  mn: {
    title: 'Хятадад эмчилгээ авах практик гарын авлага',
    description: 'Гадаад өвчтөнүүдэд зориулсан тодорхой хариултууд: эмнэлэг сонгох, англиар цаг захиалах, бичиг баримт бэлдэх, зардал ойлгох, дараагийн хяналт төлөвлөх.',
  },
  ms: {
    title: 'Panduan Praktikal untuk Penjagaan Kesihatan di China',
    description: 'Jawapan jelas untuk pesakit antarabangsa: memilih hospital, meminta temu janji dalam Bahasa Inggeris, menyediakan rekod, memahami kos, dan merancang susulan.',
  },
  id: {
    title: 'Panduan Praktis untuk Perawatan Medis di Tiongkok',
    description: 'Jawaban jelas untuk pasien internasional: memilih rumah sakit, meminta janji dalam Bahasa Inggris, menyiapkan rekam medis, memahami biaya, dan merencanakan tindak lanjut.',
  },
}

// ─── Category display configuration ─────────────────────────────────────────
interface CategoryDisplay {
  label: Record<Locale, string>
  icon: string
  order: number
}

const CATEGORY_DISPLAY: Record<string, CategoryDisplay> = {
  'Medical Tourism': {
    label: { en: 'Planning Your Visit', ja: '受診の計画', ar: 'التخطيط لزيارتك', ru: 'Планирование визита', mn: 'Аяллыг төлөвлөх', ms: 'Merancang Lawatan Anda', id: 'Merencanakan Kunjungan Anda' },
    icon: '🗺️',
    order: 1,
  },
  'Guide': {
    label: { en: 'Practical Guides', ja: '実用ガイド', ar: 'أدلة عملية', ru: 'Практические руководства', mn: 'Практик гарын авлага', ms: 'Panduan Praktikal', id: 'Panduan Praktis' },
    icon: '📋',
    order: 2,
  },
  'TCM': {
    label: { en: 'Traditional Chinese Medicine', ja: '伝統中医学', ar: 'الطب الصيني التقليدي', ru: 'Традиционная китайская медицина', mn: 'Уламжлалт Хятад анагаах ухаан', ms: 'Perubatan Tradisional Cina', id: 'Pengobatan Tradisional Tiongkok' },
    icon: '🌿',
    order: 3,
  },
  'Patient Story': {
    label: { en: 'Patient Stories', ja: '患者の体験談', ar: 'قصص المرضى', ru: 'Истории пациентов', mn: 'Өвчтөнүүдийн түүх', ms: 'Kisah Pesakit', id: 'Kisah Pasien' },
    icon: '💬',
    order: 4,
  },
  'Health Checkup': {
    label: { en: 'Health Checkups', ja: '健康診断', ar: 'الفحوصات الصحية', ru: 'Медицинские осмотры', mn: 'Эрүүл мэндийн үзлэг', ms: 'Pemeriksaan Kesihatan', id: 'Pemeriksaan Kesehatan' },
    icon: '🩺',
    order: 5,
  },
  'Visa Guide': {
    label: { en: 'Visa & Logistics', ja: 'ビザ・渡航手続き', ar: 'التأشيرة والسفر', ru: 'Виза и логистика', mn: 'Виз ба аялал', ms: 'Visa & Logistik', id: 'Visa & Logistik' },
    icon: '✈️',
    order: 6,
  },
}

const DEFAULT_CATEGORY: CategoryDisplay = {
  label: { en: 'More Guides', ja: 'その他のガイド', ar: 'المزيد من الأدلة', ru: 'Другие руководства', mn: 'Бусад гарын авлага', ms: 'Panduan Lain', id: 'Panduan Lainnya' },
  icon: '📚',
  order: 99,
}

function groupPostsByCategory(posts: BlogPost[]): { key: string; display: CategoryDisplay; posts: BlogPost[] }[] {
  const groups = new Map<string, BlogPost[]>()
  for (const post of posts) {
    const cat = post.category || 'Other'
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push(post)
  }
  return Array.from(groups.entries())
    .map(([key, groupPosts]) => ({
      key,
      display: CATEGORY_DISPLAY[key] || DEFAULT_CATEGORY,
      posts: groupPosts,
    }))
    .sort((a, b) => a.display.order - b.display.order)
}

// ─── Page Component ─────────────────────────────────────────────────────────

export default function GuidesPage({ params }: GuidesPageProps) {
  const lang = resolvePublicLocale(params?.lang)
  const allPosts = getSortedPosts(lang)
  const groups = groupPostsByCategory(allPosts)

  return (
    <div className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="section-container">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 px-4" aria-label="Breadcrumb">
          <Link href="/" className="text-teal-700 hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link href="/blog" className="text-teal-700 hover:underline">Blog</Link>
          <span className="mx-1">/</span>
          <span>Guides</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {guidesMetadata[lang].title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {guidesMetadata[lang].description}
          </p>
          <p className="text-sm text-gray-400 mt-4">
            By Sara Ma, RN (ISPN), B.Sc. Nursing, Shanghai Jiao Tong University School of Medicine · Last updated Nov 2026
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 px-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-700 text-white text-sm font-medium">
            All Guides ({allPosts.length})
          </span>
          {groups.map(g => (
            <a
              key={g.key}
              href={`#cat-${g.key.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-teal-50 hover:border-teal-300 transition-colors"
            >
              {g.display.icon} {g.display.label[lang]}
            </a>
          ))}
        </div>

        {/* Category Sections */}
        {groups.map(group => (
          <section
            key={group.key}
            id={`cat-${group.key.toLowerCase().replace(/\s+/g, '-')}`}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6 px-4">
              <span className="text-2xl">{group.display.icon}</span>
              <h2 className="text-2xl font-bold text-gray-900">
                {group.display.label[lang]}
              </h2>
              <span className="text-sm text-gray-400 ml-2">
                {group.posts.length} {group.posts.length === 1 ? 'guide' : 'guides'}
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
              {group.posts.map(post => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-teal-300 transition-all flex flex-col"
                >
                  <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mb-3 w-fit">
                    {group.display.label[lang]}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-teal-700 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm mt-auto pt-3 border-t border-gray-100">
                    <span className="text-gray-400">
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-teal-700 font-medium hover:text-teal-900"
                    >
                      Read guide →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="text-center mt-16 px-4">
          <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Need help planning your medical visit?
            </h2>
            <p className="text-gray-600 mb-6">
              Whether you need a booking route, help with one part of your visit, or full coordination — we&apos;re here.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/#contact"
                className="inline-flex items-center px-6 py-3 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800 transition-colors"
              >
                Get Coordination Help
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex items-center px-6 py-3 border border-teal-700 text-teal-700 font-semibold rounded-lg hover:bg-teal-50 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export function generateMetadata({ params }: { params?: { lang?: string } }): Metadata {
  const lang = resolvePublicLocale(params?.lang)
  const meta = guidesMetadata[lang]
  const url = localizedUrl(lang, '/blog/guides')

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: languageAlternates('/blog/guides'),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      locale: OG_LOCALES[lang],
      siteName: 'ShanghaiMed',
      type: 'website',
    },
    robots: { index: true, follow: true },
  }
}
