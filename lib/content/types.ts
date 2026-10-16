// Shared types for legal / policy pages (privacy, terms, refund, editorial, disclaimer)
// Content lives in lib/content/legal.ts and is selected by locale.

export interface LegalSubsection {
  sub: string
  items: string[]
}

export interface LegalSection {
  title: string
  body?: string[]
  items?: Array<string | { lead: string; text: string }>
  subsections?: LegalSubsection[]
  closing?: string
  callout?: string
  table?: {
    headers: string[]
    rows: Array<{ tier?: string; tierColor?: string; cells: string[] }>
  }
  note?: string
  highlightLead?: string
  highlightText?: string
  contact?: boolean
  contactLabel?: string
  contactCompany?: string
  contactAddress?: string
  contactEmail?: string
  boxed?: boolean
}

export interface LegalDoc {
  title: string
  lastUpdated: string
  sections: LegalSection[]
}
