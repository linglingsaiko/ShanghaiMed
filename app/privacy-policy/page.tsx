import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | ShanghaiMed',
  description: 'How ShanghaiMed collects, uses, discloses and protects the personal and health information of international patients using our medical travel coordination services.',
  alternates: { canonical: 'https://shanghaimedhealth.com/privacy-policy' },
}

const SECTIONS = [
  {
    title: '1. Who we are',
    body: [
      'ShanghaiMed is operated by Shanghai Keling Information Technology Co., Ltd. (上海可玲信息技术有限公司), a limited liability company registered in Shanghai, China, registration number 91310110MAKDNY7H7W. Our registered address is Room 101, Floor 1, No. 2555 Changyang Road, Yangpu District, Shanghai. We provide medical travel coordination and patient navigation services for international patients seeking medical care in Shanghai.',
      'This Privacy Policy explains how we collect, use, disclose and protect personal information, including health-related information, when you use our website (shanghaimedhealth.com) or engage our services. By using the website or our services you agree to this Policy.',
    ],
  },
  {
    title: '2. Information we collect',
    subsections: [
      {
        sub: 'Identity and contact details',
        items: ['Your name, email address, phone number, nationality, passport or national ID details (where required for visa or hospital registration), and emergency contact information.'],
      },
      {
        sub: 'Health information',
        items: ['Medical records, reports, images, diagnoses and treatment history that you voluntarily provide to us so we can assess your case and match you with suitable hospitals and specialists. Health information is sensitive personal data and is processed only with your explicit consent.'],
      },
      {
        sub: 'Booking and travel information',
        items: ['Preferred travel dates, accommodation and visa-related details needed to coordinate your visit.'],
      },
      {
        sub: 'Payment information',
        items: ['We do not store full credit or debit card numbers on our servers. Card payments are processed by licensed payment service providers (such as Airwallex and/or PayPal), which comply with the Payment Card Industry Data Security Standard (PCI DSS).'],
      },
      {
        sub: 'Technical information',
        items: ['IP address, browser type, device information and usage data collected through cookies and similar tools to keep the site secure and functional.'],
      },
    ],
  },
  {
    title: '3. How we use your information',
    items: [
      'Assess your case and match hospitals and specialists;',
      'Schedule appointments, interpretation and on-the-ground accompaniment;',
      'Support medical visa applications and travel logistics;',
      'Process service coordination fees and issue invoices;',
      'Communicate with you before, during and after your visit;',
      'Comply with legal, accounting, tax and regulatory obligations.',
    ],
  },
  {
    title: '4. Who we share information with',
    items: [
      'Licensed public hospitals and treating physicians in China who will care for you, strictly on a need-to-know basis;',
      'Licensed payment processors to collect service fees;',
      'Visa, travel and accommodation providers where necessary to arrange your visit;',
      'Professional advisors and government authorities where required by Chinese or applicable law.',
    ],
    closing: 'We do not sell your personal information. We do not share your information with third parties for marketing purposes.',
  },
  {
    title: '5. International data transfer',
    body: [
      'To deliver our services your information is transferred to and processed in mainland China. We use appropriate contractual and technical safeguards to protect information in transit and at rest, in line with applicable data-protection requirements.',
    ],
  },
  {
    title: '6. Data retention',
    body: [
      'We retain personal and health information for as long as needed to deliver the service and to meet legal, tax, accounting and medical-record retention obligations, after which it is securely deleted or anonymised.',
    ],
  },
  {
    title: '7. Your rights',
    body: [
      'You may request access to, correction of, or deletion of your personal information (subject to legal retention obligations), and you may withdraw consent to processing at any time by contacting us. We will respond within a reasonable period as required by law.',
    ],
  },
  {
    title: '8. Security',
    body: [
      'We use administrative, technical and physical safeguards — including encrypted transmission (HTTPS), access controls on a need-to-know basis, and regular security review — to protect your information. No method of transmission or storage is 100% secure, but we take reasonable steps appropriate to the sensitivity of the data.',
    ],
  },
  {
    title: '9. Cookies',
    body: [
      'We use essential cookies to keep the website working and may use limited analytics cookies to understand how visitors use the site. You can control cookies through your browser settings; disabling essential cookies may affect site functionality.',
    ],
  },
  {
    title: '10. Children',
    body: [
      'Our services are not directed to children under the age of 18. Information about minors who travel with a patient or are themselves patients is processed only with the consent of a parent or legal guardian.',
    ],
  },
  {
    title: '11. Changes to this Policy',
    body: [
      'We may update this Policy from time to time. The date at the top of the page shows the most recent update. Material changes will be highlighted on the site.',
    ],
  },
  {
    title: '12. Contact',
    contact: true,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: October 12, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl font-bold text-gray-900">{s.title}</h2>
              {s.body?.map((p, i) => <p key={i}>{p}</p>)}
              {s.items && (
                <ul>
                  {s.items.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              )}
              {s.closing && <p>{s.closing}</p>}
              {s.subsections?.map((sub) => (
                <div key={sub.sub} className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">{sub.sub}</h3>
                  <ul>
                    {sub.items.map((it, i) => <li key={i}>{it}</li>)}
                  </ul>
                </div>
              ))}
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
