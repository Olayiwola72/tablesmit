import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button'
import { siteConfig } from '../../../config/siteConfig'

const CONSENT_KEY = 'tablesmit-consent'
const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined

function loadAnalytics(): void {
  if (!GA_ID || typeof window === 'undefined') return
  if (document.querySelector('#tablesmit-gtag')) return

  const s = document.createElement('script')
  s.id = 'tablesmit-gtag'
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  s.async = true
  document.head.appendChild(s)

  const w = window as unknown as Record<string, unknown>
  w.dataLayer = w.dataLayer ?? []
  const gtag = (...args: unknown[]) => { (w.dataLayer as unknown[]).push(args) }
  gtag('js', new Date())
  gtag('config', GA_ID)
}

function getConsent(): 'accepted' | 'declined' | null {
  return localStorage.getItem(CONSENT_KEY) as 'accepted' | 'declined' | null
}

function setConsent(value: 'accepted' | 'declined'): void {
  localStorage.setItem(CONSENT_KEY, value)
}

export function CookieConsent(): ReactNode {
  const { t } = useTranslation()
  const [consent, setConsentState] = useState<'accepted' | 'declined' | null>(getConsent)

  if (consent !== null) {
    if (consent === 'accepted' && import.meta.env.PROD) loadAnalytics()
    return null
  }

  const accept = (): void => {
    setConsent('accepted')
    setConsentState('accepted')
    if (import.meta.env.PROD) loadAnalytics()
  }
  const decline = (): void => {
    setConsent('declined')
    setConsentState('declined')
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white p-4 shadow-sm"
      role="dialog"
      aria-label={t('cookieConsent.dialogAria')}
    >
      <div className="mx-auto flex max-w-content flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-secondary">
          {t('cookieConsent.message')}
          <a href={siteConfig.routes.privacy} className="ml-1 text-primary underline underline-offset-2" aria-label={t('cookieConsent.learnMoreAria')}>{t('cookieConsent.learnMore')}</a>.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="ghost" size="sm" onClick={decline}>{t('cookieConsent.decline')}</Button>
          <Button variant="primary" size="sm" onClick={accept}>{t('cookieConsent.accept')}</Button>
        </div>
      </div>
    </div>
  )
}
