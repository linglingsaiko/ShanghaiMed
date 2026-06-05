'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Phone, Building2, Stethoscope } from 'lucide-react'
import { getRelatedPosts } from '@/lib/blog'
import { tier1Hospitals } from '@/lib/constants'
import type { BlogPost } from '@/lib/types'
import Link from 'next/link'

interface BlogCTAProps {
  post: BlogPost
}

export default function BlogCTA({ post }: BlogCTAProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  
  useEffect(() => {
    const fetchRelated = async () => {
      const posts = await getRelatedPosts(post, 3)
      setRelatedPosts(posts)
    }
    fetchRelated()
  }, [post])
  
  // 根据文章分类推荐医院
  const recommendedHospitals = tier1Hospitals.slice(0, 3)
  
  return (
    <div className="bg-gray-50">
      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16">
          <div className="section-container">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <article key={relatedPost.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {relatedPost.featuredImage && (
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{relatedPost.excerpt}</p>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Recommended Hospitals */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommended Hospitals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedHospitals.map(hospital => (
              <div key={hospital.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                    Tier 1
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{hospital.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {hospital.specialties.slice(0, 3).map(specialty => (
                      <span key={specialty} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hospital.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{hospital.insurancePartners.length}+ Insurance Partners</span>
                    <Link
                      href="#treatments"
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.href = '/#treatments'
                      }}
                      className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Book a Free Consultation */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="section-container text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Book a Free Consultation</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Our medical coordinators are ready to assist you with hospital selection, treatment options, and travel arrangements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/8613817562808"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="h-5 w-5" />
              WhatsApp Consultation
            </a>
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = '/#contact'
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              <Building2 className="h-5 w-5" />
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
