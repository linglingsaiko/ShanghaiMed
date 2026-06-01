// Hospital data for the Shanghai medical network
export interface Hospital {
  id: string
  name: string
  tier: 'tier1' | 'tier2'
  specialties: string[]
  certifications: string[]
  insurancePartners: string[]
  internationalFeatures: string
  insuranceStatus: string
  description: string
  image: string
}

// Tier 1 - 13 Public Grade-A Medical Tourism Pilot Hospitals
export const tier1Hospitals: Hospital[] = [
  {
    id: 'huashan',
    name: 'Huashan Hospital (Fudan University)',
    tier: 'tier1',
    specialties: ['Neurosurgery', 'Dermatology', 'Infectious Disease'],
    certifications: ['JCI Certified', 'HMI Partnership'],
    insurancePartners: ['MSH', 'Bupa', 'Cigna', 'Aetna', 'AXA', 'Allianz', 'International SOS', 'Now Health', 'Pacific Prime', 'Ping An Health', 'Pacific Health', 'AIA', 'ICBC-AXA', 'MediLink'],
    internationalFeatures: 'Dedicated international department, 100+ insurance direct payment',
    insuranceStatus: 'Direct Settlement',
    description: 'Ranked #1 in dermatology and neurosurgery nationwide. One of China\'s most internationally recognized hospitals.',
    image: '/images/华山.jpeg',
  },
  {
    id: 'children-fudan',
    name: 'Children\'s Hospital (Fudan University)',
    tier: 'tier1',
    specialties: ['Neonatology', 'Pediatric Surgery', 'Critical Care Medicine'],
    certifications: ['JCI Certified', 'HIMSS EMRAM Stage 6'],
    insurancePartners: ['MSH', 'Cigna', 'Ping An Health', 'AIA', 'Allianz', 'AXA', 'MediLink', 'Now Health', 'Pacific Prime', 'International SOS', 'CIGNA & CMC', 'Windstone Health'],
    internationalFeatures: 'International pediatric department since 1993',
    insuranceStatus: 'Direct Settlement',
    description: 'Leading center for neonatal care and pediatric rare diseases.',
    image: '/images/儿科医院.jpeg',
  },
  {
    id: 'ruijin',
    name: 'Ruijin Hospital (SJTU)',
    tier: 'tier1',
    specialties: ['Hematology', 'Endocrinology', 'Burns & Wound Care'],
    certifications: ['JCI Certified', 'National EMR Level 7'],
    insurancePartners: ['MSH', 'Pacific Health', 'Ping An Health', 'Cigna', 'AIA', 'Allianz', 'AXA', 'ICBC-AXA', 'MediLink', 'Now Health'],
    internationalFeatures: '95.7% CAR-T remission rate, dedicated international ward',
    insuranceStatus: 'Direct Settlement',
    description: 'Pioneer in bone marrow transplantation and CAR-T therapy with world-leading outcomes.',
    image: '/images/瑞金.jpeg',
  },
  {
    id: 'shanghai-general',
    name: 'Shanghai General Hospital',
    tier: 'tier1',
    specialties: ['Ophthalmology', 'Urology', 'ENT & Head-Neck Surgery'],
    certifications: ['DNV GL Certified', 'Mayo Clinic Partnership'],
    insurancePartners: ['AIA', 'MSH', 'SOS International', 'Ping An Health', 'Pacific Health', 'Cigna', 'Allianz', 'AXA', 'MediLink'],
    internationalFeatures: 'International patient center with multilingual staff',
    insuranceStatus: 'International Insurance',
    description: 'One of Shanghai\'s oldest and most prestigious hospitals. Leading ophthalmology and urology departments.',
    image: '/images/市一.png',
  },
  {
    id: 'zhongshan',
    name: 'Zhongshan Hospital (Fudan University)',
    tier: 'tier1',
    specialties: ['General Surgery', 'Gastroenterology', 'Cardiovascular Medicine'],
    certifications: ['JCI Certified', 'JBI Certified'],
    insurancePartners: ['MSH', 'Ping An Health', 'Pacific Health', 'AIA', 'Cigna', 'Allianz', 'AXA', 'ICBC-AXA', 'MediLink'],
    internationalFeatures: 'Independent international patient building',
    insuranceStatus: 'International Insurance',
    description: 'Fudan University affiliated. Cardiovascular center with independent international patient building and dedicated English-speaking staff.',
    image: '/images/中山.png',
  },
  {
    id: 'renji',
    name: 'Renji Hospital (SJTU)',
    tier: 'tier1',
    specialties: ['Gastroenterology', 'Reproductive Medicine', 'Rheumatology'],
    certifications: ['DNV GL Certified', 'DNV GL RTAC Certified'],
    insurancePartners: ['Cigna', 'AXA', 'AIA', 'Allianz', 'MSH', 'PICC Health', 'Ping An Health', 'Pacific Health', 'ICBC-AXA', 'MediLink', 'International SOS', 'Now Health'],
    internationalFeatures: 'International reproductive medicine center',
    insuranceStatus: 'International Insurance',
    description: 'Shanghai Jiao Tong University affiliated. #1 gastroenterology nationwide for 4 consecutive years. Leading liver transplant center.',
    image: '/images/仁济.jpeg',
  },
  {
    id: 'longhua',
    name: 'Longhua Hospital (Shanghai Univ. of TCM)',
    tier: 'tier1',
    specialties: ['TCM Oncology', 'TCM Orthopedics', 'TCM Surgery'],
    certifications: ['JCI Certified', 'HIMSS EMRAM Stage 7'],
    insurancePartners: ['MSH', 'Ping An Health', 'Pacific Health'],
    internationalFeatures: 'Official TCM medical tourism pilot hospital',
    insuranceStatus: 'International Insurance',
    description: 'Premier Traditional Chinese Medicine hospital. Official pilot for TCM medical tourism. Acupuncture, herbal therapy, and TCM rehabilitation.',
    image: '/images/龙华.jpg',
  },
  {
    id: 'ipmch',
    name: 'International Peace Maternity & Child Health Hospital',
    tier: 'tier1',
    specialties: ['Reproductive Medicine', 'Obstetrics', 'Gynecology'],
    certifications: ['DNV GL Certified'],
    insurancePartners: ['MSH', 'Ping An Health', 'AIA', 'Cigna', 'Allianz', 'MediLink'],
    internationalFeatures: 'China Welfare Institute affiliated, international maternity care',
    insuranceStatus: 'International Insurance',
    description: 'Affiliated with China Welfare Institute. Leading center for high-risk pregnancy, fetal medicine, and reproductive medicine.',
    image: '/images/国妇婴.png',
  },
  {
    id: 'scmc',
    name: 'Shanghai Children\'s Medical Center (SJTU)',
    tier: 'tier1',
    specialties: ['Pediatric Cardiac Surgery', 'Pediatric Hematology-Oncology', 'Developmental Behavioral Pediatrics'],
    certifications: ['JCI Certified', 'HIMSS EMRAM Stage 6', 'ISO 15189', 'GCP Certified'],
    insurancePartners: ['MSH', 'CIGNA & CMC', 'Ping An', 'AIA', 'MediLink', 'Windstone Health', 'Allianz', 'AXA', 'Cigna', 'Now Health', 'Pacific Prime'],
    internationalFeatures: 'Partnership with Project HOPE, international pediatric center',
    insuranceStatus: 'International Insurance',
    description: 'Shanghai Jiao Tong University affiliated. Top pediatric cardiac surgery center in China. Partnership with Project HOPE.',
    image: '/images/儿中心.png',
  },
  {
    id: 'sixth',
    name: 'Shanghai Sixth People\'s Hospital',
    tier: 'tier1',
    specialties: ['Orthopedics', 'Endocrinology & Metabolism', 'Sports Medicine'],
    certifications: ['JCI Certified'],
    insurancePartners: ['MSH', 'Ping An Health', 'Pacific Health', 'Cigna', 'AIA', 'Allianz'],
    internationalFeatures: 'World\'s first limb replantation center',
    insuranceStatus: 'International Insurance',
    description: 'Pioneer in limb replantation surgery since 1963. Leading orthopedics and endocrinology center with international recognition.',
    image: '/images/六院.png',
  },
  {
    id: 'first-maternity',
    name: 'Shanghai First Maternity & Infant Hospital',
    tier: 'tier1',
    specialties: ['Obstetrics', 'Fetal Medicine', 'Reproductive Medicine'],
    certifications: ['JCI Certified', 'APAGE Certified'],
    insurancePartners: ['MSH', 'AIA', 'MediLink', 'Ping An Health', 'Cigna', 'Allianz', 'AXA', 'ICBC-AXA', 'Now Health'],
    internationalFeatures: 'Dedicated international maternity services',
    insuranceStatus: 'International Insurance',
    description: 'Shanghai\'s premier maternity hospital. Comprehensive obstetric and neonatal care with international patient support.',
    image: '/images/一妇婴.png',
  },
  {
    id: 'xinhua',
    name: 'Xinhua Hospital (SJTU)',
    tier: 'tier1',
    specialties: ['Pediatrics', 'Dermatology', 'General Surgery'],
    certifications: ['JCI Certified'],
    insurancePartners: ['MSH', 'Ping An Health', 'Pacific Health', 'AIA', 'Cigna', 'Allianz'],
    internationalFeatures: 'Comprehensive international department',
    insuranceStatus: 'International Insurance',
    description: 'Leading spine surgery and pediatric surgery center with full international services.',
    image: '/images/新华.png',
  },
  {
    id: 'huadong',
    name: 'Huadong Hospital (Fudan University)',
    tier: 'tier1',
    specialties: ['Geriatric Medicine', 'Rehabilitation Medicine', 'Clinical Nutrition'],
    certifications: ['Bupa Silver Certified'],
    insurancePartners: ['Cigna', 'Bupa', 'Ping An', 'MSH', 'ICBC-AXA', 'MediLink', 'Allianz', 'AXA'],
    internationalFeatures: 'Executive health screening center, international rehabilitation',
    insuranceStatus: 'International Insurance',
    description: 'Fudan University affiliated. Premier geriatric medicine and rehabilitation center. Popular for executive health screening programs.',
    image: '/images/华东.png',
  },
]

