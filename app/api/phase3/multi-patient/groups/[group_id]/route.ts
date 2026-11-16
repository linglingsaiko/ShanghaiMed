import { NextRequest } from 'next/server';
import { proxyPhase3 } from '@/lib/phase3-proxy';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ group_id: string }> }
) {
  const { group_id } = await params
  return proxyPhase3(
    request,
    `/api/multi-patient/groups/${encodeURIComponent(group_id)}`,
    { method: 'GET' }
  );
}
