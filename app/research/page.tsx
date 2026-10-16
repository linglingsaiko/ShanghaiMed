import type { Metadata } from 'next'
import ResearchView from '@/components/pages/ResearchView'
import { studies } from '@/lib/content/research.en'

export const metadata: Metadata = {
  title: 'Research Library: Evidence on Medical Travel to China | ShanghaiMed',
  description:
    'Peer-reviewed studies on international patient experience, healthcare quality, and medical tourism in China. Each entry verified against its PubMed record.',
  alternates: { canonical: 'https://shanghaimedhealth.com/research' },
}

const categories = [
  { key: 'patient-experience', label: 'Patient Experience', count: 0 },
  { key: 'medical-tourism', label: 'Medical Tourism', count: 0 },
  { key: 'quality-safety', label: 'Quality & Safety', count: 0 },
  { key: 'cost-value', label: 'Cost & Value', count: 0 },
  { key: 'tcm', label: 'Traditional Chinese Medicine', count: 0 },
  { key: 'dental', label: 'Dental', count: 0 },
  { key: 'checkup', label: 'Health Checkup', count: 0 },
].map(c => ({ ...c, count: studies.filter(s => s.category === c.key).length }))

function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Medical Travel to China: Research Library',
    description:
      'A curated library of peer-reviewed studies and official data sources on medical travel to China, maintained by ShanghaiMed.',
    url: 'https://shanghaimedhealth.com/research',
    creator: {
      '@type': 'Organization',
      name: 'ShanghaiMed',
      url: 'https://shanghaimedhealth.com',
    },
    includedInDataCatalog: {
      '@type': 'DataCatalog',
      name: 'ShanghaiMed Research Library',
    },
    keywords: [
      'medical tourism China',
      'international patient experience',
      'healthcare quality Shanghai',
      'medical travel research',
      'China hospital ratings',
      'healthcare cost comparison',
      'traditional Chinese medicine evidence',
    ],
    dateModified: '2026-10-10',
    datePublished: '2026-09-01',
    measurementTechnique:
      'Each entry is verified against its original PubMed record or official publication. Study type, sample size, key finding, and stated limitations are extracted and summarised.',
    variableMeasured: [
      { '@type': 'PropertyValue', name: 'Total studies', value: '50' },
      { '@type': 'PropertyValue', name: 'Categories', value: 'Patient Experience, Medical Tourism, Quality & Safety, Cost & Value, Traditional Chinese Medicine, Dental, Health Checkup' },
      { '@type': 'PropertyValue', name: 'Last reviewed', value: '2026-10-10' },
    ],
    about: categories.map(c => ({
      '@type': 'Thing',
      name: c.label,
      description: `${c.count} studies on ${c.label.toLowerCase()} in the context of medical travel to China.`,
    })),
    hasPart: studies.map(study => ({
      '@type': 'ScholarlyArticle',
      name: study.title,
      datePublished: String(study.year),
      ...(study.url ? { url: study.url } : {}),
      ...(study.pmid ? { identifier: study.pmid } : {}),
      isPartOf: {
        '@type': 'PublicationIssue',
        name: study.source,
      },
      description: study.finding,
      ...(study.pmid
        ? {
            sameAs: `https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`,
          }
        : {}),
    })),
  }
}

export default function ResearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd()) }}
      />
      <ResearchView />
    </>
  )
}
