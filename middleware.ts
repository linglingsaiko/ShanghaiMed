import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const adminPassword = process.env.ADMIN_PASSWORD

  // Skip auth if no admin password is set (development mode)
  if (!adminPassword) {
    return NextResponse.next()
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization')
    const sessionCookie = request.cookies.get('admin-session')

    // Check if user is already authenticated via cookie
    if (sessionCookie?.value === adminPassword) {
      return NextResponse.next()
    }

    // Check basic auth header
    if (authHeader && authHeader.startsWith('Basic ')) {
      const base64Credentials = authHeader.split(' ')[1]
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
      const [, password] = credentials.split(':')

      if (password === adminPassword) {
        // Set session cookie for future requests
        const response = NextResponse.next()
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

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/blog/:path*'],
}