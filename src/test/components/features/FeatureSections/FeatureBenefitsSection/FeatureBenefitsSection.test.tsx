import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FeatureBenefitsSection } from '../../../../../components/features/FeatureSections/FeatureBenefitsSection/FeatureBenefitsSection'

const baseBenefits = [
  { heading: 'Fast export', body: 'Export large tables in seconds.' },
  { heading: 'Format preservation', body: 'Keep your formatting intact.' },
]

function renderSection(benefits = baseBenefits) {
  return render(<FeatureBenefitsSection benefits={benefits} />)
}

describe('FeatureBenefitsSection', () => {
  it('renders benefit cards with heading and body', () => {
    renderSection()
    expect(screen.getByText('Fast export')).toBeInTheDocument()
    expect(screen.getByText('Export large tables in seconds.')).toBeInTheDocument()
    expect(screen.getByText('Format preservation')).toBeInTheDocument()
    expect(screen.getByText('Keep your formatting intact.')).toBeInTheDocument()
  })

  it('returns null when benefits array is empty', () => {
    const { container } = renderSection([])
    expect(container.innerHTML).toBe('')
  })

  it('renders the correct number of benefit cards', () => {
    renderSection()
    const cards = screen.getAllByText(/Fast export|Format preservation/)
    expect(cards).toHaveLength(2)
  })

  it('renders a single benefit when only one is provided', () => {
    renderSection([{ heading: 'Single', body: 'Only one benefit.' }])
    expect(screen.getByText('Single')).toBeInTheDocument()
    expect(screen.getByText('Only one benefit.')).toBeInTheDocument()
  })

  it('renders the section heading text', () => {
    renderSection()
    expect(screen.getByText('features.benefits')).toBeInTheDocument()
  })
})
