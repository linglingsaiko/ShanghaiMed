import { NextRequest } from 'next/server';
import { proxyPhase3 } from '@/lib/phase3-proxy';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ task_id: string }> }
) {
  const { task_id } = await params
  return proxyPhase3(
    request,
    `/api/status/${encodeURIComponent(task_id)}`,
    { method: 'GET' }
  );
}
