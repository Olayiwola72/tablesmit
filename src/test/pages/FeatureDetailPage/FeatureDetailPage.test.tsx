import { render, screen } from '@testing-library/react'
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
  it('renders the hero headline for a valid slug', () => {
    renderFeature('excel-export')
    expect(
      screen.getByRole('heading', { level: 1, name: /export any table to excel/i }),
    ).toBeInTheDocument()
  })

  it('renders the hero subtext for a valid slug', () => {
    renderFeature('excel-export')
    expect(
      screen.getByText(/build your table, click export/i),
    ).toBeInTheDocument()
  })

  it('renders benefits section', () => {
    renderFeature('excel-export')
    expect(screen.getByRole('heading', { level: 2, name: /benefits/i })).toBeInTheDocument()
  })

  it('renders how it works section', () => {
    renderFeature('excel-export')
    expect(screen.getByRole('heading', { level: 2, name: /how it works/i })).toBeInTheDocument()
  })

  it('redirects to /features for unknown slugs', () => {
    renderFeature('nonexistent-slug')
    expect(screen.getByText('Features list page')).toBeInTheDocument()
  })

  it('includes CTA link to home at the bottom', () => {
    renderFeature('excel-export')
    expect(screen.getByRole('link', { name: /open tablesmit/i })).toHaveAttribute('href', '/')
  })

  it('back link goes to /features', () => {
    renderFeature('excel-export')
    expect(screen.getByRole('link', { name: /back to features/i })).toHaveAttribute('href', '/features')
  })
})
