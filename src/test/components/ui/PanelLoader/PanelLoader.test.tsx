import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PanelLoader } from '../../../../components/ui/PanelLoader/PanelLoader'

describe('PanelLoader', () => {
  it('renders a spinning indicator', () => {
    render(<PanelLoader />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('has the correct border classes', () => {
    render(<PanelLoader />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner?.className).toContain('border-border')
    expect(spinner?.className).toContain('border-t-primary')
  })

  it('renders within a centered container', () => {
    render(<PanelLoader />)
    const container = document.querySelector('.flex')
    expect(container?.className).toContain('items-center')
    expect(container?.className).toContain('justify-center')
  })
})
