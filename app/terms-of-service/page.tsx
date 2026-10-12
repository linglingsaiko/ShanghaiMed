import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | ShanghaiMed',
  description: 'Terms governing use of the ShanghaiMed website and medical travel coordination services, including important medical disclaimers, payment terms and liability limits.',
  alternates: { canonical: 'https://shanghaimedhealth.com/terms-of-service' },
}

const SECTIONS = [
  {
    title: '1. Who we are',
    body: [
      'ShanghaiMed is operated by Shanghai Keling Information Technology Co., Ltd. (上海可玲信息技术有限公司), a limited liability company registered in Shanghai, China under registration number 91310110MAKDNY7H7W. ShanghaiMed is a medical travel coordination and patient-navigation service. We are NOT a hospital, clinic or medical institution.',
    ],
  },
  {
    title: '2. Acceptance of terms',
    body: [
      'By accessing https://shanghaimedhealth.com (the "Website") or engaging ShanghaiMed\'s services, including payment of any deposit or coordination fee, you agree to be bound by these Terms of Service and our Privacy Policy and Refund Policy. If you do not agree, please do not use the Website or our services.',
    ],
  },
  {
    title: '3. Our services',
    body: [
      'ShanghaiMed arranges and coordinates, on your behalf:',
    ],
    items: [
      'Review and professional translation of medical records;',
      'Matching your case with suitable licensed Chinese public hospitals and specialists;',
      'Appointment scheduling and cost estimates;',
      'Medical visa invitation support and travel/accommodation logistics;',
      'Bilingual in-person accompaniment and interpretation during hospital visits;',
      'Post-visit follow-up coordination.',
    ],
  },
  {
    title: '4. Important medical disclaimer',
    callout: true,
    items: [
      'ShanghaiMed does NOT provide medical diagnosis, treatment, surgery, prescription, testing or any clinical service. All clinical decisions, diagnoses and treatments are made independently by the treating hospital and its licensed physicians under their own responsibility and licences.',
      'Information provided through the Website or our staff is for coordination, planning and general information only and is not a substitute for professional medical advice, diagnosis or treatment from a qualified physician.',
      'Medical outcomes, waiting times, treatment plans and costs cannot be guaranteed. Final diagnoses, treatment plans and fees are determined by the treating hospital after in-person evaluation.',
      'In a medical emergency, call your local emergency services immediately. In mainland China, dial 120 for ambulance and emergency care.',
    ],
  },
  {
    title: '5. Engagement, quotes and payment',
    items: [
      'A written quote and service plan will be provided to you before any payment is due.',
      'A booking deposit is required to secure appointments and coordination resources. The engagement is confirmed only after the Deposit has been received by ShanghaiMed. Deposit and refund terms are set out in our Refund Policy.',
      'Coordination fees may be paid by the card payment links or international bank transfer methods we provide. Hospital and clinical fees are paid directly to the treating hospital and are never collected or held by ShanghaiMed.',
      'Invoices are issued by Shanghai Keling Information Technology Co., Ltd. in accordance with Chinese law.',
    ],
  },
  {
    title: '6. Your responsibilities',
    items: [
      'Provide accurate, complete and genuine information, medical records and identity/visa documents;',
      'Obtain a valid visa and travel documents for entry to China; obtain suitable travel and/or medical insurance as you consider appropriate;',
      'Make your own decisions, in consultation with your treating physicians, about whether to proceed with any treatment recommended by a hospital;',
      'Pay hospital charges and your own travel, accommodation and living costs directly;',
      'Comply with the laws of the People\'s Republic of China and the rules of the hospitals you visit.',
    ],
  },
  {
    title: '7. Service availability and conduct',
    body: [
      'We may decline or discontinue service in the event of unsafe, unlawful, abusive or fraudulent conduct, or where a request is outside our coordination scope — for example requests to source controlled substances, prescription-only medication or medical devices, or requests to facilitate unlicensed clinical activity.',
    ],
  },
  {
    title: '8. Cancellation and rescheduling',
    body: [
      'Cancellation and rescheduling terms are set out in our Refund Policy. You should confirm travel bookings only after hospital appointments are confirmed in writing by ShanghaiMed.',
    ],
  },
  {
    title: '9. Intellectual property',
    body: [
      'Website content, branding, materials and service documents belong to Shanghai Keling Information Technology Co., Ltd. and may not be copied, reproduced or redistributed without our prior written permission.',
    ],
  },
  {
    title: '10. Third-party links and hospital websites',
    body: [
      'The Website may contain links to third-party websites, including hospitals and travel providers. We are not responsible for the content, accuracy or practices of third-party sites. Linked services are provided by independent third parties under their own terms.',
    ],
  },
  {
    title: '11. Limitation of liability',
    items: [
      'To the maximum extent permitted by applicable law, Shanghai Keling Information Technology Co., Ltd.\'s total aggregate liability in connection with our coordination service is limited to the coordination fees actually paid by you to us.',
      'We are not liable for clinical outcomes, or for any acts or omissions of hospitals, physicians, visa authorities, airlines, hotels or other third parties.',
      'We are not liable for force majeure events (including but not limited to natural disasters, epidemics, government action, transport disruption or civil unrest) that prevent or delay service delivery.',
      'We are not liable for indirect, consequential or punitive losses, including loss of profit, loss of opportunity or emotional distress.',
      'Nothing in these Terms excludes liability that cannot be excluded under applicable law, including liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be limited by law.',
    ],
  },
  {
    title: '12. Indemnity',
    body: [
      'You agree to indemnify ShanghaiMed against losses, claims or liabilities arising from your own breach of these Terms, your provision of false or misleading information, or your decisions regarding clinical treatment or travel.',
    ],
  },
  {
    title: '13. Governing law and language',
    body: [
      'These Terms are governed by the laws of the People\'s Republic of China. This English version is provided for your convenience; in the event of any inconsistency, the Chinese-language version will prevail to the extent required by applicable law.',
    ],
  },
  {
    title: '14. Dispute resolution',
    body: [
      'The parties will first attempt to resolve any dispute through good-faith negotiation within 30 days of written notice. If unresolved, disputes shall be submitted to the competent People\'s Court in Yangpu District, Shanghai, China (or such other court with statutory jurisdiction at the election of the plaintiff).',
    ],
  },
  {
    title: '15. Changes to these Terms',
    body: [
      'We may update these Terms from time to time. The version published on the Website on the date you engage our services applies to that engagement. Continued use of the Website after changes are posted constitutes acceptance of the updated Terms.',
    ],
  },
  {
    title: '16. Contact',
    contact: true,
  },
]

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-12">Last updated: October 12, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl font-bold text-gray-900">{s.title}</h2>
              {s.callout && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4 rounded-r">
                  <p className="text-amber-900 text-sm font-semibold m-0">
                    Important medical disclaimer
                  </p>
                </div>
              )}
              {s.body?.map((p, i) => <p key={i}>{p}</p>)}
              {s.items && (
                <ul>
                  {s.items.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              )}
              {s.contact && (
                <address className="not-italic">
                  Shanghai Keling Information Technology Co., Ltd.<br />
                  Room 101, Floor 1, No. 2555 Changyang Road, Yangpu District, Shanghai, China<br />
                  Email: <a href="mailto:hello@shanghaimedhealth.com" className="text-teal-600 hover:underline">hello@shanghaimedhealth.com</a>
                </address>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
