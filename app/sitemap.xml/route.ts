import { getAvailablePostLocales, getSortedPosts } from '@/lib/blog-server'
import { languageAlternates, localizedUrl, PUBLIC_LOCALES, SITE_URL } from '@/lib/public-seo'
import type { Locale } from '@/lib/i18n'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function alternateLinks(pathname: string, locales: Locale[] = PUBLIC_LOCALES): string {
  return Object.entries(languageAlternates(pathname, locales))
    .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(href)}" />`)
    .join('\n')
}

function urlEntry({
  lang,
  pathname,
  changefreq,
  priority,
  lastmod,
  locales,
  image,
}: {
  lang: Locale
  pathname: string
  changefreq: string
  priority: string
  lastmod?: string
  locales?: Locale[]
  image?: { url: string; caption: string }
}): string {
  return `  <url>
    <loc>${escapeXml(localizedUrl(lang, pathname))}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternateLinks(pathname, locales)}${image ? `
    <image:image>
      <image:loc>${escapeXml(image.url)}</image:loc>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>` : ''}
  </url>`
}

export async function GET() {
  const englishPosts = getSortedPosts()
  const postsByLocale = new Map(
    PUBLIC_LOCALES.map(lang => [lang, getSortedPosts(lang)] as const)
  )

  const staticPages = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/blog', changefreq: 'daily', priority: '0.8' },
    { path: '/research', changefreq: 'weekly', priority: '0.9' },
    { path: '/glossary', changefreq: 'monthly', priority: '0.8' },
    { path: '/founder', changefreq: 'monthly', priority: '0.7' },
    { path: '/editorial-policy', changefreq: 'monthly', priority: '0.5' },
    { path: '/privacy-policy', changefreq: 'monthly', priority: '0.3' },
    { path: '/terms-of-service', changefreq: 'monthly', priority: '0.3' },
    { path: '/medical-disclaimer', changefreq: 'monthly', priority: '0.3' },
    { path: '/refund-policy', changefreq: 'monthly', priority: '0.3' },
    { path: '/how-it-works', changefreq: 'monthly', priority: '0.7' },
    { path: '/treatments', changefreq: 'monthly', priority: '0.7' },
    { path: '/why-shanghai', changefreq: 'monthly', priority: '0.7' },
    { path: '/care-team', changefreq: 'monthly', priority: '0.6' },
    { path: '/contact', changefreq: 'monthly', priority: '0.6' },
    { path: '/faq', changefreq: 'monthly', priority: '0.6' },
    { path: '/free-consultation', changefreq: 'monthly', priority: '0.8' },
  ]

  const entries: string[] = []
  staticPages.forEach(page => {
    PUBLIC_LOCALES.forEach(lang => {
      entries.push(urlEntry({
        lang,
        pathname: page.path,
        changefreq: page.changefreq,
        priority: page.priority,
      }))
    })
  })

  // English-only trust page: never advertise translations that do not exist.
  entries.push(urlEntry({
    lang: 'en',
    pathname: '/our-standards',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: '2026-11-02',
    locales: ['en'],
  }))

  englishPosts.forEach(post => {
    const availableLocales = getAvailablePostLocales(post.slug) as Locale[]
    const pathname = `/blog/${post.slug}`
    availableLocales.forEach(lang => {
      const localizedPost = postsByLocale.get(lang)?.find(item => item.slug === post.slug) || post
      entries.push(urlEntry({
        lang,
        pathname,
        changefreq: 'weekly',
        priority: '0.9',
        lastmod: new Date(post.publishDate).toISOString(),
        locales: availableLocales,
        image: localizedPost.featuredImage ? {
          url: new URL(localizedPost.featuredImage, SITE_URL).toString(),
          caption: localizedPost.title,
        } : undefined,
      }))
    })
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
