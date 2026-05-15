import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { PageLoader } from './components/ui/PageLoader'
import { TooltipProvider } from './components/ui/Tooltip'

const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'))
const TableMakerPage = lazy(() => import('./pages/TableMakerPage/TableMakerPage'))
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))

export default function App(): ReactNode {
  return (
    <BrowserRouter>
      <TooltipProvider delayDuration={250}>
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<TableMakerPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </TooltipProvider>
    </BrowserRouter>
  )
}
