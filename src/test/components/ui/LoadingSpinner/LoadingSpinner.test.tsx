import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders a spinning indicator', () => {
    render(<LoadingSpinner />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('has correct border classes', () => {
    render(<LoadingSpinner />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner?.className).toContain('border-border')
    expect(spinner?.className).toContain('border-t-primary')
  })

  it('has role status and aria-live polite', () => {
    render(<LoadingSpinner />)
    expect(document.querySelector('[role="status"]')).toBeInTheDocument()
    expect(document.querySelector('[aria-live="polite"]')).toBeInTheDocument()
  })

  it('accepts a custom size', () => {
    render(<LoadingSpinner size={32} />)
    const spinner = document.querySelector('.animate-spin') as HTMLElement
    expect(spinner?.style.width).toBe('32px')
    expect(spinner?.style.height).toBe('32px')
  })

  it('accepts a custom className', () => {
    render(<LoadingSpinner className="my-custom-class" />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner?.className).toContain('my-custom-class')
  })
})
