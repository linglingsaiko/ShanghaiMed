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
                  legalName: 'Shanghai Keling Information Technology Co., Ltd.',
                  description: 'Medical tourism facilitator coordinating international patients with top Shanghai hospitals. ISPN-certified bilingual nursing leadership, AI-powered 24/7 navigator, transparent pricing.',
                  url: siteUrl,
                  logo: `${siteUrl}/logo.png`,
                  image: `${siteUrl}/og-image.png`,
                  email: 'info@shanghaimedhealth.com',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Room 101, Floor 1, No. 2555 Changyang Road',
                    addressLocality: 'Shanghai',
                    addressRegion: 'Shanghai',
                    addressCountry: 'CN',
                  },
                  founder: {
                    '@type': 'Person',
                    name: 'Sara Ma',
                    jobTitle: 'Founder',
                    url: `${siteUrl}/founder`,
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
                    { '@type': 'Hospital', name: 'Huashan Hospital (Fudan University)', medicalSpecialty: ['Neurosurgery', 'Dermatology', 'InfectiousDisease'], description: 'Ranked #1 in dermatology and neurosurgery nationwide.' },
                    { '@type': 'Hospital', name: 'Children\'s Hospital of Fudan University', medicalSpecialty: ['Neonatology', 'PediatricSurgery', 'CriticalCareMedicine'], description: 'Leading center for neonatal care and pediatric rare diseases.' },
                    { '@type': 'Hospital', name: 'Ruijin Hospital (SJTU)', medicalSpecialty: ['Hematology', 'Endocrinology', 'Burns'], description: 'Pioneer in CAR-T therapy and bone marrow transplantation.' },
                    { '@type': 'Hospital', name: 'Shanghai General Hospital', medicalSpecialty: ['Ophthalmology', 'Urology', 'ENT'], description: 'Leading ophthalmology and urology departments.' },
                    { '@type': 'Hospital', name: 'Zhongshan Hospital (Fudan University)', medicalSpecialty: ['GeneralSurgery', 'Gastroenterology', 'Cardiovascular'], description: 'Cardiovascular center with dedicated international patient facilities.' },
                    { '@type': 'Hospital', name: 'Renji Hospital (SJTU)', medicalSpecialty: ['Gastroenterology', 'ReproductiveMedicine', 'Rheumatology'], description: 'Leading gastroenterology and liver transplant center.' },
                    { '@type': 'Hospital', name: 'Longhua Hospital (Shanghai Univ. of TCM)', medicalSpecialty: ['TCM', 'TCMOncology', 'Acupuncture'], description: 'Premier TCM hospital and medical tourism pilot.' },
                    { '@type': 'Hospital', name: 'International Peace Maternity & Child Health Hospital', medicalSpecialty: ['ReproductiveMedicine', 'Obstetrics', 'Gynecology'], description: 'Leading center for high-risk pregnancy and fetal medicine.' },
                    { '@type': 'Hospital', name: 'Shanghai Children\'s Medical Center (SJTU)', medicalSpecialty: ['PediatricCardiacSurgery', 'PediatricHematologyOncology'], description: 'Top pediatric cardiac surgery center in China.' },
                    { '@type': 'Hospital', name: 'Shanghai Sixth People\'s Hospital', medicalSpecialty: ['Orthopedics', 'Endocrinology', 'SportsMedicine'], description: 'World\'s first limb replantation center since 1963.' },
                    { '@type': 'Hospital', name: 'Shanghai First Maternity & Infant Hospital', medicalSpecialty: ['Obstetrics', 'FetalMedicine', 'ReproductiveMedicine'], description: 'Shanghai\'s premier maternity hospital.' },
                    { '@type': 'Hospital', name: 'Xinhua Hospital (SJTU)', medicalSpecialty: ['Pediatrics', 'Dermatology', 'GeneralSurgery'], description: 'Leading pediatric and general surgery center.' },
                    { '@type': 'Hospital', name: 'Huadong Hospital (Fudan University)', medicalSpecialty: ['GeriatricMedicine', 'RehabilitationMedicine', 'ClinicalNutrition'], description: 'Premier geriatric medicine and health screening center.' },
                    { '@type': 'Hospital', name: 'Shanghai Ninth People\'s Hospital (SJTU)', medicalSpecialty: ['Dentistry', 'PlasticSurgery', 'OralMaxillofacialSurgery'], description: 'China\'s #1 dental and plastic surgery hospital; patients from 40+ countries.' },
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Medical Concierge Services',
                    itemListElement: [
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Free Initial Consultation' }, price: '0', priceCurrency: 'USD' },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Essential Care Concierge (3 days)' }, price: '1000', priceCurrency: 'USD' },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Complex Care Concierge (5 days)' }, price: '1650', priceCurrency: 'USD' },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Half-Day Add-On (4 hours)' }, price: '200', priceCurrency: 'USD' },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full-Day Add-On (8 hours)' }, price: '350', priceCurrency: 'USD' },
                    ],
                  },
                },
                {
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'How much does medical treatment cost in Shanghai compared to the US?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Medical procedures in Shanghai cost 50-80% less than in the US. Examples: knee replacement $5,000-$10,000 (US: $30,000-$50,000), cardiac bypass $11,000-$21,000 (US: $80,000-$150,000), MRI scan (3T) $200-$400 (US: $1,200-$3,000), dental implant per tooth $800-$1,200 (US: $4,000-$6,000), IVF cycle $3,000-$5,000 (US: $12,000-$15,000), cataract surgery $1,000-$2,000 (US: $3,500-$6,000), comprehensive health checkup $300-$600 (US: $2,000-$5,000). ShanghaiMed companion service packages are $1,000 for 3 days (Essential Care) or $1,650 for 5 days (Complex Care), covering hospital coordination, bilingual escort, translation, and logistics. Hospital treatment costs are billed separately at local rates.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Is medical tourism in Shanghai safe for international patients?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. Shanghai\'s top hospitals meet international safety standards: Huashan Hospital (Fudan University), Grade 3A (China\'s highest hospital rating) with 24 international insurance partners; Ruijin Hospital (SJTU), Grade 3A, national leader in hematology and CAR-T cell therapy with National EMR Level 7; Zhongshan Hospital (Fudan University), Grade 3A with an independent international patient building; Shanghai Ninth People\'s Hospital (SJTU), Grade 3A, national center for dental, oral, and plastic surgery; Longhua Hospital (Shanghai University of TCM), Grade 3A, official TCM medical tourism pilot hospital. These hospitals use the same medical equipment (Siemens, GE Healthcare, Philips) and implant brands (Stryker, Zimmer, Straumann) found in US hospitals, and many senior physicians have trained at Johns Hopkins, Mayo Clinic, and Cleveland Clinic.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Which hospitals in Shanghai does ShanghaiMed work with?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'ShanghaiMed partners with 14 public Grade-A medical tourism pilot hospitals and 5 private international hospitals, 19 institutions in total. Public partners include Huashan Hospital (Fudan University), Children\'s Hospital of Fudan University, Ruijin Hospital (SJTU), Shanghai General Hospital, Zhongshan Hospital (Fudan University), Renji Hospital (SJTU), Longhua Hospital (TCM), International Peace Maternity & Child Health Hospital, Shanghai Children\'s Medical Center, Sixth People\'s Hospital, First Maternity & Infant Hospital, Xinhua Hospital, Huadong Hospital, and Ninth People\'s Hospital. Private partners are Jiahui International Hospital (Massachusetts General Hospital affiliation), Shanghai United Family Hospital, ParkwayHealth, SinoUnited Health (Mayo Clinic collaboration and second opinion services), and Shanghai Raffles Hospital.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Do doctors in Shanghai speak English?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Many senior doctors at Shanghai\'s top hospitals have international training and speak English, and physicians regularly publish in English-language medical journals. To guarantee zero communication gaps, ShanghaiMed provides professional bilingual medical companions (English-Chinese) who accompany you to every appointment, translate medical terminology accurately, help with hospital paperwork and navigation, and ensure you fully understand your diagnosis, treatment plan, and medication. All medical documents, treatment plans, and prescriptions are translated into English for your records.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How do I get a medical visa for China?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'ShanghaiMed assists with the complete visa process: (1) free initial consultation via video call; (2) a medical invitation letter issued by the partner hospital after consultation; (3) you submit the invitation letter with your visa application to the Chinese embassy or consulate; (4) processing typically takes 2-4 weeks; (5) ShanghaiMed provides translation of all required documents. China also offers a 240-hour transit visa exemption for citizens of 54 countries, including the US, UK, Canada, Australia, and most EU nations, which may be sufficient for shorter medical trips.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What is included in the ShanghaiMed service package?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Essential Care Package ($1,000 / 3 days) includes hospital appointment scheduling at 1 hospital, bilingual medical escort (English-Chinese), medical translation at all appointments, local transportation to and from hospital, and AI-powered pre-consultation and cost estimation. Complex Care Package ($1,650 / 5 days) includes everything in Essential Care plus multi-hospital coordination (2+ hospitals), specialist appointment booking, post-treatment follow-up (30 days of remote video check-ups), and visa assistance and airport pickup. Not included and billed separately by the hospital at local rates: hospital treatment costs (surgery, medication, lab tests), accommodation, and international flights.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Can I combine medical treatment with tourism in Shanghai?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Absolutely. Shanghai is China\'s most international city, with the Bund waterfront, the 400-year-old Yu Garden, Shanghai Tower (the world\'s 2nd tallest building at 632m), Shanghai Disneyland, and the tree-lined French Concession. Many patients schedule a medical appointment on Day 1-2 and spend the remaining days exploring the city. ShanghaiMed helps integrate medical appointments into your travel itinerary so you do not waste vacation time.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What medical procedures are most popular for medical tourists in Shanghai?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Popular procedures with typical savings versus the US: orthopedic surgery (knee/hip replacement, spine surgery, about 80%, at Sixth People\'s Hospital and Huashan Hospital), plastic surgery (rhinoplasty, facial reconstruction, 70-80%, Ninth People\'s Hospital), dental treatment (implants, crowns, orthodontics, 70-80%, Ninth People\'s Hospital), Traditional Chinese Medicine (acupuncture, herbal therapy, Tuina, 75-80%, Longhua Hospital), cancer treatment (chemotherapy, CAR-T, immunotherapy, 60-80%, Ruijin and Huashan), cardiac surgery (bypass, valve replacement, about 80%, Zhongshan Hospital), fertility treatment (IVF, ICSI, about 75%, Renji and IPMCH), and executive health screening (full-day checkup, about 88%, Huadong Hospital).',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Can I use my international health insurance?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. ShanghaiMed partner hospitals have direct settlement agreements with major international insurers, ranging from 8 to 24 insurers per hospital: Huashan Hospital has 24 insurance partners, Shanghai Children\'s Medical Center 23, Ruijin Hospital 21, and Renji Hospital 20. Accepted insurers include MSH, Bupa, Cigna, Aetna, AXA, Allianz, AIA, and International SOS. ShanghaiMed assists with insurance verification and direct settlement before your trip.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What happens after my medical treatment in Shanghai?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'ShanghaiMed provides comprehensive post-treatment follow-up: remote video check-ups with your treating doctor (Complex Care), translated medical records (full discharge summary, test results, and medication list in English), medication guidance on dosage, side effects, and interactions, personalized recovery planning, home-country coordination (sharing your medical records with your primary care physician with your consent), and ongoing support after you return home. For Complex Care patients, follow-up continues for 30 days after treatment.',
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
