import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it } from 'vitest'
import { AboutPage } from '../../../pages/AboutPage/AboutPage'

function renderPage(): void {
  render(
    <HelmetProvider>
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    </HelmetProvider>,
  )
}

describe('AboutPage', () => {
  it('renders hero headline', () => {
    renderPage()
    expect(screen.getByText(/Tables built for/i)).toBeInTheDocument()
  })

  it('renders Create a Table link to home', () => {
    renderPage()
    expect(screen.getByRole('link', { name: /create a table/i })).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    renderPage()
    const links = screen.getAllByRole('link', { name: /github/i })
    expect(links.length).toBeGreaterThanOrEqual(1)
  })

  it('renders open source section', () => {
    renderPage()
    expect(screen.getByText(/Built in the open/i)).toBeInTheDocument()
  })

  it('renders about heading', () => {
    renderPage()
    expect(screen.getByText(/Built for structured thinkers/i)).toBeInTheDocument()
  })

  it('renders what-we-are-not list', () => {
    renderPage()
    expect(screen.getByText(/not a spreadsheet/i)).toBeInTheDocument()
  })
})
