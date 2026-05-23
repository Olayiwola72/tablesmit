import { Helmet } from 'react-helmet-async'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { ChangelogEntry } from '../../config/changelog/changelog.types'
import { CHANGELOG, getChangeStyle } from '../../config/changelog/changelog'
import { siteConfig } from '../../config/siteConfig'

export function ChangelogPage(): ReactNode {
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <title>{t('meta.changelogTitle')}</title>
        <meta name="description" content={t('meta.changelogDescription')} />
        <meta property="og:title" content={t('meta.changelogTitle')} />
        <meta property="og:description" content={t('meta.changelogDescription')} />
        <link rel="canonical" href={`${siteConfig.brand.url}${siteConfig.routes.changelog}`} />
      </Helmet>
      <main className="mx-auto max-w-narrow px-4 py-16">
      <h1 className="text-3xl font-bold text-text-primary">{t('nav.changelog')}</h1>
      <p className="mt-3 text-base text-text-secondary">
        {t('changelogDescription')}
      </p>
      <div className="mt-12 space-y-10">
        {CHANGELOG.map((entry) => (
          <article key={entry.version} className="border-b border-border pb-10 last:border-0">
            <div className="flex items-baseline gap-3">
              <h2 className="text-lg font-semibold text-text-primary">v{entry.version}</h2>
              <time className="text-sm text-text-muted">{entry.date}</time>
            </div>
            <ul className="mt-4 space-y-2">
              {entry.changes.map((change: ChangelogEntry['changes'][number], index) => {
                const style = getChangeStyle(change.type)
                return (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <span className={`mt-0.5 inline-flex shrink-0 rounded-sm px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                    <span className="text-text-secondary">{change.description}</span>
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to={siteConfig.routes.home}
          className="text-sm font-semibold text-primary hover:underline"
        >
          &larr; Back to Tablesmit
        </Link>
      </div>
    </main>
    </>
  )
}

export default ChangelogPage
