import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Testimonial } from '../../../../config/testimonials/testimonials.types'
import { TestimonialCard } from '../../../../components/features/TestimonialCard/TestimonialCard'

const baseTestimonial: Testimonial = {
  id: 'test-1',
  name: 'Jane Doe',
  role: 'Data Analyst, Acme Corp',
  avatar: '',
  quote: 'This tool is fantastic for structuring data.',
}

function renderCard(testimonial: Testimonial): void {
  render(<TestimonialCard testimonial={testimonial} />)
}

describe('TestimonialCard', () => {
  it('renders quote', () => {
    renderCard(baseTestimonial)
    expect(screen.getByText(/This tool is fantastic/i)).toBeInTheDocument()
  })

  it('renders name', () => {
    renderCard(baseTestimonial)
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('renders role', () => {
    renderCard(baseTestimonial)
    expect(screen.getByText('Data Analyst, Acme Corp')).toBeInTheDocument()
  })

  it('renders initials from name', () => {
    renderCard(baseTestimonial)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders source link when source is provided', () => {
    renderCard({
      ...baseTestimonial,
      source: 'Twitter',
      sourceUrl: 'https://x.com/example',
    })
    expect(screen.getByText('on Twitter')).toBeInTheDocument()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://x.com/example')
  })

  it('does not render source link when source is absent', () => {
    renderCard(baseTestimonial)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
