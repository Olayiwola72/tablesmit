import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FeatureUseCasesSection } from '../../../../../components/features/FeatureSections/FeatureUseCasesSection/FeatureUseCasesSection'

const baseUseCases = [
  'Generating reports for stakeholders',
  'Cleaning and organising research data',
  'Creating comparison tables for blog posts',
]

function renderSection(useCases = baseUseCases) {
  return render(<FeatureUseCasesSection useCases={useCases} />)
}

describe('FeatureUseCasesSection', () => {
  it('renders use cases as list items', () => {
    renderSection()
    expect(screen.getByText('Generating reports for stakeholders')).toBeInTheDocument()
    expect(screen.getByText('Cleaning and organising research data')).toBeInTheDocument()
    expect(screen.getByText('Creating comparison tables for blog posts')).toBeInTheDocument()
  })

  it('returns null when useCases array is empty', () => {
    const { container } = renderSection([])
    expect(container.innerHTML).toBe('')
  })

  it('renders the correct number of use cases', () => {
    renderSection()
    const items = screen.getAllByText(/reports|research|comparison/)
    expect(items).toHaveLength(3)
  })

  it('renders the section heading', () => {
    renderSection()
    expect(screen.getByText('features.useCases')).toBeInTheDocument()
  })

  it('renders a single use case without error', () => {
    renderSection(['Backup your data regularly'])
    expect(screen.getByText('Backup your data regularly')).toBeInTheDocument()
  })
})
