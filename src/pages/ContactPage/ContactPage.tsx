import { Heart, Lightbulb, MessageCircle, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../../components/ui/Button'
import { siteConfig } from '../../config/siteConfig'

const { brand, copy } = siteConfig

const reasons = [
  {
    icon: <Lightbulb size={18} aria-hidden="true" />,
    title: 'Feature idea',
    description: 'Something missing that would make your workflow cleaner? Tell me.',
  },
  {
    icon: <MessageCircle size={18} aria-hidden="true" />,
    title: 'Bug or glitch',
    description: 'Something not working right? I will take a look and fix it.',
  },
  {
    icon: <Heart size={18} aria-hidden="true" />,
    title: 'Just saying hi',
    description: copy.contactHiReason,
  },
  {
    icon: <Sparkles size={18} aria-hidden="true" />,
    title: 'Something else',
    description: 'Anything on your mind. I read every message.',
  },
]

export function ContactPage(): ReactNode {
  return (
    <main className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <section className="mx-auto max-w-narrow text-center">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">I would love to hear from you.</h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          {copy.contactIntro} {copy.contactCommunity}
        </p>

        <div className="mx-auto mt-10 inline-flex items-center gap-3 rounded-md border border-border bg-surface px-6 py-4">
          <span className="text-sm text-text-muted">Reach out at</span>
          <a
            href={`mailto:${brand.contactEmail}`}
            className="text-base font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            {brand.contactEmail}
          </a>
          <Button variant="primary" size="sm" asChild>
            <a href={`mailto:${brand.contactEmail}`}>Send an email</a>
          </Button>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-2xl">
        <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-text-muted">
          What to reach out about
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {reasons.map((item) => (
            <div key={item.title} className="rounded-md border border-border bg-white p-5">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-sm bg-primary-light text-primary">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-narrow rounded-md border border-border bg-surface p-8 text-center sm:p-10">
        <p className="text-sm font-medium text-text-primary">Built with care, maintained with gratitude.</p>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{copy.contactThanks}</p>
      </section>
    </main>
  )
}

export default ContactPage
