import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button/Button'
import { siteConfig } from '../../../config/siteConfig'
import { loadAnalytics } from '../../../utils/analytics/analytics'

const CONSENT_KEY = 'tablesmit-consent'

function getConsent(): 'accepted' | 'declined' | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch {
    return null
  }
}

function setConsent(value: 'accepted' | 'declined'): void {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* Consent still applies for the current session. */
  }
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
      className="fixed bottom-0 left-0 right-0 z-50 h-[113px] border-t border-border bg-white p-4 shadow-sm sm:h-[73px] dark:bg-slate-800"
      role="dialog"
      aria-label={t('cookieConsent.dialogAria')}
    >
      <div className="mx-auto flex max-w-content flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-secondary">
          {t('cookieConsent.message')}
          <a href={siteConfig.routes.privacy} className="ml-1 font-semibold text-primary underline underline-offset-2 dark:text-blue-400">{t('cookieConsent.learnMore')} {t('footer.privacyPolicy')}</a>.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="ghost" size="sm" onClick={decline}>{t('cookieConsent.decline')}</Button>
          <Button variant="primary" size="sm" onClick={accept}>{t('cookieConsent.accept')}</Button>
        </div>
      </div>
    </div>
  )
}
