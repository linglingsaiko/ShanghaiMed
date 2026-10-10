import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medical Tourism Glossary: Key Terms Explained | ShanghaiMed',
  description:
    'Plain-language definitions of medical tourism terminology: facilitator vs broker, Grade 3A hospitals, JCI, ISPN, direct billing, medical visas, continuity of care, and more.',
  alternates: { canonical: 'https://shanghaimedhealth.com/glossary' },
  keywords: [
    'medical tourism glossary',
    'medical tourism terminology',
    'medical travel facilitator definition',
    'Grade 3A hospital China',
    'medical tourism terms',
  ],
}

interface GlossaryTerm {
  term: string
  aliases?: string[]
  category: string
  definition: string
  context?: string
}

const terms: GlossaryTerm[] = [
  // ─── Industry Roles ───
  {
    term: 'Medical Tourism Facilitator',
    aliases: ['Medical Travel Facilitator', 'MTF'],
    category: 'Industry Roles',
    definition:
      'A company or professional that coordinates a patient\u2019s cross-border medical journey \u2014 including hospital and physician selection, appointment scheduling, medical record translation, logistics, interpretation, and post-treatment follow-up. The role is formally defined by the international standard ISO 22525:2020.',
    context:
      'Facilitators charge a transparent service fee. Reputable facilitators do not replace the clinical judgment of doctors and do not receive undisclosed commissions from hospitals.',
  },
  {
    term: 'Medical Tourism Broker',
    category: 'Industry Roles',
    definition:
      'An intermediary whose primary model is matching patients to providers in exchange for a commission or referral fee, often without directly operating the on-the-ground coordination, translation, or care-management layer.',
    context:
      'The broker\u2013facilitator distinction is a business-model difference, not a legal title. Commission-based routing can create conflicts of interest between the intermediary\u2019s revenue and the patient\u2019s best match. Patients should ask any intermediary how it is paid.',
  },
  {
    term: 'Concierge Medicine',
    category: 'Industry Roles',
    definition:
      'A service model in which patients pay a fee for personalised coordination, faster access, dedicated support, and enhanced convenience \u2014 separate from the fees charged by the hospital for medical treatment itself.',
    context:
      'ShanghaiMed\u2019s coordination packages follow a concierge model: the fee buys scheduling, navigation, translation, and logistics; medical bills are paid directly to the hospital.',
  },
  {
    term: 'Case Manager',
    aliases: ['Patient Coordinator', 'Medical Concierge'],
    category: 'Industry Roles',
    definition:
      'The person responsible for organising an individual patient\u2019s journey end to end \u2014 appointments, documents, hand-offs between departments, and follow-up \u2014 so the patient does not navigate an unfamiliar healthcare system alone.',
  },

  // ─── Hospitals & Quality ───
  {
    term: 'Grade 3A Hospital',
    aliases: ['Grade 3A', '\u4e09\u7532', 'Class 3A', '3A Hospital'],
    category: 'Hospitals & Quality',
    definition:
      'The highest tier in China\u2019s official hospital classification system, administered by the National Health Commission. Grade 3A hospitals are evaluated on clinical capability, specialist volume, technology, research, teaching, and quality management.',
    context:
      'There are roughly 1,800 Grade 3A hospitals across China. Most of Shanghai\u2019s internationally recognised university hospitals carry this rating, which is the most useful current marker of hospital capability in mainland China.',
  },
  {
    term: 'Accreditation',
    category: 'Hospitals & Quality',
    definition:
      'A formal evaluation of a healthcare organisation against published quality and safety standards, conducted by an independent body. National accreditation (such as China\u2019s Grade 3A system) and international accreditation are different systems.',
    context:
      'Accreditation describes institutional processes and capability; it does not guarantee individual treatment outcomes. Patients should verify that accreditation is current, because some programmes have changed or closed.',
  },
  {
    term: 'JCI',
    aliases: ['Joint Commission International'],
    category: 'Hospitals & Quality',
    definition:
      'A former major international hospital accreditation programme. JCI accreditation was once held by a number of Chinese hospitals, but JCI ceased its accreditation business in mainland China in April 2023, so no new JCI accreditations are being issued there.',
    context:
      'A historical JCI certificate does not mean a hospital is currently JCI-accredited. For present-day capability in China, the Grade 3A rating and current official data are the reliable references.',
  },
  {
    term: 'ISQua',
    aliases: ['International Society for Quality in Health Care'],
    category: 'Hospitals & Quality',
    definition:
      'An international body that evaluates and recognises accreditation organisations themselves. An ISQua-recognised national accreditation system means that country\u2019s hospital standards meet internationally accepted requirements.',
  },
  {
    term: 'Clinical Outcome',
    category: 'Hospitals & Quality',
    definition:
      'A measurable result of medical care \u2014 such as survival, complication rate, remission, readmission, or recovery of function. Outcomes are stronger evidence of quality than process measures or facilities alone.',
    context:
      'Claims about outcomes should be traced to specific studies with defined populations and follow-up periods, and compared against appropriate benchmarks.',
  },
  {
    term: 'Evidence-Based Medicine',
    aliases: ['EBM'],
    category: 'Hospitals & Quality',
    definition:
      'The practice of making clinical decisions by integrating the best available peer-reviewed research, clinical expertise, and the individual patient\u2019s circumstances and preferences.',
  },

  // ─── Travel & Legal ───
  {
    term: 'Inbound Medical Tourism',
    category: 'Travel & Legal',
    definition:
      'Travel into a country by foreign patients specifically to receive medical care there. China has historically been a source (outbound) market but is increasingly developing as an inbound destination.',
  },
  {
    term: 'Outbound Medical Tourism',
    category: 'Travel & Legal',
    definition:
      'Patients leaving their home country to obtain medical treatment abroad, typically motivated by cost, waiting times, availability, or expertise.',
  },
  {
    term: 'Medical Visa',
    category: 'Travel & Legal',
    definition:
      'A visa issued for the purpose of receiving medical treatment, usually supported by an invitation or confirmation letter from the treating hospital and sometimes by a facilitating organisation.',
  },
  {
    term: 'Visa-Free Transit',
    aliases: ['240-Hour Transit Visa Exemption', 'Transit Without Visa'],
    category: 'Travel & Legal',
    definition:
      'A policy allowing eligible foreign nationals to enter a country for a limited period without a visa while transiting onward to a third country or region. China offers a 240-hour transit visa exemption to citizens of a defined list of countries.',
    context:
      'Eligibility, duration, and permitted area can change and vary by entry point and nationality; current official visa policy should always be checked before travel.',
  },
  {
    term: 'Informed Consent',
    category: 'Travel & Legal',
    definition:
      'The process by which a patient, after being told the benefits, risks, alternatives, and uncertainties of a procedure, voluntarily agrees to treatment. Accurate translation is essential for informed consent across language barriers.',
  },
  {
    term: 'Medical Records Translation',
    category: 'Travel & Legal',
    definition:
      'Translation of clinical documents \u2014 history, discharge summaries, imaging reports, lab results, and medication lists \u2014 between the patient\u2019s language and the treating hospital\u2019s language. Medical translation requires command of clinical terminology, not general bilingual fluency.',
  },

  // ─── Money & Insurance ───
  {
    term: 'Direct Billing',
    aliases: ['Cashless Settlement', 'Direct Settlement'],
    category: 'Money & Insurance',
    definition:
      'An arrangement in which a hospital settles eligible charges directly with an insurance company, so the patient does not pay upfront and later claim reimbursement. It requires the hospital to hold an agreement with that insurer.',
    context:
      'Coverage is insurer- and hospital-specific. Patients should confirm pre-authorisation and the exact scope of covered services before treatment, because not all costs are necessarily settled directly.',
  },
  {
    term: 'Fee-for-Service',
    category: 'Money & Insurance',
    definition:
      'A payment model in which each medical service \u2014 consultation, test, procedure, or medication \u2014 is billed separately, rather than bundled into one fixed package.',
  },
  {
    term: 'Out-of-Pocket Cost',
    category: 'Money & Insurance',
    definition:
      'The portion of medical expenses the patient pays directly, including costs not covered by insurance, deductibles, and non-medical expenses such as travel and accommodation.',
  },
  {
    term: 'Transparent Pricing',
    category: 'Money & Insurance',
    definition:
      'Clear, published information about what each party charges \u2014 distinguishing the facilitator\u2019s service fee from the hospital\u2019s medical fees, which are paid separately and at the hospital\u2019s own rates.',
  },
  {
    term: 'Commission',
    category: 'Money & Insurance',
    definition:
      'A payment made to an intermediary for steering or referring a patient to a particular provider. Undisclosed commissions can conflict with objective patient matching and are a central ethical concern in medical travel.',
  },

  // ─── Care Continuity ───
  {
    term: 'Continuity of Care',
    category: 'Care Continuity',
    definition:
      'The coherent, uninterrupted management of a patient\u2019s treatment across providers, locations, and time \u2014 especially important when care crosses national borders and involves follow-up after the patient returns home.',
  },
  {
    term: 'Post-Operative Care',
    aliases: ['Post-op Care'],
    category: 'Care Continuity',
    definition:
      'Medical and nursing care after surgery, including wound care, monitoring for complications, pain management, rehabilitation, and follow-up appointments. Planning for post-operative care \u2014 including after returning home \u2014 is a key safety consideration in medical tourism.',
  },
  {
    term: 'Complication',
    category: 'Care Continuity',
    definition:
      'An unintended and undesirable medical problem arising during or after treatment, such as infection, bleeding, or device failure. All procedures carry some risk of complications, and managing them far from home can be difficult and costly.',
  },
  {
    term: 'Discharge Summary',
    category: 'Care Continuity',
    definition:
      'A clinical report prepared when a patient leaves hospital, documenting the diagnosis, treatment, procedures, medications, and follow-up instructions. A translated discharge summary is central to safe continuity of care in the home country.',
  },
  {
    term: 'Medical Escort',
    aliases: ['Bilingual Medical Companion'],
    category: 'Care Continuity',
    definition:
      'A clinically trained, language-matched professional who accompanies the patient to appointments, interprets medical communication accurately, assists with hospital navigation and paperwork, and helps confirm the patient understands the diagnosis and plan.',
  },

  // ─── Nursing & Language ───
  {
    term: 'ISPN',
    aliases: ['International Standards for Professional Nurses'],
    category: 'Nursing & Language',
    definition:
      'An international credential for registered nurses, verifying nursing knowledge and professional standards against internationally referenced requirements. It is distinct from a national nursing licence.',
  },
  {
    term: 'Registered Nurse',
    aliases: ['RN'],
    category: 'Nursing & Language',
    definition:
      'A nurse who holds a current licence to practise after completing the required education and examination. In China, nursing licences are issued through the national health authority system; titles such as senior or charge nurse reflect further professional ranking.',
  },
  {
    term: 'Medical Interpreter',
    category: 'Nursing & Language',
    definition:
      'A specialist interpreter trained in clinical terminology, ethics, confidentiality, and accuracy for healthcare encounters. Medical interpreting differs from conversational bilingual ability, and errors can directly affect safety.',
  },

  // ─── Treatment Types ───
  {
    term: 'Traditional Chinese Medicine',
    aliases: ['TCM', '\u4e2d\u533b'],
    category: 'Treatment Types',
    definition:
      'A system of medicine developed in China that includes acupuncture, herbal medicine, tuina massage, cupping, and related therapies, grounded in its own diagnostic framework. Some TCM interventions have been studied in modern clinical trials while others remain under investigation.',
  },
  {
    term: 'Executive Health Screening',
    aliases: ['Health Checkup', 'Comprehensive Health Screening'],
    category: 'Treatment Types',
    definition:
      'A coordinated programme of preventive examinations \u2014 imaging, laboratory tests, and specialist review \u2014 often completed within a single visit or day, used for early detection and health assessment.',
  },
  {
    term: 'CAR-T Therapy',
    aliases: ['Chimeric Antigen Receptor T-Cell Therapy'],
    category: 'Treatment Types',
    definition:
      'A form of immunotherapy in which a patient\u2019s own immune cells are engineered to recognise and attack cancer cells. It is a complex, specialised treatment offered at selected advanced centres.',
  },
  {
    term: 'Telemedicine',
    aliases: ['Telehealth', 'Remote Consultation'],
    category: 'Treatment Types',
    definition:
      'The delivery of clinical consultation or follow-up remotely by video or other digital means. Telemedicine is useful for initial and post-trip follow-up, but it cannot replace in-person examination or treatment when those are required.',
  },

  // ─── Content & Research ───
  {
    term: 'Peer Review',
    category: 'Content & Research',
    definition:
      'The evaluation of a research manuscript by independent experts in the field before publication. Peer-reviewed studies are generally considered stronger evidence than unreviewed or promotional material.',
  },
  {
    term: 'Systematic Review',
    category: 'Content & Research',
    definition:
      'A research method that identifies, appraises, and synthesises all eligible studies on a defined question using pre-specified, reproducible methods. It is distinct from a traditional narrative review.',
  },
  {
    term: 'Randomized Controlled Trial',
    aliases: ['RCT'],
    category: 'Content & Research',
    definition:
      'A study in which participants are randomly assigned to an intervention or a control group, reducing bias and providing some of the strongest evidence for whether a treatment causes an effect.',
  },
  {
    term: 'E-E-A-T',
    category: 'Content & Research',
    definition:
      'Experience, Expertise, Authoritativeness, and Trustworthiness \u2014 the framework used to assess the credibility of online information, applied especially rigorously to health and other \u201cYour Money or Your Life\u201d topics.',
  },
  {
    term: 'YMYL',
    aliases: ['Your Money or Your Life'],
    category: 'Content & Research',
    definition:
      'A category of online content that could affect a person\u2019s health, safety, finances, or welfare. Health and medical information is treated as YMYL and held to higher standards of accuracy, authoritativeness, and trust.',
  },
  {
    term: 'Structured Data',
    aliases: ['Schema.org Markup', 'JSON-LD'],
    category: 'Content & Research',
    definition:
      'Standardised, machine-readable code that helps search engines and AI systems understand the entities and relationships on a page \u2014 such as an organisation, a person, a study, or a defined term.',
  },
]

