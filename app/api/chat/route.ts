import { NextRequest, NextResponse } from 'next/server'

// 国际版 Coze Chat V3 API（非流式，兼容 Cloudflare 代理链路）。区别于国内版 api.coze.cn。
const COZE_API_URL = 'https://api.coze.com/v3/chat'
const COZE_BOT_ID = process.env.COZE_BOT_ID || '7684227464671215669'
// 优先使用服务端专用 token；未配置时回退到已有的 NEXT_PUBLIC_COZE_PAT，保证开箱即用。
const COZE_TOKEN = process.env.COZE_API_TOKEN || process.env.NEXT_PUBLIC_COZE_PAT || ''

type CozeMessage = {
  role?: string
  content?: unknown
  content_type?: string
  [key: string]: unknown
}

function safeParse(text: string): Record<string, unknown> | null {
  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    return null
  }
}

// 兼容 content 为字符串或分段数组（多模态/富文本）两种情况
function messageText(content: unknown): string {
  if (typeof content === 'string') return content
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (part && typeof part === 'object' && typeof (part as Record<string, unknown>).text === 'string') {
          return (part as Record<string, unknown>).text as string
        }
        return ''
      })
      .filter(Boolean)
      .join(' ')
  }
  return ''
}

function extractError(data: Record<string, unknown> | null): string {
  if (!data) return ''
  const v = data.msg ?? data.error ?? data.message
  return typeof v === 'string' ? v : ''
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
      return NextResponse.json({ error: 'Coze token is not configured.' }, { status: 500 })
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
        stream: false,
        auto_save_history: true,
        additional_messages: [{ role: 'user', content: message, content_type: 'text' }],
        ...(conversationId ? { conversation_id: conversationId } : {}),
      }),
    })

    // 无论状态码，先把上游文本读出来，方便把 Coze 的真实报错透传给前端
    const text = await upstream.text().catch(() => '')
    const parsed = safeParse(text)

    // HTTP 层错误（非 2xx）
    if (!upstream.ok) {
      const msg = extractError(parsed)
      return NextResponse.json(
        { error: msg || `Coze returned an error (${upstream.status}).` },
        { status: 502 },
      )
    }

    // 业务层错误（HTTP 200 但 code != 0），常见如 token 错误、Bot 未发布到 API 渠道等
    if (parsed && typeof parsed.code === 'number' && parsed.code !== 0) {
      return NextResponse.json(
        { error: extractError(parsed) || `Coze error code ${parsed.code}` },
        { status: 502 },
      )
    }

    // 成功响应：{ code: 0, data: { conversation_id, messages: [...] } }
    const data = (parsed?.data ?? parsed) as Record<string, unknown> | null
    const messages = (Array.isArray(data?.messages) ? data.messages : []) as CozeMessage[]
    const assistant = messages.find((m) => m.role === 'assistant')
    const reply = messageText(assistant?.content).trim()

    if (!reply) {
      return NextResponse.json({ error: 'Navi returned an empty response.' }, { status: 502 })
    }

    const returnedConversationId =
      typeof data?.conversation_id === 'string'
        ? data.conversation_id
        : typeof parsed?.conversation_id === 'string'
          ? parsed.conversation_id
          : undefined

    return NextResponse.json({
      reply,
      conversation_id: returnedConversationId ?? conversationId ?? null,
    })
  } catch (error) {
    console.error('[navi] api error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}