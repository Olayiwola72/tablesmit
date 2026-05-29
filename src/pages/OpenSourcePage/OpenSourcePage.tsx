import { ExternalLink, GitFork } from 'lucide-react'
import type { ReactNode } from 'react'
import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import { Button } from '../../components/ui/Button/Button'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { ContentPageLayout } from '../../components/ui/ContentPageLayout/ContentPageLayout'
import { brand } from '../../config/brand/brandConfig'
import { routes } from '../../config/routes/routesConfig'
import { sponsors } from '../../config/sponsors/sponsorsConfig'

export function OpenSourcePage(): ReactNode {
  const { t } = usePageTranslation('openSource', 'home')
  return (
    <ContentPageLayout metaKey="openSource" routeKey="openSource">
      <div className="mx-auto max-w-content px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb segments={[
          { label: t('nav.home'), to: routes.home.path },
          { label: t('nav.openSource') },
        ]} />
      </div>
      <section className="mx-auto max-w-content px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
          {t('openSource.heading')}
        </h1>
        <p className="mx-auto mt-6 max-w-narrow text-base leading-relaxed text-text-secondary">
          {t('openSource.body')}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="secondary" size="lg">
            <a href={brand.githubUrl} target="_blank" rel="noopener noreferrer">
              <GitFork size={18} aria-hidden="true" /> {t('hero.viewGitHub')}{' '}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
        <p className="mt-4 text-xs text-text-muted">{t('openSource.ctaNote')}</p>
      </section>

      <section className="bg-surface px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-content">
          <h2 className="text-center text-2xl font-bold text-text-primary">{t('openSource.sponsorHeading')}</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {sponsors.filter((s) => s.enabled).map((sponsor) => (
              <article
                key={sponsor.id}
                className="flex w-full max-w-sm flex-col rounded-md border border-border bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-text-primary">{sponsor.label}</h3>
                <p className="mt-2 flex-1 text-sm text-text-secondary">
                  {sponsor.id === 'github'
                    ? t('openSource.sponsorGitHub')
                    : sponsor.id === 'bmac'
                      ? t('openSource.sponsorCoffee')
                      : t('openSource.sponsorCollective')}
                </p>
                <Button asChild variant="secondary" size="sm" className="mt-6">
                  <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                    {sponsor.cta} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-narrow text-center">
          <h2 className="text-2xl font-bold text-text-primary">{t('openSource.contributorsHeading')}</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {t('openSource.contributorsBody')}
          </p>
          <Button asChild variant="secondary" className="mt-6">
            <a href={`${brand.githubUrl}/graphs/contributors`} target="_blank" rel="noopener noreferrer">
              {t('openSource.viewContributors')} <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-narrow">
          <h2 className="text-2xl font-bold text-text-primary">{t('openSource.contributeHeading')}</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {t('openSource.contributeBody')}
          </p>
          <Button asChild variant="secondary" size="lg" className="mt-8">
            <a href={brand.githubUrl} target="_blank" rel="noopener noreferrer">
              <GitFork size={18} aria-hidden="true" /> {t('hero.viewGitHub')}{' '}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Button>
          <p className="mt-10 text-center text-xs text-text-muted">{t('openSource.footerNote')}</p>
        </div>
      </section>
    </ContentPageLayout>
  )
}

export default OpenSourcePage
