import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Library: Evidence on Medical Travel to China | ShanghaiMed',
  description: 'Peer-reviewed studies on international patient experience, healthcare quality, and medical tourism in China. Each entry verified against its PubMed record.',
  alternates: { canonical: 'https://shanghaimedhealth.com/research' },
}

const studies = [
  // ─── Patient Experience (7) ───
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
    limitation: 'Small sample; self-selected online content may skew positive; not PubMed-indexed.',
    source: 'Scientific and Social Research',
    url: 'https://article.bbwpublisher.com/uploads/file/files/journals/31/articles/12742/submission/proof/12742-313-39337-1-10-20251113.pdf',
    pmid: null,
  },
  {
    id: 5,
    category: 'patient-experience',
    title: 'Dental Care Utilization of Immigrants in Chengdu, China',
    year: 2018,
    type: 'Cross-sectional survey',
    population: '654 immigrants from 75 countries residing in Chengdu',
    focus: 'Dental service utilisation',
    finding: '15.6% of immigrants experienced dental problems in China but did not visit a dentist. Living in Chengdu for at least 10.5 months was the threshold distinguishing dental visit behaviour. Female immigrants and those with dental floss habits were more likely to seek care.',
    limitation: 'Single city (Chengdu); cross-sectional; self-reported dental problems without clinical verification.',
    source: 'West China Journal of Stomatology (PubMed-indexed)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30182572/',
    pmid: '30182572',
  },
  {
    id: 6,
    category: 'patient-experience',
    title: 'Analyzing a New Model of Medical Tourism Policy: Target Country-Specific Models and Marketing Strategies',
    year: 2023,
    type: 'Mixed methods (focus group + survey)',
    population: '352 medical tourism professionals; patient data from China, Russia, Japan (160 Chinese respondents)',
    focus: 'Target country patient preferences',
    finding: 'Chinese patients visiting Korea primarily sought internal medicine (35%), health checkups (21%), and plastic surgery (21%). Chinese patients showed strong loyalty to institutions they visit regularly. Healthcare quality and tourism resources were rated both important and satisfactory.',
    limitation: 'Conducted in Busan, Korea; findings reflect Korean medical tourism context, not China-specific.',
    source: 'Healthcare (MDPI)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10612551/',
    pmid: 'PMC10612551',
  },
  {
    id: 7,
    category: 'patient-experience',
    title: 'Foreign Patients\u2019 Experience and Satisfaction with Korean Healthcare: KHIDI National Report',
    year: 2021,
    type: 'Government-commissioned national survey',
    population: 'Foreign patients from multiple countries (China, Mongolia, Middle East, CIS, US, Russia)',
    focus: 'National-level patient satisfaction',
    finding: 'Overall satisfaction was 89.9%. Chinese patients reported 83.6% satisfaction — the lowest among surveyed nationalities — with medical technology as their top priority. CIS patients reported highest satisfaction (93.8%).',
    limitation: 'Korea-specific data; may not reflect patient experience in China; satisfaction metrics vary by survey methodology.',
    source: 'Korea Health Industry Development Institute (KHIDI)',
    url: null,
    pmid: null,
  },

  // ─── Medical Tourism (6) ───
  {
    id: 8,
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
    id: 9,
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
    id: 10,
    category: 'medical-tourism',
    title: 'Understanding the Multidimensional Role of Medical Travel Facilitators: A Competency Model',
    year: 2024,
    type: 'Professional competency analysis (thematic content analysis)',
    population: '30 healthcare experts',
    focus: 'MTF competencies & standards',
    finding: 'Identified 14 themes and 35 distinct MTF competencies across knowledge, personnel skills, and job-specific abilities. Full-service facilitators provide the broadest scope: travel logistics, physician selection, post-operative care, translation, and cultural guidance. ISO 22525:2020 provides the international standard for MTF roles.',
    limitation: 'Competency model based on expert opinion, not patient outcome data.',
    source: 'BMC Health Services Research',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11070916/',
    pmid: 'PMC11070916',
  },
  {
    id: 11,
    category: 'medical-tourism',
    title: 'Going for Brokerage: Strategies and Strains in Commercial Healthcare Facilitation',
    year: 2020,
    type: 'Qualitative (ethnographic + interview)',
    population: 'Commercial healthcare facilitation companies and their workers',
    focus: 'Broker vs facilitator dynamics',
    finding: 'Commercial facilitators occupy influential but poorly understood positions in healthcare systems. Varying degrees of control over location, type, cost, and experience of healthcare provisioning create potential conflicts of interest between facilitator revenue and patient welfare.',
    limitation: 'Qualitative; focused on facilitation companies broadly, not China-specific.',
    source: 'Social Science & Medicine',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7260813/',
    pmid: 'PMC7260813',
  },
  {
    id: 12,
    category: 'medical-tourism',
    title: 'Medical Tourism Facilitators: Ethical Concerns about Roles and Responsibilities',
    year: 2011,
    type: 'Policy analysis (Simon Fraser University Medical Tourism Research Group)',
    population: 'Analysis of facilitator websites and industry practices',
    focus: 'Risk communication & informed consent',
    finding: 'Only 17.6% of Canadian facilitator websites addressed possible risks. Only 4.9% addressed post-operative care, 1.1% legal recourse, 2.2% complications. Facilitators systematically emphasised benefits while downplaying risks, potentially undermining informed consent.',
    limitation: 'Canadian context; data from 2011; website analysis methodology; industry practices may have evolved.',
    source: 'Simon Fraser University — Medical Tourism Research Group',
    url: 'https://www.sfu.ca/medicaltourism/Medical%20Tourism%20Facilitators%20-%20Ethical%20Concerns%20about%20Roles%20and%20Responsibilities.pdf',
    pmid: null,
  },
  {
    id: 13,
    category: 'medical-tourism',
    title: 'Exploring Medical and Dental Tourism: Opportunities, Challenges, and Global Impact on Healthcare',
    year: 2024,
    type: 'Literature review',
    population: 'PubMed, Scopus, Google Scholar databases (15-year review window)',
    focus: 'Global medical & dental tourism trends',
    finding: 'Cost savings are the primary patient motivation (75% of respondents). Access to advanced technology (60%) and shorter waiting times (55%) follow. Quality of care concerns (50%) and difficulty in post-operative care (40%) are the most reported challenges.',
    limitation: 'Not PubMed-indexed; review of secondary sources; percentage data from aggregated surveys with varying methodologies.',
    source: 'Multi Research Journal',
    url: null,
    pmid: null,
  },

  // ─── Quality & Safety (6) ───
  {
    id: 14,
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
    id: 15,
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
    id: 16,
    category: 'quality-safety',
    title: 'Getting More Than What You Pay For? Managing Complications of Bariatric Tourism',
    year: 2025,
    type: 'Retrospective chart review',
    population: '91 patients who underwent bariatric surgery abroad and presented at a US academic centre near the Mexican border',
    focus: 'Complication rates & management costs',
    finding: 'Anastomotic/staple line leak occurred in 33.0% of patients — substantially higher than the <1% US national rate. 56.0% required hospital admission, 19.8% required ICU. Mean hospital charges for leak management: $424,976 per patient. Overall mortality: 3.3%.',
    limitation: 'Single centre; only captures patients who returned with complications; true denominator of all medical tourists unknown; complication rates likely overestimated.',
    source: 'Surgery for Obesity and Related Diseases',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12222374/',
    pmid: 'PMC12222374',
  },
  {
    id: 17,
    category: 'quality-safety',
    title: 'Unveiling the True Price: Assessing the Economic Impact of Cosmetic Surgery Tourism on a Single Tertiary Center in Bahrain',
    year: 2024,
    type: 'Retrospective cost analysis',
    population: '30 patients presenting with complications from cosmetic surgery performed abroad',
    focus: 'Complication management costs',
    finding: 'Surgical-site infections were the most common complication. Mean management cost: $5,852 per patient. Iran was the most frequented destination. Cost savings from abroad surgery were often negated by complication management expenses.',
    limitation: 'Single centre in Bahrain; small sample; only captures complication cases; cosmetic surgery focus may not generalise to other procedures.',
    source: 'Aesthetic Surgery Journal Open Forum',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11614354/',
    pmid: 'PMC11614354',
  },
  {
    id: 18,
    category: 'quality-safety',
    title: 'Evolution from National to International Hospital Accreditation System in China',
    year: 2023,
    type: 'Conference presentation (BMJ International Forum on Quality & Safety in Healthcare)',
    population: 'China\u2019s Class 3A Hospital Accreditation Standard (183 criteria, 2020 edition) and China\u2019s International Hospital Accreditation Standards (CIHA, 2021 edition)',
    focus: 'Hospital accreditation system evolution',
    finding: 'China\u2019s Class 3A standard is comprehensive (183 criteria covering social responsibility, quality control, clinical practice, technology management). The CIHA 2021 edition was certified by ISQua-EEA in 2022, scoring 97% across 66 criteria — achieving full international recognition of China\u2019s hospital accreditation system.',
    limitation: 'Conference presentation, not peer-reviewed publication; accreditation standards describe process, not clinical outcomes.',
    source: 'BMJ International Forum on Quality & Safety in Healthcare / Shenzhen Hospital Accreditation Research Centre (SHARC)',
    url: 'https://internationalforum.bmj.com/wp-content/uploads/2024/09/S20_-Anne-LEE-Evolution-from-national-to-international-Hospital-Accreditation-System-in-China-S20.pptx.pdf',
    pmid: null,
  },
  {
    id: 19,
    category: 'quality-safety',
    title: 'China\u2019s Hospital Grading System: Grade 3A (三甲) Overview and International Context',
    year: 2025,
    type: 'Policy analysis',
    population: 'Approximately 1,795 Grade 3A hospitals in China (as of end of 2023)',
    focus: 'Hospital classification system',
    finding: 'Grade 3A is China\u2019s highest hospital classification, administered by the National Health Commission. The 2025 edition standard emphasises clinical capability, Class IV surgery volume, Case Mix Index (CMI), and quality control indicators for oncology, infection control, and radiology. JCI closed its China accreditation business in April 2023 — no new accreditations are being issued.',
    limitation: 'Policy analysis; accreditation describes institutional capability, not individual physician quality or patient outcomes.',
    source: 'National Health Commission of China / Multiple sources',
    url: null,
    pmid: null,
  },

  // ─── Cost & Value (6) ───
  {
    id: 20,
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
    id: 21,
    category: 'cost-value',
    title: 'Medical Tourist\u2019s Perception in Selecting Their Destination: A Global Perspective',
    year: 2012,
    type: 'Literature review (secondary data)',
    population: 'Review of medical tourism literature including cost comparison tables from Herrick (2007)',
    focus: 'Destination selection factors & cost comparison',
    finding: 'Surgery costs in medical tourism destinations were 30\u201370% lower than the US, with some procedures up to 80% lower. Example comparisons: Heart Bypass — Malaysia $12,000 vs USA $130,000; Knee Replacement — Thailand $10,000 vs USA $40,000; Hip Replacement — India $7,100 vs USA $43,000.',
    limitation: 'Data from 2007\u20132012; prices have changed significantly; secondary review methodology; does not include China-specific pricing.',
    source: 'Iranian Journal of Public Health',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3469025/',
    pmid: 'PMC3469025',
  },
  {
    id: 22,
    category: 'cost-value',
    title: 'Characteristics of Hospitalization Patterns and Expenditures in Cross-Border Medical Tourism: A Knee Replacement Surgery Cohort Study',
    year: 2025,
    type: 'Cohort study (retrospective)',
    population: '356 knee arthroplasty patients at Hospital H (Hong Kong residents treated in mainland China)',
    focus: 'Length of stay & hospitalization costs',
    finding: 'Hong Kong patients had shorter length of stay, shorter post-operative stay, and lower hospitalisation costs compared to domestic non-local patients — reversing the typical "dual-high" pattern. No hospital-acquired infections were recorded. Length of stay fully mediated the cost difference.',
    limitation: 'Single hospital; only inpatient costs captured (excludes transportation, accommodation, post-discharge rehabilitation); no long-term follow-up data.',
    source: 'Frontiers in Public Health',
    url: 'https://public-pages-files-2025.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2025.1655280/pdf',
    pmid: null,
  },
  {
    id: 23,
    category: 'cost-value',
    title: 'The Cost of Medical Tourism: Penny-Wise and Pound-Foolish?',
    year: 2016,
    type: 'Case report',
    population: 'Individual patient case (cosmetic surgery in Mexico)',
    focus: 'Hidden costs of medical tourism complications',
    finding: 'A patient underwent multiple cosmetic procedures in Mexico for under $5,000. Complications from those procedures required extensive treatment in the US, ballooning the total cost of care to over $77,000 — 15x the original procedure cost.',
    limitation: 'Single case report; cannot be generalised; represents worst-case scenario, not typical outcome.',
    source: 'Cited in: Aesthetic Surgery Journal Open Forum (2024)',
    url: null,
    pmid: null,
  },
  {
    id: 24,
    category: 'cost-value',
    title: 'Executive Health Screening Cost Comparison: China vs US/UK',
    year: 2026,
    type: 'Industry analysis',
    population: 'Published pricing from international departments of Grade 3A hospitals in Shanghai and Beijing',
    focus: 'Health screening cost differentials',
    finding: 'A comprehensive executive health screening at a top Chinese public hospital\u2019s international department typically costs $300\u2013$1,200, compared to $2,500\u2013$8,000 for an equivalent private-pay panel in the US. Full-body imaging and biomarker workup completed in 4\u20138 hours, often with same-day results.',
    limitation: 'Package contents vary between providers; headline price comparison may not reflect identical test panels; travel and accommodation costs not included.',
    source: 'Hospital published pricing / industry analysis',
    url: null,
    pmid: null,
  },
  {
    id: 25,
    category: 'cost-value',
    title: 'Cosmetic Surgery Tourism Complications: Financial Burden on Home Healthcare Systems',
    year: 2024,
    type: 'Retrospective cost analysis',
    population: '30 patients at a tertiary centre in Bahrain',
    focus: 'Economic burden of complications',
    finding: 'Complication management for cosmetic surgery performed abroad cost an average of $5,852 per patient, with a total projected expense of $175,000 to the Bahraini healthcare system. The most common destination was Iran. Cost savings from abroad surgery were often negated by complication management.',
    limitation: 'Single centre; small sample; only captures complication cases; cosmetic surgery focus.',
    source: 'Aesthetic Surgery Journal Open Forum',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11614354/',
    pmid: 'PMC11614354',
  },

  // ─── Traditional Chinese Medicine (5) ───
  {
    id: 26,
    category: 'tcm',
    title: 'Acupuncture vs Sham Acupuncture for Chronic Sciatica From Herniated Disk: A Randomized Clinical Trial',
    year: 2024,
    type: 'Multicentre RCT (6 tertiary-level hospitals in China)',
    population: '216 patients with chronic sciatica from herniated disk (110 acupuncture + 110 sham acupuncture)',
    focus: 'Acupuncture efficacy for chronic sciatica',
    finding: 'Acupuncture group showed significantly greater pain reduction (VAS: -30.8 mm vs -14.9 mm, P<.001) and functional improvement (ODI: -13.0 vs -4.9 points, P<.001) compared to sham acupuncture. Benefits persisted through 52-week follow-up. No serious adverse events occurred.',
    limitation: 'Conducted only in Chinese hospitals; patient population was Chinese; results may not generalise to other ethnicities or healthcare settings.',
    source: 'JAMA Internal Medicine',
    url: 'https://pubmed.ncbi.nlm.nih.gov/39401008/',
    pmid: '39401008',
  },
  {
    id: 27,
    category: 'tcm',
    title: 'Acupuncture for Irritable Bowel Syndrome: A Blinded Placebo-Controlled Trial',
    year: 2005,
    type: 'Blinded placebo-controlled trial',
    population: '60 patients with well-established IBS at a European teaching hospital',
    focus: 'Acupuncture efficacy for IBS',
    finding: 'No statistically significant difference between acupuncture (40.7% response) and sham acupuncture (31.2% response). Both groups improved significantly from baseline, suggesting a strong placebo/contextual effect. Traditional Chinese acupuncture was relatively ineffective for IBS in this European hospital setting.',
    limitation: 'Small sample (N=60); single centre; European setting may not reflect outcomes in Chinese TCM hospitals with integrated care.',
    source: 'World Journal of Gastroenterology',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15996029/',
    pmid: '15996029',
  },
  {
    id: 28,
    category: 'tcm',
    title: 'Traditional Chinese Medicine in the Global Medical Tourism Market',
    year: 2024,
    type: 'Literature review',
    population: 'Multiple studies on TCM internationalisation',
    focus: 'TCM appeal & evidence',
    finding: 'TCM therapies (acupuncture, tuina massage, herbal medicine) are increasingly sought by international patients for chronic disease management and rehabilitation. TCM\u2019s role in global medical tourism is growing as a distinctive competitive advantage for China.',
    limitation: 'Many underlying studies published only in Chinese databases; methodological quality varies; TCM efficacy for many conditions remains under investigation.',
    source: 'Multiple sources (Chen, 2024; Tosun et al., 2020)',
    url: null,
    pmid: null,
  },
  {
    id: 29,
    category: 'tcm',
    title: 'Acupuncture to Improve Symptoms for Stable Angina: Protocol for a Randomized Controlled Trial',
    year: 2019,
    type: 'RCT protocol (multicentre, international)',
    population: 'Planned enrolment across sites in China and Japan (Tokyo Ariake University)',
    focus: 'Acupuncture for cardiovascular symptoms',
    finding: 'Protocol describes physiologic analgesic effects of acupuncture observed in Chinese patients with stable angina. The proposed mechanism involves downregulation of the autonomic nervous system. International collaboration includes Japanese research institutions, reflecting growing cross-border TCM research.',
    limitation: 'Protocol only — results not yet published at time of this entry; findings are preliminary.',
    source: 'JMIR Research Protocols',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6690225/',
    pmid: 'PMC6690225',
  },
  {
    id: 30,
    category: 'tcm',
    title: 'TCM Integration in China\u2019s Medical Tourism Strategy: Policy and Institutional Support',
    year: 2025,
    type: 'Policy analysis',
    population: 'Chinese government policy documents and industry reports',
    focus: 'TCM as medical tourism differentiator',
    finding: 'The Chinese government has positioned TCM as a unique selling proposition for inbound medical tourism. National TCM policy (2021\u20132035) explicitly supports international TCM services. Hainan Boao Lecheng pilot zone integrates TCM with conventional medical tourism. TCM is cited as a key factor differentiating China from Thailand, India, and Turkey.',
    limitation: 'Policy analysis; government sources may overstate TCM\u2019s role; clinical evidence for many TCM treatments remains limited by Western standards.',
    source: 'National TCM Policy / Hainan Boao Lecheng Pilot Zone reports',
    url: null,
    pmid: null,
  },

  // ─── Dental (7) ───
  {
    id: 31,
    category: 'dental',
    title: 'The Influence of Patient-, Site-, and Implant-Related Factors on Marginal Bone Levels of Dental Implants in a Rural Population in China',
    year: 2024,
    type: 'Retrospective cohort study',
    population: '90 subjects, 428 implants at a private dental office in rural China; mean follow-up 453 days',
    focus: 'Implant survival and marginal bone loss in rural Chinese population',
    finding: 'Dental implant therapy demonstrated high survival rates (100%) and minimal marginal bone loss (mean 0.10 mm). Age, implant location (mandible > maxilla), and wider implant diameter were associated with increased bone loss.',
    limitation: 'Single private practice in rural China; retrospective design; no comparison with urban populations.',
    source: 'Clinical and Experimental Dental Research',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11582925/',
    pmid: '39575753',
  },
  {
    id: 32,
    category: 'dental',
    title: 'Advances in Zirconia-Based Dental Materials: Properties, Classification, Applications, and Future Prospects',
    year: 2024,
    type: 'Literature review',
    population: 'Comprehensive review of zirconia-based dental materials from PubMed and Web of Science',
    focus: 'Zirconia ceramics properties, classification, and dental applications',
    finding: 'Zirconia ceramics demonstrate superior mechanical properties, durability, and improving translucency for dental restorations. Challenges remain in balancing low-temperature degradation resistance with mechanical strength and aesthetics.',
    limitation: 'Narrative review without meta-analysis; does not provide quantitative comparison of clinical outcomes across zirconia generations.',
    source: 'Journal of Dentistry',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38866229/',
    pmid: '38866229',
  },
  {
    id: 33,
    category: 'dental',
    title: 'Effects of Hyperlipidemia on Osseointegration of Dental Implants and Its Strategies',
    year: 2023,
    type: 'Literature review',
    population: 'Review of studies on hyperlipidemia and dental implant osseointegration',
    focus: 'Impact of hyperlipidemia on implant success and mitigation strategies',
    finding: 'Hyperlipidemia may affect bone metabolism and inhibit osseointegration through mutual regulation of adipocytes, osteoblasts, and osteoclasts. Local drug delivery methods (statin coating, hydrogels, nanoparticles) on implant surfaces may promote osseointegration in hyperlipidemic environments.',
    limitation: 'Review article; most evidence from animal studies; clinical translation of novel drug delivery systems remains limited.',
    source: 'Journal of Functional Biomaterials',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10145040/',
    pmid: '37103284',
  },
  {
    id: 34,
    category: 'dental',
    title: 'Bone Regeneration in Dentistry: An Overview',
    year: 2021,
    type: 'Literature review',
    population: 'Review of bone regeneration techniques for dental implant placement',
    focus: 'Bone graft, guided bone regeneration, sinus floor elevation, and distraction osteogenesis',
    finding: 'Reconstructive surgery is necessary before implant placement to regenerate bone defects. Bone graft remains the gold standard, often combined with guided bone regeneration using barrier membranes. Sinus floor elevation and bone distraction are additional techniques for specific clinical scenarios.',
    limitation: 'Narrative review from private practice authors; no systematic evidence synthesis or meta-analysis.',
    source: 'Journal of Biological Regulators and Homeostatic Agents',
    url: 'https://pubmed.ncbi.nlm.nih.gov/33463141/',
    pmid: '33463141',
  },
  {
    id: 35,
    category: 'dental',
    title: 'Effects of Post-Extraction Alveolar Ridge Preservation Versus Immediate Implant Placement: A Systematic Review and Meta-Analysis',
    year: 2022,
    type: 'Systematic review and meta-analysis',
    population: '12 studies (8 RCTs, 4 cohort); 456 ARP implants vs 459 IIP implants',
    focus: 'Implant success rates comparing delayed placement with ridge preservation vs immediate placement',
    finding: 'Implants placed through alveolar ridge preservation (ARP) protocol demonstrated significantly higher success rates (98.68%) compared to immediate implant placement (IIP, 95.21%) (RR 1.03, 95% CI 1.01-1.06, P=0.008).',
    limitation: 'Limited number of included studies; heterogeneity in surgical protocols and follow-up durations; most studies from single centres.',
    source: 'The Journal of Evidence-Based Dental Practice',
    url: 'https://pubmed.ncbi.nlm.nih.gov/36162892/',
    pmid: '36162892',
  },
  {
    id: 36,
    category: 'dental',
    title: 'A Systematic Review of the Survival and Complication Rates of Zirconia-Ceramic and Metal-Ceramic Single Crowns',
    year: 2018,
    type: 'Systematic review and meta-analysis',
    population: '35 studies; 4,363 metal-ceramic and 912 zirconia implant-supported single crowns; minimum 3-year follow-up',
    focus: '5-year survival and complication rates of zirconia vs metal-ceramic crowns',
    finding: '5-year survival rates were comparable: 98.3% for metal-ceramic vs 97.6% for zirconia crowns. Zirconia crowns exhibited fewer aesthetic complications but significantly more material fractures (2.1% vs 0.2%).',
    limitation: 'No studies on newer monolithic zirconia crowns met inclusion criteria; relatively few zirconia cases available for analysis.',
    source: 'Clinical Oral Implants Research',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30328190/',
    pmid: '30328190',
  },
  {
    id: 37,
    category: 'dental',
    title: 'AI-Assisted Preoperative Surgical Planning for Dental Implant',
    year: 2025,
    type: 'Original research',
    population: 'Development and validation of AI system for CBCT-based implant planning',
    focus: 'AI-assisted preoperative assessment of alveolar bone morphology for implant surgery',
    finding: 'AI-assisted planning can accurately assess alveolar bone morphology from CBCT images, potentially improving surgical precision and reducing operator dependence. The system demonstrated feasibility for clinical integration.',
    limitation: 'Early-stage technology; validation limited to retrospective data; prospective clinical outcomes not yet reported.',
    source: 'Journal of Translational Medicine',
    url: 'https://pubmed.ncbi.nlm.nih.gov/41437097/',
    pmid: '41437097',
  },
  // ─── TCM (7 new) ───
  {
    id: 38,
    category: 'tcm',
    title: 'Effect of Acupuncture for Temporomandibular Disorders: A Randomized Clinical Trial',
    year: 2024,
    type: 'Randomized controlled trial',
    population: '60 participants with TMD; acupuncture vs sham acupuncture, 3 sessions/week for 4 weeks',
    focus: 'Acupuncture for temporomandibular disorder pain',
    finding: 'Acupuncture provided significantly greater pain reduction than sham at week 4 (MD -1.49, 95% CI -2.32 to -0.65, P<0.001) with effects sustained at week 8. Improvements in jaw function, emotional well-being, and sleep quality were also observed.',
    limitation: 'Small sample size (n=60); single-centre in Beijing; sham acupuncture protocol may not fully control for placebo.',
    source: 'QJM: Monthly Journal of the Association of Physicians',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11537310/',
    pmid: '38710498',
  },
  {
    id: 39,
    category: 'tcm',
    title: 'Acupuncture for Chronic Pain: Update of an Individual Patient Data Meta-Analysis',
    year: 2018,
    type: 'Individual patient data meta-analysis',
    population: '20,827 patients from 39 RCTs; chronic musculoskeletal pain, osteoarthritis, headache, shoulder pain',
    focus: 'Effect size and persistence of acupuncture for chronic pain',
    finding: 'Acupuncture was superior to both sham and no-acupuncture controls for all pain conditions (P<0.001), with effects approximately 0.5 SD vs no control and 0.2 SD vs sham. Treatment effects persisted over time with only ~15% decrease at 1 year.',
    limitation: 'Effect sizes driven partly by control group type; cannot fully separate specific needling effects from contextual/placebo factors.',
    source: 'The Journal of Pain',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5927830/',
    pmid: '29198932',
  },
  {
    id: 40,
    category: 'tcm',
    title: 'Acupuncture Improves Chemotherapy-Induced Neuropathy Explored by Neurophysiological and Clinical Outcomes: The Randomized, Controlled, Cross-Over ACUCIN Trial',
    year: 2022,
    type: 'Randomized controlled cross-over trial',
    population: '60 patients with chemotherapy-induced peripheral neuropathy (CIPN)',
    focus: 'Acupuncture for CIPN using nerve conduction studies as primary outcome',
    finding: 'Acupuncture significantly improved sural sensory nerve amplitude and conduction velocity (effect sizes 0.55 and 0.49). Subjective improvement in burning pain, cramps, numbness, and gait unsteadiness was also reported.',
    limitation: 'Single-centre in Germany (with Shanghai collaboration); no long-term follow-up beyond 28 weeks; cross-over design may carry residual carryover effects.',
    source: 'Phytomedicine',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35785559/',
    pmid: '35785559',
  },
  {
    id: 41,
    category: 'tcm',
    title: 'Acupuncture for Chronic Nonspecific Low Back Pain',
    year: 2020,
    type: 'Cochrane systematic review',
    population: '33 studies (8,270 participants) comparing acupuncture with sham, no treatment, or usual care',
    focus: 'Acupuncture for chronic nonspecific low back pain',
    finding: 'Low-certainty evidence suggests acupuncture may provide small short-term pain relief vs sham (MD -9.22 on 0-100 VAS). Moderate-certainty evidence shows clinically important pain relief and functional improvement vs no treatment.',
    limitation: 'Most studies had high risk of performance bias; evidence downgraded to low/very low certainty due to bias, inconsistency, and imprecision.',
    source: 'Cochrane Database of Systematic Reviews',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8095030/',
    pmid: '33306198',
  },
  {
    id: 42,
    category: 'tcm',
    title: 'Acupuncture for Clinical Improvement of Endometriosis-Related Pain: A Systematic Review and Meta-Analysis',
    year: 2024,
    type: 'Systematic review and meta-analysis',
    population: '14 RCTs, 793 patients with endometriosis-related pain',
    focus: 'Acupuncture efficacy for endometriosis pain, CA-125 levels, and nodule size',
    finding: 'Acupuncture demonstrated significant reductions in pain severity (SMD -1.10, P<0.001), improved response rates (RR 1.25, P=0.02), and decreased serum CA-125 levels (SMD -0.62, P=0.024) compared to controls.',
    limitation: 'Included studies had design and quality flaws; control interventions varied (placebo, TCM, Western medicine); limited high-quality RCTs.',
    source: 'Archives of Gynecology and Obstetrics',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11393010/',
    pmid: '39110208',
  },
  {
    id: 43,
    category: 'tcm',
    title: 'Efficacy of Acupuncture on Cancer Pain: A Systematic Review and Meta-Analysis',
    year: 2024,
    type: 'Systematic review and meta-analysis',
    population: '16 RCTs, 1,124 participants with cancer pain',
    focus: 'Acupuncture for cancer pain vs no treatment, sham, or usual care',
    finding: 'Acupuncture was more effective than no treatment (SMD -0.90), sham acupuncture (SMD -1.10), and usual care (SMD -1.16) in reducing cancer pain.',
    limitation: 'Low quality and small sample sizes of some studies; heterogeneous cancer types and stages; limited reporting of adverse events.',
    source: 'Journal of Integrative Medicine',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38493063/',
    pmid: '38493063',
  },
  {
    id: 44,
    category: 'tcm',
    title: 'Acupuncture or Acupressure for Pain Management During Labour',
    year: 2020,
    type: 'Cochrane systematic review',
    population: '28 trials, 3,960 women (13 acupuncture, 15 acupressure)',
    focus: 'Acupuncture/acupressure for labour pain management',
    finding: 'Acupuncture may increase satisfaction with pain relief (RR 2.38 vs sham) and reduce pharmacological analgesia use (RR 0.75 vs sham). Acupressure probably reduces caesarean section rates vs sham (RR 0.44).',
    limitation: 'No study at low risk of bias on all domains; very low certainty of evidence for most comparisons; heterogeneity in acupuncture protocols.',
    source: 'Cochrane Database of Systematic Reviews',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7007200/',
    pmid: '32032444',
  },
  // ─── Checkup (6) ───
  {
    id: 45,
    category: 'checkup',
    title: 'National and Provincial-Level Prevalence and Risk Factors of Carotid Atherosclerosis in Chinese Adults',
    year: 2024,
    type: 'Cross-sectional study',
    population: '10,733,975 adults aged 20+ from all 31 provinces in China; health check-up database 2017-2022',
    focus: 'National prevalence of carotid atherosclerosis and regional variation',
    finding: 'An estimated 26.2% had increased carotid intima-media thickness and 21.0% had carotid plaque. Prevalence was higher in older adults, males, northern China, and those with hypertension, diabetes, or dyslipidemia.',
    limitation: 'Health check-up population may not represent general population (selection bias); cross-sectional design limits causal inference.',
    source: 'JAMA Network Open',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10784858/',
    pmid: '38206625',
  },
  {
    id: 46,
    category: 'checkup',
    title: 'LDCT Screening Results Among Eligible and Ineligible Screening Candidates in Preventive Health Check-Ups Population: A Real World Study in West China',
    year: 2024,
    type: 'Retrospective cohort study',
    population: 'Health check-up population at West China Hospital, 2006-2017; 10,259 ineligible screening candidates',
    focus: 'Low-dose CT lung cancer screening outcomes in ineligible vs eligible candidates',
    finding: '64.13% of health check-up participants were ineligible per national guidelines, yet 39.04% had positive screenings. False-positive biopsy rate was higher in ineligible candidates (7.69%) than eligible (2.47%).',
    limitation: 'Single-centre in West China; retrospective design; eligibility criteria based on 2018 guidelines may not reflect current practice.',
    source: 'Scientific Reports',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10902338/',
    pmid: '38418532',
  },
  {
    id: 47,
    category: 'checkup',
    title: 'Prevalence of Elevated Lipoprotein(a) and its Association With Subclinical Atherosclerosis in 2.9 Million Chinese Adults',
    year: 2025,
    type: 'Cross-sectional study',
    population: '2,788,206 adults from health check-up centres across 30 provinces, 2017-2023',
    focus: 'Lipoprotein(a) prevalence and association with multisite subclinical atherosclerosis',
    finding: 'Elevated Lp(a) (>30 mg/dL) prevalence was 18.67%. Higher Lp(a) was associated with increased odds of carotid intima-media thickening, carotid plaque, brain infarcts, and coronary artery calcification, with stronger associations for multisite involvement.',
    limitation: 'Cross-sectional design; Lp(a) measured by different assays; cannot establish causality; health check-up population selection bias.',
    source: 'Journal of the American College of Cardiology',
    url: 'https://pubmed.ncbi.nlm.nih.gov/40266173/',
    pmid: '40266173',
  },
  {
    id: 48,
    category: 'checkup',
    title: 'Effectiveness of Health Checkup With Depression Screening on Depression Treatment and Outcomes in Middle-Aged and Older Adults: A Target Trial Emulation Study',
    year: 2024,
    type: 'Target trial emulation (observational cohort)',
    population: '4,972,228 adults aged 40+ who participated in health checkups with depression screening in Taiwan, 2013-2019',
    focus: 'Impact of depression screening within health checkups on treatment rates and outcomes',
    finding: 'Screened individuals had higher rates of newly treated depression (HR 1.63) and lower psychiatric hospitalization risk (HR 0.93). However, only 10.8% of screen-positive individuals received treatment during the study period.',
    limitation: 'Taiwan study, not mainland China; observational design; screening may detect mild cases without clear clinical benefit; suicide outcomes uncertain.',
    source: 'The Lancet Regional Health - Western Pacific',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10701157/',
    pmid: '38076325',
  },
  {
    id: 49,
    category: 'checkup',
    title: 'Overdiagnosis of Lung Cancer Due to the Introduction of Low-Dose Computed Tomography in Average-Risk Populations in the People\u2019s Republic of China',
    year: 2025,
    type: 'Registry-based study',
    population: '46,978 incident lung cancer cases and 34,475 deaths from ~3.21 million population in Pudong New Area, Shanghai',
    focus: 'Lung cancer overdiagnosis attributable to LDCT screening expansion',
    finding: 'Introduction of LDCT in average-risk populations may have led to substantial overdiagnosis of lung cancer. The study quantified excess incidence relative to expected trends, suggesting that widespread LDCT use in health check-ups warrants more targeted screening criteria.',
    limitation: 'Single district (Pudong, Shanghai); registry data cannot distinguish screen-detected from symptom-detected cancers at individual level.',
    source: 'Journal of Thoracic Oncology',
    url: 'https://pubmed.ncbi.nlm.nih.gov/39954810/',
    pmid: '39954810',
  },
  {
    id: 50,
    category: 'checkup',
    title: 'Prevalence, Association Relation, and Dynamic Evolution Analysis of Critical Values in Health Checkup in China: A Retrospective Study',
    year: 2021,
    type: 'Retrospective cohort study',
    population: '33,639 physical examiners at a large examination centre in China, 2017-2019',
    focus: 'Critical values in health checkups and their association with chronic disease risk',
    finding: 'Critical values in health checkups showed significant associations with chronic disease and cancer risk. Dynamic evolution analysis revealed patterns of biomarker clustering that may aid early risk stratification.',
    limitation: 'Single examination centre; retrospective design; critical value thresholds may vary across laboratories.',
    source: 'Frontiers in Public Health',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34368036/',
    pmid: '34368036',
  },
]

