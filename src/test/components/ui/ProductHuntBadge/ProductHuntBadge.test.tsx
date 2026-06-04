import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductHuntBadge } from '../../../../components/ui/ProductHuntBadge/ProductHuntBadge'
import { productHunt } from '../../../../config/productHunt/productHuntConfig'
import { brand } from '../../../../config/brand/brandConfig'

describe('ProductHuntBadge — card variant', () => {
  it('renders the brand name as heading', () => {
    render(<ProductHuntBadge variant="card" />)
    expect(screen.getByRole('heading', { name: brand.name })).toBeInTheDocument()
  })

  it('renders the description from locale', () => {
    render(<ProductHuntBadge variant="card" />)
    expect(screen.getByText('A minimalist table builder with LaTeX, PDF, and Excel export')).toBeInTheDocument()
  })

  it('renders the CTA button with link to PH', () => {
    render(<ProductHuntBadge variant="card" />)
    const link = screen.getByRole('link', { name: /check it out on product hunt/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', productHunt.embedUrl)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('forwards className to the card wrapper', () => {
    render(<ProductHuntBadge variant="card" className="extra-class" />)
    const heading = screen.getByRole('heading', { name: brand.name })
    expect(heading.closest('.extra-class')).toBeInTheDocument()
  })
})

describe('ProductHuntBadge — badge variant', () => {
  it('returns null when postId is null', () => {
    const { container } = render(<ProductHuntBadge variant="badge" />)
    expect(container.innerHTML).toBe('')
  })

  it('renders the featured image when postId is set', () => {
    const originalPostId = productHunt.postId
    Object.defineProperty(productHunt, 'postId', { value: '123456', writable: true })
    const { container } = render(<ProductHuntBadge variant="badge" theme="light" />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=123456&theme=light')
    Object.defineProperty(productHunt, 'postId', { value: originalPostId, writable: true })
  })

  it('renders with dark theme when specified', () => {
    const originalPostId = productHunt.postId
    Object.defineProperty(productHunt, 'postId', { value: '123456', writable: true })
    const { container } = render(<ProductHuntBadge variant="badge" theme="dark" />)
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('src', 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=123456&theme=dark')
    Object.defineProperty(productHunt, 'postId', { value: originalPostId, writable: true })
  })
})
