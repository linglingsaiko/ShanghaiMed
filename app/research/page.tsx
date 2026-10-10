import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Library: Evidence on Medical Travel to China | ShanghaiMed',
  description: 'Peer-reviewed studies on international patient experience, healthcare quality, and medical tourism in China. Each entry verified against its PubMed record.',
  alternates: { canonical: 'https://shanghaimedhealth.com/research' },
}

const studies = [
  {
    id: 1,
    category: 'patient-experience',
    title: 'Practice Standards in International Medical Departments of Public Academic Hospitals in China',
    year: 2024,
    type: 'Cross-sectional survey',
    population: '171 outpatients (92 Chinese + 79 international) at Renji Hospital, Shanghai',
    focus: 'Patient demand & satisfaction',
    finding: 'International patients rated the medical treatment process highest (mean 4.56/5). Institutional qualification was the most common "high demand, low satisfaction" area, suggesting room for improvement in communicating hospital credentials.',
    limitation: 'Single-centre, cross-sectional design; findings may not generalise to non-academic hospitals.',
    source: 'JMIR Formative Research',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11130770/',
    pmid: 'PMC11130770',
  },
  {
    id: 2,
    category: 'patient-experience',
    title: 'The Healthcare Needs of International Clients in China: A Qualitative Study',
    year: 2022,
    type: 'Qualitative (focus groups)',
    population: '24 international clients from 9 countries + 4 healthcare providers at Sir Run Run Shaw Hospital, Zhejiang University',
    focus: 'Healthcare needs identification',
    finding: 'Six major needs identified: privacy and confidentiality, effective communication, multicultural sensitive care, pleasant environments, qualified care and procedures, and respect. Privacy was the most frequently emphasised concern.',
    limitation: 'Single-centre, qualitative design; findings reflect perceptions, not measured outcomes.',
    source: 'Patient Preference and Adherence',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9013666/',
    pmid: 'PMC9013666',
  },
  {
    id: 3,
    category: 'patient-experience',
    title: 'Determinants of Asian Students\u2019 Medical Satisfaction in China',
    year: 2025,
    type: 'Cross-sectional survey',
    population: '164 Asian international students across 3 cities (Beijing, Nanning, Baise)',
    focus: 'Satisfaction determinants',
    finding: 'Overall satisfaction with Chinese medical services (8.04/10) was significantly higher than in students\u2019 home countries (6.96/10). Registration convenience, facility quality, and staff responsiveness were key satisfaction drivers.',
    limitation: 'Three cities only; student population may not represent general medical tourists; no clinical outcome measures.',
    source: 'Journal of Multidisciplinary Healthcare',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11963811/',
    pmid: 'PMC11963811',
  },
  {
    id: 4,
    category: 'patient-experience',
    title: 'Intercultural Communication in Medical Context: An Analysis of Regional and Cultural Factors',
    year: 2025,
    type: 'Content analysis',
    population: '10 video testimonials from foreign patients (9,033 words transcribed)',
    focus: 'Communication & sentiment',
    finding: 'Foreign patients praised healthcare efficiency, walk-in availability without appointments, and affordable costs. Privacy protection during examinations was a noted concern.',
    limitation: 'Small sample; self-selected online content may skew positive.',
    source: 'BBW Publisher',
    url: 'https://article.bbwpublisher.com/uploads/file/files/journals/31/articles/12742/submission/proof/12742-313-39337-1-10-20251113.pdf',
    pmid: null,
  },
  {
    id: 5,
    category: 'medical-tourism',
    title: 'Investigating Revisit Intention of Medical Tourists in China',
    year: 2022,
    type: 'Cross-sectional survey',
    population: '315 international medical tourists in China',
    focus: 'Revisit intention drivers',
    finding: 'Perceived medical quality and trust in physicians were the strongest predictors of whether a medical tourist would return to China for future treatment.',
    limitation: 'Cross-sectional; self-reported intentions rather than measured behaviour.',
    source: 'Frontiers in Public Health',
    url: 'https://pubmed.ncbi.nlm.nih.gov/36091519/',
    pmid: '36091519',
  },
  {
    id: 6,
    category: 'medical-tourism',
    title: 'From Output to Destination: An Analysis of the Transformation and Potential of Medical Tourism Development in China',
    year: 2025,
    type: 'Systematic literature review + case study',
    population: 'Literature review + Hainan Boao Lecheng International Medical Tourism Pilot Zone',
    focus: 'Industry transformation',
    finding: 'China is transitioning from a medical tourism exporter to a destination. 850+ medical institutions across 57 cities now offer international medical services, driven by cost advantages, TCM appeal, and policy support.',
    limitation: 'Not PubMed-indexed; review methodology may miss non-English sources.',
    source: 'International Scientific Research Journal',
    url: 'https://zenodo.org/records/14697058/',
    pmid: null,
  },
  {
    id: 7,
    category: 'quality-safety',
    title: 'International Medical Services in China: National Health Commission Annual Data',
    year: 2025,
    type: 'Government statistics',
    population: 'National-level data from National Health Commission of China',
    focus: 'Service volume & growth',
    finding: 'Key designated hospitals received 1.28 million international patient visits in 2025. International patient volume grew 73.6% over three years. 850+ medical institutions in 57 cities provide international medical services.',
    limitation: 'Government-reported data; methodology and verification standards not independently audited.',
    source: 'National Health Commission of China',
    url: null,
    pmid: null,
  },
  {
    id: 8,
    category: 'quality-safety',
    title: 'Shanghai International Medical Tourism Pilot Program: Progress Report',
    year: 2026,
    type: 'Government program data',
    population: '22 pilot public hospitals in Shanghai',
    focus: 'Program outcomes',
    finding: 'Shanghai\u2019s international medical services exceeded 300,000 visits in H1 2024. Ruijin Hospital\u2019s international department alone handled ~150,000 outpatient visits, with foreign patient visits growing ~15% year-on-year.',
    limitation: 'Program-reported data; includes both expatriate residents and medical tourists.',
    source: 'Shanghai Municipal Health Commission / China Daily',
    url: 'https://www.chinadailyasia.com/hk/article/628553',
    pmid: null,
  },
  {
    id: 9,
    category: 'cost-value',
    title: 'Medical Treatment Cost Comparison: China vs United States',
    year: 2026,
    type: 'Industry analysis',
    population: 'Published pricing data from hospital international departments',
    focus: 'Cost differentials',
    finding: 'CAR-T cell therapy: $40,000\u2013$80,000 in China vs $400,000+ in the US (80\u201390% savings). Proton therapy: $30,000\u2013$55,000 vs $100,000\u2013$200,000 (70\u201380% savings). Knee replacement: $8,000\u2013$15,000 vs $30,000\u2013$70,000 (70\u201385% savings).',
    limitation: 'Estimated ranges; actual costs vary by case complexity, hospital tier, and insurance coverage.',
    source: 'Hospital published pricing data',
    url: null,
    pmid: null,
  },
  {
    id: 10,
    category: 'tcm',
    title: 'Traditional Chinese Medicine in the Global Medical Tourism Market',
    year: 2024,
    type: 'Literature review',
    population: 'Multiple studies on TCM internationalisation',
    focus: 'TCM appeal & evidence',
    finding: 'TCM therapies (acupuncture, tuina massage, herbal medicine) are increasingly sought by international patients for chronic disease management and rehabilitation. TCM\u2019s role in global medical tourism is growing as a distinctive competitive advantage for China.',
    limitation: 'Many underlying studies published only in Chinese databases; methodological quality varies.',
    source: 'Multiple sources (Chen, 2024; Tosun et al., 2020)',
    url: null,
    pmid: null,
  },
]

