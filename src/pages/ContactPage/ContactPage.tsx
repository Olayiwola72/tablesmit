import { Heart, Lightbulb, MessageCircle, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/Button/Button'
import { siteConfig } from '../../config/siteConfig'

const { brand } = siteConfig

export function ContactPage(): ReactNode {
  const { t } = useTranslation()

  const reasons = [
    {
      icon: <Lightbulb size={18} aria-hidden="true" />,
      title: t('contact.featureIdea'),
      description: t('contact.featureIdeaDesc'),
    },
    {
      icon: <MessageCircle size={18} aria-hidden="true" />,
      title: t('contact.bugGlitch'),
      description: t('contact.bugGlitchDesc'),
    },
    {
      icon: <Heart size={18} aria-hidden="true" />,
      title: t('contact.justSayingHi'),
      description: t('contact.body'),
    },
    {
      icon: <Sparkles size={18} aria-hidden="true" />,
      title: t('contact.somethingElse'),
      description: t('contact.somethingElseDesc'),
    },
  ]

  return (
    <main className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <section className="mx-auto max-w-narrow text-center">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">{t('contact.heading')}</h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          {t('contact.body')}
        </p>

        <div className="mx-auto mt-10 inline-flex items-center gap-3 rounded-md border border-border bg-surface px-6 py-4">
          <span className="text-sm text-text-muted">{t('contact.orEmail')}</span>
          <a
            href={`mailto:${brand.contactEmail}`}
            className="text-base font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            {brand.contactEmail}
          </a>
          <Button variant="primary" size="sm" asChild>
            <a href={`mailto:${brand.contactEmail}`}>{t('contact.sendButton')}</a>
          </Button>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-2xl">
        <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-text-muted">
          {t('contact.whatToReachOutAbout')}
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
        <p className="text-sm font-medium text-text-primary">{t('contact.builtWithCare')}</p>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{t('contact.body')}</p>
      </section>
    </main>
  )
}

export default ContactPage
