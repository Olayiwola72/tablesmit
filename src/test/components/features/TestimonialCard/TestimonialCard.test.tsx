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

function renderCard(testimonial: Testimonial): ReturnType<typeof render> {
  return render(<TestimonialCard testimonial={testimonial} />)
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

  it('renders name as a link when nameUrl is provided', () => {
    renderCard({ ...baseTestimonial, nameUrl: 'https://scholar.google.com/citations?user=test' })
    const link = screen.getByRole('link', { name: 'Jane Doe' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://scholar.google.com/citations?user=test')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer nofollow')
  })

  it('renders name as plain text when nameUrl is absent', () => {
    renderCard(baseTestimonial)
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Jane Doe' })).not.toBeInTheDocument()
  })

  it('renders star rating when rating is provided', () => {
    const { container } = renderCard({ ...baseTestimonial, rating: 5 })
    expect(container.querySelectorAll('.lucide-star')).toHaveLength(5)
  })

  it('renders correct rating count', () => {
    const { container } = renderCard({ ...baseTestimonial, rating: 3 })
    expect(container.querySelectorAll('.lucide-star')).toHaveLength(3)
  })

  it('does not render stars when rating is absent', () => {
    const { container } = renderCard(baseTestimonial)
    expect(container.querySelectorAll('.lucide-star')).toHaveLength(0)
  })

  it('sets aria-label on the star container', () => {
    renderCard({ ...baseTestimonial, rating: 4 })
    expect(screen.getByLabelText('4 out of 5 stars')).toBeInTheDocument()
  })
})
