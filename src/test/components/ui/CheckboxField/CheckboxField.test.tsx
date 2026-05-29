import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CheckboxField } from '../../../../components/ui/CheckboxField/CheckboxField'

describe('CheckboxField', () => {
  it('renders a checkbox with label', () => {
    render(<CheckboxField label="Freeze header row" />)
    expect(screen.getByText('Freeze header row')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('checkbox is unchecked by default', () => {
    render(<CheckboxField label="Freeze first column" />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('checkbox can be checked', () => {
    render(<CheckboxField label="Freeze row" checked readOnly />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('forwards id to checkbox and label', () => {
    render(<CheckboxField label="Freeze" id="freeze-row" />)
    expect(screen.getByRole('checkbox').getAttribute('id')).toBe('freeze-row')
  })

  it('accepts a custom className', () => {
    render(<CheckboxField label="Freeze" className="mt-2" />)
    const label = screen.getByText('Freeze').closest('label')
    expect(label?.className).toContain('mt-2')
  })
})
