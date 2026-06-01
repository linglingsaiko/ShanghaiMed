// Hospital data for the Shanghai medical network
export interface Hospital {
  id: string
  name: string
  tier: 'tier1' | 'tier2'
  specialties: string[]
  internationalFeatures: string
  insuranceStatus: string
  description: string
  image: string
}

// Tier 1 - 13 Public Grade-A Medical Tourism Pilot Hospitals
export const tier1Hospitals: Hospital[] = [
  {
    id: 'xinhua',
    name: 'Xinhua Hospital (SJTU)',
    tier: 'tier1',
    specialties: ['Spine Surgery', 'Pediatric Surgery', 'Ophthalmology', 'Fetal Medicine'],
    internationalFeatures: 'Comprehensive international department',
    insuranceStatus: 'International Insurance',
    description: 'Leading spine surgery and pediatric surgery center with full international services.',
    image: 'https://picsum.photos/seed/xinhua/800/600',
  },
  {
    id: 'children-fudan',
    name: 'Children\'s Hospital (Fudan University)',
    tier: 'tier1',
    specialties: ['Neonatology', 'Stem Cell Transplant', 'Genetic Diseases', 'Pediatric Rare Diseases'],
    internationalFeatures: 'International pediatric department since 1993',
    insuranceStatus: 'Direct Settlement',
    description: 'Leading center for neonatal care and pediatric rare diseases.',
    image: 'https://picsum.photos/seed/children/800/600',
  },
  {
    id: 'ruijin',
    name: 'Ruijin Hospital (SJTU)',
    tier: 'tier1',
    specialties: ['Hematology #1', 'Endocrinology', 'Cardiac Surgery', 'Minimally Invasive Surgery'],
    internationalFeatures: '95.7% CAR-T remission rate, dedicated international ward',
    insuranceStatus: 'Direct Settlement',
    description: 'Pioneer in bone marrow transplantation and CAR-T therapy with world-leading outcomes.',
    image: 'https://picsum.photos/seed/ruijin/800/600',
  },
  {
    id: 'huashan',
    name: 'Huashan Hospital (Fudan University)',
    tier: 'tier1',
    specialties: ['Dermatology #1', 'Neurosurgery', 'Hand Surgery', 'Infectious Disease', 'Rehabilitation'],
    internationalFeatures: 'Dedicated international department, 100+ insurance direct payment',
    insuranceStatus: 'Direct Settlement',
    description: 'Ranked #1 in dermatology and neurosurgery nationwide. One of China\'s most internationally recognized hospitals.',
    image: 'https://picsum.photos/seed/huashan/800/600',
  },
  {
    id: 'shanghai-general',
    name: 'Shanghai General Hospital',
    tier: 'tier1',
    specialties: ['Ophthalmology', 'Urology', 'Cardiovascular Medicine'],
    internationalFeatures: 'International patient center with multilingual staff',
    insuranceStatus: 'International Insurance',
    description: 'One of Shanghai\'s oldest and most prestigious hospitals. Leading ophthalmology and urology departments.',
    image: 'https://picsum.photos/seed/general/800/600',
  },
  {
    id: 'zhongshan',
    name: 'Zhongshan Hospital (Fudan University)',
    tier: 'tier1',
    specialties: ['Cardiac Surgery', 'Liver Cancer', 'Gastroenterology', 'Respiratory'],
    internationalFeatures: 'Independent international patient building',
    insuranceStatus: 'International Insurance',
    description: 'Fudan University affiliated. Cardiovascular center with independent international patient building and dedicated English-speaking staff.',
    image: 'https://picsum.photos/seed/zhongshan/800/600',
  },
  {
    id: 'renji',
    name: 'Renji Hospital (SJTU)',
    tier: 'tier1',
    specialties: ['Reproductive Medicine', 'Gastroenterology', 'Rheumatology', 'Liver Transplant'],
    internationalFeatures: 'International reproductive medicine center',
    insuranceStatus: 'International Insurance',
    description: 'Shanghai Jiao Tong University affiliated. #1 gastroenterology nationwide for 4 consecutive years. Leading liver transplant center.',
    image: 'https://picsum.photos/seed/renji/800/600',
  },
  {
    id: 'longhua',
    name: 'Longhua Hospital (Shanghai Univ. of TCM)',
    tier: 'tier1',
    specialties: ['TCM Oncology', 'TCM Orthopedics', 'TCM Rheumatology'],
    internationalFeatures: 'Official TCM medical tourism pilot hospital',
    insuranceStatus: 'International Insurance',
    description: 'Premier Traditional Chinese Medicine hospital. Official pilot for TCM medical tourism. Acupuncture, herbal therapy, and TCM rehabilitation.',
    image: 'https://picsum.photos/seed/longhua/800/600',
  },
  {
    id: 'ipmch',
    name: 'International Peace Maternity & Child Health Hospital',
    tier: 'tier1',
    specialties: ['Obstetrics', 'Reproductive Medicine', 'Fetal Medicine'],
    internationalFeatures: 'China Welfare Institute affiliated, international maternity care',
    insuranceStatus: 'International Insurance',
    description: 'Affiliated with China Welfare Institute. Leading center for high-risk pregnancy, fetal medicine, and reproductive medicine.',
    image: 'https://picsum.photos/seed/ipmch/800/600',
  },
  {
    id: 'scmc',
    name: 'Shanghai Children\'s Medical Center (SJTU)',
    tier: 'tier1',
    specialties: ['Pediatric Oncology', 'Cardiac Surgery', 'Hematology'],
    internationalFeatures: 'Partnership with Project HOPE, international pediatric center',
    insuranceStatus: 'International Insurance',
    description: 'Shanghai Jiao Tong University affiliated. Top pediatric cardiac surgery center in China. Partnership with Project HOPE.',
    image: 'https://picsum.photos/seed/scmc/800/600',
  },
  {
    id: 'sixth',
    name: 'Shanghai Sixth People\'s Hospital',
    tier: 'tier1',
    specialties: ['Orthopedics (Limb Replantation Pioneer)', 'Endocrinology', 'Ultrasound'],
    internationalFeatures: 'World\'s first limb replantation center',
    insuranceStatus: 'International Insurance',
    description: 'Pioneer in limb replantation surgery since 1963. Leading orthopedics and endocrinology center with international recognition.',
    image: 'https://picsum.photos/seed/sixth/800/600',
  },
  {
    id: 'first-maternity',
    name: 'Shanghai First Maternity & Infant Hospital',
    tier: 'tier1',
    specialties: ['Obstetrics', 'Neonatology', 'Reproductive Medicine'],
    internationalFeatures: 'Dedicated international maternity services',
    insuranceStatus: 'International Insurance',
    description: 'Shanghai\'s premier maternity hospital. Comprehensive obstetric and neonatal care with international patient support.',
    image: 'https://picsum.photos/seed/maternity/800/600',
  },
  {
    id: 'huadong',
    name: 'Huadong Hospital (Fudan University)',
    tier: 'tier1',
    specialties: ['Geriatric Medicine', 'Rehabilitation Medicine'],
    internationalFeatures: 'Executive health screening center, international rehabilitation',
    insuranceStatus: 'International Insurance',
    description: 'Fudan University affiliated. Premier geriatric medicine and rehabilitation center. Popular for executive health screening programs.',
    image: 'https://picsum.photos/seed/huadong/800/600',
  },
]

