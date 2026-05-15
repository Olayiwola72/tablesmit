import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { NotFoundAnimation } from '../../components/ui/NotFoundAnimation/NotFoundAnimation'
import { siteConfig } from '../../config/siteConfig'

export function NotFoundPage(): ReactNode {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-content flex-col items-center justify-center px-4 text-center">
      <NotFoundAnimation />
      <h1 className="text-3xl font-bold text-text-primary">Page not found.</h1>
      <p className="mt-3 text-base text-text-secondary">That URL doesn't exist. Let's get you back to building.</p>
      <Button asChild className="mt-6">
        <Link to={siteConfig.routes.home}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to Home
        </Link>
      </Button>
    </main>
  )
}

export default NotFoundPage
