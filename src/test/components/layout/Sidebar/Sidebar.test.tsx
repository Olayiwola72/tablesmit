import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Sidebar } from '../../../../components/layout/Sidebar/Sidebar'

describe('Sidebar', () => {
  it('renders children', () => {
    render(<Sidebar side="left"><p>Content</p></Sidebar>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders as an aside element', () => {
    render(<Sidebar side="left">Test</Sidebar>)
    expect(screen.getByText('Test').tagName).toBe('ASIDE')
  })

  it('applies left sidebar classes when side is left', () => {
    render(<Sidebar side="left">Left</Sidebar>)
    const aside = screen.getByText('Left')
    expect(aside.className).toContain('w-sidebar-left')
    expect(aside.className).toContain('border-r')
  })

  it('applies right sidebar classes when side is right', () => {
    render(<Sidebar side="right">Right</Sidebar>)
    const aside = screen.getByText('Right')
    expect(aside.className).toContain('w-sidebar-right')
    expect(aside.className).toContain('border-l')
  })

  it('forwards className', () => {
    render(<Sidebar side="left" className="custom-cls">Test</Sidebar>)
    expect(screen.getByText('Test').className).toContain('custom-cls')
  })
})
