import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import AgentChat from '@/components/AgentChat'
import { LanguageProvider } from '@/contexts/LanguageContext'
import HtmlLangDirSetter from '@/components/HtmlLangDirSetter'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shanghaimedhealth.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ShanghaiMed - World-Class Medical Care in Shanghai',
    template: '%s | ShanghaiMed',
  },
  description:
    'Free, confidential medical consultation with top Shanghai specialists. Connect with 19 partner hospitals including all Shanghai Grade 3A public hospitals and 5 international hospitals. Transparent pricing — Free consultation, On-site Hospital Escort $50/hour (standalone or add-on), Health Checkup Concierge $500/1 day, Essential Care Concierge $1,000/3 days, Surgery & Extended Care Concierge $1,650/5 days. English-Chinese & Japanese-Chinese medical interpretation, insurance support, and 24/7 emergency on-site assistance.',
  keywords: [
    'Shanghai medical tourism',
    'free medical consultation Shanghai',
    'China healthcare',
    'international hospitals Shanghai',
    'Grade 3A hospitals Shanghai',
    'bilingual medical concierge',
    'medical travel China',
    'Shanghai hospitals',
    'ISPN nurses',
    'insurance support Shanghai',
    'specialist matching Shanghai',
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
      'Free medical consultation, hospital escort from $50/hour (standalone or add-on), and concierge packages from $500. 14 Grade 3A + 5 international partner hospitals. English-Chinese & Japanese-Chinese medical interpretation, insurance support, 24/7 emergency on-site assistance.',
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
      'Free medical consultation, hospital escort from $50/hour (standalone or add-on), and concierge packages from $500. Transparent pricing, insurance support, EN/ZH & JA/ZH medical interpretation.',
    images: ['/og-image.png'],
  },
  alternates: {
    languages: {
      en: `${siteUrl}/`,
      ja: `${siteUrl}/ja`,
      ar: `${siteUrl}/ar`,
      ru: `${siteUrl}/ru`,
      mn: `${siteUrl}/mn`,
      ms: `${siteUrl}/ms`,
      id: `${siteUrl}/id`,
    },
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
  other: {
    'llms-txt': '/llms.txt',
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
          <HtmlLangDirSetter />
          <Header />
          <main dir="ltr">{children}</main>
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
                  telephone: '+86 131-6228-1901',
                  sameAs: [
                    'https://www.youtube.com/@linglingma-r9u6b',
                    'https://wa.me/8613818274110',
                  ],
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Room 101, Floor 1, No. 2555 Changyang Road',
                    addressLocality: 'Shanghai',
                    addressRegion: 'Shanghai',
                    postalCode: '200090',
                    addressCountry: 'CN',
                  },
                  areaServed: { '@type': 'Place', name: 'Shanghai, China' },
                  availableLanguage: ['English', 'Chinese', 'Japanese', 'Arabic', 'Russian', 'Mongolian'],
                  paymentAccepted: ['Cash', 'Credit Card', 'Wire Transfer', 'Insurance Direct Billing'],
                  founder: {
                    '@type': 'Person',
                    name: 'Sara Ma',
                    jobTitle: 'Founder',
                    url: `${siteUrl}/founder`,
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    availableLanguage: ['English', 'Chinese', 'Japanese', 'Arabic', 'Russian', 'Mongolian'],
                    url: `${siteUrl}/free-consultation`,
                    email: 'info@shanghaimedhealth.com',
                  },
                  medicalSpecialty: [
                    'Neurosurgery', 'Dermatology', 'PediatricSurgery', 'Hematology',
                    'Endocrinology', 'Ophthalmology', 'Urology', 'Cardiovascular',
                    'Gastroenterology', 'ReproductiveMedicine', 'TCM',
                    'Orthopedics', 'Obstetrics', 'Dentistry', 'PlasticSurgery',
                    'GeriatricMedicine', 'RehabilitationMedicine',
                  ],
                  subOrganization: [
                    { '@type': 'Hospital', name: 'Huashan Hospital (Fudan University)', medicalSpecialty: ['Neurosurgery', 'Dermatology', 'InfectiousDisease'], description: 'Ranked #1 in dermatology and neurosurgery nationwide; 24 international insurance partners.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Children\'s Hospital of Fudan University', medicalSpecialty: ['Neonatology', 'PediatricSurgery', 'CriticalCareMedicine'], description: 'Leading center for neonatal care and pediatric rare diseases; 23 insurance partners.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Ruijin Hospital (SJTU)', medicalSpecialty: ['Hematology', 'Endocrinology', 'Burns'], description: 'Pioneer in CAR-T therapy and bone marrow transplantation; 21 insurance partners.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Shanghai General Hospital', medicalSpecialty: ['Ophthalmology', 'Urology', 'ENT'], description: 'Leading ophthalmology and urology departments.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Zhongshan Hospital (Fudan University)', medicalSpecialty: ['GeneralSurgery', 'Gastroenterology', 'Cardiovascular'], description: 'Cardiovascular center with dedicated international patient facilities.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Renji Hospital (SJTU)', medicalSpecialty: ['Gastroenterology', 'ReproductiveMedicine', 'Rheumatology'], description: 'Leading gastroenterology and liver transplant center; 20 insurance partners.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Longhua Hospital (Shanghai Univ. of TCM)', medicalSpecialty: ['TCM', 'TCMOncology', 'Acupuncture'], description: 'Premier TCM hospital and official medical tourism pilot; 16 insurance partners.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'International Peace Maternity & Child Health Hospital', medicalSpecialty: ['ReproductiveMedicine', 'Obstetrics', 'Gynecology'], description: 'Leading center for high-risk pregnancy and fetal medicine; 8 insurance partners.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Shanghai Children\'s Medical Center (SJTU)', medicalSpecialty: ['PediatricCardiacSurgery', 'PediatricHematologyOncology'], description: 'Top pediatric cardiac surgery center in China.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Shanghai Sixth People\'s Hospital', medicalSpecialty: ['Orthopedics', 'Endocrinology', 'SportsMedicine'], description: 'World\'s first limb replantation center since 1963; 12 insurance partners.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Shanghai First Maternity & Infant Hospital', medicalSpecialty: ['Obstetrics', 'FetalMedicine', 'ReproductiveMedicine'], description: 'Shanghai\'s premier maternity hospital.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Xinhua Hospital (SJTU)', medicalSpecialty: ['Pediatrics', 'Dermatology', 'GeneralSurgery'], description: 'Leading pediatric and general surgery center; 15 insurance partners.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Huadong Hospital (Fudan University)', medicalSpecialty: ['GeriatricMedicine', 'RehabilitationMedicine', 'ClinicalNutrition'], description: 'Premier geriatric medicine and health screening center; 12 insurance partners.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Shanghai Ninth People\'s Hospital (SJTU)', medicalSpecialty: ['Dentistry', 'PlasticSurgery', 'OralMaxillofacialSurgery'], description: 'China\'s #1 dental and plastic surgery hospital; patients from 40+ countries; 8 insurance partners.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Jiahui International Hospital', medicalSpecialty: ['Oncology', 'Cardiology', 'WomenHealth', 'Pediatrics'], description: 'International hospital affiliated with Massachusetts General Hospital; direct billing with major international insurers.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Shanghai United Family Hospital', medicalSpecialty: ['FamilyMedicine', 'Pediatrics', 'Obstetrics', 'Emergency'], description: 'Joint Commission International (JCI) accredited international hospital; 50+ insurance partners.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'ParkwayHealth', medicalSpecialty: ['PrimaryCare', 'SpecialtyClinics', 'HealthScreening'], description: 'International clinic network with multiple locations across Shanghai.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'SinoUnited Health', medicalSpecialty: ['PrimaryCare', 'SpecialtyCare', 'Rehabilitation', 'SecondOpinion'], description: 'International clinic with Mayo Clinic collaboration and second opinion services.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                    { '@type': 'Hospital', name: 'Shanghai Raffles Hospital', medicalSpecialty: ['FamilyMedicine', 'SpecialtyCare', 'HealthScreening'], description: 'International hospital part of Raffles Medical Group.', address: { '@type': 'PostalAddress', addressLocality: 'Shanghai', addressRegion: 'Shanghai', addressCountry: 'CN' } },
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Medical Concierge Services',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        name: 'On-site Hospital Escort',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'On-site Hospital Escort',
                          serviceType: 'Standalone hourly hospital escort / package add-on',
                          description: '$50/hour on-site hospital escort with English-Chinese medical interpretation (daytime). Available standalone or as an add-on to any concierge package. Includes on-site escort companion, on-site queue/payment/medication pickup assistance, and a check-in message on visit day. Does NOT include appointment scheduling, doctor matching, airport pickup, medical document translation, visa support, insurance pre-authorization, interpretation in languages other than English, or post-visit follow-up — those are covered by concierge packages.',
                        },
                        price: '50',
                        priceCurrency: 'USD',
                        unitCode: 'HUR',
                        availableChannel: {
                          '@type': 'ServiceChannel',
                          serviceUrl: 'https://wa.me/8613818274110',
                        },
                        includesService: [
                          'On-site escort companion at the hospital',
                          'English-Chinese on-site medical interpretation · other languages at additional cost',
                          'On-site queue, payment and medication pickup assistance',
                          'Check-in message on visit day',
                        ],
                      },
                      {
                        '@type': 'Offer',
                        name: 'Free Initial Consultation',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Free Initial Consultation',
                          serviceType: 'Medical consultation and specialist matching',
                          description: 'Confidential, no-obligation consultation with top specialist matching and transparent cost estimate.',
                        },
                        price: '0',
                        priceCurrency: 'USD',
                        url: `${siteUrl}/free-consultation`,
                        availableChannel: {
                          '@type': 'ServiceChannel',
                          serviceUrl: 'https://wa.me/8613818274110',
                        },
                        includesService: [
                          'Medical needs assessment',
                          'Hospital & specialist recommendations',
                          'Estimated medical budget',
                          'Insurance guidance',
                        ],
                      },
                      {
                        '@type': 'Offer',
                        name: 'Essential Care Concierge',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Essential Care Concierge',
                          serviceType: 'Medical concierge package',
                          description: '$1,000 / 3 days of on-site nurse accompaniment (daytime). Required for all specialist consultations and medical conditions. Includes complete coordination across appointments, English-Chinese on-site medical interpretation, medical report translation, appointment scheduling, medication pickup & delivery, hospital & specialist matching, local transportation/payment/billing assistance, dedicated WhatsApp support, visa invitation letter support, 30-day post-care remote follow-up, and insurance support including pre-authorization.',
                        },
                        price: '1000',
                        priceCurrency: 'USD',
                        includesService: [
                          '3 full days on-site nurse accompaniment (daytime)',
                          'Airport pickup & drop-off',
                          'Hotel coordination assistance',
                          'English-Chinese on-site medical interpretation',
                          'Medical report translation & summaries',
                          'Doctor appointment scheduling',
                          'Medication pickup & delivery',
                          'Hospital & specialist matching',
                          'Local transportation, navigation & payment/billing assistance',
                          'Dedicated WhatsApp support throughout your stay',
                          'Visa invitation letter support',
                          '30-day post-care remote follow-up',
                          'Insurance support · pre-authorization',
                        ],
                      },
                      {
                        '@type': 'Offer',
                        name: 'Health Checkup Concierge',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Health Checkup Concierge',
                          serviceType: 'Medical concierge package',
                          description: '$500 / 1 day of on-site nurse accompaniment (daytime). For 1-day health checkup programs only. Includes airport pickup & drop-off, hotel coordination, English-Chinese on-site medical interpretation, health checkup report translation and result explanation, appointment scheduling, medication pickup & delivery, insurance support including pre-authorization, and 30-day post-checkup follow-up.',
                        },
                        price: '500',
                        priceCurrency: 'USD',
                        includesService: [
                          '1 full-day on-site nurse accompaniment (daytime)',
                          'Airport pickup & drop-off',
                          'Hotel coordination assistance',
                          'English-Chinese on-site medical interpretation',
                          'Health checkup report translation & result explanation',
                          'Clinic appointment scheduling',
                          'Medication pickup & delivery',
                          'Hospital & specialist matching',
                          'Local transportation, navigation & payment assistance',
                          'Dedicated WhatsApp support throughout your stay',
                          'Visa invitation letter support',
                          '30-day post-checkup remote follow-up',
                          'Insurance support · pre-authorization',
                        ],
                      },
                      {
                        '@type': 'Offer',
                        name: 'Surgery & Extended Care Concierge',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Surgery & Extended Care Concierge',
                          serviceType: 'Medical concierge package',
                          description: '$1,650 / 5 days of on-site nurse accompaniment covering pre-op, surgery day, and post-op (daytime). For surgery, inpatient procedures, and extended treatment plans. Includes complete coordination plus surgery-specific support: pre-admission coordination, surgery-day nurse accompaniment, inpatient check-ins, family communication & progress updates, 60-day post-care remote follow-up, and insurance support including pre-authorization and surgical deposit coordination.',
                        },
                        price: '1650',
                        priceCurrency: 'USD',
                        includesService: [
                          '5 full days on-site nurse accompaniment (pre-op, surgery day & post-op, daytime)',
                          'Airport pickup & drop-off',
                          'Hotel & extended-stay coordination',
                          'English-Chinese on-site medical interpretation (including surgery-day support)',
                          'Full medical report translation & surgical briefing',
                          'Surgeon appointment & pre-admission scheduling',
                          'Pre-surgery preparation & admission coordination',
                          'Medication pickup & delivery (including post-op prescriptions)',
                          'Hospital & surgeon matching',
                          'Inpatient check-ins during hospital stay',
                          'Local transportation, navigation & payment/billing assistance',
                          'Dedicated WhatsApp support throughout your stay',
                          'Medical visa invitation letter support',
                          'Family communication & progress updates',
                          '60-day post-care remote follow-up',
                          'Insurance support · pre-authorization & surgical deposit coordination',
                        ],
                      },
                      {
                        '@type': 'Offer',
                        name: 'Additional Companion Hours',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Additional Companion Hours',
                          serviceType: 'Add-on companion hours',
                          description: 'Additional on-site nurse companion hours beyond the included days of a concierge package, or extension time for the hourly escort. $50/hour, daytime.',
                        },
                        price: '50',
                        priceCurrency: 'USD',
                        unitCode: 'HUR',
                        includesService: [
                          'Additional on-site nurse hours beyond package days or booked escort time',
                          'Available as an add-on to any concierge package or hourly booking',
                        ],
                      },
                      {
                        '@type': 'Offer',
                        name: 'Emergency On-site Support',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Emergency On-site Support',
                          serviceType: '24/7 emergency on-site medical concierge support',
                          description: '$300 emergency call-out (available 24/7, includes first 4 hours), then $100/hour for additional on-site companion support. For urgent medical situations requiring immediate hospital navigation and coordination. In life-threatening emergencies, call 120 (China ambulance) immediately.',
                        },
                        price: '300',
                        priceCurrency: 'USD',
                        availableChannel: {
                          '@type': 'ServiceChannel',
                          serviceUrl: 'https://wa.me/8613818274110',
                        },
                      },
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
                        text: 'Medical procedures in Shanghai cost 50-80% less than in the US. Examples: knee replacement $5,000-$10,000 (US: $30,000-$50,000), cardiac bypass $11,000-$21,000 (US: $80,000-$150,000), MRI scan (3T) $300-$500 (US: $1,200-$3,000), dental implant per tooth $800-$1,200 (US: $4,000-$6,000), IVF cycle $4,200-$6,000 (US: $15,000+), cataract surgery $1,000-$2,000 (US: $3,500-$6,000), executive health screening from $700 (US: $2,500+). ShanghaiMed offers a free initial consultation (no obligation), an on-site hospital escort at $50/hour (standalone or add-on, English-Chinese interpretation, daytime), and three concierge packages: Health Checkup Concierge $500/1 day, Essential Care Concierge $1,000/3 days, and Surgery & Extended Care Concierge $1,650/5 days covering pre-op, surgery day, and post-op support. Additional companion hours beyond package days or booked escort time are available at $50/hour. Emergency on-site support is available 24/7 for a $300 call-out (includes first 4 hours), then $100/hour. Japanese-Chinese interpretation is also included in all packages at no extra cost; other languages require an additional interpreter at Shanghai market rates. Hospital and clinic treatment costs (including health checkup packages starting from ~$700) are billed separately at local rates; ShanghaiMed does not charge hospital commissions.',
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
                        text: 'ShanghaiMed partners with 14 public Grade 3A (top-tier) hospitals and 5 private international hospitals, 19 featured partners in total. Public partners include Huashan Hospital (Fudan University), Children\'s Hospital of Fudan University, Ruijin Hospital (SJTU), Shanghai General Hospital, Zhongshan Hospital (Fudan University), Renji Hospital (SJTU), Longhua Hospital (TCM), International Peace Maternity & Child Health Hospital, Shanghai Children\'s Medical Center, Sixth People\'s Hospital, First Maternity & Infant Hospital, Xinhua Hospital, Huadong Hospital, and Ninth People\'s Hospital. Private partners are Jiahui International Hospital (Massachusetts General Hospital affiliation), Shanghai United Family Hospital, ParkwayHealth, SinoUnited Health (Mayo Clinic collaboration and second opinion services), and Shanghai Raffles Hospital. Beyond these featured partners, ShanghaiMed can arrange appointments at all public Grade 3A (tertiary) hospitals across Shanghai.',
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
                        text: "ShanghaiMed offers a free no-obligation initial consultation, a standalone/add-on on-site hospital escort at $50/hour (daytime, English-Chinese interpretation only; other languages at additional cost), and three concierge packages. Health Checkup Concierge ($500 / 1 day / daytime) is for 1-day health checkup programs only and includes 1 full day of on-site nurse accompaniment, airport pickup & drop-off, hotel coordination, English-Chinese on-site medical interpretation, health checkup report translation with result explanation, appointment scheduling, medication pickup & delivery, insurance support including pre-authorization, and 30-day post-checkup follow-up (13 services total). Essential Care Concierge ($1,000 / 3 days / daytime) is required for all specialist consultations and medical conditions and includes 3 full days of on-site accompaniment, airport pickup & drop-off, hotel coordination, English-Chinese on-site medical interpretation at all appointments, medical report translation, appointment scheduling, medication pickup & delivery, hospital & specialist matching, local transportation/navigation/payment assistance, dedicated WhatsApp support, visa invitation letter support, insurance support including pre-authorization, and 30-day post-treatment follow-up (13 services total). Surgery & Extended Care Concierge ($1,650 / 5 days / daytime) covers pre-op, surgery day, and post-op for surgical and inpatient cases and includes all Essential Care services plus pre-admission coordination, surgery-day nurse accompaniment, inpatient check-ins, family progress updates, 60-day post-care follow-up, and insurance support including pre-authorization and surgical deposit coordination (16 services total). English-Chinese and Japanese-Chinese interpretation are included in all packages at no extra cost; other languages (Arabic, Russian, Mongolian, Korean, French, etc.) require an additional interpreter at Shanghai market rates — ask Sara for an exact quote before booking. Family members and your own interpreter are welcome at no extra charge; larger vehicles for larger groups may require an upgrade fee. NOT included (paid directly to providers at local rates): medical fees (doctor consultations, tests, medication, procedures, and health checkup packages starting from ~$700), accommodation, and international flights. Emergency on-site support is available 24/7 at $300 (includes first 4 hours), then $100/hour; in life-threatening emergencies call 120 immediately.",
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
                        text: 'Yes. ShanghaiMed partner hospitals have direct settlement agreements with major international insurers, ranging from 8 to 24 insurers per hospital: Huashan Hospital has 24 insurance partners, Shanghai Children\'s Medical Center 23, Ruijin Hospital 21, and Renji Hospital 20. Accepted insurers include MSH, Bupa, Cigna, Aetna, AXA, Allianz, AIA, and International SOS. ShanghaiMed provides insurance support including policy benefit checks and pre-authorization letters. Where direct billing is available, we coordinate with the hospital on your behalf; otherwise, patients pay the hospital directly and claim reimbursement from their insurer with our documentation support.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What happens after my medical treatment in Shanghai?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'ShanghaiMed provides comprehensive post-treatment follow-up: remote video check-ups with your treating doctor, translated medical records (full discharge summary, test results, and medication list in English), medication guidance on dosage, side effects, and interactions, personalized recovery planning, home-country coordination (sharing your medical records with your primary care physician with your consent), and ongoing support after you return home. Follow-up continues for 30 days after treatment.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How much does a medical concierge service cost in Shanghai?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "ShanghaiMed offers a free initial consultation (no obligation), a standalone/add-on on-site hospital escort at $50/hour (daytime, English-Chinese interpretation; other languages at additional cost), and three concierge packages: $500 for a 1-day Health Checkup Concierge (daytime, for health checkup programs only), $1,000 for a 3-day Essential Care Concierge (daytime, required for all specialist consultations and medical conditions), and $1,650 for a 5-day Surgery & Extended Care Concierge (daytime, required for surgery and inpatient procedures) covering pre-op, surgery day, and post-op support. Additional companion hours beyond package days or booked escort time are available at $50/hour. Emergency on-site support is available 24/7 at $300 call-out (includes first 4 hours), then $100/hour. English-Chinese and Japanese-Chinese interpretation are included in all packages; other languages require an additional interpreter at Shanghai market rates. Medical fees are paid directly to hospitals or clinics — ShanghaiMed does not charge hospital commissions.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Is the initial consultation really free? What does it cover?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Yes. The initial consultation with Sara via WhatsApp is completely free and carries no obligation. On the call, we assess your medical needs, recommend suitable hospitals and specialists, give you a realistic budget estimate for treatment, and explain how insurance works. This is a decision-stage conversation; on-site services (nurse accompaniment, appointment booking, verbal interpretation) begin once you book an hourly escort or a concierge package.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Can I book just an on-site hospital escort without a full concierge package?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Yes. On-site hospital escort is available as a standalone service (or as an add-on to any package) at $50/hour, daytime. This is for patients who have already booked their own doctor appointment and only need an English-speaking companion on-site for queues, payment, medication pickup, and basic on-the-spot questions. Interpretation is English-Chinese only (other languages require an interpreter at additional cost). Hourly escort does NOT include appointment scheduling, doctor matching, airport pickup, medical document translation, visa support, insurance pre-authorization, or post-visit follow-up — those are covered by concierge packages.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: "What's included in the $1,000 Essential Care package?",
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "The 3-day Essential Care Concierge package ($1,000 USD) includes 13 concierge services: airport pickup & drop-off; hotel coordination assistance; 3 full days of on-site nurse accompaniment (daytime); English-Chinese on-site medical interpretation during all appointments; medical report translation and summaries; doctor appointment scheduling; medication pickup & delivery; hospital and specialist matching; local transportation, navigation, and payment/billing assistance; dedicated WhatsApp support throughout your stay; visa invitation letter support; 30-day post-care remote follow-up; and insurance support including pre-authorization.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Does the concierge fee include medical treatment costs?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "No. ShanghaiMed charges an independent concierge coordination fee. Medical fees — including doctor consultations, diagnostic tests, medication, procedures, and health checkup packages starting from ~$700 — are paid directly to the hospital or clinic at local rates. ShanghaiMed does not mark up medical services and does not receive commissions from hospitals. This separation ensures ShanghaiMed always provides independent, unbiased recommendations.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How much is a comprehensive health checkup in Shanghai, and what does the $500 Health Checkup Concierge cover?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Executive health screenings at leading Shanghai Grade 3A hospitals and premium international clinics start from around $700 (compared to $2,500+ in the U.S.), with premium packages ranging up to $1,500+ depending on scope. The $500 Health Checkup Concierge package includes 13 ShanghaiMed concierge services — airport pickup & drop-off, hotel coordination, 1 full day of on-site nurse accompaniment, English-Chinese on-site medical interpretation, health checkup report translation with result explanation, pre-checkup appointment scheduling, medication pickup & delivery, insurance support including pre-authorization, and 30-day post-checkup follow-up. The health checkup fee itself (from ~$700) is paid directly to the clinic at local rates.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Is there a concierge package for surgery or extended treatment in Shanghai?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Yes. The Surgery & Extended Care Concierge ($1,650 USD / 5 days) covers pre-op preparation, surgery day, and post-op support for surgical and inpatient cases. It includes all 13 services from the Essential Care package (3 days of on-site nurse accompaniment extended to 5 days) plus pre-admission coordination, surgery-day nurse accompaniment, inpatient check-ins during hospital stay, family communication & progress updates, 60-day post-care remote follow-up, and insurance support including pre-authorization and surgical deposit coordination — 16 services total. Surgical procedure fees are paid directly to the hospital at local rates — typically 50-80% less than in the US for procedures such as knee replacement ($5,000-$10,000 vs US $30,000-$50,000), cardiac bypass ($11,000-$21,000 vs US $80,000-$150,000), and cataract surgery ($1,000-$2,000 vs US $3,500-$6,000).",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Is emergency or after-hours medical support available?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Yes. Emergency on-site support is available 24/7 for a $300 call-out fee (includes the first 4 hours), then $100/hour for additional on-site companion support, regardless of daytime or nighttime. In life-threatening emergencies, call 120 (China's national ambulance number) immediately and go to the nearest hospital — Chinese ambulance services operate in Mandarin; we can coordinate hospital communication right after your call.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What languages are included? Can I get interpretation in another language?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "All packages include English-Chinese on-site medical interpretation. Japanese-Chinese interpretation is also included at no extra cost — just specify Japanese at booking. If you need another language (Arabic, Russian, Mongolian, Korean, French, Spanish, etc.), we can arrange an additional interpreter at Shanghai market rates, which depend on the rarity of the language and medical terminology requirements. Tell Sara which language you need during consultation and she will quote the exact price before booking.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What is the cancellation and refund policy?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Cancellations made more than 14 days before arrival receive a full refund minus a small administrative fee. Cancellations within 14 days of arrival receive a partial refund depending on costs already incurred (pre-booked doctor appointments, document translation). Same-day cancellations and no-shows are non-refundable. Emergency medical situations, visa denials, and other force-majeure cases are reviewed case by case.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Can I bring family members or my own interpreter?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Absolutely. Family members are welcome to accompany you at no extra charge, and you are welcome to bring your own interpreter. Our nurse focuses on medical coordination and hospital navigation regardless of group size. The only exception is if your group requires a larger vehicle (e.g., a minivan for 4+ people); the transportation cost difference may be charged additionally.",
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
