import { NextResponse } from 'next/server';

const RAILWAY_API_URL = process.env.PHASE3_API_URL || 'http://localhost:8000';

export async function GET() {
  try {
    const response = await fetch(`${RAILWAY_API_URL}/api/pay/config`, {
      method: 'GET',
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
