import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLocaleFromPathname } from '@/lib/i18n'

// Bots blocked at server level (robots.txt is only advisory; these get hard 403)
// - Selected data-collection bots without a current acquisition priority
// - SEO analysis bots used for competitor research (no SEO impact — Google ignores them)
// GPTBot, ClaudeBot and Google-Extended intentionally remain allowed for
// long-term AI visibility and Gemini grounding.
const BLOCKED_BOTS = [
  'ccbot',
  'bytespider',
  'anthropic-ai',
  'amazonbot',
  'ahrefsbot',
  'semrushbot',
  'dotbot',
  'mj12bot',
  'petalbot',
  'dataforseobot',
  'serpstatbot',
  'zoominfobot',
  'gptfeed',
  'scentbot',
  'scrapy',
  'python-requests',
  'httpclient',
  'curl/',
  'wget',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-shanghaimed-locale', getLocaleFromPathname(pathname))
  const next = () => NextResponse.next({
    request: { headers: requestHeaders },
  })

  // Skip static assets & metadata files (matcher is intentionally broad; filter here)
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname === '/favicon.ico' ||
    /\.(png|jpe?g|svg|webp|ico|gif|txt|xml|json|css|js|map|woff2?|ttf|otf|mp4|webm|pdf)$/i.test(pathname)
  ) {
    return next()
  }

  // --- Bot filtering (all routes) ---
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase()
  if (userAgent && BLOCKED_BOTS.some(bot => userAgent.includes(bot))) {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: { 'x-robots-tag': 'noindex, nofollow' },
    })
  }

  const adminPassword = process.env.ADMIN_PASSWORD

  // Skip auth if no admin password is set (development mode)
  if (!adminPassword) {
    return next()
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization')
    const sessionCookie = request.cookies.get('admin-session')

    // Check if user is already authenticated via cookie
    if (sessionCookie?.value === adminPassword) {
      return next()
    }

    // Check basic auth header
    if (authHeader && authHeader.startsWith('Basic ')) {
      const base64Credentials = authHeader.split(' ')[1]
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
      const [, password] = credentials.split(':')

      if (password === adminPassword) {
        // Set session cookie for future requests
        const response = next()
        response.cookies.set('admin-session', adminPassword, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24, // 24 hours
        })
        return response
      }
    }

    // Return 401 with WWW-Authenticate header to trigger browser auth dialog
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area"',
      },
    })
  }

  // Protect Blog API POST/PUT/DELETE methods
  if (pathname.startsWith('/api/blog')) {
    const method = request.method

    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      const adminPasswordHeader = request.headers.get('x-admin-password')

      if (adminPasswordHeader !== adminPassword) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }
  }

  return next()
}

export const config = {
  // Broad matcher; static assets are filtered inside the handler (reliable across Next.js versions)
  matcher: ['/:path*'],
}
