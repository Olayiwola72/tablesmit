import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it } from 'vitest'
import { TermsPage } from '../../../pages/TermsPage/TermsPage'

function renderPage(): void {
  render(
    <HelmetProvider>
      <MemoryRouter>
        <TermsPage />
      </MemoryRouter>
    </HelmetProvider>,
  )
}

describe('TermsPage', () => {
  it('renders heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /Terms of Use/i, level: 1 })).toBeInTheDocument()
  })

  it('renders last updated line', () => {
    renderPage()
    expect(screen.getByText(/Last updated/i)).toBeInTheDocument()
  })

  it('renders the service section', () => {
    renderPage()
    expect(screen.getByText(/The service/i)).toBeInTheDocument()
  })

  it('renders your content section', () => {
    renderPage()
    expect(screen.getByText(/Your content/i)).toBeInTheDocument()
  })

  it('renders open source section', () => {
    renderPage()
    expect(screen.getByText(/Open source/i)).toBeInTheDocument()
  })

  it('renders contact email', () => {
    renderPage()
    expect(screen.getByText('hello@tablesmit.com')).toBeInTheDocument()
  })

  it('sets correct document title', () => {
    renderPage()
    expect(document.title).toBe('Terms of Use — Tablesmit')
  })

  it('sets correct meta description', () => {
    renderPage()
    const meta = document.querySelector('meta[name="description"]')
    expect(meta).toHaveAttribute(
      'content',
      'Tablesmit Terms of Use — your rights, our responsibilities. Covers open source licensing, data privacy, acceptable use, and liability limitations for the free online table builder.',
    )
  })

  it('sets correct canonical URL', () => {
    renderPage()
    const link = document.querySelector('link[rel="canonical"]')
    expect(link).toHaveAttribute('href', 'https://tablesmit.com/terms/')
  })

  it('renders breadcrumb home link', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /^home$/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders cross-link to Privacy Policy page', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /privacy policy/i })
    expect(link).toHaveAttribute('href', '/privacy/')
  })
})
