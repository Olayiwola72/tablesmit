import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { FeatureHeroSection } from '../../../../../components/features/FeatureSections/FeatureHeroSection/FeatureHeroSection'

const baseProps = {
  heroHeadline: 'Export to Excel Online',
  heroSubtext: 'Convert your tables to Excel format with one click.',
}

function renderSection(props = baseProps) {
  return render(
    <MemoryRouter>
      <FeatureHeroSection {...props} />
    </MemoryRouter>,
  )
}

describe('FeatureHeroSection', () => {
  it('renders the headline', () => {
    renderSection()
    expect(screen.getByText(baseProps.heroHeadline)).toBeInTheDocument()
  })

  it('renders the subtext', () => {
    renderSection()
    expect(screen.getByText(baseProps.heroSubtext)).toBeInTheDocument()
  })

  it('renders a back link to the features list page', () => {
    renderSection()
    const link = screen.getByRole('link', { name: /back to features/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/features/')
  })

  it('renders inside a header element', () => {
    renderSection()
    const heading = screen.getByText(baseProps.heroHeadline)
    const header = heading.closest('header')
    expect(header).not.toBeNull()
  })

  it('renders a different headline when props change', () => {
    renderSection({ heroHeadline: 'Import CSV', heroSubtext: 'Load data from CSV files.' })
    expect(screen.getByText('Import CSV')).toBeInTheDocument()
    expect(screen.getByText('Load data from CSV files.')).toBeInTheDocument()
  })
})
