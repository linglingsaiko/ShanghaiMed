import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getPostBySlug } from '@/lib/blog-server'

export function GET(request: Request, { params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }
  
  return NextResponse.json(post)
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const body = await request.json()
    const existingPost = getPostBySlug(params.slug)
    
    if (!existingPost) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
    
    const newSlug = body.slug || params.slug
    const oldFilePath = path.join(process.cwd(), 'content', 'blog', `${params.slug}.md`)
    const newFilePath = path.join(process.cwd(), 'content', 'blog', `${newSlug}.md`)
    
    const fileContents = fs.readFileSync(oldFilePath, 'utf8')
    const existingMatter = matter(fileContents)
    
    const updatedFrontmatter = {
      ...existingMatter.data,
      title: body.title ?? existingMatter.data.title,
      slug: newSlug,
      excerpt: body.excerpt ?? existingMatter.data.excerpt,
      category: body.category ?? existingMatter.data.category,
      tags: body.tags ?? existingMatter.data.tags,
      author: body.author ?? existingMatter.data.author,
      date: body.date ?? existingMatter.data.date,
      featuredImage: body.featuredImage ?? existingMatter.data.featuredImage,
      seoTitle: body.seoTitle ?? existingMatter.data.seoTitle,
      metaDescription: body.metaDescription ?? existingMatter.data.metaDescription,
      keywords: body.keywords ?? existingMatter.data.keywords,
      canonicalUrl: body.canonicalUrl ?? existingMatter.data.canonicalUrl,
    }
    
    const content = body.content ?? existingMatter.content
    const matterResult = matter.stringify(content, updatedFrontmatter)
    
    fs.writeFileSync(newFilePath, matterResult)
    
    if (newSlug !== params.slug) {
      fs.unlinkSync(oldFilePath)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Article updated successfully',
      slug: newSlug 
    })
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'blog', `${params.slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
    
    fs.unlinkSync(filePath)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Article deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}
