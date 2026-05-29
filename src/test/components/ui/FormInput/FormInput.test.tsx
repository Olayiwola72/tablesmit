import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FormInput } from '../../../../components/ui/FormInput/FormInput'

describe('FormInput', () => {
  it('renders an input element', () => {
    render(<FormInput />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('passes placeholder text', () => {
    render(<FormInput placeholder="Enter value" />)
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<FormInput ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('accepts a custom className', () => {
    render(<FormInput className="w-32" />)
    expect(screen.getByRole('textbox').className).toContain('w-32')
  })
})
