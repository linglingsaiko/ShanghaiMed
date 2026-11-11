import { NextRequest } from 'next/server';
import { proxyPhase3 } from '@/lib/phase3-proxy';

// 禁用缓存，实时读取支付配置。
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  return proxyPhase3(request, '/api/pay/config', { method: 'GET' });
}
