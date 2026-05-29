import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BulletItem } from '../../../../components/ui/BulletItem/BulletItem'

describe('BulletItem', () => {
  it('renders children text', () => {
    render(<BulletItem>Custom headers</BulletItem>)
    expect(screen.getByText('Custom headers')).toBeInTheDocument()
  })

  it('renders a decorative dot icon', () => {
    const { container } = render(<BulletItem>Item</BulletItem>)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot).toBeInTheDocument()
  })

  it('has visible styling classes', () => {
    render(<BulletItem>Item</BulletItem>)
    const container = screen.getByText('Item').closest('span')
    expect(container?.className).toContain('text-xs')
    expect(container?.className).toContain('text-text-secondary')
  })

  it('accepts a custom className', () => {
    render(<BulletItem className="my-class">Item</BulletItem>)
    const container = screen.getByText('Item').closest('span')
    expect(container?.className).toContain('my-class')
  })
})
