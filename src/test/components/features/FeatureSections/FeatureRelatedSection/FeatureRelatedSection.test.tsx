import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { FeatureRelatedSection } from '../../../../../components/features/FeatureSections/FeatureRelatedSection/FeatureRelatedSection'

const baseFeatures = [
  { slug: 'pdf-export', heroHeadline: 'Export to PDF', heroSubtext: 'Generate PDF documents from your tables.' },
  { slug: 'csv-import', heroHeadline: 'Import CSV', heroSubtext: 'Load data from CSV files.' },
]

function renderSection(features = baseFeatures) {
  return render(
    <MemoryRouter>
      <FeatureRelatedSection relatedFeatures={features} />
    </MemoryRouter>,
  )
}

describe('FeatureRelatedSection', () => {
  it('renders related feature cards with headline and subtext', () => {
    renderSection()
    expect(screen.getByText('Export to PDF')).toBeInTheDocument()
    expect(screen.getByText('Generate PDF documents from your tables.')).toBeInTheDocument()
    expect(screen.getByText('Import CSV')).toBeInTheDocument()
    expect(screen.getByText('Load data from CSV files.')).toBeInTheDocument()
  })

  it('returns null when relatedFeatures array is empty', () => {
    const { container } = renderSection([])
    expect(container.innerHTML).toBe('')
  })

  it('renders the correct number of cards', () => {
    renderSection()
    const cards = screen.getAllByText(/Export to PDF|Import CSV/)
    expect(cards).toHaveLength(2)
  })

  it('links each card to the correct /features/:slug route', () => {
    renderSection()
    const link1 = screen.getByRole('link', { name: /export to pdf/i })
    expect(link1).toHaveAttribute('href', '/features/pdf-export/')

    const link2 = screen.getByRole('link', { name: /import csv/i })
    expect(link2).toHaveAttribute('href', '/features/csv-import/')
  })

  it('renders the section heading', () => {
    renderSection()
    expect(screen.getByText('features.relatedFeatures')).toBeInTheDocument()
  })

  it('renders a single related feature without error', () => {
    renderSection([{ slug: 'merge-cells', heroHeadline: 'Merge Cells', heroSubtext: 'Combine cells easily.' }])
    expect(screen.getByText('Merge Cells')).toBeInTheDocument()
    expect(screen.getByText('Combine cells easily.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /merge cells/i })).toHaveAttribute('href', '/features/merge-cells/')
  })
})
