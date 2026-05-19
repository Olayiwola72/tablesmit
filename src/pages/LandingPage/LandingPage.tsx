import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { siteConfig } from '../../config/siteConfig'

const { brand, copy, routes } = siteConfig

export function LandingPage(): ReactNode {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-content px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
          {copy.heroHeadlineLine1}
          <br />
          {copy.heroHeadlineLine2}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {copy.heroSubtext}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <Link to={routes.home}>Create a Table</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href={brand.githubUrl} target="_blank" rel="noreferrer">
              View on GitHub <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>

      <section id="open-source" className="bg-surface px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-2xl font-bold text-text-primary">{copy.openSourceHeading}</h2>
        <p className="mx-auto mt-4 max-w-narrow text-base leading-relaxed text-text-secondary">
          {copy.openSourceBody}
        </p>
        <Button asChild variant="secondary" className="mt-6">
          <a href={brand.githubUrl} target="_blank" rel="noreferrer">
            View on GitHub <ExternalLink size={16} aria-hidden="true" />
          </a>
        </Button>
        <p className="mt-4 text-xs text-text-muted">MIT licensed. Contributions welcome.</p>
      </section>

      <AboutSection />
    </main>
  )
}

function AboutSection(): ReactNode {
  return (
    <section id="about" className="mx-auto grid max-w-content gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">{copy.aboutHeading}</h2>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-text-secondary">
          <p>{copy.aboutOrigin}</p>
          <p>{copy.aboutTooLittle}</p>
          <p>{copy.aboutMiddleGround}</p>
        </div>
      </div>
      <div className="rounded-md border border-border bg-surface p-6">
        <h3 className="text-sm font-semibold text-text-primary">{copy.whatWeAreNotHeading}</h3>
        <ul className="mt-4 space-y-2 text-sm text-text-muted">
          {copy.whatWeAreNot.map((item) => (
            <li key={item}>{item}</li>
          ))}
          <li className="pt-3 font-medium text-text-secondary">{copy.positioningClosing}</li>
        </ul>
      </div>
    </section>
  )
}

export default LandingPage
