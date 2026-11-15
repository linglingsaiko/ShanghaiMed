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

// 持久访客 ID：localStorage，跨浏览器会话识别回访客（修复原 sessionStorage 关浏览器即清零导致的"零回访"失真）
function visitorId() {
  try {
    const existing = window.localStorage.getItem('shmed_visitor_id')
    if (existing) return existing
    const created = randomId()
    window.localStorage.setItem('shmed_visitor_id', created)
    return created
  } catch {
    if (!memoryVisitorId) memoryVisitorId = randomId()
    return memoryVisitorId
  }
}

// 会话 ID：sessionStorage，仅标识单次浏览会话
function sessionId() {
  try {
    const existing = window.sessionStorage.getItem('shmed_session_id')
    if (existing) return existing
    const created = randomId()
    window.sessionStorage.setItem('shmed_session_id', created)
    return created
  } catch {
    if (!memorySessionId) memorySessionId = randomId()
    return memorySessionId
  }
}

function clean(value: string | null, maxLength = 200) {
  return value ? value.slice(0, maxLength) : null
}

function detectDevice(ua: string): string {
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return 'tablet'
  if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return 'mobile'
  return 'desktop'
}

interface EngageExtra {
  dwell_ms?: number
  scroll_depth?: number
}

function sendEvent(eventName: string, target?: string, extra?: EngageExtra) {
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

  const ua = navigator.userAgent || ''
  const payload = {
    event_name: eventName,
    path,
    target: clean(target || null, 500),
    locale,
    referrer_host: clean(referrerHost, 255),
    utm_source: clean(params.get('utm_source')),
    utm_medium: clean(params.get('utm_medium')),
    utm_campaign: clean(params.get('utm_campaign')),
    visitor_id: visitorId(),
    session_id: sessionId(),
    is_test: params.get('_analytics_test') === '1',
    user_agent: ua.slice(0, 500),
    device: detectDevice(ua),
    dwell_ms: extra?.dwell_ms ?? null,
    scroll_depth: extra?.scroll_depth ?? null,
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

  // pageview
  useEffect(() => {
    if (!pathname || lastTrackedPath.current === pathname) return
    lastTrackedPath.current = pathname
    void sendEvent('pageview')
  }, [pathname])

  // 转化点击
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

  // engage：停留时长 + 滚动深度（判断内容是认真被读还是秒退）
  useEffect(() => {
    const start = Date.now()
    let maxScroll = 0
    let sent = false

    function updateScroll() {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const pct = h > 0 ? Math.min(100, Math.round((window.scrollY / h) * 100)) : 100
      if (pct > maxScroll) maxScroll = pct
    }
    function sendEngage() {
      if (sent) return
      sent = true
      const dwell = Date.now() - start
      if (dwell < 500) return // 过滤 <0.5s 的误触/瞬时抓取
      void sendEvent('engage', undefined, { dwell_ms: dwell, scroll_depth: maxScroll })
    }
    function onVisibility() {
      if (document.visibilityState === 'hidden') sendEngage()
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('pagehide', sendEngage)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('pagehide', sendEngage)
      document.removeEventListener('visibilitychange', onVisibility)
      sendEngage() // 路由切换时上报上一个页面
    }
  }, [pathname])

  return null
}