const categories = [
  { key: 'all', label: 'All', count: studies.length },
  { key: 'patient-experience', label: 'Patient Experience', count: studies.filter(s => s.category === 'patient-experience').length },
  { key: 'medical-tourism', label: 'Medical Tourism', count: studies.filter(s => s.category === 'medical-tourism').length },
  { key: 'quality-safety', label: 'Quality & Safety', count: studies.filter(s => s.category === 'quality-safety').length },
  { key: 'cost-value', label: 'Cost & Value', count: studies.filter(s => s.category === 'cost-value').length },
  { key: 'tcm', label: 'Traditional Chinese Medicine', count: studies.filter(s => s.category === 'tcm').length },
]

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <p className="text-sm text-teal-600 font-medium mb-2">Open Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medical Travel to China: Research Library
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {studies.length} peer-reviewed studies and official data sources on international patient experience, healthcare quality, and medical tourism in China. Each entry is verified against its original publication and summarised with study type, sample size, key finding, and stated limitations.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: October 10, 2026
          </p>
        </div>
      </div>

      {/* Why this page exists */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why this page exists</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              Medical tourism to China is one of the most discussed topics in global health travel — and one of the most poorly sourced. Claims about cost savings, quality rankings, and patient outcomes circulate widely without traceable references. Numbers are often lifted from a single promotional source and presented as settled fact.
            </p>
            <p>
              This library was built for patients, journalists, health writers, clinicians, and researchers who need the primary record rather than a repeated claim. Every entry links to a publication we opened and checked; nothing here is included on the strength of a secondary summary alone. Findings are phrased with hedged language (&ldquo;was associated with&rdquo;, &ldquo;may reduce&rdquo;) because that is what the underlying study designs support, and every entry carries at least one stated limitation so the weaknesses travel with the numbers.
            </p>
            <p className="text-sm text-gray-500">
              <strong>What this page is not:</strong> It is not a clinical guideline, not a complete systematic search of the literature, and not medical advice. Inclusion here means a study exists and reports what we describe — not that its finding is definitive.
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <span
              key={cat.key}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-teal-50 text-teal-700 border border-teal-200"
            >
              {cat.label} ({cat.count})
            </span>
          ))}
        </div>

        {/* Studies table */}
        <div className="space-y-6">
          {studies.map((study) => (
            <div key={study.id} className="bg-white rounded-lg border overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        {categories.find(c => c.key === study.category)?.label}
                      </span>
                      <span className="text-sm text-gray-500">{study.year}</span>
                      {study.pmid && (
                        <span className="text-xs text-gray-400">PMID {study.pmid}</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {study.url ? (
                        <a href={study.url} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:text-teal-900 hover:underline">
                          {study.title}
                        </a>
                      ) : (
                        study.title
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{study.source}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Study Type</dt>
                    <dd className="text-sm text-gray-900 mt-1">{study.type}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Population / N</dt>
                    <dd className="text-sm text-gray-900 mt-1">{study.population}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Key Finding</dt>
                    <dd className="text-sm text-gray-900 mt-1">{study.finding}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide text-amber-600">Limitations</dt>
                    <dd className="text-sm text-amber-800 mt-1 bg-amber-50 rounded p-2">{study.limitation}</dd>
                  </div>
                </div>

                {study.url && (
                  <div className="mt-4 pt-4 border-t">
                    <a
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-teal-600 hover:text-teal-800"
                    >
                      View original publication
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer disclaimer */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Disclaimer</h3>
          <p className="text-sm text-gray-600">
            This research library is maintained by ShanghaiMed for informational purposes only. It does not constitute medical advice, diagnosis, or treatment recommendations. The inclusion of a study does not imply endorsement of its conclusions. Patients considering medical treatment in China should consult with qualified healthcare providers and verify all information independently. ShanghaiMed may benefit from patients choosing to use its services after reading this page.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            See our <a href="/editorial-policy" className="text-teal-600 hover:underline">Editorial Policy</a> for how we handle sourcing, corrections, and conflicts of interest.
          </p>
        </div>
      </div>
    </div>
  )
}
