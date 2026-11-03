'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const SUPABASE_URL = 'https://br-bonny-jird-bd567c5f.supabase2.aidap-global.cn-beijing.volces.com'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMzNzQxOTE4OTEsInJvbGUiOiJhbm9uIn0.6qTm-dP-118R01zn3-JO6xK6Zxxz1MIt2ZGEnFbidr0'
const EVENTS_URL = `${SUPABASE_URL}/rest/v1/website_analytics_events`
const LOCALES = new Set(['ja', 'ar', 'ru', 'mn', 'ms', 'id'])

let memoryVisitorId = ''
let memorySessionId = ''

function randomId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `anon-${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`
}

function sessionId(key: 'shmed_visitor_id' | 'shmed_session_id') {
  try {
    const existing = window.sessionStorage.getItem(key)
    if (existing) return existing
    const created = randomId()
    window.sessionStorage.setItem(key, created)
    return created
  } catch {
    if (key === 'shmed_visitor_id') {
      if (!memoryVisitorId) memoryVisitorId = randomId()
      return memoryVisitorId
    }
    if (!memorySessionId) memorySessionId = randomId()
    return memorySessionId
  }
}

function clean(value: string | null, maxLength = 200) {
  return value ? value.slice(0, maxLength) : null
}

function sendEvent(eventName: string, target?: string) {
  if (typeof window === 'undefined' || navigator.doNotTrack === '1') return
  const path = window.location.pathname
  if (!path || path.startsWith('/admin')) return

  const firstSegment = path.split('/').filter(Boolean)[0] || 'en'
  const locale = LOCALES.has(firstSegment) ? firstSegment : 'en'
  const params = new URLSearchParams(window.location.search)
  let referrerHost: string | null = null
  try {
    if (document.referrer) {
      const referrer = new URL(document.referrer)
      if (referrer.hostname !== window.location.hostname) referrerHost = referrer.hostname
    }
  } catch {
    referrerHost = null
  }

  const payload = {
    event_name: eventName,
    path,
    target: clean(target || null, 500),
    locale,
    referrer_host: clean(referrerHost, 255),
    utm_source: clean(params.get('utm_source')),
    utm_medium: clean(params.get('utm_medium')),
    utm_campaign: clean(params.get('utm_campaign')),
    visitor_id: sessionId('shmed_visitor_id'),
    session_id: sessionId('shmed_session_id'),
    is_test: params.get('_analytics_test') === '1',
  }

  fetch(EVENTS_URL, {
    method: 'POST',
    keepalive: true,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Analytics must never interrupt the patient journey.
  })
}

export default function WebsiteAnalytics() {
  const pathname = usePathname()
  const lastTrackedPath = useRef('')

  useEffect(() => {
    if (!pathname || lastTrackedPath.current === pathname) return
    lastTrackedPath.current = pathname
    void sendEvent('pageview')
  }, [pathname])

  useEffect(() => {
    function trackClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href') || ''

      if (href.startsWith('mailto:')) {
        void sendEvent('email_click', 'Email')
        return
      }

      let url: URL
      try {
        url = new URL(anchor.href, window.location.origin)
      } catch {
        return
      }

      if (url.hostname === 'wa.me' || url.hostname.endsWith('whatsapp.com')) {
        void sendEvent('whatsapp_click', 'WhatsApp')
      } else if (url.pathname.endsWith('/free-consultation')) {
        void sendEvent('consultation_click', 'Free consultation')
      } else if (url.pathname.endsWith('/contact')) {
        void sendEvent('contact_click', 'Contact')
      }
    }

    document.addEventListener('click', trackClick, true)
    return () => document.removeEventListener('click', trackClick, true)
  }, [])

  return null
}
