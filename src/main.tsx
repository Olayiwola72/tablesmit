import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.scss'
import './i18n/i18n'
import App from './App.tsx'

const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined
if (import.meta.env.PROD && dsn) {
  import('@sentry/react').then((Sentry) => {
    Sentry.init({
      dsn,
      environment: 'production',
      tracesSampleRate: 0.1,
      integrations: [Sentry.browserTracingIntegration()],
      beforeSend(event) {
        if (event.extra?.cells) delete event.extra.cells
        return event
      },
    })
  })
}

requestIdleCallback(() => registerPWA(), { timeout: 3000 })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        classNames: {
          toast: 'font-sans text-sm',
          success: 'border-l-4 border-success',
          error: 'border-l-4 border-danger',
        },
      }}
    />
  </StrictMode>,
)
