import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  metadataBase: new URL('https://shanghaimed.com'),
  title: {
    default: 'ShanghaiMed - World-Class Medical Care in Shanghai',
    template: '%s | ShanghaiMed',
  },
  description:
    'Connect with China\'s top hospitals, bilingual nurses, and 24/7 AI support. World-class medical care in Shanghai at a fraction of the cost.',
  keywords: [
    'Shanghai medical tourism',
    'China healthcare',
    'international hospitals Shanghai',
    'bilingual nurses',
    'medical travel China',
    'Shanghai hospitals',
    'ISPN nurses',
  ],
  authors: [{ name: 'ShanghaiMed' }],
  creator: 'ShanghaiMed',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shanghaimed.com',
    siteName: 'ShanghaiMed',
    title: 'ShanghaiMed - World-Class Medical Care in Shanghai',
    description:
      'Connect with China\'s top hospitals, bilingual nurses, and 24/7 AI support at a fraction of the cost.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ShanghaiMed - International Medical Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShanghaiMed - World-Class Medical Care in Shanghai',
    description:
      'Connect with China\'s top hospitals, bilingual nurses, and 24/7 AI support.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LanguageProvider>
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalOrganization',
              name: 'ShanghaiMed',
              description:
                'International medical services platform connecting global patients with Shanghai\'s top-tier hospitals and bilingual healthcare professionals.',
              url: 'https://shanghaimed.com',
              logo: 'https://shanghaimed.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['English', 'Chinese'],
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Shanghai',
                addressCountry: 'CN',
              },
              medicalSpecialty: [
                'Neurology',
                'Cardiology',
                'Oncology',
                'Orthopedics',
                'Dermatology',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Medical Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: 'Medical Consultation',
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: 'Hospital Matching',
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: 'Bilingual Nurse Services',
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: 'Medical Visa Support',
                  },
                ],
              },
            }),
          }}
        />

        {/* Coze Chat SDK */}
        <script
          dangerouslySetInnerHTML={{
            __html: `<script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js" onload="scheduleCozeInit()"><\/script>`
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var cozeInitAttempted = false;
              var cozeInitRetries = 0;
              var maxRetries = 3;
              
              function scheduleCozeInit() {
                // Delay initialization for better mobile performance
                setTimeout(initCozeChat, 1000);
              }
              
              function initCozeChat() {
                if (cozeInitAttempted && cozeInitRetries >= maxRetries) return;
                
                cozeInitAttempted = true;
                cozeInitRetries++;
                
                try {
                  var token = '${process.env.NEXT_PUBLIC_COZE_TOKEN || ''}';
                  if (typeof CozeWebSDK !== 'undefined' && token) {
                    new CozeWebSDK.WebChatClient({
                      config: {
                        bot_id: '7641560175996059663',
                        chatInputPlaceholder: 'Ask me about medical services in Shanghai...',
                      },
                      componentProps: {
                        icon: '/images/navi-avatar.png',
                        title: 'ShanghaiMed Navigator',
                      },
                      ui: {
                        base: {
                          lang: 'en',
                        },
                        chatBot: {
                          title: 'ShanghaiMed Navigator',
                          uploadable: true,
                          showThinking: false,
                        },
                        asstBtn: {
                          isNeed: true,
                        },
                        footer: {
                          isShow: false,
                        },
                      },
                      auth: {
                        type: 'token',
                        token: token,
                        onRefreshToken: function() {
                          return token;
                        }
                      },
                      onError: function(error) {
                        console.warn('Coze SDK error:', error);
                        // Retry on error if we haven't exceeded max retries
                        if (cozeInitRetries < maxRetries) {
                          setTimeout(initCozeChat, 2000 * cozeInitRetries);
                        }
                      }
                    });
                  }
                } catch (e) {
                  console.warn('Coze SDK init failed (attempt ' + cozeInitRetries + '):', e);
                  // Retry on exception
                  if (cozeInitRetries < maxRetries) {
                    setTimeout(initCozeChat, 2000 * cozeInitRetries);
                  }
                }
              }
              
              // Fallback init if script loads before DOM ready
              document.addEventListener('DOMContentLoaded', function() {
                if (!cozeInitAttempted) {
                  scheduleCozeInit();
                }
              });
            `
          }}
        />
      </body>
    </html>
  )
}
