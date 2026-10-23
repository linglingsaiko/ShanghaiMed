'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import LegalDocView from './LegalDocView'
import { legalEn, legalContact } from '@/lib/content/legal.en'
import { editorialEn } from '@/lib/content/editorial.en'
import { legalAr, legalArContact } from '@/lib/content/legal.ar'
import { editorialAr } from '@/lib/content/editorial.ar'
import { legalRu, legalRuContact } from '@/lib/content/legal.ru'
import { editorialRu } from '@/lib/content/editorial.ru'
import { legalMn, legalMnContact } from '@/lib/content/legal.mn'
import { editorialMn } from '@/lib/content/editorial.mn'
import { legalMs, legalMsContact } from '@/lib/content/legal.ms'
import { editorialMs } from '@/lib/content/editorial.ms'
import { legalId, legalIdContact } from '@/lib/content/legal.id'
import { editorialId } from '@/lib/content/editorial.id'
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

const ruDocs: Record<DocKey, LegalDoc> = {
  privacy: legalRu.privacy,
  terms: legalRu.terms,
  refund: legalRu.refund,
  editorial: editorialRu,
}

const mnDocs: Record<DocKey, LegalDoc> = {
  privacy: legalMn.privacy,
  terms: legalMn.terms,
  refund: legalMn.refund,
  editorial: editorialMn,
}

const msDocs: Record<DocKey, LegalDoc> = {
  privacy: legalMs.privacy,
  terms: legalMs.terms,
  refund: legalMs.refund,
  editorial: editorialMs,
}

const idDocs: Record<DocKey, LegalDoc> = {
  privacy: legalId.privacy,
  terms: legalId.terms,
  refund: legalId.refund,
  editorial: editorialId,
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
  if (language === 'ru') {
    return <LegalDocView doc={withLocalizedContact(ruDocs[docKey], legalRuContact)} />
  }
  if (language === 'mn') {
    return <LegalDocView doc={withLocalizedContact(mnDocs[docKey], legalMnContact)} />
  }
  if (language === 'ms') {
    return <LegalDocView doc={withLocalizedContact(msDocs[docKey], legalMsContact)} />
  }
  if (language === 'id') {
    return <LegalDocView doc={withLocalizedContact(idDocs[docKey], legalIdContact)} />
  }
  // en / ja fall back to the authoritative English legal text
  return (
    <LegalDocView
      doc={withLocalizedContact(enDocs[docKey], {
        ...legalContact,
        label: 'Email:',
      })}
    />
  )
}
