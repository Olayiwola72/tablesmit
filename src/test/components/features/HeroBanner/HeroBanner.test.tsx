import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroBanner } from '../../../../components/features/HeroBanner/HeroBanner'

describe('HeroBanner', () => {
  it('renders the headline', () => {
    render(<HeroBanner />)
    expect(screen.getByText('Tables built for analytical writing.')).toBeInTheDocument()
  })

  it('renders the subtext', () => {
    render(<HeroBanner />)
    expect(
      screen.getByText(/A minimalist table builder for analytical writing/),
    ).toBeInTheDocument()
  })

  it('renders feature bullets', () => {
    render(<HeroBanner />)
    expect(screen.getByText('Custom headers')).toBeInTheDocument()
    expect(screen.getByText('Column types')).toBeInTheDocument()
    expect(screen.getByText('Merge cells')).toBeInTheDocument()
  })

  it('renders export format labels', () => {
    render(<HeroBanner />)
    expect(screen.getByText('PDF, PNG, JPEG, Excel, CSV, LaTeX')).toBeInTheDocument()
  })

  it('has data-print-hide attribute', () => {
    const { container } = render(<HeroBanner />)
    const section = container.querySelector('[data-print-hide]')
    expect(section).toBeInTheDocument()
  })

  it('renders aria-hidden decorative dots', () => {
    const { container } = render(<HeroBanner />)
    const dots = container.querySelectorAll('[aria-hidden="true"]')
    expect(dots.length).toBeGreaterThanOrEqual(4)
  })
})
