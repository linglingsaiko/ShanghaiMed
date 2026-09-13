import { NextRequest, NextResponse } from 'next/server'

// 国际版 Coze Chat V3 API（非流式，兼容 Cloudflare 代理链路）。区别于国内版 api.coze.cn。
const COZE_API_URL = 'https://api.coze.com/v3/chat'
const COZE_RETRIEVE_URL = 'https://api.coze.com/v3/chat/retrieve'
const COZE_MESSAGE_LIST_URL = 'https://api.coze.com/v3/chat/message/list'
const COZE_BOT_ID = process.env.COZE_BOT_ID || '7684227464671215669'
// 优先使用服务端专用 token；未配置时回退到已有的 NEXT_PUBLIC_COZE_PAT，保证开箱即用。
const COZE_TOKEN = process.env.COZE_API_TOKEN || process.env.NEXT_PUBLIC_COZE_PAT || ''

// 非流式轮询会多停留几秒，适当放宽函数超时（在支持该配置的套餐上生效）。
export const maxDuration = 30

type CozeMessage = {
  role?: string
  type?: string
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

// 从 retrieve 结果中提取 last_error 的人类可读描述
function extractLastError(data: Record<string, unknown> | null): string {
  const lastError = data?.last_error as Record<string, unknown> | null
  if (!lastError) return ''
  const msg = lastError.msg ?? lastError.message ?? lastError.error
  return typeof msg === 'string' ? msg : ''
}

// 非流式：发起对话后 Coze 先返回 in_progress，需要轮询 retrieve 直到 completed。
async function waitForCompletion(conversationId: string, chatId: string): Promise<{ ok: boolean; error?: string }> {
  for (let i = 0; i < 8; i++) {
    const url = `${COZE_RETRIEVE_URL}?conversation_id=${encodeURIComponent(conversationId)}&chat_id=${encodeURIComponent(chatId)}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${COZE_TOKEN}` },
    })
    const text = await res.text().catch(() => '')
    const parsed = safeParse(text)

    if (!res.ok) {
      return { ok: false, error: extractError(parsed) || `Coze retrieve failed (${res.status}).` }
    }
    if (parsed && typeof parsed.code === 'number' && parsed.code !== 0) {
      return { ok: false, error: extractError(parsed) || `Coze retrieve error code ${parsed.code}` }
    }

    const data = (parsed?.data ?? parsed) as Record<string, unknown> | null
    const status = typeof data?.status === 'string' ? data.status : ''

    if (status === 'completed') return { ok: true }
    if (status === 'failed' || status === 'canceled') {
      return { ok: false, error: `Chat ${status}: ${extractLastError(data) || 'unknown reason'}` }
    }
    // created / in_progress / requires_action：稍候继续
    await new Promise((r) => setTimeout(r, 1000))
  }
  return { ok: false, error: 'Timed out waiting for Navi to reply. Please try again.' }
}

// 拉取对话消息，返回助手回复文本
async function fetchReply(conversationId: string, chatId: string): Promise<{ reply: string; error?: string }> {
  const url = `${COZE_MESSAGE_LIST_URL}?conversation_id=${encodeURIComponent(conversationId)}&chat_id=${encodeURIComponent(chatId)}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${COZE_TOKEN}` },
  })
  const text = await res.text().catch(() => '')
  const parsed = safeParse(text)

  if (!res.ok) {
    return { reply: '', error: extractError(parsed) || `Coze message list failed (${res.status}).` }
  }
  if (parsed && typeof parsed.code === 'number' && parsed.code !== 0) {
    return { reply: '', error: extractError(parsed) || `Coze message list error code ${parsed.code}` }
  }

  const messages = (Array.isArray(parsed?.data) ? parsed.data : []) as CozeMessage[]
  const assistant = messages.find((m) => m.role === 'assistant' && m.type !== 'follow_up')
  const reply = messageText(assistant?.content).trim()
  return { reply }
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
      // 用 200 返回，避免被 CDN/代理把错误体屏蔽，方便前端直接展示
      return NextResponse.json({ error: 'Coze token is not configured.' })
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

    // HTTP 层错误（非 2xx）——用 200 返回真实错误体，避免被 Cloudflare 把 502 错误页屏蔽
    if (!upstream.ok) {
      const msg = extractError(parsed)
      return NextResponse.json({ error: msg || `Coze returned an error (${upstream.status}).` })
    }

    // 业务层错误（HTTP 200 但 code != 0），常见如 token 错误、Bot 未发布到 API 渠道等
    if (parsed && typeof parsed.code === 'number' && parsed.code !== 0) {
      return NextResponse.json({ error: extractError(parsed) || `Coze error code ${parsed.code}` })
    }

    // 成功响应：{ code: 0, data: { id: chat_id, conversation_id, status: 'in_progress' } }
    const data = (parsed?.data ?? parsed) as Record<string, unknown> | null
    const chatId = typeof data?.id === 'string' ? data.id : ''
    const returnedConversationId =
      typeof data?.conversation_id === 'string'
        ? data.conversation_id
        : typeof parsed?.conversation_id === 'string'
          ? parsed.conversation_id
          : ''

    // 拿不到会话标识，无法继续轮询，透出原始响应便于排查
    if (!chatId || !returnedConversationId) {
      console.error('[navi] missing chat/conversation id, raw:', text)
      return NextResponse.json({
        error: 'Navi did not return a chat session. The bot may not be published to the "API" channel yet.',
        debug_raw: text.slice(0, 2000),
      })
    }

    // 非流式流程：轮询直到 completed，再拉取消息列表取助手回复
    const state = await waitForCompletion(returnedConversationId, chatId)
    if (!state.ok) {
      return NextResponse.json({ error: state.error || 'Navi failed to complete the chat.' })
    }

    const { reply, error } = await fetchReply(returnedConversationId, chatId)
    if (error) {
      return NextResponse.json({ error })
    }
    if (!reply) {
      console.error('[navi] empty reply, raw:', text)
      return NextResponse.json({ error: 'Navi returned an empty response. Please try again.' })
    }

    return NextResponse.json({
      reply,
      conversation_id: returnedConversationId ?? conversationId ?? null,
    })
  } catch (error) {
    console.error('[navi] api error:', error)
    return NextResponse.json({ error: `Internal error: ${(error as Error)?.message || 'unknown'}` })
  }
}