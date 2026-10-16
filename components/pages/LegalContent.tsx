'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import LegalDocView from './LegalDocView'
import { legalEn, legalContact } from '@/lib/content/legal.en'
import { editorialEn } from '@/lib/content/editorial.en'
import { legalAr, legalArContact } from '@/lib/content/legal.ar'
import { editorialAr } from '@/lib/content/editorial.ar'
import type { LegalDoc } from '@/lib/content/types'

type DocKey = 'privacy' | 'terms' | 'refund' | 'editorial'

const enDocs: Record<DocKey, LegalDoc> = {
  privacy: legalEn.privacy,
  terms: legalEn.terms,
  refund: legalEn.refund,
  editorial: editorialEn,
}

const arDocs: Record<DocKey, LegalDoc> = {
  privacy: legalAr.privacy,
  terms: legalAr.terms,
  refund: legalAr.refund,
  editorial: editorialAr,
}

// Localize the contact block (company kept in English; address + label translated)
function withLocalizedContact(doc: LegalDoc, contact: { company: string; address: string; email: string; label: string }): LegalDoc {
  return {
    ...doc,
    sections: doc.sections.map((s) =>
      s.contact
        ? { ...s, contactLabel: contact.label, contactCompany: contact.company, contactAddress: contact.address, contactEmail: contact.email, contact: true }
        : s
    ),
  } as LegalDoc
}

export default function LegalContent({ docKey }: { docKey: DocKey }) {
  const { language } = useLanguage()

  if (language === 'ar') {
    return <LegalDocView doc={withLocalizedContact(arDocs[docKey], legalArContact)} />
  }
  // en / ja / ru / mn all fall back to the authoritative English legal text
  return (
    <LegalDocView
      doc={withLocalizedContact(enDocs[docKey], {
        ...legalContact,
        label: 'Email:',
      })}
    />
  )
}
