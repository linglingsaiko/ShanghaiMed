import { NextRequest, NextResponse } from 'next/server'

const COZE_API_URL = 'https://api.coze.cn/v3/chat'
const COZE_BOT_ID = process.env.COZE_BOT_ID || ''
const COZE_TOKEN = process.env.COZE_TOKEN || ''

export async function POST(request: NextRequest) {
  try {
    const { message, conversation_id, user_id } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const response = await fetch(COZE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: COZE_BOT_ID,
        user_id: user_id || 'web_user',
        stream: false,
        auto_save_history: true,
        additional_messages: [{
          role: 'user',
          content: message,
          content_type: 'text',
        }],
        ...(conversation_id ? { conversation_id } : {}),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Coze API error:', errorText)
      return NextResponse.json({ error: 'Failed to get response' }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}