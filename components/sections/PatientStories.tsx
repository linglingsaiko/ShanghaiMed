'use client'

import React from 'react'
import { Quote, Star, Flag } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { patientStories } from '@/lib/constants'

const PatientStories: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Patient Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            Real Experiences, Real Results
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from international patients who chose Shanghai for their
            medical care and transformed their health journey.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {patientStories.map((story) => (
            <Card key={story.id} className="p-8 relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-accent/20">
                <Quote className="w-16 h-16" />
              </div>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{story.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Flag className="w-3 h-3" />
                    <span>{story.nationality}</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-xl font-bold text-primary mb-4">
                &ldquo;{story.title}&rdquo;
              </h4>

              {/* Content */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {story.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag, index) => (
                  <Badge key={index} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Quote Footer */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-2 text-accent">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">
                  Verified Patient Experience
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { value: '5,000+', label: 'International Patients Served' },
              { value: '98%', label: 'Patient Satisfaction Rate' },
              { value: '4.9/5', label: 'Average Rating' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="flex items-center justify-center gap-1 text-gray-600">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-accent fill-current"
                    />
                  ))}
                  <span className="ml-2">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ready to write your own success story?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Your Journey
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default PatientStories
