import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import AgentChat from '@/components/AgentChat'
import { LanguageProvider } from '@/contexts/LanguageContext'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shanghaimedhealth.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ShanghaiMed - World-Class Medical Care in Shanghai',
    template: '%s | ShanghaiMed',
  },
  description:
    'Connect with China\'s top hospitals, bilingual nurses, and 24/7 AI support. World-class medical care in Shanghai at a fraction of the cost.',
  keywords: [
    'Shanghai medical tourism',
    'China healthcare',
    'international hospitals Shanghai',
    'bilingual nurses',
    'medical travel China',
    'Shanghai hospitals',
    'ISPN nurses',
  ],
  authors: [{ name: 'ShanghaiMed' }],
  creator: 'ShanghaiMed',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'ShanghaiMed',
    title: 'ShanghaiMed - World-Class Medical Care in Shanghai',
    description:
      'Connect with China\'s top hospitals, bilingual nurses, and 24/7 AI support at a fraction of the cost.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ShanghaiMed - International Medical Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShanghaiMed - World-Class Medical Care in Shanghai',
    description:
      'Connect with China\'s top hospitals, bilingual nurses, and 24/7 AI support.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
          <AgentChat />
        </LanguageProvider>
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'MedicalBusiness',
                  name: 'ShanghaiMed',
                  description: 'International medical concierge platform connecting global patients with 14 public Grade-A tertiary hospitals in Shanghai. Bilingual ISPN-certified nurses, 24/7 AI support, transparent pricing.',
                  url: siteUrl,
                  logo: `${siteUrl}/logo.png`,
                  image: `${siteUrl}/og-image.png`,
                  email: 'care@shanghaimedhealth.com',
                  priceRange: '$$$',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Shanghai',
                    addressCountry: 'CN',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 31.2304,
                    longitude: 121.4737,
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    availableLanguage: ['English', 'Chinese', 'Japanese'],
                    url: `${siteUrl}/contact`,
                  },
                  medicalSpecialty: [
                    'Neurosurgery', 'Dermatology', 'PediatricSurgery', 'Hematology',
                    'Endocrinology', 'Ophthalmology', 'Urology', 'Cardiovascular',
                    'Gastroenterology', 'ReproductiveMedicine', 'TCM',
                    'Orthopedics', 'Obstetrics', 'Dentistry', 'PlasticSurgery',
                    'GeriatricMedicine', 'RehabilitationMedicine',
                  ],
                  subOrganization: [
                    { '@type': 'Hospital', name: 'Huashan Hospital (Fudan University)', medicalSpecialty: ['Neurosurgery', 'Dermatology', 'InfectiousDisease'], certification: ['JCI Certified', 'HMI Partnership'], description: 'Ranked #1 in dermatology and neurosurgery nationwide.' },
                    { '@type': 'Hospital', name: 'Children\'s Hospital of Fudan University', medicalSpecialty: ['Neonatology', 'PediatricSurgery', 'CriticalCareMedicine'], certification: ['JCI Certified', 'HIMSS EMRAM Stage 6'], description: 'Leading center for neonatal care and pediatric rare diseases.' },
                    { '@type': 'Hospital', name: 'Ruijin Hospital (SJTU)', medicalSpecialty: ['Hematology', 'Endocrinology', 'Burns'], certification: ['JCI Certified', 'National EMR Level 7'], description: '95.7% CAR-T remission rate. Pioneer in bone marrow transplantation.' },
                    { '@type': 'Hospital', name: 'Shanghai General Hospital', medicalSpecialty: ['Ophthalmology', 'Urology', 'ENT'], certification: ['DNV GL Certified', 'Mayo Clinic Partnership'], description: 'Leading ophthalmology and urology departments.' },
                    { '@type': 'Hospital', name: 'Zhongshan Hospital (Fudan University)', medicalSpecialty: ['GeneralSurgery', 'Gastroenterology', 'Cardiovascular'], certification: ['JCI Certified', 'JBI Certified'], description: 'Cardiovascular center with independent international patient building.' },
                    { '@type': 'Hospital', name: 'Renji Hospital (SJTU)', medicalSpecialty: ['Gastroenterology', 'ReproductiveMedicine', 'Rheumatology'], certification: ['DNV GL Certified'], description: '#1 gastroenterology nationwide for 4 consecutive years. Leading liver transplant center.' },
                    { '@type': 'Hospital', name: 'Longhua Hospital (Shanghai Univ. of TCM)', medicalSpecialty: ['TCM', 'TCMOncology', 'Acupuncture'], certification: ['JCI Certified', 'HIMSS EMRAM Stage 7'], description: 'Premier TCM hospital. Official pilot for TCM medical tourism.' },
                    { '@type': 'Hospital', name: 'International Peace Maternity & Child Health Hospital', medicalSpecialty: ['ReproductiveMedicine', 'Obstetrics', 'Gynecology'], certification: ['DNV GL Certified'], description: 'Leading center for high-risk pregnancy and fetal medicine.' },
                    { '@type': 'Hospital', name: 'Shanghai Children\'s Medical Center (SJTU)', medicalSpecialty: ['PediatricCardiacSurgery', 'PediatricHematologyOncology'], certification: ['JCI Certified', 'ISO 15189'], description: 'Top pediatric cardiac surgery center in China. Partnership with Project HOPE.' },
                    { '@type': 'Hospital', name: 'Shanghai Sixth People\'s Hospital', medicalSpecialty: ['Orthopedics', 'Endocrinology', 'SportsMedicine'], certification: ['JCI Certified'], description: 'World\'s first limb replantation center since 1963.' },
                    { '@type': 'Hospital', name: 'Shanghai First Maternity & Infant Hospital', medicalSpecialty: ['Obstetrics', 'FetalMedicine', 'ReproductiveMedicine'], certification: ['JCI Certified', 'APAGE Certified'], description: 'Shanghai\'s premier maternity hospital.' },
                    { '@type': 'Hospital', name: 'Xinhua Hospital (SJTU)', medicalSpecialty: ['Pediatrics', 'Dermatology', 'GeneralSurgery'], certification: ['JCI Certified'], description: 'Leading spine surgery and pediatric surgery center.' },
                    { '@type': 'Hospital', name: 'Huadong Hospital (Fudan University)', medicalSpecialty: ['GeriatricMedicine', 'RehabilitationMedicine', 'ClinicalNutrition'], certification: ['Bupa Silver Certified'], description: 'Premier geriatric medicine and executive health screening.' },
                    { '@type': 'Hospital', name: 'Shanghai Ninth People\'s Hospital (SJTU)', medicalSpecialty: ['Dentistry', 'PlasticSurgery', 'OralMaxillofacialSurgery'], certification: ['National Oral Disease Research Center'], description: 'China\'s #1 dental hospital. International Medical Department opened Jan 2024. Patients from 40+ countries.' },
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Medical Concierge Services',
                    itemListElement: [
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Free Initial Consultation' }, price: '0', priceCurrency: 'USD' },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Essential Care Concierge (3 days, up to 8h/day)' }, price: '1000', priceCurrency: 'USD' },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Complex Care Concierge (5 days, up to 8h/day)' }, price: '1650', priceCurrency: 'USD' },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Half-Day Add-On (4 hours)' }, price: '200', priceCurrency: 'USD' },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full-Day Add-On (8 hours)' }, price: '350', priceCurrency: 'USD' },
                    ],
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '5.0',
                    reviewCount: '5',
                  },
                },
                {
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'How much does medical care cost in Shanghai compared to the US?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Medical procedures in Shanghai typically cost 60-80% less than in the US. Examples: MRI scan from $300 (US: $1,000+), specialist consultation from $70 (US: $250+), dental implant from $800 (US: $3,000+), IVF treatment from $4,200 (US: $15,000+), cardiac bypass surgery from $11,000 (US: $80,000+). ShanghaiMed concierge packages: Essential Care $1,000/3 days, Complex Care $1,650/5 days. Medical expenses are paid directly to hospitals.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Which hospitals does ShanghaiMed partner with?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'ShanghaiMed partners with 14 public Grade-A tertiary hospitals designated as medical tourism pilots: Huashan Hospital (Fudan, #1 neurosurgery/dermatology), Shanghai Ninth People\'s Hospital (SJTU, #1 dental in China), Ruijin Hospital (SJTU, 95.7% CAR-T remission rate), Zhongshan Hospital (Fudan, cardiovascular center), Renji Hospital (SJTU, #1 gastroenterology), Longhua Hospital (premier TCM), Shanghai Children\'s Medical Center (SJTU, top pediatric cardiac surgery), and 7 others. All have dedicated international departments with English-speaking staff and direct insurance settlement with 16+ international insurers.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Do I need a visa for medical treatment in Shanghai?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'China offers 240-hour (10-day) visa-free transit for citizens of 54 countries including the US, UK, Australia, Canada, and most EU nations. For longer stays, ShanghaiMed provides medical visa support with invitation letters from partner hospitals. The 240-hour visa-free option is sufficient for most Essential Care (3-day) and Complex Care (5-day) packages.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Will language be a barrier during my medical treatment?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'No. ShanghaiMed provides ISPN-certified (International Standards for Professional Nurses) bilingual registered nurses who accompany you throughout your entire medical journey. Services include real-time medical interpretation during consultations, medical document translation, hospital navigation, and discharge support. All medical reports can be provided in English.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Is it safe to get medical treatment in China?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. All ShanghaiMed partner hospitals are public Grade-A tertiary hospitals (China\'s highest rating) with JCI, DNV GL, or equivalent international certifications. Many have partnerships with Mayo Clinic, Massachusetts General Hospital, and Project HOPE. Shanghai handles 73,000+ international patient visits annually from 90+ countries with 25% year-over-year growth.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What is included in the ShanghaiMed concierge packages?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Essential Care ($1,000/3 days) and Complex Care ($1,650/5 days) include: airport pickup/drop-off, hotel coordination, in-person medical accompaniment (up to 8h/day), real-time interpretation, medical report translation, examination scheduling, medication coordination, hospital/specialist matching, transportation/local guidance, WeChat/WhatsApp support, visa assistance, and post-care remote follow-up. Medical expenses are paid directly to hospitals and are separate from concierge fees.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Can I use my international health insurance?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. ShanghaiMed partner hospitals accept 16+ international insurance providers including MSH, Bupa, Cigna, Aetna, AXA, Allianz, AIA, Ping An Health, and International SOS. Many hospitals offer direct settlement (no upfront payment). ShanghaiMed nurses provide insurance support including policy benefit checks and hospital insurance coverage confirmation.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What treatments are available through ShanghaiMed?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'ShanghaiMed supports: executive health screening, specialist consultations, cardiac surgery, orthopedic surgery (hip/knee replacement, spinal fusion), cancer treatment (chemotherapy, CAR-T therapy), IVF and reproductive medicine, dental implants and oral surgery, plastic and reconstructive surgery, TCM (acupuncture, herbal therapy), pediatric care, ophthalmology, and more. Each patient receives a personalized hospital and specialist matching based on their condition.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How do I start my medical journey with ShanghaiMed?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: '1) Submit an inquiry via the contact form on shanghaimedhealth.com (AI navigator available 24/7). 2) Receive a consultation within 24 hours with hospital options and cost estimates. 3) Confirm and travel — we coordinate appointments, travel logistics, and arrival support. 4) Receive care with bilingual nurse accompaniment throughout. 5) Follow-up care including medical records, remote consultations, and prescription coordination.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What makes Shanghai different from other medical tourism destinations?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Shanghai offers: 14 public Grade-A hospitals designated as medical tourism pilots (vs. private clinics in Thailand/India), 73,000+ annual international patient visits, ISPN-certified bilingual nurses (rare in other destinations), 240-hour visa-free transit for 54 countries, direct insurance settlement with 16+ international insurers, and costs 60-80% lower than the US. Shanghai is also a major tourism hub — patients can combine medical care with world-class dining, sightseeing, and cultural experiences.',
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />

      </body>
    </html>
  )
}
