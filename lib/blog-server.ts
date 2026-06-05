import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import type { BlogPost, Category, BlogQueryParams } from './types'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

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

export function getSortedPosts(): BlogPost[] {
  let fileNames: string[] = []
  try {
    fileNames = fs.readdirSync(postsDirectory)
  } catch {
    return []
  }
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      
      const readingTime = calculateReadingTime(matterResult.content)
      
      return {
        id,
        slug: matterResult.data.slug || id,
        title: matterResult.data.title || '',
        excerpt: matterResult.data.excerpt || '',
        content: matterResult.content || '',
        category: matterResult.data.category || 'health-guides',
        tags: matterResult.data.tags || [],
        author: matterResult.data.author || 'ShanghaiMed Team',
        publishDate: matterResult.data.date || new Date().toISOString(),
        featuredImage: matterResult.data.featuredImage || '',
        seoTitle: matterResult.data.seoTitle || matterResult.data.title || '',
        metaDescription: matterResult.data.metaDescription || matterResult.data.excerpt || '',
        keywords: matterResult.data.keywords || [],
        canonicalUrl: matterResult.data.canonicalUrl,
        readingTime,
        status: matterResult.data.status || 'draft',
        scheduledDate: matterResult.data.scheduledDate,
        views: matterResult.data.views || 0,
      } as BlogPost
    })
  
  return allPostsData.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getSortedPosts()
  return posts.find(post => post.slug === slug)
}

export function getPostsByQuery(params: BlogQueryParams): { posts: BlogPost[]; totalPages: number } {
  let posts = getSortedPosts()
  const page = params.page || 1
  const pageSize = 6
  
  if (params.search) {
    const searchLower = params.search.toLowerCase()
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }
  
  if (params.category) {
    posts = posts.filter(post => post.category === params.category)
  }
  
  if (params.tag) {
    posts = posts.filter(post => post.tags.includes(params.tag!))
  }
  
  const totalPages = Math.ceil(posts.length / pageSize)
  const start = (page - 1) * pageSize
  const paginatedPosts = posts.slice(start, start + pageSize)
  
  return { posts: paginatedPosts, totalPages }
}

export function getPostSlugs(): string[] {
  let fileNames: string[] = []
  try {
    fileNames = fs.readdirSync(postsDirectory)
  } catch {
    return []
  }
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getSortedPosts()
  return allPosts
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, limit)
}

export function getNextPost(currentPost: BlogPost): BlogPost | undefined {
  const allPosts = getSortedPosts()
  const currentIndex = allPosts.findIndex(post => post.id === currentPost.id)
  if (currentIndex < allPosts.length - 1) {
    return allPosts[currentIndex + 1]
  }
  return undefined
}

export function getPreviousPost(currentPost: BlogPost): BlogPost | undefined {
  const allPosts = getSortedPosts()
  const currentIndex = allPosts.findIndex(post => post.id === currentPost.id)
  if (currentIndex > 0) {
    return allPosts[currentIndex - 1]
  }
  return undefined
}

export function getAllTags(): string[] {
  const posts = getSortedPosts()
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
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content)
  return result.toString()
}
