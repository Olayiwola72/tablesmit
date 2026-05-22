import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it } from 'vitest'
import { ContactPage } from '../../../pages/ContactPage/ContactPage'

function renderPage(): void {
  render(
    <HelmetProvider>
      <ContactPage />
    </HelmetProvider>,
  )
}

describe('ContactPage', () => {
  it('renders heading', () => {
    renderPage()
    expect(screen.getByText(/Get in touch/i)).toBeInTheDocument()
  })

  it('renders email link', () => {
    renderPage()
    expect(screen.getByText('hello@tablesmit.com')).toBeInTheDocument()
  })

  it('renders send message button', () => {
    renderPage()
    expect(screen.getByRole('link', { name: /send message/i })).toBeInTheDocument()
  })

  it('renders all four reason cards', () => {
    renderPage()
    expect(screen.getByText(/Feature idea/i)).toBeInTheDocument()
    expect(screen.getByText(/Bug or glitch/i)).toBeInTheDocument()
    expect(screen.getByText(/Just saying hi/i)).toBeInTheDocument()
    expect(screen.getByText(/Something else/i)).toBeInTheDocument()
  })

  it('renders built with care section', () => {
    renderPage()
    expect(screen.getByText(/Built with care/i)).toBeInTheDocument()
  })
})
