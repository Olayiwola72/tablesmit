import { ExternalLink, GitFork, Heart } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../../components/ui/Button'
import { siteConfig } from '../../config/siteConfig'

export function OpenSourcePage(): ReactNode {
  return (
    <main>
      <section className="mx-auto max-w-content px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
          Built in the open.
        </h1>
        <p className="mx-auto mt-6 max-w-narrow text-base leading-relaxed text-text-secondary">
          Structra is free and open source. The code is on GitHub. Read it, fork it, improve it, or adapt it for your own needs. We believe tools for writing and thinking should be transparent.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="secondary" size="lg">
            <a href={siteConfig.brand.githubUrl} target="_blank" rel="noreferrer">
              <GitFork size={18} aria-hidden="true" /> View on GitHub <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
        <p className="mt-4 text-xs text-text-muted">MIT licensed. Contributions welcome.</p>
      </section>

      <section className="bg-surface px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-narrow text-center">
          <Heart size={28} aria-hidden="true" className="mx-auto text-accent" />
          <h2 className="mt-4 text-2xl font-bold text-text-primary">Support the project.</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Structra is maintained by a small team. If the tool helps you write better tables, consider sponsoring. It keeps the project sustainable and focused.
          </p>
          <Button asChild variant="primary" size="lg" className="mt-6">
            <a href={siteConfig.brand.githubUrl} target="_blank" rel="noreferrer">
              Sponsor on GitHub <Heart size={16} aria-hidden="true" />
            </a>
          </Button>
          <p className="mt-3 text-sm text-text-muted">One-time or recurring. Every contribution matters.</p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-narrow">
          <h2 className="text-2xl font-bold text-text-primary">How to contribute.</h2>
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Report issues.</h3>
              <p className="mt-2 text-base text-text-secondary leading-relaxed">
                Found a bug or have an idea? Open an issue on GitHub. Clear reproduction steps help us fix things faster.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Submit code.</h3>
              <p className="mt-2 text-base text-text-secondary leading-relaxed">
                PRs are welcome. Keep changes focused and tested. Read the contributing guide before starting.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Spread the word.</h3>
              <p className="mt-2 text-base text-text-secondary leading-relaxed">
                Share Structra with someone who needs a better table tool. Stars on GitHub help others find it too.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Button asChild variant="secondary" size="lg">
            <a href={siteConfig.brand.githubUrl} target="_blank" rel="noreferrer">
              <GitFork size={18} aria-hidden="true" /> View on GitHub <ExternalLink size={16} aria-hidden="true" />
            </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default OpenSourcePage
