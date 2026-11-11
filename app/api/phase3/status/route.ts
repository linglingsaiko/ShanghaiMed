import { NextRequest, NextResponse } from 'next/server';
import { proxyPhase3 } from '@/lib/phase3-proxy';

export async function GET(request: NextRequest) {
  const taskId = request.nextUrl.searchParams.get('task_id');
  if (!taskId) {
    return NextResponse.json(
      { detail: 'task_id is required.' },
      { status: 400, headers: { 'Cache-Control': 'no-store', Vary: 'Cookie' } }
    );
  }
  return proxyPhase3(
    request,
    `/api/status/${encodeURIComponent(taskId)}`,
    { method: 'GET' }
  );
}
