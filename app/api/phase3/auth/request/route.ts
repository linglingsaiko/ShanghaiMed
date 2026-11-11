import { NextRequest } from 'next/server';
import { proxyPhase3 } from '@/lib/phase3-proxy';

export async function POST(request: NextRequest) {
  return proxyPhase3(request, '/api/auth/request', { method: 'POST' });
}
