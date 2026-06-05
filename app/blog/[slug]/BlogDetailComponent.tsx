'use client'

import { useEffect, useState } from 'react'
import { getPostBySlug } from '@/lib/blog'
import BlogDetail from '@/components/sections/BlogDetail'
import { notFound } from 'next/navigation'
import type { BlogPost } from '@/lib/types'

interface BlogDetailComponentProps {
  slug: string
}

export default function BlogDetailComponent({ slug }: BlogDetailComponentProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      const result = await getPostBySlug(slug)
      if (!result) {
        notFound()
        return
      }
      setPost(result)
      setLoading(false)
    }
    
    fetchPost()
  }, [slug])
  
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  if (!post) {
    notFound()
    return null
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <BlogDetail post={post} />
    </div>
  )
}
