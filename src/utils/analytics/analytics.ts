declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (type: string, name: string, params?: Record<string, unknown>) => void
  }
}

export function loadAnalytics(): void {
  const id = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined
  if (!id || typeof window === 'undefined') return
  if (document.querySelector('#tablesmit-gtag')) return

  const s = document.createElement('script')
  s.id = 'tablesmit-gtag'
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  s.async = true
  document.head.appendChild(s)

  window.dataLayer ??= []
  const gtag = (...args: unknown[]) => { window.dataLayer!.push(args) }
  gtag('js', new Date())
  gtag('config', id)
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  const id = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined
  if (!id || import.meta.env.DEV) return
  window.gtag?.('event', name, params)
}
