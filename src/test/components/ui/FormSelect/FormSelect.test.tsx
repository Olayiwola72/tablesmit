import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FormSelect } from '../../../../components/ui/FormSelect/FormSelect'

describe('FormSelect', () => {
  const options = [
    { value: '', label: 'Select...' },
    { value: 'solid', label: 'Solid' },
    { value: 'dashed', label: 'Dashed' },
  ]

  it('renders a select element with options', () => {
    render(<FormSelect options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('Solid')).toBeInTheDocument()
    expect(screen.getByText('Dashed')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<FormSelect ref={ref} options={options} />)
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
  })

  it('passes value and onChange', () => {
    const onChange = () => {}
    render(<FormSelect options={options} value="solid" onChange={onChange} />)
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('solid')
  })

  it('accepts a custom className', () => {
    render(<FormSelect options={options} className="w-32" />)
    expect(screen.getByRole('combobox').className).toContain('w-32')
  })
})
