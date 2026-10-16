import type { LegalDoc } from './types'

// ─────────────────────────────────────────────────────────────
// ENGLISH legal / policy content (source of truth, extracted 1:1
// from the original pages — guarantees zero English regression)
// ─────────────────────────────────────────────────────────────

const COMPANY_LINE = 'Shanghai Keling Information Technology Co., Ltd.'
const ADDRESS_LINE = 'Room 101, Floor 1, No. 2555 Changyang Road, Yangpu District, Shanghai, China'
const CONTACT_EMAIL = 'hello@shanghaimedhealth.com'
export const legalContact = { company: COMPANY_LINE, address: ADDRESS_LINE, email: CONTACT_EMAIL }

export const legalEn: Record<string, LegalDoc> = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: October 12, 2026',
    sections: [
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
          { sub: 'Identity and contact details', items: ['Your name, email address, phone number, nationality, passport or national ID details (where required for visa or hospital registration), and emergency contact information.'] },
          { sub: 'Health information', items: ['Medical records, reports, images, diagnoses and treatment history that you voluntarily provide to us so we can assess your case and match you with suitable hospitals and specialists. Health information is sensitive personal data and is processed only with your explicit consent.'] },
          { sub: 'Booking and travel information', items: ['Preferred travel dates, accommodation and visa-related details needed to coordinate your visit.'] },
          { sub: 'Payment information', items: ['We do not store full credit or debit card numbers on our servers. Card payments are processed by licensed payment service providers (such as Airwallex and/or PayPal), which comply with the Payment Card Industry Data Security Standard (PCI DSS).'] },
          { sub: 'Technical information', items: ['IP address, browser type, device information and usage data collected through cookies and similar tools to keep the site secure and functional.'] },
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
        body: ['To deliver our services your information is transferred to and processed in mainland China. We use appropriate contractual and technical safeguards to protect information in transit and at rest, in line with applicable data-protection requirements.'],
      },
      {
        title: '6. Data retention',
        body: ['We retain personal and health information for as long as needed to deliver the service and to meet legal, tax, accounting and medical-record retention obligations, after which it is securely deleted or anonymised.'],
      },
      {
        title: '7. Your rights',
        body: ['You may request access to, correction of, or deletion of your personal information (subject to legal retention obligations), and you may withdraw consent to processing at any time by contacting us. We will respond within a reasonable period as required by law.'],
      },
      {
        title: '8. Security',
        body: ['We use administrative, technical and physical safeguards — including encrypted transmission (HTTPS), access controls on a need-to-know basis, and regular security review — to protect your information. No method of transmission or storage is 100% secure, but we take reasonable steps appropriate to the sensitivity of the data.'],
      },
      {
        title: '9. Cookies',
        body: ['We use essential cookies to keep the website working and may use limited analytics cookies to understand how visitors use the site. You can control cookies through your browser settings; disabling essential cookies may affect site functionality.'],
      },
      {
        title: '10. Children',
        body: ['Our services are not directed to children under the age of 18. Information about minors who travel with a patient or are themselves patients is processed only with the consent of a parent or legal guardian.'],
      },
      {
        title: '11. Changes to this Policy',
        body: ['We may update this Policy from time to time. The date at the top of the page shows the most recent update. Material changes will be highlighted on the site.'],
      },
      { title: '12. Contact', contact: true },
    ],
  },

  terms: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: October 12, 2026',
    sections: [
      {
        title: '1. Who we are',
        body: ['ShanghaiMed is operated by Shanghai Keling Information Technology Co., Ltd. (上海可玲信息技术有限公司), a limited liability company registered in Shanghai, China under registration number 91310110MAKDNY7H7W. ShanghaiMed is a medical travel coordination and patient-navigation service. We are NOT a hospital, clinic or medical institution.'],
      },
      {
        title: '2. Acceptance of terms',
        body: ['By accessing https://shanghaimedhealth.com (the "Website") or engaging ShanghaiMed\u2019s services, including payment of any deposit or coordination fee, you agree to be bound by these Terms of Service and our Privacy Policy and Refund Policy. If you do not agree, please do not use the Website or our services.'],
      },
      {
        title: '3. Our services',
        body: ['ShanghaiMed arranges and coordinates, on your behalf:'],
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
        callout: 'Important medical disclaimer',
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
          'Comply with the laws of the People\u2019s Republic of China and the rules of the hospitals you visit.',
        ],
      },
      {
        title: '7. Service availability and conduct',
        body: ['We may decline or discontinue service in the event of unsafe, unlawful, abusive or fraudulent conduct, or where a request is outside our coordination scope — for example requests to source controlled substances, prescription-only medication or medical devices, or requests to facilitate unlicensed clinical activity.'],
      },
      {
        title: '8. Cancellation and rescheduling',
        body: ['Cancellation and rescheduling terms are set out in our Refund Policy. You should confirm travel bookings only after hospital appointments are confirmed in writing by ShanghaiMed.'],
      },
      {
        title: '9. Intellectual property',
        body: ['Website content, branding, materials and service documents belong to Shanghai Keling Information Technology Co., Ltd. and may not be copied, reproduced or redistributed without our prior written permission.'],
      },
      {
        title: '10. Third-party links and hospital websites',
        body: ['The Website may contain links to third-party websites, including hospitals and travel providers. We are not responsible for the content, accuracy or practices of third-party sites. Linked services are provided by independent third parties under their own terms.'],
      },
      {
        title: '11. Limitation of liability',
        items: [
          'To the maximum extent permitted by applicable law, Shanghai Keling Information Technology Co., Ltd.\u2019s total aggregate liability in connection with our coordination service is limited to the coordination fees actually paid by you to us.',
          'We are not liable for clinical outcomes, or for any acts or omissions of hospitals, physicians, visa authorities, airlines, hotels or other third parties.',
          'We are not liable for force majeure events (including but not limited to natural disasters, epidemics, government action, transport disruption or civil unrest) that prevent or delay service delivery.',
          'We are not liable for indirect, consequential or punitive losses, including loss of profit, loss of opportunity or emotional distress.',
          'Nothing in these Terms excludes liability that cannot be excluded under applicable law, including liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be limited by law.',
        ],
      },
      {
        title: '12. Indemnity',
        body: ['You agree to indemnify ShanghaiMed against losses, claims or liabilities arising from your own breach of these Terms, your provision of false or misleading information, or your decisions regarding clinical treatment or travel.'],
      },
      {
        title: '13. Governing law and language',
        body: ['These Terms are governed by the laws of the People\u2019s Republic of China. This English version is provided for your convenience; in the event of any inconsistency, the Chinese-language version will prevail to the extent required by applicable law.'],
      },
      {
        title: '14. Dispute resolution',
        body: ['The parties will first attempt to resolve any dispute through good-faith negotiation within 30 days of written notice. If unresolved, disputes shall be submitted to the competent People\u2019s Court in Yangpu District, Shanghai, China (or such other court with statutory jurisdiction at the election of the plaintiff).'],
      },
      {
        title: '15. Changes to these Terms',
        body: ['We may update these Terms from time to time. The version published on the Website on the date you engage our services applies to that engagement. Continued use of the Website after changes are posted constitutes acceptance of the updated Terms.'],
      },
      { title: '16. Contact', contact: true },
    ],
  },

  refund: {
    title: 'Refund Policy',
    lastUpdated: 'Last updated: October 12, 2026',
    sections: [
      {
        title: '1. Scope',
        body: [
          'This Refund Policy applies to the service coordination fees charged by ShanghaiMed (Shanghai Keling Information Technology Co., Ltd.). It does NOT apply to fees charged directly by hospitals, doctors, clinics or other third-party providers (for example examination, treatment, medication, admission or hospital deposits), which are paid by the patient directly to the treating hospital under that hospital\u2019s own refund and billing rules.',
          'ShanghaiMed never receives or holds hospital or clinical fees. We cannot issue refunds for amounts paid directly to hospitals; any refund request for hospital charges must be made to the hospital directly.',
        ],
      },
      {
        title: '2. Two categories of fees',
        items: [
          { lead: 'ShanghaiMed coordination fee', text: '— the fee we charge for case review, medical-record translation, hospital/specialist matching, appointment scheduling, visa and logistics support, bilingual accompaniment and follow-up coordination. Collected by Shanghai Keling Information Technology Co., Ltd.' },
          { lead: 'Hospital / clinical fees', text: '— all medical, examination, treatment, medication and hospital charges paid directly by the patient to the treating hospital. ShanghaiMed does not collect or hold these funds and is not responsible for the hospital\u2019s refund decisions.' },
        ],
      },
      {
        title: '3. Booking deposit',
        body: ['A non-refundable booking deposit (the "Deposit") is required to lock in specialist slots, hospital appointments, interpreter availability and the agreed travel window.'],
        items: [
          'Once coordination work has commenced (for example medical-record translation, hospital/specialist matching, appointment booking or visa invitation support has been carried out), the Deposit is non-refundable, because third-party slots and resources have been reserved on your behalf and cannot be released to other patients.',
          'If ShanghaiMed is unable to provide the agreed service for reasons attributable to us, the Deposit will be refunded in full.',
        ],
      },
      {
        title: '4. Cancellation by the patient',
        items: [
          { lead: 'More than 30 days before the scheduled service start date, before any coordination work has commenced:', text: ' the Deposit is refundable minus non-recoverable third-party costs already incurred and non-recoverable payment-processing fees.' },
          { lead: 'Within 30 days of the scheduled service start date, or after coordination work has commenced:', text: ' the Deposit is non-refundable; any remaining balance for services not yet delivered may be partially refunded at our discretion based on work already completed.' },
          { lead: 'No-show or late changes that cannot be accommodated by the hospital:', text: ' coordination fees are non-refundable.' },
        ],
      },
      {
        title: '5. Rescheduling',
        body: ['We will make reasonable efforts to reschedule your visit once at no extra coordination fee, subject to hospital and specialist availability. If rescheduling requires significant new coordination work or new third-party costs, we will inform you in advance.'],
      },
      {
        title: '6. Visa refusal',
        body: ['A visa refusal does not automatically entitle you to a refund. Where the visa support documentation provided by us was correct and complete, the standard Deposit terms above apply. In the case of a visa refusal we will, where possible, reschedule the service once at no additional coordination fee.'],
      },
      {
        title: '7. Medical reasons',
        body: ['If you are unable to travel on medical grounds (supported by documentation from your treating physician), we will consider a partial refund on a case-by-case basis after deducting third-party costs already incurred. We are not responsible for changes in clinical condition that arise between booking and your visit.'],
      },
      {
        title: '8. Processing fees and currency',
        body: ['Fees and charges levied by payment providers (card processing, currency conversion or bank/wire fees) are non-recoverable and may be deducted from any approved refund. Refunds will be made in the original currency of payment to the original payment method, normally within 10–20 business days of approval.'],
      },
      {
        title: '9. Chargebacks',
        body: ['We aim to resolve any concern directly and quickly. If you are dissatisfied with any aspect of our service, please contact us before initiating a card chargeback so we can work with you to address the issue. A chargeback does not override this Policy and may affect the amount ultimately due after review by the payment network.'],
      },
      {
        title: '10. How to request a refund',
        body: ['Email hello@shanghaimedhealth.com with your full name, booking reference and the reason for the refund request. We will acknowledge your request within 5 business days and provide a decision after review.'],
      },
      {
        title: '11. Changes to this Policy',
        body: ['We may update this Refund Policy from time to time. The version in effect on the date you pay the Deposit applies to that engagement unless a change is required by law.'],
      },
      { title: '12. Contact', contact: true },
    ],
  },
}
