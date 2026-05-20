import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AboutPage } from '../../../pages/AboutPage/AboutPage'

describe('AboutPage', () => {
  it('renders the analytical-writing hero copy', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Tables built for/i)).toBeInTheDocument()
    expect(screen.getByText(/analytical writing\./i)).toBeInTheDocument()
  })
})
