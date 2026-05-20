'use client'

import React from 'react'
import { TrendingDown, Globe, Award, Clock, Building2 } from 'lucide-react'
import Card from '../ui/Card'
import { statistics, costComparison } from '@/lib/constants'

const WhyShanghai: React.FC = () => {
  const statIcons = [Building2, Globe, Award, Globe, Clock]

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Why Shanghai
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
            The World&apos;s Leading Medical Tourism Destination
          </h2>
          <p className="text-gray-600 text-lg">
            Shanghai combines world-class medical expertise with unmatched
            cost savings, making it the top choice for international patients
            seeking quality healthcare.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
          {statistics.map((stat, index) => {
            const Icon = statIcons[index]
            return (
              <Card key={index} className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </Card>
            )
          })}
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* International Recognition */}
          <Card className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  Global Recognition
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Huashan Hospital has served patients from <strong>100+ countries</strong> with 600,000+ international patient visits
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Renji Hospital partners with UK&apos;s HarleyDoc for seamless cross-border referrals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      13 public Grade-A hospitals designated as medical tourism pilots with dedicated international services
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Visa & Travel */}
          <Card className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  Easy Travel Access
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      <strong>240-hour transit visa-free</strong> entry for international travelers from many countries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Dedicated medical visa assistance for longer treatments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Airport pickup and hospital transfer services available
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Cost Comparison */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary">
                Dramatic Cost Savings
              </h3>
              <p className="text-gray-600">Same quality, fraction of the cost</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {costComparison.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm text-center"
              >
                <p className="text-gray-500 mb-2">{item.procedure}</p>
                <div className="flex items-baseline justify-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-primary line-through">
                    {item.usCost}
                  </span>
                  <span className="text-3xl font-bold text-accent">
                    {item.shanghaiCost}
                  </span>
                </div>
                <span className="inline-block bg-accent-50 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                  Save {item.savings}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyShanghai
