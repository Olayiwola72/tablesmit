import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PastingOverlay } from '../../../../../components/features/TableGrid/PastingOverlay/PastingOverlay'

describe('PastingOverlay', () => {
  it('returns null when pasting is false', () => {
    const { container } = render(<PastingOverlay pasting={false} />)
    expect(container.innerHTML).toBe('')
  })

  it('renders the overlay when pasting is true', () => {
    render(<PastingOverlay pasting={true} />)
    expect(screen.getByLabelText('Pasting table data')).toBeInTheDocument()
  })

  it('renders a spinning loader icon', () => {
    render(<PastingOverlay pasting={true} />)
    const spinner = screen.getByLabelText('Pasting table data')
    expect(spinner).toBeInTheDocument()
    expect(spinner.getAttribute('class')).toContain('animate-spin')
  })

  it('renders inside a flex centred container', () => {
    render(<PastingOverlay pasting={true} />)
    const overlay = screen.getByLabelText('Pasting table data').parentElement
    expect(overlay?.className).toContain('flex')
    expect(overlay?.className).toContain('items-center')
    expect(overlay?.className).toContain('justify-center')
  })

  it('overlay has pointer-events-none to allow interaction underneath', () => {
    render(<PastingOverlay pasting={true} />)
    const overlay = screen.getByLabelText('Pasting table data').parentElement
    expect(overlay?.className).toContain('pointer-events-none')
  })
})
