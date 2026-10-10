import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editorial Policy | ShanghaiMed',
  description: 'How ShanghaiMed researches, writes, reviews, and corrects health and medical travel content.',
  alternates: { canonical: 'https://shanghaimedhealth.com/editorial-policy' },
}

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Editorial Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: October 10, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900">1. Our Commitment</h2>
            <p>
              ShanghaiMed publishes health and medical travel content to help international patients make informed decisions about seeking medical care in China. We are committed to accuracy, transparency, and the highest standards of health communication. This policy explains how we research, write, review, and correct our content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">2. Content Standards</h2>
            <h3 className="text-lg font-semibold text-gray-800">Research Standards</h3>
            <ul>
              <li>Every health claim is supported by at least one verifiable source, prioritising peer-reviewed publications indexed in PubMed, Cochrane Library, or equivalent databases.</li>
              <li>We prioritise sources from recognised medical institutions: NIH, WHO, CDC, major academic medical centres, and government health agencies.</li>
              <li>Statistical claims (percentages, survival rates, cost figures) are traced to their primary source. We do not cite statistics from secondary summaries without verification.</li>
              <li>Study limitations are stated alongside findings. We do not present association as causation.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800">Writing Standards</h3>
            <ul>
              <li><strong>Hedged language:</strong> We use &ldquo;was associated with&rdquo;, &ldquo;may reduce&rdquo;, &ldquo;studies suggest&rdquo; rather than &ldquo;proves&rdquo;, &ldquo;guarantees&rdquo;, or &ldquo;cures&rdquo;. This reflects what the underlying evidence actually supports.</li>
              <li><strong>No absolute promises:</strong> We do not publish claims such as &ldquo;completely eliminates pain&rdquo;, &ldquo;guaranteed success&rdquo;, or &ldquo;risk-free&rdquo;. All medical procedures carry risk, and we say so.</li>
              <li><strong>Honest about downsides:</strong> Every article about medical care in China includes known limitations, risks, or challenges alongside benefits. We believe informed patients make better decisions.</li>
              <li><strong>Patient decision perspective:</strong> Content is written from the perspective of what a patient needs to know to make a decision — not from the perspective of what we want them to choose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">3. Medical Accuracy</h2>
            <ul>
              <li>Clinical terms are verified against standard medical references.</li>
              <li>Hospital qualifications are described using China&rsquo;s official classification system (Grade 3A / 三甲). We do not use accreditation marks that are no longer current.</li>
              <li>Drug names, procedure names, and medical device names are verified before publication.</li>
              <li>Cost figures are sourced from published hospital pricing, government reports, or verified industry data. Where estimates are used, they are labelled as such.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">4. Conflict of Interest</h2>
            <p>
              ShanghaiMed is a medical tourism facilitation company. We earn revenue when patients choose to use our coordination services. This creates an inherent conflict of interest that we manage as follows:
            </p>
            <ul>
              <li>We charge patients a transparent service fee. We do not receive commissions from hospitals.</li>
              <li>Our editorial content is written to inform, not to steer patients toward any specific hospital or treatment.</li>
              <li>When we mention our own services, it is clearly identified. Editorial content and promotional content are not mixed.</li>
              <li>Our Research Library includes studies with findings that may not align with our commercial interests (e.g., studies highlighting privacy concerns or service gaps).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">5. Corrections</h2>
            <p>
              We take accuracy seriously. If you identify an error in any of our content — a factual mistake, an outdated statistic, an incorrect medical term, or a mischaracterised study finding — please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:info@shanghaimedhealth.com" className="text-teal-600 hover:underline">info@shanghaimedhealth.com</a></li>
              <li><strong>Subject line:</strong> &ldquo;Editorial Correction&rdquo;</li>
            </ul>
            <p>
              Corrections are reviewed within 5 business days. Verified errors are corrected with a dated revision note on the affected page. We maintain a public record of significant corrections.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">6. Content Review Cycle</h2>
            <ul>
              <li>All articles are reviewed for medical accuracy before publication.</li>
              <li>Statistics and pricing data are re-verified every 6 months.</li>
              <li>Articles containing time-sensitive information (visa policies, insurance agreements, hospital programs) are reviewed quarterly.</li>
              <li>Each article displays its publication date and last-reviewed date.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">7. What We Do Not Do</h2>
            <ul>
              <li>We do not provide medical advice, diagnosis, or treatment recommendations. Our content is informational only.</li>
              <li>We do not guarantee treatment outcomes. Medicine involves inherent uncertainty.</li>
              <li>We do not accept payment from hospitals or pharmaceutical companies for editorial coverage.</li>
              <li>We do not publish patient stories or case details without explicit written consent from the patient.</li>
            </ul>
          </section>

          <section className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900">About ShanghaiMed</h2>
            <p>
              ShanghaiMed is operated by Shanghai Keling Information Technology Co., Ltd. (上海可玲信息科技术有限公司), registered in Shanghai, China. We are a medical tourism facilitator — we coordinate hospital appointments, medical record translation, logistics, and post-operative follow-up for international patients seeking treatment in Shanghai.
            </p>
            <p>
              Our team brings over a decade of experience in premium healthcare operations in China. We charge a transparent concierge service fee and take zero commission from hospitals. Medical bills are paid directly to the hospital at their own rates.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
