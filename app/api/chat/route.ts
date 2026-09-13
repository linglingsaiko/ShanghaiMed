import { NextRequest, NextResponse } from 'next/server'

// 国际版 Coze Chat V3 API（流式）。区别于国内版 api.coze.cn。
const COZE_API_URL = 'https://api.coze.com/v3/chat'
const COZE_BOT_ID = process.env.COZE_BOT_ID || '7684227464671215669'
// 优先使用服务端专用 token；未配置时回退到已有的 NEXT_PUBLIC_COZE_PAT，保证开箱即用。
const COZE_TOKEN = process.env.COZE_API_TOKEN || process.env.NEXT_PUBLIC_COZE_PAT || ''

function safeParse(text: string): Record<string, unknown> | null {
  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    return null
  }
}

function extractErrorMessage(text: string): string {
  const parsed = safeParse(text)
  if (!parsed) return ''
  const msg = parsed.msg || parsed.error || parsed.message
  return typeof msg === 'string' ? msg : ''
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const message = typeof body?.message === 'string' ? body.message.trim() : ''
    const conversationId =
      typeof body?.conversation_id === 'string' && body.conversation_id
        ? body.conversation_id
        : undefined
    const userId =
      typeof body?.user_id === 'string' && body.user_id ? body.user_id : 'web-visitor'

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }
    if (!COZE_TOKEN) {
      return NextResponse.json({ error: 'Coze token is not configured' }, { status: 500 })
    }

    const upstream = await fetch(COZE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${COZE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: COZE_BOT_ID,
        user_id: userId,
        stream: true,
        auto_save_history: true,
        additional_messages: [{ role: 'user', content: message, content_type: 'text' }],
        ...(conversationId ? { conversation_id: conversationId } : {}),
      }),
    })

    const contentType = upstream.headers.get('content-type') || ''

    // 上游直接返回错误（非 2xx）
    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '')
      const friendly = extractErrorMessage(text)
      return NextResponse.json(
        { error: friendly || `Coze returned an error (${upstream.status})` },
        { status: 502 },
      )
    }

    // 正常情况：流式 SSE，直接透传给浏览器
    if (contentType.includes('text/event-stream') && upstream.body) {
      return new Response(upstream.body, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          'X-Accel-Buffering': 'no',
        },
      })
    }

    // 未返回 SSE（通常是业务错误，如未发布到 API 渠道等，HTTP 仍为 200 但带 code != 0）
    const text = await upstream.text().catch(() => '')
    const parsed = safeParse(text)
    if (parsed && typeof parsed.code === 'number' && parsed.code !== 0) {
      const msg = extractErrorMessage(text)
      return NextResponse.json(
        { error: msg || `Coze error code ${parsed.code}` },
        { status: 502 },
      )
    }

    return NextResponse.json({ error: 'Unexpected response from Coze' }, { status: 502 })
  } catch (error) {
    console.error('[navi] api error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}