// Tier 2 - International Private Hospitals
export const tier2Hospitals: Hospital[] = [
  {
    id: 'jiahui',
    name: 'Jiahui International Hospital',
    tier: 'tier2',
    specialties: ['Oncology', 'Surgery', 'General Medicine'],
    certifications: ['JCI Certified'],
    insurancePartners: ['MSH', 'Bupa', 'Cigna', 'Aetna', 'AXA', 'Allianz', 'AIA', 'Ping An Health', 'Pacific Health', 'International SOS', 'Now Health', 'MediLink'],
    internationalFeatures: 'Massachusetts General Hospital affiliation, 500 beds',
    insuranceStatus: '50+ International Insurance',
    description: 'Largest private international hospital in Shanghai with 500 beds. Affiliated with Massachusetts General Hospital. Full-service medical center.',
    image: '/images/jiahui.png',
  },
  {
    id: 'unicare',
    name: 'Shanghai United Family Hospital',
    tier: 'tier2',
    specialties: ['Family Medicine', 'Obstetrics', 'Pediatrics'],
    certifications: ['JCI Certified'],
    insurancePartners: ['MSH', 'Bupa', 'Cigna', 'Aetna', 'AXA', 'Allianz', 'AIA', 'Ping An Health', 'Pacific Health', 'International SOS', 'Now Health', 'MediLink'],
    internationalFeatures: 'Established international hospital brand',
    insuranceStatus: '50+ International Insurance',
    description: 'Part of Chindex Healthcare. Comprehensive healthcare services with western-style patient care and international standards.',
    image: '/images/shagnhai united family.png',
  },
  {
    id: 'parkway',
    name: 'ParkwayHealth',
    tier: 'tier2',
    specialties: ['Multi-specialty', 'Family Medicine', 'Diagnostics'],
    certifications: [],
    insurancePartners: ['Prudential', 'MSH', 'Cigna', 'Bupa', 'Allianz', 'AIA', 'AXA', 'Ping An Health'],
    internationalFeatures: 'IHH Healthcare group, Prudential direct payment',
    insuranceStatus: 'Prudential Direct Payment',
    description: 'Part of IHH Healthcare, one of the world\'s largest healthcare groups. Strong insurance network including Prudential direct settlement.',
    image: '/images/Parkway.jpeg',
  },
  {
    id: 'shine',
    name: 'SinoUnited Health',
    tier: 'tier2',
    specialties: ['Cardiology', 'Gastroenterology', 'General Medicine'],
    certifications: ['3A Five-Star Certified', 'Mayo Clinic Care Network Member'],
    insurancePartners: ['MSH', 'CIGNA & CMC', 'Ping An Health', 'Pacific Health', 'Bupa', 'Allianz', 'AIA', 'AXA', 'Cigna', 'Now Health', 'MediLink', 'Windstone Health'],
    internationalFeatures: 'Mayo Clinic Care Network partnership',
    insuranceStatus: '40+ International Insurers',
    description: 'Member of Mayo Clinic Care Network. Comprehensive cardiology, gastroenterology and general medicine services with international standards.',
    image: '/images/sinounited.png',
  },
  {
    id: 'raffles',
    name: 'Shanghai Raffles Hospital',
    tier: 'tier2',
    specialties: ['Executive Health', 'General Medicine', 'Medical Tourism'],
    certifications: [],
    insurancePartners: ['MSH', 'Cigna', 'Bupa', 'Allianz', 'AIA', 'AXA'],
    internationalFeatures: 'Singapore-based Surbana Jurong group',
    insuranceStatus: 'International Insurance',
    description: 'Part of Singapore-based Surbana Jurong group. Focus on medical tourism with comprehensive health screening services.',
    image: '/images/raffles.jpeg',
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
  { value: '2,500+', label: 'International Patients', description: 'Served to date' },
  { value: '45+', label: 'Countries Served', description: 'Global reach' },
  { value: '98%', label: 'Satisfaction Rate', description: 'Patient feedback' },
  { value: '$2.5M+', label: 'Total Savings', description: 'For our patients' },
]

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    country: 'United States',
    treatment: 'Pediatric Cardiac Surgery',
    quote: 'The care my child received at Shanghai Children\'s Medical Center was exceptional. The medical team was professional and compassionate throughout our journey.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Chen',
    country: 'Singapore',
    treatment: 'Spine Surgery',
    quote: 'Xinhua Hospital provided world-class spine surgery. The international patient services made our stay comfortable and stress-free.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    country: 'Spain',
    treatment: 'Gynecological Care',
    quote: 'The personalized care at Jiahui International Hospital exceeded our expectations. Highly recommend for international patients.',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Wilson',
    country: 'United Kingdom',
    treatment: 'Cancer Treatment',
    quote: 'Huashan Hospital\'s oncology department provided excellent care with cutting-edge treatments. The language support was outstanding.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Yuki Tanaka',
    country: 'Japan',
    treatment: 'TCM Therapy',
    quote: 'Longhua Hospital introduced me to Traditional Chinese Medicine. The holistic approach helped me recover from my chronic condition.',
    rating: 5,
  },
]

