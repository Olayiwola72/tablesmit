import { lazy, Suspense, useEffect, type ReactNode } from 'react'
import { BrowserRouter, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Footer } from './components/layout/Footer/Footer'
import { Navbar } from './components/layout/Navbar/Navbar'
import { CookieConsent } from './components/ui/CookieConsent/CookieConsent'
import { ErrorBoundary } from './components/ui/ErrorBoundary/ErrorBoundary'
import { BackToTop } from './components/ui/BackToTop/BackToTop'
import { PageLoader } from './components/ui/PageLoader/PageLoader'
import { TooltipProvider } from './components/ui/Tooltip/Tooltip'
import { routerConfig } from './config/routes/routesConfig'

function TrailingSlashNormalizer() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname !== '/' && !pathname.endsWith('/') && !pathname.includes('.')) {
      navigate(pathname + '/', { replace: true })
    }
  }, [pathname, navigate])

  return null
}

function AppRoutes(): ReactNode {
  return useRoutes(routerConfig)
}

const ShortcutsModal = lazy(() =>
  import('./components/features/ShortcutsModal/ShortcutsModal').then((m) => ({
    default: m.ShortcutsModal,
  })),
)

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <TooltipProvider delayDuration={250}>
            <Navbar />
            <Suspense fallback={null}>
              <ShortcutsModal />
            </Suspense>
            <CookieConsent />
            <div className="flex flex-1 flex-col min-h-[calc(100vh-60px)]">
              <Suspense fallback={<PageLoader />}>
                <TrailingSlashNormalizer />
                <AppRoutes />
              </Suspense>
            </div>
            <Footer />
            <BackToTop />
          </TooltipProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
