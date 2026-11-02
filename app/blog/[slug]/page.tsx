import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogDetailComponent from './BlogDetailComponent'
import {
  getAvailablePostLocales,
  getNextPost,
  getPostBySlug,
  getSortedPosts,
  getPreviousPost,
  hasPostLocale,
} from '@/lib/blog-server'
import {
  languageAlternates,
  localizedUrl,
  OG_LOCALES,
  resolvePublicLocale,
  SITE_URL,
} from '@/lib/public-seo'
import type { Locale } from '@/lib/i18n'

type BlogDetailPageProps = { params: { slug: string; lang?: string } }

function absoluteImageUrl(image: string): string {
  return new URL(image, SITE_URL).toString()
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const lang = resolvePublicLocale(params.lang)
  if (!hasPostLocale(params.slug, lang)) notFound()

  const post = getPostBySlug(params.slug, lang)
  if (!post) notFound()

  const articleUrl = localizedUrl(lang, `/blog/${post.slug}`)
  const previousPost = getPreviousPost(post, lang)
  const nextPost = getNextPost(post, lang)
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    ...(post.featuredImage ? { image: absoluteImageUrl(post.featuredImage) } : {}),
    datePublished: new Date(post.publishDate).toISOString(),
    dateModified: new Date(post.publishDate).toISOString(),
    inLanguage: lang,
    url: articleUrl,
    author: {
      '@type': 'Person',
      name: 'Sara Ma',
      jobTitle: 'Founder',
      url: `${SITE_URL}/founder`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ShanghaiMed',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: post.category,
    keywords: (post.keywords || []).join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <BlogDetailComponent post={post} previousPost={previousPost} nextPost={nextPost} />
    </>
  )
}

export function generateMetadata({ params }: BlogDetailPageProps): Metadata {
  const lang = resolvePublicLocale(params.lang)
  if (!hasPostLocale(params.slug, lang)) {
    return { title: 'Article not found', robots: { index: false, follow: false } }
  }

  const post = getPostBySlug(params.slug, lang)
  if (!post) {
    return { title: 'Article not found', robots: { index: false, follow: false } }
  }

  const title = post.seoTitle || post.title
  const description = post.metaDescription || post.excerpt
  const articlePath = `/blog/${post.slug}`
  const articleUrl = localizedUrl(lang, articlePath)
  const availableLocales = getAvailablePostLocales(post.slug) as Locale[]
  const images = post.featuredImage ? [absoluteImageUrl(post.featuredImage)] : []

  return {
    title,
    description,
    keywords: (post.keywords || []).join(', '),
    alternates: {
      canonical: articleUrl,
      languages: languageAlternates(articlePath, availableLocales),
    },
    openGraph: {
      title,
      description,
      url: articleUrl,
      locale: OG_LOCALES[lang],
      siteName: 'ShanghaiMed',
      images,
      type: 'article',
      publishedTime: new Date(post.publishDate).toISOString(),
      modifiedTime: new Date(post.publishDate).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    robots: { index: true, follow: true },
  }
}

export function generateStaticParams() {
  return getSortedPosts().map(post => ({ slug: post.slug }))
}