// Social Proof Stats
export const socialProofStats = [
  { value: '2,500+', label: 'Patients Served' },
  { value: '45+', label: 'Countries' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '$2.5M+', label: 'Total Savings' },
]

// Patient Testimonials
export const patientTestimonials = [
  {
    id: 1,
    name: 'Michael T.',
    country: 'USA',
    treatment: 'Cardiac Surgery',
    testimonial: 'I saved $45,000 on cardiac surgery vs. the US. Bilingual nurse support made it the best medical experience ever.',
    avatar: 'M',
    rating: 5,
    savings: '$45,000',
  },
  {
    id: 2,
    name: 'Sarah K.',
    country: 'UK',
    treatment: 'Orthopedic Surgery',
    testimonial: 'The coordination team arranged everything perfectly. From airport pickup to hospital discharge, every detail was handled.',
    avatar: 'S',
    rating: 5,
    savings: '$12,000',
  },
  {
    id: 3,
    name: 'Kenji M.',
    country: 'Japan',
    treatment: 'Cancer Treatment',
    testimonial: 'Access to top oncologists and cutting-edge therapies. The medical report was detailed and in Japanese.',
    avatar: 'K',
    rating: 5,
    savings: '¥2,000,000',
  },
  {
    id: 4,
    name: 'Anna L.',
    country: 'Germany',
    treatment: 'Fertility Treatment',
    testimonial: 'The reproductive medicine department here has success rates that rival the best in Europe at a fraction of the cost.',
    avatar: 'A',
    rating: 5,
    savings: '€8,500',
  },
  {
    id: 5,
    name: 'David W.',
    country: 'Australia',
    treatment: 'Spinal Surgery',
    testimonial: 'World-class facilities with English-speaking staff. The entire medical journey was seamless and stress-free.',
    avatar: 'D',
    rating: 5,
    savings: '$18,000',
  },
]

