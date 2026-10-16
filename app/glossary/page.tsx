import type { Metadata } from 'next'
import GlossaryView from '@/components/pages/GlossaryView'
import { glossaryEn } from '@/lib/content/glossary.en'

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

export default function GlossaryPage() {
  const definedTermSetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Medical Tourism Glossary',
    description:
      'Plain-language definitions of medical tourism and cross-border healthcare terminology.',
    url: 'https://shanghaimedhealth.com/glossary',
    hasDefinedTerm: glossaryEn.map(t => ({
      '@type': 'DefinedTerm',
      name: t.term,
      ...(t.aliases ? { alternateName: t.aliases.join(', ') } : {}),
      description: t.definition,
      inDefinedTermSet: 'Medical Tourism Glossary',
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />
      <GlossaryView />
    </>
  )
}
