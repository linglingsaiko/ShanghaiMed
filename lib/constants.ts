// Hospital data for the Shanghai medical network
export interface Hospital {
  id: string
  name: string
  tier: 'tier1' | 'tier2' | 'tier3'
  specialties: string[]
  internationalFeatures: string
  insuranceStatus: string
  description: string
}

// Tier 1 - Public Grade-A International Departments
export const tier1Hospitals: Hospital[] = [
  {
    id: 'huashan',
    name: 'Huashan Hospital',
    tier: 'tier1',
    specialties: ['Neurology #1', 'Dermatology #1', 'Infectious Disease #1'],
    internationalFeatures: '~100 international insurance direct payment',
    insuranceStatus: 'Direct Settlement',
    description:
      'Fudan University affiliated. Ranked #1 in neurology, dermatology, and infectious disease nationwide. Serving 600,000+ international patients from 100+ countries.',
  },
  {
    id: 'ruijin',
    name: 'Ruijin Hospital',
    tier: 'tier1',
    specialties: ['Hematology #1', 'CAR-T Therapy'],
    internationalFeatures: '95.7% CAR-T remission rate',
    insuranceStatus: 'Direct Settlement',
    description:
      'Shanghai Jiao Tong University affiliated. Pioneer in bone marrow transplantation and CAR-T therapy. Discharged with direct insurance billing.',
  },
  {
    id: 'renji',
    name: 'Renji Hospital',
    tier: 'tier1',
    specialties: ['Gastroenterology #1 (4 years)', 'Liver Transplants'],
    internationalFeatures: 'UK HarleyDoc cross-border partnership',
    insuranceStatus: 'International Insurance',
    description:
      '连续4年全国消化科第一. Strategic partnership with UK HarleyDoc for seamless cross-border patient referrals.',
  },
  {
    id: 'zhongshan',
    name: 'Zhongshan Hospital',
    tier: 'tier1',
    specialties: ['Cardiology #2', 'Interventional Cardiology'],
    internationalFeatures: 'Dedicated international building',
    insuranceStatus: 'International Insurance',
    description:
      'Fudan University affiliated. Cardiovascular center with independent international patient building and dedicated English-speaking staff.',
  },
  {
    id: 'jiuyuan',
    name: 'Shanghai Ninth People\'s Hospital',
    tier: 'tier1',
    specialties: ['Stomatology #1', 'Plastic Surgery #1'],
    internationalFeatures: 'Maxillofacial surgery excellence',
    insuranceStatus: 'Direct Settlement',
    description:
      'Leading center for dental implants, cosmetic surgery, and complex maxillofacial procedures. High volume international patient experience.',
  },
  {
    id: 'children',
    name: 'Children\'s Hospital of Fudan University',
    tier: 'tier1',
    specialties: ['Pediatrics', 'Pediatric Surgery'],
    internationalFeatures: 'International pediatric department since 1993',
    insuranceStatus: 'Direct Settlement',
    description:
      'Established dedicated international pediatric department in 1993. Comprehensive children\'s healthcare with multilingual support.',
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
  },
  {
    id: 'shine',
    name: 'Shine Healthcare',
    tier: 'tier2',
    specialties: ['Multi-specialty', 'Mayo Clinic Network'],
    internationalFeatures: '8 clinic locations, Mayo Clinic network',
    insuranceStatus: 'Direct Settlement',
    description:
      '8 locations across Shanghai with Mayo Clinic Care Network membership. Comprehensive outpatient and inpatient services.',
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
  },
]

// Tier 3 - Specialized Centers
export const tier3Hospitals: Hospital[] = [
  {
    id: 'proton',
    name: 'Shanghai Proton Center',
    tier: 'tier3',
    specialties: ['Proton Therapy', 'Heavy Ion Therapy'],
    internationalFeatures: 'One of few proton-heavy ion centers globally',
    insuranceStatus: 'Limited Insurance',
    description:
      'State-of-the-art proton and carbon ion therapy center. Among the few facilities worldwide offering both treatment modalities.',
  },
  {
    id: 'cancer',
    name: 'Meizhong Jiahe Cancer Center',
    tier: 'tier3',
    specialties: ['Oncology', 'Precision Medicine'],
    internationalFeatures: 'MD Anderson collaboration',
    insuranceStatus: 'International Insurance',
    description:
      'Comprehensive cancer center with MD Anderson Cancer Center collaboration. Focus on precision oncology and international patient care.',
  },
]

