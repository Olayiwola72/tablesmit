import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TestimonialEmptyState } from '../../../../components/features/TestimonialEmptyState/TestimonialEmptyState'

function renderEmptyState(): void {
  render(
    <MemoryRouter>
      <TestimonialEmptyState />
    </MemoryRouter>,
  )
}

describe('TestimonialEmptyState', () => {
  it('renders heading', () => {
    renderEmptyState()
    expect(screen.getByText('No testimonials yet')).toBeInTheDocument()
  })

  it('renders body text', () => {
    renderEmptyState()
    expect(screen.getByText(/We're collecting feedback/i)).toBeInTheDocument()
  })

  it('renders share experience link to contact page', () => {
    renderEmptyState()
    const link = screen.getByText(/Share your experience/i)
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/contact/')
  })

  it('renders Twitter link', () => {
    renderEmptyState()
    const twitterLink = screen.getByText(/@OlayiwolaAkinn1/i)
    expect(twitterLink).toBeInTheDocument()
    expect(twitterLink.closest('a')).toHaveAttribute('target', '_blank')
  })

  it('renders email link', () => {
    renderEmptyState()
    const emailLink = document.querySelector('a[href^="mailto:"]')
    expect(emailLink).toBeInTheDocument()
  })
})
