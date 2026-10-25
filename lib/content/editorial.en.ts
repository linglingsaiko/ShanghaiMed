import type { LegalDoc } from './types'

// English editorial policy content (numbering 1–7 corrected:
// the original page had two "4." and two "6." sections)

export const editorialEn: LegalDoc = {
  title: 'Editorial Policy',
  lastUpdated: 'Last updated: October 10, 2026',
  sections: [
    {
      title: '1. Our Commitment',
      body: ['ShanghaiMed publishes health and medical travel content to help international patients make informed decisions about seeking medical care in China. We are committed to accuracy, transparency, and the highest standards of health communication. This policy explains how we research, write, review, and correct our content.'],
    },
    {
      title: '2. Content Standards',
      subsections: [
        {
          sub: 'Research Standards',
          items: [
            'Every health claim is supported by at least one verifiable source, prioritising peer-reviewed publications indexed in PubMed, Cochrane Library, or equivalent databases.',
            'We prioritise sources from recognised medical institutions: NIH, WHO, CDC, major academic medical centres, and government health agencies.',
            'Statistical claims (percentages, survival rates, cost figures) are traced to their primary source. We do not cite statistics from secondary summaries without verification.',
            'Study limitations are stated alongside findings. We do not present association as causation.',
          ],
        },
        {
          sub: 'Writing Standards',
          items: [
            'Hedged language: We use "was associated with", "may reduce", "studies suggest" rather than "proves", "guarantees", or "cures". This reflects what the underlying evidence actually supports.',
            'No absolute promises: We do not publish claims such as "completely eliminates pain", "guaranteed success", or "risk-free". All medical procedures carry risk, and we say so.',
            'Honest about downsides: Every article about medical care in China includes known limitations, risks, or challenges alongside benefits. We believe informed patients make better decisions.',
            'Patient decision perspective: Content is written from the perspective of what a patient needs to know to make a decision — not from the perspective of what we want them to choose.',
          ],
        },
      ],
    },
    {
      title: '3. Source Classification',
      body: ['Every claim in our content is traced to a primary source. We classify sources into three tiers to help readers evaluate the strength of the underlying evidence:'],
      table: {
        headers: ['Tier', 'Source Type', 'Examples'],
        rows: [
          { tier: 'Tier 1', tierColor: 'bg-green-100 text-green-800', cells: ['Peer-reviewed publications', 'PubMed-indexed journals, Cochrane Library, JAMA, Lancet, BMJ, Frontiers, MDPI journals'] },
          { tier: 'Tier 2', tierColor: 'bg-blue-100 text-blue-800', cells: ['Government & institutional data', 'National Health Commission, WHO, NIH, CDC, municipal health commissions, official hospital reports'] },
          { tier: 'Tier 3', tierColor: 'bg-amber-100 text-amber-800', cells: ['Verified industry & credible secondary sources', 'Published hospital pricing, conference presentations, accredited academic institutions, reputable industry analyses'] },
        ],
      },
      note: 'Our Research Library entries display their source tier in each citation. Where possible, we prioritise Tier 1 sources. Government statistics (Tier 2) are used when primary data is only available through official channels. We avoid relying solely on media reports or opinion pieces.',
      highlightLead: 'Current Research Library breakdown:',
      highlightText: ' 17 Tier 1 (peer-reviewed) · 5 Tier 2 (government/institutional) · 8 Tier 3 (industry/other)',
    },
    {
      title: '4. Medical Accuracy',
      items: [
        'Clinical terms are verified against standard medical references.',
        'Hospital qualifications are described using China\u2019s official classification system (Grade 3A / 三甲). We do not use accreditation marks that are no longer current.',
        'Drug names, procedure names, and medical device names are verified before publication.',
        'Cost figures are sourced from published hospital pricing, government reports, or verified industry data. Where estimates are used, they are labelled as such.',
      ],
    },
    {
      title: '5. Conflict of Interest',
      body: ['ShanghaiMed is a medical tourism facilitation company. We earn revenue when patients choose to use our coordination services. This creates an inherent conflict of interest that we manage as follows:'],
      items: [
        'We charge patients a transparent service fee. We do not receive commissions from hospitals.',
        'Our editorial content is written to inform, not to steer patients toward any specific hospital or treatment.',
        'When we mention our own services, it is clearly identified. Editorial content and promotional content are not mixed.',
        'Our Research Library includes studies with findings that may not align with our commercial interests (e.g., studies highlighting privacy concerns or service gaps).',
      ],
    },
    {
      title: '6. Corrections & Review Cycle',
      body: [
        'We take accuracy seriously. If you identify an error in any of our content — a factual mistake, an outdated statistic, an incorrect medical term, or a mischaracterised study finding — please email info@shanghaimedhealth.com with the subject line "Editorial Correction". Corrections are reviewed within 5 business days; verified errors are corrected with a dated revision note, and we maintain a public record of significant corrections.',
        'All articles are reviewed for medical accuracy before publication. Statistics and pricing data are re-verified every 6 months. Time-sensitive content (visa policies, insurance agreements, hospital programs) is reviewed quarterly. Each article displays its publication and last-reviewed dates.',
      ],
    },
    {
      title: '7. What We Do Not Do',
      items: [
        'We do not provide medical advice, diagnosis, or treatment recommendations. Our content is informational only.',
        'We do not guarantee treatment outcomes. Medicine involves inherent uncertainty.',
        'We do not accept payment from hospitals or pharmaceutical companies for editorial coverage.',
        'We do not publish patient stories or case details without explicit written consent from the patient.',
      ],
    },
    {
      title: 'About ShanghaiMed',
      boxed: true,
      body: [
        'ShanghaiMed is operated by Shanghai Keling Information Technology Co., Ltd. (上海可玲信息技术有限公司), registered in Shanghai, China. We are a medical tourism facilitator — we coordinate hospital appointments, medical record translation, logistics, and post-operative follow-up for international patients seeking treatment in Shanghai.',
        'Our team brings over a decade of experience in premium healthcare operations in China. We charge a transparent concierge service fee and take zero commission from hospitals. Medical bills are paid directly to the hospital at their own rates.',
      ],
    },
  ],
}
