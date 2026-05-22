import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it } from 'vitest'
import { TermsPage } from '../../../pages/TermsPage/TermsPage'

function renderPage(): void {
  render(
    <HelmetProvider>
      <TermsPage />
    </HelmetProvider>,
  )
}

describe('TermsPage', () => {
  it('renders heading', () => {
    renderPage()
    expect(screen.getByText(/Terms of Use/i)).toBeInTheDocument()
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
})
