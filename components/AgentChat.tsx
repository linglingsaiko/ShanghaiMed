'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

declare global {
  interface Window {
    __naviShow?: () => void
    __naviHide?: () => void
  }
}

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  streaming?: boolean
  error?: boolean
}

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    "Hello! I'm Navi, your medical navigator. Ask me anything about hospitals, treatments, costs, visas, or planning your medical journey in Shanghai.",
}

// 开场快捷问题。文案可随时替换为 Coze 后台配置的具体内容。
const SUGGESTED_QUESTIONS = [
  'How do I choose the right hospital in Shanghai?',
  'How much does treatment in Shanghai cost?',
  'Do I need a visa for medical treatment in China?',
  'What is the visit process for international patients?',
]

type StreamFrame = {
  type?: string
  content?: string
  conversation_id?: string
  message?: string
}

const AgentChat: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const conversationIdRef = useRef<string | undefined>(undefined)
  const abortRef = useRef<AbortController | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const show = useCallback(() => setOpen(true), [])
  const hide = useCallback(() => setOpen(false), [])

  useEffect(() => {
    window.__naviShow = show
    window.__naviHide = hide
    return () => {
      delete window.__naviShow
      delete window.__naviHide
      abortRef.current?.abort()
    }
  }, [show, hide])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, loading, open])

  // 更新最后一条 assistant 消息（流式期间频繁调用，用函数式 setState 保证不丢帧）
  const updateAssistant = useCallback((content: string, streaming: boolean, error = false) => {
    setMessages((prev) => {
      const next = [...prev]
      const last = next[next.length - 1]
      if (last && last.role === 'assistant') {
        next[next.length - 1] = { role: 'assistant', content, streaming, error }
      } else {
        next.push({ role: 'assistant', content, streaming, error })
      }
      return next
    })
  }, [])

  const send = useCallback(
    async (overrideText?: string) => {
      const text = (overrideText ?? input).trim()
      if (!text || loading) return

      setInput('')
      setLoading(true)
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: '', streaming: true },
      ])

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            conversation_id: conversationIdRef.current,
            user_id: 'web-visitor',
          }),
          signal: controller.signal,
        })

        const contentType = res.headers.get('content-type') ?? ''

        // 服务端在流开始前用 JSON 返回错误（非 2xx 或明确 JSON）
        if (!res.ok || contentType.includes('application/json')) {
          let msg = 'Navi is temporarily unavailable. Please try again in a moment.'
          try {
            const j = await res.json()
            if (typeof j?.error === 'string' && j.error) msg = j.error
          } catch {
            /* ignore */
          }
          throw new Error(msg)
        }

        if (!res.body) {
          throw new Error('Navi returned no content.')
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let acc = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          let idx: number
          while ((idx = buffer.indexOf('\n')) !== -1) {
            const line = buffer.slice(0, idx).trim()
            buffer = buffer.slice(idx + 1)
            if (!line) continue
            let obj: StreamFrame
            try {
              obj = JSON.parse(line) as StreamFrame
            } catch {
              continue
            }
            if (obj.type === 'delta' && typeof obj.content === 'string') {
              acc += obj.content
              updateAssistant(acc, true)
            } else if (obj.type === 'meta' && typeof obj.conversation_id === 'string' && obj.conversation_id) {
              conversationIdRef.current = obj.conversation_id
            } else if (obj.type === 'error' && typeof obj.message === 'string') {
              throw new Error(obj.message)
            }
          }
        }

        updateAssistant(acc || '(No response)', false)
      } catch (e) {
        if ((e as Error)?.name !== 'AbortError') {
          const msg =
            (e as Error)?.message || 'Navi is temporarily unavailable. Please try again later.'
          updateAssistant(msg, false, true)
        }
      } finally {
        setLoading(false)
        abortRef.current = null
      }
    },
    [input, loading, updateAssistant],
  )

  return (
    <>
      {/* 浮动按钮 */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Navi AI assistant"
        className="fixed right-6 bottom-24 z-40 overflow-hidden w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        <Image src="/images/navi-avatar.png" alt="Navi" fill sizes="56px" className="object-cover" />
      </button>

      {/* 聊天面板 */}
      {open && (
        <div className="fixed z-50 inset-0 sm:inset-auto sm:right-6 sm:bottom-40 sm:w-[380px] sm:max-h-[70vh] flex flex-col bg-white sm:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* 标题栏 */}
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-white">
            <Image src="/images/navi-avatar.png" alt="Navi" width={36} height={36} className="rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">Navi · Medical Navigator</div>
              <div className="text-xs text-gray-300 truncate">24/7 AI assistant</div>
            </div>
            <button
              onClick={hide}
              aria-label="Close chat"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 消息列表 */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-accent text-white rounded-br-md'
                      : m.error
                        ? 'bg-red-50 text-red-600 border border-red-200 rounded-bl-md'
                        : 'bg-white text-gray-700 border border-gray-100 rounded-bl-md'
                  }`}
                >
                  {m.content}
                  {m.streaming && <span className="inline-block w-1.5 h-4 ml-0.5 bg-gray-400 animate-pulse align-middle" />}
                </div>
              </div>
            ))}

            {/* 开场快捷问题：仅在首次打开、尚未开始对话时显示 */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-left text-xs text-primary border border-primary/30 bg-white hover:bg-primary/5 rounded-full px-3 py-2 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 输入区 */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
            className="border-t border-gray-100 p-3 bg-white flex items-center gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about healthcare in Shanghai..."
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-accent/40"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-accent text-white disabled:opacity-40 hover:bg-accent/90 transition-colors"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default AgentChat