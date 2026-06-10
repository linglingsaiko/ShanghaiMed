import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
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

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

marked.setOptions({
  gfm: true,
  breaks: false,
})

function renderMarkdownToHtml(content: string): string {
  return marked(content) as string
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
      const htmlContent = renderMarkdownToHtml(matterResult.content || '')
      
      return {
        id,
        slug: matterResult.data.slug || id,
        title: matterResult.data.title || '',
        excerpt: matterResult.data.excerpt || '',
        content: matterResult.content || '',
        htmlContent,
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
  return getRelatedPostsShared(allPosts, currentPost, limit)
}

export function getNextPost(currentPost: BlogPost): BlogPost | undefined {
  const allPosts = getSortedPosts()
  return getNextPostShared(allPosts, currentPost)
}

export function getPreviousPost(currentPost: BlogPost): BlogPost | undefined {
  const allPosts = getSortedPosts()
  return getPreviousPostShared(allPosts, currentPost)
}

export function getAllTags(): string[] {
  const posts = getSortedPosts()
  return getAllTagsShared(posts)
}