'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Tag, Calendar, ArrowRight } from 'lucide-react'
import type { BlogPost, Category } from '@/lib/types'
import { categories, getAllTags } from '@/lib/blog'
import Link from 'next/link'

interface BlogListProps {
  posts: BlogPost[]
  totalPages: number
  currentPage: number
  category?: string
  tag?: string
  search?: string
}

export default function BlogList({ posts, totalPages, currentPage, category, tag, search }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState(search || '')
  const [selectedCategory, setSelectedCategory] = useState(category || '')
  const [selectedTag, setSelectedTag] = useState(tag || '')
  const [allTags, setAllTags] = useState<string[]>([])
  
  useEffect(() => {
    const loadTags = async () => {
      const tags = await getAllTags()
      setAllTags(tags)
    }
    loadTags()
  }, [])
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedTag) params.set('tag', selectedTag)
    window.location.href = `/blog?${params.toString()}`
  }
  
  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedTag('')
    setSearchQuery('')
    window.location.href = '/blog'
  }
  
  const hasFilters = selectedCategory || selectedTag || searchQuery
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-gray-600">Discover articles about healthcare in Shanghai, medical tourism, and wellness.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Content</h2>
            
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <button type="submit" className="mt-2 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Search
              </button>
            </form>
            
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="w-full mb-4 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                Clear filters
              </button>
            )}
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((cat: Category) => (
                  <li key={cat.id}>
                    <Link
                      href={`/blog?category=${cat.slug}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map(tag => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedTag === tag
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map(post => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        {categories.find(c => c.id === post.category)?.name || post.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                        <span>{post.readingTime} min read</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-2">
                {currentPage > 1 && (
                  <Link
                    href={`/blog?page=${currentPage - 1}${category ? `&category=${category}` : ''}${tag ? `&tag=${tag}` : ''}${search ? `&search=${search}` : ''}`}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Link
                    key={page}
                    href={`/blog?page=${page}${category ? `&category=${category}` : ''}${tag ? `&tag=${tag}` : ''}${search ? `&search=${search}` : ''}`}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      page === currentPage
                        ? 'bg-primary text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
                {currentPage < totalPages && (
                  <Link
                    href={`/blog?page=${currentPage + 1}${category ? `&category=${category}` : ''}${tag ? `&tag=${tag}` : ''}${search ? `&search=${search}` : ''}`}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
