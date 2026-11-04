import { NextRequest, NextResponse } from 'next/server';

const RAILWAY_API_URL = process.env.PHASE3_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const response = await fetch(`${RAILWAY_API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Upload proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}
