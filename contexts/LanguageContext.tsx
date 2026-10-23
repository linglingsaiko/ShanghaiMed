'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { getLocaleFromPathname } from '@/lib/i18n'

export type Language = 'en' | 'ja' | 'ar' | 'ru' | 'mn' | 'ms' | 'id'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  tArr: (key: string) => any[]
  localePath: (path: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const enTranslations = {
    nav: {
      whyShanghai: 'Why Shanghai',
      howItWorks: 'How It Works',
      treatments: 'Treatments',
      careTeam: 'Care Team',
      trust: 'Trust',
      items: ['Why Shanghai', 'How It Works', 'Hospital Network', 'Care Team', 'Pricing', 'Blog', 'Contact'],
    },
    whyShanghai: {
      badge: 'Why Shanghai',
      title: 'World-Class Healthcare, Simplified for International Patients',
      subtitle: 'Shanghai offers access to leading hospitals, experienced specialists, transparent pricing, and personalized support for international patients.',
      stats: [
        { label: "Shanghai's Annual International Patient Visits" },
        { label: 'Public Grade-A Medical Tourism Pilots' },
        { label: 'Nationalities Served' },
        { label: 'Year-over-Year Growth' },
      ],
      healthSystem: {
        title: 'Internationally Recognized Healthcare System',
        items: [
          'Leading hospitals serving patients from around the world',
          'Dedicated international departments with English-language services',
          'Public Grade-A hospitals designated for international medical services',
          'Access to specialists across oncology, cardiology, neurology, orthopedics, fertility care, and more',
        ],
      },
      travelAccess: {
        title: 'Convenient Travel and Medical Access',
        items: [
          '240-hour visa-free transit available for travelers from many countries',
          'Medical visa support for extended treatment plans',
          'Airport pickup and transportation assistance',
          'End-to-end coordination throughout your healthcare journey',
        ],
      },
      pricing: {
        title: 'High-Quality Healthcare at Competitive Prices',
        subtitleLine1: 'Many U.S. patients still face significant out-of-pocket healthcare expenses despite having insurance coverage.',
        subtitleLine2: 'Figures reflect typical out-of-pocket costs and may vary by provider, location, insurance coverage, and treatment plan.',
        tableService: 'Service',
        tableShanghai: 'Shanghai',
        tableUs: 'Typical U.S. Cost',
        rows: [
          { service: 'Executive Health Screening', shanghai: 'From $700', us: 'From $2,500' },
          { service: 'MRI Scan', shanghai: 'From $300', us: 'From $1,000' },
          { service: 'CT Scan', shanghai: 'From $150', us: 'From $500' },
          { service: 'Specialist Consultation', shanghai: 'From $70', us: 'From $250' },
          { service: 'IVF Treatment', shanghai: 'From $4,200', us: 'From $15,000' },
          { service: 'Dental Implant', shanghai: 'From $800', us: 'From $3,000' },
        ],
        valueTitle: 'Why Patients Find Value in Shanghai',
        valueItems: [
          'Access to leading hospitals and specialists',
          'Transparent pricing before treatment',
          'Faster access to consultations, imaging, and treatment',
          'Lower out-of-pocket healthcare costs',
          'Personalized English–Chinese support throughout the patient journey',
        ],
        notesTitle: 'Important Notes',
        notes: [
          'Prices are provided for illustrative purposes only and do not constitute a quotation.',
          'Actual medical fees are determined by the hospital, physician, and treatment plan.',
          'U.S. pricing reflects typical self-pay costs and may vary significantly based on insurance coverage and location.',
          'Exchange rates are for reference only and may fluctuate.',
          'Complex treatments, surgeries, cancer care, and inpatient services require an individualized quotation following medical review.',
        ],
      },
    },
    processFlow: {
      badge: 'Your Journey',
      title: 'From Inquiry to Care',
      subtitle: 'A complete timeline of your medical tourism experience in Shanghai, with professional support at every step.',
      phases: [
        {
          phase: 'Before You Arrive',
          steps: [
            { title: 'Online Inquiry', description: 'AI Navigator responds instantly' },
            { title: 'Medical Assessment', description: 'Collect symptoms, recommend hospitals' },
            { title: 'Cost Estimate', description: 'Transparent pricing for consultation & basic tests' },
            { title: 'Visa & Travel', description: 'Visa-free/240h transit guidance, travel tips' },
          ],
        },
        {
          phase: 'During Your Visit',
          steps: [
            { title: 'Airport Pick-up', description: 'English–Chinese nurse meets you' },
            { title: 'Hospital Visit', description: 'Nurse-accompanied consultation & tests' },
            { title: 'Treatment', description: 'World-class care at leading hospitals' },
            { title: 'Inpatient Care', description: 'Dedicated nursing support (if needed)' },
          ],
        },
        {
          phase: 'After Your Visit',
          steps: [
            { title: 'Discharge & Translation', description: 'English medical reports' },
            { title: 'Follow-up', description: 'Remote support, prescription coordination' },
          ],
        },
      ],
    },
    careTeam: {
      title: 'English–Chinese Registered Nurses',
      subtitle: 'Dedicated healthcare companions at every stage of your medical journey in Shanghai.',
      badge: 'Care Team',
      expertTeam: 'Expert Care Team',
      ispnCertified: 'ISPN Certified',
      ispnDesc: 'International Standards for Professional Nurses',
      ispnIssuer: 'Certified by CGFNS (USA)',
      credentialsTitle: 'Nurse Credentials',
      servicesTitle: 'Our Nursing Services',
      nursingCare: 'English–Chinese Nursing Care',
      appointmentCoordination: 'Appointment Coordination',
      translationServices: 'Translation Services',
      transportation: 'Transportation Arrangements',
      medicalReports: 'Medical Report Translation',
      emergencySupport: 'Emergency Support',
      services: [
        { title: 'Pre-Treatment Consultation', description: 'Review medical records, explain procedures, and coordinate with hospital specialists.' },
        { title: 'Appointment Scheduling', description: 'Arrange doctor consultations, diagnostic tests, and treatment sessions.' },
        { title: 'Translation & Interpretation', description: 'Real-time medical interpretation during consultations and procedures.' },
        { title: 'Hospital Navigation', description: 'Guide through admission, checkout, and payment processes.' },
        { title: 'Discharge Support', description: 'Medication instructions, follow-up appointments, and medical report translation.' },
        { title: 'Insurance Support', description: 'Provide administrative support for policy benefit checks & hospital insurance coverage confirmation' },
      ],
      credentials: [
        { name: 'Licensed Registered Nurses (RN)', detail: 'Verified by Shanghai Health Commission' },
        { name: 'Multilingual Certification', detail: 'Fluent in English and Chinese' },
        { name: 'JLPT N1 Certified', detail: '日本語能力試験 N1 — Japanese-Language Proficiency Test (highest level)' },
        { name: 'Medical Interpretation', detail: 'Supports medical document translation and on-site interpretation' },
        { name: 'International Patient Care', detail: '10+ years experience' },
      ],
    },
    hero: {
        badge1: 'International Insurance Hospitals',
        badge2: 'English–Chinese Registered Nurses',
        badge3: '24/7 AI + Human Support',
        title: 'Healthcare in Shanghai',
        titleHighlight: 'Designed Around You',
        subtitle: "Connect with China's top hospitals, English–Chinese nurses, and 24/7 AI support — all through one platform.",
        cta: 'Book a Free Consultation',
      },
    testimonials: {
      badge: 'Patient Stories',
      title: 'What Our Patients Say',
      subtitle: 'Real stories from real patients who transformed their health journey with us.',
      patientsServed: 'Patients Served',
      countries: 'Countries',
      satisfactionRate: 'Satisfaction Rate',
      totalSavings: 'Total Savings',
      saved: 'Saved',
    },
    treatments: {
      title: 'Shanghai\'s Leading Hospitals',
      subtitle: 'Access leading hospitals across Shanghai, with recommendations tailored to your medical needs.',
      hospitalNetwork: 'Hospital Network',
      publicHospitals: 'Public Tier 1 Hospitals',
      privateHospitals: 'Private International Hospitals',
      viewAll: 'View All Hospitals',
      keyDepartments: 'Key Departments',
      certifications: 'International Certifications',
      insurance: 'Insurance:',
      all: 'All',
      modalAllHospitals: 'All Hospitals',
      modalHospitalsAvailable: 'hospitals available',
      modalAllGradeA: 'access to all Shanghai Grade 3A hospitals',
      modalAll: 'All Hospitals',
      modalPublicGradeA: 'Public Grade-A',
      modalInternationalPrivate: 'International Private',
      modalIns: 'Ins:',
      featuredTitle: 'Trusted Hospitals',
      featuredSubtitle: "China's top-ranked public hospitals with dedicated international departments",
      learnMore: 'Learn More',
    },
    howItWorks: {
      title: 'Five Simple Steps',
      subtitle: 'From your first inquiry to post-treatment follow-up, we support every step of your medical journey in Shanghai.',
      badge: 'How It Works',
      simpleProcess: 'Simple Process',
      step1Title: 'AI Consultation',
      step1Desc: 'Our AI Navigator responds instantly to understand your needs.',
      step2Title: 'Care Team Assignment',
      step2Desc: 'An experienced nurse is assigned as your care coordinator.',
      step3Title: 'Arrival in Shanghai',
      step3Desc: 'Complete support including airport transfer and hotel booking.',
      step4Title: 'Treatment & Recovery',
      step4Desc: 'Seamless integration of specialist treatment, English–Chinese support, and post-care follow-up.',
      steps: [
        { title: 'Submit Inquiry', description: 'Fill out our contact form with your medical needs. Our AI navigator is available 24/7.' },
        { title: 'Receive Consultation', description: 'Within 24 hours, a human coordinator provides hospital options and cost estimates.' },
        { title: 'Confirm & Travel', description: "Once you're ready to proceed, we coordinate appointments, travel logistics, and arrival support." },
        { title: 'Receive Care', description: 'Your English–Chinese nurse provides in-person support throughout consultations, examinations, and treatment.' },
        { title: 'Follow-Up Care', description: 'We assist with medical records, follow-up appointments, prescription coordination, and remote consultations.' },
      ],
    },
    trust: {
      badge: 'Why Choose Us',
      title: 'Your Trusted Medical Tourism Partner',
      subtitle: "We provide professional, transparent, and reliable medical tourism services in Shanghai. Here's what sets us apart.",
      ctaText: 'Ready to experience professional medical tourism services?',
      ctaButton: 'Start Your Medical Tourism',
    },
    pricing: {
      badge: 'Pricing',
      eyebrow: 'No Hidden Fees',
      title: 'Concierge Pricing',
      subtitle: 'One transparent concierge fee per person. Medical fees are paid directly to hospitals at local rates — we do not charge hospital commissions.',
      usdLabel: 'USD',
      whatsIncluded: "What's included",
      freeCard: {
        name: 'Free Initial Consultation',
        subtitle: 'Get the information you need before you commit — no obligation, no payment.',
        badge: 'Free',
        unit: 'Free',
        scope: 'Talk to Sara first — no obligation, no payment.',
        items: [
          'Medical needs assessment',
          'Hospital & specialist recommendations',
          'Treatment cost estimate',
          'Insurance guidance',
        ],
        itemsLabel: 'What you get — 4 services',
        callout: '<strong>Decision-stage call only.</strong> This free call helps you figure out the right hospital, doctor, and budget range. On-site services begin when you book an hourly escort or a concierge package.',
        cta: 'Chat with Sara on WhatsApp',
      },
      hourlyCard: {
        name: 'On-site Hospital Escort',
        subtitle: 'For patients who already booked their own doctor.',
        scope: 'Booked and paid by the hour, available standalone <em style="font-style:italic;color:#7b8c99">or</em> as an add-on to any package.',
        items: [
          'On-site escort companion at the hospital',
          'English–Chinese on-site medical interpretation · other languages extra',
          'On-the-spot guidance (queue, payment, pharmacy pickup)',
          'Same-day check-in message after visit',
        ],
        itemsLabel: "What's included — 4 services",
        callout: '<strong>Scope boundary:</strong> Hourly escort is on-site companion and English–Chinese interpretation only. It does <strong>not</strong> include appointment scheduling, doctor matching, airport pickup, report translation, visa support, insurance pre-authorization, interpretation in languages other than English, or post-care follow-up.',
        cta: 'Book hourly escort',
      },
      checkupCard: { subtitle: 'Dedicated nurse for a single day.' },
      essentialCard: { subtitle: 'Complete coordination across appointments, interpretation, insurance, and logistics.' },
      surgeryCard: { subtitle: 'Coordinated support through surgery and inpatient stay.' },
      essentialBadge: 'Most Commonly Chosen',
      packages: [
        {
          name: 'Health Checkup Concierge',
          unit: 'per person · 1 day (daytime)',
          description: 'For 1-day health checkup programs only.',
          itemsLabel: "What's included — 13 services",
          allItems: [
            '1 full-day on-site nurse (daytime)',
            'Hotel coordination assistance',
            'Health screening report translation & explanation',
            'Medication pickup & delivery',
            'Local transportation & payment help',
            'Visa invitation letter support',
            'Insurance support',
            'Airport pickup & drop-off · standard sedan',
            'English–Chinese on-site medical interpretation',
            'Doctor appointment scheduling',
            'Hospital & specialist matching',
            'Dedicated WhatsApp support',
            '30-day post-checkup remote follow-up',
          ],
        },
        {
          name: 'Essential Care Concierge',
          unit: 'per person · 3 days (daytime)',
          description: 'Required for all specialist consultations and medical conditions.',
          itemsLabel: "What's included — 13 services",
          allItems: [
            '3 days on-site nurse (daytime)',
            'Pre-visit medical records review',
            'Doctor & specialist matching',
            'Hospital appointment scheduling',
            'Airport pickup & drop-off · standard sedan',
            'Hotel & local transport coordination',
            'English–Chinese on-site medical interpretation',
            'On-site navigation & payment help',
            'Medical report translation',
            'Medication pickup & delivery',
            'Dedicated WhatsApp support throughout',
            'Insurance support · pre-authorization',
            '30-day post-care remote follow-up',
          ],
        },
        {
          name: 'Surgery & Extended Care',
          unit: 'per person · 5 days (daytime)',
          description: 'Required for surgery and inpatient procedures.',
          itemsLabel: "What's included — 16 services",
          allItems: [
            '5 days on-site nurse (daytime)',
            'Pre-admission coordination',
            'Surgery-day accompaniment',
            'Inpatient check-ins during stay',
            'Family communication & progress updates',
            'Pre-surgery records review & briefing',
            'Doctor & hospital selection guidance',
            'Airport pickup & drop-off · standard sedan',
            'Hotel & extended-stay support',
            'English–Chinese on-site medical interpretation',
            'On-site navigation & payment/billing assistance',
            'Surgical report translation',
            'Medication pickup & delivery',
            'Dedicated WhatsApp support',
            'Insurance & surgical deposit coordination',
            '60-day post-care follow-up',
          ],
        },
      ],
      faqTitle: 'Pricing & Service FAQs',
      faqSub: 'Common questions about pricing, scope, insurance, and special situations.',
      viewAllFaq: 'See all pricing & service FAQs',
      faqLinkDesc: 'Pricing, insurance, visas, payments, and medical care — common questions answered',
      faqItems: [
        { q: 'Is the free consultation really free?', a: 'Yes. Your initial consultation via WhatsApp is completely <strong>free with no obligation</strong>. We assess your medical needs, recommend hospitals and specialists, provide a cost estimate, and explain insurance options — all before you pay anything. On-site services begin only when you book an hourly escort or a concierge package.' },
        { q: 'Can I book hourly escort without buying a package?', a: 'Yes. The <strong>$50/hour on-site escort</strong> is designed as a standalone service for patients who have already booked their own doctor and only need in-hospital companion support. It is also available as an add-on to extend companion hours beyond the days included in a concierge package. Note: hourly escort covers on-site presence and English–Chinese interpretation only — scheduling, doctor matching, airport transfer, and insurance coordination require a concierge package. As an add-on to concierge packages, extra companion hours beyond included days are also billed at $50/hour.' },
        { q: 'What does the $1,000 Essential package include?', a: 'The <strong>Essential Care Concierge covers 3 full daytime companion days</strong>: pre-visit medical records review, doctor matching, multi-appointment scheduling, English–Chinese on-site interpretation at every visit, hospital navigation, airport pickup &amp; drop-off in a standard sedan (special vehicles cost extra), medical report translation, medication pickup &amp; delivery, dedicated WhatsApp support throughout your stay, insurance support including policy benefit checks and pre-authorization letters, and 30-day post-care follow-up. This package is required for all specialist consultations and any medical condition.' },
        { q: 'Do you handle health insurance?', a: 'We provide <strong>insurance support</strong>, including checking your policy benefits, helping you obtain pre-authorization letters, and coordinating hospital paperwork. Where your insurer has a direct-billing arrangement with the hospital, we help coordinate the process. Where direct billing is not available, you pay the hospital directly and we provide the documentation your insurer needs for reimbursement. We do not guarantee coverage or direct-billing approval — decisions are made by your insurer.' },
        { q: 'Are medical fees included in concierge pricing?', a: 'No. The concierge fee is for our coordination and companion services only. <strong>Medical fees (doctor consultations, hospital charges, lab tests, medications, surgery) are paid directly to the hospital at local rates</strong>. We provide you with a clear cost estimate before you arrive, and you will know the hospital\'s published prices before each procedure. We do not charge hospital commissions.' },
        { q: 'Do you support emergency or after-hours situations?', a: 'In a medical emergency, <strong>call 120 immediately</strong> and go to the nearest hospital — concierge packages do not include emergency medical services. Once you are at the hospital, we offer <strong>24/7 emergency on-site coordination</strong> at an additional fee: <strong>$300 emergency call-out (available 24/7, includes the first 4 hours)</strong>, then <strong>$100/hour</strong> for additional on-site companion support. This covers urgent dispatch, senior nurse coordination, family communication, and hospital navigation during the emergency. Contact Sara on WhatsApp as soon as possible after calling 120.' },
        { q: 'What languages are included? Do you support languages other than English and Chinese?', a: 'All concierge packages include <strong>English–Chinese on-site medical interpretation</strong>. Japanese–Chinese interpretation is included for Japanese-speaking clients booking via the Japanese page. If you need support in <strong>any other language</strong> (Arabic, Russian, Mongolian, Korean, French, Spanish, etc.), a dedicated interpreter can be arranged at an additional cost — rates are based on local Shanghai market pricing for that language. Please mention your language needs when you chat with Sara so we can give you an accurate quote.' },
        { q: 'What is your refund and cancellation policy?', a: 'Cancellations made <strong>14 or more days</strong> before your scheduled arrival receive a full refund minus a small processing fee. Cancellations within <strong>14 days</strong> are eligible for a partial refund, as some hospital and logistics arrangements may already have been made. Same-day cancellations and no-shows are non-refundable. Cases involving genuine medical emergencies or visa denials with documentation are reviewed individually — we do our best to be fair. Specific refund terms will be included in your booking confirmation.' },
        { q: 'Can I bring family members or my own interpreter?', a: '<strong>Yes — bringing family members or your own interpreter is welcome at no extra charge.</strong> Our nurse-escort focuses on medical coordination, hospital navigation, and interpretation regardless of party size. If you are traveling with a larger group and need a larger vehicle (e.g., a van instead of a standard sedan for airport pickup), an upgrade fee may apply based on vehicle type and availability. Let Sara know your group size when booking so we can arrange the right transport.' },
      ],
      refundPolicy: 'Refund Policy',
      medicalDisclaimer: 'Medical Disclaimer',
      independentDisclaimer: 'ShanghaiMed operates as an independent concierge service provider; we do not practice medicine and our nurses do not replace your treating doctors.',
    },
    freeConsultation: {
      badge: 'Free Consultation',
      title: 'Book Your Free Medical Consultation',
      subtitle: "Talk to our medical team before you travel — we'll match you with the right specialists, plan your medical trip around your needs, and give you a clear cost estimate upfront.",
      specialistMatchTitle: 'Top Specialist Matching',
      specialistMatchDesc: 'We connect you with leading professors and chief physicians at Shanghai\'s top Grade 3A hospitals — matching your specific condition to the right specialist for your case.',
      specialistMatchPoints: [
        'Specialists matched to your specific medical condition — not a default or nearest option',
        'Connect with the right professors and chief physicians across Shanghai\'s public Grade 3A hospitals based on your case',
        'Priority access to leading international and private hospitals in Shanghai; appointments can typically be arranged on short notice',
        'Pre-consultation medical record review before you arrive in Shanghai',
      ],
      badges: [
        { title: 'No Payment Required', desc: 'Free consultation, no upfront fees or deposits' },
        { title: 'No Obligation to Purchase', desc: 'Speak with us with zero pressure to book any service' },
        { title: 'Confidential', desc: 'Your medical information stays private and is never shared without consent' },
      ],
      ctaTitle: 'Start Your Free Consultation',
      ctaDesc: 'Reach out on WhatsApp — our medical team will reply as quickly as possible, typically within a few hours during business hours.',
      ctaButton: 'Chat on WhatsApp',
      hospitalNetworkTitle: 'Our Hospital Network',
      hospitalNetworkDesc: 'We partner with 14 public Grade 3A (top-tier) hospitals and 5 international hospitals in Shanghai. Beyond these featured partners, we can arrange appointments at all public tertiary hospitals across Shanghai.',
      publicHospitals: 'Public Grade 3A Partners (14)',
      privateHospitals: 'International Hospital Partners (5)',
      beyondTitle: 'Beyond the Featured Network',
      beyondDesc: 'If your condition requires a specialist at any other Shanghai tertiary hospital — including those not listed here — we can coordinate appointments on your behalf. Let us know your medical needs and we will match you with the right specialist.',
    },
    insights: {
      badge: 'Blog',
      title: 'Latest Insights',
      subtitle: 'Discover articles about healthcare in Shanghai, medical tourism, and wellness.',
      readMore: 'Read More',
      viewAll: 'View All Articles',
      featured: '★ Featured',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Discover articles about healthcare in Shanghai, medical tourism, and wellness.',
      filterContent: 'Filter Content',
      searchPlaceholder: 'Search articles...',
      search: 'Search',
      clearFilters: 'Clear filters',
      categories: 'Categories',
      popularTags: 'Popular Tags',
      noArticles: 'No articles found matching your criteria.',
      minRead: 'min read',
      previous: 'Previous',
      next: 'Next',
      home: 'Home',
      blogNav: 'Blog',
      shareLabel: 'Share:',
      previousArticle: 'Previous Article',
      nextArticle: 'Next Article',
      toc: 'Table of Contents',
      tocHide: 'Hide',
      tocShow: 'Show',
      subscribeTitle: 'Subscribe to Newsletter',
      subscribeDesc: 'Get the latest health tips and updates delivered to your inbox.',
      emailPlaceholder: 'Your email',
      subscribe: 'Subscribe',
      subscribed: '✓ Successfully subscribed! Thank you for joining our newsletter.',
      shareArticle: 'Share this article',
      subscribeSuccessTitle: 'Subscription Successful!',
      subscribeSuccessDesc: "Thank you for subscribing to our newsletter. You'll receive the latest health tips and updates.",
      close: 'Close',
      alertEmailRequired: 'Please enter your email address',
      alertSubscribeFail: 'Failed to subscribe. Please try again later.',
      alertError: 'An error occurred. Please try again later.',
      pageHeaderTitle: 'Healthcare Insights',
      pageHeaderSubtitle: 'Discover articles about medical tourism, healthcare services, and wellness tips in Shanghai',
      relatedArticles: 'Related Articles',
      recommendedHospitals: 'Recommended Hospitals',
      learnMore: 'Learn More',
      insurancePartnersLabel: 'Insurance Partners',
      bookTitle: 'Book a Free Consultation',
      bookDesc: 'Our medical coordinators are ready to assist you with hospital selection, treatment options, and travel arrangements.',
      whatsappConsult: 'WhatsApp Consultation',
      requestQuote: 'Request a Quote',
      categoryNames: {
        'health-checkups': 'Health Checkups',
        'preventive-healthcare': 'Preventive Healthcare',
        'medical-tourism': 'Medical Tourism',
        'traditional-chinese-medicine': 'Traditional Chinese Medicine',
        'shanghai-hospitals': 'Shanghai Hospitals',
        'expat-healthcare': 'Expat Healthcare',
        'patient-stories': 'Patient Stories',
        'health-guides': 'Health Guides',
      },
    },
    faq: {
      badge: 'FAQ',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about medical tourism in Shanghai.',
      items: [
        { question: 'How do I start the medical tourism process?', answer: 'Simply fill out our contact form with your medical condition and preferences. Our team will respond within 24 hours with hospital recommendations and cost estimates.' },
        { question: 'Do you help with visa applications?', answer: 'Yes, we provide visa assistance for medical treatment. For eligible countries, we can also help arrange the 240-hour transit visa-free entry to Shanghai.' },
        { question: "What if I don't speak Chinese?", answer: 'All our nurse coordinators provide real-time translation during medical consultations. Medical reports can be provided in English or your preferred language.' },
        { question: 'How do payments work?', answer: 'You pay directly to the hospital. For insurance holders, we assist with direct settlement processes.' },
        { question: 'What types of treatments do you specialize in?', answer: "We support a wide range of healthcare needs, from preventive checkups and specialist consultations to complex medical care. Every patient's needs are different. We help identify the most appropriate hospital, specialist, and care pathway for your situation." },
      ],
      stillTitle: 'Still have questions?',
      whatsappCta: 'Contact Us on WhatsApp',
      viewAll: 'Browse Full FAQ',
      viewAllDesc: 'See all answers about pricing, insurance, visas, payments, and medical care — over a dozen common questions.',
      browseFaq: 'View all questions',
      whatsappDesc: 'Chat directly with our nurse coordinator. Get personalized answers in English, Japanese, or Arabic.',
    },
    contact: {
      title: 'Start Your Medical Tourism Today',
      subtitle: 'Get a free consultation from our medical team. Our AI Navigator responds instantly. Human coordinator follows up within 24 hours.',
      cta: 'Start Your Medical Tourism Today',
      badge: 'Contact',
      whatsappTitle: 'WhatsApp',
      whatsappDesc: 'AI Navigator 24/7 + Human 24h Response',
      whatsapp: 'Chat on WhatsApp',
      lineTitle: 'LINE',
      lineDesc: 'Chat directly with our coordinator',
      lineButton: 'Chat on LINE',
      lineIdLabel: 'LINE ID',
      lineId: 'sara_shanghaimed',
      lineScanHint: 'Scan the QR code to add us on LINE',
      lineQrAlt: 'LINE QR Code',
      locationLabel: 'Location',
      locationValue: "Shanghai, People's Republic of China",
      responseLabel: 'Response Time',
      responseValue: 'AI: Instant | Human: Within 24 hours',
      emailLabel: 'Email',
      nameLabel: 'Full Name *',
      namePlaceholder: 'Your full name',
      emailLabel2: 'Email *',
      emailPlaceholder: 'your@email.com',
      countryLabel: 'Country *',
      countryPlaceholder: 'Select your country *',
      otherCountry: 'Other',
      otherCountryPlaceholder: 'Enter your country *',
      countries: {
        'United States': 'United States',
        'United Kingdom': 'United Kingdom',
        'Canada': 'Canada',
        'Australia': 'Australia',
        'Japan': 'Japan',
        'South Korea': 'South Korea',
        'Singapore': 'Singapore',
        'Germany': 'Germany',
        'France': 'France',
      },
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: 'Phone / WhatsApp (optional)',
      medicalNeedsLabel: 'Medical Needs *',
      medicalNeedsPlaceholder: 'Select your medical need',
      medicalNeeds: {
        consultation: 'Medical Consultation',
        cardiology: 'Cardiology',
        neurology: 'Neurology',
        oncology: 'Oncology',
        orthopedics: 'Orthopedics',
        checkup: 'Health Check-up',
        dental: 'Dental Care',
        plastic: 'Plastic Surgery',
        other: 'Other',
      },
      messageLabel: 'Your Message',
      messagePlaceholder: 'Please describe your medical condition or inquiry...',
      submit: 'Get Free Consultation',
      submitting: 'Sending...',
      successTitle: 'Thank You!',
      successMessage: "Thank you! Our AI Navigator has received your inquiry and our team will follow up within 24 hours. You can also reach us on WhatsApp — we'll respond as soon as possible.",
      sendAnother: 'Send Another Message',
      privacyNote: 'By submitting this form, you agree to our Privacy Policy and consent to being contacted about our medical services.',
      alertFail: 'Failed to send message. Please try again or contact us via WhatsApp.',
    },
    footer: {
      tagline: 'Connecting international patients with Shanghai\'s world-class medical institutions and English–Chinese healthcare professionals.',
      columns: [
        {
          title: 'About',
          links: ['About Us', 'Our Founder', 'Why Shanghai', 'Our Network', 'Care Team'],
        },
        {
          title: 'Treatments',
          links: ['Hospitals', 'Specialties', 'Pricing Guide'],
        },
        {
          title: 'Support',
          links: ['How It Works', 'FAQ', 'Research Library', 'Glossary', 'Contact Us', 'WhatsApp Support'],
        },
        {
          title: 'Legal',
          links: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Editorial Policy', 'Medical Disclaimer'],
        },
      ],
      rights: 'All rights reserved.',
      location: 'Shanghai, China',
    },
    agentChat: {
      welcome: "Hello! I'm Navi, your medical navigator. Ask me anything about hospitals, treatments, costs, visas, or planning your medical journey in Shanghai.",
      questions: [
        "What's included in your personalized service?",
        'How do I book an appointment?',
        "What's the cost of your one-on-one service?",
      ],
      inputPlaceholder: 'Ask me about healthcare in Shanghai...',
      chatTitle: 'Navi · Medical Navigator',
      chatSubtitle: '24/7 AI assistant',
    },
    pages: {
      treatmentsTitle: 'Treatments & Hospitals',
      treatmentsSubtitle: "Access to Shanghai's finest medical institutions across all specialties.",
      contactTitle: 'Contact Us',
      contactSubtitle: 'Get started with your medical journey today. Our team is ready to help 24/7.',
      patientStoriesTitle: 'Patient Stories',
      patientStoriesSubtitle: 'Real experiences from patients who trusted us with their health.',
      whyShanghaiTitle: 'Why Shanghai?',
      whyShanghaiSubtitle: 'Shanghai has emerged as a premier destination for international patients seeking world-class medical care at accessible prices.',
      careTeamTitle: 'Our Care Team',
      careTeamSubtitle: 'ISPN-certified nurses dedicated to your health and comfort.',
      howItWorksTitle: 'How It Works',
      howItWorksSubtitle: 'Our streamlined process makes it easy to access world-class medical care in Shanghai.',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Everything you need to know about receiving medical care in Shanghai — costs, hospital quality, visas, insurance, and English–Chinese support.',
    },

  // ── Medical Disclaimer (legal) ──
  medicalDisclaimer: {
    title: 'Medical Disclaimer',
    lastUpdated: 'Last updated: October 12, 2026',
    warning: 'ShanghaiMed is not a hospital, clinic or medical provider. We do not provide medical diagnosis, treatment, prescriptions or medical advice.',
    whatWeAre: {
      heading: 'What we are',
      content: 'ShanghaiMed (operated by Shanghai Keling Information Technology Co., Ltd.) is a medical travel coordination and patient-navigation service. We help international patients plan and navigate medical visits to licensed public hospitals and specialists in Shanghai, China. Our role is logistical, linguistic and administrative.',
    },
    whatWeDoNotDo: {
      heading: 'What we do not do',
      item1: 'We do not diagnose medical conditions.',
      item2: 'We do not prescribe medication.',
      item3: 'We do not perform or direct medical procedures or treatments.',
      item4: 'We do not guarantee clinical outcomes, waiting times, or the success of any treatment.',
      item5: 'We are not a substitute for the professional judgement of a licensed physician.',
    },
    clinicalResponsibility: {
      heading: 'Clinical responsibility',
      content: 'All clinical decisions — including diagnosis, treatment plans, prescriptions, surgery, testing and hospital admission — are made independently by the treating hospital and its licensed physicians under their own professional responsibility and Chinese medical licences. Hospital and treatment fees are paid by the patient directly to the hospital under the hospital\u2019s own terms.',
    },
    contentInformational: {
      heading: 'Content is informational only',
      content: 'Articles, cost estimates, doctor profiles, specialty information and other content on this Website are provided for general informational and planning purposes. They are not medical advice. Health information changes quickly, and individual cases differ; always rely on your treating physician for decisions about your care.',
    },
    emergencies: {
      heading: 'Emergencies',
      content: 'In a medical emergency, contact your local emergency services immediately. In mainland China, dial 120 for ambulance and emergency medical care.',
    },
    noGuarantee: {
      heading: 'No hospital-physician guarantee',
      content: 'We make reasonable efforts to match patients with qualified hospitals and specialists based on the information provided. However, hospital schedules change, specific doctors cannot always be guaranteed, and final treatment decisions rest with the hospital.',
    },
    contact: {
      heading: 'Contact',
      company: 'Shanghai Keling Information Technology Co., Ltd.',
      address: 'Room 101, Floor 1, No. 2555 Changyang Road, Yangpu District, Shanghai, China',
      email: 'hello@shanghaimedhealth.com',
    },
  },
}

export const translations: Record<Language, any> = {
  en: enTranslations,
  ja: {
    nav: {
      whyShanghai: 'なぜ上海か',
      howItWorks: '仕組み',
      treatments: '治療',
      careTeam: 'ケアチーム',
      trust: '信頼',
      items: ['なぜ上海か', 'ご利用の流れ', '病院ネットワーク', 'ケアチーム', '料金', 'ブログ', 'お問い合わせ'],
    },
    whyShanghai: {
      badge: 'なぜ上海か',
      title: '国際患者のための、シンプルで世界クラスの医療',
      subtitle: '上海では、一流病院へのアクセス、経験豊富な専門医、透明な料金体系、そして国際患者向けのきめ細かなサポートをご提供しています。',
      stats: [
        { label: '上海の年間国際患者受入数' },
        { label: '医療ツーリズム指定公立病院' },
        { label: '対応国籍数' },
        { label: '前年比成長率' },
      ],
      healthSystem: {
        title: '国際的に認められた医療体制',
        items: [
          '世界中から患者を受け入れる一流病院',
          '英語対応の国際医療部門を完備',
          '国際医療サービスに指定された公立三級甲等病院',
          'がん・循環器・神経・整形・不妊治療など、各分野の専門医へのアクセス',
        ],
      },
      travelAccess: {
        title: '快適な渡航と円滑な医療アクセス',
        items: [
          '多くの国から240時間（10日間）の通過ビザ免除での渡航が可能',
          '長期治療プランに対応した医療ビザのサポート',
          '空港送迎・移動のサポート',
          '医療の旅全体を通じたトータルコーディネート',
        ],
      },
      pricing: {
        title: '競争力のある価格で高品質な医療を',
        subtitleLine1: '米国の患者は、保険に加入していても高額な自己負担に直面することが少なくありません。',
        subtitleLine2: '記載の金額は典型的な自己負担額の目安であり、医療機関・地域・保険内容・治療プランにより異なります。',
        tableService: '診療項目',
        tableShanghai: '上海',
        tableUs: '米国の典型価格',
        rows: [
          { service: 'エグゼクティブ健康診断', shanghai: '$700〜', us: '$2,500〜' },
          { service: 'MRI検査', shanghai: '$300〜', us: '$1,000〜' },
          { service: 'CT検査', shanghai: '$150〜', us: '$500〜' },
          { service: '専門医診察', shanghai: '$70〜', us: '$250〜' },
          { service: '不妊治療（IVF）', shanghai: '$4,200〜', us: '$15,000〜' },
          { service: 'インプラント治療', shanghai: '$800〜', us: '$3,000〜' },
        ],
        valueTitle: '患者が上海に価値を見出す理由',
        valueItems: [
          '一流病院と専門医へのアクセス',
          '治療前の透明な料金提示',
          '診察・検査・治療への迅速なアクセス',
          'より低い自己負担医療費',
          '治療の旅全体を通じた日中両語のパーソナルサポート',
        ],
        notesTitle: '重要事項',
        notes: [
          '価格は参考情報であり、見積りを構成するものではありません。',
          '実際の医療費は、病院・医師・治療プランにより決定されます。',
          '米国の価格は典型的な自己負担額を反映したものであり、保険内容や地域により大きく異なる場合があります。',
          '為替レートは参考値であり、変動する場合があります。',
          '複雑な治療、手術、がん治療、入院サービスには、医学的審査後の個別見積りが必要です。',
        ],
      },
    },
    processFlow: {
      badge: 'あなたの医療の旅',
      title: 'お問い合わせから治療まで',
      subtitle: '上海での医療ツーリズム体験の完全なタイムライン。各段階で専門スタッフがサポートします。',
      phases: [
        {
          phase: '到着前',
          steps: [
            { title: 'オンライン問い合わせ', description: 'AIナビゲーターが即時対応' },
            { title: '医療アセスメント', description: '症状を確認し、病院をご提案' },
            { title: '費用見積り', description: '診察・基本検査の透明な価格提示' },
            { title: 'ビザ・渡航', description: 'ビザなし・240時間通過案内、渡航のコツ' },
          ],
        },
        {
          phase: '滞在中',
          steps: [
            { title: '空港送迎', description: '日中両語対応の看護師がお迎え' },
            { title: '病院受診', description: '看護師同行による診察・検査' },
            { title: '治療', description: '一流病院での世界クラスの治療' },
            { title: '入院治療', description: '専任の看護サポート（必要に応じて）' },
          ],
        },
        {
          phase: '帰国後',
          steps: [
            { title: '退院・翻訳', description: '英語の診療レポート' },
            { title: 'フォローアップ', description: '遠隔サポート・処方調整' },
          ],
        },
      ],
    },
    careTeam: {
      title: '日中両語対応の登録看護師',
      subtitle: '上海での医療の旅の各段階における専任のヘルスケアコンパニオン。',
      badge: 'ケアチーム',
      expertTeam: '専門ケアチーム',
      ispnCertified: 'ISPN認定',
      ispnDesc: '国際看護師基準',
      ispnIssuer: 'CGFNS（米国）認定',
      credentialsTitle: '看護師の資格',
      servicesTitle: '看護サービス',
      nursingCare: '日中両語対応看護',
      appointmentCoordination: '予約調整',
      translationServices: '通訳サービス',
      transportation: '交通手配',
      medicalReports: '医療レポートの翻訳',
      emergencySupport: '緊急時サポート',
      services: [
        { title: '治療前カウンセリング', description: '診療記録の確認、治療内容の説明、病院の専門医との連携調整。' },
        { title: '予約手配', description: '医師の診察、各種検査、治療セッションの手配。' },
        { title: '通訳・翻訳', description: '診察や処置中のリアルタイム医療通訳。' },
        { title: '病院内サポート', description: '受付・会計・お支払い手続きのご案内。' },
        { title: '退院サポート', description: '服薬指導、フォローアップ予約、診療レポートの翻訳。' },
        { title: '保険サポート', description: '保険給付内容の確認・病院での保険適用確認の事務サポート' },
      ],
      credentials: [
        { name: '登録看護師（RN）ライセンス', detail: '上海市衛生健康委員会認証' },
        { name: '多言語認定', detail: '日本語・中国語に堪能' },
        { name: '日本語能力試験N1（JLPT N1）', detail: '日本語能力試験の最高レベル（N1）認定' },
        { name: '医療通訳', detail: '医療文書の翻訳・対面通訳に対応' },
        { name: '国際患者ケア', detail: '10年以上の経験' },
      ],
    },
    hero: {
      badge1: '47の国際保険直接支払い病院',
      badge2: '日中医療現場通訳対応の看護師',
      badge3: '24時間AIナビゲーター + 人間によるフォローアップ',
      title: '上海の世界クラスの医療。',
      titleHighlight: 'コストはわずか。',
      subtitle: '中国のトップ病院、日中医療現場通訳対応の看護師、24時間AIサポートを一つのプラットフォームで。',
      cta: '無料医療相談を予約する',
    },
    treatments: {
      title: '上海のトップ医療機関',
      subtitle: '医療ニーズに合わせたご提案とともに、上海の一流病院へのアクセスをご提供します。',
      hospitalNetwork: '病院ネットワーク',
      publicHospitals: '公立三級甲等病院',
      privateHospitals: '国際民間病院',
      viewAll: '全病院を表示',
      keyDepartments: '重点科室',
      certifications: '国際認証',
      insurance: '保険:',
      all: '全て',
      modalAllHospitals: 'すべての病院',
      modalHospitalsAvailable: '病院が利用可能',
      modalAllGradeA: '上海の三級甲等病院すべてに対応',
      modalAll: 'すべて',
      modalPublicGradeA: '公立三級甲等',
      modalInternationalPrivate: '国際民間',
      modalIns: '保険:',
    },
    howItWorks: {
      title: '仕組み',
      subtitle: '最初のお問い合わせから完全回復まで、上海での医療ツーリズムの各段階をサポートします。',
      badge: 'ご利用の流れ',
      simpleProcess: 'シンプルなプロセス',
      step1Title: 'AIによる問診',
      step1Desc: 'AIナビゲーターが即座に応答し、あなたのニーズを理解します。',
      step2Title: '医療チームの割り当て',
      step2Desc: '経験豊富な看護師がケアコーディネーターとして同行します。',
      step3Title: '上海への到着',
      step3Desc: '空港から病院までの移動手配、ホテル予約を含む完全なサポート。',
      step4Title: '治療とリカバリー',
      step4Desc: '専門医の治療、日中両語サポート、術後ケアの完璧な統合。',
      steps: [
        { title: 'お問い合わせ', description: 'ご病状やご希望をフォームにてお送りください。AIナビゲーターが24時間365日対応します。' },
        { title: '相談内容の受取', description: '24時間以内に担当コーディネーターが病院のご提案と費用見積りをお届けします。' },
        { title: '確定・渡航', description: 'ご出発が確定したら、予約手配・渡航手配・到着時サポートを調整します。' },
        { title: '治療の受入', description: '日中医療現場通訳対応の看護師が診察・検査・治療全般にわたり対面でサポートします。' },
        { title: 'アフターケア', description: '診療記録、フォローアップ予約、処方調整、オンライン診療をサポートします。' },
      ],
    },
    pricing: {
      badge: '料金',
      eyebrow: '隠し費用なし',
      title: '透明なコンシェルジュ料金',
      subtitle: 'お一人様あたり明確なコンシェルジュ料金。医療費は現地料金で病院へ直接お支払いいただきます — 病院からのコミッションは一切いただきません。',
      usdLabel: '米ドル',
      whatsIncluded: '含まれるサービス',
      freeCard: {
        name: '無料初回相談',
        subtitle: 'ご決断前に必要な情報を — 義務なし・費用なしでご提供します。',
        badge: '無料',
        unit: '無料',
        scope: 'まずはSaraにご相談ください — 義務もお支払いも不要です。',
        items: [
          '医療ニーズの評価',
          '病院・専門医のご提案',
          '治療費用のお見積り',
          '保険のご案内',
        ],
        itemsLabel: 'ご提供内容 — 4項目',
        callout: '<strong>ご検討段階のご相談のみです。</strong>この無料通話では、適切な病院・医師の選び方、予算感をご案内します。現地サービスは、時間制同行またはコンシェルジュパッケージのご予約後に開始いたします。',
        cta: 'SaraにLINEで相談する',
      },
      hourlyCard: {
        name: '病院内アテンド（時間制）',
        subtitle: 'ご自身で予約済みの患者様向け。',
        scope: '1時間単位でご予約・ご精算。単体でも、パッケージの追加オプションとしてもご利用いただけます。',
        items: [
          '病院内での現地アテンド',
          '日中医療現場通訳 · 他言語は追加料金',
          '院内のご案内（順番待ち・会計・薬の受け取り）',
          '受診当日のお帰り後メッセージ',
        ],
        itemsLabel: '含まれるサービス — 4項目',
        callout: '<strong>サービス範囲：</strong>時間制アテンドは、現地での付き添いと日中通訳のみです。予約手配・医師マッチング・空港送迎・レポート翻訳・ビザサポート・保険事前承認・日本語以外の言語通訳・受診後フォローアップは<strong>含まれません</strong>。',
        cta: '時間制アテンドを予約する',
      },
      checkupCard: { subtitle: '専任看護師が1日間ご同行します。' },
      essentialCard: { subtitle: '予約・通訳・保険・物流までを一括調整。' },
      surgeryCard: { subtitle: '手術・入院中を含め、総合的にサポートします。' },
      essentialBadge: '最もよく選ばれています',
      packages: [
        {
          name: '健康診断コンシェルジュ',
          unit: 'お一人様・1日（日中）',
          description: '1日間の健康診断プログラム専用',
          itemsLabel: '含まれるサービス — 13項目',
          allItems: [
            '1日間の看護師現地同行（日中）',
            'ホテル手配サポート',
            '健診レポート翻訳・結果説明',
            'お薬の受け取り・配送',
            '現地移動・会計サポート',
            'ビザ招聘状サポート',
            '保険サポート',
            '空港送迎（到着・出発） · 標準セダン',
            '日中医療現場通訳',
            '診察予約の調整',
            '病院・専門医マッチング',
            'LINE専用サポート',
            '健診後30日間の遠隔フォローアップ',
          ],
        },
        {
          name: 'エッセンシャルケア・コンシェルジュ',
          unit: 'お一人様・3日間（日中）',
          description: 'すべての専門科受診・疾患に必須',
          itemsLabel: '含まれるサービス — 13項目',
          allItems: [
            '3日間の看護師現地同行（日中）',
            '渡航前の診療記録レビュー',
            '医師・専門医マッチング',
            '診察予約の調整',
            '空港送迎（到着・出発） · 標準セダン',
            'ホテル・現地移動の調整',
            '日中医療現場通訳',
            '院内ナビゲーション・会計サポート',
            '診療レポート翻訳',
            'お薬の受け取り・配送',
            '滞在中のLINE専用サポート',
            '保険サポート · 事前承認',
            '受診後30日間の遠隔フォローアップ',
          ],
        },
        {
          name: '手術・延長ケア',
          unit: 'お一人様・5日間（日中）',
          description: '手術・入院治療に必須',
          itemsLabel: '含まれるサービス — 16項目',
          allItems: [
            '5日間の看護師現地同行（日中）',
            '入院前調整',
            '手術当日の付き添い',
            '入院中の定期訪問',
            'ご家族への経過報告・連絡代行',
            '術前診療記録レビュー・ブリーフィング',
            '医師・病院選びのご案内',
            '空港送迎（到着・出発） · 標準セダン',
            'ホテル・長期滞在サポート',
            '日中医療現場通訳',
            '院内ナビゲーション・会計サポート',
            '手術レポート翻訳',
            'お薬の受け取り・配送',
            'LINE専用サポート',
            '保険・手術デポジット調整',
            '帰国後60日間の遠隔フォローアップ',
          ],
        },
      ],
      faqTitle: '料金・サービスFAQ',
      faqSub: '料金・サービス範囲・保険・特別なケースについてよくあるご質問。',
      viewAllFaq: '料金・サービスのFAQをすべて見る',
      faqLinkDesc: '料金、保険、ビザ、お支払い、診療について — よくある質問に回答',
      faqItems: [
        { q: '初回相談は本当に無料ですか？', a: 'はい。LINEでの初回相談は完全<strong>無料・義務なし</strong>です。医療ニーズを評価し、病院・専門医をご提案し、費用見積もりをお出しし、保険の選択肢をご説明します — すべてお支払いの前にご案内いたします。現地サービスは時間制同行またはコンシェルジュパッケージのご予約後に開始いたします。' },
        { q: 'パッケージを買わずに時間制アテンドだけ予約できますか？', a: 'はい。<strong>1時間50米ドルの病院内アテンド</strong>は、すでにご自身で医師の予約をお取りいただき、院内での付き添いのみ必要な患者様向けの単体サービスです。パッケージに含まれる日数を超える同伴時間の追加オプションとしてもご利用いただけます。なお、時間制アテンドは現地での付き添いと日中通訳のみです — 予約手配・医師マッチング・空港送迎・保険調整はコンシェルジュパッケージが必要です。パッケージへの追加として、含まれる日数を超える同伴時間も1時間50米ドルでご利用いただけます。' },
        { q: '1,000米ドルのエッセンシャルパッケージには何が含まれますか？', a: '<strong>エッセンシャルケアには3日間（日中）の同行が含まれます</strong>：医師マッチング、すべての受診での日中現地通訳、院内ナビゲーション、空港送迎、診療レポート翻訳、お薬の受け取り・配送、滞在中のLINE専用サポート、保険給付内容の確認や事前承認状取得を含む保険サポート、受診後30日間の遠隔フォローアップ — 全13項目。このパッケージはすべての専門科受診・疾患に必要です。' },
        { q: '海外保険の手続きは対応してもらえますか？', a: '<strong>保険サポート</strong>をご提供します。保険給付内容の確認、事前承認状の取得、病院での書類手続きの調整を含みます。保険会社が病院とダイレクトビリング契約を結んでいる場合は、その手続きを調整いたします。ダイレクトビリングが利用できない場合は、病院に直接お支払いいただき、保険会社への請求に必要な書類をご用意いたします。給付可否・ダイレクトビリング承認は保険会社の判断となり、当方では保証いたしかねます。' },
        { q: 'コンシェルジュ料金に医療費は含まれますか？', a: 'いいえ。コンシェルジュ料金は調整・同行サービスの対価です。<strong>医療費（診察代・入院費・検査代・薬代・手術費）は病院へ現地料金で直接お支払いいただきます</strong>。ご渡航前に明確な費用見積もりをお出しし、各処置の前に病院の公示価格をご確認いただけます。病院からのコミッションはいただきません。' },
        { q: '救急や時間外には対応していますか？', a: '救急医療の場合は<strong>直ちに120番に通報</strong>し、最寄りの病院へ搬送されてください — コンシェルジュパッケージに救急医療サービスは含まれません。病院に到着後、<strong>24時間365日の緊急現地調整</strong>を追加料金でご提供します：<strong>緊急出動300米ドル（24時間対応、最初の4時間を含む）</strong>、その後の現地同行サポートは<strong>1時間100米ドル</strong>。緊急派遣、シニア看護師の調整、ご家族への連絡、救急時の院内ナビゲーションをカバーします。120番通報後、できるだけ早くSaraまでLINEでご連絡ください。' },
        { q: '対応言語は何ですか？日本語以外の言語も対応できますか？', a: 'すべてのコンシェルジュパッケージに<strong>日中医療現場通訳</strong>が含まれます。<strong>その他の言語</strong>（英語・アラビア語・ロシア語・モンゴル語・韓国語・フランス語・スペイン語など）が必要な場合は、専門の通訳者を追加料金で手配可能です — 料金は上海のその言語の市場相場に基づきます。Saraとのチャットで必要な言語をお知らせいただければ、正確なお見積もりをご提示します。' },
        { q: '返金・キャンセルポリシーを教えてください。', a: '渡航予定日の<strong>14日以上前</strong>のキャンセルは、少額の手数料を差し引いて全額返金いたします。<strong>14日を切ってから</strong>のキャンセルは、病院や物流面での手配がすでに進行している場合があるため、一部返金となります。当日キャンセルおよびノーショーは返金対象外です。真の救急事態やビザ却下（書類要）は個別に審査いたします — できる限り公正に対応いたします。具体的な返金条件は予約確認書に記載いたします。' },
        { q: '家族や自分の通訳を連れて行ってもいいですか？', a: '<strong>はい — ご家族やご自身の通訳の同伴を歓迎します（追加料金なし）。</strong>当方の看護師は、人数に関わらず医療調整・院内ナビゲーション・通訳に専念します。大人数でご旅行のため大型車両が必要な場合（例：空港送迎で標準セダンではなくバンが必要など）、車種・手配状況に応じてアップグレード料金が発生する場合があります。ご予約時に人数をSaraまでお知らせください。適切な送迎を手配いたします。' },
      ],
      refundPolicy: '返金ポリシー',
      medicalDisclaimer: '医療免責事項',
      independentDisclaimer: 'ShanghaiMedは独立系コンシェルジュサービス事業者です。医療行為は行わず、当方の看護師は主治医に代わるものではありません。',
    },
    freeConsultation: {
      badge: '無料相談',
      title: '無料医療相談を予約する',
      subtitle: '渡航前に医療チームがご相談を承ります — 症状に合った専門医をご紹介し、ご要望に沿った医療渡航プランを作成、明確な費用見積もりを事前にご提示します。',
      specialistMatchTitle: 'トップ専門医マッチング',
      specialistMatchDesc: '上海のトップ三甲（Grade 3A）病院に在籍する一流の教授・主任医師をご紹介 — お近くの病院ではなく、あなたの症状に最も適した専門医をご案内します。',
      specialistMatchPoints: [
        'あなたの症状に合わせた専門医マッチング — 一律の近距離病院ではなく、最適な専門医をご案内',
        'ご病状に応じて、上海の公立三甲病院全体から適切な教授・主任医師をご紹介',
        '上海の主要国際病院・私立病院への優先アクセス — 通常、短期間で予約手配が可能です',
        '渡航前の診療記録事前レビュー',
      ],
      badges: [
        { title: '費用は一切不要', desc: '無料相談・前払い金・デポジット不要' },
        { title: '購入義務なし', desc: 'サービス購入のプレッシャーは一切ありません' },
        { title: '秘密厳守', desc: '医療情報は同意なしに第三者へ共有されることはありません' },
      ],
      ctaTitle: '無料相談を始める',
      ctaDesc: 'LINEでご連絡ください — 営業時間内（UTC+8）であれば通常数時間以内に折り返しご連絡いたします。',
      ctaButton: 'LINEで相談する',
      hospitalNetworkTitle: '提携病院ネットワーク',
      hospitalNetworkDesc: '上海の公立三甲病院14施設・国際病院5施設と提携しています。表示されている提携先に加え、上海のすべての公立三甲病院の予約手配が可能です。',
      publicHospitals: '公立三甲病院（14）',
      privateHospitals: '国際病院（5）',
      beyondTitle: '提携外の病院について',
      beyondDesc: '掲載されていない上海の公立三甲病院の専門医が必要な場合も、ご相談いただければ予約を手配いたします。症状に合わせて最適な専門医をご案内します。',
    },
    insights: {
      badge: 'ブログ',
      title: '最新のインサイト',
      subtitle: '上海の医療、医療ツーリズム、ウェルネスに関する記事をご覧ください。',
      readMore: '続きを読む',
      viewAll: 'すべての記事を見る',
      featured: '★ 注目',
    },
    blog: {
      title: 'ブログ',
      subtitle: '上海の医療、医療ツーリズム、ウェルネスに関する記事をご覧ください。',
      filterContent: '絞り込み',
      searchPlaceholder: '記事を検索...',
      search: '検索',
      clearFilters: '条件をクリア',
      categories: 'カテゴリー',
      popularTags: '人気のタグ',
      noArticles: '条件に一致する記事が見つかりませんでした。',
      minRead: '分',
      previous: '前へ',
      next: '次へ',
      home: 'ホーム',
      blogNav: 'ブログ',
      shareLabel: 'シェア：',
      previousArticle: '前の記事',
      nextArticle: '次の記事',
      toc: '目次',
      tocHide: '隠す',
      tocShow: '表示',
      subscribeTitle: 'ニュースレター購読',
      subscribeDesc: '最新の健康情報とお知らせをメールでお届けします。',
      emailPlaceholder: 'メールアドレス',
      subscribe: '購読する',
      subscribed: '✓ ご購読ありがとうございます。ニュースレターに登録されました。',
      shareArticle: 'この記事をシェア',
      subscribeSuccessTitle: '購読完了！',
      subscribeSuccessDesc: 'ニュースレターのご購読ありがとうございます。最新の健康情報をお届けします。',
      close: '閉じる',
      alertEmailRequired: 'メールアドレスを入力してください',
      alertSubscribeFail: '購読に失敗しました。しばらくしてからもう一度お試しください。',
      alertError: 'エラーが発生しました。しばらくしてからもう一度お試しください。',
      pageHeaderTitle: 'ヘルスケアインサイト',
      pageHeaderSubtitle: '上海の医療ツーリズム、医療サービス、ウェルネスに関する記事をご覧ください',
      relatedArticles: '関連記事',
      recommendedHospitals: 'おすすめ病院',
      learnMore: '詳しく見る',
      insurancePartnersLabel: '提携保険',
      bookTitle: '無料相談を予約する',
      bookDesc: '病院選び、治療プラン、渡航手配まで、医療コーディネーターが全面的にサポートします。',
      whatsappConsult: 'LINEで相談',
      requestQuote: '見積りを依頼',
      categoryNames: {
        'health-checkups': '健康診断',
        'preventive-healthcare': '予防医療',
        'medical-tourism': '医療ツーリズム',
        'traditional-chinese-medicine': '伝統中国医学',
        'shanghai-hospitals': '上海の病院',
        'expat-healthcare': '駐在員医療',
        'patient-stories': '患者の声',
        'health-guides': '健康ガイド',
      },
    },
    faq: {
      badge: 'よくある質問',
      title: 'よくある質問',
      subtitle: '上海での医療ツーリズムについて知っておくべきすべてのこと。',
      items: [
        { question: '医療ツーリズムはどのように始めればよいですか？', answer: 'お問い合わせフォームにご病状とご希望をご記入いただくだけです。24時間以内に、病院のご提案と費用見積りをお返しします。' },
        { question: 'ビザ申請のサポートはありますか？', answer: 'はい、治療目的のビザサポートをご提供しています。対象国の方には、上海への240時間通過ビザ免除での入国手配もお手伝いできます。' },
        { question: '中国語が話せない場合はどうなりますか？', answer: 'すべての看護コーディネーターが診察時にリアルタイム通訳をご提供します。診療レポートは英語またはご希望の言語でお届けできます。' },
        { question: 'お支払いはどのように行いますか？', answer: '医療費は病院へ直接お支払いいただきます。保険をお持ちの方には、直接精算（ダイレクトビリング）の手続きをお手伝いします。' },
        { question: 'どのような治療に対応していますか？', answer: '健康診断や専門医の診察から複雑な治療まで、幅広い医療ニーズに対応しています。患者様一人ひとりのニーズは異なりますので、最適な病院・専門医・ケアプランをご提案します。' },
      ],
      stillTitle: 'まだご不明な点はありますか？',
      whatsappCta: 'LINEで問い合わせる',
      viewAll: 'FAQをすべて見る',
      viewAllDesc: '料金、保険、ビザ、お支払い、診療について10以上のよくある質問をまとめています。',
      browseFaq: 'すべての質問を見る',
      whatsappDesc: '3ヶ国語対応の看護コーディネーターが直接ご相談に応じます。日本語・英語・アラビア語で個別に回答します。',
    },
    contact: {
      title: '今日から医療ツーリズムを始めましょう',
      subtitle: '医療チームによる無料相談を受けることができます。AIナビゲーターが即時に応答し、担当コーディネーターが24時間以内にフォローアップします。',
      cta: '今日から医療ツーリズムを始めましょう',
      badge: 'お問い合わせ',
      whatsappTitle: 'WhatsApp',
      whatsappDesc: 'AIナビゲーター24時間＋人間による24時間対応',
      whatsapp: 'WhatsAppでチャット',
      lineTitle: 'LINE',
      lineDesc: 'コーディネーターが直接ご対応いたします',
      lineButton: 'LINEで相談する',
      lineIdLabel: 'LINE ID',
      lineId: 'sara_shanghaimed',
      lineScanHint: 'QRコードをスキャンして友だち追加',
      lineQrAlt: 'LINE QRコード',
      locationLabel: '所在地',
      locationValue: '中華人民共和国 上海市',
      responseLabel: '応答時間',
      responseValue: 'AI：即時｜担当者：24時間以内',
      emailLabel: 'メール',
      nameLabel: 'お名前 *',
      namePlaceholder: 'お名前をご記入ください',
      emailLabel2: 'メールアドレス *',
      emailPlaceholder: 'your@email.com',
      countryLabel: 'お住まいの国 *',
      countryPlaceholder: 'お住まいの国を選択してください *',
      otherCountry: 'その他',
      otherCountryPlaceholder: '国名をご記入ください *',
      countries: {
        'United States': 'アメリカ',
        'United Kingdom': 'イギリス',
        'Canada': 'カナダ',
        'Australia': 'オーストラリア',
        'Japan': '日本',
        'South Korea': '韓国',
        'Singapore': 'シンガポール',
        'Germany': 'ドイツ',
        'France': 'フランス',
      },
      phoneLabel: '電話 / LINE',
      phonePlaceholder: '電話 / LINE（任意）',
      medicalNeedsLabel: '医療ニーズ *',
      medicalNeedsPlaceholder: '医療ニーズを選択してください',
      medicalNeeds: {
        consultation: '一般診察',
        cardiology: '循環器内科',
        neurology: '神経内科',
        oncology: '腫瘍科',
        orthopedics: '整形外科',
        checkup: '健康診断',
        dental: '歯科治療',
        plastic: '形成外科',
        other: 'その他',
      },
      messageLabel: 'メッセージ',
      messagePlaceholder: 'ご病状やお問い合わせ内容をご記入ください...',
      submit: '無料相談を申し込む',
      submitting: '送信中...',
      successTitle: 'ありがとうございます！',
      successMessage: 'お問い合わせを受け付けました。AIナビゲーターが確認し、担当チームが24時間以内にフォローアップいたします。今すぐのご相談はLINEでも承ります。',
      sendAnother: '別のメッセージを送信',
      privacyNote: 'このフォームを送信することで、プライバシーポリシーに同意し、弊社の医療サービスに関するご連絡に同意したものとみなされます。',
      alertFail: 'メッセージの送信に失敗しました。もう一度お試しいただくか、LINEでご連絡ください。',
    },
    footer: {
      tagline: '国際患者と、上海の世界クラスの医療機関・日中両語医療スタッフをつなぐ。',
      columns: [
        {
          title: '会社情報',
          links: ['会社概要', '創業者', 'なぜ上海か', '病院ネットワーク', 'ケアチーム'],
        },
        {
          title: '治療',
          links: ['病院', '診療科', '料金ガイド'],
        },
        {
          title: 'サポート',
          links: ['ご利用の流れ', 'よくある質問', '研究ライブラリ', '用語集', 'お問い合わせ', 'LINEサポート'],
        },
        {
          title: '法的事項',
          links: ['プライバシーポリシー', '利用規約', '返金ポリシー', '編集ポリシー', '医療免責事項'],
        },
      ],
      rights: 'All rights reserved.',
      location: '上海（中国）',
    },
    hospitals: {
      huashan: {
        description: '全国の皮膚科・脳神経外科で第1位。中国で最も国際的に認知された病院の一つです。',
        specialties: ['脳神経外科', '皮膚科', '感染症科'],
      },
      'children-fudan': {
        description: '新生児医療と小児希少疾患の中心病院です。',
        specialties: ['新生児科', '小児外科', '集中治療科'],
      },
      ruijin: {
        description: '骨髄移植とCAR-T療法のパイオニア。世界トップクラスの治療成績を誇ります。',
        specialties: ['血液内科', '内分泌内科', '熱傷・創傷治療'],
      },
      'shanghai-general': {
        description: '上海で最も歴史ある名門病院の一つ。眼科・泌尿器科が国内屈指の水準です。',
        specialties: ['眼科', '泌尿器科', '耳鼻咽喉科・頭頸部外科'],
      },
      zhongshan: {
        description: '復旦大学附属。循環器医療の中心で、独立した国際患者棟と英語対応スタッフを完備しています。',
        specialties: ['一般外科', '消化器内科', '循環器内科'],
      },
      renji: {
        description: '上海交通大学附属。消化器内科は4年連続全国第1位。肝移植の中心病院です。',
        specialties: ['消化器内科', '生殖医学', '膠原病・リウマチ科'],
      },
      longhua: {
        description: '伝統中国医学（TCM）の頂点。TCM医療ツーリズム公式指定病院。鍼灸・漢方療法・リハビリテーションをご提供します。',
        specialties: ['中医腫瘍科', '中医整形外科', '中医外科'],
      },
      ipmch: {
        description: '中国福利会附属。ハイリスク妊娠・胎児医学・生殖医学の中心病院です。',
        specialties: ['生殖医学', '産科', '婦人科'],
      },
      scmc: {
        description: '上海交通大学附属。中国トップクラスの小児心臓外科。Project HOPEと提携しています。',
        specialties: ['小児心臓外科', '小児血液腫瘍科', '発達行動小児科'],
      },
      sixth: {
        description: '1963年に世界初の断肢再植手術を成功。国際的に評価される整形外科・内分泌内科の中心です。',
        specialties: ['整形外科', '内分泌代謝科', 'スポーツ医学'],
      },
      'first-maternity': {
        description: '上海屈指の産婦人科病院。産科・新生児医療を国際患者サポート付きでご提供します。',
        specialties: ['産科', '胎児医学', '生殖医学'],
      },
      xinhua: {
        description: '脊椎外科・小児外科の中心。国際サービスを完備しています。',
        specialties: ['小児科', '皮膚科', '一般外科'],
      },
      huadong: {
        description: '復旦大学附属。老年医学・リハビリテーションの名門。エグゼクティブ健診で人気です。',
        specialties: ['老年医学', 'リハビリテーション科', '臨床栄養科'],
      },
      ninth: {
        description: '中国第1位の歯科病院。2024年1月に浦東キャンパスへ国際医療部を開設。100台超の診療ユニット・CBCT・マイクロスコープ・レーザー設備を完備。常駐の国際インプラント専門医と、複雑症例へのMDT体制を整えています。40か国以上の患者の治療実績があります。',
        specialties: ['歯科口腔外科 第1位', '形成・再建外科', '顎顔面外科'],
      },
      jiahui: {
        description: '上海最大級の民営国際病院（500床）。マサチューセッツ総合病院提携のフルサービス医療センターです。',
        specialties: ['腫瘍科', '外科', '総合診療科'],
      },
      unicare: {
        description: 'Chindex Healthcareグループ。西洋式の患者ケアと国際基準に基づく総合医療を提供します。',
        specialties: ['家庭医学', '産科', '小児科'],
      },
      parkway: {
        description: '世界最大級の医療グループ IHH Healthcare の一員。プルーデンシャル直結精算など保険ネットワークが充実しています。',
        specialties: ['多診療科', '家庭医学', '診断科'],
      },
      shine: {
        description: 'Mayo Clinic Care Network 加盟病院。循環器・消化器・総合診療を国際基準でご提供します。',
        specialties: ['循環器内科', '消化器内科', '総合診療科'],
      },
      raffles: {
        description: 'シンガポール Surbana Jurong グループ。医療ツーリズムと総合健診サービスが中心です。',
        specialties: ['エグゼクティブ健診', '総合診療科', '医療ツーリズム'],
      },
    },
    agentChat: {
      welcome: 'こんにちは！私はNavi、あなたの医療ナビゲーターです。病院、治療、費用、ビザ、上海での医療の旅の計画について、何でもお尋ねください。',
      questions: [
        'パーソナライズドサービスには何が含まれますか？',
        '予約はどのように取ればよいですか？',
        '個人対応サービスの料金はいくらですか？',
      ],
      inputPlaceholder: '上海の医療について何でもお尋ねください...',
      chatTitle: 'Navi・医療ナビゲーター',
      chatSubtitle: '24時間AIアシスタント',
    },
    pages: {
      treatmentsTitle: '治療と病院',
      treatmentsSubtitle: 'あらゆる診療科における、上海の最高水準の医療機関へのアクセス。',
      contactTitle: 'お問い合わせ',
      contactSubtitle: '今日からあなたの医療の旅を始めましょう。チームが24時間体制でサポートします。',
      patientStoriesTitle: '患者の声',
      patientStoriesSubtitle: '私たちに健康を託された患者様の実際の体験談。',
      whyShanghaiTitle: 'なぜ上海なのか？',
      whyShanghaiSubtitle: '上海は、手の届く価格で世界クラスの医療を求める国際患者にとって、屈指の渡航先となっています。',
      careTeamTitle: '私たちのケアチーム',
      careTeamSubtitle: 'ISPN認定の日中両語対応看護師が、あなたの健康と安らぎのために尽力します。',
      howItWorksTitle: 'ご利用の流れ',
      howItWorksSubtitle: 'シンプルなプロセスで、上海の世界クラスの医療にアクセスできます。',
      faqTitle: 'よくある質問',
      faqSubtitle: '上海での医療受け入れについて知っておくべきこと — 費用、病院の質、ビザ、保険、日中両語サポート。',
    },

    // ── 医療免責事項（法的） ──
    medicalDisclaimer: {
      title: '医療免責事項',
      lastUpdated: '最終更新日：2026年10月12日',
      warning: 'ShanghaiMedは病院、診療所、または医療提供者ではありません。当社は医学的診断、治療、処方箋、または医学的アドバイスを提供しません。',
      whatWeAre: {
        heading: '当社について',
        content: 'ShanghaiMed（運営主体：上海可玲信息科技有限公司）は、医療旅行のコーディネートおよび患者ナビゲーションサービスです。中国・上海の認可を受けた公立病院および専門医への医療受診を、海外の患者様が計画・遂行できるよう支援します。当社の役割は、物流・言語・事務のサポートです。',
      },
      whatWeDoNotDo: {
        heading: '当社が行わないこと',
        item1: '当社は病状の診断を行いません。',
        item2: '当社は薬の処方を行いません。',
        item3: '当社は医療行為や治療の実施・指示を行いません。',
        item4: '当社は臨床的結果、待ち時間、または治療の成功を保証しません。',
        item5: '当社は、医師免許を有する専門医の専門的判断に代わるものではありません。',
      },
      clinicalResponsibility: {
        heading: '臨床的責任',
        content: '診断、治療計画、処方箋、手術、検査、入院を含むすべての臨床的判断は、治療を行う病院およびその医師免許を有する医師が、それぞれの専門的責任と中国の医師免許に基づいて独立して行います。病院費および治療費は、病院の定める条件に基づき、患者様が病院に直接お支払いいただきます。',
      },
      contentInformational: {
        heading: 'コンテンツは情報提供のみを目的としています',
        content: '当ウェブサイト上の記事、費用見積り、医師紹介、診療科情報などのコンテンツは、一般的な情報提供および計画の目的で提供されており、医学的アドバイスではありません。健康情報は急速に変化し、個々の症例は異なります。治療に関する決定は、必ず担当医にご相談ください。',
      },
      emergencies: {
        heading: '緊急時',
        content: '医療緊急時には、直ちに最寄りの緊急サービスに連絡してください。中国本土では、救急車および緊急医療のために120番にダイヤルしてください。',
      },
      noGuarantee: {
        heading: '病院・医師の保証について',
        content: '当社は、提供された情報に基づき、患者様を適格な病院および専門医にマッチングするよう合理的な努力を行います。ただし、病院のスケジュールは変更されることがあり、特定の医師を常に保証できるわけではなく、最終的な治療決定は病院に委ねられます。',
      },
      contact: {
        heading: 'お問い合わせ',
        company: 'Shanghai Keling Information Technology Co., Ltd.',
        address: '中国上海市楊浦区長陽路2555号 1階 101室',
        email: 'hello@shanghaimedhealth.com',
      },
    },
  },
  // ── Arabic (MSA, Gulf) ── UI strings only; medical/legal/price text falls back to en (YMYL) ──
  ar: {
    ...enTranslations,
    nav: {
      whyShanghai: 'لماذا شنغهاي',
      howItWorks: 'كيف يعمل',
      treatments: 'العلاجات',
      careTeam: 'فريق الرعاية',
      trust: 'الثقة',
      items: ['لماذا شنغهاي', 'كيف يعمل', 'شبكة المستشفيات', 'فريق الرعاية', 'الأسعار', 'المدونة', 'اتصل بنا'],
    },
    hero: {
      badge1: 'مستشفيات التأمين الدولي',
      badge2: 'ممرضات مسجلات يجيدن الإنجليزية والصينية',
      badge3: 'دعم AI + بشري على مدار الساعة',
      title: 'الرعاية الصحية في شنغهاي',
      titleHighlight: 'مصممة حولك',
      subtitle: 'تواصل مع أفضل المستشفيات في الصين وممرضات يجيدن الإنجليزية والصينية ودعم AI على مدار الساعة — كل ذلك من منصة واحدة.',
      cta: 'احجز استشارة طبية مجانية',
    },
    careTeam: {
      title: 'ممرضات مسجلات يجيدن الإنجليزية والصينية',
      subtitle: 'رفقاء رعاية صحية مخصصون في كل مرحلة من رحلتك الطبية في شنغهاي.',
      badge: 'فريق الرعاية',
      expertTeam: 'فريق الخبراء',
      ispnCertified: 'شهادة ISPN',
      ispnDesc: 'معايير دولية للممرضات المحترفات',
      ispnIssuer: 'شهادة CGFNS (الولايات المتحدة)',
      credentialsTitle: 'مؤهلات الممرضات',
      servicesTitle: 'خدمات التمريض',
      nursingCare: 'رعاية تمريضية بالإنجليزية والصينية',
      appointmentCoordination: 'تنسيق المواعيد',
      translationServices: 'خدمات الترجمة',
      transportation: 'ترتيبات النقل',
      medicalReports: 'ترجمة التقارير الطبية',
      emergencySupport: 'الدعم الطارئ',
      services: [
        { title: 'استشارة ما قبل العلاج', description: 'مراجعة السجلات الطبية وشرح الإجراءات والتنسيق مع أطباء المستشفى المختصين.' },
        { title: 'جدولة المواعيد', description: 'ترتيب استشارات الأطباء والفحوصات التشخيصية وجلسات العلاج.' },
        { title: 'الترجمة والتفسير', description: 'ترجمة طبية فورية أثناء الاستشارات والإجراءات.' },
        { title: 'الإرشاد داخل المستشفى', description: 'مرافقتك في إجراءات القبول والخروج والدفع.' },
        { title: 'دعم الخروج من المستشفى', description: 'إرشادات الأدوية ومواعيد المتابعة وترجمة التقارير الطبية.' },
        { title: 'دعم التأمين', description: 'تقديم دعم إداري للتحقق من مزايا بوليصة التأمين وتأكيد تغطية المستشفى للتأمين.' },
      ],
      credentials: [
        { name: 'ممرضات مسجلات مرخصات (RN)', detail: 'موثقات من هيئة الصحة بشنغهاي' },
        { name: 'شهادة متعددة اللغات', detail: 'إجادة الإنجليزية والصينية' },
        { name: 'شهادة JLPT N1', detail: 'اختبار الكفاءة في اللغة اليابانية (المستوى الأعلى)' },
        { name: 'الترجمة الطبية', detail: 'دعم ترجمة المستندات الطبية والترجمة الفورية في الموقع' },
        { name: 'رعاية المرضى الدوليين', detail: 'خبرة تزيد على 10 سنوات' },
      ],
    },
    pricing: {
      badge: 'الأسعار',
      eyebrow: 'بدون رسوم خفية',
      title: 'أسعار خدمات الكونسيرج',
      subtitle: 'رسوم كونسيرج شفافة واحدة لكل شخص. الرسوم الطبية تُدفع مباشرة للمستشفيات بالأسعار المحلية — لا نتقاضى عمولات من المستشفيات.',
      usdLabel: 'دولار أمريكي',
      whatsIncluded: 'المشمول',
      freeCard: {
        name: 'استشارة أولية مجانية',
        subtitle: 'احصل على المعلومات التي تحتاجها قبل الالتزام — بدون أي التزام أو دفع.',
        badge: 'مجاني',
        unit: 'مجاني',
        scope: 'تحدث مع Sara أولاً — بدون أي التزام أو دفع.',
        items: [
          'تقييم الاحتياجات الطبية',
          'توصيات المستشفيات والمتخصصين',
          'تقدير تكلفة العلاج',
          'إرشاد التأمين',
        ],
        itemsLabel: 'ما تحصل عليه — 4 خدمات',
        callout: '<strong>مكالمة لمرحلة اتخاذ القرار فقط.</strong> تساعدك هذه المكالمة المجانية في تحديد المستشفى والطبيب ونطاق الميزانية المناسبة. تبدأ الخدمات الميدانية عند حجز مرافق بالساعة أو باقة كونسيرج.',
        cta: 'تحدث مع Sara على WhatsApp',
      },
      hourlyCard: {
        name: 'مرافق مستشفى ميداني',
        subtitle: 'للمرضى الذين حجزوا طبيبهم بأنفسهم بالفعل.',
        scope: 'يُحجز ويُدفع بالساعة، متاح بشكل مستقل <em style="font-style:italic;color:#7b8c99">أو</em> كإضافة لأي باقة.',
        items: [
          'مرافق ميداني في المستشفى',
          'ترجمة طبية ميدانية بين الإنجليزية–الصينية · لغات أخرى بتكلفة إضافية',
          'إرشاد فوري (الطوابير، الدفع، استلام الأدوية)',
          'رسالة متابعة في نفس يوم الزيارة',
        ],
        itemsLabel: 'المشمول — 4 خدمات',
        callout: '<strong>حدود النطاق:</strong> المرافق بالساعة يشمل المرافقة الميدانية والترجمة بين الإنجليزية–الصينية فقط. لا يشمل <strong>تحديد المواعيد</strong>، مطابقة الأطباء، الاستقبال من المطار، ترجمة التقارير، دعم التأشيرات، الموافقة المسبقة للتأمين، الترجمة بلغات غير الإنجليزية، أو المتابعة بعد العلاج.',
        cta: 'احجز مرافق بالساعة',
      },
      checkupCard: { subtitle: 'ممرضة مخصصة ليوم واحد.' },
      essentialCard: { subtitle: 'تنسيق شامل للمواعيد والترجمة والتأمين والخدمات اللوجستية.' },
      surgeryCard: { subtitle: 'دعم منسق خلال الجراحة والإقامة في المستشفى.' },
      essentialBadge: 'الأكثر اختياراً',
      packages: [
        {
          name: 'كونسيرج الفحص الصحي',
          unit: 'لكل شخص · يوم واحد (نهاري)',
          description: 'لبرامج الفحص الصحي ليوم واحد فقط.',
          itemsLabel: 'المشمول — 13 خدمة',
          allItems: [
            'ممرضة ميدانية ليوم كامل (نهاري)',
            'مساعدة في تنسيق الفندق',
            'ترجمة وشرح تقرير الفحص الصحي',
            'استلام وتوصيل الأدوية',
            'مساعدة في النقل المحلي والدفع',
            'دعم خطاب دعوة التأشيرة',
            'دعم التأمين',
            'استقبال وتوصيل المطار · سيارة سيدان عادية',
            'ترجمة طبية ميدانية بين الإنجليزية–الصينية',
            'تحديد مواعيد الأطباء',
            'مطابقة المستشفيات والمتخصصين',
            'دعم مخصص عبر WhatsApp',
            'متابعة عن بُعد لمدة 30 يوماً بعد الفحص',
          ],
        },
        {
          name: 'كونسيرج الرعاية الأساسية',
          unit: 'لكل شخص · 3 أيام (نهاري)',
          description: 'مطلوبة لجميع استشارات المتخصصين والحالات الطبية.',
          itemsLabel: 'المشمول — 13 خدمة',
          allItems: [
            'ممرضة ميدانية لمدة 3 أيام (نهاري)',
            'مراجعة السجلات الطبية قبل الزيارة',
            'مطابقة الأطباء والمتخصصين',
            'تحديد مواعيد المستشفى',
            'استقبال وتوصيل المطار · سيارة سيدان عادية',
            'تنسيق الفندق والنقل المحلي',
            'ترجمة طبية ميدانية بين الإنجليزية–الصينية',
            'إرشاد ميداني ومساعدة في الدفع',
            'ترجمة التقارير الطبية',
            'استلام وتوصيل الأدوية',
            'دعم مخصص عبر WhatsApp طوال فترة الإقامة',
            'دعم التأمين · موافقة مسبقة',
            'متابعة عن بُعد لمدة 30 يوماً بعد العلاج',
          ],
        },
        {
          name: 'الجراحة والرعاية الممتدة',
          unit: 'لكل شخص · 5 أيام (نهاري)',
          description: 'مطلوبة للجراحة والإجراءات التي تتطلب إقامة في المستشفى.',
          itemsLabel: 'المشمول — 16 خدمة',
          allItems: [
            'ممرضة ميدانية لمدة 5 أيام (نهاري)',
            'تنسيق ما قبل الإقامة',
            'مرافقة في يوم الجراحة',
            'زيارات متابعة للمقيمين خلال الإقامة',
            'تواصل مع الأسرة وتحديثات حول التقدم',
            'مراجعة السجلات الطبية قبل الجراحة وتقديم موجز',
            'إرشاد اختيار الأطباء والمستشفيات',
            'استقبال وتوصيل المطار · سيارة سيدان عادية',
            'دعم الفندق والإقامة الممتدة',
            'ترجمة طبية ميدانية بين الإنجليزية–الصينية',
            'إرشاد ميداني ومساعدة في الدفع/الفوترة',
            'ترجمة التقارير الجراحية',
            'استلام وتوصيل الأدوية',
            'دعم مخصص عبر WhatsApp طوال فترة الإقامة',
            'تنسيق التأمين والودائع الجراحية',
            'متابعة عن بُعد لمدة 60 يوماً بعد العلاج',
          ],
        },
      ],
      faqTitle: 'الأسئلة الشائعة حول الأسعار والخدمات',
      faqSub: 'أسئلة شائعة حول الأسعار والنطاق والتأمين والحالات الخاصة.',
      viewAllFaq: 'عرض جميع الأسئلة الشائعة حول الأسعار والخدمات',
      faqLinkDesc: 'الأسعار والتأمين والتأشيرات والمدفوعات والرعاية الطبية — إجابات للأسئلة الشائعة',
      faqItems: [
        { q: 'هل الاستشارة المجانية مجانية حقاً؟', a: 'نعم. استشارتك الأولية عبر WhatsApp مجانية تماماً <strong>بدون أي التزام</strong>. نقوم بتقييم احتياجاتك الطبية، وتوصية المستشفيات والمتخصصين، وتقديم تقدير للتكلفة، وشرح خيارات التأمين — كل ذلك قبل أن تدفع أي شيء. تبدأ الخدمات الميدانية فقط عند حجز مرافق بالساعة أو باقة كونسيرج.' },
        { q: 'هل يمكنني حجز مرافق بالساعة دون شراء باقة؟', a: 'نعم. <strong>المرافق الميداني بمبلغ $50/الساعة</strong> مصمم كخدمة مستقلة للمرضى الذين حجزوا طبيبهم بأنفسهم بالفعل ويحتاجون فقط إلى مرافقة داخل المستشفى. وهو متاح أيضاً كإضافة لتمديد ساعات المرافقة بما يتجاوز الأيام المشمولة في باقة كونسيرج. ملاحظة: المرافق بالساعة يغطي الحضور الميداني والترجمة بين الإنجليزية–الصينية فقط — تحديد المواعيد، مطابقة الأطباء، النقل من المطار، وتنسيق التأمين تتطلب باقة كونسيرج. كإضافة لباقات الكونسيرج، تُحتسب ساعات المرافقة الإضافية بما يتجاوز الأيام المشمولة أيضاً بمبلغ $50/الساعة.' },
        { q: 'ماذا تشمل باقة Essential بسعر $1,000؟', a: 'تشمل <strong>باقة Essential Care Concierge 3 أيام كاملة للمرافقة النهارية</strong>: مراجعة السجلات الطبية قبل الزيارة، مطابقة الأطباء، تحديد مواعيد متعددة، ترجمة ميدانية بين الإنجليزية–الصينية في كل زيارة، التنقل داخل المستشفى، الاستقبال والتوصيل من وإلى المطار بسيارة سيدان عادية (المركبات الخاصة بتكلفة إضافية)، ترجمة التقارير الطبية، استلام وتوصيل الأدوية، دعم مخصص عبر WhatsApp طوال إقامتك، دعم التأمين بما في ذلك التحقق من مزايا البوليصة وخطابات الموافقة المسبقة، ومتابعة عن بُعد لمدة 30 يوماً بعد العلاج. هذه الباقة مطلوبة لجميع استشارات المتخصصين وأي حالة طبية.' },
        { q: 'هل تتعاملون مع التأمين الصحي؟', a: 'نقدم <strong>دعماً للتأمين</strong>، بما في ذلك التحقق من مزايا بوليصة التأمين الخاصة بك، ومساعدتك في الحصول على خطابات الموافقة المسبقة، وتنسيق الأوراق الإدارية مع المستشفى. عندما يكون لدى شركة التأمين الخاصة بك ترتيب فوترة مباشرة مع المستشفى، نساعد في تنسيق العملية. وعندما لا تكون الفوترة المباشرة متاحة، تدفع للمستشفى مباشرة ونحن نقدم الوثائق التي تحتاجها شركة التأمين للاسترداد. لا نضمن التغطية أو الموافقة على الفوترة المباشرة — القرارات تتخذها شركة التأمين الخاصة بك.' },
        { q: 'هل الرسوم الطبية مشمولة في أسعار الكونسيرج؟', a: 'لا. رسوم الكونسيرج مخصصة لخدمات التنسيق والمرافقة لدينا فقط. <strong>الرسوم الطبية (استشارات الأطباء، رسوم المستشفى، الفحوصات المخبرية، الأدوية، الجراحة) تُدفع مباشرة للمستشفى بالأسعار المحلية</strong>. نقدم لك تقديراً واضحاً للتكلفة قبل وصولك، وستعرف الأسعار المنشورة للمستشفى قبل كل إجراء. لا نتقاضى عمولات من المستشفيات.' },
        { q: 'هل تدعمون حالات الطوارئ أو الأوقات خارج الدوام؟', a: 'في حالة طارئة طبية، <strong>اتصل برقم 120 فوراً</strong> واذهب إلى أقرب مستشفى — باقات الكونسيرج لا تشمل خدمات الطوارئ الطبية. بمجرد وصولك إلى المستشفى، نقدم <strong>تنسيقاً ميدانياً للطوارئ على مدار الساعة</strong> مقابل رسوم إضافية: <strong>$300 رسوم استدعاء طوارئ (متاح على مدار الساعة، يشمل أول 4 ساعات)</strong>، ثم <strong>$100/الساعة</strong> لدعم المرافقة الميدانية الإضافي. يغطي ذلك الإرسال العاجل، تنسيق الممرضة الأولى، التواصل مع الأسرة، والتنقل في المستشفى أثناء الطوارئ. تواصل مع Sara على WhatsApp في أسرع وقت ممكن بعد الاتصال بـ 120.' },
        { q: 'ما اللغات المشمولة؟ هل تدعمون لغات غير الإنجليزية والصينية؟', a: 'تشمل جميع باقات الكونسيرج <strong>ترجمة طبية ميدانية بين الإنجليزية–الصينية</strong>. الترجمة بين اليابانية–الصينية مشمولة للعملاء الناطقين باليابانية الذين يحجزون عبر الصفحة اليابانية. إذا كنت تحتاج إلى دعم <strong>بلغة أخرى</strong> (العربية، الروسية، المنغولية، الكورية، الفرنسية، الإسبانية، إلخ)، يمكن ترتيب مترجم مخصص بتكلفة إضافية — تستند الأسعار إلى أسعار السوق المحلية في شنغهاي لتلك اللغة. يرجى ذكر احتياجاتك اللغوية عند الدردشة مع Sara حتى نتمكن من تقديم عرض أسعار دقيق.' },
        { q: 'ما هي سياسة الاسترداد والإلغاء؟', a: 'الإلغاءات التي تتم <strong>قبل 14 يوماً أو أكثر</strong> من موعد وصولك المحدد تحصل على استرداد كامل مطروحاً منه رسوم معالجة صغيرة. الإلغاءات خلال <strong>14 يوماً</strong> مؤهلة لاسترداد جزئي، حيث قد يكون قد تم ترتيب بعض المستشفيات والخدمات اللوجستية بالفعل. إلغاءات نفس اليوم وعدم الحضور غير قابلة للاسترداد. تُراجع الحالات التي تنطوي على حالات طارئة طبية حقيقية أو رفض تأشيرات موثقة بشكل فردي — نبذل قصارى جهدنا لنكون منصفين. ستُدرج شروط الاسترداد المحددة في تأكيد الحجز الخاص بك.' },
        { q: 'هل يمكنني إحضار أفراد العائلة أو مترجمي الخاص؟', a: '<strong>نعم — إحضار أفراد العائلة أو مترجمك الخاص مرحب به دون أي رسوم إضافية.</strong> يركز مرافق الممرضة لدينا على التنسيق الطبي والتنقل في المستشفى والترجمة بغض النظر عن حجم المجموعة. إذا كنت تسافر مع مجموعة أكبر وتحتاج إلى مركبة أكبر (مثل شاحنة بدلاً من سيارة سيدان عادية للاستقبال من المطار)، قد تُطبق رسوم ترقية بناءً على نوع المركبة وتوافرها. أبلغ Sara بحجم مجموعتك عند الحجز حتى نتمكن من ترتيب النقل المناسب.' },
      ],
      refundPolicy: 'سياسة الاسترداد',
      medicalDisclaimer: 'إخلاء مسؤولية طبية',
      independentDisclaimer: 'تعمل ShanghaiMed كمزود خدمة كونسيرج مستقل؛ لا نزاول الطب وممرضاتنا لا يحللن محل أطبائك المعالجين.',
    },
    freeConsultation: {
      badge: 'استشارة مجانية',
      title: 'احجز استشارتك الطبية المجانية',
      subtitle: 'تحدث مع فريقنا الطبي قبل السفر — سنطابقك مع المتخصصين المناسبين، ونخطط لرحلتك الطبية وفق احتياجاتك، ونزودك بتقدير واضح للتكاليف مسبقاً.',
      specialistMatchTitle: 'مطابقة مع كبار المتخصصين',
      specialistMatchDesc: 'نوصلك مع كبار الأساتذة ورؤساء الأقسام في أفضل مستشفيات شنغهاي من الفئة 3A — لنطابق حالتك الخاصة مع المتخصص الأنسب لحالتك.',
      specialistMatchPoints: [
        'مطابقة المتخصص لحالتك الطبية الخاصة — ليس مجرد أقرب أو خيار افتراضي',
        'التواصل مع الأساتذة ورؤساء الأقسام المناسبين عبر مستشفيات شنغهاي الحكومية من الفئة 3A بناءً على حالتك',
        'وصول ذو أولوية إلى المستشفيات الدولية والخاصة الرائدة في شنغهاي؛ يمكن عادةً ترتيب المواعيد في وقت قصير',
        'مراجعة مسبقة للسجلات الطبية قبل وصولك إلى شنغهاي',
      ],
      badges: [
        { title: 'لا يلزم الدفع', desc: 'استشارة مجانية، بدون رسوم مسبقة أو ودائع' },
        { title: 'بدون التزام بالشراء', desc: 'تحدث معنا دون أي ضغط لحجز أي خدمة' },
        { title: 'سرية تامة', desc: 'معلوماتك الطبية تبقى خاصة ولا تُشارك بدون موافقتك' },
      ],
      ctaTitle: 'ابدأ استشارتك المجانية',
      ctaDesc: 'تواصل عبر واتساب — سيرد فريقنا الطبي في أقرب وقت ممكن، عادةً خلال بضع ساعات خلال ساعات العمل.',
      ctaButton: 'الدردشة عبر واتساب',
      hospitalNetworkTitle: 'شبكة مستشفياتنا',
      hospitalNetworkDesc: 'نتعاون مع 14 مستشفى حكومياً من الفئة 3A و5 مستشفيات دولية في شنغهاي. وإلى جانب هؤلاء الشركاء، يمكننا ترتيب المواعيد في جميع مستشفيات الدرجة الثالثة في شنغهاي.',
      publicHospitals: 'المستشفيات الحكومية من الفئة 3A (14)',
      privateHospitals: 'المستشفيات الدولية (5)',
      beyondTitle: 'خارج الشبكة المعروضة',
      beyondDesc: 'إذا احتجت متخصصاً في أي مستشفى ثالثي آخر ب شنغهاي غير المذكور هنا، يمكننا تنسيق الموعد نيابة عنك. أخبرنا باحتياجاتك الطبية وسنطابقك مع المتخصص المناسب.',
    },
    insights: {
      badge: 'المدونة',
      title: 'أحدث المقالات',
      subtitle: 'اكتشف مقالات عن الرعاية الصحية في شنغهاي والسياحة الطبية والعافية.',
      readMore: 'اقرأ المزيد',
      viewAll: 'عرض جميع المقالات',
      featured: '★ مميز',
    },
    faq: {
      badge: 'الأسئلة الشائعة',
      title: 'الأسئلة الشائعة',
      subtitle: 'كل ما تحتاج معرفته عن السياحة الطبية في شنغهاي.',
      items: [
        { question: 'كيف أبدأ عملية السياحة الطبية؟', answer: 'ما عليك سوى ملء نموذج الاتصال الخاص بنا مع توضيح حالتك الطبية وتفضيلاتك. سيرد فريقنا خلال 24 ساعة مع توصيات بالمستشفيات وتقديرات التكاليف.' },
        { question: 'هل تساعدون في طلبات التأشيرة؟', answer: 'نعم، نوفر المساعدة في التأشيرة لأغراض العلاج الطبي. بالنسبة للدول المؤهلة، يمكننا أيضًا المساعدة في ترتيب الدخول إلى شنغهاي بدون تأشيرة عبر الترانزيت لمدة 240 ساعة.' },
        { question: 'ماذا لو كنت لا أتحدث الصينية؟', answer: 'جميع منسقاتنا من الممرضات يقدمن ترجمة فورية أثناء الاستشارات الطبية. يمكن تقديم التقارير الطبية باللغة الإنجليزية أو باللغة التي تفضلها.' },
        { question: 'كيف تتم عمليات الدفع؟', answer: 'أنت تدفع مباشرة إلى المستشفى. لحاملي التأمين، نساعد في إجراءات التسوية المباشرة.' },
        { question: 'ما أنواع العلاجات التي تتخصصون فيها؟', answer: 'ندعم مجموعة واسعة من الاحتياجات الصحية، من الفحوصات الوقائية والاستشارات المتخصصة إلى الرعاية الطبية المعقدة. احتياجات كل مريض مختلفة. نساعد في تحديد المستشفى والأخصائي ومسار الرعاية الأنسب لحالتك.' },
      ],
      stillTitle: 'هل لديك المزيد من الأسئلة؟',
      whatsappCta: 'تواصل معنا عبر WhatsApp',
      viewAll: 'تصفح كامل الأسئلة الشائعة',
      viewAllDesc: 'شاهد جميع الإجابات حول الأسعار والتأمين والتأشيرات والدفع والرعاية الطبية — أكثر من اثني عشر سؤالاً شائعاً.',
      browseFaq: 'عرض جميع الأسئلة',
      whatsappDesc: 'تحدث مباشرة مع منسقة تمريض. احصل على إجابات شخصية باللغة الإنجليزية أو اليابانية أو العربية.',
    },

    // ── المستشفيات ──
    hospitals: {
      huashan: {
        description: 'تحتل المرتبة الأولى وطنيًا في أمراض الجلد وجراحة الأعصاب. من أكثر المستشفيات الصينية شهرةً على المستوى الدولي.',
        specialties: ['جراحة الأعصاب', 'أمراض الجلد', 'الأمراض المعدية'],
        internationalFeatures: 'قسم دولي متخصص، يقبل 24 شريك تأمين',
        insuranceStatus: 'تسوية مباشرة',
      },
      'children-fudan': {
        description: 'مركز رائد لرعاية حديثي الولادة وأمراض الأطفال النادرة.',
        specialties: ['طب حديثي الولادة', 'جراحة الأطفال', 'العناية المركزة والحرجة'],
        internationalFeatures: 'قسم أطفال دولي يعمل منذ عام 1993، يقبل 19 شريك تأمين',
        insuranceStatus: 'تسوية مباشرة',
      },
      ruijin: {
        description: 'رائد في زراعة نخاع العظم وعلاج CAR-T بنتائج عالمية المستوى.',
        specialties: ['أمراض الدم', 'الغدد الصماء', 'جراحة الحروق وعلاج الجروح'],
        internationalFeatures: 'نسبة تعافي CAR-T 95.7%، قسم دولي متخصص، يقبل 21 شريك تأمين',
        insuranceStatus: 'تسوية مباشرة',
      },
      'shanghai-general': {
        description: 'من أقدم وأعرق مستشفيات شنغهاي. أقسام رائدة في طب العيون والمسالك البولية.',
        specialties: ['طب العيون', 'المسالك البولية', 'طب الأنف والأذن والحنجرة وجراحة الرأس والرقبة'],
        internationalFeatures: 'مركز مرضى دولي بطاقم متعدد اللغات، يقبل 17 شريك تأمين',
        insuranceStatus: 'تأمين دولي',
      },
      zhongshan: {
        description: 'تابع لجامعة فودان. مركز أمراض القلب مع جناح دولي مخصص وطاقم يتحدث الإنجليزية.',
        specialties: ['الجراحة العامة', 'أمراض الجهاز الهضمي', 'أمراض القلب'],
        internationalFeatures: 'جناح مرضى دولي مخصص، يقبل 19 شريك تأمين',
        insuranceStatus: 'تأمين دولي',
      },
      renji: {
        description: 'تابع لجامعة شنغهاي جياو تونغ. الأول وطنيًا في أمراض الجهاز الهضمي لأربع سنوات متتالية. مركز رائد لزراعة الكبد.',
        specialties: ['أمراض الجهاز الهضمي', 'طب الإنجاب', 'أمراض الروماتيزم'],
        internationalFeatures: 'مركز دولي لطب الإنجاب، يقبل 20 شريك تأمين',
        insuranceStatus: 'تأمين دولي',
      },
      longhua: {
        description: 'مستشفى رائد في الطب الصيني التقليدي. معتمد رسميًا كمركز تجريبي للسياحة العلاجية بالطب الصيني التقليدي. الوخز بالإبر والعلاج بالأعشاب وإعادة التأهيل بالطب الصيني التقليدي.',
        specialties: ['الأورام بالطب الصيني التقليدي', 'جراحة العظام بالطب الصيني التقليدي', 'الجراحة بالطب الصيني التقليدي'],
        internationalFeatures: 'مستشفى تجريبي رسمي للسياحة العلاجية بالطب الصيني التقليدي، يقبل 18 شريك تأمين',
        insuranceStatus: 'تأمين دولي',
      },
      ipmch: {
        description: 'تابع لمعهد الرعاية الاجتماعية الصيني. مركز رائد للحمل عالي الخطورة وطب الجنين وطب الإنجاب.',
        specialties: ['طب الإنجاب', 'التوليد', 'أمراض النساء'],
        internationalFeatures: 'تابع لمعهد الرعاية الاجتماعية الصيني، دعم دولي للتوليد، يقبل 19 شريك تأمين',
        insuranceStatus: 'تأمين دولي',
      },
      scmc: {
        description: 'تابع لجامعة شنغهاي جياو تونغ. المركز الصيني الرائد في جراحة قلب الأطفال. شراكة مع مشروع HOPE.',
        specialties: ['جراحة قلب الأطفال', 'أمراض الدم والأورام لدى الأطفال', 'طب الأطفال النمائي والسلوكي'],
        internationalFeatures: 'شراكة مع Project HOPE، مركز أطفال دولي، يقبل 23 شريك تأمين',
        insuranceStatus: 'تأمين دولي',
      },
      sixth: {
        description: 'رائد في إعادة زرع الأطراف منذ عام 1963. مركز رائد في جراحة العظام والغدد الصماء بتقدير دولي.',
        specialties: ['جراحة العظام', 'الغدد الصماء والتمثيل الغذائي', 'الطب الرياضي'],
        internationalFeatures: 'أول مركز في العالم لإعادة زرع الأطراف، يقبل 18 شريك تأمين',
        insuranceStatus: 'تأمين دولي',
      },
      'first-maternity': {
        description: 'مستشفى الولادة الأول في شنغهاي. رعاية توليد وحديثي ولادة شاملة مع دعم للمرضى الدوليين.',
        specialties: ['التوليد', 'طب الجنين', 'طب الإنجاب'],
        internationalFeatures: 'خدمات دولية متخصصة في التوليد، يقبل 18 شريك تأمين',
        insuranceStatus: 'تأمين دولي',
      },
      xinhua: {
        description: 'مركز رائد لجراحة العمود الفقري وجراحة الأطفال مع خدمات دولية شاملة.',
        specialties: ['طب الأطفال', 'أمراض الجلد', 'الجراحة العامة'],
        internationalFeatures: 'قسم دولي شامل، يقبل 16 شريك تأمين',
        insuranceStatus: 'تأمين دولي',
      },
      huadong: {
        description: 'تابع لجامعة فودان. مركز رائد في طب الشيخوخة وإعادة التأهيل. مشهور ببرامج الفحص الصحي التنفيذية.',
        specialties: ['طب الشيخوخة', 'طب إعادة التأهيل', 'التغذية السريرية'],
        internationalFeatures: 'مركز فحوصات تنفيذية، إعادة تأهيل دولية، يقبل 17 شريك تأمين',
        insuranceStatus: 'تأمين دولي',
      },
      ninth: {
        description: 'المستشفى الأول في الصين في طب الأسنان. افتُتح قسم طبي دولي متخصص في يناير 2024 في حرم بوتونغ بأكثر من 100 كرسي أسنان وأجهزة CBCT ومجاهر وأجهزة ليزر. أخصائي زراعة أسنان دولي متفرغ البروفيسور تونيتي. آلية فريق متعدد التخصصات MDT للحالات المعقدة. عالج مرضى من أكثر من 40 دولة.',
        specialties: ['جراحة الفم والأسنان — الأولى وطنيًا', 'الجراحة التجميلية والترميمية', 'جراحة الوجه والفكين'],
        internationalFeatures: 'مستشفى أسنان رائد يضم 5 أكاديميين. يحتل المرتبة الأولى وطنيًا في جراحة الفم والجراحة التجميلية.',
        insuranceStatus: 'تسوية مباشرة (8 شركات تأمين، 21 شراكة)',
      },
      jiahui: {
        description: 'أكبر مستشفى دولي خاص في شنغهاي يضم 500 سرير. منتسب إلى مستشفى ماساتشوستس العام. مركز طبي متكامل الخدمات.',
        specialties: ['الأورام', 'الجراحة', 'الطب العام'],
        internationalFeatures: 'الانتساب إلى مستشفى ماساتشوستس العام، 500 سرير',
        insuranceStatus: 'أكثر من 50 شركة تأمين دولية',
      },
      unicare: {
        description: 'جزء من مجموعة Chindex Healthcare. رعاية طبية شاملة بنمط غربي وفق المعايير الدولية.',
        specialties: ['طب الأسرة', 'التوليد', 'طب الأطفال'],
        internationalFeatures: 'علامة مستشفيات دولية راسخة',
        insuranceStatus: 'أكثر من 50 شركة تأمين دولية',
      },
      parkway: {
        description: 'جزء من مجموعة IHH Healthcare — إحدى أكبر المجموعات الطبية في العالم. شبكة تأمين واسعة تشمل التسوية المباشرة مع برودنشال.',
        specialties: ['الرعاية متعددة التخصصات', 'طب الأسرة', 'التشخيص'],
        internationalFeatures: 'مجموعة IHH Healthcare، تسوية مباشرة مع برودنشال',
        insuranceStatus: 'تسوية مباشرة مع برودنشال',
      },
      shine: {
        description: 'عضو في شبكة رعاية Mayo Clinic. أمراض القلب والجهاز الهضمي والطب العام وفق المعايير الدولية.',
        specialties: ['أمراض القلب', 'أمراض الجهاز الهضمي', 'الطب العام'],
        internationalFeatures: 'شراكة مع شبكة Mayo Clinic Care Network',
        insuranceStatus: 'أكثر من 40 شركة تأمين دولية',
      },
      raffles: {
        description: 'جزء من مجموعة سوربانا جورونج السنغافورية. تركيز على السفر الطبي مع برامج فحص صحي شاملة.',
        specialties: ['الفحص الصحي التنفيذي', 'الطب العام', 'السفر الطبي'],
        internationalFeatures: 'مجموعة سوربانا جورونج السنغافورية',
        insuranceStatus: 'تأمين دولي',
      },
    },

    // ── صفحة الأسئلة الشائعة ──
    faqPage: {
      cta: {
        title: 'هل لديك أسئلة أخرى؟',
        text: 'احصل على استشارة مجانية مع ShanghaiMed دون أي التزام. يرد فريقنا خلال 24 ساعة.',
        email: 'راسلنا عبر البريد الإلكتروني',
        form: 'نموذج الاتصال',
      },
    },
    contact: {
      title: 'ابدأ سياحتك الطبية اليوم',
      subtitle: 'احصل على استشارة مجانية من فريقنا الطبي. مساعدنا الذكي يرد فوراً. المنسق البشري يتابع خلال 24 ساعة.',
      cta: 'ابدأ سياحتك الطبية اليوم',
      badge: 'اتصل بنا',
      whatsappTitle: 'WhatsApp',
      whatsappDesc: 'مساعد ذكي 24/7 + رد بشري خلال 24 ساعة',
      whatsapp: 'محادثة عبر WhatsApp',
      lineTitle: 'LINE',
      lineDesc: 'تحدث مباشرة مع منسقنا',
      lineButton: 'محادثة عبر LINE',
      lineIdLabel: 'LINE ID',
      lineId: 'sara_shanghaimed',
      lineScanHint: 'امسح رمز QR لإضافتنا على LINE',
      lineQrAlt: 'رمز QR لـ LINE',
      locationLabel: 'الموقع',
      locationValue: 'شنغهاي، جمهورية الصين الشعبية',
      responseLabel: 'وقت الاستجابة',
      responseValue: 'AI: فوري | بشري: خلال 24 ساعة',
      emailLabel: 'البريد الإلكتروني',
      nameLabel: 'الاسم الكامل *',
      namePlaceholder: 'اسمك الكامل',
      emailLabel2: 'البريد الإلكتروني *',
      emailPlaceholder: 'your@email.com',
      countryLabel: 'الدولة *',
      countryPlaceholder: 'اختر دولتك *',
      otherCountry: 'أخرى',
      otherCountryPlaceholder: 'أدخل دولتك *',
      countries: {
        'United States': 'الولايات المتحدة',
        'United Kingdom': 'المملكة المتحدة',
        'Canada': 'كندا',
        'Australia': 'أستراليا',
        'Japan': 'اليابان',
        'South Korea': 'كوريا الجنوبية',
        'Singapore': 'سنغافورة',
        'Germany': 'ألمانيا',
        'France': 'فرنسا',
      },
      phoneLabel: 'الهاتف / WhatsApp',
      phonePlaceholder: 'الهاتف / WhatsApp (اختياري)',
      medicalNeedsLabel: 'الاحتياجات الطبية *',
      medicalNeedsPlaceholder: 'اختر احتياجك الطبي',
      medicalNeeds: {
        consultation: 'استشارة طبية',
        cardiology: 'أمراض القلب',
        neurology: 'أمراض الأعصاب',
        oncology: 'الأورام',
        orthopedics: 'جراحة العظام',
        checkup: 'فحص صحي',
        dental: 'طب الأسنان',
        plastic: 'جراحة التجميل',
        other: 'أخرى',
      },
      messageLabel: 'رسالتك',
      messagePlaceholder: 'يرجى وصف حالتك الطبية أو استفسارك...',
      submit: 'احصل على استشارة مجانية',
      submitting: 'جاري الإرسال...',
      successTitle: 'شكراً لك!',
      successMessage: 'شكراً! تلقى مساعدنا الذكي استفسارك وسيتابع فريقنا خلال 24 ساعة. يمكنك أيضاً التواصل عبر WhatsApp — سنرد في أقرب وقت.',
      sendAnother: 'إرسال رسالة أخرى',
      privacyNote: 'بتقديم هذا النموذج، فإنك توافق على سياسة الخصوصية وتوافق على التواصل معنا بشأن خدماتنا الطبية.',
      alertFail: 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل عبر WhatsApp.',
    },
    footer: {
      tagline: 'نربط المرضى الدوليين بأفضل المؤسسات الطبية في شنغهاي والمتخصصين الصحيين ثنائيي اللغة.',
      columns: [
        {
          title: 'عن الشركة',
          links: ['من نحن', 'مؤسسنا', 'لماذا شنغهاي', 'شبكتنا', 'فريق الرعاية'],
        },
        {
          title: 'العلاجات',
          links: ['المستشفيات', 'التخصصات', 'دليل الأسعار'],
        },
        {
          title: 'الدعم',
          links: ['كيف يعمل', 'الأسئلة الشائعة', 'مكتبة الأبحاث', 'قاموس المصطلحات', 'اتصل بنا', 'دعم WhatsApp'],
        },
        {
          title: 'قانوني',
          links: ['سياسة الخصوصية', 'شروط الخدمة', 'سياسة استرداد الأموال', 'سياسة التحرير', 'إخلاء مسؤولية طبية'],
        },
      ],
      rights: 'جميع الحقوق محفوظة.',
      location: 'شنغهاي، الصين',
    },
    agentChat: {
      welcome: 'مرحباً! أنا Navi، مساعدك الطبي. اسألني عن المستشفيات أو العلاجات أو التكاليف أو التأشيرات أو التخطيط لرحلتك الطبية في شنغهاي.',
      questions: [
        'ما الذي تشملته خدمتك المخصصة؟',
        'كيف أحجز موعداً؟',
        'ما تكلفة خدمتك الفردية؟',
      ],
      inputPlaceholder: 'اسألني عن الرعاية الصحية في شنغهاي...',
      chatTitle: 'Navi · المساعد الطبي',
      chatSubtitle: 'مساعد AI على مدار الساعة',
    },
    pages: {
      treatmentsTitle: 'العلاجات والمستشفيات',
      treatmentsSubtitle: 'الوصول إلى أفضل المؤسسات الطبية في شنغهاي في جميع التخصصات.',
      contactTitle: 'اتصل بنا',
      contactSubtitle: 'ابدأ رحلتك الطبية اليوم. فريقنا جاهز للمساعدة على مدار الساعة.',
      patientStoriesTitle: 'قصص المرضى',
      patientStoriesSubtitle: 'تجارب حقيقية من مرضى وثقوا بنا لصحتهم.',
      whyShanghaiTitle: 'لماذا شنغهاي؟',
      whyShanghaiSubtitle: 'برزت شنغهاي كوجهة رائدة للمرضى الدوليين الباحثين عن رعاية صحية عالمية بأسعار معقولة.',
      careTeamTitle: 'فريق الرعاية لدينا',
      careTeamSubtitle: 'ممرضات يجيدن الإنجليزية والصينية معتمدات من ISPN مكرسات لصحتك وراحتك.',
      howItWorksTitle: 'كيف يعمل',
      howItWorksSubtitle: 'عمليتنا المبسطة تجعل الوصول إلى الرعاية الصحية العالمية في شنغهاي سهلاً.',
      faqTitle: 'الأسئلة الشائعة',
      faqSubtitle: 'كل ما تحتاج معرفته عن تلقي الرعاية الطبية في شنغهاي — التكاليف وجودة المستشفيات والتأشيرات والتأمين والدعم ثنائي اللغة.',
    },
    // ── Why Shanghai (GLM→DS→K3 final) ──
    whyShanghai: {
      badge: 'لماذا شنغهاي',
      title: 'رعاية صحية عالمية المستوى، مُيسَّرة للمرضى الدوليين',
      subtitle: 'تتيح شنغهاي الوصول إلى مستشفيات رائدة وأطباء مختصين ذوي خبرة وأسعار شفافة ودعم شخصي للمرضى الدوليين.',
      stats: [
        { value: '73,000+', label: 'زيارات المرضى الدوليين إلى شنغهاي سنوياً' },
        { value: '14', label: 'مستشفيات حكومية من الفئة 3A معتمدة في برامج السياحة الطبية التجريبية' },
        { value: '90+', label: 'عدد الجنسيات التي نخدمها' },
        { value: '25%', label: 'النمو السنوي' },
      ],
      healthSystem: {
        title: 'نظام صحي معترف به دولياً',
        items: [
          'مستشفيات رائدة تخدم مرضى من جميع أنحاء العالم',
          'أقسام دولية مخصصة تقدم خدماتها باللغة الإنجليزية',
          'مستشفيات حكومية من الفئة 3A معتمدة لتقديم الخدمات الطبية الدولية',
          'الوصول إلى أطباء مختصين في علاج الأورام وأمراض القلب والأعصاب وجراحة العظام وعلاج الخصوبة وغيرها',
        ],
      },
      travelAccess: {
        title: 'سهولة السفر والوصول إلى الرعاية الطبية',
        items: [
          'إمكانية العبور بدون تأشيرة لمدة 240 ساعة لمسافري العديد من الدول',
          'دعم تأشيرة العلاج الطبي لخطط العلاج الممتدة',
          'الاستقبال من المطار والمساعدة في التنقلات',
          'تنسيق شامل من البداية إلى النهاية طوال رحلتك الصحية',
        ],
      },
      pricing: {
        title: 'رعاية صحية عالية الجودة بأسعار تنافسية',
        subtitleLine1: 'لا يزال العديد من المرضى في الولايات المتحدة يواجهون تكاليف طبية كبيرة يدفعونها من جيوبهم رغم امتلاكهم تأميناً صحياً.',
        subtitleLine2: 'تعكس الأرقام التكاليف النموذجية المدفوعة مباشرة من المريض، وقد تختلف حسب مقدم الخدمة والموقع الجغرافي وتغطية التأمين وخطة العلاج.',
        tableService: 'الخدمة',
        tableShanghai: 'شنغهاي',
        tableUs: 'التكلفة النموذجية في الولايات المتحدة',
        rows: [
          { service: 'الفحص الصحي التنفيذي الشامل', shanghai: 'ابتداءً من 700 دولار', us: 'ابتداءً من 2,500 دولار' },
          { service: 'فحص الرنين المغناطيسي', shanghai: 'ابتداءً من 300 دولار', us: 'ابتداءً من 1,000 دولار' },
          { service: 'فحص التصوير المقطعي', shanghai: 'ابتداءً من 150 دولار', us: 'ابتداءً من 500 دولار' },
          { service: 'استشارة طبيب مختص', shanghai: 'ابتداءً من 70 دولار', us: 'ابتداءً من 250 دولار' },
          { service: 'علاج أطفال الأنابيب', shanghai: 'ابتداءً من 4,200 دولار', us: 'ابتداءً من 15,000 دولار' },
          { service: 'زراعة الأسنان', shanghai: 'ابتداءً من 800 دولار', us: 'ابتداءً من 3,000 دولار' },
        ],
        valueTitle: 'لماذا يجد المرضى قيمة حقيقية في شنغهاي',
        valueItems: [
          'الوصول إلى مستشفيات وأطباء مختصين رائدين',
          'أسعار شفافة قبل بدء العلاج',
          'وصول أسرع للاستشارات والفحوصات والعلاج',
          'تكاليف طبية أقل تُدفع مباشرة من المريض',
          'دعم شخصي ثنائي اللغة طوال رحلة المريض',
        ],
        notesTitle: 'ملاحظات هامة',
        notes: [
          'الأسعار مذكورة لأغراض التوضيح فقط ولا تُعتبر عرض سعر رسمياً.',
          'تُحدد الرسوم الطبية الفعلية من قبل المستشفى والطبيب المعالج وخطة العلاج.',
          'تعكس الأسعار الأمريكية التكاليف النموذجية للدفع الذاتي وقد تختلف بشكل كبير حسب تغطية التأمين والموقع الجغرافي.',
          'أسعار الصرف مذكورة للاسترشاد فقط وقد تتغير.',
          'تتطلب حالات العلاج المعقدة والجراحات ورعاية الأورام والخدمات الإقامية عرضاً سعرياً فردياً بعد المراجعة الطبية.',
        ],
      },
    },
    // ── Process Flow ─
    processFlow: {
      badge: 'رحلتك',
      title: 'من الاستفسار إلى الرعاية',
      subtitle: 'جدول زمني كامل لتجربتك في السياحة الطبية بشنغهاي، مع دعم مهني في كل خطوة.',
      phases: [
        {
          phase: 'قبل وصولك',
          steps: [
            { title: 'استفسار عبر الإنترنت', description: 'يرد المساعد الذكي فوراً' },
            { title: 'تقييم طبي', description: 'جمع الأعراض والتوصية بالمستشفيات' },
            { title: 'تقدير التكلفة', description: 'أسعار شفافة للاستشارة والفحوصات الأساسية' },
            { title: 'التأشيرة والسفر', description: 'إرشادات العبور بدون تأشيرة لمدة 240 ساعة ونصائح السفر' },
          ],
        },
        {
          phase: 'أثناء زيارتك',
          steps: [
            { title: 'الاستقبال من المطار', description: 'تستقبلك ممرضة تتحدث الإنجليزية والصينية' },
            { title: 'زيارة المستشفى', description: 'استشارة وفحوصات برفقة ممرضة' },
            { title: 'العلاج', description: 'رعاية عالمية المستوى في مستشفيات رائدة' },
            { title: 'الرعاية الإقامية', description: 'دعم تمريضي مخصص (عند الحاجة)' },
          ],
        },
        {
          phase: 'بعد زيارتك',
          steps: [
            { title: 'الخروج والترجمة', description: 'تقارير طبية باللغة الإنجليزية' },
            { title: 'المتابعة', description: 'دعم عن بُعد وتنسيق الوصفات الطبية' },
          ],
        },
      ],
    },
    // ── Testimonials UI ──
    testimonials: {
      badge: 'قصص نجاح',
      title: 'ماذا يقول مرضانا',
      subtitle: 'قصص حقيقية من مرضى حقيقيين غيّروا مسارهم الصحي معنا.',
      patientsServed: 'مرضى تمت خدمتهم',
      countries: 'دولة',
      satisfactionRate: 'نسبة الرضا',
      totalSavings: 'إجمالي التوفير',
      saved: 'تم توفيره',
    },
    // ── Treatments ──
    treatments: {
      title: 'مستشفيات شنغهاي الرائدة',
      subtitle: 'الوصول إلى مستشفيات رائدة في مختلف مناطق شنغهاي، مع توصيات مصممة وفق احتياجاتك الطبية.',
      hospitalNetwork: 'شبكة المستشفيات',
      publicHospitals: 'المستشفيات الحكومية من الفئة 3A',
      privateHospitals: 'المستشفيات الدولية الخاصة',
      viewAll: 'عرض جميع المستشفيات',
      keyDepartments: 'الأقسام الرئيسية',
      certifications: 'الشهادات الدولية',
      insurance: 'التأمين:',
      all: 'الكل',
      modalAllHospitals: 'جميع المستشفيات',
      modalHospitalsAvailable: 'مستشفى متاح',
      modalAllGradeA: 'الوصول إلى جميع مستشفيات شنغهاي من الدرجة 3A',
      modalAll: 'جميع المستشفيات',
      modalPublicGradeA: 'حكومي من الفئة 3A',
      modalInternationalPrivate: 'دولي خاص',
      modalIns: 'التأمين:',
      featuredTitle: 'مستشفيات موثوقة',
      featuredSubtitle: 'أفضل المستشفيات الحكومية الصينية مع أقسام دولية مخصصة',
      learnMore: 'اقرأ المزيد',
    },
    // ── How It Works ──
    howItWorks: {
      title: 'خمس خطوات بسيطة',
      subtitle: 'من استفسارك الأول إلى المتابعة بعد العلاج، ندعم كل خطوة في رحلتك الطبية بشنغهاي.',
      badge: 'كيف يعمل',
      simpleProcess: 'عملية بسيطة',
      step1Title: 'استشارة المساعد الذكي',
      step1Desc: 'يرد مساعدنا الذكي فوراً لفهم احتياجاتك.',
      step2Title: 'تعيين فريق الرعاية',
      step2Desc: 'تُعيَّن ممرضة خبيرة كمنسقة لرعايتك.',
      step3Title: 'الوصول إلى شنغهاي',
      step3Desc: 'دعم شامل يشمل النقل من المطار وحجز الفندق.',
      step4Title: 'العلاج والتعافي',
      step4Desc: 'تكامل سلس بين العلاج المتخصص والدعم ثنائي اللغة (الإنجليزية والصينية) والمتابعة بعد الرعاية.',
      steps: [
        { title: 'أرسل استفسارك', description: 'املأ نموذج التواصل موضحاً احتياجاتك الطبية. مساعدنا الذكي متاح على مدار الساعة.' },
        { title: 'تلقَّ الاستشارة', description: 'خلال 24 ساعة، يوفر لك منسق بشري خيارات المستشفيات وتقديرات التكلفة.' },
        { title: 'أكّد وسافر', description: 'عندما تكون مستعداً للبدء، ننسق المواعيد وترتيبات السفر والدعم عند الوصول.' },
        { title: 'تلقَّ الرعاية', description: 'تقدم ممرضتك المتحدثة بالإنجليزية والصينية دعماً مباشراً طوال الاستشارات والفحوصات والعلاج.' },
        { title: 'رعاية المتابعة', description: 'نساعدك في السجلات الطبية ومواعيد المتابعة وتنسيق الوصفات الطبية والاستشارات عن بُعد.' },
      ],
    },
    // ── Trust ──
    trust: {
      badge: 'لماذا تختارنا',
      title: 'شريكك الموثوق في السياحة الطبية',
      subtitle: 'نقدم خدمات سياحة طبية احترافية وشفافة وموثوقة في شنغهاي. إليك ما يميزنا.',
      ctaText: 'هل أنت مستعد لتجربة خدمات سياحة طبية احترافية؟',
      ctaButton: 'ابدأ سياحتك الطبية',
    },
    // ── Blog UI ──
    blog: {
      title: 'المدونة',
      subtitle: 'اكتشف مقالات عن الرعاية الصحية في شنغهاي والسياحة الطبية والصحة العامة.',
      filterContent: 'تصفية المحتوى',
      searchPlaceholder: 'ابحث عن مقالات...',
      search: 'بحث',
      clearFilters: 'مسح عوامل التصفية',
      categories: 'التصنيفات',
      popularTags: 'الوسوم الشائعة',
      noArticles: 'لا توجد مقالات تطابق معايير بحثك.',
      minRead: 'دقيقة قراءة',
      previous: 'السابق',
      next: 'التالي',
      home: 'الرئيسية',
      blogNav: 'المدونة',
      shareLabel: 'مشاركة:',
      previousArticle: 'المقال السابق',
      nextArticle: 'المقال التالي',
      toc: 'جدول المحتويات',
      tocHide: 'إخفاء',
      tocShow: 'عرض',
      subscribeTitle: 'الاشتراك في النشرة البريدية',
      subscribeDesc: 'احصل على أحدث النصائح الصحية والتحديثات في بريدك الإلكتروني.',
      emailPlaceholder: 'بريدك الإلكتروني',
      subscribe: 'اشترك',
      subscribed: '✓ تم الاشتراك بنجاح! شكراً لانضمامك إلى نشرتنا البريدية.',
      shareArticle: 'شارك هذا المقال',
      subscribeSuccessTitle: 'تم الاشتراك بنجاح!',
      subscribeSuccessDesc: 'شكراً لاشتراكك في نشرتنا البريدية. ستتلقى أحدث النصائح الصحية والتحديثات.',
      close: 'إغلاق',
      alertEmailRequired: 'يرجى إدخال بريدك الإلكتروني',
      alertSubscribeFail: 'فشل الاشتراك. يرجى المحاولة لاحقاً.',
      alertError: 'حدث خطأ. يرجى المحاولة لاحقاً.',
      pageHeaderTitle: 'مقالات صحية',
      pageHeaderSubtitle: 'اكتشف مقالات عن السياحة الطبية والخدمات الصحية ونصائح العافية في شنغهاي',
      relatedArticles: 'مقالات ذات صلة',
      recommendedHospitals: 'مستشفيات موصى بها',
      learnMore: 'اقرأ المزيد',
      insurancePartnersLabel: 'شركاء التأمين',
      bookTitle: 'احجز استشارة مجانية',
      bookDesc: 'منسقونا الطبيون جاهزون لمساعدتك في اختيار المستشفى وخيارات العلاج وترتيبات السفر.',
      whatsappConsult: 'استشارة عبر WhatsApp',
      requestQuote: 'اطلب عرض سعر',
    },

    // ── Medical Disclaimer (legal) ──
    medicalDisclaimer: {
      title: 'إخلاء مسؤولية طبية',
      lastUpdated: 'آخر تحديث: 12 أكتوبر 2026',
      warning: 'ShanghaiMed ليست مستشفى أو عيادة أو جهة طبية مقدمة للخدمة. نحن لا نقدم التشخيص الطبي أو العلاج أو الوصفات الطبية أو الاستشارات الطبية.',
      whatWeAre: {
        heading: 'من نحن',
        content: 'ShanghaiMed (تديرها شركة Shanghai Keling Information Technology Co., Ltd.) هي خدمة لتنسيق السفر الطبي وإرشاد المرضى. نساعد المرضى الدوليين على التخطيط للزيارات الطبية وإتمامها في المستشفيات العامة المرخصة ولدى الأخصائيين في شنغهاي بالصين. دورنا لوجستي ولغوي وإداري.',
      },
      whatWeDoNotDo: {
        heading: 'ما لا نقدمه',
        item1: 'نحن لا نُشخّص الحالات الطبية.',
        item2: 'نحن لا نصف الأدوية.',
        item3: 'نحن لا نُجري أو نُوجّه أي إجراءات أو علاجات طبية.',
        item4: 'نحن لا نضمن النتائج السريرية أو أوقات الانتظار أو نجاح أي علاج.',
        item5: 'نحن لا نُعدّ بديلاً عن الحكم المهني لطبيب مرخص.',
      },
      clinicalResponsibility: {
        heading: 'المسؤولية السريرية',
        content: 'تتخذ جميع القرارات السريرية — بما في ذلك التشخيص وخطط العلاج والوصفات الطبية والجراحة والفحوصات ودخول المستشفى — بشكل مستقل من قبل المستشفى المعالج وأطبائه المرخصين ضمن مسؤوليتهم المهنية الخاصة وتراخيصهم الطبية الصينية. يدفع المريض رسوم المستشفى والعلاج مباشرة إلى المستشفى وفق شروطها الخاصة.',
      },
      contentInformational: {
        heading: 'المحتوى لأغراض معلوماتية فقط',
        content: 'تُقدَّم المقالات وتقديرات التكاليف وملفات الأطباء ومعلومات التخصصات وغيرها من المحتويات على هذا الموقع لأغراض المعلومات العامة والتخطيط فقط، وهي ليست استشارة طبية. المعلومات الصحية تتغير بسرعة، وتختلف الحالات الفردية؛ اعتمد دائمًا على طبيبك المعالج في القرارات المتعلقة برعايتك.',
      },
      emergencies: {
        heading: 'حالات الطوارئ',
        content: 'في حالة طوارئ طبية، تواصل فورًا مع خدمات الطوارئ المحلية لديك. في البر الرئيسي للصين، اتصل بالرقم 120 لطلب سيارة إسعاف والرعاية الطبية الطارئة.',
      },
      noGuarantee: {
        heading: 'لا ضمان بشأن المستشفى أو الطبيب',
        content: 'نبذل جهودًا معقولة لمطابقة المرضى مع مستشفيات وأخصائيين مؤهلين بناءً على المعلومات المقدمة. ومع ذلك، تتغير جداول المستشفيات، ولا يمكن دائمًا ضمان طبيب بعينه، وتبقى قرارات العلاج النهائية بيد المستشفى.',
      },
      contact: {
        heading: 'تواصل معنا',
        company: 'Shanghai Keling Information Technology Co., Ltd.',
        address: 'الغرفة 101، الطابق الأول، رقم 2555 طريق تشانغيانغ، منطقة يانغبو، شنغهاي، الصين',
        email: 'hello@shanghaimedhealth.com',
      },
    },
  },
  // ── Russian (standard, CIS/Central Asia) ── UI strings only; medical/legal/price text falls back to en (YMYL) ──
  ru: {
    ...enTranslations,
    nav: {
      whyShanghai: 'Почему Шанхай',
      howItWorks: 'Как это работает',
      treatments: 'Лечение',
      careTeam: 'Команда сопровождения',
      trust: 'Доверие',
      items: ['Почему Шанхай', 'Как это работает', 'Сеть больниц', 'Команда сопровождения', 'Цены', 'Блог', 'Контакты'],
    },
    hero: {
      badge1: 'Больницы с международным страхованием',
      badge2: 'Медсёстры, говорящие на английском и китайском',
      badge3: 'Поддержка AI + человек 24/7',
      title: 'Здравоохранение в Шанхае',
      titleHighlight: 'Создано для вас',
      subtitle: 'Свяжитесь с лучшими больницами Китая, англо-китайскими медсёстрами и круглосуточной поддержкой AI — всё на одной платформе.',
      cta: 'Записаться на бесплатную консультацию',
    },
    careTeam: {
      title: 'Дипломированные медсёстры, говорящие на английском и китайском',
      subtitle: 'Персональные сопровождающие на каждом этапе вашего медицинского путешествия в Шанхае.',
      badge: 'Команда сопровождения',
      expertTeam: 'Команда экспертов',
      ispnCertified: 'Сертификация ISPN',
      ispnDesc: 'Международные стандарты профессиональных медсестёр',
      ispnIssuer: 'Сертифицировано CGFNS (США)',
      credentialsTitle: 'Квалификация медсестёр',
      servicesTitle: 'Наши услуги',
      nursingCare: 'Двуязычный сестринский уход',
      appointmentCoordination: 'Координация записи',
      translationServices: 'Услуги перевода',
      transportation: 'Организация транспорта',
      medicalReports: 'Перевод меддокументов',
      emergencySupport: 'Экстренная поддержка',
      services: [
        { title: 'Консультация перед лечением', description: 'Изучаем медицинские документы, разъясняем процедуры и координируем взаимодействие со специалистами больницы.' },
        { title: 'Запись на приёмы', description: 'Организуем консультации врачей, диагностические исследования и лечебные сессии.' },
        { title: 'Устный и письменный перевод', description: 'Медицинский перевод в режиме реального времени во время консультаций и процедур.' },
        { title: 'Сопровождение в больнице', description: 'Помогаем с госпитализацией, выпиской и процессом оплаты.' },
        { title: 'Поддержка при выписке', description: 'Инструкции по приёму лекарств, запись на повторные приёмы и перевод медицинских заключений.' },
        { title: 'Поддержка по страховке', description: 'Оказываем административную поддержку по проверке покрытия полиса и подтверждению страхового обслуживания в больнице.' },
      ],
      credentials: [
        { name: 'Лицензированные дипломированные медсёстры (RN)', detail: 'Проверено Комиссией здравоохранения Шанхая' },
        { name: 'Двуязычная сертификация (английский–китайский)', detail: 'Свободное владение английским и китайским языками' },
        { name: 'Сертификат JLPT N1', detail: '日本語能力試験 N1 — экзамен по японскому языку (высший уровень)' },
        { name: 'Медицинский перевод', detail: 'Поддержка перевода медицинских документов и устного перевода на месте' },
        { name: 'Обслуживание иностранных пациентов', detail: 'Более 10 лет опыта' },
      ],
    },
    pricing: {
      badge: 'Цены',
      eyebrow: 'Без скрытых платежей',
      title: 'Цены на услуги консьержа',
      subtitle: 'Единая прозрачная цена консьерж-услуг на человека. Медицинские расходы оплачиваются напрямую больницам по местным тарифам — мы не берём комиссий с клиник.',
      usdLabel: 'долл. США',
      whatsIncluded: 'Что включено',
      freeCard: {
        name: 'Бесплатная первичная консультация',
        subtitle: 'Поймите варианты лечения и бюджет до каких-либо обязательств.',
        badge: 'Бесплатно',
        unit: 'Бесплатно',
        scope: 'Поговорите с Сарой сначала — без обязательств и без оплаты.',
        items: [
          'Оценка медицинских потребностей',
          'Рекомендации по больницам и специалистам',
          'Реалистичная оценка бюджета',
          'Консультация по страховке',
        ],
        itemsLabel: 'Что вы получаете — 4 услуги',
        callout: '<strong>Только этап принятия решения.</strong> Бесплатный звонок помогает определить больницу, врача и бюджет. Очные услуги (сопровождение, запись, перевод) начинаются после бронирования почасового сопровождения или консьерж-пакета.',
        cta: 'Написать в WhatsApp →',
      },
      hourlyCard: {
        name: 'Почасовое сопровождение',
        subtitle: 'Для пациентов, которые уже самостоятельно записались к врачу.',
        badge: '',
        unit: 'за час · в дневное время',
        scope: 'Оплата по часам, доступно как отдельная услуга или как дополнение к любому пакету.',
        items: [
          'Сопровождающий на приёме в больнице',
          'Англо-китайский медицинский перевод на месте · другие языки за доплату',
          'Помощь на месте (очереди, оплата, получение лекарств)',
          'Контрольное сообщение в день визита',
        ],
        itemsLabel: 'Что включено — 4 услуги',
        callout: '<strong>Границы услуги.</strong> Почасовое сопровождение — это только присутствие сопровождающего и перевод на месте. Услуга <strong>не включает</strong> предварительную запись к врачу, подбор специалиста, трансфер из аэропорта, перевод медицинских документов, визовую поддержку, пред-авторизацию по страховке, перевод на языки, кроме английского, или последующее наблюдение — всё это покрывается консьерж-пакетами.',
        cta: 'Забронировать почасовое сопровождение →',
      },
      checkupCard: { subtitle: 'Выделенный сопровождающий на весь однодневный визит.' },
      essentialCard: { subtitle: 'Полная координация приёмов, перевода, страховки и логистики.' },
      surgeryCard: { subtitle: 'Выделенная поддержка до, во время и после операции.' },
      essentialBadge: 'Чаще всего выбирают',
      packages: [
        {
          name: 'Консьерж для чек-апа',
          unit: 'на человека · 1 день (в дневное время)',
          description: 'Только для однодневных программ чек-апа',
          itemsLabel: 'Что включено — 13 услуг',
          allItems: [
            '1 день очного сопровождения медсестры (в дневное время)',
            'Встреча и проводы в аэропорту',
            'Помощь с координацией отеля',
            'Англо-китайский медицинский перевод на месте',
            'Перевод отчёта чек-апа и разъяснение результатов',
            'Предварительная запись на приём',
            'Получение и доставка лекарств',
            'Подбор больницы и специалиста',
            'Транспорт, навигация и помощь с оплатой',
            'Выделенная поддержка в WhatsApp на всё время пребывания',
            'Помощь с визовым приглашением',
            '30 дней удалённого сопровождения после визита',
            'Страховая поддержка · пред-авторизация',
          ],
        },
        {
          name: 'Консьерж «Базовый уход»',
          unit: 'на человека · 3 дня (в дневное время)',
          description: 'Обязателен для всех консультаций специалистов и медицинских состояний',
          itemsLabel: 'Что включено — 13 услуг',
          allItems: [
            '3 дня очного сопровождения медсестры (в дневное время)',
            'Встреча и проводы в аэропорту',
            'Помощь с координацией отеля',
            'Англо-китайский медицинский перевод на всех приёмах',
            'Перевод и резюме медицинских документов',
            'Запись ко всем врачам',
            'Получение и доставка лекарств',
            'Подбор больницы и специалиста',
            'Транспорт, навигация и помощь с оплатой',
            'Выделенная поддержка в WhatsApp на всё время пребывания',
            'Помощь с визовым приглашением',
            '30 дней удалённого сопровождения после лечения',
            'Страховая поддержка · пред-авторизация',
          ],
        },
        {
          name: 'Консьерж «Хирургия и расширенный уход»',
          unit: 'на человека · 5 дней (в дневное время)',
          description: 'Обязателен для операций и стационарного лечения',
          itemsLabel: 'Что включено — 16 услуг',
          allItems: [
            '5 дней очного сопровождения медсестры (в дневное время) · до, в день и после операции',
            'Встреча и проводы в аэропорту',
            'Координация отеля и длительного проживания',
            'Англо-китайский медицинский перевод на всех приёмах (включая день операции)',
            'Полный перевод медицинских документов и хирургическое резюме',
            'Запись к хирургу и предгоспитальная координация',
            'Предоперационная подготовка и координация госпитализации',
            'Получение и доставка лекарств и послеоперационных назначений',
            'Подбор больницы и хирурга',
            'Посещения в стационаре во время госпитализации',
            'Транспорт, навигация и помощь с оплатой/биллингом',
            'Выделенная поддержка в WhatsApp на всё время пребывания',
            'Помощь с приглашением на медицинскую визу',
            'Связь с семьёй и обновления о ходе лечения',
            '60 дней удалённого сопровождения после лечения',
            'Страховая поддержка · пред-авторизация и координация хирургического депозита',
          ],
        },
      ],
      faqTitle: 'Часто задаваемые вопросы о ценах и услугах',
      faqSub: 'Всё, что нужно знать перед бронированием.',
      viewAllFaq: 'Посмотреть полный FAQ',
      faqLinkDesc: 'Цены, страховка, визы, оплата и медицинское обслуживание — ответы на десятки вопросов',
      faqItems: [
        { q: 'Действительно ли первичная консультация бесплатна? Что она покрывает?', a: 'Да — первичная консультация с Сарой в WhatsApp полностью бесплатна и ни к чему не обязывает. На звонке мы оценим ваши медицинские потребности, порекомендуем подходящие больницы и специалистов, дадим реалистичную оценку бюджета на лечение и объясним, как работает страховка. Это разговор на этапе принятия решения; очные услуги (сопровождение медсестры, запись на приём, устный перевод) начинаются после бронирования почасового сопровождения или консьерж-пакета.' },
        { q: 'Можно ли заказать только почасовое сопровождение без полного пакета?', a: 'Да. Почасовое сопровождение стоит 50 долл./час и доступно как отдельная услуга, а также как дополнение к любому пакету, если вам нужно дополнительное время на приёме. Оно подходит пациентам, которые уже самостоятельно записались к врачу и нуждаются только в англоязычном сопровождающем для помощи с очередями, оплатой, получением лекарств и базовыми вопросами на месте. Перевод осуществляется только с английского на китайский; другие языки требуют дополнительного переводчика за отдельную плату. Почасовое сопровождение не включает запись к врачам, подбор специалиста, трансфер, перевод документов, визовую поддержку, пред-авторизацию по страховке или последующее наблюдение — всё это покрывается консьерж-пакетами.' },
        { q: 'Что включено в пакет «Базовый уход» за $1,000?', a: '<strong>Консьерж «Базовый уход» включает 3 полных дневных дня сопровождения</strong>: предварительный обзор медицинских документов, подбор врача, запись на несколько приёмов, англо-китайский перевод на каждом приёме, навигация в больнице, встреча и проводы в аэропорту на стандартном седане (специальные транспортные средства — за доплату), перевод медицинских отчётов, получение и доставка лекарств, выделенная поддержка в WhatsApp на всё время пребывания, страховая поддержка включая проверку покрытия и письма пред-авторизации, и 30 дней удалённого сопровождения после лечения. Этот пакет обязателен для всех консультаций специалистов и любых медицинских состояний.' },
        { q: 'Работает ли международная страховка в шанхайских больницах?', a: 'Крупные международные отделения и больницы категории 3А в Шанхае принимают многие международные страховые планы, включая Cigna, AXA, Allianz, MSH и Bupa. Мы предоставляем страховую поддержку — включая проверку покрытия и получение писем пред-авторизации. Там, где доступно прямое урегулирование, мы координируем его с больницей; в остальных случаях вы оплачиваете больницу напрямую и получаете возмещение от страховой с нашей документарной поддержкой.' },
        { q: 'Включает ли стоимость консьерж-услуг медицинские расходы?', a: 'Нет. ShanghaiMed взимает независимую плату за координацию и сопровождение. Медицинские расходы — консультации врачей, анализы, лекарства, процедуры и пакеты чек-апа (от примерно 700 долл.) — оплачиваются напрямую больнице или клинике по местным тарифам. Мы не берём комиссий с больниц; цена консьерж-услуг указывается заранее и не содержит скрытых платежей.' },
        { q: 'Как организована экстренная и ночная медицинская помощь?', a: 'Экстренная помощь доступна круглосуточно (24/7). Срочный вызов стоит 300 долл. (включает первые 4 часа), далее — 100 долл./час, независимо от времени суток. При угрожающем жизни состоянии немедленно звоните 120 и обращайтесь в ближайшую больницу; скорая помощь в Китае работает на китайском языке — мы можем координировать связь с больницей сразу после вашего звонка.' },
        { q: 'Что если мне нужен перевод на язык, кроме английского и японского?', a: 'Перевод на английский и японский включён во все пакеты. Для других языков (арабский, русский, монгольский, корейский, французский и т.д.) мы нанимаем дополнительного переводчика по рыночным тарифам Шанхая, которые зависят от редкости языка и требований к медицинской терминологии. Сообщите Саре нужный язык при консультации, и она назовёт точную стоимость перед бронированием.' },
        { q: 'Какова политика отмены и возврата?', a: 'Отмена более чем за 14 дней до приезда — полный возврат за вычетом небольшого административного сбора. При отмене в течение 14 дней до приезда возвращается часть суммы в зависимости от уже понесённых расходов (предварительная запись к врачам, перевод документов). Неявка или отмена в день приезда не подлежат возврату. Экстренные медицинские ситуации, отказ в визе и другие форс-мажорные случаи рассматриваются индивидуально.' },
        { q: 'Могу ли я приехать с семьёй или привезти своего переводчика?', a: 'Конечно. Сопровождение членов семьи и возможность использовать собственного переводчика не требуют дополнительной оплаты. Наша медсестра координирует медицинскую часть независимо от размера группы. Единственное исключение: если для вашей группы требуется автомобиль большего размера (например, минивэн для 4+ человек), разница в стоимости транспорта покрывается дополнительно.' },
      ],
      refundPolicy: 'Политика возврата',
      medicalDisclaimer: 'Медицинский дисклеймер',
      independentDisclaimer: 'ShanghaiMed — независимый поставщик консьерж-услуг; мы не занимаемся медицинской практикой и наши медсёстры не заменяют лечащих врачей.',
    },
    freeConsultation: {
      badge: 'Бесплатная консультация',
      title: 'Запишитесь на бесплатную медицинскую консультацию',
      subtitle: 'Поговорите с нашей медицинской командой до поездки — мы подберём подходящих специалистов, спланируем вашу медицинскую поездку под ваши нужды и предоставим прозрачную оценку стоимости заранее.',
      specialistMatchTitle: 'Подбор лучших специалистов',
      specialistMatchDesc: 'Мы соединяем вас с ведущими профессорами и заведующими отделениями лучших шанхайских больниц категории 3A — подбираем специалиста именно под ваше конкретное заболевание.',
      specialistMatchPoints: [
        'Подбор специалиста под ваше конкретное состояние — не по умолчанию и не по принципу ближайшей больницы',
        'Связь с подходящими профессорами и заведующими отделениями в государственных больницах категории 3A по всему Шанхаю, исходя из вашего случая',
        'Приоритетный доступ к ведущим международным и частным больницам Шанхая; приём обычно удаётся назначить в короткие сроки',
        'Предварительное изучение медицинских документов до вашего приезда в Шанхай',
      ],
      badges: [
        { title: 'Оплата не требуется', desc: 'Бесплатная консультация, без предоплат и депозитов' },
        { title: 'Без обязательств покупки', desc: 'Общайтесь с нами без какого-либо давления — заказывать услуги не обязательно' },
        { title: 'Конфиденциально', desc: 'Ваша медицинская информация остаётся частной и не передаётся без согласия' },
      ],
      ctaTitle: 'Начать бесплатную консультацию',
      ctaDesc: 'Напишите нам в WhatsApp — медицинская команда ответит как можно быстрее, обычно в течение нескольких часов в рабочее время.',
      ctaButton: 'Написать в WhatsApp',
      hospitalNetworkTitle: 'Наша сеть больниц',
      hospitalNetworkDesc: 'Мы сотрудничаем с 14 государственными больницами категории 3A и 5 международными больницами в Шанхае. Помимо перечисленных партнёров, мы можем организовать запись во все государственные больницы высшей категории по всему Шанхаю.',
      publicHospitals: 'Государственные больницы категории 3A (14)',
      privateHospitals: 'Международные больницы (5)',
      beyondTitle: 'За пределами списка партнёров',
      beyondDesc: 'Если для вашего заболевания нужен специалист в другой шанхайской больнице высшей категории, не указанной в списке, — мы организуем запись. Сообщите о ваших медицинских потребностях, и мы подберём нужного специалиста.',
    },
    insights: {
      badge: 'Блог',
      title: 'Последние публикации',
      subtitle: 'Статьи о здравоохранении в Шанхае, медицинском туризме и благополучии.',
      readMore: 'Читать далее',
      viewAll: 'Все статьи',
      featured: '★ Избранное',
    },
    faq: {
      badge: 'Вопросы и ответы',
      title: 'Часто задаваемые вопросы',
      subtitle: 'Всё, что нужно знать о медицинском туризме в Шанхае.',
      items: [
        { question: 'Как начать процесс медицинского путешествия?', answer: 'Просто заполните контактную форму, указав ваше состояние и пожелания. Наша команда ответит в течение 24 часов с рекомендациями больниц и ориентировочной стоимостью.' },
        { question: 'Помогаете ли вы с оформлением визы?', answer: 'Да, мы предоставляем визовую поддержку для лечения. Для граждан подходящих стран мы также помогаем оформить безвизовый транзит на 240 часов для въезда в Шанхай.' },
        { question: 'Что если я не говорю по-китайски?', answer: 'Все наши медсёстры-координаторы обеспечивают устный перевод в реальном времени во время медицинских консультаций. Медицинские заключения могут быть предоставлены на английском или предпочитаемом вами языке.' },
        { question: 'Как работает оплата?', answer: 'Вы оплачиваете напрямую больнице. Для владельцев страховки мы помогаем с процессом прямого урегулирования счетов.' },
        { question: 'На каких видах лечения вы специализируетесь?', answer: 'Мы поддерживаем широкий спектр медицинских потребностей — от профилактических осмотров и консультаций специалистов до комплексной медицинской помощи. Потребности каждого пациента индивидуальны. Мы помогаем подобрать наиболее подходящую больницу, специалиста и схему лечения для вашей ситуации.' },
      ],
      stillTitle: 'Остались вопросы?',
      whatsappCta: 'Связаться через WhatsApp',
      viewAll: 'Посмотреть полный FAQ',
      viewAllDesc: 'Все ответы о ценах, страховке, визах, оплате и медицинском обслуживании — более десятка частых вопросов.',
      browseFaq: 'Все вопросы',
      whatsappDesc: 'Напишите напрямую медсестре-координатору. Получите персональные ответы на английском, японском или арабском.',
    },
    contact: {
      title: 'Начните медицинское путешествие сегодня',
      subtitle: 'Получите бесплатную консультацию нашей медицинской команды. AI-навигатор отвечает мгновенно. Координатор свяжется в течение 24 часов.',
      cta: 'Начните медицинское путешествие сегодня',
      badge: 'Контакты',
      whatsappTitle: 'WhatsApp',
      whatsappDesc: 'AI-навигатор 24/7 + ответ человека в течение 24ч',
      whatsapp: 'Написать в WhatsApp',
      lineTitle: 'LINE',
      lineDesc: 'Общайтесь напрямую с координатором',
      lineButton: 'Написать в LINE',
      lineIdLabel: 'LINE ID',
      lineId: 'sara_shanghaimed',
      lineScanHint: 'Отсканируйте QR-код, чтобы добавить нас в LINE',
      lineQrAlt: 'LINE QR-код',
      locationLabel: 'Местоположение',
      locationValue: 'Шанхай, Китайская Народная Республика',
      responseLabel: 'Время ответа',
      responseValue: 'AI: мгновенно | Человек: в течение 24 часов',
      emailLabel: 'Электронная почта',
      nameLabel: 'Полное имя *',
      namePlaceholder: 'Ваше полное имя',
      emailLabel2: 'Электронная почта *',
      emailPlaceholder: 'your@email.com',
      countryLabel: 'Страна *',
      countryPlaceholder: 'Выберите страну *',
      otherCountry: 'Другая',
      otherCountryPlaceholder: 'Укажите вашу страну *',
      countries: {
        'United States': 'США',
        'United Kingdom': 'Великобритания',
        'Canada': 'Канада',
        'Australia': 'Австралия',
        'Japan': 'Япония',
        'South Korea': 'Южная Корея',
        'Singapore': 'Сингапур',
        'Germany': 'Германия',
        'France': 'Франция',
      },
      phoneLabel: 'Телефон / WhatsApp',
      phonePlaceholder: 'Телефон / WhatsApp (необязательно)',
      medicalNeedsLabel: 'Медицинские потребности *',
      medicalNeedsPlaceholder: 'Выберите вашу медицинскую потребность',
      medicalNeeds: {
        consultation: 'Медицинская консультация',
        cardiology: 'Кардиология',
        neurology: 'Неврология',
        oncology: 'Онкология',
        orthopedics: 'Ортопедия',
        checkup: 'Медосмотр',
        dental: 'Стоматология',
        plastic: 'Пластическая хирургия',
        other: 'Другое',
      },
      messageLabel: 'Ваше сообщение',
      messagePlaceholder: 'Опишите ваше медицинское состояние или вопрос...',
      submit: 'Получить бесплатную консультацию',
      submitting: 'Отправка...',
      successTitle: 'Спасибо!',
      successMessage: 'Спасибо! Наш AI-навигатор получил ваш запрос, и команда свяжется с вами в течение 24 часов. Вы также можете написать нам в WhatsApp — мы ответим как можно скорее.',
      sendAnother: 'Отправить ещё одно сообщение',
      privacyNote: 'Отправляя эту форму, вы соглашаетесь с Политикой конфиденциальности и даёте согласие на связь regarding наших медицинских услуг.',
      alertFail: 'Не удалось отправить сообщение. Попробуйте ещё раз или свяжитесь через WhatsApp.',
    },
    footer: {
      tagline: 'Связываем международных пациентов с ведущими медицинскими учреждениями Шанхая и двуязычными медицинскими специалистами.',
      columns: [
        {
          title: 'О компании',
          links: ['О нас', 'Основатель', 'Почему Шанхай', 'Наша сеть', 'Команда сопровождения'],
        },
        {
          title: 'Лечение',
          links: ['Больницы', 'Специализации', 'Гид по ценам'],
        },
        {
          title: 'Поддержка',
          links: ['Как это работает', 'Вопросы и ответы', 'Библиотека исследований', 'Глоссарий', 'Контакты', 'Поддержка WhatsApp'],
        },
        {
          title: 'Правовая информация',
          links: ['Политика конфиденциальности', 'Условия использования', 'Политика возврата средств', 'Редакционная политика', 'Медицинский отказ от ответственности'],
        },
      ],
      rights: 'Все права защищены.',
      location: 'Шанхай, Китай',
    },
    agentChat: {
      welcome: 'Здравствуйте! Я Navi, ваш медицинский навигатор. Спрашивайте о больницах, лечении, стоимости, визах или планировании медицинского путешествия в Шанхай.',
      questions: [
        'Что включает ваша персональная услуга?',
        'Как записаться на приём?',
        'Какова стоимость индивидуального обслуживания?',
      ],
      inputPlaceholder: 'Спросите о здравоохранении в Шанхае...',
      chatTitle: 'Navi · Медицинский навигатор',
      chatSubtitle: 'Круглосуточный AI-ассистент',
    },
    pages: {
      treatmentsTitle: 'Лечение и больницы',
      treatmentsSubtitle: 'Доступ к лучшим медицинским учреждениям Шанхая по всем специальностям.',
      contactTitle: 'Связаться с нами',
      contactSubtitle: 'Начните ваше медицинское путешествие сегодня. Наша команда готова помочь 24/7.',
      patientStoriesTitle: 'Истории пациентов',
      patientStoriesSubtitle: 'Реальные истории пациентов, доверивших нам своё здоровье.',
      whyShanghaiTitle: 'Почему Шанхай?',
      whyShanghaiSubtitle: 'Шанхай стал ведущим направлением для международных пациентов, ищущих мировую медицину по доступным ценам.',
      careTeamTitle: 'Наша команда сопровождения',
      careTeamSubtitle: 'Сертифицированные ISPN медсёстры со знанием английского и китайского, посвящённые вашему здоровью и комфорту.',
      howItWorksTitle: 'Как это работает',
      howItWorksSubtitle: 'Наш упрощённый процесс делает доступ к мировой медицине в Шанхае простым.',
      faqTitle: 'Часто задаваемые вопросы',
      faqSubtitle: 'Всё, что нужно знать о получении медицинской помощи в Шанхае — стоимость, качество больниц, визы, страховка и двуязычная поддержка.',
    },
    whyShanghai: {
      badge: 'Почему Шанхай',
      title: 'Медицинское обслуживание мирового уровня — просто и доступно для иностранных пациентов',
      subtitle: 'Шанхай предлагает доступ к ведущим больницам, опытным специалистам, прозрачным ценам и индивидуальной поддержке для иностранных пациентов.',
      stats: [
        { label: 'Ежегодные визиты иностранных пациентов в Шанхай' },
        { label: 'Пилотные программы медицинского туризма класса А' },
        { label: 'Представленные национальности' },
        { label: 'Рост год к году' },
      ],
      healthSystem: {
        title: 'Признанная на международном уровне система здравоохранения',
        items: [
          'Ведущие больницы, обслуживающие пациентов со всего мира',
          'Специализированные международные отделения с обслуживанием на английском языке',
          'Государственные больницы класса А, назначаемые для международных медицинских услуг',
          'Доступ к специалистам в области онкологии, кардиологии, неврологии, ортопедии, лечения бесплодия и других направлений',
        ],
      },
      travelAccess: {
        title: 'Удобные поездки и медицинское обслуживание',
        items: [
          'Безвизовый транзит до 240 часов для путешественников из многих стран',
          'Поддержка медицинской визы для длительного лечения',
          'Встреча в аэропорту и транспортное сопровождение',
          'Сопровождение на всех этапах вашего медицинского путешествия',
        ],
      },
      pricing: {
        title: 'Высококачественная медицина по конкурентоспособным ценам',
        subtitleLine1: 'Многие пациенты из США несут значительные личные расходы на здравоохранение, даже имея страховку.',
        subtitleLine2: 'Цифры отражают типичные расходы и могут варьироваться в зависимости от медицинского учреждения, региона, страхового покрытия и плана лечения.',
        tableService: 'Услуга',
        tableShanghai: 'Шанхай',
        tableUs: 'Типичная стоимость в США',
        rows: [
          { service: 'Комплексный медицинский осмотр', shanghai: 'От $700', us: 'От $2,500' },
          { service: 'МРТ', shanghai: 'От $300', us: 'От $1,000' },
          { service: 'КТ', shanghai: 'От $150', us: 'От $500' },
          { service: 'Консультация специалиста', shanghai: 'От $70', us: 'От $250' },
          { service: 'ЭКО', shanghai: 'От $4,200', us: 'От $15,000' },
          { service: 'Зубной имплант', shanghai: 'От $800', us: 'От $3,000' },
        ],
        valueTitle: 'Почему пациенты находят ценность в Шанхае',
        valueItems: [
          'Доступ к ведущим больницам и специалистам',
          'Прозрачное ценообразование до начала лечения',
          'Более быстрый доступ к консультациям, обследованиям и лечению',
          'Более низкие личные расходы на здравоохранение',
          'Индивидуальная двуязычная поддержка на протяжении всего пути пациента',
        ],
        notesTitle: 'Важные примечания',
        notes: [
          'Цены приведены исключительно в иллюстративных целях и не являются коммерческим предложением.',
          'Фактические медицинские расходы определяются больницей, врачом и планом лечения.',
          'Стоимость в США отражает типичные расходы без страховки и может существенно варьироваться в зависимости от страхового покрытия и региона.',
          'Курс валют приведён для справки и может колебаться.',
          'Сложное лечение, хирургические операции, онкологическая помощь и стационарные услуги требуют индивидуального расчёта после медицинской оценки.',
        ],
      },
    },

    howItWorks: {
      title: 'Пять простых шагов',
      subtitle: 'От первого обращения до наблюдения после лечения мы поддерживаем вас на каждом этапе вашего медицинского путешествия в Шанхае.',
      badge: 'Как это работает',
      simpleProcess: 'Простой процесс',
      step1Title: 'AI-консультация',
      step1Desc: 'Наш AI-навигатор мгновенно отвечает, чтобы понять ваши потребности.',
      step2Title: 'Назначение команды сопровождения',
      step2Desc: 'Опытная медсестра назначается вашим координатором по уходу.',
      step3Title: 'Прибытие в Шанхай',
      step3Desc: 'Полная поддержка, включая трансфер из аэропорта и бронирование отеля.',
      step4Title: 'Лечение и восстановление',
      step4Desc: 'Бесшовная интеграция специализированного лечения, англо-китайской поддержки и наблюдения после лечения.',
      steps: [
        { title: 'Отправить запрос', description: 'Заполните контактную форму с описанием ваших медицинских потребностей. Наш AI-навигатор доступен 24/7.' },
        { title: 'Получить консультацию', description: 'В течение 24 часов координатор-человек предоставит варианты больниц и оценку стоимости.' },
        { title: 'Подтвердить и прилететь', description: 'Когда вы будете готовы, мы согласуем приёмы, логистику поездки и поддержку по прибытии.' },
        { title: 'Получить помощь', description: 'Ваша англо-китайская медсестра оказывает личное сопровождение на консультациях, обследованиях и во время лечения.' },
        { title: 'Наблюдение после лечения', description: 'Мы помогаем с медицинскими документами, повторными приёмами, координацией рецептов и удалёнными консультациями.' },
      ],
    },

    treatments: {
      title: 'Ведущие больницы Шанхая',
      subtitle: 'Доступ к ведущим больницам Шанхая с рекомендациями, подобранными под ваши медицинские потребности.',
      hospitalNetwork: 'Сеть больниц',
      publicHospitals: 'Государственные больницы первого уровня',
      privateHospitals: 'Частные международные больницы',
      viewAll: 'Все больницы',
      keyDepartments: 'Ключевые отделения',
      certifications: 'Международные сертификаты',
      insurance: 'Страхование:',
      all: 'Все',
      modalAllHospitals: 'Все больницы',
      modalHospitalsAvailable: 'больниц доступно',
      modalAllGradeA: 'доступ ко всем государственным больницам класса 3А Шанхая',
      modalAll: 'Все больницы',
      modalPublicGradeA: 'Государственные класса А',
      modalInternationalPrivate: 'Международные частные',
      modalIns: 'Страх.:',
      featuredTitle: 'Проверенные больницы',
      featuredSubtitle: 'Ведущие государственные больницы Китая со специализированными международными отделениями',
      learnMore: 'Подробнее',
    },

    trust: {
      badge: 'Почему выбирают нас',
      title: 'Ваш надёжный партнёр в медицинском путешествии',
      subtitle: 'Мы предоставляем профессиональные, прозрачные и надёжные услуги медицинского путешествия в Шанхае. Вот что отличает нас.',
      ctaText: 'Готовы испытать профессиональные услуги медицинского путешествия?',
      ctaButton: 'Начать медицинское путешествие',
    },

    testimonials: {
      badge: 'Отзывы пациентов',
      title: 'Что говорят наши пациенты',
      subtitle: 'Реальные истории пациентов, которые изменили своё здоровье вместе с нами.',
      patientsServed: 'Обслужено пациентов',
      countries: 'Стран',
      satisfactionRate: 'Уровень удовлетворённости',
      totalSavings: 'Общая экономия',
      saved: 'Сэкономлено',
    },

    processFlow: {
      badge: 'Ваш путь',
      title: 'От запроса до помощи',
      subtitle: 'Полная хронология вашего опыта медицинского путешествия в Шанхае с профессиональной поддержкой на каждом этапе.',
      phases: [
        {
          phase: 'До вашего приезда',
          steps: [
            { title: 'Онлайн-запрос', description: 'AI-навигатор мгновенно отвечает' },
            { title: 'Медицинская оценка', description: 'Сбор симптомов, рекомендации по больницам' },
            { title: 'Оценка стоимости', description: 'Прозрачные цены на консультацию и базовые анализы' },
            { title: 'Виза и перелёт', description: 'Информация о безвизовом/240-часовом транзите, советы по поездке' },
          ],
        },
        {
          phase: 'Во время визита',
          steps: [
            { title: 'Встреча в аэропорту', description: 'Вас встречает англо-китайская медсестра' },
            { title: 'Посещение больницы', description: 'Консультации и обследования с сопровождением медсестры' },
            { title: 'Лечение', description: 'Помощь мирового уровня в ведущих больницах' },
            { title: 'Стационарное лечение', description: 'Индивидуальный сестринский уход (при необходимости)' },
          ],
        },
        {
          phase: 'После визита',
          steps: [
            { title: 'Выписка и перевод', description: 'Медицинские заключения на английском языке' },
            { title: 'Сопровождение', description: 'Удалённая поддержка, координация рецептов' },
          ],
        },
      ],
    },

    blog: {
      title: 'Блог',
      subtitle: 'Статьи о здравоохранении в Шанхае, медицинском путешествии и благополучии.',
      filterContent: 'Фильтр по содержанию',
      searchPlaceholder: 'Поиск статей...',
      search: 'Поиск',
      clearFilters: 'Очистить фильтры',
      categories: 'Категории',
      popularTags: 'Популярные теги',
      noArticles: 'Статьи по вашим критериям не найдены.',
      minRead: 'мин чтения',
      previous: 'Предыдущая',
      next: 'Следующая',
      home: 'Главная',
      blogNav: 'Блог',
      shareLabel: 'Поделиться:',
      previousArticle: 'Предыдущая статья',
      nextArticle: 'Следующая статья',
      toc: 'Содержание',
      tocHide: 'Скрыть',
      tocShow: 'Показать',
      subscribeTitle: 'Подписаться на рассылку',
      subscribeDesc: 'Получайте последние советы по здоровью и обновления на свою почту.',
      emailPlaceholder: 'Ваша почта',
      subscribe: 'Подписаться',
      subscribed: '✓ Успешная подписка! Спасибо, что присоединились к нашей рассылке.',
      shareArticle: 'Поделиться этой статьёй',
      subscribeSuccessTitle: 'Подписка оформлена!',
      subscribeSuccessDesc: 'Спасибо за подписку на нашу рассылку. Вы будете получать последние советы по здоровью и обновления.',
      close: 'Закрыть',
      alertEmailRequired: 'Пожалуйста, введите ваш email',
      alertSubscribeFail: 'Не удалось оформить подписку. Попробуйте позже.',
      alertError: 'Произошла ошибка. Попробуйте позже.',
      pageHeaderTitle: 'Статьи о здоровье',
      pageHeaderSubtitle: 'Статьи о медицинском путешествии, медицинских услугах и советах по здоровью в Шанхае',
      relatedArticles: 'Похожие статьи',
      recommendedHospitals: 'Рекомендуемые больницы',
      learnMore: 'Подробнее',
      insurancePartnersLabel: 'Страховые партнёры',
      bookTitle: 'Записаться на бесплатную консультацию',
      bookDesc: 'Наши медицинские координаторы готовы помочь вам с выбором больницы, вариантами лечения и организацией поездки.',
      whatsappConsult: 'Консультация в WhatsApp',
      requestQuote: 'Запросить расчёт стоимости',
      categoryNames: {
        'health-checkups': 'Медицинские осмотры',
        'preventive-healthcare': 'Профилактическая медицина',
        'medical-tourism': 'Медицинское путешествие',
        'traditional-chinese-medicine': 'Традиционная китайская медицина',
        'shanghai-hospitals': 'Больницы Шанхая',
        'expat-healthcare': 'Медицина для экспатов',
        'patient-stories': 'Истории пациентов',
        'health-guides': 'Медицинские гиды',
      },
    },

    medicalDisclaimer: {
      title: 'Медицинский отказ от ответственности',
      lastUpdated: 'Последнее обновление: 12 октября 2026 г.',
      warning: 'ShanghaiMed не является больницей, клиникой или медицинским учреждением. Мы не предоставляем медицинскую диагностику, лечение, рецепты или медицинские консультации.',
      whatWeAre: {
        heading: 'Кем мы являемся',
        content: 'ShanghaiMed (управляется компанией Shanghai Keling Information Technology Co., Ltd.) — это служба координации медицинских поездок и навигации для пациентов. Мы помогаем международным пациентам планировать и организовывать медицинские визиты в лицензированные государственные больницы и к специалистам в Шанхае, Китай. Наша роль — логистическая, языковая и административная.',
      },
      whatWeDoNotDo: {
        heading: 'Чего мы не делаем',
        item1: 'Мы не ставим медицинские диагнозы.',
        item2: 'Мы не выписываем рецепты на лекарства.',
        item3: 'Мы не проводим и не направляем медицинские процедуры или лечение.',
        item4: 'Мы не гарантируем клинические результаты, сроки ожидания или успех какого-либо лечения.',
        item5: 'Мы не заменяем профессиональное суждение лицензированного врача.',
      },
      clinicalResponsibility: {
        heading: 'Клиническая ответственность',
        content: 'Все клинические решения — включая диагностику, планы лечения, рецепты, хирургические вмешательства, обследования и госпитализацию — принимаются лечащей больницей и её лицензированными врачами самостоятельно, под их собственную профессиональную ответственность и в соответствии с китайскими медицинскими лицензиями. Плата за больницу и лечение вносится пациентом напрямую больнице на её собственных условиях.',
      },
      contentInformational: {
        heading: 'Контент носит исключительно информационный характер',
        content: 'Статьи, оценки стоимости, профили врачей, информация о специализациях и другой контент на этом сайте предоставляются исключительно для общих информационных целей и планирования. Они не являются медицинской консультацией. Медицинская информация быстро меняется, а отдельные случаи различаются; всегда полагайтесь на вашего лечащего врача при принятии решений о вашем лечении.',
      },
      emergencies: {
        heading: 'Неотложные ситуации',
        content: 'В случае неотложной медицинской ситуации немедленно обратитесь в местные экстренные службы. В материковом Китае наберите 120 для вызова скорой помощи и неотложной медицинской помощи.',
      },
      noGuarantee: {
        heading: 'Отсутствие гарантии конкретной больницы или врача',
        content: 'Мы прилагаем разумные усилия, чтобы подобрать пациентам квалифицированные больницы и специалистов на основе предоставленной информации. Однако расписания больниц меняются, конкретный врач не всегда может быть гарантирован, и окончательные решения о лечении остаются за больницей.',
      },
      contact: {
        heading: 'Контакты',
        company: 'Shanghai Keling Information Technology Co., Ltd.',
        address: 'Китай, Шанхай, район Янпу, ул. Чанъян, д. 2555, 1-й этаж, офис 101',
        email: 'hello@shanghaimedhealth.com',
      },
    },
    hospitals: {
      huashan: {
        description: 'Занимает первое место в стране по дерматологии и нейрохирургии. Одна из наиболее признанных на международном уровне больниц Китая.',
        specialties: ['Нейрохирургия', 'Дерматология', 'Инфекционные заболевания'],
        internationalFeatures: 'Специализированное международное отделение, принимается 24 страховых партнёра',
        insuranceStatus: 'Прямое урегулирование счетов',
      },
      'children-fudan': {
        description: 'Ведущий центр неонатальной помощи и редких детских заболеваний.',
        specialties: ['Неонатология', 'Детская хирургия', 'Реаниматология и интенсивная терапия'],
        internationalFeatures: 'Международное педиатрическое отделение работает с 1993 года, принимается 19 страховых партнёров',
        insuranceStatus: 'Прямое урегулирование счетов',
      },
      ruijin: {
        description: 'Пионер трансплантации костного мозга и CAR-T-терапии с результатами мирового уровня.',
        specialties: ['Гематология', 'Эндокринология', 'Ожоговая хирургия и лечение ран'],
        internationalFeatures: 'Частота ремиссии после CAR-T — 95,7%, специализированное международное отделение, принимается 21 страховой партнёр',
        insuranceStatus: 'Прямое урегулирование счетов',
      },
      'shanghai-general': {
        description: 'Одна из старейших и наиболее авторитетных больниц Шанхая. Ведущие отделения офтальмологии и урологии.',
        specialties: ['Офтальмология', 'Урология', 'Оториноларингология и хирургия головы и шеи'],
        internationalFeatures: 'Международный пациентский центр с многоязычным персоналом, принимается 17 страховых партнёров',
        insuranceStatus: 'Международное страхование',
      },
      zhongshan: {
        description: 'При университете Фудань. Кардиологический центр с отдельным международным корпусом и англоговорящим персоналом.',
        specialties: ['Общая хирургия', 'Гастроэнтерология', 'Кардиология'],
        internationalFeatures: 'Отдельный международный пациентский корпус, принимается 19 страховых партнёров',
        insuranceStatus: 'Международное страхование',
      },
      renji: {
        description: 'При Шанхайском университете транспорта. №1 в стране по гастроэнтерологии 4 года подряд. Ведущий центр трансплантации печени.',
        specialties: ['Гастроэнтерология', 'Репродуктивная медицина', 'Ревматология'],
        internationalFeatures: 'Международный центр репродуктивной медицины, принимается 20 страховых партнёров',
        insuranceStatus: 'Международное страхование',
      },
      longhua: {
        description: 'Ведущая больница традиционной китайской медицины. Официальный пилотный центр медицинского туризма ТКМ. Иглоукалывание, фитотерапия и реабилитация ТКМ.',
        specialties: ['Онкология ТКМ', 'Ортопедия ТКМ', 'Хирургия ТКМ'],
        internationalFeatures: 'Официальная пилотная больница медицинского туризма ТКМ, принимается 18 страховых партнёров',
        insuranceStatus: 'Международное страхование',
      },
      ipmch: {
        description: 'Под эгидой Китайского института благосостояния. Ведущий центр осложнённой беременности, фетальной медицины и репродуктивной медицины.',
        specialties: ['Репродуктивная медицина', 'Акушерство', 'Гинекология'],
        internationalFeatures: 'При Китайском институте благосостояния, международное акушерское сопровождение, принимается 19 страховых партнёров',
        insuranceStatus: 'Международное страхование',
      },
      scmc: {
        description: 'При Шанхайском университете транспорта. Ведущий в Китае центр детской кардиохирургии. Сотрудничество с Project HOPE.',
        specialties: ['Детская кардиохирургия', 'Детская гематология-онкология', 'Развивающая и поведенческая педиатрия'],
        internationalFeatures: 'Партнёрство с Project HOPE, международный педиатрический центр, принимается 23 страховых партнёра',
        insuranceStatus: 'Международное страхование',
      },
      sixth: {
        description: 'Пионер реплантации конечностей с 1963 года. Ведущий центр ортопедии и эндокринологии с международным признанием.',
        specialties: ['Ортопедия', 'Эндокринология и метаболизм', 'Спортивная медицина'],
        internationalFeatures: 'Первый в мире центр реплантации конечностей, принимается 18 страховых партнёров',
        insuranceStatus: 'Международное страхование',
      },
      'first-maternity': {
        description: 'Ведущий родильный дом Шанхая. Комплексное акушерское и неонатальное обслуживание с поддержкой международных пациентов.',
        specialties: ['Акушерство', 'Фетальная медицина', 'Репродуктивная медицина'],
        internationalFeatures: 'Специализированные международные услуги в акушерстве, принимается 18 страховых партнёров',
        insuranceStatus: 'Международное страхование',
      },
      xinhua: {
        description: 'Ведущий центр спинальной и детской хирургии с полным спектром международных услуг.',
        specialties: ['Педиатрия', 'Дерматология', 'Общая хирургия'],
        internationalFeatures: 'Комплексное международное отделение, принимается 16 страховых партнёров',
        insuranceStatus: 'Международное страхование',
      },
      huadong: {
        description: 'При университете Фудань. Ведущий центр гериатрии и реабилитации. Популярен по программам executive-чекапов.',
        specialties: ['Гериатрия', 'Реабилитационная медицина', 'Клиническая нутрициология'],
        internationalFeatures: 'Центр медосмотров для руководителей, международная реабилитация, принимается 17 страховых партнёров',
        insuranceStatus: 'Международное страхование',
      },
      ninth: {
        description: 'Больница №1 в Китае по стоматологии. В январе 2024 года в Пудунском кампусе открыто Международное отделение на 100+ стоматологических установок с КБКТ, микроскопами и лазерным оборудованием. Постоянный международный специалист по имплантологии проф. Тонетти. MDT-механизм для сложных случаев. Лечили пациентов из 40+ стран.',
        specialties: ['Челюстно-лицевая и стоматологическая хирургия №1', 'Пластическая и реконструктивная хирургия', 'Челюстно-лицевая хирургия'],
        internationalFeatures: 'Ведущая стоматологическая больница, 5 академиков. Занимает первое место в стране по челюстно-лицевой и пластической хирургии.',
        insuranceStatus: 'Прямое урегулирование счетов (8 страховых, 21 партнёрство)',
      },
      jiahui: {
        description: 'Крупнейшая частная международная больница Шанхая на 500 коек. Партнёрство с Massachusetts General Hospital. Многопрофильный медицинский центр.',
        specialties: ['Онкология', 'Хирургия', 'Общая медицина'],
        internationalFeatures: 'Партнёрство с Massachusetts General Hospital, 500 коек',
        insuranceStatus: '50+ международных страховых компаний',
      },
      unicare: {
        description: 'Входит в группу Chindex Healthcare. Комплексные медицинские услуги в западном стиле по международным стандартам.',
        specialties: ['Семейная медицина', 'Акушерство', 'Педиатрия'],
        internationalFeatures: 'Устоявшийся международный бренд больниц',
        insuranceStatus: '50+ международных страховых компаний',
      },
      parkway: {
        description: 'Входит в IHH Healthcare — одну из крупнейших медицинских групп мира. Развитая страховая сеть, включая прямые расчёты с Prudential.',
        specialties: ['Многопрофильная помощь', 'Семейная медицина', 'Диагностика'],
        internationalFeatures: 'Группа IHH Healthcare, прямые расчёты с Prudential',
        insuranceStatus: 'Прямое урегулирование с Prudential',
      },
      shine: {
        description: 'Участник сети Mayo Clinic Care Network. Кардиология, гастроэнтерология и общая медицина по международным стандартам.',
        specialties: ['Кардиология', 'Гастроэнтерология', 'Общая медицина'],
        internationalFeatures: 'Партнёрство с Mayo Clinic Care Network',
        insuranceStatus: '40+ международных страховых компаний',
      },
      raffles: {
        description: 'Входит в сингапурскую группу Surbana Jurong. Ориентация на медицинское путешествие с комплексными программами медосмотров.',
        specialties: ['Медицинские осмотры для руководителей', 'Общая медицина', 'Медицинское путешествие'],
        internationalFeatures: 'Сингапурская группа Surbana Jurong',
        insuranceStatus: 'Международное страхование',
      },
    },

    faqPage: {
      cta: {
        title: 'Остались вопросы?',
        text: 'Получите бесплатную консультацию ShanghaiMed без каких-либо обязательств. Наша команда отвечает в течение 24 часов.',
        email: 'Написать нам',
        form: 'Форма обратной связи',
      },
    },
  },
  // ── Mongolian (Cyrillic, official script of Mongolia) ── UI strings only; medical/legal/price text falls back to en (YMYL) ──
  mn: {
    ...enTranslations,
    nav: {
      whyShanghai: 'Яагаад Шанхай',
      howItWorks: 'Хэрхэн ажилладаг',
      treatments: 'Эмчилгээ',
      careTeam: 'Асрамжийн баг',
      trust: 'Итгэл',
      items: ['Яагаад Шанхай', 'Хэрхэн ажилладаг', 'Эмнэлгийн сүлжээ', 'Асрамжийн баг', 'Үнэ', 'Блог', 'Холбоо барих'],
    },
    hero: {
      badge1: 'Олон улсын даатгалын эмнэлгүүд',
      badge2: 'Англи, хятад хэлтэй бүртгэлтэй сувилагчид',
      badge3: '24/7 AI + Хүний дэмжлэг',
      title: 'Шанхай дахь эрүүл мэндийн үйлчилгээ',
      titleHighlight: 'Танд зориулан бүтээсэн',
      subtitle: 'Хятадын тэргүүлэх эмнэлгүүд, англи, хятад хэлтэй сувилагчид, 24/7 AI дэмжлэгтэй нэг платформоор холбогдоорой.',
      cta: 'Үнэгүй эмнэлгийн зөвлөгөө захиалах',
    },
    whyShanghai: {
      badge: 'Яагаад Шанхай',
      title: 'Олон улсын өвчтөнүүдэд зориулсан дэлхийн түвшний эрүүл мэндийн тусламж',
      subtitle: 'Шанхай нь тэргүүлэх эмнэлгүүд, туршлагатай мэргэжилтнүүд, ил тод үнэ, олон улсын өвчтөнүүдэд зориулсан хувийн дэмжлэгийг санал болгодог.',
      stats: [
        { label: 'Шанхайн жилийн олон улсын өвчтөний тоо' },
        { label: 'А зэрэглэлийн аялал жуулчлалын туршилтын эмнэлгүүд' },
        { label: 'Үйлчилсэн үндэстэн' },
        { label: 'Жилийн өсөлт' },
      ],
      healthSystem: {
        title: 'Олон улсад хүлээн зөвшөөрөгдсөн эрүүл мэндийн систем',
        items: [
          'Дэлхийн өнцөг булан бүрээс өвчтөнүүдийг эмчлэх тэргүүлэх эмнэлгүүд',
          'Англи хэлний үйлчилгээ бүхий олон улсын тусгай хэлтсүүд',
          'Олон улсын эрүүл мэндийн үйлчилгээнд зориулагдсан төрийн А зэрэглэлийн эмнэлгүүд',
          'Хавдар, зүрх судас, мэдрэл, яс шарас, үргүйдлийн эмчилгээ болон бусад мэргэжлүүдийн эмч нар',
        ],
      },
      travelAccess: {
        title: 'Тохиромжтой аялал ба эрүүл мэндийн хүртээмж',
        items: [
          'Олон орны аялагчдад 240 цагийн визгүй дамжин өнгөрөх боломж',
          'Удаан хугацааны эмчилгээнд эмнэлгийн визний дэмжлэг',
          'Нисэх онгоцны буудлаас тосож авах ба тээврийн туслалцаа',
          'Эрүүл мэндийн аяллын бүх үе шатанд бүрэн зохицуулалт',
        ],
      },
      pricing: {
        title: 'Өрсөлдөхүйц үнээр өндөр чанартай эрүүл мэнд',
        subtitleLine1: 'АНУ-ын олон өвчтөн даатгалтай ч гэсэн хувиасаа их хэмжээний эрүүл мэндийн зардал төлсөөр байна.',
        subtitleLine2: 'Тоонууд нь ердийн хувиасаа төлөх зардлыг харуулах бөгөөд үйлчилгээ үзүүлэгч, байршил, даатгал, эмчилгээний төлөвлөгөөнөөс хамааран өөр байж болно.',
        tableService: 'Үйлчилгээ',
        tableShanghai: 'Шанхай',
        tableUs: 'АНУ-ын ердийн зардал',
        rows: [
          { service: 'Удирдах ажилтны эрүүл мэндийн үзлэг', shanghai: '$700-оос', us: '$2,500-оос' },
          { service: 'MRI шинжилгээ', shanghai: '$300-оос', us: '$1,000-оос' },
          { service: 'CT шинжилгээ', shanghai: '$150-оос', us: '$500-оос' },
          { service: 'Мэргэжилтний зөвлөгөө', shanghai: '$70-оос', us: '$250-оос' },
          { service: 'IVF үргүйдлийн эмчилгээ', shanghai: '$4,200-оос', us: '$15,000-оос' },
          { service: 'Шүдний суулгац', shanghai: '$800-оос', us: '$3,000-оос' },
        ],
        valueTitle: 'Яагаад өвчтөнүүд Шанхайг сонгодог вэ',
        valueItems: [
          'Тэргүүлэх эмнэлгүүд болон мэргэжилтнүүдэд хандах',
          'Эмчилгээний өмнөх ил тод үнэ',
          'Зөвлөгөө, шинжилгээ, эмчилгээнд хурдан хамрагдах',
          'Хувиасаа төлөх эрүүл мэндийн зардал бага',
          'Өвчтөний бүх аяллын туршид хувийн 2 хэлтэй дэмжлэг',
        ],
        notesTitle: 'Чухал тэмдэглэл',
        notes: [
          'Үнийг зөвхөн жишээ болгон үзүүлсэн бөгөөд үнийн санал биш юм.',
          'Бодит эмнэлгийн төлбөрийг эмнэлэг, эмч, эмчилгээний төлөвлөгөө тогтооно.',
          'АНУ-ын үнэ нь даатгалгүй ердийн зардлыг харуулах бөгөөд даатгалын хамрах хүрээ болон байршлаас хамааран ихээхэн ялгаатай байж болно.',
          'Валютын ханш нь зөвхөн лавлагааны зориулалттай бөгөөд хэлбэлзэж болно.',
          'Нарийн төвөгтэй эмчилгээ, мэс засал, хавдрын эмчилгээ, хэвтүүлэх үйлчилгээ нь эрүүл мэндийн үнэлгээний дараа хувь хүний үнийн санал шаарддаг.',
        ],
      },
    },

    howItWorks: {
      title: 'Таван энгийн алхам',
      subtitle: 'Анхны асуултаас эмчилгээний дараах хяналт хүртэл бид таны Шанхай дахь эрүүл мэндийн аяллын алхам бүрт дэмжлэг үзүүлнэ.',
      badge: 'Хэрхэн ажилладаг',
      simpleProcess: 'Энгийн үйл явц',
      step1Title: 'AI зөвлөгөө',
      step1Desc: 'Манай AI навигатор таны хэрэгцээг ойлгохын тулд шууд хариу өгнө.',
      step2Title: 'Асрамжийн багийг томилох',
      step2Desc: 'Туршлагатай сувилагч таны асрамжийн зохицуулагчаар томилогдоно.',
      step3Title: 'Шанхайд ирэх',
      step3Desc: 'Нисэх онгоцны буудлын тээвэр, зочид буудлын захиалга зэрэг бүрэн дэмжлэг.',
      step4Title: 'Эмчилгээ ба эдгэрэлт',
      step4Desc: 'Мэргэжилтний эмчилгээ, англи, хятад хэлний дэмжлэг, эмчилгээний дараах хяналтын уялдаа холбоо.',
      steps: [
        { title: 'Асуулт илгээх', description: 'Эрүүл мэндийн хэрэгцээгээ холбоо барих маягтад бөглөнө үү. Манай AI навигатор 24/7 бэлэн байна.' },
        { title: 'Зөвлөгөө авах', description: '24 цагийн дотор хүний зохицуулагч эмнэлгийн сонголтууд болон зардлын тооцоог өгнө.' },
        { title: 'Баталгаажуулж аялах', description: 'Та бэлэн болмогц бид уулзалт, аяллын зохицуулалт, ирэх үеийн дэмжлэгийг зохицуулна.' },
        { title: 'Тусламж авах', description: 'Таны англи, хятад хэлтэй сувилагч зөвлөгөө, шинжилгээ, эмчилгээний туршид биечлэн дэмжлэг үзүүлнэ.' },
        { title: 'Эмчилгээний дараах хяналт', description: 'Бид эрүүл мэндийн баримт бичиг, давтан уулзалт, эмийн зохицуулалт, зайнаас зөвлөгөө өгөхөд тусална.' },
      ],
    },

    treatments: {
      title: 'Шанхайн тэргүүлэх эмнэлгүүд',
      subtitle: 'Таны эрүүл мэндийн хэрэгцээнд тохируулан санал болгосон Шанхайн тэргүүлэх эмнэлгүүдэд хандаарай.',
      hospitalNetwork: 'Эмнэлгийн сүлжээ',
      publicHospitals: '1-р зэрэглэлийн төрийн эмнэлгүүд',
      privateHospitals: 'Хувийн олон улсын эмнэлгүүд',
      viewAll: 'Бүх эмнэлгийг үзэх',
      keyDepartments: 'Гол тасгууд',
      certifications: 'Олон улсын гэрчилгээ',
      insurance: 'Даатгал:',
      all: 'Бүгд',
      modalAllHospitals: 'Бүх эмнэлгүүд',
      modalHospitalsAvailable: 'эмнэлгүүд боломжтой',
      modalAllGradeA: 'Шанхайн бүх 3А зэрэглэлийн төрийн эмнэлгүүдэд хандалттай',
      modalAll: 'Бүх эмнэлгүүд',
      modalPublicGradeA: 'Төрийн А зэрэглэл',
      modalInternationalPrivate: 'Олон улсын хувийн',
      modalIns: 'Даат.:',
      featuredTitle: 'Итгэмжит эмнэлгүүд',
      featuredSubtitle: 'Олон улсын тусгай хэлтэс бүхий Хятадын төрийн тэргүүлэх эмнэлгүүд',
      learnMore: 'Дэлгэрэнгүй',
    },

    trust: {
      badge: 'Яагаад биднийг сонгох вэ',
      title: 'Таны итгэмжит эрүүл мэндийн аяллын түнш',
      subtitle: 'Бид Шанхай дахь мэргэжлийн, ил тод, найдвартай эрүүл мэндийн аяллын үйлчилгээг үзүүлдэг. Бидний ялгарал энд байна.',
      ctaText: 'Мэргэжлийн эрүүл мэндийн аяллын үйлчилгээг мэдрэхийг хүсч байна уу?',
      ctaButton: 'Эрүүл мэндийн аяллаа эхлүүлэх',
    },

    testimonials: {
      badge: 'Өвчтөний түүхүүд',
      title: 'Манай өвчтөнүүдийн хэлсэн үг',
      subtitle: 'Бидэнтэй хамт эрүүл мэндээ өөрчилсөн бодит өвчтөнүүдийн бодит түүхүүд.',
      patientsServed: 'Үйлчилсэн өвчтөн',
      countries: 'Улс орон',
      satisfactionRate: 'Сэтгэл ханамжийн түвшин',
      totalSavings: 'Нийт хэмнэлт',
      saved: 'Хэмнэсэн',
    },

    processFlow: {
      badge: 'Таны аялал',
      title: 'Асуултаас тусламж хүртэл',
      subtitle: 'Алхам бүрт мэргэжлийн дэмжлэгтэй Шанхай дахь эрүүл мэндийн аяллын бүрэн цаг хугацааны хуваарь.',
      phases: [
        {
          phase: 'Ирэхээс өмнө',
          steps: [
            { title: 'Онлайн асуулт', description: 'AI навигатор шууд хариулна' },
            { title: 'Эрүүл мэндийн үнэлгээ', description: 'Шинж тэмдэг цуглуулж, эмнэлэг санал болгоно' },
            { title: 'Зардлын тооцоо', description: 'Зөвлөгөө ба үндсэн шинжилгээний ил тод үнэ' },
            { title: 'Виз ба аялал', description: 'Визгүй/240 цагийн дамжин өнгөрөх заавар, аяллын зөвлөгөө' },
          ],
        },
        {
          phase: 'Айлчлалын үеэр',
          steps: [
            { title: 'Нисэх онгоцны буудлаас тосох', description: 'Таныг англи, хятад хэлтэй сувилагч угтана' },
            { title: 'Эмнэлэгт үзүүлэх', description: 'Сувилагч дагалдан зөвлөгөө ба шинжилгээ' },
            { title: 'Эмчилгээ', description: 'Тэргүүлэх эмнэлгүүдэд дэлхийн түвшний тусламж' },
            { title: 'Хэвтүүлэх тусламж', description: 'Тусгай сувилахуйн дэмжлэг (шаардлагатай бол)' },
          ],
        },
        {
          phase: 'Айлчлалын дараа',
          steps: [
            { title: 'Гарах ба орчуулга', description: 'Англи хэл дээрх эрүүл мэндийн тайлан' },
            { title: 'Дагаж мөрдөх', description: 'Зайнаас дэмжлэг, эмийн зохицуулалт' },
          ],
        },
      ],
    },

    blog: {
      title: 'Блог',
      subtitle: 'Шанхай дахь эрүүл мэнд, эрүүл мэндийн аялал, эрүүл амьдралын талаарх нийтлэлүүд.',
      filterContent: 'Агуулга шүүх',
      searchPlaceholder: 'Нийтлэл хайх...',
      search: 'Хайх',
      clearFilters: 'Шүүлтүүр арилгах',
      categories: 'Ангилалууд',
      popularTags: 'Алдартай шошго',
      noArticles: 'Таны шалгуурт тохирох нийтлэл олдсонгүй.',
      minRead: 'мин унших',
      previous: 'Өмнөх',
      next: 'Дараах',
      home: 'Нүүр',
      blogNav: 'Блог',
      shareLabel: 'Хуваалцах:',
      previousArticle: 'Өмнөх нийтлэл',
      nextArticle: 'Дараагийн нийтлэл',
      toc: 'Агуулга',
      tocHide: 'Хаах',
      tocShow: 'Харуулах',
      subscribeTitle: 'Мэдээллийн товхимолд бүртгүүлэх',
      subscribeDesc: 'Эрүүл мэндийн сүүлийн зөвлөгөө, шинэчлэлүүдийг имэйлээрээ аваарай.',
      emailPlaceholder: 'Таны имэйл',
      subscribe: 'Бүртгүүлэх',
      subscribed: '✓ Амжилттай бүртгүүллээ! Манай мэдээллийн товхимолд нэгдсэнд баярлалаа.',
      shareArticle: 'Энэ нийтлэлийг хуваалцах',
      subscribeSuccessTitle: 'Бүртгэл амжилттай!',
      subscribeSuccessDesc: 'Мэдээллийн товхимолд бүртгүүлсэнд баярлалаа. Та эрүүл мэндийн сүүлийн зөвлөгөө, шинэчлэлүүдийг хүлээн авах болно.',
      close: 'Хаах',
      alertEmailRequired: 'Имэйл хаягаа оруулна уу',
      alertSubscribeFail: 'Бүртгүүлж чадсангүй. Дараа дахин оролдоно уу.',
      alertError: 'Алдаа гарлаа. Дараа дахин оролдоно уу.',
      pageHeaderTitle: 'Эрүүл мэндийн мэдээлэл',
      pageHeaderSubtitle: 'Шанхай дахь эрүүл мэндийн аялал, эрүүл мэндийн үйлчилгээ, эрүүл амьдралын зөвлөмжийн талаарх нийтлэлүүд',
      relatedArticles: 'Холбоотой нийтлэлүүд',
      recommendedHospitals: 'Санал болгож буй эмнэлгүүд',
      learnMore: 'Дэлгэрэнгүй',
      insurancePartnersLabel: 'Даатгалын түншүүд',
      bookTitle: 'Үнэгүй зөвлөгөө товлох',
      bookDesc: 'Манай эрүүл мэндийн зохицуулагчид эмнэлэг сонгох, эмчилгээний сонголтууд, аяллын зохион байгуулалтад туслахад бэлэн байна.',
      whatsappConsult: 'WhatsApp зөвлөгөө',
      requestQuote: 'Үнийн санал авах',
      categoryNames: {
        'health-checkups': 'Эрүүл мэндийн үзлэг',
        'preventive-healthcare': 'Урьдчилан сэргийлэх эрүүл мэнд',
        'medical-tourism': 'Эрүүл мэндийн аялал',
        'traditional-chinese-medicine': 'Уламжлалт Хятад анагаах ухаан',
        'shanghai-hospitals': 'Шанхайн эмнэлгүүд',
        'expat-healthcare': 'Гадаад иргэдийн эрүүл мэнд',
        'patient-stories': 'Өвчтөний түүхүүд',
        'health-guides': 'Эрүүл мэндийн гарын авлага',
      },
    },

    medicalDisclaimer: {
      title: 'Эрүүл мэндийн хариуцлагаас татгалзах',
      lastUpdated: 'Сүүлд шинэчилсэн: 2026 оны 10-р сарын 12',
      warning: 'ShanghaiMed нь эмнэлэг, клиник эсвэл эрүүл мэндийн үйлчилгээ үзүүлэгч биш юм. Бид эрүүл мэндийн онош тавих, эмчилгээ хийх, жор бичих, эрүүл мэндийн зөвлөгөө өгөх зэргийг хийдэггүй.',
      whatWeAre: {
        heading: 'Бид хэн бэ',
        content: 'ShanghaiMed (Shanghai Keling Information Technology Co., Ltd.) нь эрүүл мэндийн аяллын зохицуулалт болон өвчтөний хөтөчийн үйлчилгээ юм. Бид олон улсын өвчтөнүүдэд Хятад, Шанхайн лицензтэй төрийн эмнэлгүүд болон мэргэжилтнүүдэд эрүүл мэндийн айлчлал төлөвлөх, зохион байгуулахад тусалдаг. Бидний үүрэг логистик, хэл, захиргааны тал дээр байна.',
      },
      whatWeDoNotDo: {
        heading: 'Бид юу хийдэггүй вэ',
        item1: 'Бид эрүүл мэндийн онош тавьдаггүй.',
        item2: 'Бид эмийн жор бичдэггүй.',
        item3: 'Бид эрүүл мэндийн журам, эмчилгээ хийдэггүй, чиглүүлдэггүй.',
        item4: 'Бид эмчилгээний үр дүн, хүлээх хугацаа, амжилтыг баталгаажуулдаггүй.',
        item5: 'Бид лицензтэй эмчийн мэргэжлийн дүгнэлтийг орлохгүй.',
      },
      clinicalResponsibility: {
        heading: 'Эмнэлзүйн хариуцлага',
        content: 'Онош, эмчилгээний төлөвлөгөө, жор, мэс засал, шинжилгээ, эмнэлэгт хэвтүүлэх зэрэг эмнэлзүйн бүх шийдвэрийг эмчлэгч эмнэлэг болон түүний лицензтэй эмч нар бие даан, мэргэжлийн хариуцлагынхаа дор болон Хятадын эрүүл мэндийн лицензийн дагуу гаргана. Эмнэлэг болон эмчилгээний төлбөрийг өвчтөн эмнэлэгт шууд, эмнэлгийн нөхцөлийн дагуу төлнө.',
      },
      contentInformational: {
        heading: 'Агуулга нь зөвхөн мэдээллийн зориулалттай',
        content: 'Энэ вэбсайт дээрх нийтлэл, зардлын тооцоо, эмчийн танилцуулга, мэргэжлийн мэдээлэл болон бусад агуулгыг ерөнхий мэдээлэл, төлөвлөлтийн зорилгоор үзүүлсэн. Эдгээр нь эрүүл мэндийн зөвлөгөө биш юм. Эрүүл мэндийн мэдээлэл хурдан өөрчлөгддөг ба хувь хүний тохиолдлууд өөр өөр байдаг; эмчилгээнийхээ талаарх шийдвэрийг эмчлэгч эмчдээ үргэлж найдана уу.',
      },
      emergencies: {
        heading: 'Яаралтай тусламж',
        content: 'Эрүүл мэндийн яаралтай тохиолдолд орон нутгийн яаралтай тусламжийн үйлчилгээтэй яаралтай холбоо барина уу. Эх газрын Хятадад түргэн тусламж, яаралтай эрүүл мэндийн тусламжийн хувьд 120 руу залгана уу.',
      },
      noGuarantee: {
        heading: 'Эмнэлэг-эмчийн баталгаа байхгүй',
        content: 'Бид өвчтөнүүдийг өгөгдсөн мэдээлэлд үндэслэн мэргэшсэн эмнэлэг, мэргэжилтнүүдтэй тааруулах боломжит хүчин чармайлт гаргадаг. Гэхдээ эмнэлгийн хуваарь өөрчлөгддөг, тодорхой эмчийг үргэлж баталгаажуулж чадахгүй бөгөөд эмчилгээний эцсийн шийдвэр эмнэлэгт хадгалагдана.',
      },
      contact: {
        heading: 'Холбоо барих',
        company: 'Shanghai Keling Information Technology Co., Ltd.',
        address: 'Room 101, Floor 1, No. 2555 Changyang Road, Yangpu District, Shanghai, China',
        email: 'hello@shanghaimedhealth.com',
      },
    },

    careTeam: {
      title: 'Англи, хятад хэлтэй бүртгэлтэй сувилагчид',
      subtitle: 'Шанхай дахь эрүүл мэндийн аяллын тань үе шат бүрт хувийн хамтрагчид.',
      badge: 'Асрамжийн баг',
      expertTeam: 'Мэргэжилтэн баг',
      ispnCertified: 'ISPN гэрчилгээтэй',
      ispnDesc: 'Мэргэжлийн сувилагчдын олон улсын стандарт',
      ispnIssuer: 'CGFNS (АНУ) гэрчилгээтэй',
      credentialsTitle: 'Сувилагчдын мэргэшил',
      servicesTitle: 'Манай сувилахуйн үйлчилгээ',
      nursingCare: '2 хэлтэй сувилахуйн тусламж',
      appointmentCoordination: 'Уулзалтын зохицуулалт',
      translationServices: 'Орчуулгын үйлчилгээ',
      transportation: 'Тээврийн зохицуулалт',
      medicalReports: 'Эрүүл мэндийн тайлангийн орчуулга',
      emergencySupport: 'Яаралтай тусламж',
      services: [
        { title: 'Эмчилгээний өмнөх зөвлөгөө', description: 'Эрүүл мэндийн баримт бичгүүдийг хянан үзэж, журмыг тайлбарлаж, эмнэлгийн мэргэжилтнүүдтэй уялдаа холбоог зохицуулна.' },
        { title: 'Уулзалтын товлолт', description: 'Эмчийн зөвлөгөө, оношилгооны шинжилгээ, эмчилгээний хэсгүүдийг зохион байгуулна.' },
        { title: 'Орчуулга ба хэлмэрчлэл', description: 'Зөвлөгөө ба журмын үеэр бодит цагийн эрүүл мэндийн хэлмэрчлэл.' },
        { title: 'Эмнэлгийн хөтөч', description: 'Эмнэлэгт хэвтэх, гарах, төлбөр хийх үйл явцыг удирдан чиглүүлнэ.' },
        { title: 'Гарах үеийн дэмжлэг', description: 'Эмийн заавар, давтан уулзалт, эрүүл мэндийн тайлангийн орчуулга.' },
        { title: 'Даатгалын дэмжлэг', description: 'Даатгалын бодлогын хамрах хүрээг шалгах, эмнэлгийн даатгалын баталгаажуулалтад захиргааны дэмжлэг үзүүлнэ' },
      ],
      credentials: [
        { name: 'Лицензтэй бүртгэлтэй сувилагчид (RN)', detail: 'Шанхайн Эрүүл мэндийн хороо баталгаажуулсан' },
        { name: 'Англи-хятад хэлний гэрчилгээ', detail: 'Англи, хятад хэлний чөлөөт мэдлэг' },
        { name: 'JLPT N1 гэрчилгээ', detail: '日本語能力試験 N1 — Япон хэлний түвшин тогтоох шалгалт (хамгийн дээд түвшин)' },
        { name: 'Эрүүл мэндийн орчуулга', detail: 'Эрүүл мэндийн баримт бичгийн орчуулга болон газар дээрх хэлмэрчлэлийг дэмжинэ' },
        { name: 'Олон улсын өвчтөний тусламж', detail: '10+ жилийн туршлага' },
      ],
    },

    pricing: {
      badge: 'Үнэ',
      eyebrow: 'Далд төлбөргүй',
      title: 'Консьерж үйлчилгээний үнэ',
      subtitle: 'Нэг хүнд ногдох консьерж үйлчилгээний нэг тодорхой үнэ. Эмнэлгийн зардлыг орон нутгийн тарифаар эмнэлэгт шууд төлнө — бид клиникээс комисс авдаггүй.',
      usdLabel: 'ам.доллар',
      whatsIncluded: 'Багт багтсан зүйлс',
      freeCard: {
        name: 'Үнэгүй анхны зөвлөгөө',
        subtitle: 'Шийдвэр гаргахаасаа өмнө эмчилгээний сонголтууд болон төсвөө ойлгоорой.',
        badge: 'Үнэгүй',
        unit: 'Үнэгүй',
        scope: 'Эхлээд Саратай ярина уу — ямар нэгэн төлбөр, үүрэг амлалтгүйгээр.',
        items: [
          'Эрүүл мэндийн хэрэгцээний үнэлгээ',
          'Эмнэлэг ба мэргэжилтний санал',
          'Бодит төсвийн тооцоо',
          'Даатгалын зөвлөгөө',
        ],
        itemsLabel: 'Таны авах зүйлс — 4 үйлчилгээ',
        callout: '<strong>Зөвхөн шийдвэр гаргах үе шат.</strong> Үнэгүй дуудлагаар эмнэлэг, эмч, төсвийг тодорхойлоход тусална. Газар дээрх үйлчилгээ (дагалдан явах, цаг захиалах, орчуулга) цагийн дагалдан явах эсвэл консьерж багц захиалсны дараа эхэлнэ.',
        cta: 'WhatsApp-аар холбогдох →',
      },
      hourlyCard: {
        name: 'Цагийн дагалдан явах',
        subtitle: 'Өөрсдөө эмчийн цаг захиалсан өвчтөнүүдэд.',
        badge: '',
        unit: 'цагаар · өдрийн цагаар',
        scope: 'Цагаар захиалж төлнө, бие даасан үйлчилгээ эсвэл ямар ч багцад нэмэлт үйлчилгээ болгон авах боломжтой.',
        items: [
          'Эмнэлэг дээр дагалдан явагч',
          'Англи–Хятад газар дээрх эмнэлгийн орчуулга · бусад хэл нэмэлт төлбөртэй',
          'Газар дээрх туслалцаа (дараалал, төлбөр, эм авах)',
          'Очих өдөр хяналтын мессеж',
        ],
        itemsLabel: 'Багт багтсан зүйлс — 4 үйлчилгээ',
        callout: '<strong>Үйлчилгээний хязгаар.</strong> Цагийн дагалдан явах нь зөвхөн газар дээрх хамт явах, орчуулга юм. Үйлчилгээнд <strong>багтахгүй</strong>: эмчийн цаг захиалах, мэргэжилтэн тохируулах, нисэх буудлын тээвэр, эмнэлгийн бичиг баримт орчуулах, визний дэмжлэг, даатгалын урьдчилсан зөвшөөрөл, англиас бусад хэлний орчуулга, эсвэл эмчилгээний дараах хяналт — эдгээрийг консьерж багцуудад багтаасан.',
        cta: 'Цагийн дагалдан явах захиалах →',
      },
      checkupCard: { subtitle: 'Нэг өдрийн айлчлалын туршид тусгай дагалдан явагч.' },
      essentialCard: { subtitle: 'Цаг захиалга, орчуулга, даатгал, логистикийн бүрэн зохицуулалт.' },
      surgeryCard: { subtitle: 'Мэс заслын өмнө, үеэр, дараах тусгай дэмжлэг.' },
      essentialBadge: 'Хамгийн их сонгодог',
      packages: [
        {
          name: 'Эрүүл мэндийн үзлэгийн консьерж',
          unit: 'нэг хүнд · 1 өдөр (өдрийн цагаар)',
          description: 'Зөвхөн нэг өдрийн эрүүл мэндийн үзлэгийн хөтөлбөрт',
          itemsLabel: 'Багт багтсан зүйлс — 13 үйлчилгээ',
          allItems: [
            '1 өдөр сувилагч биечлэн дагалдан явах (өдрийн цагаар)',
            'Нисэх буудлаас тосох, хүргэж өгөх',
            'Зочид буудлын зохицуулалтын туслалцаа',
            'Англи–Хятад газар дээрх эмнэлгийн орчуулга',
            'Үзлэгийн тайлан орчуулах, үр дүн тайлбарлах',
            'Урьдчилсан цаг захиалга',
            'Эмийн хүлээн авалт ба хүргэлт',
            'Эмнэлэг ба мэргэжилтний тохирол',
            'Тээвэр, чиглүүлэлт ба төлбөрийн туслалцаа',
            'Оршин суух хугацааны тусгай WhatsApp дэмжлэг',
            'Визний урилгын захидлын дэмжлэг',
            'Айлчлалын дараах 30 хоногийн зайнаас хяналт',
            'Даатгалын дэмжлэг · урьдчилсан зөвшөөрөл',
          ],
        },
        {
          name: 'Үндсэн асрамжийн консьерж',
          unit: 'нэг хүнд · 3 өдөр (өдрийн цагаар)',
          description: 'Бүх мэргэжилтний үзлэг ба өвчний үед шаардлагатай',
          itemsLabel: 'Багт багтсан зүйлс — 13 үйлчилгээ',
          allItems: [
            '3 өдөр сувилагч биечлэн дагалдан явах (өдрийн цагаар)',
            'Нисэх буудлаас тосох, хүргэж өгөх',
            'Зочид буудлын зохицуулалтын туслалцаа',
            'Англи–Хятад газар дээрх эмнэлгийн орчуулга',
            'Эмнэлгийн тайлангийн орчуулга ба хураангуй',
            'Бүх эмчийн цаг захиалга',
            'Эмийн хүлээн авалт ба хүргэлт',
            'Эмнэлэг ба мэргэжилтний тохирол',
            'Тээвэр, чиглүүлэлт ба төлбөрийн туслалцаа',
            'Оршин суух хугацааны тусгай WhatsApp дэмжлэг',
            'Визний урилгын захидлын дэмжлэг',
            'Эмчилгээний дараах 30 хоногийн зайнаас хяналт',
            'Даатгалын дэмжлэг · урьдчилсан зөвшөөрөл',
          ],
        },
        {
          name: 'Мэс засал ба сунгасан асрамжийн консьерж',
          unit: 'нэг хүнд · 5 өдөр (өдрийн цагаар)',
          description: 'Мэс засал ба хэвтүүлэн эмчлэхэд шаардлагатай',
          itemsLabel: 'Багт багтсан зүйлс — 16 үйлчилгээ',
          allItems: [
            '5 өдөр сувилагч биечлэн дагалдан явах (өдрийн цагаар) · мэс заслын өмнө, өдөр, дараа',
            'Нисэх буудлаас тосох, хүргэж өгөх',
            'Зочид буудал ба урт хугацааны байрны зохицуулалт',
            'Англи–Хятад газар дээрх эмнэлгийн орчуулга (мэс заслын өдрийг оролцуулан)',
            'Эмнэлгийн баримт бичгийн бүрэн орчуулга ба мэс заслын хураангуй',
            'Мэс засалч эмчийн цаг захиалга ба хэвтүүлэхийн өмнөх зохицуулалт',
            'Мэс заслын өмнөх бэлтгэл ба хэвтүүлэх зохицуулалт',
            'Эмийн хүлээн авалт, мэс заслын дараах жорын хүргэлт',
            'Эмнэлэг ба мэс засалч эмчийн тохирол',
            'Хэвтэн эмчлэх хугацаанд тасагт зочилж, биеийн байдлыг шалгах',
            'Тээвэр, чиглүүлэлт ба төлбөр/биллингийн туслалцаа',
            'Оршин суух хугацааны тусгай WhatsApp дэмжлэг',
            'Эмнэлгийн визний урилгын захидлын дэмжлэг',
            'Гэр бүлийнхэнтэй харилцах, явцын мэдээлэл дамжуулах',
            'Эмчилгээний дараах 60 хоногийн зайнаас хяналт',
            'Даатгалын дэмжлэг · урьдчилсан зөвшөөрөл ба мэс заслын барьцааны зохицуулалт',
          ],
        },
      ],
      faqTitle: 'Үнэ ба үйлчилгээний түгээмэл асуултууд',
      faqSub: 'Захиалахын өмнө мэдэх шаардлагатай бүх зүйл.',
      viewAllFaq: 'Бүх асуулт хариултыг харах',
      faqLinkDesc: 'Үнэ, даатгал, виз, төлбөр, эрүүл мэндийн тусламж — олон арван нийтлэг асуултанд хариулт',
      faqItems: [
        { q: 'Анхны зөвлөгөө үнэхээр үнэгүй юу? Юуг хамардаг вэ?', a: 'Тийм — Саратай WhatsApp дээр хийх анхны зөвлөгөө бүрэн үнэгүй бөгөөд ямар нэгэн үүрэг хүлээхгүй. Дуудлагаар бид таны эрүүл мэндийн хэрэгцээг үнэлж, тохирох эмнэлэг, мэргэжилтнүүдийг санал болгож, эмчилгээний төсвийн бодит тооцоог өгч, даатгал хэрхэн ажилладгийг тайлбарлана. Энэ нь шийдвэр гаргах үе шатны яриа юм; газар дээрх үйлчилгээ (сувилагч дагалдан явах, цаг захиалах, аман орчуулга) цагийн дагалдан явах эсвэл консьерж багц захиалсны дараа эхэлнэ.' },
        { q: 'Зөвхөн цагийн дагалдан явах үйлчилгээг бүтэн багцгүйгээр захиалж болох уу?', a: 'Тийм. Цагийн дагалдан явах үйлчилгээг цагийн 50 ам.доллараар бие даасан үйлчилгээ болгон, мөн нэмэлт цаг шаардлагатай үед багцад нэмэлтээр авах боломжтой. Энэ нь өөрсдөө эмчийн цаг захиалсан бөгөөд дараалал, төлбөр, эм авах, газар дээрх энгийн асуултуудад туслах англи хэлтэй дагалдан явагч хэрэгтэй өвчтөнүүдэд тохиромжтой. Зөвхөн англи–хятад орчуулга багтана; бусад хэл нэмэлт төлбөртэй орчуулагч шаарддаг. Цагийн дагалдан явах үйлчилгээнд эмчийн цаг захиалах, мэргэжилтэн тохируулах, нисэх буудлын тээвэр, бичиг баримт орчуулах, визний дэмжлэг, даатгалын урьдчилсан зөвшөөрөл, эмчилгээний дараах хяналт багтахгүй — эдгээрийг консьерж багцуудад багтаасан.' },
        { q: '1,000 долларын «Базовый уход» багцад юу багтдаг вэ?', a: '<strong>«Базовый уход» консьерж 3 бүтэн өдрийн дагалдан явах багтана</strong>: урьдчилсан эмнэлгийн бичиг баримтын хяналт, эмч тохируулах, олон цаг захиалах, англи–хятад орчуулга, эмнэлэгт зохицуулалт, нисэх буудлаас тосох, хүргэх (стандарт седан; тусгай тээврийн хэрэгсэл нэмэлт төлбөртэй), эмнэлгийн тайлан орчуулга, эм авах, хүргэх, WhatsApp дэмжлэг, даатгалын дэмжлэг (даатгалын хамрах хүрээ шалгах, урьдчилсан зөвшөөрлийн захидал), эмчилгээний дараах 30 хоногийн алсын хяналт. Энэ багц бүх мэргэжилтний зөвлөгөө, ямар ч эмнэлгийн нөхцөлд шаардлагатай.' },
        { q: 'Шанхайн эмнэлгүүдэд олон улсын даатгалаа ашиглаж болох уу?', a: 'Шанхайн томоохон олон улсын тасгууд ба 3А зэрэглэлийн эмнэлгүүд Cigna, AXA, Allianz, MSH, Bupa зэрэг олон улсын даатгалуудыг хүлээн авдаг. Бид даатгалын хамрах хүрээг шалгах, урьдчилсан зөвшөөрлийн захидал авах зэрэг даатгалын дэмжлэг үзүүлнэ. Шууд төлбөр хийх боломжтой газар бид эмнэлэгтэй зохицуулалт хийнэ; бусад тохиолдолд та эмнэлэгт шууд төлж, бидний баримт бичгийн дэмжлэгтэйгээр даатгалаасаа нөхөн төлүүлнэ.' },
        { q: 'Консьержийн үнэд эмнэлгийн зардал багтдаг уу?', a: 'Үгүй. ShanghaiMed нь зохицуулалт, дагалдан явах үйлчилгээний тусдаа төлбөр авдаг. Эмнэлгийн зардал — эмчийн зөвлөгөө, шинжилгээ, эм, эмчилгээ, эрүүл мэндийн үзлэгийн багц (700 ам.доллараас) — эмнэлэг эсвэл клиникт орон нутгийн тарифаар шууд төлөгдөнө. Бид эмнэлгээс комисс авдаггүй, консьержийн үнийг урьдчилан тодорхой зааж, далд төлбөргүй.' },
        { q: 'Яаралтай болон шөнийн эмнэлгийн тусламж хэрхэн зохион байгуулагддаг вэ?', a: 'Яаралтай тусламж 24/7 боломжтой. Яаралтай дуудлага 300 ам.доллар (эхний 4 цаг багтсан), дараа нь цагийн 100 ам.доллар, өдөр шөнө ялгалгүй. Амь насанд аюултай нөхцөлд яаралтай 120 руу залгаж, ойрын эмнэлэгт хандана уу; Хятадын түргэн тусламж хятад хэлээр ажилладаг — дуудлагын дараа бид эмнэлэгтэй харилцах харилцааг нэн даруй зохицуулж чадна.' },
        { q: 'Англи, япон хэлнээс бусад хэлний орчуулга хэрэгтэй бол яах вэ?', a: 'Англи, япон хэлний орчуулга бүх багцад багтсан. Бусад хэл (араб, орос, солонгос, франц гэх мэт)-ийн хувьд нэмэлт орчуулагчийг тухайн хэлний ховордолт, эмнэлгийн нэр томъёоны шаардлагаас хамааран Шанхайн зах зээлийн ханшаар хөлслөнө. Зөвлөгөөний үед Сараад хэлээ хэлвэл захиалахын өмнө яг тодорхой үнийг хэлж өгнө.' },
        { q: 'Цуцлах болон буцаан олголтын бодлого юу вэ?', a: 'Ирэхээс 14-өөс дээш хоногийн өмнө цуцалбал бүрэн буцаан олголт (бага хэмжээний захиргааны хураамж хасагдана). Ирэхээс 14 хоногийн дотор цуцалбал аль хэдийн гарсан зардал (эмчийн цаг, бичиг баримт орчуулга) -аас хамаарч хэсэгчлэн буцаана. Ирэх өдөр цуцлах эсвэл ирэхгүй бол буцаан олголтгүй. Эмнэлгийн яаралтай байдал, визнээс татгалзсан болон бусад давагдашгүй хүчин зүйлийн тохиолдлуудыг тус тусад нь авч үзнэ.' },
        { q: 'Гэр бүлийнхэнтэйгээ ирж болох уу? Өөрийн орчуулагч авчирч болох уу?', a: 'Мэдээж. Гэр бүлийн гишүүд дагалдан явах болон өөрийн орчуулагч ашиглах нь нэмэлт төлбөргүй. Манай сувилагч бүлгийн хэмжээнээс үл хамааран эмнэлгийн зохицуулалтыг хариуцна. Цорын ганц үл хамаарах зүйл: танай бүлэгт илүү том машин (жишээлбэл, 4+ хүнд минивэн) шаардлагатай бол тээврийн зардлын зөрүүг нэмэлтээр төлнө.' },
      ],
      refundPolicy: 'Буцаан олголтын бодлого',
      medicalDisclaimer: 'Эмнэлгийн мэдэгдэл',
      independentDisclaimer: 'ShanghaiMed нь бие даасан консьерж үйлчилгээ үзүүлэгч; бид эмнэлгийн үйл ажиллагаа эрхэлдэггүй, манай сувилагч нар эмчлэгч эмчийг орлохгүй.',
    },
    freeConsultation: {
      badge: 'Үнэгүй зөвлөгөө',
      title: 'Үнэгүй эмнэлгийн зөвлөгөө захиалах',
      subtitle: 'Аялахаасаа өмнө манай эмнэлгийн багтай ярилцаарай — тохирох мэргэжилтнийг санал болгож, таны хэрэгцээнд нийцүүлэн эмнэлгийн аяллын төлөвлөгөө гаргаж, зардлын тодорхой тооцоог урьдчилан өгнө.',
      specialistMatchTitle: 'Шилдэг мэргэжилтэнтэй тохируулах',
      specialistMatchDesc: 'Бид таныг Шанхайн шилдэг 3А зэрэглэлийн эмнэлгүүдийн нэр хүндтэй профессорууд, тэнхимийн эрхлэгчидтэй холбоно — таны өвчин тус бүрд тохирох мэргэжилтнийг санал болгоно.',
      specialistMatchPoints: [
        'Таны өвчний онцлогт тохируулан мэргэжилтэн сонгох — хамгийн ойрын эсвэл өгөгдмөл сонголт бус',
        'Таны тохиолдлоос хамааран Шанхайн улсын 3А эмнэлгүүдээс тохирох профессорууд, тэнхимийн эрхлэгчидтэй холбох',
        'Шанхайн тэргүүлэх олон улсын болон хувийн эмнэлгүүдэд давуу эрхтэй хандах; цагийг ихэвчлэн богино хугацаанд захиалах боломжтой',
        'Шанхайд ирэхээс өмнө эмнэлгийн баримт бичгийн урьдчилсан хяналт',
      ],
      badges: [
        { title: 'Төлбөр шаардахгүй', desc: 'Үнэгүй зөвлөгөө, урьдчилгаа төлбөр, барьцаа мөнгө байхгүй' },
        { title: 'Худалдан авах үүрэг байхгүй', desc: 'Ямар ч үйлчилгээ захиалах дарамтгүйгээр бидэнтэй ярилцаарай' },
        { title: 'Нууцлал хангана', desc: 'Таны эмнэлгийн мэдээлэл нууц хадгалагдаж, зөвшөөрөлгүйгээр бусадтай хуваалцахгүй' },
      ],
      ctaTitle: 'Үнэгүй зөвлөгөө эхлүүлэх',
      ctaDesc: 'WhatsApp-аар холбогдоорой — манай эмнэлгийн баг аль болох хурдан, ажлын цагаар ихэвчлэн хэдэн цагийн дотор хариу өгнө.',
      ctaButton: 'WhatsApp-аар чатлах',
      hospitalNetworkTitle: 'Манай эмнэлгийн сүлжээ',
      hospitalNetworkDesc: 'Бид Шанхайн 14 улсын 3А эмнэлэг, 5 олон улсын эмнэлэгтэй хамтран ажилладаг. Жагсаалтад орсон түншүүдээс гадна, Шанхайн бүх 3-р зэрэглэлийн улсын эмнэлгүүдэд цаг захиалга өгөх боломжтой.',
      publicHospitals: 'Улсын 3А зэрэглэлийн эмнэлгүүд (14)',
      privateHospitals: 'Олон улсын эмнэлгүүд (5)',
      beyondTitle: 'Жагсаалтад ороогүй эмнэлгүүдийн тухай',
      beyondDesc: 'Хэрэв жагсаалтад ороогүй Шанхайн бусад 3А эмнэлгийн мэргэжилтэн хэрэгтэй бол бид цаг захиалгыг зохицуулж чадна. Эмнэлгийн хэрэгцээгээ хэлээрэй, бид тохирох мэргэжилтнийг санал болгоё.',
    },

    faq: {
      badge: 'Түгээмэл асуултууд',
      title: 'Түгээмэл асуулт хариулт',
      subtitle: 'Шанхай дахь эрүүл мэндийн аяллын талаар мэдэх шаардлагатай бүх зүйл.',
      items: [
        { question: 'Эрүүл мэндийн аяллын үйл явцыг хэрхэн эхлүүлэх вэ?', answer: 'Эрүүл мэндийн байдал, сонголтоо холбоо барих маягтад бөглөнө үү. Манай баг 24 цагийн дотор эмнэлгийн санал болон зардлын тооцоотойгоор хариу өгнө.' },
        { question: 'Виз авахад тусалдаг уу?', answer: 'Тийм, бид эмчилгээнд зориулсан визний туслалцаа үзүүлдэг. Тохирох орны иргэдийн хувьд Шанхайд орох 240 цагийн визгүй дамжин өнгөрөх эрхийг зохицуулахад тусалж чадна.' },
        { question: 'Би хятад хэл мэдэхгүй бол яах вэ?', answer: 'Манай бүх сувилагч-зохицуулагчид эрүүл мэндийн зөвлөгөөний үеэр бодит цагийн орчуулга хийдэг. Эрүүл мэндийн тайланг англи эсвэл таны хүссэн хэлээр гаргаж өгөх боломжтой.' },
        { question: 'Төлбөр хэрхэн хийгддэг вэ?', answer: 'Та эмнэлэгт шууд төлнө. Даатгал эзэмшигчдийн хувьд бид шууд төлбөр тооцооны үйл явцад тусална.' },
        { question: 'Та ямар төрлийн эмчилгээнд мэргэшсэн бэ?', answer: 'Бид урьдчилан сэргийлэх үзлэг, мэргэжилтний зөвлөгөөнөөс нарийн төвөгтэй эрүүл мэндийн тусламж хүртэл өргөн хүрээний эрүүл мэндийн хэрэгцээг дэмждэг. Өвчтөн бүрийн хэрэгцээ өөр өөр байдаг. Бид таны нөхцөлд тохирох эмнэлэг, мэргэжилтэн, тусламжийн замыг тодорхойлоход тусална.' },
      ],
      stillTitle: 'Асуулт байна уу?',
      whatsappCta: 'WhatsApp-аар холбогдох',
      viewAll: 'Бүх түгээмэл асуултыг үзэх',
      viewAllDesc: 'Үнэ, даатгал, виз, төлбөр, эрүүл мэндийн тусламжийн талаарх бүх хариулт — 10 гаруй нийтлэг асуулт.',
      browseFaq: 'Бүх асуултыг харах',
      whatsappDesc: 'Сувилагч-зохицуулагчтай шууд чатлана уу. Англи, япон, араб хэл дээр хувьчилсан хариулт авна уу.',
    },

    hospitals: {
      huashan: {
        description: 'Арьс өвчин, мэдрэлийн мэс заслын чиглэлээр улсдаа тэргүүлдэг. Хятадын олон улсад хүлээн зөвшөөрөгдсөн эмнэлгүүдийн нэг.',
        specialties: ['Мэдрэлийн мэс засал', 'Арьс өвчин', 'Халдварт өвчин'],
        internationalFeatures: 'Олон улсын тусгай хэлтэс, 24 даатгалын түнш хүлээн авдаг',
        insuranceStatus: 'Шууд төлбөр тооцоо',
      },
      'children-fudan': {
        description: 'Нярайн тусламж, хүүхдийн ховор өвчний тэргүүлэх төв.',
        specialties: ['Нярайн анагаах ухаан', 'Хүүхдийн мэс засал', 'Сэхээн амьдруулах ба эрчимт эмчилгээ'],
        internationalFeatures: '1993 оноос хойш ажиллаж буй олон улсын хүүхдийн хэлтэс, 19 даатгалын түнш хүлээн авдаг',
        insuranceStatus: 'Шууд төлбөр тооцоо',
      },
      ruijin: {
        description: 'Чөмөг шилжүүлэн суулгах, CAR-T эмчилгээний анхдагч, дэлхийн түвшний үр дүнтэй.',
        specialties: ['Цус судлал', 'Дотор шүүрэл', 'Түлэнхийн мэс засал ба шарх эмчилгээ'],
        internationalFeatures: 'CAR-T эмчилгээний эдгэрэлтийн түвшин 95.7%, олон улсын тусгай хэлтэс, 21 даатгалын түнш',
        insuranceStatus: 'Шууд төлбөр тооцоо',
      },
      'shanghai-general': {
        description: 'Шанхайн хамгийн эртний бөгөөд нэр хүндтэй эмнэлгүүдийн нэг. Нүд, шээсний замын тасаг тэргүүлдэг.',
        specialties: ['Нүд судлал', 'Шээсний зам судлал', 'Чих хамар хоолой ба толгой хүзүүний мэс засал'],
        internationalFeatures: 'Олон хэлт ажиллагсадтай олон улсын өвчтөний төв, 17 даатгалын түнш',
        insuranceStatus: 'Олон улсын даатгал',
      },
      zhongshan: {
        description: 'Фудань их сургуулийн харьяа. Олон улсын тусгай байр, англи хэлт ажиллагсад бүхий зүрхний төв.',
        specialties: ['Ерөнхий мэс засал', 'Хоол боловсруулах зам судлал', 'Зүрх судас судлал'],
        internationalFeatures: 'Олон улсын өвчтөний тусгай байр, 19 даатгалын түнш',
        insuranceStatus: 'Олон улсын даатгал',
      },
      renji: {
        description: 'Шанхайн Жяо Тун их сургуулийн харьяа. Хоол боловсруулах замаар 4 жил дараалан улсдаа №1. Элэг шилжүүлэн суулгах тэргүүлэх төв.',
        specialties: ['Хоол боловсруулах зам судлал', 'Нөхөн үржихүйн анагаах ухаан', 'Үе мөч өвчин судлал'],
        internationalFeatures: 'Олон улсын нөхөн үржихүйн анагаах ухааны төв, 20 даатгалын түнш',
        insuranceStatus: 'Олон улсын даатгал',
      },
      longhua: {
        description: 'Уламжлалт Хятад анагаах ухааны тэргүүлэх эмнэлэг. УАУ-ын эрүүл мэндийн аяллын албан ёсны туршилтын төв. Зүү төөнүүр, ургамлын эмчилгээ, УАУ-ын нөхөн сэргээлт.',
        specialties: ['УАУ-ын хавдар судлал', 'УАУ-ын яс шарас', 'УАУ-ын мэс засал'],
        internationalFeatures: 'УАУ-ын эрүүл мэндийн аяллын албан ёсны туршилтын эмнэлэг, 18 даатгалын түнш',
        insuranceStatus: 'Олон улсын даатгал',
      },
      ipmch: {
        description: 'Хятадын Халамжийн Хүрээлэнгийн харьяа. Хүндрэлтэй жирэмслэлт, ургийн анагаах ухаан, нөхөн үржихүйн анагаах ухааны тэргүүлэх төв.',
        specialties: ['Нөхөн үржихүйн анагаах ухаан', 'Эх барих', 'Эмэгтэйчүүд'],
        internationalFeatures: 'Хятадын Халамжийн Хүрээлэнгийн харьяа, олон улсын эх барихын дэмжлэг, 19 даатгалын түнш',
        insuranceStatus: 'Олон улсын даатгал',
      },
      scmc: {
        description: 'Шанхайн Жяо Тун их сургуулийн харьяа. Хятадын хүүхдийн зүрхний мэс заслын тэргүүлэх төв. Project HOPE-тэй хамтран ажилладаг.',
        specialties: ['Хүүхдийн зүрхний мэс засал', 'Хүүхдийн цус судлал-хавдар судлал', 'Хөгжлийн ба зан үйлийн хүүхэд судлал'],
        internationalFeatures: 'Project HOPE түншлэл, олон улсын хүүхдийн төв, 23 даатгалын түнш',
        insuranceStatus: 'Олон улсын даатгал',
      },
      sixth: {
        description: '1963 оноос хойш мөчдийг нөхөн суулгах чиглэлээр анхдагч. Олон улсад хүлээн зөвшөөрөгдсөн яс шарас, дотор шүүрлийн тэргүүлэх төв.',
        specialties: ['Яс шарас судлал', 'Дотор шүүрэл ба бодисын солилцоо', 'Спортын анагаах ухаан'],
        internationalFeatures: 'Дэлхийн анхны мөч нөхөн суулгах төв, 18 даатгалын түнш',
        insuranceStatus: 'Олон улсын даатгал',
      },
      'first-maternity': {
        description: 'Шанхайн тэргүүлэх амаржих газар. Олон улсын өвчтөний дэмжлэгтэй бүрэн эх барих, нярайн үйлчилгээ.',
        specialties: ['Эх барих', 'Ургийн анагаах ухаан', 'Нөхөн үржихүйн анагаах ухаан'],
        internationalFeatures: 'Эх барихын олон улсын тусгай үйлчилгээ, 18 даатгалын түнш',
        insuranceStatus: 'Олон улсын даатгал',
      },
      xinhua: {
        description: 'Нуруу, хүүхдийн мэс заслын тэргүүлэх төв, олон улсын бүрэн үйлчилгээтэй.',
        specialties: ['Хүүхэд судлал', 'Арьс өвчин судлал', 'Ерөнхий мэс засал'],
        internationalFeatures: 'Бүрэн олон улсын хэлтэс, 16 даатгалын түнш',
        insuranceStatus: 'Олон улсын даатгал',
      },
      huadong: {
        description: 'Фудань их сургуулийн харьяа. Ахмад настны эрүүл мэнд, нөхөн сэргээлтийн тэргүүлэх төв. Удирдах ажилтны эрүүл мэндийн үзлэгийн хөтөлбөрүүдээр алдартай.',
        specialties: ['Ахмад настны анагаах ухаан', 'Нөхөн сэргээх анагаах ухаан', 'Эмнэлзүйн хоол тэжээл судлал'],
        internationalFeatures: 'Удирдах ажилтны эрүүл мэндийн үзлэгийн төв, олон улсын нөхөн сэргээлт, 17 даатгалын түнш',
        insuranceStatus: 'Олон улсын даатгал',
      },
      ninth: {
        description: 'Хятадын шүдний эмчилгээгээр №1 эмнэлэг. 2024 оны 1-р сард Пүдун кампуст 100+ шүдний сандал, CBCT, микроскоп, лазер тоног төхөөрөмж бүхий Олон улсын хэлтэс нээгдсэн. Байнгын олон улсын суулгацын мэргэжилтэн проф. Тонетти. Нарийн төвөгтэй тохиолдлуудад MDT механизм. 40+ орны өвчтөн эмчлүүлсэн.',
        specialties: ['Нүүр амны болон шүдний мэс засал №1', 'Гоёл сайхны ба нөхөн сэргээх мэс засал', 'Нүүр амны мэс засал'],
        internationalFeatures: 'Шүдний тэргүүлэх эмнэлэг, 5 академич. Нүүр амны болон гоёл сайхны мэс заслаар улсдаа тэргүүлдэг.',
        insuranceStatus: 'Шууд төлбөр тооцоо (8 даатгал, 21 түншлэл)',
      },
      jiahui: {
        description: 'Шанхайн 500 ортой хамгийн том хувийн олон улсын эмнэлэг. Massachusetts General Hospital-тай түншлэлтэй. Олон төрөлжсөн эрүүл мэндийн төв.',
        specialties: ['Хавдар судлал', 'Мэс засал', 'Ерөнхий анагаах ухаан'],
        internationalFeatures: 'Massachusetts General Hospital түншлэл, 500 ор',
        insuranceStatus: '50+ олон улсын даатгалын компани',
      },
      unicare: {
        description: 'Chindex Healthcare группын бүрэлдэхүүнд. Олон улсын стандартын барууны хэв маягийн иж бүрэн эрүүл мэндийн үйлчилгээ.',
        specialties: ['Өрхийн анагаах ухаан', 'Эх барих', 'Хүүхэд судлал'],
        internationalFeatures: 'Байгуулагдсан олон улсын эмнэлгийн брэнд',
        insuranceStatus: '50+ олон улсын даатгалын компани',
      },
      parkway: {
        description: 'Дэлхийн хамгийн том эрүүл мэндийн группүүдийн нэг болох IHH Healthcare-ийн бүрэлдэхүүнд. Prudential-тай шууд төлбөр тооцоо зэрэг өргөн даатгалын сүлжээ.',
        specialties: ['Олон төрөлжсөн тусламж', 'Өрхийн анагаах ухаан', 'Оношилгоо'],
        internationalFeatures: 'IHH Healthcare групп, Prudential-тай шууд төлбөр тооцоо',
        insuranceStatus: 'Prudential-тай шууд төлбөр тооцоо',
      },
      shine: {
        description: 'Mayo Clinic Care Network-ийн гишүүн. Олон улсын стандартаар зүрх судас, хоол боловсруулах зам, ерөнхий анагаах ухаан.',
        specialties: ['Зүрх судас судлал', 'Хоол боловсруулах зам судлал', 'Ерөнхий анагаах ухаан'],
        internationalFeatures: 'Mayo Clinic Care Network түншлэл',
        insuranceStatus: '40+ олон улсын даатгалын компани',
      },
      raffles: {
        description: 'Сингапурын Surbana Jurong группын бүрэлдэхүүнд. Иж бүрэн эрүүл мэндийн үзлэгийн хөтөлбөр бүхий эрүүл мэндийн аялалд чиглэсэн.',
        specialties: ['Удирдах ажилтны эрүүл мэндийн үзлэг', 'Ерөнхий анагаах ухаан', 'Эрүүл мэндийн аялал'],
        internationalFeatures: 'Сингапурын Surbana Jurong групп',
        insuranceStatus: 'Олон улсын даатгал',
      },
    },

    faqPage: {
      cta: {
        title: 'Асуулт хэвээр байна уу?',
        text: 'ShanghaiMed-ийн үнэгүй, ямар ч үүрэг хүлээхгүй зөвлөгөөг аваарай. Манай баг 24 цагийн дотор хариу өгнө.',
        email: 'Бидэнд имэйл бичих',
        form: 'Холбоо барих маягт',
      },
    },
    insights: {
      badge: 'Блог',
      title: 'Сүүлийн мэдээлэл',
      subtitle: 'Шанхай дахь эрүүл мэнд, эрүүл мэндийн аялал, эрүүл амьдралын талаарх нийтлэлүүдийг уншина уу.',
      readMore: 'Дэлгэрэнгүй',
      viewAll: 'Бүх нийтлэлийг үзэх',
      featured: '★ Онцлох',
    },
    contact: {
      title: 'Эрүүл мэндийн аялалаа өнөөдөр эхлүүлээрэй',
      subtitle: 'Манай эмнэлгийн багаас үнэгүй зөвлөгөө аваарай. AI туслах тань шууд хариулна. Хүний зохицуулагч 24 цагийн дотор холбогдоно.',
      cta: 'Эрүүл мэндийн аялалаа өнөөдөр эхлүүлээрэй',
      badge: 'Холбоо барих',
      whatsappTitle: 'WhatsApp',
      whatsappDesc: 'AI туслах 24/7 + Хүний хариулт 24 цагт',
      whatsapp: 'WhatsApp-аар бичих',
      lineTitle: 'LINE',
      lineDesc: 'Зохицуулагчтай шууд ярилцах',
      lineButton: 'LINE-аар бичих',
      lineIdLabel: 'LINE ID',
      lineId: 'sara_shanghaimed',
      lineScanHint: 'LINE дээр нэмэхийн тулд QR кодыг уншина уу',
      lineQrAlt: 'LINE QR код',
      locationLabel: 'Байршил',
      locationValue: 'Шанхай, БНХАУ',
      responseLabel: 'Хариулах хугацаа',
      responseValue: 'AI: Шууд | Хүний: 24 цагийн дотор',
      emailLabel: 'Имэйл',
      nameLabel: 'Бүтэн нэр *',
      namePlaceholder: 'Таны бүтэн нэр',
      emailLabel2: 'Имэйл *',
      emailPlaceholder: 'your@email.com',
      countryLabel: 'Улс *',
      countryPlaceholder: 'Улсаа сонгоно уу *',
      otherCountry: 'Бусад',
      otherCountryPlaceholder: 'Улсаа бичнэ үү *',
      countries: {
        'United States': 'АНУ',
        'United Kingdom': 'Их Британи',
        'Canada': 'Канад',
        'Australia': 'Австрали',
        'Japan': 'Япон',
        'South Korea': 'Өмнөд Солонгос',
        'Singapore': 'Сингапур',
        'Germany': 'Герман',
        'France': 'Франц',
      },
      phoneLabel: 'Утас / WhatsApp',
      phonePlaceholder: 'Утас / WhatsApp (заавал биш)',
      medicalNeedsLabel: 'Эрүүл мэндийн хэрэгцээ *',
      medicalNeedsPlaceholder: 'Эрүүл мэндийн хэрэгцээгээ сонгоно уу',
      medicalNeeds: {
        consultation: 'Эрүүл мэндийн зөвлөгөө',
        cardiology: 'Зүрх судас',
        neurology: 'Мэдрэл',
        oncology: 'Хавдар',
        orthopedics: 'Яс шарас',
        checkup: 'Эрүүл мэндийн үзлэг',
        dental: 'Шүдний эмчилгээ',
        plastic: 'Гоёл сайхны мэс засал',
        other: 'Бусад',
      },
      messageLabel: 'Таны мессеж',
      messagePlaceholder: 'Эрүүл мэндийн байдал эсвэл асуултаа бичнэ үү...',
      submit: 'Үнэгүй зөвлөгөө авах',
      submitting: 'Илгээж байна...',
      successTitle: 'Баярлалаа!',
      successMessage: 'Баярлалаа! AI туслах тань таны асуултыг хүлээн авсан бөгөөд баг 24 цагийн дотор холбогдоно. WhatsApp-аар ч холбогдож болно — бид аль болох хурдан хариулна.',
      sendAnother: 'Өөр мессеж илгээх',
      privacyNote: 'Энэ маягтыг илгээснээр та Нууцлалын бодлоготой санал нийлж байгаад тооцогдоно.',
      alertFail: 'Мессеж илгээж чадсангүй. Дахин оролдоно уу эсвэл WhatsApp-аар холбогдоно уу.',
    },
    footer: {
      tagline: 'Олон улсын өвчтөнүүдийг Шанхайн дэлхийн түвшний эмнэлгийн байгууллагууд болон 2 хэлтэй эрүүл мэндийн мэргэжилтнүүдтэй холбож байна.',
      columns: [
        {
          title: 'Компанийн тухай',
          links: ['Бидний тухай', 'Үүсгэн байгуулагч', 'Яагаад Шанхай', 'Манай сүлжээ', 'Асрамжийн баг'],
        },
        {
          title: 'Эмчилгээ',
          links: ['Эмнэлгүүд', 'Мэргэжилтнүүд', 'Үнийн гарын авлага'],
        },
        {
          title: 'Дэмжлэг',
          links: ['Хэрхэн ажилладаг', 'Түгээмэл асуултууд', 'Судалгааны сан', 'Нэр томьёоны толь', 'Холбоо барих', 'WhatsApp дэмжлэг'],
        },
        {
          title: 'Хуулийн мэдээлэл',
          links: ['Нууцлалын бодлого', 'Үйлчилгээний нөхцөл', 'Мөнгө буцаах бодлого', 'Редакцын бодлого', 'Эрүүл мэндийн хариуцлагаас татгалзах'],
        },
      ],
      rights: 'Бүх эрх хуулиар хамгаалагдсан.',
      location: 'Шанхай, Хятад',
    },
    agentChat: {
      welcome: 'Сайн байна уу! Би Navi, таны эрүүл мэндийн хөтөч. Шанхай дахь эмнэлэг, эмчилгээ, зардал, виз, эрүүл мэндийн аялалын төлөвлөгөөний талаар асуугаарай.',
      questions: [
        'Таны хувийн үйлчилгээнд юу багтдаг вэ?',
        'Уулзалтыг хэрхэн товлох вэ?',
        'Таны хувийн үйлчилгээний үнэ хэд вэ?',
      ],
      inputPlaceholder: 'Шанхай дахь эрүүл мэндийн талаар асуугаарай...',
      chatTitle: 'Navi · Эрүүл мэндийн хөтөч',
      chatSubtitle: '24/7 AI туслах',
    },
    pages: {
      treatmentsTitle: 'Эмчилгээ ба эмнэлгүүд',
      treatmentsSubtitle: 'Шанхайн мэргэжлийн тэргүүлэх эмнэлгүүдэд хүрэх боломж.',
      contactTitle: 'Холбоо барих',
      contactSubtitle: 'Эрүүл мэндийн аялалаа өнөөдөр эхлүүлээрэй. Манай баг 24/7 туслахад бэлэн.',
      patientStoriesTitle: 'Өвчтөнүүдийн түүх',
      patientStoriesSubtitle: 'Эрүүл мэндээ бидэнд итгэсэн өвчтөнүүдийн бодит түүхүүд.',
      whyShanghaiTitle: 'Яагаад Шанхай вэ?',
      whyShanghaiSubtitle: 'Шанхай нь дэлхийн түвшний эрүүл мэндийг хямд үнээр хүсэх олон улсын өвчтөнүүдийн тэргүүлэх чиглэл болж байна.',
      careTeamTitle: 'Манай асрамжийн баг',
      careTeamSubtitle: 'ISPN гэрчилгээтэй англи, хятад хэлтэй сувилагчид таны эрүүл мэнд, тав тухыг хангахад зориулагдсан.',
      howItWorksTitle: 'Хэрхэн ажилладаг',
      howItWorksSubtitle: 'Манай хялбаршуулсан процессоор Шанхайн дэлхийн түвшний эрүүл мэндийн үйлчилгээнд хялбар хандаарай.',
      faqTitle: 'Түгээмэл асуулт хариулт',
      faqSubtitle: 'Шанхай дахь эрүүл мэндийн тусламж авах талаар мэдэх шаардлагатай бүх зүйл — зардал, эмнэлгийн чанар, виз, даатгал, 2 хэлтэй дэмжлэг.',
    },
  },
  ms: {
      nav: {
        whyShanghai: 'Mengapa Shanghai',
        howItWorks: 'Bagaimana Ia Berfungsi',
        treatments: 'Rawatan',
        careTeam: 'Pasukan Penjagaan',
        trust: 'Kepercayaan',
        items: ['Mengapa Shanghai', 'Bagaimana Ia Berfungsi', 'Rangkaian Hospital', 'Pasukan Penjagaan', 'Harga', 'Blog', 'Hubungi Kami']
      },
      whyShanghai: {
        badge: 'Mengapa Shanghai',
        title: 'Penjagaan Kesihatan Bertaraf Dunia, Dipermudahkan untuk Pesakit Antarabangsa',
        subtitle: 'Shanghai menawarkan akses ke hospital terkemuka, pakar berpengalaman, harga telus dan sokongan peribadi untuk pesakit antarabangsa.',
        stats: [
          {
            label: 'Lawatan Pesakit Antarabangsa Tahunan Shanghai'
          },
          {
            label: 'Hospital Perintis Pelancongan Perubatan Grade-A Awam'
          },
          {
            label: 'Warganegara yang Dilayan'
          },
          {
            label: 'Pertumbuhan Tahunan'
          }
        ],
        healthSystem: {
          title: 'Sistem Penjagaan Kesihatan Yang Diiktiraf Di Peringkat Antarabangsa',
          items: ['Hospital terkemuka yang melayani pesakit dari seluruh dunia', 'Jabatan antarabangsa khusus dengan perkhidmatan berbahasa Inggeris', 'Hospital Grade 3A awam yang ditetapkan untuk perkhidmatan perubatan antarabangsa', 'Akses kepada pakar dalam onkologi, kardiologi, neurologi, ortopedik, rawatan kesuburan dan banyak lagi']
        },
        travelAccess: {
          title: 'Perjalanan dan Akses Perubatan Yang Mudah',
          items: ['Transit tanpa visa 240 jam tersedia untuk pelancong dari banyak negara', 'Sokongan visa perubatan untuk pelan rawatan lanjutan', 'Perkhidmatan jemputan lapangan terbang dan bantuan pengangkutan', 'Koordinasi menyeluruh sepanjang perjalanan kesihatan anda']
        },
        pricing: {
          title: 'Penjagaan Kesihatan Berkualiti Tinggi pada Harga Berdaya Saing',
          subtitleLine1: 'Ramai pesakit dari A.S. masih menanggung kos kesihatan out-of-pocket yang besar walaupun mempunyai perlindungan insurans.',
          subtitleLine2: 'Angka menggambarkan kos out-of-pocket tipikal dan mungkin berbeza mengikut penyedia, lokasi, perlindungan insurans dan pelan rawatan.',
          tableService: 'Perkhidmatan',
          tableShanghai: 'Shanghai',
          tableUs: 'Kos Tipikal A.S.',
          rows: [
            {
              service: 'Pemeriksaan Kesihatan Eksekutif',
              shanghai: 'Dari $700',
              us: 'Dari $2,500'
            },
            {
              service: 'Imbasan MRI',
              shanghai: 'Dari $300',
              us: 'Dari $1,000'
            },
            {
              service: 'Imbasan CT',
              shanghai: 'Dari $150',
              us: 'Dari $500'
            },
            {
              service: 'Konsultasi Pakar',
              shanghai: 'Dari $70',
              us: 'Dari $250'
            },
            {
              service: 'Rawatan IVF',
              shanghai: 'Dari $4,200',
              us: 'Dari $15,000'
            },
            {
              service: 'Implan Pergigian',
              shanghai: 'Dari $800',
              us: 'Dari $3,000'
            }
          ],
          valueTitle: 'Mengapa Pesakit Mencari Nilai di Shanghai',
          valueItems: ['Akses ke hospital dan pakar terkemuka', 'Harga yang telus sebelum rawatan', 'Akses lebih pantas ke konsultasi, pengimejan dan rawatan', 'Kos kesihatan out-of-pocket yang lebih rendah', 'Sokongan bilingual Inggeris–China yang diperibadikan sepanjang perjalanan pesakit'],
          notesTitle: 'Nota Penting',
          notes: ['Harga diberikan untuk tujuan ilustrasi sahaja dan tidak merupakan sebut harga.', 'Yuran perubatan sebenar ditentukan oleh hospital, doktor dan pelan rawatan.', 'Harga A.S. menggambarkan kos self-pay tipikal dan mungkin berbeza secara signifikan berdasarkan perlindungan insurans dan lokasi.', 'Kadar pertukaran adalah untuk rujukan sahaja dan mungkin berubah-ubah.', 'Rawatan kompleks, pembedahan, penjagaan kanser dan perkhidmatan pesakit dalam memerlukan sebut harga individu selepas semakan perubatan.']
        }
      },
      processFlow: {
        badge: 'Perjalanan anda',
        title: 'Dari Pertanyaan hingga Penjagaan',
        subtitle: 'Garis masa lengkap pengalaman pelancongan perubatan anda di Shanghai, dengan sokongan profesional di setiap langkah.',
        phases: [
          {
            phase: 'Sebelum Ketibaan anda',
            steps: [
              {
                title: 'Pertanyaan Dalam Talian',
                description: 'AI Navigator bertindak balas serta-merta'
              },
              {
                title: 'Penilaian Perubatan',
                description: 'Mengumpul simptom, mengesyorkan hospital'
              },
              {
                title: 'Anggaran Kos',
                description: 'Harga telus untuk konsultasi & ujian asas'
              },
              {
                title: 'Visa & Perjalanan',
                description: 'Panduan transit tanpa visa/240j, tip perjalanan'
              }
            ]
          },
          {
            phase: 'Semasa Lawatan anda',
            steps: [
              {
                title: 'Jemputan Lapangan Terbang',
                description: 'Jururawat bilingual Inggeris–China menemui anda'
              },
              {
                title: 'Lawatan Hospital',
                description: 'Konsultasi & ujian diiringi jururawat'
              },
              {
                title: 'Rawatan',
                description: 'Penjagaan bertaraf dunia di hospital terkemuka'
              },
              {
                title: 'Penjagaan Pesakit Dalam',
                description: 'Sokongan kejururawatan khusus (jika diperlukan)'
              }
            ]
          },
          {
            phase: 'Selepas Lawatan anda',
            steps: [
              {
                title: 'Discaj & Terjemahan',
                description: 'Laporan perubatan dalam bahasa Inggeris'
              },
              {
                title: 'Susulan',
                description: 'Sokongan jauh, koordinasi preskripsi'
              }
            ]
          }
        ]
      },
      careTeam: {
        title: 'Jururawat Berdaftar Bilingual Inggeris–China',
        subtitle: 'Rakan penjagaan kesihatan yang berdedikasi di setiap peringkat perjalanan perubatan anda di Shanghai.',
        badge: 'Pasukan Penjagaan',
        expertTeam: 'Pasukan Penjagaan Pakar',
        ispnCertified: 'Bertauliah ISPN',
        ispnDesc: 'Piawaian Antarabangsa untuk Jururawat Profesional',
        ispnIssuer: 'Diperakui oleh CGFNS (USA)',
        credentialsTitle: 'Kelayakan Jururawat',
        servicesTitle: 'Perkhidmatan Kejururawatan Kami',
        nursingCare: 'Penjagaan Kejururawatan Bilingual Inggeris–China',
        appointmentCoordination: 'Koordinasi Temujanji',
        translationServices: 'Perkhidmatan Terjemahan',
        transportation: 'Pengaturan Pengangkutan',
        medicalReports: 'Terjemahan Laporan Perubatan',
        emergencySupport: 'Sokongan Kecemasan',
        services: [
          {
            title: 'Konsultasi Pra-Rawatan',
            description: 'Menyemak rekod perubatan, menerangkan prosedur dan menyelaraskan dengan pakar hospital.'
          },
          {
            title: 'Penjadualan Temujanji',
            description: 'Mengatur konsultasi doktor, ujian diagnostik dan sesi rawatan.'
          },
          {
            title: 'Terjemahan & Interpretasi',
            description: 'Interpretasi perubatan masa nyata semasa konsultasi dan prosedur.'
          },
          {
            title: 'Navigasi Hospital',
            description: 'Membimbing sepanjang proses kemasukan, daftar keluar dan pembayaran.'
          },
          {
            title: 'Sokongan Selepas Discaj',
            description: 'Arahan ubat, temujanji susulan dan terjemahan laporan perubatan.'
          },
          {
            title: 'Sokongan Insurans',
            description: 'Memberi sokongan pentadbiran untuk semakan manfaat polisi & pengesahan perlindungan insurans hospital'
          }
        ],
        credentials: [
          {
            name: 'Jururawat Berdaftar (RN) Berlesen',
            detail: 'Disahkan oleh Shanghai Health Commission'
          },
          {
            name: 'Pensijilan Dwibahasa (Inggeris–China)',
            detail: 'Fasih berbahasa Inggeris dan China'
          },
          {
            name: 'JLPT N1 Certified',
            detail: '日本語能力試験 N1 — Japanese-Language Proficiency Test (tahap tertinggi)'
          },
          {
            name: 'Interpretasi Perubatan',
            detail: 'Menyokong terjemahan dokumen perubatan dan interpretasi di tapak'
          },
          {
            name: 'Penjagaan Pesakit Antarabangsa',
            detail: 'Pengalaman 10+ tahun'
          }
        ]
      },
      hero: {
        badge1: 'Hospital Insurans Antarabangsa',
        badge2: 'Jururawat Berdaftar Bilingual Inggeris–China',
        badge3: 'Sokongan AI + Manusia 24/7',
        title: 'Penjagaan Kesihatan di Shanghai',
        titleHighlight: 'Direka Untuk anda',
        subtitle: 'Berhubung dengan hospital terkemuka China, jururawat bilingual Inggeris–China, dan sokongan AI 24/7 — semuanya melalui satu platform.',
        cta: 'Tempah Konsultasi Percuma'
      },
      testimonials: {
        badge: 'Cerita Pesakit',
        title: 'Kata Pesakit Kami',
        subtitle: 'Cerita benar daripada pesakit sebenar yang telah mengubah perjalanan kesihatan mereka bersama kami.',
        patientsServed: 'Pesakit Dilayan',
        countries: 'Negara',
        satisfactionRate: 'Kadar Kepuasan',
        totalSavings: 'Jumlah Penjimatan',
        saved: 'Dijimatkan'
      },
      treatments: {
        title: 'Hospital Terkemuka Shanghai',
        subtitle: 'Akses hospital terkemuka di seluruh Shanghai, dengan cadangan yang disesuaikan dengan keperluan perubatan anda.',
        hospitalNetwork: 'Rangkaian Hospital',
        publicHospitals: 'Hospital Awam Gred 3A',
        privateHospitals: 'Hospital Antarabangsa Swasta',
        viewAll: 'Lihat Semua Hospital',
        keyDepartments: 'Jabatan Utama',
        certifications: 'Pensijilan Antarabangsa',
        insurance: 'Insurans:',
        all: 'Semua',
        modalAllHospitals: 'Semua Hospital',
        modalHospitalsAvailable: 'hospital tersedia',
        modalAllGradeA: 'akses kepada semua hospital Grade 3A Shanghai',
        modalAll: 'Semua Hospital',
        modalPublicGradeA: 'Awam Grade-A',
        modalInternationalPrivate: 'Swasta Antarabangsa',
        modalIns: 'Ins:',
        featuredTitle: 'Hospital Terpercaya',
        featuredSubtitle: 'Hospital awam terkemuka China dengan jabatan antarabangsa khusus',
        learnMore: 'Ketahui Lebih Lanjut'
      },
      howItWorks: {
        title: 'Lima Langkah Mudah',
        subtitle: 'Dari pertanyaan pertama anda hingga susulan selepas rawatan, kami menyokong setiap langkah perjalanan perubatan anda di Shanghai.',
        badge: 'Bagaimana Ia Berfungsi',
        simpleProcess: 'Proses Mudah',
        step1Title: 'Konsultasi AI',
        step1Desc: 'AI Navigator kami bertindak balas serta-merta untuk memahami keperluan anda.',
        step2Title: 'Penugasan Pasukan Penjagaan',
        step2Desc: 'Seorang jururawat berpengalaman akan ditugaskan sebagai penyelaras penjagaan anda.',
        step3Title: 'Ketibaan di Shanghai',
        step3Desc: 'Sokongan lengkap termasuk pemindahan lapangan terbang dan tempahan hotel.',
        step4Title: 'Rawatan & Pemulihan',
        step4Desc: 'Integrasi rawatan pakar yang lancar, sokongan bilingual Inggeris–China dan susulan selepas penjagaan.',
        steps: [
          {
            title: 'Hantar Pertanyaan',
            description: 'Isi borang hubungan kami dengan keperluan perubatan anda. AI navigator kami tersedia 24/7.'
          },
          {
            title: 'Terima Konsultasi',
            description: 'Dalam masa 24 jam, penyelaras manusia akan memberikan pilihan hospital dan anggaran kos.'
          },
          {
            title: 'Sahkan & Berangkat',
            description: 'Setelah anda bersedia untuk meneruskan, kami menyelaraskan temujanji, logistik perjalanan dan sokongan ketibaan.'
          },
          {
            title: 'Terima Rawatan',
            description: 'Jururawat bilingual Inggeris–China anda memberikan sokongan secara peribadi sepanjang konsultasi, pemeriksaan dan rawatan.'
          },
          {
            title: 'Penjagaan Susulan',
            description: 'Kami membantu dengan rekod perubatan, temujanji susulan, koordinasi preskripsi dan konsultasi jauh.'
          }
        ]
      },
      trust: {
        badge: 'Mengapa Memilih Kami',
        title: 'Rakan Kongsi Pelancongan Perubatan anda Yang Boleh Dipercayai',
        subtitle: 'Kami menyediakan perkhidmatan pelancongan perubatan yang profesional, telus dan boleh dipercayai di Shanghai. Inilah yang membezakan kami.',
        ctaText: 'Bersedia untuk merasai perkhidmatan pelancongan perubatan yang profesional?',
        ctaButton: 'Mulakan Pelancongan Perubatan anda'
      },
      pricing: {
        badge: 'Harga',
        eyebrow: 'Tiada Bayaran Tersembunyi',
        title: 'Harga Concierge',
        subtitle: 'Satu yuran concierge yang telus bagi setiap orang. Yuran perubatan dibayar terus ke hospital pada kadar tempatan — kami tidak mengenakan komisen hospital.',
        usdLabel: 'USD',
        whatsIncluded: 'Apa yang disertakan',
        freeCard: {
          name: 'Konsultasi Awal Percuma',
          subtitle: 'Dapatkan maklumat yang anda perlukan sebelum komited — tiada kewajipan, tiada bayaran.',
          badge: 'Percuma',
          unit: 'Percuma',
          scope: 'Bercakap dengan Sara terlebih dahulu — tiada kewajipan, tiada bayaran.',
          items: ['Penilaian keperluan perubatan', 'Cadangan hospital & pakar', 'Anggaran kos rawatan', 'Panduan insurans'],
          itemsLabel: 'Apa yang anda dapat — 4 perkhidmatan',
          callout: '<strong>Peringkat keputusan sahaja.</strong> Panggilan percuma ini membantu anda menentukan hospital, doktor dan julat bajet yang sesuai. Perkhidmatan di tapak bermula apabila anda menempah pengiring setiap jam atau pakej concierge.',
          cta: 'Sembang dengan Sara di WhatsApp'
        },
        hourlyCard: {
          name: 'Pengiring Hospital di Tapak',
          subtitle: 'Untuk pesakit yang sudah menempah doktor sendiri.',
          scope: 'Ditempah dan dibayar mengikut jam, tersedia secara berasingan <em style="font-style:italic;color:#7b8c99">atau</em> sebagai tambahan kepada mana-mana pakej.',
          items: ['Rakan pengiring di tapak di hospital', 'Interpretasi perubatan di tapak bilingual Inggeris–China · bahasa lain caj tambahan', 'Bimbingan segera (giliran, pembayaran, pengambilan farmasi)', 'Mesej daftar masuk hari yang sama selepas lawatan'],
          itemsLabel: 'Apa yang disertakan — 4 perkhidmatan',
          callout: '<strong>Had skop:</strong> Pengiring setiap jam hanyalah pendamping di tapak dan interpretasi Inggeris–China sahaja. Ia <strong>tidak</strong> termasuk penjadualan temujanji, pemadanan doktor, jemputan lapangan terbang, terjemahan laporan, sokongan visa, pra-kebenaran insurans, interpretasi dalam bahasa selain bahasa Inggeris atau susulan selepas rawatan.',
          cta: 'Tempah pengiring setiap jam'
        },
        checkupCard: {
          subtitle: 'Jururawat khusus untuk satu hari.'
        },
        essentialCard: {
          subtitle: 'Koordinasi lengkap merangkumi temujanji, interpretasi, insurans dan logistik.'
        },
        surgeryCard: {
          subtitle: 'Sokongan terkoordinasi sepanjang pembedahan dan penginapan pesakit dalam.'
        },
        essentialBadge: 'Paling Kerap Dipilih',
        packages: [
          {
            name: 'Health Checkup Concierge',
            unit: 'setiap orang · 1 hari (waktu siang)',
            description: 'Untuk program pemeriksaan kesihatan 1 hari sahaja.',
            itemsLabel: 'Apa yang disertakan — 13 perkhidmatan',
            allItems: ['Jururawat di tapak sehari penuh (waktu siang)', 'Bantuan koordinasi hotel', 'Terjemahan & penerangan laporan pemeriksaan kesihatan', 'Pengambilan & penghantaran ubat', 'Bantuan pengangkutan tempatan & pembayaran', 'Sokongan surat jemputan visa', 'Sokongan insurans', 'Jemputan & hantaran lapangan terbang · sedan standard', 'Interpretasi perubatan di tapak bilingual Inggeris–China', 'Penjadualan temujanji doktor', 'Pemadanan hospital & pakar', 'Sokongan WhatsApp khusus', 'Susulan jauh 30 hari selepas pemeriksaan']
          },
          {
            name: 'Essential Care Concierge',
            unit: 'setiap orang · 3 hari (waktu siang)',
            description: 'Diperlukan untuk semua konsultasi pakar dan keadaan perubatan.',
            itemsLabel: 'Apa yang disertakan — 13 perkhidmatan',
            allItems: ['Jururawat di tapak selama 3 hari (waktu siang)', 'Semakan rekod perubatan pra-lawatan', 'Pemadanan doktor & pakar', 'Penjadualan temujanji hospital', 'Jemputan & hantaran lapangan terbang · sedan standard', 'Koordinasi hotel & pengangkutan tempatan', 'Interpretasi perubatan di tapak bilingual Inggeris–China', 'Navigasi di tapak & bantuan pembayaran', 'Terjemahan laporan perubatan', 'Pengambilan & penghantaran ubat', 'Sokongan WhatsApp khusus sepanjang lawatan', 'Sokongan insurans · pra-kebenaran', 'Susulan jauh 30 hari selepas rawatan']
          },
          {
            name: 'Surgery & Extended Care',
            unit: 'setiap orang · 5 hari (waktu siang)',
            description: 'Diperlukan untuk pembedahan dan prosedur pesakit dalam.',
            itemsLabel: 'Apa yang disertakan — 16 perkhidmatan',
            allItems: ['Jururawat di tapak selama 5 hari (waktu siang)', 'Koordinasi pra-kemasukan', 'Pendampingan hari pembedahan', 'Lawatan semasa pesakit dalam', 'Komunikasi keluarga & kemas kini kemajuan', 'Semakan & taklimat rekod pra-pembedahan', 'Bimbingan pemilihan doktor & hospital', 'Jemputan & hantaran lapangan terbang · sedan standard', 'Sokongan hotel & penginapan lanjutan', 'Interpretasi perubatan di tapak bilingual Inggeris–China', 'Navigasi di tapak & bantuan pembayaran/bil', 'Terjemahan laporan pembedahan', 'Pengambilan & penghantaran ubat', 'Sokongan WhatsApp khusus', 'Koordinasi insurans & deposit pembedahan', 'Susulan 60 hari selepas rawatan']
          }
        ],
        faqTitle: 'Soalan Lazim Harga & Perkhidmatan',
        faqSub: 'Soalan lazim tentang harga, skop, insurans dan situasi khas.',
        viewAllFaq: 'Lihat semua Soalan Lazim harga & perkhidmatan',
        faqLinkDesc: 'Harga, insurans, visa, pembayaran dan penjagaan perubatan — soalan lazim terjawab',
        faqItems: [
          {
            q: 'Adakah konsultasi percuma itu benar-benar percuma?',
            a: 'Ya. Konsultasi awal anda melalui WhatsApp adalah <strong>percuma sepenuhnya tanpa sebarang kewajipan</strong>. Kami menilai keperluan perubatan anda, mengesyorkan hospital dan pakar, memberikan anggaran kos dan menerangkan pilihan insurans — semuanya sebelum anda membayar apa-apa. Perkhidmatan di tapak bermula hanya apabila anda menempah pengiring setiap jam atau pakej concierge.'
          },
          {
            q: 'Bolehkah saya menempah pengiring setiap jam tanpa membeli pakej?',
            a: 'Ya. <strong>Pengiring di tapak pada kadar $50/jam</strong> direka sebagai perkhidmatan kendiri untuk pesakit yang telah menempah doktor mereka sendiri dan hanya memerlukan sokongan pendamping di hospital. Ia juga tersedia sebagai tambahan untuk melanjutkan jam pendamping melebihi hari yang termasuk dalam pakej concierge. Nota: pengiring setiap jam meliputi kehadiran di tapak dan interpretasi Inggeris–China sahaja — penjadualan, pemadanan doktor, pemindahan lapangan terbang dan koordinasi insurans memerlukan pakej concierge. Sebagai tambahan kepada pakej concierge, jam pendamping tambahan melebihi hari yang termasuk juga dibilkan pada $50/jam.'
          },
          {
            q: 'Apakah yang termasuk dalam pakej Essential $1,000?',
            a: '<strong>Essential Care Concierge meliputi 3 hari pendamping siang penuh</strong>: semakan rekod perubatan pra-lawatan, pemadanan doktor, penjadualan pelbagai temujanji, interpretasi di tapak bilingual Inggeris–China di setiap lawatan, navigasi hospital, jemputan &amp; hantaran lapangan terbang dengan sedan standard (kenderaan khas dikenakan caj tambahan), terjemahan laporan perubatan, pengambilan &amp; penghantaran ubat, sokongan WhatsApp khusus sepanjang penginapan anda, sokongan insurans termasuk semakan manfaat polisi dan surat pra-kebenaran, serta susulan jauh 30 hari selepas rawatan. Pakej ini diperlukan untuk semua konsultasi pakar dan sebarang keadaan perubatan.'
          },
          {
            q: 'Adakah anda mengendalikan insurans kesihatan?',
            a: 'Kami menyediakan <strong>sokongan insurans</strong>, termasuk menyemak manfaat polisi anda, membantu anda mendapatkan surat pra-kebenaran dan menyelaraskan dokumen hospital. Di mana syarikat insurans anda mempunyai pengaturan pengebilan terus dengan hospital, kami membantu menyelaraskan proses tersebut. Di mana pengebilan terus tidak tersedia, anda membayar hospital secara terus dan kami menyediakan dokumentasi yang diperlukan oleh syarikat insurans anda untuk pembayaran balik. Kami tidak menjamin perlindungan atau kelulusan pengebilan terus — keputusan dibuat oleh syarikat insurans anda.'
          },
          {
            q: 'Adakah yuran perubatan termasuk dalam harga concierge?',
            a: 'Tidak. Yuran concierge adalah untuk perkhidmatan koordinasi dan pendampingan kami sahaja. <strong>Yuran perubatan (konsultasi doktor, caj hospital, ujian makmal, ubat-ubatan, pembedahan) dibayar terus ke hospital pada kadar tempatan</strong>. Kami memberikan anda anggaran kos yang jelas sebelum anda tiba, dan anda akan mengetahui harga yang diterbitkan hospital sebelum setiap prosedur. Kami tidak mengenakan komisen hospital.'
          },
          {
            q: 'Adakah anda menyokong situasi kecemasan atau selepas waktu kerja?',
            a: 'Dalam kecemasan perubatan, <strong>hubungi 120 dengan segera</strong> dan pergi ke hospital terdekat — pakej concierge tidak termasuk perkhidmatan perubatan kecemasan. Sebaik sahaja anda berada di hospital, kami menawarkan <strong>koordinasi kecemasan di tapak 24/7</strong> dengan bayaran tambahan: <strong>Panggilan kecemasan $300 (tersedia 24/7, termasuk 4 jam pertama)</strong>, kemudian <strong>$100/jam</strong> untuk sokongan pendamping di tapak tambahan. Ini meliputi penghantaran segera, koordinasi jururawat kanan, komunikasi keluarga dan navigasi hospital semasa kecemasan. Hubungi Sara di WhatsApp secepat mungkin selepas menghubungi 120.'
          },
          {
            q: 'Apakah bahasa yang disertakan? Adakah anda menyokong bahasa selain bahasa Inggeris dan China?',
            a: 'Semua pakej concierge termasuk <strong>interpretasi perubatan di tapak bilingual Inggeris–China</strong>. Interpretasi Jepun–China disertakan untuk pelanggan berbahasa Jepun yang menempah melalui halaman Jepun. Jika anda memerlukan sokongan dalam <strong>bahasa lain</strong> (Arab, Rusia, Mongolia, Korea, Perancis, Sepanyol dsb.), jurubahasa khusus boleh diaturkan dengan kos tambahan — kadar adalah berdasarkan harga pasaran tempatan Shanghai untuk bahasa tersebut. Sila nyatakan keperluan bahasa anda apabila berbual dengan Sara supaya kami boleh memberikan sebut harga yang tepat.'
          },
          {
            q: 'Apakah polisi bayaran balik dan pembatalan anda?',
            a: 'Pembatalan yang dibuat <strong>14 hari atau lebih</strong> sebelum tarikh ketibaan yang dijadualkan menerima bayaran balik penuh selepas ditolak yuran pemprosesan yang kecil. Pembatalan dalam tempoh <strong>14 hari</strong> layak mendapat bayaran balik separa, kerana beberapa pengaturan hospital dan logistik mungkin telah dibuat. Pembatalan hari yang sama dan ketidakhadiran adalah tidak boleh dibayar balik. Kes yang melibatkan kecemasan perubatan sebenar atau penolakan visa dengan dokumentasi akan disemak secara individu — kami berusaha sebaik mungkin untuk berlaku adil. Terma bayaran balik khusus akan disertakan dalam pengesahan tempahan anda.'
          },
          {
            q: 'Bolehkah saya membawa ahli keluarga atau jurubahasa sendiri?',
            a: '<strong>Ya — membawa ahli keluarga atau jurubahasa sendiri dialu-alukan tanpa caj tambahan.</strong> Jururawat pendamping kami menumpukan pada koordinasi perubatan, navigasi hospital dan interpretasi tanpa mengira saiz kumpulan. Jika anda mengembara dengan kumpulan yang lebih besar dan memerlukan kenderaan yang lebih besar (cth. van berbanding sedan standard untuk jemputan lapangan terbang), bayaran naik taraf mungkin dikenakan berdasarkan jenis kenderaan dan ketersediaan. Beritahu Sara saiz kumpulan anda semasa menempah supaya kami boleh mengaturkan pengangkutan yang sesuai.'
          }
        ],
        refundPolicy: 'Polisi Bayaran Balik',
        medicalDisclaimer: 'Penafian Perubatan',
        independentDisclaimer: 'ShanghaiMed beroperasi sebagai penyedia perkhidmatan concierge bebas; kami tidak mengamalkan perubatan dan jururawat kami tidak menggantikan doktor yang merawat anda.'
      },
      freeConsultation: {
        badge: 'Konsultasi Percuma',
        title: 'Tempah Konsultasi Perubatan Percuma anda',
        subtitle: 'Bercakap dengan pasukan perubatan kami sebelum anda berangkat — kami akan memadankan anda dengan pakar yang sesuai, merancang perjalanan perubatan anda mengikut keperluan anda dan memberikan anggaran kos yang jelas di awal.',
        specialistMatchTitle: 'Pemadanan Pakar Terbaik',
        specialistMatchDesc: 'Kami menghubungkan anda dengan profesor dan ketua doktor terkemuka di hospital Grade 3A utama Shanghai — memadankan keadaan khusus anda dengan pakar yang sesuai untuk kes anda.',
        specialistMatchPoints: ['Pakar dipadankan dengan keadaan perubatan khusus anda — bukan pilihan lalai atau terdekat', 'Berhubung dengan profesor dan ketua doktor yang tepat di hospital Grade 3A awam Shanghai berdasarkan kes anda', 'Akses keutamaan ke hospital antarabangsa dan swasta terkemuka di Shanghai; temujanji biasanya boleh diaturkan dalam masa singkat', 'Semakan rekod perubatan pra-konsultasi sebelum anda tiba di Shanghai'],
        badges: [
          {
            title: 'Tiada Bayaran Diperlukan',
            desc: 'Konsultasi percuma, tiada yuran atau deposit pendahuluan'
          },
          {
            title: 'Tiada Kewajipan Membeli',
            desc: 'Berbual dengan kami tanpa tekanan untuk menempah sebarang perkhidmatan'
          },
          {
            title: 'Sulit',
            desc: 'Maklumat perubatan anda kekal peribadi dan tidak akan dikongsi tanpa kebenaran'
          }
        ],
        ctaTitle: 'Mulakan Konsultasi Percuma anda',
        ctaDesc: 'Hubungi kami di WhatsApp — pasukan perubatan kami akan membalas secepat mungkin, biasanya dalam beberapa jam pada waktu perniagaan.',
        ctaButton: 'Sembang di WhatsApp',
        hospitalNetworkTitle: 'Rangkaian Hospital Kami',
        hospitalNetworkDesc: 'Kami bekerjasama dengan 14 hospital awam Grade 3A (peringkat teratas) dan 5 hospital antarabangsa di Shanghai. Di luar rakan kongsi yang diketengahkan ini, kami boleh mengaturkan temujanji di semua hospital tertiari awam di seluruh Shanghai.',
        publicHospitals: 'Rakan Kongsi Awam Grade 3A (14)',
        privateHospitals: 'Rakan Kongsi Hospital Antarabangsa (5)',
        beyondTitle: 'Melangkaui Rangkaian Yang Diketengahkan',
        beyondDesc: 'Jika keadaan anda memerlukan pakar di mana-mana hospital tertiari Shanghai yang lain — termasuk yang tidak disenaraikan di sini — kami boleh menyelaraskan temujanji bagi pihak anda. Beritahu kami keperluan perubatan anda dan kami akan memadankan anda dengan pakar yang sesuai.'
      },
      insights: {
        badge: 'Blog',
        title: 'Insight Terkini',
        subtitle: 'Terokai artikel tentang penjagaan kesihatan di Shanghai, pelancongan perubatan dan kesejahteraan.',
        readMore: 'Baca Lagi',
        viewAll: 'Lihat Semua Artikel',
        featured: '★ Pilihan Utama'
      },
      blog: {
        title: 'Blog',
        subtitle: 'Terokai artikel tentang penjagaan kesihatan di Shanghai, pelancongan perubatan dan kesejahteraan.',
        filterContent: 'Tapis Kandungan',
        searchPlaceholder: 'Cari artikel...',
        search: 'Cari',
        clearFilters: 'Kosongkan penapis',
        categories: 'Kategori',
        popularTags: 'Tag Popular',
        noArticles: 'Tiada artikel ditemui sepadan dengan kriteria anda.',
        minRead: 'min bacaan',
        previous: 'Sebelumnya',
        next: 'Seterusnya',
        home: 'Laman Utama',
        blogNav: 'Blog',
        shareLabel: 'Kongsi:',
        previousArticle: 'Artikel Sebelumnya',
        nextArticle: 'Artikel Seterusnya',
        toc: 'Isi Kandungan',
        tocHide: 'Sembunyi',
        tocShow: 'Tunjuk',
        subscribeTitle: 'Langgan Surat Berita',
        subscribeDesc: 'Dapatkan tip kesihatan dan kemas kini terkini terus ke peti masuk anda.',
        emailPlaceholder: 'E-mel anda',
        subscribe: 'Langgan',
        subscribed: '✓ Berjaya melanggan! Terima kasih kerana menyertai surat berita kami.',
        shareArticle: 'Kongsi artikel ini',
        subscribeSuccessTitle: 'Langganan Berjaya!',
        subscribeSuccessDesc: 'Terima kasih kerana melanggan surat berita kami. Anda akan menerima tip kesihatan dan kemas kini terkini.',
        close: 'Tutup',
        alertEmailRequired: 'Sila masukkan alamat e-mel anda',
        alertSubscribeFail: 'Gagal melanggan. Sila cuba lagi kemudian.',
        alertError: 'Ralat berlaku. Sila cuba lagi kemudian.',
        pageHeaderTitle: 'Insight Penjagaan Kesihatan',
        pageHeaderSubtitle: 'Terokai artikel tentang pelancongan perubatan, perkhidmatan penjagaan kesihatan dan tip kesejahteraan di Shanghai',
        relatedArticles: 'Artikel Berkaitan',
        recommendedHospitals: 'Hospital Disyorkan',
        learnMore: 'Ketahui Lebih Lanjut',
        insurancePartnersLabel: 'Rakan Kongsi Insurans',
        bookTitle: 'Tempah Konsultasi Percuma',
        bookDesc: 'Penyelaras perubatan kami bersedia membantu anda dengan pemilihan hospital, pilihan rawatan dan pengaturan perjalanan.',
        whatsappConsult: 'Konsultasi WhatsApp',
        requestQuote: 'Minta Sebut Harga',
        categoryNames: {
          'health-checkups': 'Pemeriksaan Kesihatan',
          'preventive-healthcare': 'Penjagaan Kesihatan Pencegahan',
          'medical-tourism': 'Pelancongan Perubatan',
          'traditional-chinese-medicine': 'Perubatan Tradisional China',
          'shanghai-hospitals': 'Hospital Shanghai',
          'expat-healthcare': 'Penjagaan Kesihatan Ekspatriat',
          'patient-stories': 'Cerita Pesakit',
          'health-guides': 'Panduan Kesihatan'
        }
      },
      faq: {
        badge: 'Soalan Lazim',
        title: 'Soalan Lazim',
        subtitle: 'Semua yang anda perlu tahu tentang pelancongan perubatan di Shanghai.',
        items: [
          {
            question: 'Bagaimana saya memulakan proses pelancongan perubatan?',
            answer: 'Cukup isi borang hubungan kami dengan keadaan perubatan dan pilihan anda. Pasukan kami akan membalas dalam masa 24 jam dengan cadangan hospital dan anggaran kos.'
          },
          {
            question: 'Adakah anda membantu dengan permohonan visa?',
            answer: 'Ya, kami menyediakan bantuan visa untuk rawatan perubatan. Bagi negara yang layak, kami juga boleh membantu mengaturkan kemasukan transit tanpa visa 240 jam ke Shanghai.'
          },
          {
            question: 'Bagaimana jika saya tidak bertutur bahasa China?',
            answer: 'Semua penyelaras jururawat kami menyediakan terjemahan masa nyata semasa konsultasi perubatan. Laporan perubatan boleh disediakan dalam bahasa Inggeris atau bahasa pilihan anda.'
          },
          {
            question: 'Bagaimana pembayaran berfungsi?',
            answer: 'Anda membayar terus ke hospital. Bagi pemegang insurans, kami membantu dengan proses penyelesaian terus.'
          },
          {
            question: 'Apakah jenis rawatan yang anda khususkan?',
            answer: 'Kami menyokong pelbagai keperluan kesihatan, dari pemeriksaan pencegahan dan konsultasi pakar hingga ke penjagaan perubatan kompleks. Setiap pesakit mempunyai keperluan yang berbeza. Kami membantu mengenal pasti hospital, pakar dan laluan penjagaan yang paling sesuai untuk situasi anda.'
          }
        ],
        stillTitle: 'Masih ada soalan?',
        whatsappCta: 'Hubungi Kami di WhatsApp',
        viewAll: 'Lihat Soalan Lazim Penuh',
        viewAllDesc: 'Lihat semua jawapan tentang harga, insurans, visa, pembayaran dan penjagaan perubatan — lebih daripada sedozen soalan lazim.',
        browseFaq: 'Lihat semua soalan',
        whatsappDesc: 'Sembang terus dengan penyelaras jururawat kami. Dapatkan jawapan peribadi dalam bahasa Inggeris, Jepun atau Arab.'
      },
      contact: {
        title: 'Mulakan Pelancongan Perubatan anda Hari Ini',
        subtitle: 'Dapatkan konsultasi percuma daripada pasukan perubatan kami. AI Navigator kami bertindak balas serta-merta. Penyelaras manusia membuat susulan dalam masa 24 jam.',
        cta: 'Mulakan Pelancongan Perubatan anda Hari Ini',
        badge: 'Hubungi',
        whatsappTitle: 'WhatsApp',
        whatsappDesc: 'AI Navigator 24/7 + Respons Manusia 24 jam',
        whatsapp: 'Sembang di WhatsApp',
        lineTitle: 'LINE',
        lineDesc: 'Sembang terus dengan penyelaras kami',
        lineButton: 'Sembang di LINE',
        lineIdLabel: 'LINE ID',
        lineId: 'sara_shanghaimed',
        lineScanHint: 'Imbas kod QR untuk menambah kami di LINE',
        lineQrAlt: 'Kod QR LINE',
        locationLabel: 'Lokasi',
        locationValue: 'Shanghai, Republik Rakyat China',
        responseLabel: 'Masa Respons',
        responseValue: 'AI: Segera | Manusia: Dalam masa 24 jam',
        emailLabel: 'E-mel',
        nameLabel: 'Nama Penuh *',
        namePlaceholder: 'Nama penuh anda',
        emailLabel2: 'E-mel *',
        emailPlaceholder: 'e-mel@anda.com',
        countryLabel: 'Negara *',
        countryPlaceholder: 'Pilih negara anda *',
        otherCountry: 'Lain-lain',
        otherCountryPlaceholder: 'Masukkan negara anda *',
        countries: {
          'United States': 'Amerika Syarikat',
          'United Kingdom': 'United Kingdom',
          Canada: 'Kanada',
          Australia: 'Australia',
          Japan: 'Jepun',
          'South Korea': 'Korea Selatan',
          Singapore: 'Singapura',
          Germany: 'Jerman',
          France: 'Perancis'
        },
        phoneLabel: 'Telefon / WhatsApp',
        phonePlaceholder: 'Telefon / WhatsApp (pilihan)',
        medicalNeedsLabel: 'Keperluan Perubatan *',
        medicalNeedsPlaceholder: 'Pilih keperluan perubatan anda',
        medicalNeeds: {
          consultation: 'Konsultasi Perubatan',
          cardiology: 'Kardiologi',
          neurology: 'Neurologi',
          oncology: 'Onkologi',
          orthopedics: 'Ortopedik',
          checkup: 'Pemeriksaan Kesihatan',
          dental: 'Penjagaan Pergigian',
          plastic: 'Pembedahan Plastik',
          other: 'Lain-lain'
        },
        messageLabel: 'Mesej anda',
        messagePlaceholder: 'Sila huraikan keadaan perubatan atau pertanyaan anda...',
        submit: 'Dapatkan Konsultasi Percuma',
        submitting: 'Menghantar...',
        successTitle: 'Terima Kasih!',
        successMessage: 'Terima kasih! AI Navigator kami telah menerima pertanyaan anda dan pasukan kami akan membuat susulan dalam masa 24 jam. Anda juga boleh menghubungi kami di WhatsApp — kami akan membalas secepat mungkin.',
        sendAnother: 'Hantar Mesej Lain',
        privacyNote: 'Dengan menghantar borang ini, anda bersetuju dengan Dasar Privasi kami dan memberi kebenaran untuk dihubungi mengenai perkhidmatan perubatan kami.',
        alertFail: 'Gagal menghantar mesej. Sila cuba lagi atau hubungi kami melalui WhatsApp.'
      },
      footer: {
        tagline: 'Menghubungkan pesakit antarabangsa dengan institusi perubatan bertaraf dunia Shanghai dan profesional penjagaan kesihatan bilingual Inggeris–China.',
        columns: [
          {
            title: 'Mengenai',
            links: ['Tentang Kami', 'Pengasas Kami', 'Mengapa Shanghai', 'Rangkaian Kami', 'Pasukan Penjagaan']
          },
          {
            title: 'Rawatan',
            links: ['Hospital', 'Kepakaran', 'Panduan Harga']
          },
          {
            title: 'Sokongan',
            links: ['Bagaimana Ia Berfungsi', 'Soalan Lazim', 'Pusat Penyelidikan', 'Glosari', 'Hubungi Kami', 'Sokongan WhatsApp']
          },
          {
            title: 'Perundangan',
            links: ['Dasar Privasi', 'Syarat Perkhidmatan', 'Polisi Bayaran Balik', 'Dasar Editorial', 'Penafian Perubatan']
          }
        ],
        rights: 'Hak cipta terpelihara.',
        location: 'Shanghai, China'
      },
      agentChat: {
        welcome: 'Helo! Saya Navi, pelayar perubatan anda. Tanya saya apa-apa tentang hospital, rawatan, kos, visa atau merancang perjalanan perubatan anda di Shanghai.',
        questions: ['Apakah yang termasuk dalam perkhidmatan peribadi anda?', 'Bagaimana saya menempah temujanji?', 'Berapakah kos perkhidmatan satu-satu anda?'],
        inputPlaceholder: 'Tanya saya tentang penjagaan kesihatan di Shanghai...',
        chatTitle: 'Navi · Pelayar Perubatan',
        chatSubtitle: 'Pembantu AI 24/7'
      },
      pages: {
        treatmentsTitle: 'Rawatan & Hospital',
        treatmentsSubtitle: 'Akses kepada institusi perubatan terbaik Shanghai merangkumi semua kepakaran.',
        contactTitle: 'Hubungi Kami',
        contactSubtitle: 'Mulakan perjalanan perubatan anda hari ini. Pasukan kami bersedia membantu 24/7.',
        patientStoriesTitle: 'Cerita Pesakit',
        patientStoriesSubtitle: 'Pengalaman sebenar daripada pesakit yang mempercayai kami dengan kesihatan mereka.',
        whyShanghaiTitle: 'Mengapa Shanghai?',
        whyShanghaiSubtitle: 'Shanghai telah muncul sebagai destinasi utama untuk pesakit antarabangsa yang mencari penjagaan perubatan bertaraf dunia pada harga yang mampu dimiliki.',
        careTeamTitle: 'Pasukan Penjagaan Kami',
        careTeamSubtitle: 'Jururawat bertauliah ISPN yang berdedikasi untuk kesihatan dan keselesaan anda.',
        howItWorksTitle: 'Bagaimana Ia Berfungsi',
        howItWorksSubtitle: 'Proses kami yang diperkemas memudahkan akses kepada penjagaan perubatan bertaraf dunia di Shanghai.',
        faqTitle: 'Soalan Lazim',
        faqSubtitle: 'Semua yang anda perlu tahu tentang menerima penjagaan perubatan di Shanghai — kos, kualiti hospital, visa, insurans dan sokongan bilingual Inggeris–China.'
      },
      medicalDisclaimer: {
        title: 'Penafian Perubatan',
        lastUpdated: 'Kemas kini terakhir: 12 Oktober 2026',
        warning: 'ShanghaiMed bukanlah hospital, klinik atau penyedia perubatan. Kami tidak memberikan diagnosis perubatan, rawatan, preskripsi atau nasihat perubatan.',
        whatWeAre: {
          heading: 'Siapa kami',
          content: 'ShanghaiMed (dikendalikan oleh Shanghai Keling Information Technology Co., Ltd.) adalah perkhidmatan koordinasi perjalanan perubatan dan navigasi pesakit. Kami membantu pesakit antarabangsa merancang dan menavigasi lawatan perubatan ke hospital awam berlesen dan pakar di Shanghai, China. Peranan kami adalah bersifat logistik, linguistik dan pentadbiran.'
        },
        whatWeDoNotDo: {
          heading: 'Apa yang kami tidak lakukan',
          item1: 'Kami tidak mendiagnosis keadaan perubatan.',
          item2: 'Kami tidak mempreskripsikan ubat-ubatan.',
          item3: 'Kami tidak menjalankan atau mengarahkan prosedur atau rawatan perubatan.',
          item4: 'Kami tidak menjamin hasil klinikal, masa menunggu atau kejayaan mana-mana rawatan.',
          item5: 'Kami bukan pengganti kepada pertimbangan profesional doktor berlesen.'
        },
        clinicalResponsibility: {
          heading: 'Tanggungjawab klinikal',
          content: 'Semua keputusan klinikal — termasuk diagnosis, pelan rawatan, preskripsi, pembedahan, ujian dan kemasukan hospital — dibuat secara bebas oleh hospital yang merawat dan doktor berlesen di bawah tanggungjawab profesional mereka sendiri dan lesen perubatan China. Bayaran hospital dan rawatan dibayar oleh pesakit terus ke hospital di bawah terma hospital itu sendiri.'
        },
        contentInformational: {
          heading: 'Kandungan adalah untuk maklumat sahaja',
          content: 'Artikel, anggaran kos, profil doktor, maklumat kepakaran dan kandungan lain di Laman Web ini disediakan untuk tujuan maklumat umum dan perancangan sahaja. Ia bukan nasihat perubatan. Maklumat kesihatan berubah dengan cepat, dan kes individu berbeza; sentiasa bergantung kepada doktor yang merawat anda untuk keputusan mengenai penjagaan anda.'
        },
        emergencies: {
          heading: 'Kecemasan',
          content: 'Dalam kecemasan perubatan, hubungi perkhidmatan kecemasan tempatan anda dengan segera. Di tanah besar China, dail 120 untuk ambulans dan penjagaan perubatan kecemasan.'
        },
        noGuarantee: {
          heading: 'Tiada jaminan hospital-doktor',
          content: 'Kami berusaha secara munasabah untuk memadankan pesakit dengan hospital dan pakar yang berkelayakan berdasarkan maklumat yang diberikan. Walau bagaimanapun, jadual hospital berubah, doktor tertentu tidak sentiasa dapat dijamin dan keputusan rawatan muktamad terletak pada hospital.'
        },
        contact: {
          heading: 'Hubungi',
          company: 'Shanghai Keling Information Technology Co., Ltd.',
          address: 'Bilik 101, Tingkat 1, No. 2555 Changyang Road, Daerah Yangpu, Shanghai, China',
          email: 'hello@shanghaimedhealth.com'
        }
      },
      hospitals: {
        huashan: {
          description: 'Kedudukan #1 dalam dermatologi dan pembedahan saraf di seluruh negara. Salah satu hospital China yang paling diiktiraf di peringkat antarabangsa.',
          specialties: ['Pembedahan Saraf', 'Dermatologi', 'Penyakit Berjangkit'],
          internationalFeatures: 'Jabatan antarabangsa khusus, 24 penyedia insurans diterima',
          insuranceStatus: 'Penyelesaian Terus'
        },
        'children-fudan': {
          description: 'Pusat terkemuka untuk penjagaan neonatal dan penyakit jarang kanak-kanak.',
          specialties: ['Neonatologi', 'Pembedahan Pediatrik', 'Perubatan Rawatan Rapi'],
          internationalFeatures: 'Jabatan pediatrik antarabangsa sejak 1993, 19 penyedia insurans diterima',
          insuranceStatus: 'Penyelesaian Terus'
        },
        ruijin: {
          description: 'Perintis pemindahan sumsum tulang dan terapi CAR-T dengan hasil bertaraf dunia.',
          specialties: ['Hematologi', 'Endokrinologi', 'Pembedahan Luka & Terbakar'],
          internationalFeatures: 'Kadar remisi CAR-T 95.7%, wad antarabangsa khusus, 21 penyedia insurans diterima',
          insuranceStatus: 'Penyelesaian Terus'
        },
        'shanghai-general': {
          description: 'Salah satu hospital tertua dan paling berprestij di Shanghai. Jabatan oftalmologi dan urologi terkemuka.',
          specialties: ['Oftalmologi', 'Urologi', 'ENT & Pembedahan Kepala-Leher'],
          internationalFeatures: 'Pusat pesakit antarabangsa dengan kakitangan berbilang bahasa, 17 penyedia insurans diterima',
          insuranceStatus: 'Insurans Antarabangsa'
        },
        zhongshan: {
          description: 'Di bawah naungan Fudan University. Pusat kardiovaskular dengan bangunan pesakit antarabangsa berasingan dan kakitangan berbahasa Inggeris khusus.',
          specialties: ['Pembedahan Am', 'Gastroenterologi', 'Perubatan Kardiovaskular'],
          internationalFeatures: 'Bangunan pesakit antarabangsa bebas, 19 penyedia insurans diterima',
          insuranceStatus: 'Insurans Antarabangsa'
        },
        renji: {
          description: 'Di bawah naungan Shanghai Jiao Tong University. #1 gastroenterologi di seluruh negara selama 4 tahun berturut-turut. Pusat pemindahan hati terkemuka.',
          specialties: ['Gastroenterologi', 'Perubatan Reproduktif', 'Reumatologi'],
          internationalFeatures: 'Pusat perubatan reproduktif antarabangsa, 20 penyedia insurans diterima',
          insuranceStatus: 'Insurans Antarabangsa'
        },
        longhua: {
          description: 'Hospital Perubatan Tradisional China terulung. Perintis rasmi pelancongan perubatan TCM. Akupunktur, terapi herba dan pemulihan TCM.',
          specialties: ['Onkologi TCM', 'Ortopedik TCM', 'Pembedahan TCM'],
          internationalFeatures: 'Hospital perintis rasmi pelancongan perubatan TCM, 18 penyedia insurans diterima',
          insuranceStatus: 'Insurans Antarabangsa'
        },
        ipmch: {
          description: 'Di bawah naungan China Welfare Institute. Pusat terkemuka untuk kehamilan berisiko tinggi, perubatan janin dan perubatan reproduktif.',
          specialties: ['Perubatan Reproduktif', 'Obstetrik', 'Ginekologi'],
          internationalFeatures: 'Di bawah naungan China Welfare Institute, penjagaan bersalin antarabangsa, 19 penyedia insurans diterima',
          insuranceStatus: 'Insurans Antarabangsa'
        },
        scmc: {
          description: 'Di bawah naungan Shanghai Jiao Tong University. Pusat pembedahan jantung pediatrik terkemuka di China. Kerjasama dengan Project HOPE.',
          specialties: ['Pembedahan Jantung Pediatrik', 'Hematologi-Onkologi Pediatrik', 'Pediatrik Tingkah Laku Perkembangan'],
          internationalFeatures: 'Kerjasama dengan Project HOPE, pusat pediatrik antarabangsa, 23 penyedia insurans diterima',
          insuranceStatus: 'Insurans Antarabangsa'
        },
        sixth: {
          description: 'Perintis pembedahan pemasangan semula anggota sejak 1963. Pusat ortopedik dan endokrinologi terkemuka dengan pengiktirafan antarabangsa.',
          specialties: ['Ortopedik', 'Endokrinologi & Metabolisme', 'Perubatan Sukan'],
          internationalFeatures: 'Pusat pemasangan semula anggota pertama di dunia, 18 penyedia insurans diterima',
          insuranceStatus: 'Insurans Antarabangsa'
        },
        'first-maternity': {
          description: 'Hospital bersalin terulung di Shanghai. Penjagaan obstetrik dan neonatal komprehensif dengan sokongan pesakit antarabangsa.',
          specialties: ['Obstetrik', 'Perubatan Janin', 'Perubatan Reproduktif'],
          internationalFeatures: 'Perkhidmatan bersalin antarabangsa khusus, 18 penyedia insurans diterima',
          insuranceStatus: 'Insurans Antarabangsa'
        },
        xinhua: {
          description: 'Pusat terkemuka pembedahan tulang belakang dan pembedahan pediatrik dengan perkhidmatan antarabangsa penuh.',
          specialties: ['Pediatrik', 'Dermatologi', 'Pembedahan Am'],
          internationalFeatures: 'Jabatan antarabangsa komprehensif, 16 penyedia insurans diterima',
          insuranceStatus: 'Insurans Antarabangsa'
        },
        huadong: {
          description: 'Di bawah naungan Fudan University. Pusat perubatan geriatrik dan pemulihan terulung. Popular untuk program pemeriksaan kesihatan eksekutif.',
          specialties: ['Perubatan Geriatrik', 'Perubatan Pemulihan', 'Nutrisi Klinikal'],
          internationalFeatures: 'Pusat pemeriksaan kesihatan eksekutif, pemulihan antarabangsa, 17 penyedia insurans diterima',
          insuranceStatus: 'Insurans Antarabangsa'
        },
        ninth: {
          description: 'Hospital pergigian #1 di China. Jabatan Perubatan Antarabangsa khusus dibuka Januari 2024 di kampus Pudong dengan 100+ kerusi pergigian, CBCT, mikroskop dan peralatan laser. Pakar implan antarabangsa sepenuh masa Prof. Tonetti. Mekanisme MDT untuk kes kompleks. Telah merawat pesakit dari 40+ negara.',
          specialties: ['Pembedahan Mulut/Pergigian #1', 'Pembedahan Plastik & Rekonstruktif', 'Pembedahan Mulut & Maksilofasial'],
          internationalFeatures: 'Hospital pergigian terulung dengan 5 ahli akademi. Kedudukan #1 dalam pembedahan mulut dan pembedahan plastik di seluruh negara.',
          insuranceStatus: 'Penyelesaian Terus (8 syarikat insurans, 21 perkongsian)'
        },
        jiahui: {
          description: 'Hospital antarabangsa swasta terbesar di Shanghai dengan 500 katil. Berafiliasi dengan Massachusetts General Hospital. Pusat perubatan perkhidmatan penuh.',
          specialties: ['Onkologi', 'Pembedahan', 'Perubatan Am'],
          internationalFeatures: 'Gabungan dengan Massachusetts General Hospital, 500 katil',
          insuranceStatus: '50+ Insurans Antarabangsa'
        },
        unicare: {
          description: 'Sebahagian daripada Chindex Healthcare. Perkhidmatan penjagaan kesihatan komprehensif dengan penjagaan pesakit gaya Barat dan piawaian antarabangsa.',
          specialties: ['Perubatan Keluarga', 'Obstetrik', 'Pediatrik'],
          internationalFeatures: 'Jenama hospital antarabangsa yang telah mantap',
          insuranceStatus: '50+ Insurans Antarabangsa'
        },
        parkway: {
          description: 'Sebahagian daripada IHH Healthcare, salah satu kumpulan penjagaan kesihatan terbesar di dunia. Rangkaian insurans yang kukuh termasuk penyelesaian terus Prudential.',
          specialties: ['Pelbagai Kepakaran', 'Perubatan Keluarga', 'Diagnostik'],
          internationalFeatures: 'Kumpulan IHH Healthcare, pembayaran terus Prudential',
          insuranceStatus: 'Pembayaran Terus Prudential'
        },
        shine: {
          description: 'Ahli Mayo Clinic Care Network. Perkhidmatan kardiologi, gastroenterologi dan perubatan am komprehensif dengan piawaian antarabangsa.',
          specialties: ['Kardiologi', 'Gastroenterologi', 'Perubatan Am'],
          internationalFeatures: 'Perkongsian Mayo Clinic Care Network',
          insuranceStatus: '40+ Syarikat Insurans Antarabangsa'
        },
        raffles: {
          description: 'Sebahagian daripada kumpulan Surbana Jurong yang berpangkalan di Singapura. Menumpukan pada pelancongan perubatan dengan perkhidmatan pemeriksaan kesihatan yang komprehensif.',
          specialties: ['Pemeriksaan Eksekutif', 'Perubatan Am', 'Pelancongan Perubatan'],
          internationalFeatures: 'Kumpulan Surbana Jurong berpangkalan di Singapura',
          insuranceStatus: 'Insurans Antarabangsa'
        }
      },
      faqPage: {
        cta: {
          title: 'Masih ada soalan?',
          text: 'Dapatkan konsultasi percuma ShanghaiMed tanpa sebarang kewajipan. Pasukan kami membalas dalam masa 24 jam.',
          email: 'E-mel Kami',
          form: 'Borang Hubungan'
        }
      }
    },
  id: {
      nav: {
        whyShanghai: 'Mengapa Shanghai',
        howItWorks: 'Cara Kerja',
        treatments: 'Layanan',
        careTeam: 'Tim Perawatan',
        trust: 'Kepercayaan',
        items: ['Mengapa Shanghai', 'Cara Kerja', 'Jaringan Rumah Sakit', 'Tim Perawatan', 'Harga', 'Blog', 'Kontak']
      },
      whyShanghai: {
        badge: 'Mengapa Shanghai',
        title: 'Layanan Kesehatan Kelas Dunia, Dipermudah untuk Pasien Internasional',
        subtitle: 'Shanghai menawarkan akses ke rumah sakit terkemuka, dokter spesialis berpengalaman, harga transparan, dan dukungan personal untuk pasien internasional.',
        stats: [
          {
            label: 'Kunjungan Pasien Internasional Tahunan Shanghai'
          },
          {
            label: 'Rumah Sakit Percontohan Wisata Medis Grade-A Negeri'
          },
          {
            label: 'Kewarganegaraan yang Dilayani'
          },
          {
            label: 'Pertumbuhan Tahunan'
          }
        ],
        healthSystem: {
          title: 'Sistem Layanan Kesehatan yang Diakui Secara Internasional',
          items: ['Rumah sakit terkemuka yang melayani pasien dari seluruh dunia', 'Departemen internasional khusus dengan layanan berbahasa Inggris', 'Rumah sakit Grade 3A negeri yang ditujukan untuk layanan medis internasional', 'Akses ke dokter spesialis di bidang onkologi, kardiologi, neurologi, ortopedi, layanan kesuburan, dan lainnya']
        },
        travelAccess: {
          title: 'Akses Perjalanan dan Layanan Medis yang Mudah',
          items: ['Transit bebas visa 240 jam tersedia bagi wisatawan dari banyak negara', 'Bantuan visa medis untuk rencana perawatan jangka panjang', 'Penjemputan bandara dan bantuan transportasi', 'Koordinasi menyeluruh sepanjang perjalanan kesehatan Anda']
        },
        pricing: {
          title: 'Layanan Kesehatan Berkualitas Tinggi dengan Harga Kompetitif',
          subtitleLine1: 'Banyak pasien A.S. masih menanggung biaya kesehatan out-of-pocket yang signifikan meskipun memiliki asuransi.',
          subtitleLine2: 'Angka mencerminkan biaya out-of-pocket tipikal dan dapat bervariasi tergantung penyedia, lokasi, cakupan asuransi, dan rencana perawatan.',
          tableService: 'Layanan',
          tableShanghai: 'Shanghai',
          tableUs: 'Biaya Tipikal A.S.',
          rows: [
            {
              service: 'Pemeriksaan Kesehatan Eksekutif',
              shanghai: 'Mulai dari $700',
              us: 'Mulai dari $2,500'
            },
            {
              service: 'Pemindaian MRI',
              shanghai: 'Mulai dari $300',
              us: 'Mulai dari $1,000'
            },
            {
              service: 'Pemindaian CT',
              shanghai: 'Mulai dari $150',
              us: 'Mulai dari $500'
            },
            {
              service: 'Konsultasi Spesialis',
              shanghai: 'Mulai dari $70',
              us: 'Mulai dari $250'
            },
            {
              service: 'Perawatan IVF',
              shanghai: 'Mulai dari $4,200',
              us: 'Mulai dari $15,000'
            },
            {
              service: 'Implan Gigi',
              shanghai: 'Mulai dari $800',
              us: 'Mulai dari $3,000'
            }
          ],
          valueTitle: 'Mengapa Pasien Merasakan Nilai di Shanghai',
          valueItems: ['Akses ke rumah sakit dan dokter spesialis terkemuka', 'Harga transparan sebelum perawatan', 'Akses lebih cepat ke konsultasi, pencitraan, dan perawatan', 'Biaya kesehatan out-of-pocket yang lebih rendah', 'Dukungan dwibahasa Inggris–Tiongkok yang dipersonalisasi sepanjang perjalanan pasien'],
          notesTitle: 'Catatan Penting',
          notes: ['Harga disediakan untuk tujuan ilustrasi saja dan bukan merupakan penawaran.', 'Biaya medis aktual ditentukan oleh rumah sakit, dokter, dan rencana perawatan.', 'Harga A.S. mencerminkan biaya bayar mandiri tipikal dan dapat bervariasi secara signifikan berdasarkan cakupan asuransi dan lokasi.', 'Kurs valuta hanya untuk referensi dan dapat berfluktuasi.', 'Perawatan kompleks, operasi, perawatan kanker, dan layanan rawat inap memerlukan penawaran individual setelah peninjauan medis.']
        }
      },
      processFlow: {
        badge: 'Perjalanan Anda',
        title: 'Dari Pertanyaan hingga Perawatan',
        subtitle: 'Linimasa lengkap pengalaman wisata medis Anda di Shanghai, dengan dukungan profesional di setiap langkah.',
        phases: [
          {
            phase: 'Sebelum Anda Tiba',
            steps: [
              {
                title: 'Pertanyaan Online',
                description: 'AI Navigator merespons seketika'
              },
              {
                title: 'Penilaian Medis',
                description: 'Mengumpulkan gejala, merekomendasikan rumah sakit'
              },
              {
                title: 'Estimasi Biaya',
                description: 'Harga transparan untuk konsultasi & tes dasar'
              },
              {
                title: 'Visa & Perjalanan',
                description: 'Panduan transit bebas visa/240j, tips perjalanan'
              }
            ]
          },
          {
            phase: 'Selama Kunjungan Anda',
            steps: [
              {
                title: 'Penjemputan Bandara',
                description: 'Perawat dwibahasa Inggris–Tiongkok menyambut Anda'
              },
              {
                title: 'Kunjungan Rumah Sakit',
                description: 'Konsultasi & tes didampingi perawat'
              },
              {
                title: 'Perawatan',
                description: 'Layanan kelas dunia di rumah sakit terkemuka'
              },
              {
                title: 'Perawatan Rawat Inap',
                description: 'Dukungan keperawatan khusus (jika diperlukan)'
              }
            ]
          },
          {
            phase: 'Setelah Kunjungan Anda',
            steps: [
              {
                title: 'Pulang & Terjemahan',
                description: 'Laporan medis berbahasa Inggris'
              },
              {
                title: 'Tindak Lanjut',
                description: 'Dukungan jarak jauh, koordinasi resep'
              }
            ]
          }
        ]
      },
      careTeam: {
        title: 'Perawat Terdaftar Dwibahasa Inggris–Tiongkok',
        subtitle: 'Rekan perawatan kesehatan yang berdedikasi di setiap tahap perjalanan medis Anda di Shanghai.',
        badge: 'Tim Perawatan',
        expertTeam: 'Tim Perawatan Ahli',
        ispnCertified: 'Bersertifikat ISPN',
        ispnDesc: 'Standar Internasional untuk Perawat Profesional',
        ispnIssuer: 'Disertifikasi oleh CGFNS (USA)',
        credentialsTitle: 'Kredensial Perawat',
        servicesTitle: 'Layanan Keperawatan Kami',
        nursingCare: 'Asuhan Keperawatan Dwibahasa Inggris–Tiongkok',
        appointmentCoordination: 'Koordinasi Janji Temu',
        translationServices: 'Layanan Penerjemahan',
        transportation: 'Pengaturan Transportasi',
        medicalReports: 'Penerjemahan Laporan Medis',
        emergencySupport: 'Dukungan Darurat',
        services: [
          {
            title: 'Konsultasi Pra-Perawatan',
            description: 'Meninjau rekam medis, menjelaskan prosedur, dan berkoordinasi dengan dokter spesialis rumah sakit.'
          },
          {
            title: 'Penjadwalan Janji Temu',
            description: 'Mengatur konsultasi dokter, tes diagnostik, dan sesi perawatan.'
          },
          {
            title: 'Penerjemahan & Interpretasi',
            description: 'Interpretasi medis waktu nyata selama konsultasi dan prosedur.'
          },
          {
            title: 'Navigasi Rumah Sakit',
            description: 'Membimbing proses pendaftaran, checkout, dan pembayaran.'
          },
          {
            title: 'Dukungan Pasca Pulang',
            description: 'Instruksi obat, janji temu tindak lanjut, dan penerjemahan laporan medis.'
          },
          {
            title: 'Dukungan Asuransi',
            description: 'Memberikan dukungan administratif untuk pengecekan manfaat polis & konfirmasi cakupan asuransi rumah sakit'
          }
        ],
        credentials: [
          {
            name: 'Perawat Terdaftar (RN) Berlisensi',
            detail: 'Diverifikasi oleh Shanghai Health Commission'
          },
          {
            name: 'Sertifikasi Dwi Bahasa (Inggris–Tiongkok)',
            detail: 'Lancar berbahasa Inggris dan Tiongkok'
          },
          {
            name: 'JLPT N1 Certified',
            detail: '日本語能力試験 N1 — Japanese-Language Proficiency Test (tingkat tertinggi)'
          },
          {
            name: 'Interpretasi Medis',
            detail: 'Mendukung penerjemahan dokumen medis dan interpretasi di lokasi'
          },
          {
            name: 'Perawatan Pasien Internasional',
            detail: 'Pengalaman 10+ tahun'
          }
        ]
      },
      hero: {
        badge1: 'Rumah Sakit Asuransi Internasional',
        badge2: 'Perawat Terdaftar Dwibahasa Inggris–Tiongkok',
        badge3: 'Dukungan AI + Manusia 24/7',
        title: 'Layanan Kesehatan di Shanghai',
        titleHighlight: 'Dirancang untuk Anda',
        subtitle: 'Terhubung dengan rumah sakit ternama Tiongkok, perawat dwibahasa Inggris–Tiongkok, dan dukungan AI 24/7 — semuanya melalui satu platform.',
        cta: 'Pesan Konsultasi Gratis'
      },
      testimonials: {
        badge: 'Cerita Pasien',
        title: 'Kata Pasien Kami',
        subtitle: 'Cerita nyata dari pasien sejati yang mengubah perjalanan kesehatan mereka bersama kami.',
        patientsServed: 'Pasien Dilayani',
        countries: 'Negara',
        satisfactionRate: 'Tingkat Kepuasan',
        totalSavings: 'Total Penghematan',
        saved: 'Hemat'
      },
      treatments: {
        title: 'Rumah Sakit Terkemuka Shanghai',
        subtitle: 'Akses rumah sakit terkemuka di seluruh Shanghai, dengan rekomendasi yang disesuaikan dengan kebutuhan medis Anda.',
        hospitalNetwork: 'Jaringan Rumah Sakit',
        publicHospitals: 'Rumah Sakit Negeri Kelas 3A',
        privateHospitals: 'Rumah Sakit Internasional Swasta',
        viewAll: 'Lihat Semua Rumah Sakit',
        keyDepartments: 'Departemen Utama',
        certifications: 'Sertifikasi Internasional',
        insurance: 'Asuransi:',
        all: 'Semua',
        modalAllHospitals: 'Semua Rumah Sakit',
        modalHospitalsAvailable: 'rumah sakit tersedia',
        modalAllGradeA: 'akses ke semua rumah sakit Grade 3A Shanghai',
        modalAll: 'Semua Rumah Sakit',
        modalPublicGradeA: 'Negeri Grade-A',
        modalInternationalPrivate: 'Swasta Internasional',
        modalIns: 'Ins:',
        featuredTitle: 'Rumah Sakit Terpercaya',
        featuredSubtitle: 'Rumah sakit negeri teratas Tiongkok dengan departemen internasional khusus',
        learnMore: 'Pelajari Lebih Lanjut'
      },
      howItWorks: {
        title: 'Lima Langkah Sederhana',
        subtitle: 'Dari pertanyaan pertama Anda hingga tindak lanjut pasca-perawatan, kami mendukung setiap langkah perjalanan medis Anda di Shanghai.',
        badge: 'Cara Kerja',
        simpleProcess: 'Proses Sederhana',
        step1Title: 'Konsultasi AI',
        step1Desc: 'AI Navigator kami merespons seketika untuk memahami kebutuhan Anda.',
        step2Title: 'Penugasan Tim Perawatan',
        step2Desc: 'Seorang perawat berpengalaman akan ditugaskan sebagai koordinator perawatan Anda.',
        step3Title: 'Tiba di Shanghai',
        step3Desc: 'Dukungan lengkap termasuk transfer bandara dan pemesanan hotel.',
        step4Title: 'Perawatan & Pemulihan',
        step4Desc: 'Integrasi perawatan spesialis yang mulus, dukungan dwibahasa Inggris–Tiongkok, dan tindak lanjut pasca-perawatan.',
        steps: [
          {
            title: 'Kirim Pertanyaan',
            description: 'Isi formulir kontak kami dengan kebutuhan medis Anda. AI navigator kami tersedia 24/7.'
          },
          {
            title: 'Terima Konsultasi',
            description: 'Dalam waktu 24 jam, koordinator manusia memberikan pilihan rumah sakit dan estimasi biaya.'
          },
          {
            title: 'Konfirmasi & Berangkat',
            description: 'Setelah Anda siap melanjutkan, kami mengoordinasikan janji temu, logistik perjalanan, dan dukungan kedatangan.'
          },
          {
            title: 'Terima Perawatan',
            description: 'Perawat dwibahasa Inggris–Tiongkok Anda memberikan dukungan tatap muka sepanjang konsultasi, pemeriksaan, dan perawatan.'
          },
          {
            title: 'Perawatan Tindak Lanjut',
            description: 'Kami membantu dengan rekam medis, janji temu tindak lanjut, koordinasi resep, dan konsultasi jarak jauh.'
          }
        ]
      },
      trust: {
        badge: 'Mengapa Memilih Kami',
        title: 'Mitra Wisata Medis Tepercaya Anda',
        subtitle: 'Kami menyediakan layanan wisata medis yang profesional, transparan, dan tepercaya di Shanghai. Inilah yang membedakan kami.',
        ctaText: 'Siap merasakan layanan wisata medis yang profesional?',
        ctaButton: 'Mulai Wisata Medis Anda'
      },
      pricing: {
        badge: 'Harga',
        eyebrow: 'Tanpa Biaya Tersembunyi',
        title: 'Harga Concierge',
        subtitle: 'Satu biaya concierge yang transparan per orang. Biaya medis dibayarkan langsung ke rumah sakit dengan tarif lokal — kami tidak memungut komisi rumah sakit.',
        usdLabel: 'USD',
        whatsIncluded: 'Yang termasuk',
        freeCard: {
          name: 'Konsultasi Awal Gratis',
          subtitle: 'Dapatkan informasi yang Anda butuhkan sebelum berkomitmen — tanpa kewajiban, tanpa pembayaran.',
          badge: 'Gratis',
          unit: 'Gratis',
          scope: 'Bicara dengan Sara terlebih dahulu — tanpa kewajiban, tanpa pembayaran.',
          items: ['Penilaian kebutuhan medis', 'Rekomendasi rumah sakit & spesialis', 'Estimasi biaya perawatan', 'Panduan asuransi'],
          itemsLabel: 'Yang Anda dapatkan — 4 layanan',
          callout: '<strong>Panggilan tahap keputusan saja.</strong> Panggilan gratis ini membantu Anda menentukan rumah sakit, dokter, dan rentang anggaran yang tepat. Layanan di lokasi dimulai saat Anda memesan pendamping per jam atau paket concierge.',
          cta: 'Chat dengan Sara di WhatsApp'
        },
        hourlyCard: {
          name: 'Pendamping Rumah Sakit di Lokasi',
          subtitle: 'Untuk pasien yang sudah memesan dokter sendiri.',
          scope: 'Dipesan dan dibayar per jam, tersedia secara mandiri <em style="font-style:italic;color:#7b8c99">atau</em> sebagai tambahan untuk paket apa pun.',
          items: ['Rekan pendamping di lokasi di rumah sakit', 'Interpretasi medis di lokasi dwibahasa Inggris–Tiongkok · bahasa lain dikenakan biaya tambahan', 'Bimbingan langsung (antrean, pembayaran, pengambilan apotek)', 'Pesan konfirmasi hari yang sama setelah kunjungan'],
          itemsLabel: 'Yang termasuk — 4 layanan',
          callout: '<strong>Batas cakupan:</strong> Pendamping per jam hanya berupa pendamping di lokasi dan interpretasi Inggris–Tiongkok saja. Ini <strong>tidak</strong> termasuk penjadwalan janji temu, pencocokan dokter, penjemputan bandara, penerjemahan laporan, dukungan visa, pra-otorisasi asuransi, interpretasi dalam bahasa selain bahasa Inggris, atau tindak lanjut pasca-perawatan.',
          cta: 'Pesan pendamping per jam'
        },
        checkupCard: {
          subtitle: 'Perawat khusus untuk satu hari.'
        },
        essentialCard: {
          subtitle: 'Koordinasi lengkap mencakup janji temu, interpretasi, asuransi, dan logistik.'
        },
        surgeryCard: {
          subtitle: 'Dukungan terkoordinasi selama operasi dan masa rawat inap.'
        },
        essentialBadge: 'Paling Sering Dipilih',
        packages: [
          {
            name: 'Health Checkup Concierge',
            unit: 'per orang · 1 hari (siang hari)',
            description: 'Hanya untuk program pemeriksaan kesehatan 1 hari.',
            itemsLabel: 'Yang termasuk — 13 layanan',
            allItems: ['Perawat di lokasi sehari penuh (siang hari)', 'Bantuan koordinasi hotel', 'Penerjemahan & penjelasan laporan skrining kesehatan', 'Pengambilan & pengantaran obat', 'Bantuan transportasi lokal & pembayaran', 'Bantuan surat undangan visa', 'Dukungan asuransi', 'Penjemputan & pengantaran bandara · sedan standar', 'Interpretasi medis di lokasi dwibahasa Inggris–Tiongkok', 'Penjadwalan janji temu dokter', 'Pencocokan rumah sakit & spesialis', 'Dukungan WhatsApp khusus', 'Tindak lanjut jarak jauh 30 hari pasca-pemeriksaan']
          },
          {
            name: 'Essential Care Concierge',
            unit: 'per orang · 3 hari (siang hari)',
            description: 'Diperlukan untuk semua konsultasi spesialis dan kondisi medis.',
            itemsLabel: 'Yang termasuk — 13 layanan',
            allItems: ['Perawat di lokasi selama 3 hari (siang hari)', 'Peninjauan rekam medis pra-kunjungan', 'Pencocokan dokter & spesialis', 'Penjadwalan janji temu rumah sakit', 'Penjemputan & pengantaran bandara · sedan standar', 'Koordinasi hotel & transportasi lokal', 'Interpretasi medis di lokasi dwibahasa Inggris–Tiongkok', 'Navigasi di lokasi & bantuan pembayaran', 'Penerjemahan laporan medis', 'Pengambilan & pengantaran obat', 'Dukungan WhatsApp khusus selama kunjungan', 'Dukungan asuransi · pra-otorisasi', 'Tindak lanjut jarak jauh 30 hari pasca-perawatan']
          },
          {
            name: 'Surgery & Extended Care',
            unit: 'per orang · 5 hari (siang hari)',
            description: 'Diperlukan untuk operasi dan prosedur rawat inap.',
            itemsLabel: 'Yang termasuk — 16 layanan',
            allItems: ['Perawat di lokasi selama 5 hari (siang hari)', 'Koordinasi pra-pendaftaran', 'Pendampingan hari operasi', 'Kunjungan rawat inap selama menginap', 'Komunikasi keluarga & pembaruan perkembangan', 'Peninjauan rekam & pengarahan pra-operasi', 'Panduan pemilihan dokter & rumah sakit', 'Penjemputan & pengantaran bandara · sedan standar', 'Dukungan hotel & menginap jangka panjang', 'Interpretasi medis di lokasi dwibahasa Inggris–Tiongkok', 'Navigasi di lokasi & bantuan pembayaran/tagihan', 'Penerjemahan laporan operasi', 'Pengambilan & pengantaran obat', 'Dukungan WhatsApp khusus', 'Koordinasi asuransi & deposit operasi', 'Tindak lanjut 60 hari pasca-perawatan']
          }
        ],
        faqTitle: 'Tanya Jawab Harga & Layanan',
        faqSub: 'Pertanyaan umum tentang harga, cakupan, asuransi, dan situasi khusus.',
        viewAllFaq: 'Lihat semua tanya jawab harga & layanan',
        faqLinkDesc: 'Harga, asuransi, visa, pembayaran, dan perawatan medis — jawaban atas pertanyaan umum',
        faqItems: [
          {
            q: 'Apakah konsultasi gratis benar-benar gratis?',
            a: 'Ya. Konsultasi awal Anda melalui WhatsApp sepenuhnya <strong>gratis tanpa kewajiban</strong>. Kami menilai kebutuhan medis Anda, merekomendasikan rumah sakit dan spesialis, memberikan estimasi biaya, dan menjelaskan opsi asuransi — semuanya sebelum Anda membayar apa pun. Layanan di lokasi dimulai hanya saat Anda memesan pendamping per jam atau paket concierge.'
          },
          {
            q: 'Bisakah saya memesan pendamping per jam tanpa membeli paket?',
            a: 'Ya. <strong>Pendamping di lokasi $50/jam</strong> dirancang sebagai layanan mandiri untuk pasien yang sudah memesan dokter sendiri dan hanya membutuhkan pendampingan di rumah sakit. Ini juga tersedia sebagai tambahan untuk menambah jam pendamping di luar hari yang termasuk dalam paket concierge. Catatan: pendamping per jam hanya mencakup kehadiran di lokasi dan interpretasi Inggris–Tiongkok — penjadwalan, pencocokan dokter, transfer bandara, dan koordinasi asuransi memerlukan paket concierge. Sebagai tambahan paket concierge, jam pendamping tambahan di luar hari yang termasuk juga dikenakan biaya $50/jam.'
          },
          {
            q: 'Apa yang termasuk dalam paket Essential $1,000?',
            a: '<strong>Essential Care Concierge mencakup 3 hari pendampingan siang penuh</strong>: peninjauan rekam medis pra-kunjungan, pencocokan dokter, penjadwalan multi-janji temu, interpretasi di lokasi dwibahasa Inggris–Tiongkok di setiap kunjungan, navigasi rumah sakit, penjemputan &amp; pengantaran bandara dengan sedan standar (kenderaan khusus dikenakan biaya tambahan), penerjemahan laporan medis, pengambilan &amp; pengantaran obat, dukungan WhatsApp khusus selama menginap, dukungan asuransi termasuk pengecekan manfaat polis dan surat pra-otorisasi, serta tindak lanjut jarak jauh 30 hari pasca-perawatan. Paket ini diperlukan untuk semua konsultasi spesialis dan kondisi medis apa pun.'
          },
          {
            q: 'Apakah Anda menangani asuransi kesehatan?',
            a: 'Kami menyediakan <strong>dukungan asuransi</strong>, termasuk mengecek manfaat polis Anda, membantu mendapatkan surat pra-otorisasi, dan mengoordinasikan dokumen rumah sakit. Di mana perusahaan asuransi Anda memiliki pengaturan penagihan langsung dengan rumah sakit, kami membantu mengoordinasikan prosesnya. Di mana penagihan langsung tidak tersedia, Anda membayar rumah sakit secara langsung dan kami menyediakan dokumentasi yang dibutuhkan perusahaan asuransi Anda untuk penggantian biaya. Kami tidak menjamin cakupan atau persetujuan penagihan langsung — keputusan dibuat oleh perusahaan asuransi Anda.'
          },
          {
            q: 'Apakah biaya medis termasuk dalam harga concierge?',
            a: 'Tidak. Biaya concierge hanyalah untuk layanan koordinasi dan pendampingan kami. <strong>Biaya medis (konsultasi dokter, biaya rumah sakit, tes laboratorium, obat-obatan, operasi) dibayar langsung ke rumah sakit dengan tarif lokal</strong>. Kami memberikan estimasi biaya yang jelas sebelum Anda tiba, dan Anda akan mengetahui harga yang dipublikasikan rumah sakit sebelum setiap prosedur. Kami tidak memungut komisi rumah sakit.'
          },
          {
            q: 'Apakah Anda mendukung situasi darurat atau di luar jam kerja?',
            a: 'Dalam keadaan darurat medis, <strong>segera hubungi 120</strong> dan pergi ke rumah sakit terdekat — paket concierge tidak mencakup layanan medis darurat. Setelah Anda berada di rumah sakit, kami menawarkan <strong>koordinasi darurat di lokasi 24/7</strong> dengan biaya tambahan: <strong>Panggilan darurat $300 (tersedia 24/7, termasuk 4 jam pertama)</strong>, kemudian <strong>$100/jam</strong> untuk dukungan pendamping di lokasi tambahan. Ini mencakup pengiriman segera, koordinasi perawat senior, komunikasi keluarga, dan navigasi rumah sakit selama darurat. Hubungi Sara di WhatsApp sesegera mungkin setelah menghubungi 120.'
          },
          {
            q: 'Bahasa apa saja yang termasuk? Apakah Anda mendukung bahasa selain Inggris dan Tiongkok?',
            a: 'Semua paket concierge mencakup <strong>interpretasi medis di lokasi dwibahasa Inggris–Tiongkok</strong>. Interpretasi Jepang–Tiongkok termasuk untuk klien berbahasa Jepang yang memesan melalui halaman Jepang. Jika Anda membutuhkan dukungan dalam <strong>bahasa lain</strong> (Arab, Rusia, Mongolia, Korea, Prancis, Spanyol, dsb.), penerjemah khusus dapat diatur dengan biaya tambahan — tarif didasarkan pada harga pasar lokal Shanghai untuk bahasa tersebut. Sebutkan kebutuhan bahasa Anda saat mengobrol dengan Sara agar kami dapat memberikan penawaran yang akurat.'
          },
          {
            q: 'Bagaimana kebijakan pengembalian dana dan pembatalan Anda?',
            a: 'Pembatalan yang dilakukan <strong>14 hari atau lebih</strong> sebelum tanggal kedatangan yang dijadwalkan menerima pengembalian dana penuh setelah dikurangi biaya pemrosesan kecil. Pembatalan dalam <strong>14 hari</strong> memenuhi syarat pengembalian dana sebagian, karena beberapa pengaturan rumah sakit dan logistik mungkin telah dilakukan. Pembatalan hari yang sama dan ketidakhadiran tidak dapat dikembalikan. Kasus yang melibatkan darurat medis nyata atau penolakan visa dengan dokumentasi akan ditinjau secara individual — kami berusaha sebaik mungkin untuk bersikap adil. Syarat pengembalian dana spesifik akan disertakan dalam konfirmasi pemesanan Anda.'
          },
          {
            q: 'Bisakah saya membawa anggota keluarga atau penerjemah sendiri?',
            a: '<strong>Ya — membawa anggota keluarga atau penerjemah sendiri dipersilakan tanpa biaya tambahan.</strong> Pendamping perawat kami berfokus pada koordinasi medis, navigasi rumah sakit, dan interpretasi tanpa memandang ukuran rombongan. Jika Anda bepergian dengan rombongan lebih besar dan membutuhkan kenderaan yang lebih besar (misalnya, van alih-alih sedan standar untuk penjemputan bandara), biaya peningkatan mungkin berlaku tergantung jenis kenderaan dan ketersediaan. Beri tahu Sara ukuran rombongan Anda saat memesan agar kami dapat mengatur transportasi yang tepat.'
          }
        ],
        refundPolicy: 'Kebijakan Pengembalian Dana',
        medicalDisclaimer: 'Pernyataan Penyangkalan Medis',
        independentDisclaimer: 'ShanghaiMed beroperasi sebagai penyedia layanan concierge independen; kami tidak mempraktikkan kedokteran dan perawat kami tidak menggantikan dokter yang merawat Anda.'
      },
      freeConsultation: {
        badge: 'Konsultasi Gratis',
        title: 'Pesan Konsultasi Medis Gratis Anda',
        subtitle: 'Bicaralah dengan tim medis kami sebelum Anda berangkat — kami akan mempertemukan Anda dengan spesialis yang tepat, merencanakan perjalanan medis sesuai kebutuhan Anda, dan memberikan estimasi biaya yang jelas di awal.',
        specialistMatchTitle: 'Pencocokan Spesialis Terbaik',
        specialistMatchDesc: 'Kami menghubungkan Anda dengan profesor dan dokter kepala terkemuka di rumah sakit Grade 3A utama Shanghai — mencocokkan kondisi spesifik Anda dengan spesialis yang tepat untuk kasus Anda.',
        specialistMatchPoints: ['Spesialis dicocokkan dengan kondisi medis spesifik Anda — bukan pilihan default atau terdekat', 'Terhubung dengan profesor dan dokter kepala yang tepat di rumah sakit Grade 3A negeri Shanghai berdasarkan kasus Anda', 'Akses prioritas ke rumah sakit internasional dan swasta terkemuka di Shanghai; janji temu biasanya dapat diatur dalam waktu singkat', 'Peninjauan rekam medis pra-konsultasi sebelum Anda tiba di Shanghai'],
        badges: [
          {
            title: 'Tanpa Pembayaran',
            desc: 'Konsultasi gratis, tanpa biaya pendahuluan atau deposit'
          },
          {
            title: 'Tanpa Kewajiban Membeli',
            desc: 'Bicaralah dengan kami tanpa tekanan untuk memesan layanan apa pun'
          },
          {
            title: 'Kerahasiaan',
            desc: 'Informasi medis Anda tetap bersifat pribadi dan tidak pernah dibagikan tanpa persetujuan'
          }
        ],
        ctaTitle: 'Mulai Konsultasi Gratis Anda',
        ctaDesc: 'Hubungi kami di WhatsApp — tim medis kami akan membalas secepat mungkin, biasanya dalam beberapa jam pada jam kerja.',
        ctaButton: 'Chat di WhatsApp',
        hospitalNetworkTitle: 'Jaringan Rumah Sakit Kami',
        hospitalNetworkDesc: 'Kami bermitra dengan 14 rumah sakit negeri Grade 3A (tingkat teratas) dan 5 rumah sakit internasional di Shanghai. Di luar mitra unggulan ini, kami dapat mengatur janji temu di semua rumah sakit tersier negeri di seluruh Shanghai.',
        publicHospitals: 'Mitra Negeri Grade 3A (14)',
        privateHospitals: 'Mitra Rumah Sakit Internasional (5)',
        beyondTitle: 'Melampaui Jaringan Unggulan',
        beyondDesc: 'Jika kondisi Anda memerlukan spesialis di rumah sakit tersier Shanghai lainnya — termasuk yang tidak tercantum di sini — kami dapat mengoordinasikan janji temu atas nama Anda. Beritahu kami kebutuhan medis Anda dan kami akan mempertemukan Anda dengan spesialis yang tepat.'
      },
      insights: {
        badge: 'Blog',
        title: 'Wawasan Terbaru',
        subtitle: 'Temukan artikel tentang layanan kesehatan di Shanghai, wisata medis, dan kebugaran.',
        readMore: 'Baca Selengkapnya',
        viewAll: 'Lihat Semua Artikel',
        featured: '★ Unggulan'
      },
      blog: {
        title: 'Blog',
        subtitle: 'Temukan artikel tentang layanan kesehatan di Shanghai, wisata medis, dan kebugaran.',
        filterContent: 'Filter Konten',
        searchPlaceholder: 'Cari artikel...',
        search: 'Cari',
        clearFilters: 'Hapus filter',
        categories: 'Kategori',
        popularTags: 'Tag Populer',
        noArticles: 'Tidak ada artikel yang cocok dengan kriteria Anda.',
        minRead: 'menit baca',
        previous: 'Sebelumnya',
        next: 'Berikutnya',
        home: 'Beranda',
        blogNav: 'Blog',
        shareLabel: 'Bagikan:',
        previousArticle: 'Artikel Sebelumnya',
        nextArticle: 'Artikel Berikutnya',
        toc: 'Daftar Isi',
        tocHide: 'Sembunyikan',
        tocShow: 'Tampilkan',
        subscribeTitle: 'Berlangganan Newsletter',
        subscribeDesc: 'Dapatkan tips kesehatan dan pembaruan terbaru yang dikirim ke kotak masuk Anda.',
        emailPlaceholder: 'Email Anda',
        subscribe: 'Berlangganan',
        subscribed: '✓ Berhasil berlangganan! Terima kasih telah bergabung dengan newsletter kami.',
        shareArticle: 'Bagikan artikel ini',
        subscribeSuccessTitle: 'Berlangganan Berhasil!',
        subscribeSuccessDesc: 'Terima kasih telah berlangganan newsletter kami. Anda akan menerima tips kesehatan dan pembaruan terbaru.',
        close: 'Tutup',
        alertEmailRequired: 'Silakan masukkan alamat email Anda',
        alertSubscribeFail: 'Gagal berlangganan. Silakan coba lagi nanti.',
        alertError: 'Terjadi kesalahan. Silakan coba lagi nanti.',
        pageHeaderTitle: 'Wawasan Kesehatan',
        pageHeaderSubtitle: 'Temukan artikel tentang wisata medis, layanan kesehatan, dan tips kebugaran di Shanghai',
        relatedArticles: 'Artikel Terkait',
        recommendedHospitals: 'Rumah Sakit yang Direkomendasikan',
        learnMore: 'Pelajari Lebih Lanjut',
        insurancePartnersLabel: 'Mitra Asuransi',
        bookTitle: 'Pesan Konsultasi Gratis',
        bookDesc: 'Koordinator medis kami siap membantu Anda dengan pemilihan rumah sakit, pilihan perawatan, dan pengaturan perjalanan.',
        whatsappConsult: 'Konsultasi WhatsApp',
        requestQuote: 'Minta Penawaran',
        categoryNames: {
          'health-checkups': 'Pemeriksaan Kesehatan',
          'preventive-healthcare': 'Layanan Kesehatan Pencegahan',
          'medical-tourism': 'Wisata Medis',
          'traditional-chinese-medicine': 'Pengobatan Tradisional Tiongkok',
          'shanghai-hospitals': 'Rumah Sakit Shanghai',
          'expat-healthcare': 'Layanan Kesehatan Ekspatriat',
          'patient-stories': 'Cerita Pasien',
          'health-guides': 'Panduan Kesehatan'
        }
      },
      faq: {
        badge: 'FAQ',
        title: 'Pertanyaan yang Sering Diajukan',
        subtitle: 'Semua yang perlu Anda ketahui tentang wisata medis di Shanghai.',
        items: [
          {
            question: 'Bagaimana cara memulai proses wisata medis?',
            answer: 'Cukup isi formulir kontak kami dengan kondisi medis dan preferensi Anda. Tim kami akan merespons dalam 24 jam dengan rekomendasi rumah sakit dan estimasi biaya.'
          },
          {
            question: 'Apakah Anda membantu dengan aplikasi visa?',
            answer: 'Ya, kami menyediakan bantuan visa untuk perawatan medis. Untuk negara yang memenuhi syarat, kami juga dapat membantu mengatur masuk transit bebas visa 240 jam ke Shanghai.'
          },
          {
            question: 'Bagaimana jika saya tidak berbicara bahasa Tiongkok?',
            answer: 'Semua koordinator perawat kami menyediakan terjemahan waktu nyata selama konsultasi medis. Laporan medis dapat disediakan dalam bahasa Inggris atau bahasa pilihan Anda.'
          },
          {
            question: 'Bagaimana cara kerja pembayaran?',
            answer: 'Anda membayar langsung ke rumah sakit. Bagi pemegang asuransi, kami membantu proses penyelesaian langsung.'
          },
          {
            question: 'Jenis perawatan apa yang Anda spesialisasikan?',
            answer: 'Kami mendukung berbagai kebutuhan kesehatan, dari pemeriksaan pencegahan dan konsultasi spesialis hingga perawatan medis kompleks. Setiap pasien memiliki kebutuhan yang berbeda. Kami membantu mengidentifikasi rumah sakit, spesialis, dan jalur perawatan yang paling sesuai untuk situasi Anda.'
          }
        ],
        stillTitle: 'Masih ada pertanyaan?',
        whatsappCta: 'Hubungi Kami di WhatsApp',
        viewAll: 'Lihat FAQ Lengkap',
        viewAllDesc: 'Lihat semua jawaban tentang harga, asuransi, visa, pembayaran, dan perawatan medis — lebih dari selusin pertanyaan umum.',
        browseFaq: 'Lihat semua pertanyaan',
        whatsappDesc: 'Chat langsung dengan koordinator perawat kami. Dapatkan jawaban yang dipersonalisasi dalam bahasa Inggris, Jepang, atau Arab.'
      },
      contact: {
        title: 'Mulai Wisata Medis Anda Hari Ini',
        subtitle: 'Dapatkan konsultasi gratis dari tim medis kami. AI Navigator kami merespons seketika. Koordinator manusia menindaklanjuti dalam 24 jam.',
        cta: 'Mulai Wisata Medis Anda Hari Ini',
        badge: 'Kontak',
        whatsappTitle: 'WhatsApp',
        whatsappDesc: 'AI Navigator 24/7 + Respons Manusia 24 jam',
        whatsapp: 'Chat di WhatsApp',
        lineTitle: 'LINE',
        lineDesc: 'Chat langsung dengan koordinator kami',
        lineButton: 'Chat di LINE',
        lineIdLabel: 'LINE ID',
        lineId: 'sara_shanghaimed',
        lineScanHint: 'Pindai kode QR untuk menambahkan kami di LINE',
        lineQrAlt: 'Kode QR LINE',
        locationLabel: 'Lokasi',
        locationValue: 'Shanghai, Republik Rakyat Tiongkok',
        responseLabel: 'Waktu Respons',
        responseValue: 'AI: Seketika | Manusia: Dalam 24 jam',
        emailLabel: 'Email',
        nameLabel: 'Nama Lengkap *',
        namePlaceholder: 'Nama lengkap Anda',
        emailLabel2: 'Email *',
        emailPlaceholder: 'email@anda.com',
        countryLabel: 'Negara *',
        countryPlaceholder: 'Pilih negara Anda *',
        otherCountry: 'Lainnya',
        otherCountryPlaceholder: 'Masukkan negara Anda *',
        countries: {
          'United States': 'Amerika Serikat',
          'United Kingdom': 'Britania Raya',
          Canada: 'Kanada',
          Australia: 'Australia',
          Japan: 'Jepang',
          'South Korea': 'Korea Selatan',
          Singapore: 'Singapura',
          Germany: 'Jerman',
          France: 'Prancis'
        },
        phoneLabel: 'Telepon / WhatsApp',
        phonePlaceholder: 'Telepon / WhatsApp (opsional)',
        medicalNeedsLabel: 'Kebutuhan Medis *',
        medicalNeedsPlaceholder: 'Pilih kebutuhan medis Anda',
        medicalNeeds: {
          consultation: 'Konsultasi Medis',
          cardiology: 'Kardiologi',
          neurology: 'Neurologi',
          oncology: 'Onkologi',
          orthopedics: 'Ortopedi',
          checkup: 'Pemeriksaan Kesehatan',
          dental: 'Perawatan Gigi',
          plastic: 'Bedah Plastik',
          other: 'Lainnya'
        },
        messageLabel: 'Pesan Anda',
        messagePlaceholder: 'Silakan jelaskan kondisi medis atau pertanyaan Anda...',
        submit: 'Dapatkan Konsultasi Gratis',
        submitting: 'Mengirim...',
        successTitle: 'Terima Kasih!',
        successMessage: 'Terima kasih! AI Navigator kami telah menerima pertanyaan Anda dan tim kami akan menindaklanjuti dalam 24 jam. Anda juga dapat menghubungi kami di WhatsApp — kami akan merespons secepat mungkin.',
        sendAnother: 'Kirim Pesan Lain',
        privacyNote: 'Dengan mengirimkan formulir ini, Anda menyetujui Kebijakan Privasi kami dan memberikan persetujuan untuk dihubungi mengenai layanan medis kami.',
        alertFail: 'Gagal mengirim pesan. Silakan coba lagi atau hubungi kami melalui WhatsApp.'
      },
      footer: {
        tagline: 'Menghubungkan pasien internasional dengan institusi medis kelas dunia Shanghai dan tenaga profesional kesehatan dwibahasa Inggris–Tiongkok.',
        columns: [
          {
            title: 'Tentang',
            links: ['Tentang Kami', 'Pendiri Kami', 'Mengapa Shanghai', 'Jaringan Kami', 'Tim Perawatan']
          },
          {
            title: 'Layanan',
            links: ['Rumah Sakit', 'Spesialisasi', 'Panduan Harga']
          },
          {
            title: 'Dukungan',
            links: ['Cara Kerja', 'FAQ', 'Pustaka Penelitian', 'Glosarium', 'Hubungi Kami', 'Dukungan WhatsApp']
          },
          {
            title: 'Hukum',
            links: ['Kebijakan Privasi', 'Syarat Layanan', 'Kebijakan Pengembalian Dana', 'Kebijakan Editorial', 'Pernyataan Penyangkalan Medis']
          }
        ],
        rights: 'Hak cipta dilindungi.',
        location: 'Shanghai, Tiongkok'
      },
      agentChat: {
        welcome: 'Halo! Saya Navi, navigator medis Anda. Tanya saya apa saja tentang rumah sakit, perawatan, biaya, visa, atau merencanakan perjalanan medis Anda di Shanghai.',
        questions: ['Apa yang termasuk dalam layanan personal Anda?', 'Bagaimana cara memesan janji temu?', 'Berapa biaya layanan satu lawan satu Anda?'],
        inputPlaceholder: 'Tanya saya tentang layanan kesehatan di Shanghai...',
        chatTitle: 'Navi · Navigator Medis',
        chatSubtitle: 'Asisten AI 24/7'
      },
      pages: {
        treatmentsTitle: 'Layanan & Rumah Sakit',
        treatmentsSubtitle: 'Akses ke institusi medis terbaik Shanghai di semua spesialisasi.',
        contactTitle: 'Hubungi Kami',
        contactSubtitle: 'Mulai perjalanan medis Anda hari ini. Tim kami siap membantu 24/7.',
        patientStoriesTitle: 'Cerita Pasien',
        patientStoriesSubtitle: 'Pengalaman nyata dari pasien yang mempercayakan kesehatan mereka kepada kami.',
        whyShanghaiTitle: 'Mengapa Shanghai?',
        whyShanghaiSubtitle: 'Shanghai telah muncul sebagai destinasi utama bagi pasien internasional yang mencari layanan medis kelas dunia dengan harga terjangkau.',
        careTeamTitle: 'Tim Perawatan Kami',
        careTeamSubtitle: 'Perawat bersertifikat ISPN yang berdedikasi untuk kesehatan dan kenyamanan Anda.',
        howItWorksTitle: 'Cara Kerja',
        howItWorksSubtitle: 'Proses kami yang disederhanakan memudahkan akses ke layanan medis kelas dunia di Shanghai.',
        faqTitle: 'Pertanyaan yang Sering Diajukan',
        faqSubtitle: 'Semua yang perlu Anda ketahui tentang menerima perawatan medis di Shanghai — biaya, kualitas rumah sakit, visa, asuransi, dan dukungan dwibahasa Inggris–Tiongkok.'
      },
      medicalDisclaimer: {
        title: 'Pernyataan Penyangkalan Medis',
        lastUpdated: 'Terakhir diperbarui: 12 Oktober 2026',
        warning: 'ShanghaiMed bukanlah rumah sakit, klinik, atau penyedia layanan medis. Kami tidak memberikan diagnosis medis, perawatan, resep, atau saran medis.',
        whatWeAre: {
          heading: 'Siapa kami',
          content: 'ShanghaiMed (dioperasikan oleh Shanghai Keling Information Technology Co., Ltd.) adalah layanan koordinasi perjalanan medis dan navigasi pasien. Kami membantu pasien internasional merencanakan dan menavigasi kunjungan medis ke rumah sakit negeri berlisensi dan dokter spesialis di Shanghai, Tiongkok. Peran kami bersifat logistik, linguistik, dan administratif.'
        },
        whatWeDoNotDo: {
          heading: 'Apa yang tidak kami lakukan',
          item1: 'Kami tidak mendiagnosis kondisi medis.',
          item2: 'Kami tidak meresepkan obat-obatan.',
          item3: 'Kami tidak melakukan atau mengarahkan prosedur atau perawatan medis.',
          item4: 'Kami tidak menjamin hasil klinis, waktu tunggu, atau keberhasilan perawatan apa pun.',
          item5: 'Kami bukan pengganti pertimbangan profesional dokter berlisensi.'
        },
        clinicalResponsibility: {
          heading: 'Tanggung jawab klinis',
          content: 'Semua keputusan klinis — termasuk diagnosis, rencana perawatan, resep, operasi, pengujian, dan pendaftaran rumah sakit — dibuat secara mandiri oleh rumah sakit yang merawat dan dokter berlisensinya di bawah tanggung jawab profesional mereka sendiri dan lisensi medis Tiongkok. Biaya rumah sakit dan perawatan dibayar oleh pasien langsung ke rumah sakit berdasarkan ketentuan rumah sakit itu sendiri.'
        },
        contentInformational: {
          heading: 'Konten bersifat informasional saja',
          content: 'Artikel, estimasi biaya, profil dokter, informasi spesialisasi, dan konten lain di Situs Web ini disediakan untuk tujuan informasi umum dan perencanaan saja. Konten tersebut bukanlah saran medis. Informasi kesehatan berubah dengan cepat, dan kasus individu berbeda; selalu andalkan dokter yang merawat Anda untuk keputusan mengenai perawatan Anda.'
        },
        emergencies: {
          heading: 'Keadaan Darurat',
          content: 'Dalam keadaan darurat medis, segera hubungi layanan darurat setempat. Di Tiongkok daratan, hubungi 120 untuk ambulans dan perawatan medis darurat.'
        },
        noGuarantee: {
          heading: 'Tidak ada jaminan rumah sakit-dokter',
          content: 'Kami melakukan upaya wajar untuk mempertemukan pasien dengan rumah sakit dan spesialis yang memenuhi syarat berdasarkan informasi yang diberikan. Namun, jadwal rumah sakit dapat berubah, dokter tertentu tidak selalu dapat dijamin, dan keputusan perawatan akhir berada di tangan rumah sakit.'
        },
        contact: {
          heading: 'Kontak',
          company: 'Shanghai Keling Information Technology Co., Ltd.',
          address: 'Kamar 101, Lantai 1, No. 2555 Changyang Road, Distrik Yangpu, Shanghai, Tiongkok',
          email: 'hello@shanghaimedhealth.com'
        }
      },
      hospitals: {
        huashan: {
          description: 'Peringkat #1 dalam dermatologi dan bedah saraf secara nasional. Salah satu rumah sakit Tiongkok yang paling diakui secara internasional.',
          specialties: ['Bedah Saraf', 'Dermatologi', 'Penyakit Menular'],
          internationalFeatures: 'Departemen internasional khusus, 24 penyedia asuransi diterima',
          insuranceStatus: 'Penyelesaian Langsung'
        },
        'children-fudan': {
          description: 'Pusat terkemuka untuk perawatan neonatal dan penyakit langka anak.',
          specialties: ['Neonatologi', 'Bedah Anak', 'Kedokteran Perawatan Kritis'],
          internationalFeatures: 'Departemen pediatrik internasional sejak 1993, 19 penyedia asuransi diterima',
          insuranceStatus: 'Penyelesaian Langsung'
        },
        ruijin: {
          description: 'Pelopor transplantasi sumsum tulang dan terapi CAR-T dengan hasil bertaraf dunia.',
          specialties: ['Hematologi', 'Endokrinologi', 'Perawatan Luka & Luka Bakar'],
          internationalFeatures: 'Tingkat remisi CAR-T 95,7%, bangsal internasional khusus, 21 penyedia asuransi diterima',
          insuranceStatus: 'Penyelesaian Langsung'
        },
        'shanghai-general': {
          description: 'Salah satu rumah sakit tertua dan paling prestisius di Shanghai. Departemen oftalmologi dan urologi terkemuka.',
          specialties: ['Oftalmologi', 'Urologi', 'THT & Bedah Kepala-Leher'],
          internationalFeatures: 'Pusat pasien internasional dengan staf multibahasa, 17 penyedia asuransi diterima',
          insuranceStatus: 'Asuransi Internasional'
        },
        zhongshan: {
          description: 'Berafiliasi dengan Fudan University. Pusat kardiovaskular dengan gedung pasien internasional tersendiri dan staf berbahasa Inggris khusus.',
          specialties: ['Bedah Umum', 'Gastroenterologi', 'Kedokteran Kardiovaskular'],
          internationalFeatures: 'Gedung pasien internasional independen, 19 penyedia asuransi diterima',
          insuranceStatus: 'Asuransi Internasional'
        },
        renji: {
          description: 'Berafiliasi dengan Shanghai Jiao Tong University. #1 gastroenterologi secara nasional selama 4 tahun berturut-turut. Pusat transplantasi hati terkemuka.',
          specialties: ['Gastroenterologi', 'Kedokteran Reproduksi', 'Reumatologi'],
          internationalFeatures: 'Pusat kedokteran reproduksi internasional, 20 penyedia asuransi diterima',
          insuranceStatus: 'Asuransi Internasional'
        },
        longhua: {
          description: 'Rumah sakit Pengobatan Tradisional Tiongkok utama. Percontohan resmi wisata medis TTM. Akupunktur, terapi herbal, dan rehabilitasi TTM.',
          specialties: ['Onkologi TTM', 'Ortopedi TTM', 'Bedah TTM'],
          internationalFeatures: 'Rumah sakit percontohan wisata medis TTM resmi, 18 penyedia asuransi diterima',
          insuranceStatus: 'Asuransi Internasional'
        },
        ipmch: {
          description: 'Berafiliasi dengan China Welfare Institute. Pusat terkemuka untuk kehamilan berisiko tinggi, kedokteran janin, dan kedokteran reproduksi.',
          specialties: ['Kedokteran Reproduksi', 'Obstetri', 'Ginekologi'],
          internationalFeatures: 'Berafiliasi dengan China Welfare Institute, perawatan bersalin internasional, 19 penyedia asuransi diterima',
          insuranceStatus: 'Asuransi Internasional'
        },
        scmc: {
          description: 'Berafiliasi dengan Shanghai Jiao Tong University. Pusat bedah jantung anak teratas di Tiongkok. Kemitraan dengan Project HOPE.',
          specialties: ['Bedah Jantung Anak', 'Hematologi-Onkologi Anak', 'Pediatri Perkembangan Perilaku'],
          internationalFeatures: 'Kemitraan dengan Project HOPE, pusat pediatrik internasional, 23 penyedia asuransi diterima',
          insuranceStatus: 'Asuransi Internasional'
        },
        sixth: {
          description: 'Pelopor bedah replantasi anggota tubuh sejak 1963. Pusat ortopedi dan endokrinologi terkemuka dengan pengakuan internasional.',
          specialties: ['Ortopedi', 'Endokrinologi & Metabolisme', 'Kedokteran Olahraga'],
          internationalFeatures: 'Pusat replantasi anggota tubuh pertama di dunia, 18 penyedia asuransi diterima',
          insuranceStatus: 'Asuransi Internasional'
        },
        'first-maternity': {
          description: 'Rumah sakit bersalin utama di Shanghai. Perawatan obstetri dan neonatal komprehensif dengan dukungan pasien internasional.',
          specialties: ['Obstetri', 'Kedokteran Janin', 'Kedokteran Reproduksi'],
          internationalFeatures: 'Layanan bersalin internasional khusus, 18 penyedia asuransi diterima',
          insuranceStatus: 'Asuransi Internasional'
        },
        xinhua: {
          description: 'Pusat bedah tulang belakang dan bedah anak terkemuka dengan layanan internasional lengkap.',
          specialties: ['Pediatri', 'Dermatologi', 'Bedah Umum'],
          internationalFeatures: 'Departemen internasional komprehensif, 16 penyedia asuransi diterima',
          insuranceStatus: 'Asuransi Internasional'
        },
        huadong: {
          description: 'Berafiliasi dengan Fudan University. Pusat kedokteran geriatri dan rehabilitasi utama. Populer untuk program pemeriksaan kesehatan eksekutif.',
          specialties: ['Kedokteran Geriatri', 'Kedokteran Rehabilitasi', 'Nutrisi Klinis'],
          internationalFeatures: 'Pusat pemeriksaan kesehatan eksekutif, rehabilitasi internasional, 17 penyedia asuransi diterima',
          insuranceStatus: 'Asuransi Internasional'
        },
        ninth: {
          description: 'Rumah sakit gigi #1 di Tiongkok. Departemen Kedokteran Internasional khusus dibuka Januari 2024 di kampus Pudong dengan 100+ kursi gigi, CBCT, mikroskop, dan peralatan laser. Spesialis implan internasional penuh waktu Prof. Tonetti. Mekanisme MDT untuk kasus kompleks. Telah merawat pasien dari 40+ negara.',
          specialties: ['Bedah Mulut/Gigi #1', 'Bedah Plastik & Rekonstruktif', 'Bedah Mulut & Maksilofasial'],
          internationalFeatures: 'Rumah sakit gigi utama dengan 5 akademisi. Peringkat #1 dalam bedah mulut dan bedah plastik secara nasional.',
          insuranceStatus: 'Penyelesaian Langsung (8 asuransi, 21 kemitraan)'
        },
        jiahui: {
          description: 'Rumah sakit internasional swasta terbesar di Shanghai dengan 500 tempat tidur. Berafiliasi dengan Massachusetts General Hospital. Pusat medis layanan lengkap.',
          specialties: ['Onkologi', 'Bedah', 'Kedokteran Umum'],
          internationalFeatures: 'Afiliasi dengan Massachusetts General Hospital, 500 tempat tidur',
          insuranceStatus: '50+ Asuransi Internasional'
        },
        unicare: {
          description: 'Bagian dari Chindex Healthcare. Layanan kesehatan komprehensif dengan perawatan pasien gaya Barat dan standar internasional.',
          specialties: ['Kedokteran Keluarga', 'Obstetri', 'Pediatri'],
          internationalFeatures: 'Merek rumah sakit internasional yang telah mapan',
          insuranceStatus: '50+ Asuransi Internasional'
        },
        parkway: {
          description: 'Bagian dari IHH Healthcare, salah satu grup layanan kesehatan terbesar di dunia. Jaringan asuransi yang kuat termasuk penyelesaian langsung Prudential.',
          specialties: ['Multi-spesialisasi', 'Kedokteran Keluarga', 'Diagnostik'],
          internationalFeatures: 'Grup IHH Healthcare, pembayaran langsung Prudential',
          insuranceStatus: 'Pembayaran Langsung Prudential'
        },
        shine: {
          description: 'Anggota Mayo Clinic Care Network. Layanan kardiologi, gastroenterologi, dan kedokteran umum komprehensif dengan standar internasional.',
          specialties: ['Kardiologi', 'Gastroenterologi', 'Kedokteran Umum'],
          internationalFeatures: 'Kemitraan Mayo Clinic Care Network',
          insuranceStatus: '40+ Asuransi Internasional'
        },
        raffles: {
          description: 'Bagian dari grup Surbana Jurong yang berbasis di Singapura. Fokus pada wisata medis dengan layanan pemeriksaan kesehatan komprehensif.',
          specialties: ['Pemeriksaan Eksekutif', 'Kedokteran Umum', 'Wisata Medis'],
          internationalFeatures: 'Grup Surbana Jurong berbasis di Singapura',
          insuranceStatus: 'Asuransi Internasional'
        }
      },
      faqPage: {
        cta: {
          title: 'Masih ada pertanyaan?',
          text: 'Dapatkan konsultasi gratis ShanghaiMed tanpa kewajiban apa pun. Tim kami merespons dalam 24 jam.',
          email: 'Email Kami',
          form: 'Formulir Kontak'
        }
      }
    },

}

export function LanguageProvider({ children, locale }: { children: ReactNode; locale?: Language }) {
  const pathname = usePathname()
  // URL 是唯一真相：locale prop（[lang] 路由）> URL 前缀 > 'en'
  // SSR 时 usePathname 可用，保证服务端渲染的链接也带正确语言前缀
  const urlLocale = (pathname ? getLocaleFromPathname(pathname) : 'en') as Language
  const [language, setLanguageState] = useState<Language>(locale || urlLocale)

  // locale prop 或 URL 变化时同步
  useEffect(() => {
    if (locale) {
      setLanguageState(locale)
      return
    }
    setLanguageState((pathname ? getLocaleFromPathname(pathname) : 'en') as Language)
  }, [locale, pathname])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('shanghaimed-lang', lang)
      document.documentElement.lang = lang
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    }
  }

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  // ar: 全量阿拉伯语翻译（经 GLM→DS→K3 三模型交叉验证 + 海湾本地化终审）
  // ru/mn: 仅白名单区块显示机器翻译，其余 YMYL 内容 fallback 英文
  const MACHINE_TRANSLATABLE_SECTIONS = ['nav', 'whyShanghai', 'processFlow', 'careTeam', 'hero', 'testimonials', 'treatments', 'howItWorks', 'trust', 'pricing', 'insights', 'blog', 'faq', 'contact', 'footer', 'agentChat', 'pages', 'medicalDisclaimer', 'hospitals', 'faqPage']

  const resolveKey = (key: string): any => {
    const keys = key.split('.')
    const section = keys[0]
    // ja: 完整翻译；ar/ru/mn: 仅白名单区块用机器翻译，其余 YMYL 内容 fallback en
    const lang: Language =
      language === 'ja' ||
      (language !== 'en' && MACHINE_TRANSLATABLE_SECTIONS.includes(section))
        ? language
        : 'en'
    let value: any = translations[lang]
    for (const k of keys) {
      value = value?.[k]
    }
    // 机器翻译区块若某 key 意外缺失，二级兜底英文，不回显 key 字符串
    if (value == null && language !== 'en' && language !== 'ja') {
      value = translations.en
      for (const k of keys) {
        value = value?.[k]
      }
    }
    return value
  }

  const t = (key: string): string => {
    const value = resolveKey(key)
    return typeof value === 'string' ? value : key
  }

  // 数组翻译：返回数组数据（如 FAQ 列表、流程步骤等），找不到时返回空数组供组件回退到英文常量
  const tArr = (key: string): any[] => {
    const value = resolveKey(key)
    return Array.isArray(value) ? value : []
  }

  // URL 语言前缀：英文返回原路径，非英文返回 /${language} + path
  // 跳过外部 URL 和锚点
  const localePath = (path: string): string => {
    if (language === 'en') return path
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('#') || path.startsWith('mailto:')) return path
    return `/${language}${path}`
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tArr, localePath }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