// Tier 2 - International Private Hospitals
export const tier2Hospitals: Hospital[] = [
  {
    id: 'jiahui',
    name: 'Jiahui International Hospital',
    tier: 'tier2',
    specialties: ['General Medicine', 'Oncology', 'Surgery'],
    internationalFeatures: 'Massachusetts General Hospital affiliation, 500 beds',
    insuranceStatus: '50+ International Insurance',
    description:
      'Largest private international hospital in Shanghai with 500 beds. Affiliated with Massachusetts General Hospital. Full-service medical center.',
    image: 'https://picsum.photos/seed/jiahui/800/600',
  },
  {
    id: 'unicare',
    name: 'Shanghai United Family Hospital',
    tier: 'tier2',
    specialties: ['Family Medicine', 'Obstetrics', 'Pediatrics'],
    internationalFeatures: 'Established international hospital brand',
    insuranceStatus: '50+ International Insurance',
    description:
      'Part of Chindex Healthcare. Comprehensive healthcare services with western-style patient care and international standards.',
    image: 'https://picsum.photos/seed/unicare/800/600',
  },
  {
    id: 'sinounited',
    name: 'SinoUnited Health',
    tier: 'tier2',
    specialties: ['Multi-specialty', 'Premium Care'],
    internationalFeatures: '8 locations, international standards',
    insuranceStatus: 'Direct Settlement',
    description:
      'Leading premium healthcare provider with 8 locations across Shanghai. Comprehensive outpatient and inpatient services with international standards.',
    image: 'https://picsum.photos/seed/sinounited/800/600',
  },
  {
    id: 'parkway',
    name: 'ParkwayHealth',
    tier: 'tier2',
    specialties: ['Multi-specialty', 'IHH Network'],
    internationalFeatures: 'IHH Healthcare group, Prudential direct payment',
    insuranceStatus: 'Prudential Direct Payment',
    description:
      'Part of IHH Healthcare, one of the world\'s largest healthcare groups. Strong insurance network including Prudential direct settlement.',
    image: 'https://picsum.photos/seed/parkway/800/600',
  },
  {
    id: 'raffles',
    name: 'Shanghai Raffles Hospital',
    tier: 'tier2',
    specialties: ['Medical Tourism', 'Executive Health'],
    internationalFeatures: 'Singapore-based Surbana Jurong group',
    insuranceStatus: 'International Insurance',
    description:
      'Part of Singapore-based Surbana Jurong group. Focus on medical tourism with comprehensive health screening services.',
    image: 'https://picsum.photos/seed/raffles/800/600',
  },
]

