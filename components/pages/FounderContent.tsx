'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

interface Credential {
  title: string
  detail: string
  category: string
}

interface ExperienceItem {
  area: string
  detail: string
}

const credentialsData: Record<'en' | 'ja', Credential[]> = {
  en: [
    {
      title: 'ISPN — International Standards for Professional Nurses',
      detail: 'International certification for registered nurses, issued by the International Society of Nurses in Cancer Care and affiliated bodies',
      category: 'Nursing License',
    },
    {
      title: 'Senior Registered Nurse (主管护师)',
      detail: 'Senior-level professional title within China’s national health professional ranking system, awarded by the Shanghai Municipal Health Commission',
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
  ],
  ja: [
    {
      title: 'ISPN — International Standards for Professional Nurses',
      detail: '国際看護師向けの国際認定。国際がん看護学会（ISNCC）および関連機関により授与。',
      category: '看護師免許',
    },
    {
      title: '上級看護師（主管护师）',
      detail: '中国の国家衛生専門技術資格制度における上級の専門職称号。上海市衛生健康委員会より授与。',
      category: '専門職称号',
    },
    {
      title: 'JLPT N1 — 日本語能力試験 最高レベル',
      detail: '日本語能力試験の最高レベル。国際交流基金および日本国際教育支援協会より授与。',
      category: '語学資格',
    },
    {
      title: '登録看護師（RN）、中国',
      detail: '上海市衛生健康委員会より看護師執業資格を取得。',
      category: '看護師免許',
    },
  ],
}

const experienceData: Record<'en' | 'ja', ExperienceItem[]> = {
  en: [
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
      detail: "Over 10 years of operational management at Shanghai's leading private medical institutions — designing care workflows, optimizing patient experience, and coordinating cross-departmental medical programmes.",
    },
    {
      area: 'Medical Tourism Operations',
      detail: 'Built operational workflows covering visa guidance, insurance direct billing (Cigna, Allianz, AXA, Bupa), accommodation coordination, and AI-powered 24/7 patient support via Navi, our medical navigator.',
    },
  ],
  ja: [
    {
      area: '国際患者コーディネーション',
      detail: '中東、東南アジア、ヨーロッパ、北米などの患者を対象に、初回相談から退院・術後フォローアップまで、受診の全行程を調整。',
    },
    {
      area: '病院案内・医療通訳',
      detail: '上海の三級甲等（三甲）病院で、国際患者向けに英語・日本語・中国語のリアルタイム医療通訳を提供。その他の言語は、審査済みの専門通訳者を手配可能。',
    },
    {
      area: 'ハイエンド医療機関の運営',
      detail: '上海を代表する民間医療機関で10年以上の運営管理経験。診療フローの設計、患者体験の改善、部門横断的な医療プログラムの調整を担当。',
    },
    {
      area: '医療観光オペレーション',
      detail: 'ビザ案内、保険の直接請求（Cigna、Allianz、AXA、Bupa）、宿泊手配、医療ナビゲーター「Navi」によるAI 24時間サポートまで、業務フローを構築。',
    },
  ],
}

