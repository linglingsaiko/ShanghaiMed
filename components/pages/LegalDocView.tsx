'use client'

import type { LegalDoc, LegalSection } from '@/lib/content/types'

type LegalItem = NonNullable<LegalSection['items']>[number]

function Section({ s }: { s: LegalSection }) {
  const isLeadItem = (it: LegalItem): it is { lead: string; text: string } =>
    typeof it === 'object' && it !== null && 'lead' in it

  return (
    <section className={s.boxed ? 'bg-gray-100 rounded-lg p-6' : ''}>
      <h2 className="text-2xl font-bold text-gray-900">{s.title}</h2>
      {s.callout && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4 rounded-r">
          <p className="text-amber-900 text-sm font-semibold m-0">{s.callout}</p>
        </div>
      )}
      {s.body?.map((p, i) => <p key={i}>{p}</p>)}
      {s.items && (
        <ul>
          {s.items.map((it, i) =>
            isLeadItem(it) ? (
              <li key={i}><strong>{it.lead}</strong> {it.text}</li>
            ) : (
              <li key={i}>{it}</li>
            )
          )}
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
      {s.table && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                {s.table.headers.map((h, i) => (
                  <th key={i} className={`text-left py-2 font-semibold text-gray-900 ${i === 0 ? 'pr-4' : i === s.table!.headers.length - 1 ? '' : 'pr-4'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {s.table.rows.map((r, ri) => (
                <tr key={ri}>
                  <td className="py-3 pr-4 align-top">
                    {r.tier && (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${r.tierColor || 'bg-gray-100 text-gray-800'}`}>{r.tier}</span>
                    )}
                  </td>
                  {r.cells.map((c, ci) => (
                    <td key={ci} className={`py-3 align-top ${ci === r.cells.length - 1 ? 'text-gray-600' : 'pr-4 text-gray-700'}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.note && <p className="text-sm text-gray-500 mt-4">{s.note}</p>}
      {(s.highlightLead || s.highlightText) && (
        <p className="text-sm text-gray-500 mt-2"><strong>{s.highlightLead}</strong>{s.highlightText}</p>
      )}
      {s.contact && (
        <address className="not-italic">
          {s.contactCompany || 'Shanghai Keling Information Technology Co., Ltd.'}<br />
          {s.contactAddress || 'Room 101, Floor 1, No. 2555 Changyang Road, Yangpu District, Shanghai, China'}<br />
          {s.contactLabel || 'Email:'}{' '}
          <a href={`mailto:${s.contactEmail || 'hello@shanghaimedhealth.com'}`} className="text-teal-600 hover:underline">
            {s.contactEmail || 'hello@shanghaimedhealth.com'}
          </a>
        </address>
      )}
    </section>
  )
}

export default function LegalDocView({ doc }: { doc: LegalDoc }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{doc.title}</h1>
        <p className="text-gray-500 mb-12">{doc.lastUpdated}</p>
        <div className="prose prose-gray max-w-none space-y-8">
          {doc.sections.map((s, i) => <Section key={i} s={s} />)}
        </div>
      </div>
    </div>
  )
}