// Export all hospitals
export const allHospitals = [...tier1Hospitals, ...tier2Hospitals]

// Navigation links
export const navLinks = [
  { href: '#why-shanghai', label: 'Why Shanghai' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#treatments', label: 'Treatments' },
  { href: '#care-team', label: 'Care Team' },
  { href: '#trust', label: 'Trust' },
]

// Statistics data
export const statistics = [
  {
    value: '47',
    label: 'International Insurance Direct-Payment Hospitals',
    description: 'Most in mainland China',
  },
  {
    value: '13',
    label: 'Public Grade-A Medical Tourism Pilots',
    description: 'Specialized international services',
  },
  {
    value: '600K+',
    label: 'International Patients Served',
    description: 'By Huashan Hospital alone',
  },
  {
    value: '100+',
    label: 'Countries Represented',
    description: 'Global patient diversity',
  },
  {
    value: '240h',
    label: 'Transit Visa-Free Entry',
    description: 'For international travelers',
  },
]

// Price reference data
export const priceReference = [
  {
    item: 'Doctor Consultation',
    priceRMB: '¥500–1,000',
    priceUSD: '$70–140',
    note: 'Specialist consultation at international department',
  },
  {
    item: 'Blood Routine (CBC)',
    priceRMB: '~¥50',
    priceUSD: '~$7',
    note: 'Complete blood count',
  },
  {
    item: 'C-Reactive Protein (CRP)',
    priceRMB: '~¥50',
    priceUSD: '~$7',
    note: 'Inflammation marker test',
  },
  {
    item: 'Chest X-ray',
    priceRMB: '~¥300',
    priceUSD: '~$42',
    note: 'Standard chest imaging',
  },
  {
    item: 'CT Scan',
    priceRMB: 'From ¥600',
    priceUSD: 'From $84',
    note: 'Varies by body part and contrast',
  },
  {
    item: 'MRI Scan',
    priceRMB: 'From ¥1,000',
    priceUSD: 'From $140',
    note: 'Varies by body part and contrast',
  },
]

// Process steps
export const processSteps = [
  {
    step: 1,
    title: 'Submit Your Inquiry',
    description:
      'Tell us your medical needs. Our AI assistant responds in minutes, 24/7.',
    icon: 'MessageSquare',
  },
  {
    step: 2,
    title: 'Get Matched',
    description:
      'We connect you with the right hospital and specialist from Shanghai\'s top-tier network.',
    icon: 'Users',
  },
  {
    step: 3,
    title: 'Travel & Treat',
    description:
      'Bilingual nurses guide you from airport to hospital. Visa support included.',
    icon: 'Plane',
  },
  {
    step: 4,
    title: 'Recover & Follow Up',
    description:
      'Post-treatment care, translated reports, and ongoing remote support.',
    icon: 'Heart',
  },
]

// FAQ data
export const faqData = [
  {
    question: 'How do I get started?',
    answer:
      'Simply click the "Get Free Consultation" button or WhatsApp us. Our team will respond within 24 hours with personalized recommendations based on your medical needs.',
  },
  {
    question: 'Do I need a visa for medical treatment in Shanghai?',
    answer:
      'Many countries qualify for 240-hour transit visa-free entry. For longer treatments, we assist with medical visa applications. The requirements vary by nationality.',
  },
  {
    question: 'Is my health insurance accepted?',
    answer:
      'We work with 47+ hospitals that accept international insurance direct payment, including major providers like Aetna, Cigna, Allianz, and Prudential.',
  },
  {
    question: 'What are the costs?',
    answer:
      'Consultation fees at international departments range from ¥500–1,000 (~$70–140). Basic diagnostic tests like blood work and X-rays are very affordable. For complex treatment costs, we provide personalized quotes after reviewing your case.',
  },
  {
    question: 'Will language be a barrier?',
    answer:
      'No. All partner hospitals have English-speaking staff, and our bilingual ISPN-certified nurses accompany you throughout your entire journey.',
  },
  {
    question: 'What types of treatments are available?',
    answer:
      'We cover all specialties including cardiology, neurology, oncology, orthopedics, reproductive medicine, and more. From routine check-ups to complex surgeries.',
  },
]

// Trust pillars data
export const trustPillars = [
  {
    icon: 'Shield',
    title: 'Licensed & Certified',
    items: [
      'ISPN (International Professional Nursing) certified',
      'Chief Nurse (主管护师) with 10+ years clinical experience',
      'Company registered and licensed in Shanghai',
    ],
  },
  {
    icon: 'Users',
    title: 'Nurse-Accompanied Care',
    items: [
      'Bilingual nurse accompanies every hospital visit',
      'From airport pick-up to discharge — never navigate alone',
      'Medical interpretation included in all consultations',
    ],
  },
  {
    icon: 'FileText',
    title: 'Transparent Pricing',
    items: [
      'All fees disclosed upfront — no hidden charges',
      'You pay the hospital directly, we never handle your money',
      'Detailed cost breakdown before you commit',
    ],
  },
  {
    icon: 'Headphones',
    title: 'After-Care Guarantee',
    items: [
      'Post-treatment follow-up within 30 days',
      'English translation of all medical reports',
      'Prescription coordination with your home-country doctor',
    ],
  },
]

// Nurse services
export const nurseServices = [
  {
    title: 'Outpatient Accompaniment',
    description:
      'Professional nurse accompanies you to clinic visits, ensuring clear communication with doctors and proper understanding of treatment plans.',
    icon: 'Stethoscope',
  },
  {
    title: 'Inpatient Care',
    description:
      'Dedicated bedside care during hospital stays. Monitor vital signs, assist with daily needs, and bridge any language gaps with medical staff.',
    icon: 'Bed',
  },
  {
    title: 'Translation & Navigation',
    description:
      'Real-time medical interpretation during consultations, help understanding prescriptions, and navigation through hospital procedures.',
    icon: 'Languages',
  },
  {
    title: 'Post-Treatment Care',
    description:
      'Continued support after discharge including wound care, medication management, and coordination with your home-country doctors.',
    icon: 'Heart',
  },
]

// Nurse credentials
export const nurseCredentials = [
  'Active RN license from top-tier Shanghai hospitals',
  'ISPN (International Professional Nursing) certification',
  'English/Japanese bilingual proficiency',
  'Minimum 5 years clinical experience',
  'Specialized training in international patient care',
]

// Patient testimonials
export const patientTestimonials = [
  {
    id: 1,
    name: 'Michael T.',
    country: 'USA',
    treatment: 'Cardiac Surgery',
    savings: '$45,000',
    avatar: 'M',
    testimonial: 'I saved $45,000 on my cardiac surgery compared to the US. The bilingual nurse was with me every step of the way. Best medical experience I\'ve ever had.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Yuki S.',
    country: 'Japan',
    treatment: 'Health Check-up',
    savings: '$3,200',
    avatar: 'Y',
    testimonial: 'Comprehensive health screening at 1/3 of the cost in Tokyo. The nurse explained everything in Japanese and I received all reports in English.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sarah L.',
    country: 'UK',
    treatment: 'Orthopedic Surgery',
    savings: '$28,000',
    avatar: 'S',
    testimonial: 'Waited 18 months in the UK for my knee surgery. Had it done in Shanghai within 2 weeks at 70% less cost. Amazing experience!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Hans M.',
    country: 'Germany',
    treatment: 'Dental Implants',
    savings: '$12,000',
    avatar: 'H',
    testimonial: 'Dental work was exceptional quality. The clinic had the latest technology and the dentist spoke perfect English.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Elena R.',
    country: 'Russia',
    treatment: 'Oncology Treatment',
    savings: '$35,000',
    avatar: 'E',
    testimonial: 'My cancer treatment was world-class. The hospital had international accreditation and my nurse stayed with me throughout chemotherapy.',
    rating: 5,
  },
]

// Statistics for social proof
export const socialProofStats = [
  { value: '2,500+', label: 'Patients Served' },
  { value: '45+', label: 'Countries' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '$2.5M+', label: 'Total Savings' },
]
