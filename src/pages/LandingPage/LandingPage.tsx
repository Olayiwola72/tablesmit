import { AlignJustify, Download, ExternalLink, Layers, Palette } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { siteConfig } from '../../config/siteConfig'

const features = [
  {
    icon: Palette,
    title: 'Custom Header Styling',
    body: 'Full control over header colors, fonts, and styles. Make your table reflect your document, not a generic template.',
  },
  {
    icon: AlignJustify,
    title: 'Precision Column Formatting',
    body: 'Set column types: text, number, currency, percentage, date. Your data formatted exactly as it should be.',
  },
  {
    icon: Download,
    title: 'Clean Export Options',
    body: 'PDF, PNG, JPEG, or Excel. Import from CSV or Excel. One click. No quality loss.',
  },
  {
    icon: Layers,
    title: 'Minimal Interface',
    body: 'No popups. No ads. No onboarding flows. Just the table and the controls you need.',
  },
]

export function LandingPage(): ReactNode {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-content px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
          Tables built for
          <br />
          analytical writing.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
          A minimalist table builder for analytical writing — with full control over headers, formatting, and export.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <Link to="/app">Start Building</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href={siteConfig.brand.githubUrl} target="_blank" rel="noreferrer">
              View on GitHub <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-narrow text-center">
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">What makes Structra different.</h2>
          <p className="mt-3 text-base text-text-secondary">
            Built around the things that actually matter when you're publishing structured content.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <article key={feature.title} className="rounded-md border border-border bg-white p-6">
                <Icon size={22} aria-hidden="true" className="mb-4 text-primary" />
                <h3 className="text-xl font-semibold text-text-primary">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{feature.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section id="open-source" className="bg-surface px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-2xl font-bold text-text-primary">Built in the open.</h2>
        <p className="mx-auto mt-4 max-w-narrow text-base leading-relaxed text-text-secondary">
          Structra is free and open source. The code is on GitHub — read it, fork it, improve it, or adapt it for your own needs.
          We believe tools for writing and thinking should be transparent.
        </p>
        <Button asChild variant="secondary" className="mt-6">
          <a href={siteConfig.brand.githubUrl} target="_blank" rel="noreferrer">
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
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Built for structured thinkers.</h2>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-text-secondary">
          <p>Structra was created by a writer who needed more control than basic table generators provided.</p>
          <p>Most tools gave too little — no header customization, no column formatting, no clean export. Others gave too much — the full weight of a spreadsheet for something that just needed to be a table.</p>
          <p>Structra is the middle ground. Built for people who think in structure and publish with precision.</p>
        </div>
      </div>
      <div className="rounded-md border border-border bg-surface p-6">
        <h3 className="text-sm font-semibold text-text-primary">What Structra Is Not</h3>
        <ul className="mt-4 space-y-2 text-sm text-text-muted">
          <li>Not a spreadsheet.</li>
          <li>Not a database.</li>
          <li>Not a Notion competitor.</li>
          <li>Not a design-heavy tool.</li>
          <li className="pt-3 font-medium text-text-secondary">We are a structured writing tool.</li>
        </ul>
      </div>
    </section>
  )
}

export default LandingPage
