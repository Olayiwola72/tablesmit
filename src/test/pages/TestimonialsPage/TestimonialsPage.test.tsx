import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TestimonialsPage } from '../../../pages/TestimonialsPage/TestimonialsPage'
import { ITEMS_PER_PAGE } from '../../../config/pagination/paginationConfig'

vi.mock('react-helmet-async', () => ({
  Helmet: () => null,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('../../../config/testimonials/testimonials', () => ({
  TESTIMONIALS: [] as Array<{
    id: string
    name: string
    role: string
    avatar: string
    quote: string
    source?: string
    sourceUrl?: string
  }>,
}))

async function loadTestimonialsModule(): Promise<
  typeof import('../../../config/testimonials/testimonials')
> {
  return import('../../../config/testimonials/testimonials')
}

function renderPage(): void {
  render(
    <MemoryRouter>
      <TestimonialsPage />
    </MemoryRouter>,
  )
}

describe('TestimonialsPage', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
  })

  it('renders the page heading', () => {
    renderPage()
    expect(
      screen.getByRole('heading', { name: /what people are saying/i })
    ).toBeInTheDocument()
  })

  it('shows empty state when no testimonials exist', () => {
    renderPage()
    expect(screen.getByText(/no testimonials yet/i)).toBeInTheDocument()
  })

  it('links to the contact page from empty state', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /share your experience/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/contact/')
  })

  it('shows email reach-out in empty state', () => {
    renderPage()
    const emailLink = screen.getByRole('link', { name: /hello@tablesmit/i })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@tablesmit.com')
  })

  it('renders testimonial cards when data exists', async () => {
    const mod = await loadTestimonialsModule()
    const mockData = [
      {
        id: '1',
        name: 'Alice Johnson',
        role: 'Researcher',
        avatar: '',
        quote: 'Great tool!',
      },
      {
        id: '2',
        name: 'Bob Smith',
        role: 'Writer',
        avatar: '',
        quote: 'Exactly what I needed.',
      },
    ]
    vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

    renderPage()

    expect(screen.getByText(/Great tool!/)).toBeInTheDocument()
    expect(screen.getByText(/Exactly what I needed\./)).toBeInTheDocument()
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.getByText('Bob Smith')).toBeInTheDocument()
    expect(screen.getByText('Researcher')).toBeInTheDocument()
    expect(screen.getByText('Writer')).toBeInTheDocument()
  })

  it('shows initials fallback for avatar', async () => {
    const mod = await loadTestimonialsModule()
    const mockData = [
      {
        id: '1',
        name: 'Alice Johnson',
        role: 'Researcher',
        avatar: '',
        quote: 'Great tool!',
      },
    ]
    vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

    renderPage()

    expect(screen.getByText('AJ')).toBeInTheDocument()
  })

  it('renders source link when provided', async () => {
    const mod = await loadTestimonialsModule()
    const mockData = [
      {
        id: '1',
        name: 'Alice Johnson',
        role: 'Researcher',
        avatar: '',
        quote: 'Great tool!',
        source: 'Twitter',
        sourceUrl: 'https://x.com/alice',
      },
    ]
    vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

    renderPage()

    const sourceLink = screen.getByText('on Twitter')
    expect(sourceLink).toBeInTheDocument()
    expect(sourceLink.closest('a')).toHaveAttribute('href', 'https://x.com/alice')
  })

  it('does not render source link when source is absent', async () => {
    const mod = await loadTestimonialsModule()
    const mockData = [
      {
        id: '1',
        name: 'Alice Johnson',
        role: 'Researcher',
        avatar: '',
        quote: 'Great tool!',
      },
    ]
    vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

    renderPage()

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.queryByText('on Twitter')).not.toBeInTheDocument()
  })

  describe('pagination', () => {
    function buildMockTestimonials(count: number): Array<{
      id: string
      name: string
      role: string
      avatar: string
      quote: string
    }> {
      return Array.from({ length: count }, (_, i) => ({
        id: `t${i}`,
        name: `Person ${i + 1}`,
        role: `Role ${i + 1}`,
        avatar: '',
        quote: `Quote number ${i + 1}.`,
      }))
    }

    it('shows ITEMS_PER_PAGE testimonials on page 1 when more than ITEMS_PER_PAGE exist', async () => {
      const mod = await loadTestimonialsModule()
      const mockData = buildMockTestimonials(ITEMS_PER_PAGE + 1)
      vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

      renderPage()

      for (let i = 0; i < ITEMS_PER_PAGE; i++) {
        expect(screen.getByText(`Person ${i + 1}`)).toBeInTheDocument()
      }
      expect(screen.queryByText(`Person ${ITEMS_PER_PAGE + 1}`)).not.toBeInTheDocument()
    })

    it('renders PaginationNav when there are more than ITEMS_PER_PAGE testimonials', async () => {
      const mod = await loadTestimonialsModule()
      const mockData = buildMockTestimonials(ITEMS_PER_PAGE + 1)
      vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

      renderPage()

      expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument()
    })

    it('does not render PaginationNav when total is at most ITEMS_PER_PAGE', async () => {
      const mod = await loadTestimonialsModule()
      const mockData = buildMockTestimonials(3)
      vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

      renderPage()

      expect(screen.queryByRole('navigation', { name: /pagination/i })).not.toBeInTheDocument()
    })

    it('clicking page 2 shows remaining testimonials', async () => {
      const user = userEvent.setup()
      const mod = await loadTestimonialsModule()
      const mockData = buildMockTestimonials(ITEMS_PER_PAGE + 1)
      vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

      renderPage()

      const nav = screen.getByRole('navigation', { name: /pagination/i })
      await user.click(within(nav).getByText('2'))

      expect(screen.queryByText('Person 1')).not.toBeInTheDocument()
      expect(screen.getByText(`Person ${ITEMS_PER_PAGE + 1}`)).toBeInTheDocument()
    })
  })
})
