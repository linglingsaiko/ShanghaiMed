import { LanguageProvider } from '@/contexts/LanguageContext'
import type { Language } from '@/contexts/LanguageContext'
import { isValidLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { languageAlternates, localizedUrl, OG_LOCALES } from '@/lib/public-seo'

const localeMetadata: Record<string, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: 'ShanghaiMed - World-Class Medical Care in Shanghai',
    description: 'Independent medical concierge for international patients in Shanghai, including hospital matching, visa support, bilingual nurse accompaniment, insurance support, and post-treatment follow-up.',
    ogLocale: OG_LOCALES.en,
  },
  ja: {
    title: 'ShanghaiMed - 上海のワールドクラス医療',
    description: '上海のトップ専門医による無料・秘密厳守の医療相談。上海の全三甲病院を含む19の提携病院にアクセス。透明な料金 — 無料相談、院内同伴$50/時間、健康診断コンシェルジュ$500/1日、エッセンシャルケア$1,000/3日、手術・延長ケア$1,650/5日。日中対応ISPN認定看護師、保険サポート、24時間サポート。',
    ogLocale: OG_LOCALES.ja,
  },
  ar: {
    title: 'ShanghaiMed - رعاية طبية عالمية المستوى في شنغهاي',
    description: 'استشارة طبية مجانية وسرية مع كبار المتخصصين في شنغهاي. الوصول إلى 19 مستشفى شريكاً تشمل جميع مستشفيات الفئة 3A في شنغهاي. أسعار شفافة — استشارة مجانية، مرافقة داخل المستشفى 50 دولار/ساعة، كونسيرج الفحص الصحي 500 دولار/يوم واحد، كونسيرج الرعاية الأساسية 1000 دولار/3 أيام، كونسيرج الجراحة والرعاية الممتدة 1650 دولار/5 أيام. ممرضات يجيدن الإنجليزية والصينية معتمدات من ISPN، دعم التأمين، دعم على مدار الساعة.',
    ogLocale: OG_LOCALES.ar,
  },
  ru: {
    title: 'ShanghaiMed - Медицинская помощь мирового уровня в Шанхае',
    description: 'Бесплатная конфиденциальная консультация с ведущими специалистами Шанхая. Доступ к 19 партнёрским больницам, включая все больницы категории 3А Шанхая. Прозрачные цены — бесплатная консультация, очное сопровождение в больнице $50/час, Консьерж для чек-апа $500/1 день, Базовый уход $1,000/3 дня, Консьерж для хирургии и длительного лечения $1,650/5 дней. ISPN-сертифицированные медсёстры со знанием английского и китайского, страховая поддержка, поддержка 24/7.',
    ogLocale: OG_LOCALES.ru,
  },
  mn: {
    title: 'ShanghaiMed - Дэлхийн түвшний эмнэлгийн үйлчилгээ Шанхайд',
    description: 'Шанхайн шилдэг мэргэжилтнүүдтэй үнэгүй, нууцлалтай эмнэлгийн зөвлөгөө. Шанхайн бүх 3А эмнэлгийг багтаасан 19 түнш эмнэлэгт холбогдоно. Ил тод үнэ — үнэгүй зөвлөгөө, эмнэлэг дотор дагалдан явах $50/цаг, Эрүүл мэндийн үзлэгийн консьерж $500/1 өдөр, Үндсэн асрамж $1,000/3 өдөр, Мэс засал ба уртасгасан асрамжийн консьерж $1,650/5 өдөр. ISPN гэрчилгээтэй англи, хятад хэлтэй сувилагч, даатгалын дэмжлэг, 24/7 дэмжлэг.',
    ogLocale: OG_LOCALES.mn,
  },
  ms: {
    title: 'ShanghaiMed - Penjagaan Kesihatan Bertaraf Dunia di Shanghai',
    description: 'ShanghaiMed menyelaraskan rawatan untuk pesakit antarabangsa di Shanghai, termasuk pemilihan hospital, sokongan visa, pengiringan jururawat dan susulan rawatan.',
    ogLocale: OG_LOCALES.ms,
  },
  id: {
    title: 'ShanghaiMed - Perawatan Medis Kelas Dunia di Shanghai',
    description: 'ShanghaiMed mengoordinasikan perawatan bagi pasien internasional di Shanghai, termasuk pemilihan rumah sakit, dukungan visa, pendampingan perawat, dan tindak lanjut perawatan.',
    ogLocale: OG_LOCALES.id,
  },
}

export function generateStaticParams() {
  return [{ lang: 'ja' }, { lang: 'ar' }, { lang: 'ru' }, { lang: 'mn' }, { lang: 'ms' }, { lang: 'id' }]
}

export const dynamicParams = false

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isValidLocale(params.lang) ? params.lang : 'en'
  const meta = localeMetadata[lang] || localeMetadata.en

  return {
    title: {
      default: meta.title,
      template: `%s | ShanghaiMed`,
    },
    description: meta.description,
    openGraph: {
      locale: meta.ogLocale,
      url: localizedUrl(lang, '/'),
      siteName: 'ShanghaiMed',
      type: 'website',
    },
    alternates: {
      canonical: localizedUrl(lang, '/'),
      languages: languageAlternates('/'),
    },
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
