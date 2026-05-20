import { ExternalLink, GitFork } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/Button'
import { siteConfig } from '../../config/siteConfig'

const { brand, sponsors } = siteConfig

export function OpenSourcePage(): ReactNode {
  const { t } = useTranslation()
  return (
    <main>
      <section className="mx-auto max-w-content px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
          {t('openSource.heading')}
        </h1>
        <p className="mx-auto mt-6 max-w-narrow text-base leading-relaxed text-text-secondary">
          {t('openSource.body')}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="secondary" size="lg">
            <a href={brand.githubUrl} target="_blank" rel="noreferrer">
              <GitFork size={18} aria-hidden="true" /> View on GitHub{' '}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
        <p className="mt-4 text-xs text-text-muted">MIT licensed. Contributions welcome.</p>
      </section>

      <section className="bg-surface px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-content">
          <h2 className="text-center text-2xl font-bold text-text-primary">{t('openSource.sponsorHeading')}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((sponsor) => (
              <article
                key={sponsor.id}
                className="flex flex-col rounded-md border border-border bg-white p-6"
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
                  <a href={sponsor.url} target="_blank" rel="noreferrer">
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
            <a href={`${brand.githubUrl}/graphs/contributors`} target="_blank" rel="noreferrer">
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
            <a href={brand.githubUrl} target="_blank" rel="noreferrer">
              <GitFork size={18} aria-hidden="true" /> {t('hero.viewGitHub')}{' '}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Button>
          <p className="mt-10 text-center text-xs text-text-muted">{t('openSource.footerNote')}</p>
        </div>
      </section>
    </main>
  )
}

export default OpenSourcePage
