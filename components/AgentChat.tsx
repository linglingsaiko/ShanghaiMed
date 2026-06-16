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


        window.__naviShow = () => sdkClient.showChatBot()

        window.__naviHide = () => sdkClient.hideChatBot()

      }

    }


    if (window.CozeWebSDK) {

      initChat()

    } else {

      const script = document.createElement('script')

      script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js'

      script.async = true

      script.onload = initChat

      document.body.appendChild(script)

    }

  }, [])


  return null

}


export default AgentChat