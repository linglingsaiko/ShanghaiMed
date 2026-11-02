import type { Metadata } from 'next'
import BlogPageComponent from './BlogPageComponent'
import { getAllTags, getPostsByQuery } from '@/lib/blog-server'
import {
  languageAlternates,
  localizedUrl,
  OG_LOCALES,
  resolvePublicLocale,
} from '@/lib/public-seo'
import type { Locale } from '@/lib/i18n'

type SearchParams = { page?: string; category?: string; tag?: string; search?: string }
type BlogPageProps = { params?: { lang?: string }; searchParams: SearchParams }

const blogMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Healthcare Insights',
    description: 'Discover articles about medical tourism, healthcare services, and wellness tips in Shanghai.',
  },
  ja: {
    title: 'ヘルスケアインサイト',
    description: '上海の医療ツーリズム、医療サービス、ウェルネスに関する記事をご覧ください。',
  },
  ar: {
    title: 'مقالات صحية',
    description: 'اكتشف مقالات عن السياحة الطبية والخدمات الصحية ونصائح العافية في شنغهاي.',
  },
  ru: {
    title: 'Статьи о здоровье',
    description: 'Статьи о медицинском путешествии, медицинских услугах и советах по здоровью в Шанхае.',
  },
  mn: {
    title: 'Эрүүл мэндийн мэдээлэл',
    description: 'Шанхай дахь эрүүл мэндийн аялал, эрүүл мэндийн үйлчилгээ, эрүүл амьдралын зөвлөмжийн талаарх нийтлэлүүд.',
  },
  ms: {
    title: 'Insight Penjagaan Kesihatan',
    description: 'Terokai artikel tentang pelancongan perubatan, perkhidmatan penjagaan kesihatan dan tip kesejahteraan di Shanghai.',
  },
  id: {
    title: 'Wawasan Kesehatan',
    description: 'Temukan artikel tentang wisata medis, layanan kesehatan, dan tips kebugaran di Shanghai.',
  },
}

export default function BlogPage({ params, searchParams }: BlogPageProps) {
  const lang = resolvePublicLocale(params?.lang)
  const parsedPage = Number.parseInt(searchParams.page || '1', 10)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1
  const { posts, totalPages } = getPostsByQuery({
    page,
    category: searchParams.category,
    tag: searchParams.tag,
    search: searchParams.search,
  }, lang)

  return (
    <BlogPageComponent
      posts={posts}
      totalPages={totalPages}
      allTags={getAllTags()}
      searchParams={searchParams}
    />
  )
}

export function generateMetadata({ params }: { params?: { lang?: string } }): Metadata {
  const lang = resolvePublicLocale(params?.lang)
  const meta = blogMetadata[lang]
  const url = localizedUrl(lang, '/blog')

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: languageAlternates('/blog'),
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
