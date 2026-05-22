import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { FooterGroup } from '../../../../components/layout/FooterGroup/FooterGroup'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <BrowserRouter>{children}</BrowserRouter>
}

describe('FooterGroup', () => {
  it('renders the title', () => {
    render(<FooterGroup title="Product" links={[{ label: 'Home', href: '/' }]} />, { wrapper: Wrapper })
    expect(screen.getByText('Product')).toBeInTheDocument()
  })

  it('renders a link for each item', () => {
    render(
      <FooterGroup
        title="Links"
        links={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
        ]}
      />,
      { wrapper: Wrapper },
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders internal links with correct href', () => {
    render(<FooterGroup title="Links" links={[{ label: 'About', href: '/about' }]} />, { wrapper: Wrapper })
    const link = screen.getByText('About')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/about')
  })

  it('renders external links with target=_blank', () => {
    render(
      <FooterGroup
        title="External"
        links={[{ label: 'GitHub', href: 'https://github.com', external: true }]}
      />,
      { wrapper: Wrapper },
    )
    const link = screen.getByText('GitHub')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders external links with ExternalLink icon', () => {
    render(
      <FooterGroup
        title="Ext"
        links={[{ label: 'GitHub', href: 'https://github.com', external: true }]}
      />,
      { wrapper: Wrapper },
    )
    const link = screen.getByText('GitHub')
    expect(link.querySelector('svg')).toBeInTheDocument()
  })

  it('renders span when href is empty', () => {
    render(<FooterGroup title="Export" links={[{ label: 'PDF' }]} />, { wrapper: Wrapper })
    const span = screen.getByText('PDF')
    expect(span.tagName).toBe('SPAN')
  })

  it('renders navigation with role=navigation', () => {
    render(<FooterGroup title="Nav" links={[{ label: 'Home', href: '/' }]} />, { wrapper: Wrapper })
    const nav = document.querySelector('nav')
    expect(nav).toBeInTheDocument()
  })
})
