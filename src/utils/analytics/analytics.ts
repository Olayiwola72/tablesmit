import { ANALYTICS_CONFIG } from '../../config/analytics/analyticsConfig'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (type: string, name: string, params?: Record<string, unknown>) => void
  }
}

function getMeasurementId(): string | undefined {
  return import.meta.env[ANALYTICS_CONFIG.envVar] as string | undefined
}

export function loadAnalytics(): void {
  const id = getMeasurementId()
  if (!id || typeof window === 'undefined') return
  if (document.querySelector(`#${ANALYTICS_CONFIG.scriptId}`)) return

  const s = document.createElement('script')
  s.id = ANALYTICS_CONFIG.scriptId
  s.src = `${ANALYTICS_CONFIG.baseUrl}${id}`
  s.async = true
  document.head.appendChild(s)

  window.dataLayer ??= []
  const gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args)
  }
  gtag(ANALYTICS_CONFIG.commands.js, new Date())
  gtag(ANALYTICS_CONFIG.commands.config, id)
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  const id = getMeasurementId()
  if (!id || import.meta.env.DEV) return
  window.gtag?.(ANALYTICS_CONFIG.commands.event, name, params)
}
