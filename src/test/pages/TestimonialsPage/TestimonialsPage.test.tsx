import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TestimonialsPage } from '../../../pages/TestimonialsPage/TestimonialsPage'

vi.mock('react-helmet-async', () => ({
  Helmet: () => null,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('../../../config/testimonials', () => ({
  TESTIMONIALS: [] as Array<{ id: string; name: string; role: string; avatar: string; quote: string; source?: string; sourceUrl?: string }>,
}))

async function loadTestimonialsModule(): Promise<typeof import('../../../config/testimonials')> {
  return import('../../../config/testimonials')
}

function renderWithProviders(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('TestimonialsPage', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
  })

  it('renders the page heading', () => {
    renderWithProviders(<TestimonialsPage />)
    expect(screen.getByRole('heading', { name: /what people are saying/i })).toBeInTheDocument()
  })

  it('shows empty state when no testimonials exist', async () => {
    renderWithProviders(<TestimonialsPage />)
    expect(screen.getByText(/no testimonials yet/i)).toBeInTheDocument()
  })

  it('links to the contact page from empty state', () => {
    renderWithProviders(<TestimonialsPage />)
    const link = screen.getByRole('link', { name: /share your experience/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('shows email reach-out in empty state', () => {
    renderWithProviders(<TestimonialsPage />)
    const emailLink = screen.getByRole('link', { name: /hello@tablesmit/i })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@tablesmit.com')
  })

  it('renders testimonial cards when data exists', async () => {
    const mod = await loadTestimonialsModule()
    const mockData = [
      { id: '1', name: 'Alice Johnson', role: 'Researcher', avatar: '', quote: 'Great tool!' },
      { id: '2', name: 'Bob Smith', role: 'Writer', avatar: '', quote: 'Exactly what I needed.' },
    ]
    vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

    renderWithProviders(<TestimonialsPage />)

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
      { id: '1', name: 'Alice Johnson', role: 'Researcher', avatar: '', quote: 'Great tool!' },
    ]
    vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

    renderWithProviders(<TestimonialsPage />)

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

    renderWithProviders(<TestimonialsPage />)

    const sourceLink = screen.getByText('on Twitter')
    expect(sourceLink).toBeInTheDocument()
    expect(sourceLink.closest('a')).toHaveAttribute('href', 'https://x.com/alice')
  })

  it('does not render source link when source is absent', async () => {
    const mod = await loadTestimonialsModule()
    const mockData = [
      { id: '1', name: 'Alice Johnson', role: 'Researcher', avatar: '', quote: 'Great tool!' },
    ]
    vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

    renderWithProviders(<TestimonialsPage />)

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.queryByText('on Twitter')).not.toBeInTheDocument()
  })

  it('renders the page heading', () => {
    render(
      <MemoryRouter>
        <TestimonialsPage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /what people are saying/i })).toBeInTheDocument()
  })

  it('shows empty state when no testimonials exist', async () => {
    render(
      <MemoryRouter>
        <TestimonialsPage />
      </MemoryRouter>,
    )
    expect(screen.getByText(/no testimonials yet/i)).toBeInTheDocument()
  })

  it('links to the contact page from empty state', () => {
    render(
      <MemoryRouter>
        <TestimonialsPage />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /share your experience/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('shows email reach-out in empty state', () => {
    render(
      <MemoryRouter>
        <TestimonialsPage />
      </MemoryRouter>,
    )
    const emailLink = screen.getByRole('link', { name: /hello@tablesmit/i })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@tablesmit.com')
  })

  it('renders testimonial cards when data exists', async () => {
    const mod = await loadTestimonialsModule()
    const mockData = [
      { id: '1', name: 'Alice Johnson', role: 'Researcher', avatar: '', quote: 'Great tool!' },
      { id: '2', name: 'Bob Smith', role: 'Writer', avatar: '', quote: 'Exactly what I needed.' },
    ]
    vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

    render(
      <MemoryRouter>
        <TestimonialsPage />
      </MemoryRouter>,
    )

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
      { id: '1', name: 'Alice Johnson', role: 'Researcher', avatar: '', quote: 'Great tool!' },
    ]
    vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

    render(
      <MemoryRouter>
        <TestimonialsPage />
      </MemoryRouter>,
    )

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

    render(
      <MemoryRouter>
        <TestimonialsPage />
      </MemoryRouter>,
    )

    const sourceLink = screen.getByText('on Twitter')
    expect(sourceLink).toBeInTheDocument()
    expect(sourceLink.closest('a')).toHaveAttribute('href', 'https://x.com/alice')
  })

  it('does not render source link when source is absent', async () => {
    const mod = await loadTestimonialsModule()
    const mockData = [
      { id: '1', name: 'Alice Johnson', role: 'Researcher', avatar: '', quote: 'Great tool!' },
    ]
    vi.spyOn(mod, 'TESTIMONIALS', 'get').mockReturnValue(mockData)

    render(
      <MemoryRouter>
        <TestimonialsPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.queryByText('Twitter')).not.toBeInTheDocument()
  })
})
