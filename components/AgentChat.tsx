'use client'

import React, { useEffect, useRef } from 'react'

const AgentChat: React.FC = () => {
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (scriptLoadedRef.current) {
      return
    }

    const script = document.createElement('script')
    script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/latest/libs/oversea/index.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      scriptLoadedRef.current = true
      initChat()
    }

    return () => {
    }
  }, [])

  const initChat = () => {
    const init = () => {
      if (typeof (window as any).CozeWebSDK !== 'undefined') {
        new (window as any).CozeWebSDK.WebChatClient({
          config: {
            bot_id: '7641560175996059663',
          },
          componentProps: {
            title: 'Coze',
          },
          auth: {
            type: 'token',
            token: process.env.NEXT_PUBLIC_COZE_TOKEN || '',
            onRefreshToken: function () {
              return process.env.NEXT_PUBLIC_COZE_TOKEN || ''
            }
          }
        });
      } else {
        setTimeout(init, 100)
      }
    }
    init()
  }

  return null
}

export default AgentChat
