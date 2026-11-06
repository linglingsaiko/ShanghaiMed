import { NextRequest, NextResponse } from 'next/server';

const RAILWAY_API_URL = process.env.PHASE3_API_URL || 'http://localhost:8000';

// 禁用 Next.js 缓存：status 轮询必须返回 Railway 实时进度。
// 否则前端拿到缓存的旧状态，表现为"永远卡在某一步"的假象（后端其实已完成）。
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  _request: NextRequest,
  { params }: { params: { task_id: string } }
) {
  try {
    const { task_id } = params;

    const response = await fetch(`${RAILWAY_API_URL}/api/status/${task_id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Status proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    );
  }
}
