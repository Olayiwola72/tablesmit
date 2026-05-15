import type { ReactNode } from 'react'

export function AboutPage(): ReactNode {
  return (
    <main className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <section className="max-w-narrow">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">Built for structured thinkers.</h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
          <p>Structra was created by a writer who needed more control than basic table generators provided.</p>
          <p>Most tools gave too little — no header customization, no column formatting, no clean export. Others gave too much — the full weight of a spreadsheet for something that just needed to be a table.</p>
          <p>Structra is the middle ground. Built for people who think in structure and publish with precision.</p>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