// Nurse Services
export const nurseServices = [
  {
    title: 'Pre-Treatment Consultation',
    description: 'Review medical records, explain procedures, and coordinate with hospital specialists.',
    icon: 'Clipboard',
  },
  {
    title: 'Appointment Scheduling',
    description: 'Arrange doctor consultations, diagnostic tests, and treatment sessions.',
    icon: 'Calendar',
  },
  {
    title: 'Translation & Interpretation',
    description: 'Real-time medical interpretation during consultations and procedures.',
    icon: 'Languages',
  },
  {
    title: 'Hospital Navigation',
    description: 'Guide through admission, checkout, and payment processes.',
    icon: 'Map',
  },
  {
    title: 'Discharge Support',
    description: 'Medication instructions, follow-up appointments, and medical report translation.',
    icon: 'FileText',
  },
  {
    title: '24/7 Emergency Contact',
    description: 'Round-the-clock hotline for urgent medical or logistical concerns.',
    icon: 'Phone',
  },
]

// Nurse Credentials
export const nurseCredentials = [
  { name: 'Licensed Registered Nurses (RN)', detail: 'Verified by Shanghai Health Commission' },
  { name: 'Bilingual Certification', detail: 'TEM-8 English or equivalent' },
  { name: 'Medical Interpretation', detail: 'Certified medical interpreter' },
  { name: 'International Patient Care', detail: '5+ years experience' },
]

