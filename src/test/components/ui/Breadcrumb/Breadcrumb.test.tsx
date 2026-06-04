import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { Breadcrumb } from '../../../../components/ui/Breadcrumb/Breadcrumb'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Breadcrumb', () => {
  it('renders all segment labels', () => {
    renderWithRouter(
      <Breadcrumb
        segments={[
          { label: 'Home', to: '/' },
          { label: 'Blog', to: '/blog' },
          { label: 'Current Post' },
        ]}
      />,
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Current Post')).toBeInTheDocument()
  })

  it('renders links for segments with a "to" prop (except last)', () => {
    renderWithRouter(
      <Breadcrumb
        segments={[
          { label: 'Home', to: '/' },
          { label: 'Features', to: '/features' },
          { label: 'Current' },
        ]}
      />,
    )
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', '/')
    expect(links[1]).toHaveAttribute('href', '/features')
  })

  it('does not render a link for the last segment', () => {
    renderWithRouter(
      <Breadcrumb
        segments={[
          { label: 'Home', to: '/' },
          { label: 'About' },
        ]}
      />,
    )
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(1)
  })

  it('renders a separator › between segments', () => {
    renderWithRouter(
      <Breadcrumb
        segments={[
          { label: 'Home', to: '/' },
          { label: 'About' },
        ]}
      />,
    )
    const separators = screen.getAllByText('›')
    expect(separators).toHaveLength(1)
  })

  it('renders as a nav element with aria-label', () => {
    renderWithRouter(
      <Breadcrumb
        segments={[
          { label: 'Home', to: '/' },
          { label: 'About' },
        ]}
      />,
    )
    const nav = screen.getByRole('navigation', { name: /breadcrumb/i })
    expect(nav).toBeInTheDocument()
  })

  it('marks the last segment with aria-current="page"', () => {
    renderWithRouter(
      <Breadcrumb
        segments={[
          { label: 'Home', to: '/' },
          { label: 'Changelog' },
        ]}
      />,
    )
    const current = screen.getByText('Changelog')
    expect(current).toHaveAttribute('aria-current', 'page')
  })

  it('handles segments with identical labels but different paths', () => {
    renderWithRouter(
      <Breadcrumb
        segments={[
          { label: 'Products', to: '/products' },
          { label: 'Products', to: '/products/featured' },
          { label: 'Current Product' },
        ]}
      />,
    )
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', '/products')
    expect(links[1]).toHaveAttribute('href', '/products/featured')
    expect(screen.getByText('Current Product')).toBeInTheDocument()
  })

  it('has the correct style classes on the nav element', () => {
    renderWithRouter(
      <Breadcrumb
        segments={[
          { label: 'Home', to: '/' },
          { label: 'Contact' },
        ]}
      />,
    )
    const nav = screen.getByRole('navigation')
    expect(nav.className).toContain('text-sm')
    expect(nav.className).toContain('text-text-muted')
    expect(nav.className).toContain('mb-4')
  })
})
