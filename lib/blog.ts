import type { BlogPost, BlogQueryParams } from './types'
import { 
  categories, 
  getCategories, 
  getCategoryBySlug, 
  getRelatedPosts as getRelatedPostsShared,
  getNextPost as getNextPostShared,
  getPreviousPost as getPreviousPostShared,
  getAllTags as getAllTagsShared,
  calculateReadingTime,
  renderMarkdown 
} from './blog-shared'

export { 
  categories, 
  getCategories, 
  getCategoryBySlug, 
  calculateReadingTime,
  renderMarkdown 
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

export async function getPostsByQuery(params: BlogQueryParams, baseUrl?: string): Promise<{ posts: BlogPost[]; totalPages: number }> {
  const apiUrl = baseUrl 
    ? new URL('/api/blog', baseUrl)
    : typeof window !== 'undefined' 
      ? new URL('/api/blog', window.location.origin)
      : new URL('/api/blog', process.env.NEXT_PUBLIC_SITE_URL || 'https://shanghaimedhealth.com')
  
  if (params.page) apiUrl.searchParams.set('page', params.page.toString())
  if (params.category) apiUrl.searchParams.set('category', params.category)
  if (params.tag) apiUrl.searchParams.set('tag', params.tag)
  if (params.search) apiUrl.searchParams.set('search', params.search)
  
  const res = await fetch(apiUrl.toString())
  if (!res.ok) return { posts: [], totalPages: 0 }
  return res.json()
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getSortedPosts()
  return posts.map(post => post.slug)
}

export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getSortedPosts()
  return getRelatedPostsShared(allPosts, currentPost, limit)
}

export async function getNextPost(currentPost: BlogPost): Promise<BlogPost | undefined> {
  const allPosts = await getSortedPosts()
  return getNextPostShared(allPosts, currentPost)
}

export async function getPreviousPost(currentPost: BlogPost): Promise<BlogPost | undefined> {
  const allPosts = await getSortedPosts()
  return getPreviousPostShared(allPosts, currentPost)
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getSortedPosts()
  return getAllTagsShared(posts)
}