import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { describe, it, expect } from 'vitest'
import { ChangelogPage } from '../../../pages/ChangelogPage/ChangelogPage'
import type { ChangelogEntry } from '../../../config/changelog/changelog.types'
import { CHANGELOG, getChangeStyle } from '../../../config/changelog/changelog'

function renderPage(): void {
  render(
    <HelmetProvider>
      <ChangelogPage />
    </HelmetProvider>,
  )
}

describe('ChangelogPage', () => {
  it('renders the page heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /changelog/i })).toBeInTheDocument()
  })

  it('renders a heading for every version entry', () => {
    renderPage()
    for (const entry of CHANGELOG) {
      expect(screen.getByRole('heading', { name: `v${entry.version}` })).toBeInTheDocument()
    }
  })

  it('renders the date for every version entry', () => {
    renderPage()
    const dates = CHANGELOG.map((e) => e.date)
    for (const date of [...new Set(dates)]) {
      const matches = screen.getAllByText(date)
      const expectedCount = dates.filter((d) => d === date).length
      expect(matches.length).toBeGreaterThanOrEqual(expectedCount)
    }
  })

  it('renders every change description', () => {
    renderPage()
    for (const entry of CHANGELOG) {
      for (const change of entry.changes) {
        expect(screen.getByText(change.description)).toBeInTheDocument()
      }
    }
  })

  it('renders entries newest first', () => {
    const dates = CHANGELOG.map((e) => new Date(e.date).getTime())
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i]).toBeLessThanOrEqual(dates[i - 1])
    }
  })

  it('getChangeStyle returns correct styles for every type', () => {
    const types: Array<ChangelogEntry['changes'][number]['type']> = ['added', 'fixed', 'improved', 'removed']
    for (const t of types) {
      const style = getChangeStyle(t)
      expect(style.label).toBeTruthy()
      expect(style.bg).toMatch(/^bg-/)
      expect(style.text).toMatch(/^text-/)
    }
  })
})
