'use client'

import { useEffect, useState } from 'react'
import { getPostsByQuery } from '@/lib/blog'
import BlogList from '@/components/sections/BlogList'
import type { BlogPost } from '@/lib/types'

interface BlogPageComponentProps {
  searchParams: {
    page?: string
    category?: string
    tag?: string
    search?: string
  }
}

export default function BlogPageComponent({ searchParams }: BlogPageComponentProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const result = await getPostsByQuery({
        page: searchParams.page ? parseInt(searchParams.page) : 1,
        category: searchParams.category,
        tag: searchParams.tag,
        search: searchParams.search,
      })
      setPosts(result.posts)
      setTotalPages(result.totalPages)
      setLoading(false)
    }
    
    fetchPosts()
  }, [searchParams])
  
  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="section-container flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="py-16 bg-gray-50">
      <div className="section-container">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Healthcare Insights</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover articles about medical tourism, healthcare services, and wellness tips in Shanghai
          </p>
        </div>
        
        <BlogList
          posts={posts}
          totalPages={totalPages}
          currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
          category={searchParams.category}
          tag={searchParams.tag}
          search={searchParams.search}
        />
      </div>
    </div>
  )
}
