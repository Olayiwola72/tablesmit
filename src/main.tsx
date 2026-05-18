import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.scss'
import App from './App.tsx'

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
