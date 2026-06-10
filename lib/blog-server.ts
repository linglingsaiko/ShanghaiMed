import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
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
  let html = content
  
  // 代码块 (必须先处理，避免内部被其他规则污染)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
  
  // Tab分隔表格处理（在代码块之后、其他规则之前）
  // 识别连续的tab分隔行，第一行为表头
  const lines = html.split('\n')
  let result: string[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    // 检测tab分隔的表格行：至少有2个tab
    if (line.includes('\t') && (line.match(/\t/g) || []).length >= 2) {
      const tableLines: string[] = []
      // 收集连续的tab分隔行
      while (i < lines.length && lines[i].includes('\t') && (lines[i].match(/\t/g) || []).length >= 2) {
        tableLines.push(lines[i])
        i++
      }
      // 转换为HTML表格
      let tableHtml = '<table><thead><tr>'
      const headers = tableLines[0].split('\t')
      headers.forEach(h => { tableHtml += `<th>${h.trim()}</th>` })
      tableHtml += '</tr></thead><tbody>'
      for (let j = 1; j < tableLines.length; j++) {
        const cells = tableLines[j].split('\t')
        tableHtml += '<tr>'
        cells.forEach(c => { tableHtml += `<td>${c.trim()}</td>` })
        tableHtml += '</tr>'
      }
      tableHtml += '</tbody></table>'
      result.push(tableHtml)
    } else {
      result.push(line)
      i++
    }
  }
  html = result.join('\n')
  
  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // 标题 (h2-h6，博客正文通常不用h1)
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
  
  // 引用块
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>')
  // 合并连续blockquote
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n')
  
  // 粗体和斜体
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  
  // 水平线
  html = html.replace(/^---+$/gm, '<hr />')
  
  // 无序列表
  html = html.replace(/^[-*+]\s+(.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
  
  // 有序列表
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')
  
  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  
  // 图片
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
  
  // 段落：两个换行分隔的文本块
  html = html.replace(/\n\n(?!<)/g, '\n\n<p>')
  html = html.replace(/(?!>)\n\n/g, '</p>\n\n')
  
  // 清理：确保段落标签正确
  html = html.replace(/<p>(<h[1-6]>)/g, '$1')
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1')
  html = html.replace(/<p>(<ul>)/g, '$1')
  html = html.replace(/(<\/ul>)<\/p>/g, '$1')
  html = html.replace(/<p>(<ol>)/g, '$1')
  html = html.replace(/(<\/ol>)<\/p>/g, '$1')
  html = html.replace(/<p>(<pre>)/g, '$1')
  html = html.replace(/(<\/pre>)<\/p>/g, '$1')
  html = html.replace(/<p>(<blockquote>)/g, '$1')
  html = html.replace(/(<\/blockquote>)<\/p>/g, '$1')
  html = html.replace(/<p>(<hr\s*\/?>)/g, '$1')
  html = html.replace(/(<hr\s*\/?>)<\/p>/g, '$1')
  
  // 单个换行 → <br>
  html = html.replace(/(?<!>)\n(?!<)/g, '<br />\n')
  
  return html
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