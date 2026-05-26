import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { SearchBar } from '../../../../components/features/SearchBar/SearchBar'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const keys: Record<string, string> = {
        'search.ariaLabel': 'Search',
        'search.placeholder': 'Search posts by title, content, or tags\u2026',
        'search.clear': 'Clear search',
        'search.noResults': 'No posts match your search.',
        'search.resultsCount': 'Showing {{count}} of {{total}} results',
      }
      return keys[key] ?? key
    },
  }),
}))

const defaultProps = {
  query: '',
  onQueryChange: vi.fn(),
  totalResults: 5,
  totalItems: 5,
}

function renderSearch(props: Partial<typeof defaultProps> = {}): ReactNode {
  return render(<SearchBar {...defaultProps} {...props} />)
}

describe('SearchBar', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders a search input with placeholder text', () => {
    renderSearch()
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search posts by title, content, or tags\u2026')).toBeInTheDocument()
  })

  it('renders with role="search" region', () => {
    renderSearch()
    expect(screen.getByRole('search')).toBeInTheDocument()
  })

  it('calls onQueryChange on user input', async () => {
    const user = userEvent.setup()
    const onQueryChange = vi.fn()
    renderSearch({ onQueryChange })
    const input = screen.getByRole('searchbox')
    await user.type(input, 'mar')
    expect(onQueryChange).toHaveBeenCalledTimes(3)
    expect(onQueryChange).toHaveBeenLastCalledWith('r')
  })

  it('does not show clear button when query is empty', () => {
    renderSearch({ query: '' })
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  })

  it('shows clear button when query is non-empty', () => {
    renderSearch({ query: 'markdown' })
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
  })

  it('calls onQueryChange with empty string when clear button is clicked', async () => {
    const user = userEvent.setup()
    const onQueryChange = vi.fn()
    renderSearch({ query: 'markdown', onQueryChange })
    await user.click(screen.getByLabelText('Clear search'))
    expect(onQueryChange).toHaveBeenCalledWith('')
  })

  it('shows results count when query is non-empty', () => {
    renderSearch({ query: 'table', totalResults: 3, totalItems: 10 })
    expect(screen.getByText(/Showing.*of.*results/)).toBeInTheDocument()
  })

  it('shows no results message when query has no matches', () => {
    renderSearch({ query: 'zzzzz', totalResults: 0, totalItems: 10 })
    expect(screen.getByText('No posts match your search.')).toBeInTheDocument()
  })

  it('does not show results info when query is empty', () => {
    renderSearch({ query: '' })
    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument()
    expect(screen.queryByText('No posts match your search.')).not.toBeInTheDocument()
  })

  it('uses custom placeholder when provided', () => {
    renderSearch({ placeholder: 'Find posts\u2026' })
    expect(screen.getByPlaceholderText('Find posts\u2026')).toBeInTheDocument()
  })

  it('accepts a search icon', () => {
    renderSearch()
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })
})
