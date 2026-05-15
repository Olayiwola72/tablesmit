import type { ReactNode } from 'react'

export function ContactPage(): ReactNode {
  return (
    <main className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <section className="max-w-narrow">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">Contact</h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Have a feature request or a workflow that needs sharper structure? Structra is built to evolve cleanly.
        </p>
      </section>
    </main>
  )
}

export default ContactPage
