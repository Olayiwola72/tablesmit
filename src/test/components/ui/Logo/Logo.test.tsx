import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Logo } from '../../../../components/ui/Logo/Logo'

describe('Logo', () => {
  it('renders full variant with wordmark by default', () => {
    render(<Logo />)
    const svg = screen.getByRole('img', { name: 'Tablesmit' })
    expect(svg).toBeInTheDocument()
    expect(svg.querySelector('text')).toBeInTheDocument()
    expect(svg.querySelector('text')).toHaveTextContent('Tablesmit')
  })

  it('renders icon variant without wordmark', () => {
    render(<Logo variant="icon" />)
    const svg = screen.getByRole('img', { name: 'Tablesmit' })
    expect(svg).toBeInTheDocument()
    expect(svg.getAttribute('width')).toBe('32')
    expect(svg.querySelector('text')).toBeNull()
  })

  it('renders with light theme colors by default', () => {
    render(<Logo variant="icon" />)
    const svg = screen.getByRole('img', { name: 'Tablesmit' })
    expect(svg.innerHTML).toContain('#1E40AF')
  })

  it('renders with dark theme colors', () => {
    render(<Logo variant="icon" theme="dark" />)
    const svg = screen.getByRole('img', { name: 'Tablesmit' })
    expect(svg.innerHTML).toContain('#60A5FA')
  })

  it('forwards className', () => {
    render(<Logo className="custom-cls" />)
    const svg = screen.getByRole('img', { name: 'Tablesmit' })
    expect(svg.getAttribute('class')).toContain('custom-cls')
  })

  it('includes a title element for accessibility', () => {
    render(<Logo />)
    const svg = screen.getByRole('img', { name: 'Tablesmit' })
    expect(svg.querySelector('title')).toHaveTextContent('Tablesmit')
  })

  it('sets dir=ltr on the SVG', () => {
    render(<Logo />)
    expect(screen.getByRole('img', { name: 'Tablesmit' })).toHaveAttribute('dir', 'ltr')
  })
})
