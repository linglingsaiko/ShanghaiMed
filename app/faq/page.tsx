import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Medical Tourism in Shanghai | ShanghaiMed',
  description:
    'Answers to 10 common questions about medical tourism in Shanghai: costs, hospital safety, English-speaking doctors, visas, insurance, and bilingual support for international patients.',
  keywords: [
    'medical tourism Shanghai FAQ',
    'Shanghai hospitals international patients',
    'China healthcare costs',
    'medical visa China',
    'ShanghaiMed pricing',
  ],
}

const faqs = [
  {
    q: 'How much does medical treatment cost in Shanghai compared to the US?',
    a: (
      <>
        <p className="mb-4">
          Medical procedures in Shanghai cost <strong>50-80% less</strong> than in the US. Here are specific examples:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Procedure</th>
                <th className="border border-gray-300 px-4 py-2 text-left">US Cost</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Shanghai Cost</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Savings</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Knee replacement', '$30,000-$50,000', '$5,000-$10,000', '80%'],
                ['Cardiac bypass', '$80,000-$150,000', '$11,000-$21,000', '80%'],
                ['MRI scan (3T)', '$1,200-$3,000', '$200-$400', '90%'],
                ['Dental implant (per tooth)', '$4,000-$6,000', '$800-$1,200', '80%'],
                ['IVF cycle', '$12,000-$15,000', '$3,000-$5,000', '75%'],
                ['Cataract surgery', '$3,500-$6,000', '$1,000-$2,000', '70%'],
                ['Comprehensive health checkup', '$2,000-$5,000', '$300-$600', '88%'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          ShanghaiMed's companion service packages are <strong>$1,000 for 3 days</strong> (Essential Care) or{' '}
          <strong>$1,650 for 5 days</strong> (Complex Care), which cover hospital coordination, bilingual escort,
          translation, and logistics. Hospital treatment costs are billed separately at local rates.
        </p>
      </>
    ),
  },
  {
    q: 'Is medical tourism in Shanghai safe for international patients?',
    a: (
      <>
        <p className="mb-4"><strong>Yes.</strong> Shanghai's top hospitals meet international safety standards:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Huashan Hospital</strong> (Fudan University) — JCI accredited, 24 international insurance partners, treats 5+ million outpatients annually</li>
          <li><strong>Ruijin Hospital</strong> (SJTU) — JCI accredited, 95.7% CAR-T therapy remission rate, EMR Level 7</li>
          <li><strong>Zhongshan Hospital</strong> (Fudan University) — JCI accredited, independent international patient building</li>
          <li><strong>Shanghai Ninth People's Hospital</strong> (SJTU) — #1 in China for dental and plastic surgery, treated patients from 40+ countries</li>
          <li><strong>Longhua Hospital</strong> (Shanghai University of TCM) — JCI accredited, national TCM flagship</li>
        </ul>
        <p>
          These hospitals use the <strong>same medical equipment</strong> (Siemens, GE Healthcare, Philips) and{' '}
          <strong>same implant brands</strong> (Stryker, Zimmer, Straumann) found in US hospitals. Many senior physicians
          have trained at Johns Hopkins, Mayo Clinic, and Cleveland Clinic.
        </p>
      </>
    ),
  },
  {
    q: 'Which hospitals in Shanghai does ShanghaiMed work with?',
    a: (
      <>
        <p className="mb-4">
          ShanghaiMed partners with <strong>14 public Grade-A medical tourism pilot hospitals</strong> and{' '}
          <strong>5 private international hospitals</strong> — a total of 19 institutions covering every medical specialty:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Hospital</th>
                <th className="border border-gray-300 px-4 py-2 text-left">University</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Key Specialty</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Huashan Hospital', 'Fudan University', 'Neurosurgery #1, Dermatology #1'],
                ['Children\'s Hospital', 'Fudan University', 'Neonatology, Pediatric Surgery'],
                ['Ruijin Hospital', 'SJTU', 'Hematology (CAR-T), Endocrinology'],
                ['Shanghai General Hospital', '—', 'Ophthalmology, ENT, Urology'],
                ['Zhongshan Hospital', 'Fudan University', 'Cardiovascular, General Surgery'],
                ['Renji Hospital', 'SJTU', 'Gastroenterology #1, Reproductive Medicine'],
                ['Longhua Hospital', 'Shanghai Univ. of TCM', 'Traditional Chinese Medicine'],
                ['IPMCH', 'China Welfare Institute', 'Reproductive Medicine, Obstetrics'],
                ['Shanghai Children\'s Medical Center', 'SJTU', 'Pediatric Cardiac Surgery'],
                ['Sixth People\'s Hospital', '—', 'Orthopedics (limb replantation since 1963)'],
                ['First Maternity & Infant Hospital', '—', 'Obstetrics, Fetal Medicine'],
                ['Xinhua Hospital', 'SJTU', 'Pediatrics, Dermatology'],
                ['Huadong Hospital', 'Fudan University', 'Geriatric Medicine, Health Screening'],
                ['Ninth People\'s Hospital', 'SJTU', 'Dental #1, Plastic Surgery #1'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Plus 5 private international hospitals: Jiahui International (Mass General affiliation), United Family,
          ParkwayHealth, SinoUnited Health (Mayo Clinic Network), and Raffles Hospital.
        </p>
      </>
    ),
  },
  {
    q: 'Do doctors in Shanghai speak English?',
    a: (
      <>
        <p className="mb-4">
          Many senior doctors at Shanghai's top hospitals have <strong>international training and speak English</strong>.
          Physicians regularly publish in English-language medical journals and attend international conferences.
        </p>
        <p className="mb-4">
          To guarantee zero communication gaps, ShanghaiMed provides <strong>professional bilingual medical companions</strong> (English-Chinese) who:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Accompany you to every appointment</li>
          <li>Translate medical terminology accurately</li>
          <li>Help with hospital paperwork and navigation</li>
          <li>Ensure you fully understand your diagnosis, treatment plan, and medication</li>
        </ul>
        <p>All medical documents, treatment plans, and prescriptions are <strong>translated into English</strong> for your records.</p>
      </>
    ),
  },
  {
    q: 'How do I get a medical visa for China?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed assists with the <strong>complete visa process</strong>:</p>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li><strong>Initial consultation</strong> (free, remote via video call)</li>
          <li><strong>Medical invitation letter</strong> — issued by the partner hospital after consultation</li>
          <li><strong>Visa application</strong> — you submit the invitation letter to the Chinese embassy/consulate</li>
          <li><strong>Processing time</strong> — typically 2-4 weeks</li>
          <li><strong>Document support</strong> — ShanghaiMed provides translation of all required documents</li>
        </ol>
        <p>
          China offers a <strong>144-hour transit visa exemption</strong> for citizens of 54 countries (including the US, UK,
          Canada, Australia, and most EU nations), which may be sufficient for shorter medical trips.
        </p>
      </>
    ),
  },
  {
    q: 'What is included in the ShanghaiMed service package?',
    a: (
      <>
        <p className="mb-2"><strong>Essential Care Package — $1,000 / 3 days</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Hospital appointment scheduling (1 hospital)</li>
          <li>Bilingual medical escort (English-Chinese)</li>
          <li>Medical translation at all appointments</li>
          <li>Local transportation to/from hospital</li>
          <li>AI-powered pre-consultation and cost estimation</li>
        </ul>
        <p className="mb-2"><strong>Complex Care Package — $1,650 / 5 days</strong></p>
        <p className="mb-1">Everything in Essential Care, plus:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Multi-hospital coordination (2+ hospitals)</li>
          <li>Specialist appointment booking</li>
          <li>Post-treatment follow-up (30 days, remote video check-ups)</li>
          <li>Visa assistance and airport pickup</li>
        </ul>
        <p>
          <strong>What's NOT included</strong> (billed separately by hospital at local rates): Hospital treatment costs
          (surgery, medication, lab tests), accommodation, and international flights.
        </p>
      </>
    ),
  },
  {
    q: 'Can I combine medical treatment with tourism in Shanghai?',
    a: (
      <>
        <p className="mb-4">
          <strong>Absolutely — this is ShanghaiMed's core philosophy.</strong> Shanghai is China's most international city with:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>The Bund</strong> — iconic waterfront promenade</li>
          <li><strong>Yu Garden</strong> — 400-year-old classical Chinese garden</li>
          <li><strong>Shanghai Tower</strong> — 2nd tallest building in the world (632m)</li>
          <li><strong>Shanghai Disneyland</strong> — Disney's largest castle globally</li>
          <li><strong>French Concession</strong> — tree-lined streets with cafes and boutiques</li>
        </ul>
        <p>
          Many patients schedule a <strong>medical appointment on Day 1-2</strong>, then spend the remaining days exploring
          the city. ShanghaiMed helps you integrate medical appointments into your travel itinerary so you don't waste
          vacation time.
        </p>
      </>
    ),
  },
  {
    q: 'What medical procedures are most popular for medical tourists in Shanghai?',
    a: (
      <>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Procedures</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Savings</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Top Hospital</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Orthopedic surgery', 'Knee/hip replacement, spine surgery', '80%', 'Sixth People\'s / Huashan'],
                ['Plastic surgery', 'Rhinoplasty, facial reconstruction', '70-80%', 'Ninth People\'s Hospital'],
                ['Dental treatment', 'Implants, crowns, orthodontics', '70-80%', 'Ninth People\'s Hospital'],
                ['TCM', 'Acupuncture, herbal therapy, Tuina', '75-80%', 'Longhua Hospital'],
                ['Cancer treatment', 'Chemotherapy, CAR-T, immunotherapy', '60-80%', 'Ruijin / Huashan'],
                ['Cardiac surgery', 'Bypass, valve replacement', '80%', 'Zhongshan Hospital'],
                ['Fertility treatment', 'IVF, ICSI', '75%', 'Renji / IPMCH'],
                ['Health screening', 'Full-day executive checkup', '88%', 'Huadong Hospital'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    q: 'Can I use my international health insurance?',
    a: (
      <>
        <p className="mb-4">
          Yes. ShanghaiMed partner hospitals have <strong>direct settlement agreements</strong> with major international
          insurers. Coverage ranges from 8 to 24 insurers per hospital:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Huashan Hospital — 24 insurance partners</li>
          <li>Shanghai Children's Medical Center — 23 insurance partners</li>
          <li>Ruijin Hospital — 21 insurance partners</li>
          <li>Renji Hospital — 20 insurance partners</li>
        </ul>
        <p>
          Accepted insurers include <strong>MSH, Bupa, Cigna, Aetna, AXA, Allianz, AIA, International SOS,</strong> and more.
          ShanghaiMed assists with insurance verification and direct settlement before your trip.
        </p>
      </>
    ),
  },
  {
    q: 'What happens after my medical treatment in Shanghai?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed provides <strong>comprehensive post-treatment follow-up</strong>:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Remote video check-ups</strong> with your treating doctor (Complex Care)</li>
          <li><strong>Translated medical records</strong> — full discharge summary, test results, and medication list in English</li>
          <li><strong>Medication guidance</strong> — dosage instructions, side effects, and interaction warnings</li>
          <li><strong>Recovery planning</strong> — personalized timeline and activity recommendations</li>
          <li><strong>Home-country coordination</strong> — we share your medical records with your primary care physician (with consent)</li>
          <li><strong>Ongoing support</strong> — our team remains available for questions after you return home</li>
        </ul>
        <p>For Complex Care patients, follow-up continues for <strong>30 days</strong> after treatment.</p>
      </>
    ),
  },
]

export default function FAQPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-12">
          Everything you need to know about receiving medical care in Shanghai — costs, hospital quality, visas, insurance, and bilingual support.
        </p>

        <div className="space-y-8 max-w-4xl">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Q{index + 1}: {faq.q}
              </h2>
              <div className="text-gray-700 leading-relaxed">
                {faq.a}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8 max-w-4xl">
          <h2 className="text-2xl font-bold text-primary mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Get a free, no-obligation consultation with ShanghaiMed. Our team responds within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:info@shanghaimedhealth.com"
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition"
            >
              Email Us
            </a>
            <a
              href="/#contact"
              className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Contact Form
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
