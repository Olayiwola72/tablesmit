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

  it('renders sponsor cards', () => {
    renderPage()
    expect(screen.getByText(/Sponsor monthly on GitHub/i)).toBeInTheDocument()
    expect(screen.getByText(/One-time contribution/i)).toBeInTheDocument()
    expect(screen.getByText(/For teams and organizations/i)).toBeInTheDocument()
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
})
