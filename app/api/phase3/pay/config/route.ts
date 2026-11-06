import { NextResponse } from 'next/server';

const RAILWAY_API_URL = process.env.PHASE3_API_URL || 'http://localhost:8000';

// 禁用缓存，实时读取支付配置。
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch(`${RAILWAY_API_URL}/api/pay/config`, {
      method: 'GET',
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Pay config proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to get payment config' },
      { status: 500 }
    );
  }
}
