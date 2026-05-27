import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button/Button'
import { NotFoundAnimation } from '../../components/ui/NotFoundAnimation/NotFoundAnimation'
import { routes } from '../../config/routes/routesConfig'

export function NotFoundPage(): ReactNode {
  const { t } = usePageTranslation('notFound')
  return (
    <>
      <Helmet>
        <title>{t('meta.notFoundTitle')}</title>
        <meta name="description" content={t('meta.notFoundDescription')} />
      </Helmet>
      <main className="mx-auto flex min-h-[60vh] max-w-content flex-col items-center justify-center px-4 text-center">
      <NotFoundAnimation />
      <h1 className="text-3xl font-bold text-text-primary">{t('notFound.heading')}</h1>
      <p className="mt-3 text-base text-text-secondary">
        {t('notFound.body')}
      </p>
      <Button asChild className="mt-6">
        <Link to={routes.home.path}>
          <ArrowLeft size={16} aria-hidden="true" /> {t('notFound.cta')}
        </Link>
      </Button>
    </main>
    </>
  )
}

export default NotFoundPage
