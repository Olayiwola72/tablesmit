import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { NotFoundPage } from '../../../pages/NotFoundPage/NotFoundPage'

describe('NotFoundPage', () => {
  it('renders heading', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
  })

  it('renders body text', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )
    expect(screen.getByText(/That URL doesn't exist/i)).toBeInTheDocument()
  })

  it('renders back to home link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })

  it('renders NotFoundAnimation SVG', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
