import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, it, expect } from 'vitest'
import FeatureDetailPage from '../../../pages/FeatureDetailPage/FeatureDetailPage'

function renderFeature(slug: string): void {
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/features/${slug}`]}>
        <Routes>
          <Route path="/features/:slug" element={<FeatureDetailPage />} />
          <Route path="/features" element={<div>Features list page</div>} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  )
}

describe('FeatureDetailPage', () => {
  it('renders the hero headline for a valid slug', async () => {
    renderFeature('excel-export')
    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /export any table to excel/i,
        }),
      ).toBeInTheDocument()
    })
  })

  it('renders the hero subtext for a valid slug', async () => {
    renderFeature('excel-export')
    await waitFor(() => {
      expect(
        screen.getByText(/build your table, click export/i),
      ).toBeInTheDocument()
    })
  })

  it('renders benefits section', async () => {
    renderFeature('excel-export')
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: /benefits/i }),
      ).toBeInTheDocument()
    })
  })

  it('renders how it works section', async () => {
    renderFeature('excel-export')
    await waitFor(() => {
      // Match both translated and fallback-key text
      const headings = screen.getAllByRole('heading', { level: 2 })
      const howItWorks = headings.find(h =>
        /how[\s.]*it[\s.]*works/i.test(h.textContent ?? '')
      )
      expect(howItWorks).toBeDefined()
    })
  })

  it('redirects to /features for unknown slugs', async () => {
    renderFeature('nonexistent-slug')
    await waitFor(() => {
      expect(screen.getByText('Features list page')).toBeInTheDocument()
    })
  })

  it('includes CTA link to home at the bottom', async () => {
    renderFeature('excel-export')
    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: /open tablesmit/i }),
      ).toHaveAttribute('href', '/')
    })
  })

  it('back link goes to /features', async () => {
    renderFeature('excel-export')
    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: /back to features/i }),
      ).toHaveAttribute('href', '/features/')
    })
  })

  it('sets correct document title from feature data', async () => {
    renderFeature('excel-export')
    await waitFor(() => {
      expect(document.title).toBe('Export Table to Excel Online — Free | Tablesmit')
    })
  })

  it('sets correct meta description from feature data', async () => {
    renderFeature('excel-export')
    await waitFor(() => {
      const meta = document.querySelector('meta[name="description"]')
      expect(meta).toHaveAttribute(
        'content',
        'Export any table to Excel (.xlsx) in one click. Build structured tables in Tablesmit and download clean Excel files instantly. Free, no signup required.',
      )
    })
  })

  it('sets canonical URL without double-slash', async () => {
    renderFeature('excel-export')
    await waitFor(() => {
      const link = document.querySelector('link[rel="canonical"]')
      expect(link).toHaveAttribute('href', 'https://tablesmit.com/features/excel-export/')
    })
  })
})