// Trust Pillars
export const trustPillars = [
  {
    icon: 'Shield',
    title: 'Verified Hospitals',
    items: [
      'All partner hospitals are Grade-A public or JCI-accredited private facilities',
      'Direct partnerships with 18 top Shanghai hospitals',
      'Regular quality assessments and patient feedback reviews',
    ],
  },
  {
    icon: 'Users',
    title: 'Professional Team',
    items: [
      'Licensed bilingual registered nurses with international patient experience',
      'Dedicated medical coordinators for each patient',
      '24/7 emergency contact and AI-powered support',
    ],
  },
  {
    icon: 'FileText',
    title: 'Transparent Process',
    items: [
      'Clear itemized cost estimates before treatment',
      'No hidden fees or unexpected charges',
      'Detailed medical reports in your language',
    ],
  },
  {
    icon: 'Headphones',
    title: 'Continuous Support',
    items: [
      'Pre-treatment consultation and hospital selection guidance',
      'On-ground support throughout your medical journey',
      'Post-treatment follow-up and rehabilitation coordination',
    ],
  },
]

// Process Steps
export const processSteps = [
  {
    step: 1,
    title: 'Submit Inquiry',
    description: 'Fill out our contact form with your medical needs. Our AI navigator responds instantly.',
    icon: 'MessageSquare',
  },
  {
    step: 2,
    title: 'Receive Consultation',
    description: 'Within 24 hours, a human coordinator provides hospital options and cost estimates.',
    icon: 'Users',
  },
  {
    step: 3,
    title: 'Confirm & Travel',
    description: 'Approve your plan and we arrange airport pickup, accommodation, and hospital appointments.',
    icon: 'Plane',
  },
  {
    step: 4,
    title: 'Receive Treatment',
    description: 'Our nurse accompanies you to consultations and procedures, handling all translation needs.',
    icon: 'Heart',
  },
  {
    step: 5,
    title: 'Follow-Up Care',
    description: 'After discharge, we coordinate medications, follow-up appointments, and remote consultations.',
    icon: 'MessageSquare',
  },
]

