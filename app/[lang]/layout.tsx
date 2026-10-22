import { LanguageProvider } from '@/contexts/LanguageContext'
import type { Language } from '@/contexts/LanguageContext'
import { isValidLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shanghaimedhealth.com'

// Locale-specific metadata
const localeMetadata: Record<string, { title: string; description: string; ogLocale: string }> = {
  ja: {
    title: 'ShanghaiMed - 上海のワールドクラス医療',
    description: '上海のトップ専門医による無料・秘密厳守の医療相談。14の公立三甲病院と5つの国際病院にアクセス。透明な料金 — エッセンシャルケア$1,000/3日、コンプレックスケア$1,650/5日、追加同伴$50/時間。三か国語対応看護師、保険ダイレクトビリング、24時間サポート。',
    ogLocale: 'ja_JP',
  },
  ar: {
    title: 'ShanghaiMed - رعاية طبية عالمية المستوى في شنغهاي',
    description: 'استشارة طبية مجانية وسرية مع كبار المتخصصين في شنغهاي. الوصول إلى 14 مستشفى حكومياً من الفئة 3A و5 مستشفيات دولية. أسعار شفافة — كونسيرج الرعاية الأساسية 1000 دولار/3 أيام، الرعاية المعقدة 1650 دولار/5 أيام، الساعات الإضافية 50 دولار/ساعة.',
    ogLocale: 'ar_SA',
  },
  ru: {
    title: 'ShanghaiMed - Медицинская помощь мирового уровня в Шанхае',
    description: 'Бесплатная конфиденциальная консультация с ведущими специалистами Шанхая. Доступ к 14 государственным больницам категории 3А и 5 международным больницам. Прозрачные цены — Базовый уход $1,000/3 дня, Комплексный уход $1,650/5 дней, доп. часы $50/час.',
    ogLocale: 'ru_RU',
  },
  mn: {
    title: 'ShanghaiMed - Дэлхийн түвшний эмнэлгийн үйлчилгээ Шанхайд',
    description: 'Шанхайн шилдэг мэргэжилтнүүдтэй үнэгүй, нууцлалтай эмнэлгийн зөвлөгөө. 14 улсын 3А эмнэлэг, 5 олон улсын эмнэлэгт холбогдоно. Ил тод үнэ — Үндсэн асрамж $1,000/3 өдөр, Нарийн асрамж $1,650/5 өдөр, нэмэлт цаг $50/цаг.',
    ogLocale: 'mn_MN',
  },
}

// Generate static params for non-English locales
export function generateStaticParams() {
  return [{ lang: 'ja' }, { lang: 'ar' }, { lang: 'ru' }, { lang: 'mn' }]
}

export const dynamicParams = false

// Generate locale-specific metadata with hreflang alternates
export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as string
  const meta = localeMetadata[lang] || localeMetadata.ar

  const hreflangBase = siteUrl
  const alternates = {
    languages: {
      en: `${hreflangBase}/`,
      ja: `${hreflangBase}/ja`,
      ar: `${hreflangBase}/ar`,
      ru: `${hreflangBase}/ru`,
      mn: `${hreflangBase}/mn`,
    },
  }

  return {
    title: {
      default: meta.title,
      template: `%s | ShanghaiMed`,
    },
    description: meta.description,
    openGraph: {
      locale: meta.ogLocale,
      url: `${hreflangBase}/${lang}`,
      siteName: 'ShanghaiMed',
      type: 'website',
    },
    alternates,
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isValidLocale(params.lang) || params.lang === 'en') {
    notFound()
  }

  return (
    <LanguageProvider locale={params.lang as Language}>
      {children}
    </LanguageProvider>
  )
}
