import BlogDetailComponent from './BlogDetailComponent'
import { getPostBySlug } from '@/lib/blog-server'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shanghaimedhealth.com'

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  const blogPostingJsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.seoTitle || post.title,
        description: post.metaDescription || post.excerpt,
        ...(post.featuredImage ? { image: `${baseUrl}${post.featuredImage}` } : {}),
        datePublished: new Date(post.publishDate).toISOString(),
        dateModified: new Date(post.publishDate).toISOString(),
        author: {
          '@type': 'Person',
          name: 'Sara Ma',
          jobTitle: 'Founder',
          url: `${baseUrl}/founder`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'ShanghaiMed',
          logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/blog/${post.slug}`,
        },
        keywords: (post.keywords || []).join(', '),
      }
    : null

  return (
    <>
      {blogPostingJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
        />
      )}
      <BlogDetailComponent slug={params.slug} />
    </>
  )
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Blog | ShanghaiMed',
      description: 'Healthcare articles in Shanghai',
    }
  }
  
  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: (post.keywords || []).join(', '),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export async function generateStaticParams() {
  const { getPostSlugs } = await import('@/lib/blog-server')
  const slugs = getPostSlugs()
  return slugs.map(slug => ({ slug }))
}
