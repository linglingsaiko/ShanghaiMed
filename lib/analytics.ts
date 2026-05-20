// Google Analytics configuration
// Replace GA_MEASUREMENT_ID with your actual Google Analytics measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// Google Analytics script
export const gaScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_MEASUREMENT_ID}');
`

// Event tracking helper
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore
    window.gtag('event', eventName, eventParams)
  }
}

// Common events
export const events = {
  consultationClick: () => trackEvent('cta_click', { cta_name: 'consultation' }),
  whatsappClick: () => trackEvent('cta_click', { cta_name: 'whatsapp' }),
  hospitalView: (hospitalName: string) =>
    trackEvent('view_hospital', { hospital_name: hospitalName }),
  formSubmit: (formType: string) =>
    trackEvent('form_submit', { form_type: formType }),
  phoneClick: () => trackEvent('cta_click', { cta_name: 'phone' }),
}
