import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy | ShanghaiMed',
  description: 'Refund terms for ShanghaiMed coordination service fees. Hospital and clinical fees are paid directly to the treating hospital under the hospital\'s own rules.',
  alternates: { canonical: 'https://shanghaimedhealth.com/refund-policy' },
}

const SECTIONS = [
  {
    title: '1. Scope',
    body: [
      'This Refund Policy applies to the service coordination fees charged by ShanghaiMed (Shanghai Keling Information Technology Co., Ltd.). It does NOT apply to fees charged directly by hospitals, doctors, clinics or other third-party providers (for example examination, treatment, medication, admission or hospital deposits), which are paid by the patient directly to the treating hospital under that hospital\'s own refund and billing rules.',
      'ShanghaiMed never receives or holds hospital or clinical fees. We cannot issue refunds for amounts paid directly to hospitals; any refund request for hospital charges must be made to the hospital directly.',
    ],
  },
  {
    title: '2. Two categories of fees',
    items: [
      <><strong>ShanghaiMed coordination fee</strong> — the fee we charge for case review, medical-record translation, hospital/specialist matching, appointment scheduling, visa and logistics support, bilingual accompaniment and follow-up coordination. Collected by Shanghai Keling Information Technology Co., Ltd.</>,
      <><strong>Hospital / clinical fees</strong> — all medical, examination, treatment, medication and hospital charges paid directly by the patient to the treating hospital. ShanghaiMed does not collect or hold these funds and is not responsible for the hospital\'s refund decisions.</>,
    ],
  },
  {
    title: '3. Booking deposit',
    body: [
      'A non-refundable booking deposit (the "Deposit") is required to lock in specialist slots, hospital appointments, interpreter availability and the agreed travel window.',
    ],
    items: [
      'Once coordination work has commenced (for example medical-record translation, hospital/specialist matching, appointment booking or visa invitation support has been carried out), the Deposit is non-refundable, because third-party slots and resources have been reserved on your behalf and cannot be released to other patients.',
      'If ShanghaiMed is unable to provide the agreed service for reasons attributable to us, the Deposit will be refunded in full.',
    ],
  },
  {
    title: '4. Cancellation by the patient',
    items: [
      <><strong>More than 30 days before the scheduled service start date, before any coordination work has commenced:</strong> the Deposit is refundable minus non-recoverable third-party costs already incurred and non-recoverable payment-processing fees.</>,
      <><strong>Within 30 days of the scheduled service start date, or after coordination work has commenced:</strong> the Deposit is non-refundable; any remaining balance for services not yet delivered may be partially refunded at our discretion based on work already completed.</>,
      <><strong>No-show or late changes that cannot be accommodated by the hospital:</strong> coordination fees are non-refundable.</>,
    ],
  },
  {
    title: '5. Rescheduling',
    body: [
      'We will make reasonable efforts to reschedule your visit once at no extra coordination fee, subject to hospital and specialist availability. If rescheduling requires significant new coordination work or new third-party costs, we will inform you in advance.',
    ],
  },
  {
    title: '6. Visa refusal',
    body: [
      'A visa refusal does not automatically entitle you to a refund. Where the visa support documentation provided by us was correct and complete, the standard Deposit terms above apply. In the case of a visa refusal we will, where possible, reschedule the service once at no additional coordination fee.',
    ],
  },
  {
    title: '7. Medical reasons',
    body: [
      'If you are unable to travel on medical grounds (supported by documentation from your treating physician), we will consider a partial refund on a case-by-case basis after deducting third-party costs already incurred. We are not responsible for changes in clinical condition that arise between booking and your visit.',
    ],
  },
  {
    title: '8. Processing fees and currency',
    body: [
      'Fees and charges levied by payment providers (card processing, currency conversion or bank/wire fees) are non-recoverable and may be deducted from any approved refund. Refunds will be made in the original currency of payment to the original payment method, normally within 10–20 business days of approval.',
    ],
  },
  {
    title: '9. Chargebacks',
    body: [
      'We aim to resolve any concern directly and quickly. If you are dissatisfied with any aspect of our service, please contact us before initiating a card chargeback so we can work with you to address the issue. A chargeback does not override this Policy and may affect the amount ultimately due after review by the payment network.',
    ],
  },
  {
    title: '10. How to request a refund',
    body: [
      'Email hello@shanghaimedhealth.com with your full name, booking reference and the reason for the refund request. We will acknowledge your request within 5 business days and provide a decision after review.',
    ],
  },
  {
    title: '11. Changes to this Policy',
    body: [
      'We may update this Refund Policy from time to time. The version in effect on the date you pay the Deposit applies to that engagement unless a change is required by law.',
    ],
  },
  {
    title: '12. Contact',
    contact: true,
  },
]

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
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
