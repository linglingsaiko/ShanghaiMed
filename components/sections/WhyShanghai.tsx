'use client'

import React from 'react'
import { TrendingDown, Globe, Award, Clock, Building2 } from 'lucide-react'
import Card from '../ui/Card'
import { statistics, priceReference } from '@/lib/constants'

const WhyShanghai: React.FC = () => {
  const statIcons = [Building2, Globe, Award, Globe, Clock]

  return (
    <section id="why-shanghai" className="py-20 lg:py-28 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Why Shanghai
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mt-4 mb-6">
            World-Class Healthcare
            <br />
            Simplified for International Patients
          </h2>
          <p className="text-gray-600 text-lg">
            Shanghai offers access to leading hospitals, experienced specialists, transparent pricing, and personalized support for international patients.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
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
                <p className="text-sm font-medium text-gray-800">
                  {stat.label}
                </p>
              </Card>
            )
          })}
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Internationally Recognized Healthcare System */}
          <Card className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  Internationally Recognized Healthcare System
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>
                      Leading hospitals serving patients from around the world
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>
                      Dedicated international departments with English-language services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>
                      Public Grade-A hospitals designated for international medical services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>
                      Access to specialists across oncology, cardiology, neurology, orthopedics, fertility care, and more
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Convenient Travel and Medical Access */}
          <Card className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  Convenient Travel and Medical Access
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>
                      240-hour visa-free transit available for travelers from many countries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>
                      Medical visa support for extended treatment plans
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>
                      Airport pickup and transportation assistance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>
                      End-to-end coordination throughout your healthcare journey
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Price Reference Section */}
        <Card className="p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-3">
                High-Quality Healthcare at Competitive Prices
              </h3>
              <p className="text-gray-600">
                Many U.S. patients still face significant out-of-pocket healthcare expenses despite having insurance coverage.
                <br />
                Figures reflect typical out-of-pocket costs and may vary by provider, location, insurance coverage, and treatment plan.
              </p>
            </div>
          </div>

          {/* Price Comparison Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-4 px-4 text-lg font-bold text-gray-700 rounded-tl-xl">Service</th>
                  <th className="text-center py-4 px-4 text-lg font-bold text-accent">Shanghai</th>
                  <th className="text-center py-4 px-4 text-lg font-bold text-gray-700 rounded-tr-xl">Typical U.S. Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-primary">Executive Health Screening</td>
                  <td className="py-4 px-4 text-center font-semibold text-accent">From $700</td>
                  <td className="py-4 px-4 text-center text-gray-600">From $2,500</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-primary">MRI Scan</td>
                  <td className="py-4 px-4 text-center font-semibold text-accent">From $300</td>
                  <td className="py-4 px-4 text-center text-gray-600">From $1,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-primary">CT Scan</td>
                  <td className="py-4 px-4 text-center font-semibold text-accent">From $150</td>
                  <td className="py-4 px-4 text-center text-gray-600">From $500</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-primary">Specialist Consultation</td>
                  <td className="py-4 px-4 text-center font-semibold text-accent">From $70</td>
                  <td className="py-4 px-4 text-center text-gray-600">From $250</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-primary">IVF Treatment</td>
                  <td className="py-4 px-4 text-center font-semibold text-accent">From $4,200</td>
                  <td className="py-4 px-4 text-center text-gray-600">From $15,000</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-primary rounded-bl-xl">Dental Implant</td>
                  <td className="py-4 px-4 text-center font-semibold text-accent">From $800</td>
                  <td className="py-4 px-4 text-center text-gray-600 rounded-br-xl">From $3,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Why Patients Choose Shanghai */}
          <div className="bg-white rounded-xl p-6 mb-8">
            <h4 className="text-lg font-bold text-primary mb-4">Why Patients Find Value in Shanghai</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Access to leading hospitals and specialists</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Transparent pricing before treatment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Faster access to consultations, imaging, and treatment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Lower out-of-pocket healthcare costs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700">Personalized bilingual support throughout the patient journey</span>
              </li>
            </ul>
          </div>

          {/* Important Notes */}
          <div className="bg-accent-50 border border-accent/20 rounded-lg p-6">
            <h4 className="font-semibold text-primary mb-3">Important Notes</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Prices are provided for illustrative purposes only and do not constitute a quotation.</li>
              <li>• Actual medical fees are determined by the hospital, physician, and treatment plan.</li>
              <li>• U.S. pricing reflects typical self-pay costs and may vary significantly based on insurance coverage and location.</li>
              <li>• Exchange rates are for reference only and may fluctuate.</li>
              <li>• Complex treatments, surgeries, cancer care, and inpatient services require an individualized quotation following medical review.</li>
            </ul>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default WhyShanghai
