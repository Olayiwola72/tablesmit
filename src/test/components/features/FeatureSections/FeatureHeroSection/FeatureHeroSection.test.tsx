import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FeatureHeroSection } from '../../../../../components/features/FeatureSections/FeatureHeroSection/FeatureHeroSection'

const baseProps = {
  heroHeadline: 'Export to Excel Online',
  heroSubtext: 'Convert your tables to Excel format with one click.',
}

describe('FeatureHeroSection', () => {
  it('renders the headline', () => {
    render(<FeatureHeroSection {...baseProps} />)
    expect(screen.getByText(baseProps.heroHeadline)).toBeInTheDocument()
  })

  it('renders the subtext', () => {
    render(<FeatureHeroSection {...baseProps} />)
    expect(screen.getByText(baseProps.heroSubtext)).toBeInTheDocument()
  })

  it('renders inside a header element', () => {
    render(<FeatureHeroSection {...baseProps} />)
    const heading = screen.getByText(baseProps.heroHeadline)
    const header = heading.closest('header')
    expect(header).not.toBeNull()
  })

  it('renders a different headline when props change', () => {
    render(<FeatureHeroSection heroHeadline="Import CSV" heroSubtext="Load data from CSV files." />)
    expect(screen.getByText('Import CSV')).toBeInTheDocument()
    expect(screen.getByText('Load data from CSV files.')).toBeInTheDocument()
  })
})
