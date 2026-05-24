import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it } from 'vitest'
import { PrivacyPage } from '../../../pages/PrivacyPage/PrivacyPage'

function renderPage(): void {
  render(
    <HelmetProvider>
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>
    </HelmetProvider>,
  )
}

describe('PrivacyPage', () => {
  it('renders heading', () => {
    renderPage()
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument()
  })

  it('renders last updated line', () => {
    renderPage()
    expect(screen.getByText(/Last updated/i)).toBeInTheDocument()
  })

  it('renders what we collect section', () => {
    renderPage()
    expect(screen.getByText(/What we collect/i)).toBeInTheDocument()
  })

  it('renders what we do not collect section', () => {
    renderPage()
    expect(screen.getByText(/What we do not collect/i)).toBeInTheDocument()
  })

  it('renders file imports section', () => {
    renderPage()
    expect(screen.getByText(/File imports/i)).toBeInTheDocument()
  })

  it('renders contact section with email', () => {
    renderPage()
    expect(screen.getByText(/Contact/i)).toBeInTheDocument()
    expect(screen.getByText('hello@tablesmit.com')).toBeInTheDocument()
  })

  it('sets correct document title', () => {
    renderPage()
    expect(document.title).toBe('Privacy Policy — Tablesmit')
  })

  it('sets correct meta description', () => {
    renderPage()
    const meta = document.querySelector('meta[name="description"]')
    expect(meta).toHaveAttribute(
      'content',
      'Tablesmit Privacy Policy. We do not require an account and we do not store your table data on any server.',
    )
  })

  it('sets correct canonical URL', () => {
    renderPage()
    const link = document.querySelector('link[rel="canonical"]')
    expect(link).toHaveAttribute('href', 'https://tablesmit.com/privacy')
  })

  it('renders Back to Tablesmit link to home', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /back to tablesmit/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders cross-link to Terms of Use page', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /terms of use/i })
    expect(link).toHaveAttribute('href', '/terms')
  })
})