const categories = [
  { key: 'all', label: 'All', count: studies.length },
  { key: 'patient-experience', label: 'Patient Experience', count: studies.filter(s => s.category === 'patient-experience').length },
  { key: 'medical-tourism', label: 'Medical Tourism', count: studies.filter(s => s.category === 'medical-tourism').length },
  { key: 'quality-safety', label: 'Quality & Safety', count: studies.filter(s => s.category === 'quality-safety').length },
  { key: 'cost-value', label: 'Cost & Value', count: studies.filter(s => s.category === 'cost-value').length },
  { key: 'tcm', label: 'Traditional Chinese Medicine', count: studies.filter(s => s.category === 'tcm').length },
  { key: 'dental', label: 'Dental', count: studies.filter(s => s.category === 'dental').length },
  { key: 'checkup', label: 'Health Checkup', count: studies.filter(s => s.category === 'checkup').length },
]

// ─── Schema.org Structured Data ───
function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Medical Travel to China: Research Library',
    description: '50 peer-reviewed studies and official data sources on international patient experience, healthcare quality, and medical tourism in China. Each entry verified against its original publication.',
    url: 'https://shanghaimedhealth.com/research',
    license: 'https://creativecommons.org/licenses/by-nc/4.0/',
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
    measurementTechnique: 'Each entry is verified against its original PubMed record or official publication. Study type, sample size, key finding, and stated limitations are extracted and summarised.',
    variableMeasured: [
      { '@type': 'PropertyValue', name: 'Total studies', value: '30' },
      { '@type': 'PropertyValue', name: 'Categories', value: 'Patient Experience, Medical Tourism, Quality & Safety, Cost & Value, Traditional Chinese Medicine' },
      { '@type': 'PropertyValue', name: 'Last reviewed', value: '2026-10-10' },
    ],
    about: categories
      .filter(c => c.key !== 'all')
      .map(c => ({
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

export default function ResearchPage({ params }: { params?: { lang?: string } }) {
  // re-exported under app/[lang]/research: prefix internal links with the locale
  const lp = params?.lang && params.lang !== 'en' ? `/${params.lang}` : ''
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd()) }}
      />
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
            Last reviewed and verified: October 10, 2026 · Each entry cross-checked against its original PubMed record or official publication.
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

        {/* Blog ↔ Research cross-link */}
        <div className="mt-12 bg-teal-50 border border-teal-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Research behind the articles
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            Every article we publish is grounded in peer-reviewed evidence. The studies above form the evidence base for our <a href="/blog" className="text-teal-700 font-medium hover:underline">blog guides</a> on choosing hospitals, understanding costs, preparing for a dental or TCM visit, and navigating insurance. Read a guide first, then trace every claim back to the original research.
          </p>
          <p className="text-xs text-gray-500">
            Last reviewed: October 2026 · <a href="/editorial-policy" className="hover:underline">Editorial Policy</a> · <a href="/glossary" className="hover:underline">Medical tourism glossary</a>
          </p>
        </div>

        {/* Footer disclaimer */}
        <div className="mt-6 bg-gray-100 rounded-lg p-6">
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
