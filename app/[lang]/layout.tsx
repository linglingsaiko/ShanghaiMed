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
    description: '中国のトップ病院、バイリンガル看護師、24時間AIサポート。上海で世界レベルの医療を低コストで。',
    ogLocale: 'ja_JP',
  },
  ar: {
    title: 'ShanghaiMed - رعاية طبية عالمية المستوى في شنغهاي',
    description: 'تواصل مع أفضل المستشفيات في الصين والممرضات ثنائيات اللغة ودعم الذكاء الاصطناعي على مدار الساعة. رعاية طبية عالمية في شنغهاي.',
    ogLocale: 'ar_SA',
  },
  ru: {
    title: 'ShanghaiMed - Медицинская помощь мирового уровня в Шанхае',
    description: 'Подключитесь к лучшим больницам Китая, двуязычным медсёстрам и поддержке ИИ 24/7. Медицинский туризм в Шанхае.',
    ogLocale: 'ru_RU',
  },
  mn: {
    title: 'ShanghaiMed - Дэлхийн түвшний эмнэлгийн үйлчилгээ Шанхайд',
    description: 'Хятадын шилдэг эмнэлгүүд, хоёр хэлтэй сувилагчид, 24/7 AI дэмжлэг. Шанхай дахь эмнэлгийн аялал жуулчлал.',
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
