import { NextRequest, NextResponse } from 'next/server';

const RAILWAY_API_URL = process.env.PHASE3_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const search = request.nextUrl.search || '';
    const body = await request.text();

    const response = await fetch(`${RAILWAY_API_URL}/api/analyze${search}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Analyze proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze files' },
      { status: 500 }
    );
  }
}
