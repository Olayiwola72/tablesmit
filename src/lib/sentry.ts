type SentryExports = typeof import('@sentry/react')

let lazySentry: SentryExports | null = null
let initPromise: Promise<void> | null = null

async function ensureLoaded(): Promise<SentryExports | null> {
  if (lazySentry) return lazySentry
  if (initPromise) {
    await initPromise
    return lazySentry
  }
  if (!import.meta.env.PROD) return null

  const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined
  if (!dsn) return null

  initPromise = (async () => {
    const Sentry = await import('@sentry/react')
    Sentry.init({
      dsn,
      environment: 'production',
      sendDefaultPii: false,
      tracesSampleRate: 0.1,
      integrations: [Sentry.browserTracingIntegration()],
      beforeSend(event) {
        if (event.extra?.cells) delete event.extra.cells
        return event
      },
    })
    lazySentry = Sentry
  })()

  await initPromise
  return lazySentry
}

export function initSentry(): void {
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    ensureLoaded()
  }
}

export function captureException(error: Error, context?: Record<string, unknown>): void {
  if (!import.meta.env.PROD) {
    console.error('[ErrorBoundary]', error, context)
    return
  }
  ensureLoaded().then((Sentry) => {
    if (Sentry) {
      Sentry.captureException(error, context ? { contexts: { react: context } } : undefined)
    }
  })
}
