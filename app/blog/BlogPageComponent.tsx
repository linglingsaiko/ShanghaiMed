'use client'

import BlogList from '@/components/sections/BlogList'
import type { BlogPost } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface BlogPageComponentProps {
  posts: BlogPost[]
  totalPages: number
  allTags: string[]
  searchParams: {
    page?: string
    category?: string
    tag?: string
    search?: string
  }
}

export default function BlogPageComponent({
  posts,
  totalPages,
  allTags,
  searchParams,
}: BlogPageComponentProps) {
  const { t } = useLanguage()
  const parsedPage = Number.parseInt(searchParams.page || '1', 10)
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1

  return (
    <div className="pt-28 pb-16 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-10 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 w-full overflow-visible">
            {t('blog.pageHeaderTitle')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('blog.pageHeaderSubtitle')}
          </p>
        </div>

        <BlogList
          posts={posts}
          totalPages={totalPages}
          currentPage={currentPage}
          category={searchParams.category}
          tag={searchParams.tag}
          search={searchParams.search}
          allTags={allTags}
        />
      </div>
    </div>
  )
}
