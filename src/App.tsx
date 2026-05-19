import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { CookieConsent } from './components/ui/CookieConsent'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { PageLoader } from './components/ui/PageLoader'
import { ShortcutsModal } from './components/features/ShortcutsModal/ShortcutsModal'
import { TooltipProvider } from './components/ui/Tooltip'
import { siteConfig } from './config/siteConfig'

const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'))
const TableMakerPage = lazy(() => import('./pages/TableMakerPage/TableMakerPage'))
const BlogListPage = lazy(() => import('./pages/BlogListPage/BlogListPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage/BlogPostPage'))
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'))
const OpenSourcePage = lazy(() => import('./pages/OpenSourcePage/OpenSourcePage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage/TermsPage'))
const ChangelogPage = lazy(() => import('./pages/ChangelogPage/ChangelogPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <TooltipProvider delayDuration={250}>
            <Navbar />
            <ShortcutsModal />
            <CookieConsent />
            <div className="flex flex-1 flex-col">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route
                    path={siteConfig.routes.home}
                    element={
                      <ErrorBoundary>
                        <TableMakerPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route path={siteConfig.routes.about} element={<LandingPage />} />
                  <Route path={siteConfig.routes.blog} element={<BlogListPage />} />
                  <Route path={siteConfig.routes.blogPost} element={<BlogPostPage />} />
                  <Route path={siteConfig.routes.openSource} element={<OpenSourcePage />} />
                  <Route path={siteConfig.routes.contact} element={<ContactPage />} />
                  <Route path={siteConfig.routes.privacy} element={<PrivacyPage />} />
                  <Route path={siteConfig.routes.terms} element={<TermsPage />} />
                  <Route path={siteConfig.routes.changelog} element={<ChangelogPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </TooltipProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
