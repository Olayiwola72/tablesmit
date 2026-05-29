import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ToolbarSeparator } from '../../../../components/ui/ToolbarSeparator/ToolbarSeparator'

describe('ToolbarSeparator', () => {
  it('renders a thin vertical divider', () => {
    render(<ToolbarSeparator />)
    const divider = document.querySelector('.h-5')
    expect(divider).toBeInTheDocument()
    expect(divider?.className).toContain('w-px')
    expect(divider?.className).toContain('bg-border')
  })

  it('accepts a custom className', () => {
    render(<ToolbarSeparator className="hidden" />)
    const divider = document.querySelector('.h-5')
    expect(divider?.className).toContain('hidden')
  })
})