// Export all hospitals
export const allHospitals = [...tier1Hospitals, ...tier2Hospitals, ...tier3Hospitals]

// Navigation links
export const navLinks = [
  { href: '/why-shanghai', label: 'Why Shanghai' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/treatments', label: 'Treatments' },
  { href: '/care-team', label: 'Care Team' },
  { href: '/patient-stories', label: 'Stories' },
  { href: '/contact', label: 'Contact' },
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

// Cost comparison data
export const costComparison = [
  {
    procedure: 'MRI Scan',
    usCost: '$3,000',
    shanghaiCost: '$65',
    savings: '98%',
  },
  {
    procedure: 'Cardiac Check-up',
    usCost: '$18,000',
    shanghaiCost: '$75',
    savings: '99.6%',
  },
  {
    procedure: 'Knee Replacement',
    usCost: '$40,000',
    shanghaiCost: '$8,000',
    savings: '80%',
  },
  {
    procedure: 'Heart Bypass',
    usCost: '$120,000',
    shanghaiCost: '$25,000',
    savings: '79%',
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
    question: 'How much can I save?',
    answer:
      'Medical costs in Shanghai are typically 70-90% lower than in Western countries. For example, MRI scans average $65 vs $3,000 in the US.',
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

// Patient stories
export const patientStories = [
  {
    id: 'dean-johnson',
    name: 'Dean Johnson',
    nationality: 'British',
    title: 'A British engineer flew 5,000 miles to China for surgery. Twice.',
    content:
      'When Dean Johnson was told a hip replacement would cost £25,000 and require a 6-month wait on the NHS, he did something unexpected. He flew to Shanghai. The surgery, including a private room and rehabilitation, cost him under £6,000. Three years later, when he needed the other hip replaced, he came back. "The care was excellent, the doctors were world-class, and the savings paid for my retirement," he says.',
    tags: ['Orthopedics', 'Hip Replacement', 'Cost Savings'],
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    nationality: 'American',
    title: 'Same surgery. 1/10 the price.',
    content:
      'Sarah Chen\'s daughter was diagnosed with a rare spinal condition requiring specialized surgery not available at their local hospital in California. After researching options globally, they chose Shanghai. "We were initially nervous about going to China for such a serious procedure, but the hospital was state-of-the-art, the surgeon had trained at Johns Hopkins, and the ISPN nurse who accompanied us made everything seamless. The total cost was $12,000 including travel, compared to $150,000 estimated in the US."',
    tags: ['Pediatrics', 'Spinal Surgery', 'Complex Case'],
  },
]

// Nurse services
export const nurseServices = [
  {
    title: 'Outpatient Accompaniment',
    description:
      'Professional nurse accompanies you to clinic visits, ensuring clear communication with doctors and proper understanding of treatment plans.',
    price: '$120-180 / half-day',
    icon: 'Stethoscope',
  },
  {
    title: 'Inpatient Care',
    description:
      'Dedicated bedside care during hospital stays. Monitor vital signs, assist with daily needs, and bridge any language gaps with medical staff.',
    price: '$220-300 / 8 hours',
    icon: 'Bed',
  },
  {
    title: 'Translation & Navigation',
    description:
      'Real-time medical interpretation during consultations, help understanding prescriptions, and navigation through hospital procedures.',
    price: '$80-120 / hour',
    icon: 'Languages',
  },
  {
    title: 'Post-Treatment Care',
    description:
      'Continued support after discharge including wound care, medication management, and coordination with your home-country doctors.',
    price: 'Custom quote',
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
