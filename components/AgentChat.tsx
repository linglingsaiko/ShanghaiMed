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
    // Load Coze SDK if not already loaded
    if (!window.CozeWebSDK) {
      const script = document.createElement('script')
      script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js'
      script.async = true
      document.body.appendChild(script)
    }

    // Initialize chat widget after SDK loads
    const initChat = () => {
      if (window.CozeWebSDK) {
        // Debug: Check if PAT token is loaded
        const patToken = process.env.NEXT_PUBLIC_COZE_PAT || ''
        console.log('[Navi AI] PAT Token loaded:', patToken ? 'Yes (length: ' + patToken.length + ')' : 'No')
        
        new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: '7641560175996059663',
          },
          auth: {
            type: 'token',
            token: patToken,
            onRefreshToken: function () {
              const refreshToken = process.env.NEXT_PUBLIC_COZE_PAT || ''
              console.log('[Navi AI] Refresh token called, token:', refreshToken ? 'Yes' : 'No')
              return refreshToken
            }
          },
          componentProps: {
            title: 'Navi - Medical Navigator',
            icon: '/images/navi-avatar.png',
          },
          ui: {
            asstBtn: {
              isNeed: true,
            },
          },
        })
      }
    }

    // Wait for SDK to load, then initialize
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

    // Fallback: JS-based position adjustment for Coze SDK button
    const positionInterval = setInterval(() => {
      const allFixedElements = document.querySelectorAll('button, div[role="button"]');
      allFixedElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const style = window.getComputedStyle(htmlEl);
        if (
          style.position === 'fixed' &&
          htmlEl.querySelector('img') &&
          !htmlEl.closest('a[href*="wa.me"]') &&
          !htmlEl.closest('[class*="whatsapp"]') &&
          !htmlEl.closest('[class*="WhatsApp"]') &&
          !htmlEl.closest('[aria-label*="WhatsApp"]')
        ) {
          // This is likely the Coze SDK button
          if (htmlEl.style.bottom !== '96px') {
            htmlEl.style.bottom = '96px';
            htmlEl.style.right = '24px';
            console.log('[Navi AI] Position adjusted via JS');
          }
        }
      });
    }, 500);

    return () => {
      clearInterval(positionInterval);
    };
  }, [])

  return null
}

export default AgentChat
