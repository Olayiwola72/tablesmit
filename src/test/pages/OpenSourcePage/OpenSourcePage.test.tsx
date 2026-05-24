import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it } from 'vitest'
import { OpenSourcePage } from '../../../pages/OpenSourcePage/OpenSourcePage'

function renderPage(): void {
  render(
    <HelmetProvider>
      <OpenSourcePage />
    </HelmetProvider>,
  )
}

describe('OpenSourcePage', () => {
  it('renders heading', () => {
    renderPage()
    expect(screen.getByText(/Built in the open/i)).toBeInTheDocument()
  })

  it('renders view on GitHub button', () => {
    renderPage()
    const githubLinks = screen.getAllByRole('link', { name: /view on github/i })
    expect(githubLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('renders no sponsor cards when all are disabled', () => {
    renderPage()
    expect(screen.queryByText(/Sponsor monthly on GitHub/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/One-time contribution/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/For teams and organizations/i)).not.toBeInTheDocument()
  })

  it('renders contributors section', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /contributors/i })).toBeInTheDocument()
  })

  it('renders how to contribute section', () => {
    renderPage()
    expect(screen.getByText(/How to contribute/i)).toBeInTheDocument()
  })

  it('renders footer note', () => {
    renderPage()
    const notes = screen.getAllByText(/MIT licensed/i)
    expect(notes.length).toBeGreaterThanOrEqual(1)
  })

  it('sets correct document title', () => {
    renderPage()
    expect(document.title).toBe('Open Source — Tablesmit')
  })

  it('sets correct meta description', () => {
    renderPage()
    const meta = document.querySelector('meta[name="description"]')
    expect(meta).toHaveAttribute(
      'content',
      'Tablesmit is free and open source under the MIT license. Read the code, fork it, improve it, or adapt it for your own needs.',
    )
  })

  it('sets correct canonical URL', () => {
    renderPage()
    const link = document.querySelector('link[rel="canonical"]')
    expect(link).toHaveAttribute('href', 'https://tablesmit.com/open-source')
  })
})
