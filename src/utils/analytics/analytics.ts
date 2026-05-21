const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID

declare global {
  interface Window {
    gtag?: (type: string, name: string, params?: Record<string, unknown>) => void
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!GA_ID || import.meta.env.DEV) return
  window.gtag?.('event', name, params)
}
