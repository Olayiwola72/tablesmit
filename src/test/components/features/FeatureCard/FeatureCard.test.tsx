import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import type { FeaturePage } from '../../../../services/featureService/featureService.types'
import { FeatureCard } from '../../../../components/features/FeatureCard/FeatureCard'

function renderCard(feature: FeaturePage): void {
  render(
    <MemoryRouter>
      <FeatureCard feature={feature} />
    </MemoryRouter>,
  )
}

const baseFeature: FeaturePage = {
  slug: 'merge-cells',
  metaTitle: 'Merge Cells — Tablesmit',
  metaDescription: 'Merge and unmerge cells.',
  heroHeadline: 'Merge cells — the way Excel does it.',
  heroSubtext: 'Select any range, click Merge.',
  icon: 'LayoutGrid',
  benefits: [],
  steps: [],
  useCases: [],
  relatedFeatures: [],
}

describe('FeatureCard', () => {
  it('renders hero headine as title', () => {
    renderCard(baseFeature)
    expect(screen.getByText('Merge cells — the way Excel does it.')).toBeInTheDocument()
  })

  it('renders hero subtext as description', () => {
    renderCard(baseFeature)
    expect(screen.getByText('Select any range, click Merge.')).toBeInTheDocument()
  })

  it('renders learn more link', () => {
    renderCard(baseFeature)
    expect(screen.getByText((content) => content.startsWith('Learn more'))).toBeInTheDocument()
  })

  it('links to the correct feature slug', () => {
    renderCard(baseFeature)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/features/merge-cells/')
  })

  it('does not render featured badge', () => {
    renderCard(baseFeature)
    expect(screen.queryByText(/featured/i)).not.toBeInTheDocument()
  })

  it('does not render date', () => {
    renderCard(baseFeature)
    expect(screen.queryByRole('time')).not.toBeInTheDocument()
  })
})
