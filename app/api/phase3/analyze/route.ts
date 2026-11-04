import { NextRequest, NextResponse } from 'next/server';

const RAILWAY_API_URL = process.env.PHASE3_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${RAILWAY_API_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Analyze proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze records' },
      { status: 500 }
    );
  }
}
