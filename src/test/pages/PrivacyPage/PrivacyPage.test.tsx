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
})
