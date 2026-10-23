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
    description: '上海のトップ専門医による無料・秘密厳守の医療相談。上海の全三甲病院を含む19の提携病院にアクセス。透明な料金 — 無料相談、院内同伴$50/時間、健康診断コンシェルジュ$500/1日、エッセンシャルケア$1,000/3日、手術・延長ケア$1,650/5日。日中対応ISPN認定看護師、保険サポート、24時間サポート。',
    ogLocale: 'ja_JP',
  },
  ar: {
    title: 'ShanghaiMed - رعاية طبية عالمية المستوى في شنغهاي',
    description: 'استشارة طبية مجانية وسرية مع كبار المتخصصين في شنغهاي. الوصول إلى 19 مستشفى شريكاً تشمل جميع مستشفيات الفئة 3A في شنغهاي. أسعار شفافة — استشارة مجانية، مرافقة داخل المستشفى 50 دولار/ساعة، كونسيرج الفحص الصحي 500 دولار/يوم واحد، كونسيرج الرعاية الأساسية 1000 دولار/3 أيام، كونسيرج الجراحة والرعاية الممتدة 1650 دولار/5 أيام. ممرضات يجيدن الإنجليزية والصينية معتمدات من ISPN، دعم التأمين، دعم على مدار الساعة.',
    ogLocale: 'ar_SA',
  },
  ru: {
    title: 'ShanghaiMed - Медицинская помощь мирового уровня в Шанхае',
    description: 'Бесплатная конфиденциальная консультация с ведущими специалистами Шанхая. Доступ к 19 партнёрским больницам, включая все больницы категории 3А Шанхая. Прозрачные цены — бесплатная консультация, очное сопровождение в больнице $50/час, Консьерж для чек-апа $500/1 день, Базовый уход $1,000/3 дня, Консьерж для хирургии и длительного лечения $1,650/5 дней. ISPN-сертифицированные медсёстры со знанием английского и китайского, страховая поддержка, поддержка 24/7.',
    ogLocale: 'ru_RU',
  },
  mn: {
    title: 'ShanghaiMed - Дэлхийн түвшний эмнэлгийн үйлчилгээ Шанхайд',
    description: 'Шанхайн шилдэг мэргэжилтнүүдтэй үнэгүй, нууцлалтай эмнэлгийн зөвлөгөө. Шанхайн бүх 3А эмнэлгийг багтаасан 19 түнш эмнэлэгт холбогдоно. Ил тод үнэ — үнэгүй зөвлөгөө, эмнэлэг дотор дагалдан явах $50/цаг, Эрүүл мэндийн үзлэгийн консьерж $500/1 өдөр, Үндсэн асрамж $1,000/3 өдөр, Мэс засал ба уртасгасан асрамжийн консьерж $1,650/5 өдөр. ISPN гэрчилгээтэй англи, хятад хэлтэй сувилагч, даатгалын дэмжлэг, 24/7 дэмжлэг.',
    ogLocale: 'mn_MN',
  },
}

// Generate static params for non-English locales
export function generateStaticParams() {
  return [{ lang: 'ja' }, { lang: 'ar' }, { lang: 'ru' }, { lang: 'mn' }, { lang: 'ms' }, { lang: 'id' }]
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
      ms: `${hreflangBase}/ms`,
      id: `${hreflangBase}/id`,
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
