import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react'
import './index.scss'
import './i18n/i18n'
import App from './App.tsx'
import { registerPWA } from './pwa.ts'

registerPWA()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      icons={{
        success: <CheckCircle2 size={18} className="text-success" />,
        info: <Info size={18} className="text-info" />,
        warning: <AlertTriangle size={18} className="text-amber-500" />,
        error: <XCircle size={18} className="text-danger" />,
      }}
      toastOptions={{
        duration: 3000,
        classNames: {
          toast: 'font-sans text-sm',
          success: 'border-l-4 border-success bg-success-light',
          error: 'border-l-4 border-danger bg-danger-light',
          info: 'border-l-4 border-info bg-info-light',
          warning: 'border-l-4 border-[#F59E0B] bg-[#FFFBEB]',
        },
      }}
    />
  </StrictMode>,
)
