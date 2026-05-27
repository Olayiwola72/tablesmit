import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it, vi } from 'vitest'
import type { ContentListPageProps } from '../../../../components/ui/ContentListPage/ContentListPage.types'
import { ContentListPage } from '../../../../components/ui/ContentListPage/ContentListPage'

const defaultProps: ContentListPageProps = {
  meta: { title: 'Page Title — Tablesmit', description: 'Page description.' },
  canonicalUrl: 'https://tablesmit.com/page/',
  breadcrumb: [
    { label: 'Home', to: '/' },
    { label: 'Current Page' },
  ],
  heading: 'Page Heading',
  headingSubtext: 'A subtitle for the page.',
  searchQuery: '',
  onSearchChange: vi.fn(),
  totalResults: 10,
  totalItems: 10,
  searchPlaceholder: 'Search…',
  children: <div data-testid="card-grid">Card content</div>,
  currentPage: 1,
  totalPages: 1,
  onPageChange: vi.fn(),
  isLoading: false,
  isEmpty: false,
  emptyMessage: 'Nothing found.',
}

function renderPage(props: Partial<ContentListPageProps> = {}): void {
  render(
    <HelmetProvider>
      <MemoryRouter>
        <ContentListPage {...defaultProps} {...props} />
      </MemoryRouter>
    </HelmetProvider>,
  )
}

describe('ContentListPage', () => {
  it('shows spinner when loading', () => {
    renderPage({ isLoading: true })
    expect(screen.queryByText('Page Heading')).not.toBeInTheDocument()
    expect(document.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('renders heading when loaded', () => {
    renderPage()
    expect(screen.getByText('Page Heading')).toBeInTheDocument()
  })

  it('renders subtext when provided', () => {
    renderPage()
    expect(screen.getByText('A subtitle for the page.')).toBeInTheDocument()
  })

  it('renders breadcrumb', () => {
    renderPage()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Current Page')).toBeInTheDocument()
  })

  it('renders search bar', () => {
    renderPage()
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument()
  })

  it('renders children (card grid) when not loading', () => {
    renderPage()
    expect(screen.getByTestId('card-grid')).toHaveTextContent('Card content')
  })

  it('shows empty message when isEmpty is true', () => {
    renderPage({ isEmpty: true, children: <div>should not render</div> })
    expect(screen.getByText('Nothing found.')).toBeInTheDocument()
    expect(screen.queryByText('should not render')).not.toBeInTheDocument()
  })

  it('renders pagination when totalPages > 1', () => {
    renderPage({ totalPages: 3 })
    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument()
  })

  it('hides pagination when totalPages <= 1', () => {
    renderPage()
    expect(screen.queryByRole('navigation', { name: /pagination/i })).not.toBeInTheDocument()
  })

  it('sets document title from meta', () => {
    renderPage()
    expect(document.title).toBe('Page Title — Tablesmit')
  })

  it('sets canonical URL from props', () => {
    renderPage()
    const link = document.querySelector('link[rel="canonical"]')
    expect(link).toHaveAttribute('href', 'https://tablesmit.com/page/')
  })

  it('sets meta description', () => {
    renderPage()
    const meta = document.querySelector('meta[name="description"]')
    expect(meta).toHaveAttribute('content', 'Page description.')
  })

  it('calls onPageChange when pagination button is clicked', async () => {
    const onPageChange = vi.fn()
    renderPage({ totalPages: 3, currentPage: 1, onPageChange })
    const nextBtn = screen.getByRole('button', { name: /next/i })
    await userEvent.click(nextBtn)
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onSearchChange when search input changes', async () => {
    const onSearchChange = vi.fn()
    renderPage({ onSearchChange })
    const input = screen.getByPlaceholderText('Search…')
    await userEvent.type(input, 'test')
    expect(onSearchChange).toHaveBeenCalled()
  })
})
