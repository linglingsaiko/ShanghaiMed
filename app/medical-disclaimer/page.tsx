import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medical Disclaimer | ShanghaiMed',
  description: 'ShanghaiMed is a medical travel coordination service, not a hospital or medical provider. Read our full medical disclaimer.',
  alternates: { canonical: 'https://shanghaimedhealth.com/medical-disclaimer' },
}

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Medical Disclaimer</h1>
        <p className="text-gray-500 mb-12">Last updated: October 12, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r">
              <p className="text-amber-900 font-semibold m-0">
                ShanghaiMed is not a hospital, clinic or medical provider. We do not provide medical diagnosis, treatment, prescriptions or medical advice.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">What we are</h2>
            <p>
              ShanghaiMed (operated by Shanghai Keling Information Technology Co., Ltd.) is a medical travel coordination and patient-navigation service. We help international patients plan and navigate medical visits to licensed public hospitals and specialists in Shanghai, China. Our role is logistical, linguistic and administrative.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">What we do not do</h2>
            <ul>
              <li>We do not diagnose medical conditions.</li>
              <li>We do not prescribe medication.</li>
              <li>We do not perform or direct medical procedures or treatments.</li>
              <li>We do not guarantee clinical outcomes, waiting times, or the success of any treatment.</li>
              <li>We are not a substitute for the professional judgement of a licensed physician.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">Clinical responsibility</h2>
            <p>
              All clinical decisions — including diagnosis, treatment plans, prescriptions, surgery, testing and hospital admission — are made independently by the treating hospital and its licensed physicians under their own professional responsibility and Chinese medical licences. Hospital and treatment fees are paid by the patient directly to the hospital under the hospital's own terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">Content is informational only</h2>
            <p>
              Articles, cost estimates, doctor profiles, specialty information and other content on this Website are provided for general informational and planning purposes. They are not medical advice. Health information changes quickly, and individual cases differ; always rely on your treating physician for decisions about your care.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">Emergencies</h2>
            <p>
              In a medical emergency, contact your local emergency services immediately. In mainland China, dial <strong>120</strong> for ambulance and emergency medical care.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">No hospital-physician guarantee</h2>
            <p>
              We make reasonable efforts to match patients with qualified hospitals and specialists based on the information provided. However, hospital schedules change, specific doctors cannot always be guaranteed, and final treatment decisions rest with the hospital.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
            <address className="not-italic">
              Shanghai Keling Information Technology Co., Ltd.<br />
              Room 101, Floor 1, No. 2555 Changyang Road, Yangpu District, Shanghai, China<br />
              Email: <a href="mailto:hello@shanghaimedhealth.com" className="text-teal-600 hover:underline">hello@shanghaimedhealth.com</a>
            </address>
          </section>
        </div>
      </div>
    </div>
  )
}
