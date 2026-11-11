import { NextRequest } from 'next/server';
import { proxyPhase3 } from '@/lib/phase3-proxy';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  return proxyPhase3(request, '/api/auth/config', { method: 'GET' });
}
