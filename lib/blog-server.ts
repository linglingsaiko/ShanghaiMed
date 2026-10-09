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

function renderMarkdownToHtml(content: string): string {
  // 使用 marked 库（支持 GFM 标准表格、代码块、列表等完整 Markdown 语法）
  return marked.parse(content, { gfm: true, breaks: false }) as string
}

// 日語版記事（slug.ja.md）で上書き読込（lang='ja' 時、ファイルが存在すれば）
function applyJaOverride(post: BlogPost, id: string): BlogPost {
  const jaPath = path.join(postsDirectory, id + '.ja.md')
  try {
    if (!fs.existsSync(jaPath)) return post
    const jaContents = fs.readFileSync(jaPath, 'utf8')
    const jaMatter = matter(jaContents)
    return {
      ...post,
      title: jaMatter.data.title || post.title,
      excerpt: jaMatter.data.excerpt || post.excerpt,
      content: jaMatter.content || post.content,
      htmlContent: renderMarkdownToHtml(jaMatter.content || ''),
      readingTime: calculateReadingTime(jaMatter.content || ''),
      seoTitle: jaMatter.data.seoTitle || post.seoTitle,
      metaDescription: jaMatter.data.metaDescription || post.metaDescription,
    } as BlogPost
  } catch {
    return post
  }
}

export function getSortedPosts(lang?: string): BlogPost[] {
  let fileNames: string[] = []
  try {
    fileNames = fs.readdirSync(postsDirectory)
  } catch {
    return []
  }
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') && !fileName.endsWith('.ja.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      
      const readingTime = calculateReadingTime(matterResult.content)
      const htmlContent = renderMarkdownToHtml(matterResult.content || '')
      
      const post = {
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
        featured: matterResult.data.featured || false,
      } as BlogPost
      
      return lang === 'ja' ? applyJaOverride(post, id) : post
    })
  
  return allPostsData.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  })
}

export function getPostBySlug(slug: string, lang?: string): BlogPost | undefined {
  const posts = getSortedPosts(lang)
  return posts.find(post => post.slug === slug)
}

export function getPostsByQuery(params: BlogQueryParams, lang?: string): { posts: BlogPost[]; totalPages: number } {
  let posts = getSortedPosts(lang)
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
    .filter(fileName => fileName.endsWith('.md') && !fileName.endsWith('.ja.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3, lang?: string): BlogPost[] {
  const allPosts = getSortedPosts(lang)
  return getRelatedPostsShared(allPosts, currentPost, limit)
}

export function getNextPost(currentPost: BlogPost, lang?: string): BlogPost | undefined {
  const allPosts = getSortedPosts(lang)
  return getNextPostShared(allPosts, currentPost)
}

export function getPreviousPost(currentPost: BlogPost, lang?: string): BlogPost | undefined {
  const allPosts = getSortedPosts(lang)
  return getPreviousPostShared(allPosts, currentPost)
}

export function getAllTags(): string[] {
  const posts = getSortedPosts()
  return getAllTagsShared(posts)
}