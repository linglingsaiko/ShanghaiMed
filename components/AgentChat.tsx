'use client'

import React, { useEffect } from 'react'

declare global {
  interface Window {
    CozeWebSDK?: {
      WebChatClient: new (options: Record<string, unknown>) => {
        showChatBot: () => void
        hideChatBot: () => void
      }
    }
    __naviShow?: () => void
    __naviHide?: () => void
  }
}

const AgentChat: React.FC = () => {
  useEffect(() => {
    const initChat = () => {
      if (window.CozeWebSDK) {
        const patToken = process.env.NEXT_PUBLIC_COZE_PAT || ''
        const baseUrl = window.location.origin
        const sdkClient = new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: '7684227464671215669',
          },
          auth: {
            type: 'token',
            token: patToken,
            onRefreshToken: function () {
              return process.env.NEXT_PUBLIC_COZE_PAT || ''
            },
          },
          userInfo: {
            id: 'web-visitor',
            url: `${baseUrl}/images/default-user.svg`,
            nickname: 'Visitor',
          },
          componentProps: {
            title: 'Navi · Medical Navigator',
            chatInputPlaceholder: 'Ask me about healthcare in Shanghai...',
          },
          ui: {
            base: {
              icon: `${baseUrl}/images/navi-avatar.png`,
              lang: 'en',
            },
            asstBtn: {
              isNeed: false,
            },
            chatBot: {
              title: 'Navi · Medical Navigator',
            },
            footer: {
              isShow: false,
            },
          },
        })

        window.__naviShow = () => sdkClient.showChatBot()
        window.__naviHide = () => sdkClient.hideChatBot()
      }
    }

    if (window.CozeWebSDK) {
      initChat()
    } else {
      const existingScript = document.querySelector('script[src*="chat-app-sdk"]')
      if (existingScript) {
        existingScript.addEventListener('load', initChat)
      } else {
        const script = document.createElement('script')
        script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/oversea/index.js'
        script.async = true
        script.onload = initChat
        document.body.appendChild(script)
      }
    }
  }, [])

  return null
}

export default AgentChat