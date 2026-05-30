import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button/Button'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { ContentPageLayout } from '../../components/ui/ContentPageLayout/ContentPageLayout'
import { brand } from '../../config/brand/brandConfig'
import { routes } from '../../config/routes/routesConfig'

function splitNotList(text: string): string[] {
  return text.split(/(?<=\.)\s+/).filter(Boolean)
}

export function AboutPage(): ReactNode {
  const { t } = usePageTranslation('about', 'table', 'home', 'openSource')
  const lines = splitNotList(t('about.whatWeAreNot'))
  const pageTitle = t('meta.aboutTitle')
  const pageDescription = t('meta.aboutDescription')
  const pageUrl = `${brand.url}${routes.about.path}`

  return (
    <ContentPageLayout
      metaKey="about"
      routeKey="about"
      metaChildren={
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: pageTitle,
          description: pageDescription,
          url: pageUrl,
        })}</script>
      }
    >
      <div className="mx-auto max-w-content px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb segments={[
          { label: t('nav.home'), to: routes.home.path },
          { label: t('nav.about') },
        ]} />
      </div>
      <section className="mx-auto max-w-content px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
          {t('hero.headline')}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {t('hero.subtext')}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <Link to={routes.home.path} state={{ freshTable: true }}>{t('table.cta')}</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href={brand.githubUrl} target="_blank" rel="noopener noreferrer">
              {t('hero.viewGitHub')} <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>

      <section id="open-source" className="bg-surface px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-2xl font-bold text-text-primary">{t('openSource.heading')}</h2>
        <p className="mx-auto mt-4 max-w-narrow text-base leading-relaxed text-text-secondary">
          {t('openSource.body')}
        </p>
        <Button asChild variant="secondary" className="mt-6">
          <a href={brand.githubUrl} target="_blank" rel="noopener noreferrer">
            {t('hero.viewGitHub')} <ExternalLink size={16} aria-hidden="true" />
          </a>
        </Button>
        <p className="mt-4 text-xs text-text-muted">{t('openSource.ctaNote')}</p>
      </section>

      <section id="about" className="mx-auto grid max-w-content gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">{t('about.heading')}</h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-text-secondary">
            <p>{t('about.body')}</p>
          </div>
        </div>
        <div className="rounded-md border border-border bg-surface p-6">
          <div className="space-y-2">
            {lines.map((line) => (
              <p key={line} className="text-sm font-medium text-text-muted">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>
    </ContentPageLayout>
  )
}

export default AboutPage
