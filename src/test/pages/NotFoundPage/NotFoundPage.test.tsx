import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it } from 'vitest'
import { NotFoundPage } from '../../../pages/NotFoundPage/NotFoundPage'

function renderPage(): void {
  render(
    <HelmetProvider>
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    </HelmetProvider>,
  )
}

describe('NotFoundPage', () => {
  it('renders heading', () => {
    renderPage()
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
  })

  it('renders body text', () => {
    renderPage()
    expect(screen.getByText(/That URL doesn't exist/i)).toBeInTheDocument()
  })

  it('renders back to home link', () => {
    renderPage()
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })

  it('renders NotFoundAnimation SVG', () => {
    renderPage()
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
