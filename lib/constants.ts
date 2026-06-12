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
    insurancePartners: ['MSH', 'Bupa', 'Cigna', 'Aetna', 'AXA', 'Allianz', 'International SOS', 'Now Health', 'Pacific Prime', 'Ping An Health', 'Pacific Health', 'AIA', 'ICBC-AXA', 'MediLink', 'CIGNA & CMC', 'Windstone Health', 'PICC Health', 'SOS International', 'AXA PPP', 'Bupa Global', 'Allianz Care', 'Aetna International', 'Generali Global Health', 'Zurich International'],
    internationalFeatures: 'Dedicated international department, 24 accepted insurance providers',
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
    insurancePartners: ['MSH', 'Cigna', 'Ping An Health', 'AIA', 'Allianz', 'AXA', 'MediLink', 'Now Health', 'Pacific Prime', 'International SOS', 'CIGNA & CMC', 'Windstone Health', 'Bupa', 'Aetna', 'Pacific Health', 'ICBC-AXA', 'SOS International', 'AXA PPP', 'Bupa Global'],
    internationalFeatures: 'International pediatric department since 1993, 19 accepted insurance providers',
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
    insurancePartners: ['MSH', 'Pacific Health', 'Ping An Health', 'Cigna', 'AIA', 'Allianz', 'AXA', 'ICBC-AXA', 'MediLink', 'Now Health', 'Bupa', 'Aetna', 'International SOS', 'CIGNA & CMC', 'Windstone Health', 'PICC Health', 'SOS International', 'AXA PPP', 'Bupa Global', 'Allianz Care', 'Aetna International'],
    internationalFeatures: '95.7% CAR-T remission rate, dedicated international ward, 21 accepted insurance providers',
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
    insurancePartners: ['AIA', 'MSH', 'SOS International', 'Ping An Health', 'Pacific Health', 'Cigna', 'Allianz', 'AXA', 'MediLink', 'Bupa', 'Now Health', 'CIGNA & CMC', 'Windstone Health', 'ICBC-AXA', 'Pacific Prime', 'International SOS', 'AXA PPP'],
    internationalFeatures: 'International patient center with multilingual staff, 17 accepted insurance providers',
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
    insurancePartners: ['MSH', 'Ping An Health', 'Pacific Health', 'AIA', 'Cigna', 'Allianz', 'AXA', 'ICBC-AXA', 'MediLink', 'Bupa', 'Now Health', 'CIGNA & CMC', 'Windstone Health', 'PICC Health', 'SOS International', 'AXA PPP', 'Bupa Global', 'Allianz Care', 'Aetna International'],
    internationalFeatures: 'Independent international patient building, 19 accepted insurance providers',
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
    insurancePartners: ['Cigna', 'AXA', 'AIA', 'Allianz', 'MSH', 'PICC Health', 'Ping An Health', 'Pacific Health', 'ICBC-AXA', 'MediLink', 'International SOS', 'Now Health', 'Bupa', 'Aetna', 'CIGNA & CMC', 'Windstone Health', 'SOS International', 'AXA PPP', 'Bupa Global', 'Allianz Care'],
    internationalFeatures: 'International reproductive medicine center, 20 accepted insurance providers',
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
    insurancePartners: ['MSH', 'Ping An Health', 'Pacific Health', 'AIA', 'Cigna', 'Allianz', 'AXA', 'MediLink', 'Bupa', 'Now Health', 'CIGNA & CMC', 'Windstone Health', 'ICBC-AXA', 'Pacific Prime', 'International SOS', 'AXA PPP', 'Bupa Global', 'Allianz Care'],
    internationalFeatures: 'Official TCM medical tourism pilot hospital, 18 accepted insurance providers',
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
    insurancePartners: ['MSH', 'Ping An Health', 'AIA', 'Cigna', 'Allianz', 'MediLink', 'Bupa', 'AXA', 'Now Health', 'CIGNA & CMC', 'Windstone Health', 'ICBC-AXA', 'Pacific Prime', 'International SOS', 'AXA PPP', 'Bupa Global', 'Allianz Care', 'Aetna International', 'Pacific Health'],
    internationalFeatures: 'China Welfare Institute affiliated, international maternity care, 19 accepted insurance providers',
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
    insurancePartners: ['MSH', 'CIGNA & CMC', 'Ping An', 'AIA', 'MediLink', 'Windstone Health', 'Allianz', 'AXA', 'Cigna', 'Now Health', 'Pacific Prime', 'Bupa', 'Aetna', 'International SOS', 'Pacific Health', 'ICBC-AXA', 'SOS International', 'AXA PPP', 'Bupa Global', 'Allianz Care', 'Aetna International', 'Generali Global Health', 'Zurich International', 'PICC Health'],
    internationalFeatures: 'Partnership with Project HOPE, international pediatric center, 23 accepted insurance providers',
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
    insurancePartners: ['MSH', 'Ping An Health', 'Pacific Health', 'Cigna', 'AIA', 'Allianz', 'AXA', 'MediLink', 'Bupa', 'Now Health', 'CIGNA & CMC', 'Windstone Health', 'ICBC-AXA', 'Pacific Prime', 'International SOS', 'AXA PPP', 'Bupa Global', 'Allianz Care'],
    internationalFeatures: 'World\'s first limb replantation center, 18 accepted insurance providers',
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
    insurancePartners: ['MSH', 'AIA', 'MediLink', 'Ping An Health', 'Cigna', 'Allianz', 'AXA', 'ICBC-AXA', 'Now Health', 'Bupa', 'Pacific Health', 'CIGNA & CMC', 'Windstone Health', 'Pacific Prime', 'International SOS', 'AXA PPP', 'Bupa Global', 'Allianz Care'],
    internationalFeatures: 'Dedicated international maternity services, 18 accepted insurance providers',
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
    insurancePartners: ['MSH', 'Ping An Health', 'Pacific Health', 'AIA', 'Cigna', 'Allianz', 'AXA', 'MediLink', 'Bupa', 'Now Health', 'CIGNA & CMC', 'Windstone Health', 'ICBC-AXA', 'Pacific Prime', 'International SOS', 'AXA PPP'],
    internationalFeatures: 'Comprehensive international department, 16 accepted insurance providers',
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
    insurancePartners: ['Cigna', 'Bupa', 'Ping An', 'MSH', 'ICBC-AXA', 'MediLink', 'Allianz', 'AXA', 'AIA', 'Now Health', 'CIGNA & CMC', 'Windstone Health', 'Pacific Health', 'Pacific Prime', 'International SOS', 'AXA PPP', 'Allianz Care'],
    internationalFeatures: 'Executive health screening center, international rehabilitation, 17 accepted insurance providers',
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
  { href: '#treatments', label: 'Hospital Network' },
  { href: '#care-team', label: 'Care Team' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#insights', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

// Statistics data
export const statistics = [
  { value: '73,000+', label: "Shanghai's Annual International Patient Visits", description: 'Source: Shanghai Municipal Health Commission, 2025' },
  { value: '23', label: 'Public Hospitals with International Services', description: 'Source: Shanghai International Service Portal' },
  { value: '90+', label: 'Nationalities Served', description: 'Source: Huashan Hospital International Medical Center, 2025' },
  { value: '25%', label: 'Year-over-Year Growth', description: 'Source: Shanghai Municipal Health Commission, 2024' },
]

// Testimonials
// TODO: Replace with real patient testimonials before launch
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
  { value: '73,000+', label: "Shanghai's Int'l Patient Visits" },
  { value: '23', label: 'Public Hospitals' },
  { value: '90+', label: 'Nationalities' },
  { value: '25%', label: 'YoY Growth' },
]

