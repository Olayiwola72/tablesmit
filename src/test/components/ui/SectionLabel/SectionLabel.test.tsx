import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SectionLabel } from '../../../../components/ui/SectionLabel/SectionLabel'

describe('SectionLabel', () => {
  it('renders children', () => {
    render(<SectionLabel>Table Dimensions</SectionLabel>)
    expect(screen.getByText('Table Dimensions')).toBeInTheDocument()
  })

  it('renders as an h2 element', () => {
    render(<SectionLabel>Heading</SectionLabel>)
    const heading = screen.getByText('Heading')
    expect(heading.tagName).toBe('H2')
  })

  it('has the correct style classes', () => {
    render(<SectionLabel>Label</SectionLabel>)
    const heading = screen.getByText('Label')
    expect(heading.className).toContain('text-xs')
    expect(heading.className).toContain('font-semibold')
    expect(heading.className).toContain('uppercase')
    expect(heading.className).toContain('tracking-widest')
  })
})