const text = {
  en: {
    role: 'Founder & Medical Director',
    intro:
      "ISPN-certified registered nurse, senior registered nurse (主管护师), and founder of ShanghaiMed. Over a decade of hands-on experience in premium healthcare operations and guiding international patients through Shanghai's healthcare system — from routine consultations to complex surgical coordination.",
    whyTitle: 'Why I Founded ShanghaiMed',
    whyP1:
      "I spent over ten years working inside Shanghai's premium healthcare system — coordinating care for international patients, navigating hospital bureaucracy on their behalf, and watching the same preventable problems repeat: patients arriving without translated records, being routed to the wrong department, overpaying for services they didn't need, or leaving without understanding their own discharge instructions.",
    whyP2:
      "The hospitals were excellent. The gap was never medical quality — it was the absence of someone who understood both the clinical side and the patient's side, and who could bridge them in the patient's own language.",
    whyP3:
      "ShanghaiMed exists to close that gap. We charge a transparent service fee, take zero commission from hospitals, and treat every patient the way I would treat a family member navigating an unfamiliar system in a foreign country.",
    credentialsTitle: 'Professional Credentials',
    verifiedTitle: 'Verified Credentials',
    nurseCertName: 'Nurse Practicing Certificate',
    ispnCertName: 'ISPN Certificate of Achievement',
    certFootnote: 'Click to view verified credentials. Sensitive information redacted for privacy.',
    experienceTitle: 'Areas of Experience',
    companyTitle: 'About the Company',
    companyP1:
      'ShanghaiMed is operated by 上海可玲信息技术有限公司 (Shanghai Keling Information Technology Co., Ltd.), a company registered in Shanghai, China.',
    companyP2:
      "We are a full-service medical tourism facilitator — not a broker. We charge patients a transparent concierge service fee and take zero commission from hospitals. Medical bills are paid directly to the hospital at the hospital's own published rates.",
    registeredName: 'Registered Name',
    registeredAddress: 'Registered Address',
    legalRepresentative: 'Legal Representative',
    languages: 'Languages',
    ctaTitle: 'Have a question?',
    ctaBody: 'I read every message personally. No sales team, no scripts.',
    ctaButton: 'Get in Touch',
  },
  ja: {
    role: '創業者 兼 メディカルディレクター',
    intro:
      'ISPN認定看護師、主管护师（上級看護師職位）、ShanghaiMed創業者。10年以上にわたり、ハイエンド医療機関の運営と、国際患者の上海での受診サポートに実務で携わってきました。日常的な診察から複雑な手術調整まで対応します。',
    whyTitle: 'ShanghaiMedを創業した理由',
    whyP1:
      '私は10年以上、上海のハイエンド医療の現場で働いてきました。国際患者の受診を調整し、病院の手続きを代行する中で、同じ「防げたはずの問題」が繰り返されるのを目の当たりにしてきました。翻訳された診療記録を持たずに来院する患者、誤った科に回される患者、不要なサービスに過剰な費用を払う患者、退院時の指示を理解できないまま帰宅する患者——。',
    whyP2:
      '病院は優れていました。問題は医療の質では決してなく、医療側と患者側の双方を理解し、患者自身の言葉でその橋渡しをできる人がいなかったことです。',
    whyP3:
      'ShanghaiMedはその溝を埋めるために存在します。透明性のあるサービス料をいただき、病院からのコミッションは一切受け取りません。見慣れない異国の医療制度を利用するすべての患者を、家族をサポートするように対応します。',
    credentialsTitle: '保有資格',
    verifiedTitle: '資格証明（確認済み）',
    nurseCertName: '看護師執業証書',
    ispnCertName: 'ISPN資格認定証',
    certFootnote: 'クリックすると資格証明をご確認いただけます。個人情報はプライバシー保護のため黒塗り処理しています。',
    experienceTitle: '経験分野',
    companyTitle: '会社情報',
    companyP1:
      'ShanghaiMedは、中国上海で登記された上海可玲信息技术有限公司（Shanghai Keling Information Technology Co., Ltd.）により運営されています。',
    companyP2:
      '私たちは総合的な医療観光ファシリテーターであり、ブローカーではありません。患者様からは透明なコンシェルジュサービス料をいただき、病院からのコミッションは一切受け取りません。医療費は、病院が公表する料金で直接病院にお支払いいただきます。',
    registeredName: '登記名',
    registeredAddress: '登録住所',
    legalRepresentative: '法定代表人',
    languages: '対応言語',
    ctaTitle: 'ご質問がありますか？',
    ctaBody: 'すべてのメッセージに私自身が目を通しています。営業チームも台本もありません。',
    ctaButton: 'お問い合わせ',
  },
}

export default function FounderContent() {
  const { language } = useLanguage()
  const t = text[language]
  const credentials = credentialsData[language]
  const experience = experienceData[language]

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
              <p className="text-sm text-teal-600 font-medium mb-2">{t.role}</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Sara Ma</h1>
              <p className="text-lg text-gray-500">马玲玲</p>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl">{t.intro}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Why I founded ShanghaiMed */}
        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.whyTitle}</h2>
          <div className="prose prose-gray max-w-none">
            <p>{t.whyP1}</p>
            <p>{t.whyP2}</p>
            <p>{t.whyP3}</p>
          </div>
        </section>

        {/* Professional Credentials */}
        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.credentialsTitle}</h2>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.verifiedTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/images/certificate-nurse-redacted.png"
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
                  <p className="text-sm font-medium text-gray-900">{t.nurseCertName}</p>
                  <p className="text-xs text-gray-500">
                    {language === 'ja' ? '上海市衛生健康委員会' : 'Shanghai Municipal Health Commission'}
                  </p>
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
                  <p className="text-sm font-medium text-gray-900">{t.ispnCertName}</p>
                  <p className="text-xs text-gray-500">CGFNS International (2017)</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">{t.certFootnote}</p>
          </div>
        </section>

        {/* Experience */}
        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.experienceTitle}</h2>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.companyTitle}</h2>
          <div className="prose prose-gray max-w-none">
            <p>{t.companyP1}</p>
            <p>{t.companyP2}</p>
          </div>
          <div className="mt-6 pt-6 border-t grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <dt className="font-medium text-gray-900">{t.registeredName}</dt>
              <dd>上海可玲信息技术有限公司</dd>
              <dd>Shanghai Keling Information Technology Co., Ltd.</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">{t.registeredAddress}</dt>
              <dd>{language === 'ja' ? '長陽路2555号1階101室' : 'Room 101, Floor 1, No. 2555 Changyang Road'}</dd>
              <dd>{language === 'ja' ? '中国上海市楊浦区' : 'Yangpu District, Shanghai, China'}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">{t.legalRepresentative}</dt>
              <dd>Ma Lingling (马玲玲)</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">{t.languages}</dt>
              <dd>{language === 'ja' ? '英語・中国語・日本語' : 'English, 中文, 日本語'}</dd>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-teal-50 rounded-lg border border-teal-200 p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t.ctaTitle}</h2>
          <p className="text-gray-600 mb-4">{t.ctaBody}</p>
          <a
            href="mailto:hello@shanghaimedhealth.com"
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            {t.ctaButton}
          </a>
        </section>
      </div>
    </div>
  )
}
