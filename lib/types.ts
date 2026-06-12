export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  htmlContent?: string
  category: string
  tags: string[]
  author: string
  publishDate: string
  featuredImage: string
  seoTitle: string
  metaDescription: string
  keywords: string[]
  canonicalUrl?: string
  readingTime: number
  status: 'draft' | 'published' | 'scheduled'
  scheduledDate?: string
  views: number
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface BlogQueryParams {
  page?: number
  category?: string
  tag?: string
  search?: string
  status?: 'draft' | 'published' | 'scheduled'
}