const categories = Array.from(new Set(terms.map(t => t.category)))

export default function GlossaryPage() {
  const definedTermSetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Medical Tourism Glossary',
    description:
      'Plain-language definitions of medical tourism and cross-border healthcare terminology.',
    url: 'https://shanghaimedhealth.com/glossary',
    hasDefinedTerm: terms.map(t => ({
      '@type': 'DefinedTerm',
      name: t.term,
      ...(t.aliases ? { alternateName: t.aliases.join(', ') } : {}),
      description: t.definition,
      inDefinedTermSet: 'Medical Tourism Glossary',
    })),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />

      {/* Hero */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <p className="text-sm text-teal-600 font-medium mb-2">Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Medical Tourism Glossary</h1>
          <p className="text-lg text-gray-600">
            {terms.length} plain-language definitions of the terms patients encounter when arranging
            medical care abroad \u2014 who does what, how hospitals are graded, how payment and insurance
            work, and what safe continuity of care requires.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last reviewed: October 10, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick navigation */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <a
              key={cat}
              href={`#${cat.toLowerCase().replace(/[^a-z]+/g, '-')}`}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors"
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Term sections */}
        {categories.map(cat => (
          <section
            key={cat}
            id={cat.toLowerCase().replace(/[^a-z]+/g, '-')}
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              {cat}
            </h2>
            <dl className="space-y-6">
              {terms
                .filter(t => t.category === cat)
                .map(t => (
                  <div
                    key={t.term}
                    id={t.term.toLowerCase().replace(/[^a-z]+/g, '-')}
                    className="bg-white rounded-lg border p-6 scroll-mt-24"
                  >
                    <dt className="text-lg font-semibold text-gray-900">{t.term}</dt>
                    {t.aliases && (
                      <p className="text-sm text-gray-500 mt-1">
                        Also known as: {t.aliases.join(' · ')}
                      </p>
                    )}
                    <dd className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
                      {t.definition}
                    </dd>
                    {t.context && (
                      <dd className="mt-3 text-sm text-gray-600 bg-gray-50 rounded p-3 leading-relaxed">
                        {t.context}
                      </dd>
                    )}
                  </div>
                ))}
            </dl>
          </section>
        ))}

        {/* Related links */}
        <div className="mt-12 bg-teal-50 border border-teal-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Go deeper</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/research" className="text-teal-700 font-medium hover:underline">
                Research Library
              </a>{' '}
              <span className="text-gray-600">
                — peer-reviewed studies behind the claims about medical travel to China.
              </span>
            </li>
            <li>
              <a href="/editorial-policy" className="text-teal-700 font-medium hover:underline">
                Editorial Policy
              </a>{' '}
              <span className="text-gray-600">\u2014 how we source, grade, and correct information.</span>
            </li>
            <li>
              <a href="/founder" className="text-teal-700 font-medium hover:underline">
                About the Founder
              </a>{' '}
              <span className="text-gray-600">\u2014 the clinical and operational background behind ShanghaiMed.</span>
            </li>
            <li>
              <a href="/blog" className="text-teal-700 font-medium hover:underline">
                Blog
              </a>{' '}
              <span className="text-gray-600">\u2014 practical guides for patients considering treatment in Shanghai.</span>
            </li>
          </ul>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          This glossary is provided for general informational purposes and does not constitute medical,
          legal, or insurance advice. Visa and insurance terms vary by nationality, insurer, and current
          policy; verify details against official sources before travelling.
        </p>
      </div>
    </div>
  )
}
