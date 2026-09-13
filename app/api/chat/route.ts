import { NextRequest, NextResponse } from 'next/server'

// 国际版 Coze Chat V3 API（流式）。区别于国内版 api.coze.cn。
const COZE_API_URL = 'https://api.coze.com/v3/chat'
const COZE_BOT_ID = process.env.COZE_BOT_ID || '7684227464671215669'
// 服务端专用 token，运行时读取。不用 NEXT_PUBLIC 前缀，避免被打进前端包 / 被构建期内联成旧值。
const COZE_TOKEN = process.env.COZE_API_TOKEN || ''

// 流式对话时间较短，适当放宽函数超时（在支持该配置的套餐上生效）。
export const maxDuration = 60

type Json = Record<string, unknown>
type SseEvent = { event: string; data: Json }

function safeParse(text: string): Json | null {
  try {
    return JSON.parse(text) as Json
  } catch {
    return null
  }
}

function extractError(data: Json | null): string {
  if (!data) return ''
  const v = data.msg ?? data.error ?? data.message
  return typeof v === 'string' ? v : ''
}

// 把一段 SSE 文本解析为若干 { event, data }。Coze 每个事件形如：
//   event:conversation.message.delta
//   data:{...json...}
function parseSseBlock(block: string): SseEvent[] {
  const out: SseEvent[] = []
  let currentEvent = ''
  for (const rawLine of block.split('\n')) {
    const line = rawLine.trim()
    if (line.startsWith('event:')) {
      currentEvent = line.slice(6).trim()
    } else if (line.startsWith('data:')) {
      const parsed = safeParse(line.slice(5).trim())
      if (parsed) {
        out.push({ event: currentEvent, data: parsed })
        currentEvent = ''
      }
    }
  }
  return out
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const message = typeof body?.message === 'string' ? body.message.trim() : ''
    const conversationId =
      typeof body?.conversation_id === 'string' && body.conversation_id
        ? body.conversation_id
        : undefined
    const userId = typeof body?.user_id === 'string' && body.user_id ? body.user_id : 'web-visitor'

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }
    if (!COZE_TOKEN) {
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
        stream: true,
        auto_save_history: true,
        additional_messages: [{ role: 'user', content: message, content_type: 'text' }],
        ...(conversationId ? { conversation_id: conversationId } : {}),
      }),
    })

    // HTTP 层错误（非 2xx）——此时上游返回 JSON 错误体，而非 SSE。
    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '')
      const parsed = safeParse(text)
      return NextResponse.json({ error: extractError(parsed) || `Coze returned an error (${upstream.status}).` })
    }

    if (!upstream.body) {
      return NextResponse.json({ error: 'Coze returned an empty response.' })
    }

    const reader = upstream.body.getReader()
    const decoder = new TextDecoder()
    const encoder = new TextEncoder()

    let outgoingConversationId = conversationId ?? ''
    let sentMeta = false
    let streamedAny = false
    let reportedError = false

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const send = (obj: Json) => {
          controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'))
        }

        const processBlock = (block: string) => {
          const events = parseSseBlock(block)
          for (const { event, data: ev } of events) {
            // 业务/协议错误（HTTP 200 但仍可能在流内返回 code != 0）
            if (typeof ev.code === 'number' && ev.code !== 0) {
              reportedError = true
              send({ type: 'error', message: extractError(ev) || `Coze error code ${ev.code}` })
              return
            }
            // conversation_id 用于维持多轮会话
            if (typeof ev.conversation_id === 'string' && ev.conversation_id && !outgoingConversationId) {
              outgoingConversationId = ev.conversation_id
            }
            if (!sentMeta && outgoingConversationId) {
              sentMeta = true
              send({ type: 'meta', conversation_id: outgoingConversationId })
            }
            // 仅取 delta 事件的正文增量，忽略 message.completed 里的完整内容，避免重复
            if (
              event === 'conversation.message.delta' &&
              ev.type === 'answer' &&
              typeof ev.content === 'string' &&
              ev.content
            ) {
              streamedAny = true
              send({ type: 'delta', content: ev.content })
            }
          }
        }

        let buffer = ''
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n')
            let idx: number
            while ((idx = buffer.indexOf('\n\n')) !== -1) {
              const block = buffer.slice(0, idx)
              buffer = buffer.slice(idx + 2)
              processBlock(block)
              if (reportedError) break
            }
            if (reportedError) break
          }

          if (!reportedError) {
            // 处理剩余 buffer（可能是切在事件中间的尾巴，或整段 JSON 错误）
            const rest = buffer.trim()
            if (rest) processBlock(rest)
            if (!streamedAny) {
              const whole = safeParse(rest)
              if (whole && typeof whole.code === 'number' && whole.code !== 0) {
                send({ type: 'error', message: extractError(whole) || `Coze error code ${whole.code}` })
                reportedError = true
              }
            }
          }

          if (!sentMeta && !reportedError) {
            send({ type: 'meta', conversation_id: outgoingConversationId || null })
          }
          send({ type: 'done' })
          controller.close()
        } catch (e) {
          if (!reportedError) {
            send({ type: 'error', message: (e as Error)?.message || 'Stream failed' })
          }
          send({ type: 'done' })
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('[navi] api error:', error)
    return NextResponse.json({ error: `Internal error: ${(error as Error)?.message || 'unknown'}` })
  }
}