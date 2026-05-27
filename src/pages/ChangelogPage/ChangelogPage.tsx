import { Helmet } from 'react-helmet-async'
import type { ReactNode } from 'react'
import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import type { ChangelogEntry } from '../../config/changelog/changelog.types'
import { CHANGELOG, getChangeStyle } from '../../config/changelog/changelog'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { brand } from '../../config/brand/brandConfig'
import { routes } from '../../config/routes/routesConfig'

export function ChangelogPage(): ReactNode {
  const { t } = usePageTranslation()
  return (
    <>
      <Helmet>
        <title>{t('meta.changelogTitle')}</title>
        <meta name="description" content={t('meta.changelogDescription')} />
        <meta property="og:title" content={t('meta.changelogTitle')} />
        <meta property="og:description" content={t('meta.changelogDescription')} />
        <link rel="canonical" href={`${brand.url}${routes.changelog.path}`} />
      </Helmet>
      <main className="mx-auto max-w-narrow px-4 py-16">
        <Breadcrumb segments={[
          { label: t('nav.home'), to: routes.home.path },
          { label: t('nav.changelog') },
        ]} />
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

    </main>
    </>
  )
}

export default ChangelogPage
