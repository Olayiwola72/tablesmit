import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NotFoundAnimation } from '../../../../components/ui/NotFoundAnimation/NotFoundAnimation'

describe('NotFoundAnimation', () => {
  it('renders an SVG', () => {
    render(<NotFoundAnimation />)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('has aria-hidden attribute', () => {
    render(<NotFoundAnimation />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders the 404 digits', () => {
    render(<NotFoundAnimation />)
    const svg = document.querySelector('svg')
    expect(svg?.textContent).toContain('4')
    expect(svg?.textContent).toContain('0')
  })

  it('has the correct viewBox', () => {
    render(<NotFoundAnimation />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 200 140')
  })

  it('has animation keyframes in style tag', () => {
    render(<NotFoundAnimation />)
    const svg = document.querySelector('svg')
    expect(svg?.innerHTML).toContain('@keyframes')
    expect(svg?.innerHTML).toContain('drawGrid')
    expect(svg?.innerHTML).toContain('fadeCell')
  })

  it('renders the grid-line and cell-digit CSS classes', () => {
    render(<NotFoundAnimation />)
    const svg = document.querySelector('svg')
    expect(svg?.innerHTML).toContain('grid-line')
    expect(svg?.innerHTML).toContain('cell-digit')
  })
})
