import BlogDetailComponent from './BlogDetailComponent'
import { getPostBySlug } from '@/lib/blog-server'

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return <BlogDetailComponent slug={params.slug} />
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
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
    keywords: post.keywords.join(', '),
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
