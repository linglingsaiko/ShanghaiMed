import type { BlogPost, Category, BlogQueryParams } from './types'

export const categories: Category[] = [
  { id: 'health-checkups', name: 'Health Checkups', slug: 'health-checkups', description: 'Comprehensive health screening and medical checkup guides' },
  { id: 'preventive-healthcare', name: 'Preventive Healthcare', slug: 'preventive-healthcare', description: 'Tips and strategies for preventive medicine' },
  { id: 'medical-tourism', name: 'Medical Tourism', slug: 'medical-tourism', description: 'Guides for international patients in Shanghai' },
  { id: 'traditional-chinese-medicine', name: 'Traditional Chinese Medicine', slug: 'traditional-chinese-medicine', description: 'TCM treatments and wellness practices' },
  { id: 'shanghai-hospitals', name: 'Shanghai Hospitals', slug: 'shanghai-hospitals', description: 'Information about Shanghai medical institutions' },
  { id: 'expat-healthcare', name: 'Expat Healthcare', slug: 'expat-healthcare', description: 'Healthcare resources for expatriates in Shanghai' },
  { id: 'patient-stories', name: 'Patient Stories', slug: 'patient-stories', description: 'Real patient experiences and testimonials' },
  { id: 'health-guides', name: 'Health Guides', slug: 'health-guides', description: 'Comprehensive health guides and articles' },
]

export function getCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export async function getSortedPosts(): Promise<BlogPost[]> {
  const res = await fetch('/api/blog')
  if (!res.ok) return []
  const data = await res.json()
  return data.posts || []
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const res = await fetch(`/api/blog/${slug}`)
  if (!res.ok) return undefined
  return res.json()
}

export async function getPostsByQuery(params: BlogQueryParams): Promise<{ posts: BlogPost[]; totalPages: number }> {
  const url = new URL('/api/blog', window.location.origin)
  if (params.page) url.searchParams.set('page', params.page.toString())
  if (params.category) url.searchParams.set('category', params.category)
  if (params.tag) url.searchParams.set('tag', params.tag)
  if (params.search) url.searchParams.set('search', params.search)
  
  const res = await fetch(url.toString())
  if (!res.ok) return { posts: [], totalPages: 0 }
  return res.json()
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getSortedPosts()
  return posts.map(post => post.slug)
}

export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getSortedPosts()
  return allPosts
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, limit)
}

export async function getNextPost(currentPost: BlogPost): Promise<BlogPost | undefined> {
  const allPosts = await getSortedPosts()
  const currentIndex = allPosts.findIndex(post => post.id === currentPost.id)
  if (currentIndex < allPosts.length - 1) {
    return allPosts[currentIndex + 1]
  }
  return undefined
}

export async function getPreviousPost(currentPost: BlogPost): Promise<BlogPost | undefined> {
  const allPosts = await getSortedPosts()
  const currentIndex = allPosts.findIndex(post => post.id === currentPost.id)
  if (currentIndex > 0) {
    return allPosts[currentIndex - 1]
  }
  return undefined
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getSortedPosts()
  const tags = new Set<string>()
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags).sort()
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export async function renderMarkdown(content: string): Promise<string> {
  const { remark } = await import('remark')
  const remarkHtml = await import('remark-html')
  const remarkGfm = await import('remark-gfm')
  
  const result = await remark()
    .use(remarkGfm.default)
    .use(remarkHtml.default)
    .process(content)
  return result.toString()
}
