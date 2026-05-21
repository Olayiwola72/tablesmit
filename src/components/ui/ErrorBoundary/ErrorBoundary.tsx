import { Component, type ErrorInfo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import * as Sentry from '@sentry/react'
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types'

function DefaultErrorFallback({ error }: { error: Error | null }): ReactNode {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="28" height="10" rx="4" fill="#DC2626" opacity="0.15" />
        <rect x="2" y="15" width="12" height="15" rx="3" fill="#DC2626" opacity="0.1" />
        <rect x="18" y="15" width="12" height="15" rx="3" fill="#DC2626" opacity="0.06" />
      </svg>
      <p className="text-base font-semibold text-text-primary">{t('errors.somethingWrong')}</p>
      <p className="max-w-xs text-sm text-text-secondary">
        {error?.message ?? t('errors.unexpectedError')}
      </p>
      <button
        type="button"
        className="text-sm text-primary underline underline-offset-2"
        onClick={() => window.location.reload()}
      >
        {t('errors.reload')}
      </button>
    </div>
  )
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    Sentry.captureException(error, {
      contexts: { react: { componentStack: info.componentStack } },
    })
    this.props.onError?.(error, info)
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultErrorFallback error={this.state.error} />
    }
    return this.props.children
  }
}
