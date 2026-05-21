import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FeatureStepsSection } from '../../../../../components/features/FeatureSections/FeatureStepsSection/FeatureStepsSection'

const baseSteps = [
  { number: 1, heading: 'Open the tool', body: 'Navigate to Tablesmit in your browser.' },
  { number: 2, heading: 'Build your table', body: 'Add rows, columns, and content.' },
  { number: 3, heading: 'Export', body: 'Download in your preferred format.' },
]

function renderSection(steps = baseSteps) {
  return render(<FeatureStepsSection steps={steps} />)
}

describe('FeatureStepsSection', () => {
  it('renders all step cards with number, heading, and body', () => {
    renderSection()
    expect(screen.getByText('Open the tool')).toBeInTheDocument()
    expect(screen.getByText('Navigate to Tablesmit in your browser.')).toBeInTheDocument()
    expect(screen.getByText('Build your table')).toBeInTheDocument()
    expect(screen.getByText('Add rows, columns, and content.')).toBeInTheDocument()
    expect(screen.getByText('Export')).toBeInTheDocument()
    expect(screen.getByText('Download in your preferred format.')).toBeInTheDocument()
  })

  it('returns null when steps array is empty', () => {
    const { container } = renderSection([])
    expect(container.innerHTML).toBe('')
  })

  it('renders the correct number of steps', () => {
    renderSection()
    const headings = screen.getAllByText(/Open the tool|Build your table|Export/)
    expect(headings).toHaveLength(3)
  })

  it('renders the step number in a badge', () => {
    renderSection()
    const badges = screen.getAllByText('1')
    expect(badges.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    renderSection()
    expect(screen.getByText('features.howItWorks')).toBeInTheDocument()
  })

  it('renders steps in the provided order', () => {
    renderSection()
    const allText = document.body.textContent ?? ''
    const idx1 = allText.indexOf('Open the tool')
    const idx2 = allText.indexOf('Build your table')
    const idx3 = allText.indexOf('Export')
    expect(idx1).toBeLessThan(idx2)
    expect(idx2).toBeLessThan(idx3)
  })
})
