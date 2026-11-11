import { NextRequest, NextResponse } from 'next/server';

const RAILWAY_API_URL = process.env.PHASE3_API_URL || 'http://localhost:8000';
const SESSION_COOKIE_NAME = process.env.PHASE3_SESSION_COOKIE_NAME || 'smed_session';

type ProxyOptions = {
  method?: 'GET' | 'POST';
};

function splitSetCookieHeader(value: string): string[] {
  const cookies: string[] = [];
  let start = 0;

  for (let index = 0; index < value.length; index += 1) {
    if (value[index] !== ',') continue;
    const remainder = value.slice(index + 1).trimStart();
    // Expires attributes also contain commas. A new cookie starts with name=.
    if (!/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+=/.test(remainder)) continue;
    cookies.push(value.slice(start, index).trim());
    start = index + 1;
  }

  const lastCookie = value.slice(start).trim();
  if (lastCookie) cookies.push(lastCookie);
  return cookies;
}

function upstreamCookies(headers: Headers): string[] {
  const cookieHeaders = headers as Headers & { getSetCookie?: () => string[] };
  if (typeof cookieHeaders.getSetCookie === 'function') {
    return cookieHeaders.getSetCookie();
  }

  const combined = headers.get('set-cookie');
  return combined ? splitSetCookieHeader(combined) : [];
}

function onlySessionCookie(header: string | null): string | null {
  if (!header) return null;
  const prefix = `${SESSION_COOKIE_NAME}=`;
  const match = header.split(';').map((part) => part.trim()).find((part) => part.startsWith(prefix));
  return match || null;
}

function isSessionSetCookie(value: string): boolean {
  return value.startsWith(`${SESSION_COOKIE_NAME}=`);
}

export async function proxyPhase3(
  request: NextRequest,
  upstreamPath: string,
  options: ProxyOptions = {}
): Promise<NextResponse> {
  try {
    const method = options.method || (request.method === 'GET' ? 'GET' : 'POST');
    const headers = new Headers();
    const cookie = onlySessionCookie(request.headers.get('cookie'));
    const contentType = request.headers.get('content-type');
    const accept = request.headers.get('accept');
    const origin = request.headers.get('origin');
    const fetchSite = request.headers.get('sec-fetch-site');

    if (cookie) headers.set('cookie', cookie);
    if (contentType) headers.set('content-type', contentType);
    if (accept) headers.set('accept', accept);
    // Preserve browser CSRF signals so FastAPI can reject cross-site mutations.
    if (origin) headers.set('origin', origin);
    if (fetchSite) headers.set('sec-fetch-site', fetchSite);

    const body = method === 'GET' ? undefined : await request.arrayBuffer();
    const upstream = await fetch(
      `${RAILWAY_API_URL}${upstreamPath}${request.nextUrl.search}`,
      {
        method,
        headers,
        body,
        cache: 'no-store',
        redirect: 'manual',
      }
    );

    const responseHeaders = new Headers();
    upstream.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey === 'set-cookie' ||
        lowerKey === 'content-length' ||
        lowerKey === 'content-encoding' ||
        lowerKey === 'transfer-encoding' ||
        lowerKey === 'connection'
      ) {
        return;
      }
      responseHeaders.set(key, value);
    });

    // These responses can contain private report data or rotate a session.
    responseHeaders.set('cache-control', 'no-store');
    const vary = (responseHeaders.get('vary') || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    if (!vary.some((item) => item.toLowerCase() === 'cookie')) vary.push('Cookie');
    responseHeaders.set('vary', vary.join(', '));
    upstreamCookies(upstream.headers).forEach((cookieValue) => {
      if (isSessionSetCookie(cookieValue)) {
        responseHeaders.append('set-cookie', cookieValue);
      }
    });

    return new NextResponse(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  } catch {
    // Never log request cookies, medical bodies, OTPs, or access codes.
    return NextResponse.json(
      { error: 'Phase 3 upstream service unavailable' },
      { status: 502, headers: { 'Cache-Control': 'no-store', Vary: 'Cookie' } }
    );
  }
}
