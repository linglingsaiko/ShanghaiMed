'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import { getSortedPosts, categories } from '@/lib/blog'
import type { BlogPost } from '@/lib/types'
import Link from 'next/link'

export default function LatestInsights() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  
  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getSortedPosts()
      const featuredPost = allPosts.find(p => p.featured)
      const latestPosts = allPosts.filter(p => !p.featured).slice(0, 2)
      if (featuredPost) {
        setPosts([featuredPost, ...latestPosts])
      } else {
        setPosts(allPosts.slice(0, 3))
      }
    }
    fetchPosts()
  }, [])
  
  return (
    <section id="insights" className="py-16 bg-gray-50 scroll-mt-24">
      <div className="section-container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-accent font-semibold text-sm tracking-wider uppercase">
              Latest Insights
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Latest Insights</h2>
            <p className="text-gray-600">Discover articles about healthcare in Shanghai, medical tourism, and wellness.</p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              {post.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {post.featured && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                      ★ Featured
                    </div>
                  )}
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    {categories.find(c => c.id === post.category)?.name || post.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                  >
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/blog"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
