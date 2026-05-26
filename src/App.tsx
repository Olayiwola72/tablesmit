import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Footer } from './components/layout/Footer/Footer'
import { Navbar } from './components/layout/Navbar/Navbar'
import { CookieConsent } from './components/ui/CookieConsent/CookieConsent'
import { ErrorBoundary } from './components/ui/ErrorBoundary/ErrorBoundary'
import { BackToTop } from './components/ui/BackToTop/BackToTop'
import { PageLoader } from './components/ui/PageLoader/PageLoader'
import { TooltipProvider } from './components/ui/Tooltip/Tooltip'
import { siteConfig } from './config/siteConfig'

const TableMakerPage = lazy(() => import('./pages/TableMakerPage/TableMakerPage'))
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'))
const BlogListPage = lazy(() => import('./pages/BlogListPage/BlogListPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage/BlogPostPage'))
const FeaturesListPage = lazy(() => import('./pages/FeaturesListPage/FeaturesListPage'))
const FeatureDetailPage = lazy(() => import('./pages/FeatureDetailPage/FeatureDetailPage'))
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'))
const OpenSourcePage = lazy(() => import('./pages/OpenSourcePage/OpenSourcePage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage/TermsPage'))
const ChangelogPage = lazy(() => import('./pages/ChangelogPage/ChangelogPage'))
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage/TestimonialsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const ShortcutsModal = lazy(() =>
  import('./components/features/ShortcutsModal/ShortcutsModal').then((m) => ({
    default: m.ShortcutsModal,
  })),
)

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <TooltipProvider delayDuration={250}>
            <Navbar />
            <Suspense fallback={null}>
              <ShortcutsModal />
            </Suspense>
            <CookieConsent />
            <div className="flex flex-1 flex-col min-h-[calc(100vh-60px)]">
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
                  <Route path={siteConfig.routes.about} element={<AboutPage />} />
                  <Route path={siteConfig.routes.blog} element={<BlogListPage />} />
                  <Route path={siteConfig.routes.blogPost} element={<BlogPostPage />} />
                  <Route path={siteConfig.routes.features} element={<FeaturesListPage />} />
                  <Route path={siteConfig.routes.featureDetail} element={<FeatureDetailPage />} />
                  <Route path={siteConfig.routes.openSource} element={<OpenSourcePage />} />
                  <Route path={siteConfig.routes.contact} element={<ContactPage />} />
                  <Route path={siteConfig.routes.privacy} element={<PrivacyPage />} />
                  <Route path={siteConfig.routes.terms} element={<TermsPage />} />
                  <Route path={siteConfig.routes.changelog} element={<ChangelogPage />} />
                  <Route path={siteConfig.routes.testimonials} element={<TestimonialsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
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
