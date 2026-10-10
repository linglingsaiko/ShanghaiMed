import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About the Founder — Sara Ma | ShanghaiMed',
  description: 'Sara Ma, Founder & Medical Director of ShanghaiMed. ISPN-certified registered nurse, senior registered nurse, and 10+ years of premium healthcare operations experience in Shanghai.',
  alternates: { canonical: 'https://shanghaimedhealth.com/founder' },
}

const credentials = [
  {
    title: 'ISPN — International Standards for Professional Nurses',
    detail: 'International certification for registered nurses, issued by the International Society of Nurses in Cancer Care and affiliated bodies',
    category: 'Nursing License',
  },
  {
    title: 'Senior Registered Nurse (主管护师)',
    detail: 'Senior-level professional title within China\u2019s national health professional ranking system, awarded by the Shanghai Municipal Health Commission',
    category: 'Professional Title',
  },
  {
    title: 'JLPT N1 — Japanese-Language Proficiency Test, Level N1',
    detail: 'Highest level of Japanese language certification, issued by the Japan Foundation and Japan Educational Exchanges and Services',
    category: 'Language Certification',
  },
  {
    title: 'Registered Nurse (RN), China',
    detail: 'Licensed by the Shanghai Municipal Health Commission',
    category: 'Nursing License',
  },
]

const experience = [
  {
    area: 'International Patient Coordination',
    detail: 'Coordinated end-to-end medical journeys for patients from the Middle East, Southeast Asia, Europe, North America, and other regions — from initial consultation through discharge and post-operative follow-up.',
  },
  {
    area: 'Hospital Navigation & Medical Translation',
    detail: 'Provided real-time medical interpretation in English, Japanese, and Mandarin for international patients at Shanghai Grade 3A (三甲) hospitals. Additional languages supported through vetted professional translators.',
  },
  {
    area: 'Premium Healthcare Operations',
    detail: 'Over 10 years of operational management at Shanghai\'s leading private medical institutions — designing care workflows, optimizing patient experience, and coordinating cross-departmental medical programmes.',
  },
  {
    area: 'Medical Tourism Operations',
    detail: 'Built operational workflows covering visa guidance, insurance direct billing (Cigna, Allianz, AXA, Bupa), accommodation coordination, and AI-powered 24/7 patient support via Navi, our medical navigator.',
  },
]

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <Image
                src="/images/sara-ma-headshot.jpg"
                alt="Sara Ma — Founder of ShanghaiMed"
                width={200}
                height={200}
                className="rounded-full object-cover border-4 border-teal-100 shadow-md"
                priority
              />
            </div>
            <div>
              <p className="text-sm text-teal-600 font-medium mb-2">Founder &amp; Medical Director</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Sara Ma</h1>
              <p className="text-lg text-gray-500">马玲玲</p>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl">
                ISPN-certified registered nurse, senior registered nurse (主管护师), and founder of ShanghaiMed.
                Over a decade of hands-on experience in premium healthcare operations and guiding international
                patients through Shanghai&apos;s healthcare system — from routine consultations to complex surgical coordination.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Why I founded ShanghaiMed */}
        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why I Founded ShanghaiMed</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              I spent over ten years working inside Shanghai&apos;s premium healthcare system — coordinating
              care for international patients, navigating hospital bureaucracy on their behalf, and watching
              the same preventable problems repeat: patients arriving without translated records, being
              routed to the wrong department, overpaying for services they didn&apos;t need, or leaving
              without understanding their own discharge instructions.
            </p>
            <p>
              The hospitals were excellent. The gap was never medical quality — it was the absence of
              someone who understood both the clinical side and the patient&apos;s side, and who could
              bridge them in the patient&apos;s own language.
            </p>
            <p>
              ShanghaiMed exists to close that gap. We charge a transparent service fee, take zero
              commission from hospitals, and treat every patient the way I would treat a family member
              navigating an unfamiliar system in a foreign country.
            </p>
          </div>
        </section>

        {/* Professional Credentials */}
        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Credentials</h2>
          <div className="space-y-4">
            {credentials.map((cred) => (
              <div key={cred.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
                    {cred.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{cred.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{cred.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Certificate Images */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verified Credentials</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/images/certificate-nurse-redacted.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border rounded-lg hover:border-teal-300 hover:bg-teal-50/30 transition-colors group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                  <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Nurse Practicing Certificate</p>
                  <p className="text-xs text-gray-500">Shanghai Municipal Health Commission</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <a
                href="/images/certificate-ispn-redacted.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border rounded-lg hover:border-teal-300 hover:bg-teal-50/30 transition-colors group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                  <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">ISPN Certificate of Achievement</p>
                  <p className="text-xs text-gray-500">CGFNS International (2017)</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Click to view verified credentials. Sensitive information redacted for privacy.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas of Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.area}>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{exp.area}</h3>
                <p className="text-sm text-gray-600">{exp.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Company */}
        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Company</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              ShanghaiMed is operated by <strong>上海可玲信息技术有限公司</strong> (Shanghai Keling
              Information Technology Co., Ltd.), a company registered in Shanghai, China.
            </p>
            <p>
              We are a full-service medical tourism facilitator — not a broker. We charge patients a
              transparent concierge service fee and take zero commission from hospitals. Medical bills
              are paid directly to the hospital at the hospital&apos;s own published rates.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <dt className="font-medium text-gray-900">Registered Name</dt>
              <dd>上海可玲信息技术有限公司</dd>
              <dd>Shanghai Keling Information Technology Co., Ltd.</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Registered Address</dt>
              <dd>Room 101, Floor 1, No. 2555 Changyang Road</dd>
              <dd>Yangpu District, Shanghai, China</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Legal Representative</dt>
              <dd>Ma Lingling (马玲玲)</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Languages</dt>
              <dd>English, 中文, 日本語</dd>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-teal-50 rounded-lg border border-teal-200 p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Have a question?</h2>
          <p className="text-gray-600 mb-4">
            I read every message personally. No sales team, no scripts.
          </p>
          <a
            href="mailto:hello@shanghaimedhealth.com"
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Get in Touch
          </a>
        </section>
      </div>
    </div>
  )
}
