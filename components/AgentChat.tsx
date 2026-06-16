'use client'

import React, { useEffect, useState } from 'react'


declare global {

  interface Window {

    CozeWebSDK?: {

      WebChatClient: new (options: Record<string, unknown>) => {

        showChatBot: () => void

        hideChatBot: () => void

      }

    }

  }

}


const AgentChat: React.FC = () => {

  const [client, setClient] = useState<ReturnType<typeof window.CozeWebSDK.WebChatClient> | null>(null)

  const [isOpen, setIsOpen] = useState(false)


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

        const sdkClient = new window.CozeWebSDK.WebChatClient({

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

              isNeed: false,

            },

            chatBot: {

              title: 'ShanghaiMed Navigator',

            },

            footer: {

              isShow: false,

            },

          },

        })

        setClient(sdkClient)

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


  const toggleChat = () => {

    if (!client) return

    if (isOpen) {

      client.hideChatBot()

      setIsOpen(false)

    } else {

      client.showChatBot()

      setIsOpen(true)

    }

  }


  return (

    <button

      onClick={toggleChat}

      aria-label="Open AI Navigator"

      style={{

        position: 'fixed',

        bottom: '96px',

        right: '24px',

        width: '56px',

        height: '56px',

        borderRadius: '50%',

        border: 'none',

        padding: 0,

        cursor: 'pointer',

        zIndex: 40,

        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',

        overflow: 'hidden',

        background: '#00B37E',

      }}

    >

      <img

        src="/images/navi-avatar.png"

        alt="Navi"

        style={{

          width: '100%',

          height: '100%',

          objectFit: 'cover',

          borderRadius: '50%',

        }}

      />

    </button>

  )

}


export default AgentChat