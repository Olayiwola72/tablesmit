import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Logo } from '../Logo/Logo'

export function PageLoader(): ReactNode {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <Logo variant="icon" className="h-10 w-10 animate-pulse" />
      <p className="animate-pulse text-sm text-text-muted">{t('loading')}</p>
    </div>
  )
}
