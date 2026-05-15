import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LandingPage } from './LandingPage'

describe('LandingPage', () => {
  it('renders the analytical-writing hero copy', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Tables built for/i)).toBeInTheDocument()
    expect(screen.getByText(/analytical writing\./i)).toBeInTheDocument()
  })
})