// FAQ Data
export const faqData = [
  {
    question: 'How do I start the medical tourism process?',
    answer: 'Simply fill out our contact form with your medical condition and preferences. Our team will respond within 24 hours with hospital recommendations and cost estimates.',
  },
  {
    question: 'Do you help with visa applications?',
    answer: 'Yes, we provide visa assistance for medical treatment. For eligible countries, we can also help arrange the 240-hour transit visa-free entry to Shanghai.',
  },
  {
    question: 'What if I don\'t speak Chinese?',
    answer: 'All our nurse coordinators provide real-time translation during medical consultations. Medical reports can be provided in English or your preferred language.',
  },
  {
    question: 'How do payments work?',
    answer: 'You pay directly to the hospital. We do not take commissions from medical fees. For insurance holders, we assist with direct settlement processes.',
  },
  {
    question: 'What types of treatments do you specialize in?',
    answer: 'We partner with top hospitals across all major specialties including oncology, cardiology, orthopedics, reproductive medicine, and Traditional Chinese Medicine.',
  },
]

// Price Reference
export const priceReference = [
  { item: 'Specialist Consultation', priceRMB: '¥500-1,500', priceUSD: '$70-210', note: 'Public hospital international department' },
  { item: 'Comprehensive Health Screening', priceRMB: '¥5,000-15,000', priceUSD: '$700-2,100', note: 'Full day executive checkup' },
  { item: 'Cardiac Bypass Surgery', priceRMB: '¥80,000-150,000', priceUSD: '$11,000-21,000', note: 'At top cardiac surgery centers' },
  { item: 'Hip Replacement', priceRMB: '¥60,000-100,000', priceUSD: '$8,500-14,000', note: 'Including implant' },
  { item: 'Laparoscopic Surgery', priceRMB: '¥40,000-80,000', priceUSD: '$5,600-11,200', note: 'Minimally invasive procedures' },
  { item: 'Cancer Treatment (Chemotherapy)', priceRMB: '¥10,000-30,000/cycle', priceUSD: '$1,400-4,200/cycle', note: 'Per chemotherapy cycle' },
  { item: 'IVF Treatment', priceRMB: '¥30,000-60,000', priceUSD: '$4,200-8,400', note: 'Per IVF attempt' },
  { item: 'Spinal Fusion', priceRMB: '¥80,000-150,000', priceUSD: '$11,000-21,000', note: 'Back surgery' },
]
