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

            icon: '/images/navi-avatar.png',

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


        const observer = new MutationObserver((mutations) => {

          for (const mutation of mutations) {

            for (const node of Array.from(mutation.addedNodes)) {

              if (!(node instanceof HTMLElement)) continue

              if (node.tagName === 'DIV' && node.style.position === 'fixed') {

                const svg = node.querySelector('svg')

                const waLink = node.querySelector('a[href*="wa.me"]')

                if (svg && !waLink) {

                  node.style.bottom = '96px'

                  node.style.right = '24px'

                  const img = node.querySelector('img')

                  if (img) {

                    img.style.borderRadius = '50%'

                    img.style.width = '56px'

                    img.style.height = '56px'

                    img.style.objectFit = 'cover'

                  }

                  observer.disconnect()

                  return

                }

              }

              const fixedDiv = node.querySelector?.('div[style*="position: fixed"]') as HTMLElement | null

              if (fixedDiv) {

                const svg = fixedDiv.querySelector('svg')

                const waLink = fixedDiv.querySelector('a[href*="wa.me"]')

                if (svg && !waLink) {

                  fixedDiv.style.bottom = '96px'

                  fixedDiv.style.right = '24px'

                  const img = fixedDiv.querySelector('img')

                  if (img) {

                    img.style.borderRadius = '50%'

                    img.style.width = '56px'

                    img.style.height = '56px'

                    img.style.objectFit = 'cover'

                  }

                  observer.disconnect()

                  return

                }

              }

            }

          }

        })

        observer.observe(document.body, { childList: true, subtree: true })

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