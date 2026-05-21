import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { FeatureCtaSection } from '../../../../../components/features/FeatureSections/FeatureCtaSection/FeatureCtaSection'

function renderSection() {
  return render(
    <MemoryRouter>
      <FeatureCtaSection />
    </MemoryRouter>,
  )
}

describe('FeatureCtaSection', () => {
  it('renders the CTA title text', () => {
    renderSection()
    expect(screen.getByText('Try Tablesmit for yourself — free, no signup required.')).toBeInTheDocument()
  })

  it('renders a link to open Tablesmit', () => {
    renderSection()
    const link = screen.getByRole('link', { name: /open tablesmit/i })
    expect(link).toBeInTheDocument()
  })

  it('links to the home page', () => {
    renderSection()
    const link = screen.getByRole('link', { name: /open tablesmit/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('applies the correct container classes', () => {
    renderSection()
    const link = screen.getByRole('link', { name: /open tablesmit/i })
    const container = link.closest('div')
    expect(container?.className).toContain('rounded-md')
    expect(container?.className).toContain('border-border')
    expect(container?.className).toContain('text-center')
  })
})
