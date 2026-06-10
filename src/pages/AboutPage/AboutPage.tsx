import { usePageTranslation } from '../../hooks/usePageTranslation/usePageTranslation'
import { ExternalLink } from 'lucide-react'
import { useCallback, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button/Button'
import { Breadcrumb } from '../../components/ui/Breadcrumb/Breadcrumb'
import { ContentPageLayout } from '../../components/ui/ContentPageLayout/ContentPageLayout'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner/LoadingSpinner'
import { brand } from '../../config/brand/brandConfig'
import { routes } from '../../config/routes/routesConfig'

function splitNotList(text: string): string[] {
  return text.split(/(?<=\.)\s+/).filter(Boolean)
}

export function AboutPage(): ReactNode {
  const { t } = usePageTranslation('about', 'table', 'home', 'openSource')
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const handleIframeLoad = useCallback(() => setIframeLoaded(true), [])
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
      <section className="mx-auto max-w-content px-4 pt-2 pb-8 text-center sm:px-6 sm:pt-3 sm:pb-12 lg:px-8 lg:pt-4 lg:pb-16">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
          {t('hero.headline')}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {t('hero.subtext')}
        </p>
        <div
          className="relative mx-auto w-full max-w-3xl"
          style={{ paddingBottom: '56.25%', height: 0 }}
        >
          {!iframeLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <LoadingSpinner size={48} />
            </div>
          )}
          <iframe
            src="https://demo.arcade.software/video/oaKoxtmk9r8dN2G2fp8B?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
            title="Tablesmit demo"
            className={`absolute left-0 top-0 h-full w-full transition-opacity duration-300 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
            frameBorder="0"
            loading="lazy"
            allow="clipboard-write"
            allowFullScreen
            onLoad={handleIframeLoad}
            style={{ colorScheme: 'light' }}
          />
        </div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
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

      <section id="open-source" className="bg-surface px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
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

      <section id="about" className="mx-auto grid max-w-content gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8">
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
