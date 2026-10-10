'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Calendar, User, Tag, Share2, Linkedin, Facebook, Twitter, List } from 'lucide-react'
import type { BlogPost } from '@/lib/types'
import { getNextPost, getPreviousPost, categories } from '@/lib/blog'
import BlogCTA from './BlogCTA'
import AuthorBio from './AuthorBio'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface BlogDetailProps {
  post: BlogPost
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const { language, t, tArr } = useLanguage()
  const studiesCount = 30 // Keep in sync with Research Library count
  const [showToc, setShowToc] = useState(false)
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const [nextPost, setNextPost] = useState<BlogPost | undefined>(undefined)
  const [previousPost, setPreviousPost] = useState<BlogPost | undefined>(undefined)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      setNextPost(await getNextPost(post, language === 'ja' ? 'ja' : undefined))
      setPreviousPost(await getPreviousPost(post, language === 'ja' ? 'ja' : undefined))
    }
    fetchRelatedPosts()
  }, [post, language])
  
  useEffect(() => {
    const headingRegex = /<h([23])\s+id="(section-\d+)"[^>]*>([\s\S]*?)<\/h[23]>/gi
    const foundHeadings: { id: string; text: string; level: number }[] = []
    let match
    while ((match = headingRegex.exec(post.htmlContent || '')) !== null) {
      const level = parseInt(match[1])
      const text = match[3].replace(/<[^>]*>/g, '').trim()
      foundHeadings.push({ id: match[2], text, level })
    }
    setHeadings(foundHeadings)
  }, [post.htmlContent])
  
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(`${window.location.origin}/blog/${post.slug}`)
    const title = encodeURIComponent(post.title)
    
    let shareUrl = ''
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }
  
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setShowToc(false)
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      alert(t('blog.alertEmailRequired'))
      return
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubscribed(true)
        setEmail('')
        setShowSuccessModal(true)
        setTimeout(() => setShowSuccessModal(false), 3000)
      } else {
        alert(t('blog.alertSubscribeFail'))
      }
    } catch (error) {
      console.error('Subscribe error:', error)
      alert(t('blog.alertError'))
    }
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">{t('blog.home')}</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-primary">{t('blog.blogNav')}</Link>
        <span>/</span>
        <span className="text-gray-700">{post.title}</span>
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            {post.featuredImage && (
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                  {(() => { const k = 'blog.categoryNames.' + post.category; const v = t(k); return language === 'ja' && v !== k ? v : categories.find(c => c.id === post.category)?.name || post.category })()}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishDate).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="text-sm text-gray-500">{post.readingTime} {t('blog.minRead')}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              
              <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  {t('blog.shareLabel')}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="article-content prose prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
                />
              </div>
              
              <AuthorBio author={post.author} />
              
              {/* Related Research Library callout */}
              <div className="mt-6 bg-teal-50 border border-teal-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {language === 'ja' ? 'エビデンスを見る' : 'Explore the Evidence'}
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      {language === 'ja' ? (
                        <>
                          当社の<Link href="/research" className="text-teal-700 font-medium hover:underline">リサーチライブラリ</Link>には、中国への医療渡航に関する査読付き研究{studiesCount}本を収録しています——患者体験、品質と安全、費用比較などを網羅。各研究には研究デザイン、サンプルサイズ、主な知見、明記された限界が含まれています。
                        </>
                      ) : (
                        <>
                          Our <Link href="/research" className="text-teal-700 font-medium hover:underline">Research Library</Link> collects {studiesCount} peer-reviewed studies on medical travel to China — covering patient experience, quality &amp; safety, cost comparisons, and more. Every entry includes study type, sample size, key findings, and stated limitations.
                        </>
                      )}
                    </p>
                    <Link href="/research" className="inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors">
                      {language === 'ja' ? `${studiesCount}本の研究を見る` : `Browse ${studiesCount} studies`}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="h-5 w-5 text-gray-400" />
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {previousPost && (
              <Link href={`/blog/${previousPost.slug}`} className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                  <div>
                    <span className="text-sm text-gray-500">{t('blog.previousArticle')}</span>
                    <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {previousPost.title}
                    </h3>
                  </div>
                </div>
              </Link>
            )}
            
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow ml-auto md:ml-0">
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{t('blog.nextArticle')}</span>
                    <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {nextPost.title}
                    </h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <button
              onClick={() => setShowToc(!showToc)}
              className="w-full flex items-center justify-between mb-4 text-gray-700"
            >
              <span className="font-medium flex items-center gap-2">
                <List className="h-5 w-5" />
                {t('blog.toc')}
              </span>
              <span className="text-gray-400">{showToc ? t('blog.tocHide') : t('blog.tocShow')}</span>
            </button>
            
            {showToc && headings.length > 0 && (
              <nav className="space-y-2">
                {headings.map(heading => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-50 ${
                      heading.level === 2 ? 'font-medium text-gray-900' : 'text-gray-600 pl-6'
                    }`}
                  >
                    {heading.text}
                  </button>
                ))}
              </nav>
            )}
            
            {!showToc && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">{t('blog.subscribeTitle')}</h3>
                  <p className="text-sm text-gray-600">{t('blog.subscribeDesc')}</p>
                  {subscribed ? (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                      {t('blog.subscribed')}
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="mt-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('blog.emailPlaceholder')}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <button
                        type="submit"
                        className="w-full mt-2 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        {t('blog.subscribe')}
                      </button>
                    </form>
                  )}
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">{t('blog.shareArticle')}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <BlogCTA post={post} />
      
      {/* Subscribe Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center animate-bounce-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('blog.subscribeSuccessTitle')}</h3>
            <p className="text-gray-600">{t('blog.subscribeSuccessDesc')}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t('blog.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
