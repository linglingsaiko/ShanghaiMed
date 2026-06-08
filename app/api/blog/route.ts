import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getSortedPosts, calculateReadingTime } from '@/lib/blog-server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const category = searchParams.get('category')
  const tag = searchParams.get('tag')
  const search = searchParams.get('search')
  
  let posts = getSortedPosts()
  
  if (search) {
    const searchLower = search.toLowerCase()
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.tags.some(t => t.toLowerCase().includes(searchLower))
    )
  }
  
  if (category) {
    posts = posts.filter(post => post.category === category)
  }
  
  if (tag) {
    posts = posts.filter(post => post.tags.includes(tag))
  }
  
  const pageSize = 6
  const totalPages = Math.ceil(posts.length / pageSize)
  const start = (page - 1) * pageSize
  const paginatedPosts = posts.slice(start, start + pageSize)
  
  return NextResponse.json({ posts: paginatedPosts, totalPages })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const requiredFields = ['title', 'content']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }
    
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    const frontmatter = {
      title: body.title,
      slug: slug,
      excerpt: body.excerpt || body.content.substring(0, 150) + '...',
      category: body.category || 'health-guides',
      tags: body.tags || [],
      author: body.author || 'ShanghaiMed Team',
      date: body.date || new Date().toISOString(),
      featuredImage: body.featuredImage || '',
      seoTitle: body.seoTitle || body.title,
      metaDescription: body.metaDescription || body.excerpt || body.content.substring(0, 150) + '...',
      keywords: body.keywords || [],
      canonicalUrl: body.canonicalUrl,
    }
    
    const matterResult = matter.stringify(body.content, frontmatter)
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`)
    
    fs.writeFileSync(filePath, matterResult)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Article created successfully',
      slug: slug 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}
