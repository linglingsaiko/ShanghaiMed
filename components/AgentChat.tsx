'use client'

import React, { useEffect } from 'react'

declare global {
  interface Window {
    CozeWebSDK?: {
      WebChatClient: new (options: Record<string, unknown>) => void
    }
  }
}

const AgentChat: React.FC = () => {
  useEffect(() => {
    if (!window.CozeWebSDK) {
      const script = document.createElement('script')
      script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js'
      script.async = true
      document.body.appendChild(script)
    }

    const initChat = () => {
      if (window.CozeWebSDK) {
        const patToken = process.env.NEXT_PUBLIC_COZE_PAT || ''

        new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: '7641560175996059663',
          },
          auth: {
            type: 'token',
            token: patToken,
            onRefreshToken: function () {
              return process.env.NEXT_PUBLIC_COZE_PAT || ''
            }
          },
          componentProps: {
            title: 'ShanghaiMed Navigator',
            placeholder: 'Ask me about healthcare in Shanghai...',
          },
          ui: {
            asstBtn: {
              isNeed: true,
            },
            chatBot: {
              title: 'ShanghaiMed Navigator',
            },
            footer: {
              isShow: false,
            },
          },
        })
      }
    }

    if (window.CozeWebSDK) {
      initChat()
    } else {
      const checkInterval = setInterval(() => {
        if (window.CozeWebSDK) {
          clearInterval(checkInterval)
          initChat()
        }
      }, 100)
    }
  }, [])

  return null
}

export default AgentChat