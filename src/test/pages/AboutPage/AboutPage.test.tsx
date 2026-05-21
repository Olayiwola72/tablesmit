import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AboutPage } from '../../../pages/AboutPage/AboutPage'

describe('AboutPage', () => {
  it('renders hero headline', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Tables built for/i)).toBeInTheDocument()
  })

  it('renders Create a Table link to home', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /create a table/i })).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    )
    const links = screen.getAllByRole('link', { name: /github/i })
    expect(links.length).toBeGreaterThanOrEqual(1)
  })

  it('renders open source section', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Built in the open/i)).toBeInTheDocument()
  })

  it('renders about heading', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Built for structured thinkers/i)).toBeInTheDocument()
  })

  it('renders what-we-are-not list', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    )
    expect(screen.getByText(/not a spreadsheet/i)).toBeInTheDocument()
  })
})
