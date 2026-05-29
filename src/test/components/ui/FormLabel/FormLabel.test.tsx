import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FormLabel } from '../../../../components/ui/FormLabel/FormLabel'

describe('FormLabel', () => {
  it('renders label text', () => {
    render(<FormLabel>Column width</FormLabel>)
    expect(screen.getByText('Column width')).toBeInTheDocument()
  })

  it('renders as a label element', () => {
    render(<FormLabel>Header color</FormLabel>)
    const label = screen.getByText('Header color')
    expect(label.tagName).toBe('LABEL')
  })

  it('has styling classes', () => {
    render(<FormLabel>Border style</FormLabel>)
    const label = screen.getByText('Border style')
    expect(label.className).toContain('text-sm')
    expect(label.className).toContain('font-medium')
    expect(label.className).toContain('text-text-primary')
  })

  it('sets htmlFor attribute', () => {
    render(<FormLabel htmlFor="my-input">Label text</FormLabel>)
    const label = screen.getByText('Label text')
    expect(label.getAttribute('for')).toBe('my-input')
  })

  it('accepts a custom className', () => {
    render(<FormLabel className="mt-2">Label</FormLabel>)
    const label = screen.getByText('Label')
    expect(label.className).toContain('mt-2')
  })
})