// Patient Testimonials
// TODO: Replace with real patient testimonials before launch
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
    title: 'Insurance Support',
    description: 'Provide administrative support for policy benefit checks & hospital insurance coverage confirmation',
    icon: 'Clipboard',
  },
]

// Nurse Credentials
export const nurseCredentials = [
  { name: 'Licensed Registered Nurses (RN)', detail: 'Verified by Shanghai Health Commission' },
  { name: 'Bilingual Certification', detail: 'Fluent in English' },
  { name: 'Medical Interpretation', detail: 'Supports medical document translation and on-site interpretation' },
  { name: 'International Patient Care', detail: '5+ years experience' },
]

// Trust Pillars
export const trustPillars = [
  {
    icon: 'Shield',
    title: 'Verified Hospitals',
    items: [
      'All supported hospitals are Grade-A public or JCI-accredited private facilities',
      '18 top Shanghai hospitals in our network',
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
    description: 'Fill out our contact form with your medical needs. Our AI navigator is available 24/7.',
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
    description: 'Once you\'re ready to proceed, we coordinate appointments, travel logistics, and arrival support.',
    icon: 'Plane',
  },
  {
    step: 4,
    title: 'Receive Care',
    description: 'Your bilingual nurse provides in-person support throughout consultations, examinations, and treatment.',
    icon: 'Heart',
  },
  {
    step: 5,
    title: 'Follow-Up Care',
    description: 'We assist with medical records, follow-up appointments, prescription coordination, and remote consultations.',
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
    answer: 'You pay directly to the hospital. For insurance holders, we assist with direct settlement processes.',
  },
  {
    question: 'What types of treatments do you specialize in?',
    answer: 'We support a wide range of healthcare needs, from preventive checkups and specialist consultations to complex medical care. Every patient\'s needs are different. We help identify the most appropriate hospital, specialist, and care pathway for your situation.',
  },
]

// Price Reference
export const priceReference = [
  { item: 'Specialist Consultation', priceRMB: '¥500-1,500', priceCNYtoUSD: '$70-210', priceUSD: '$200-500', note: 'Public hospital international department' },
  { item: 'Comprehensive Health Screening', priceRMB: '¥5,000-15,000', priceCNYtoUSD: '$700-2,100', priceUSD: '$1,500-4,000', note: 'Full day executive checkup' },
  { item: 'Cardiac Bypass Surgery', priceRMB: '¥80,000-150,000', priceCNYtoUSD: '$11,000-21,000', priceUSD: '$80,000-150,000', note: 'At top cardiac surgery centers' },
  { item: 'Hip Replacement', priceRMB: '¥60,000-100,000', priceCNYtoUSD: '$8,500-14,000', priceUSD: '$40,000-70,000', note: 'Including implant' },
  { item: 'Laparoscopic Surgery', priceRMB: '¥40,000-80,000', priceCNYtoUSD: '$5,600-11,200', priceUSD: '$20,000-50,000', note: 'Minimally invasive procedures' },
  { item: 'Cancer Treatment (Chemotherapy)', priceRMB: '¥10,000-30,000/cycle', priceCNYtoUSD: '$1,400-4,200/cycle', priceUSD: '$10,000-30,000/cycle', note: 'Per chemotherapy cycle' },
  { item: 'IVF Treatment', priceRMB: '¥30,000-60,000', priceCNYtoUSD: '$4,200-8,400', priceUSD: '$15,000-30,000', note: 'Per IVF attempt' },
  { item: 'Spinal Fusion', priceRMB: '¥80,000-150,000', priceCNYtoUSD: '$11,000-21,000', priceUSD: '$50,000-100,000', note: 'Back surgery' },
]
