import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, it, expect } from 'vitest'
import FeaturesListPage from '../../../pages/FeaturesListPage/FeaturesListPage'
import { getAllFeatures } from '../../../services/featureService/featureService'
import { ITEMS_PER_PAGE } from '../../../config/table/tableDefaults'

function renderPage(): void {
  render(
    <HelmetProvider>
      <MemoryRouter>
        <FeaturesListPage />
      </MemoryRouter>
    </HelmetProvider>,
  )
}

describe('FeaturesListPage', () => {
  it('renders page heading', async () => {
    renderPage()
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 1, name: /features/i })
      ).toBeInTheDocument()
    })
  })

  it('renders the first page of features', async () => {
    renderPage()
    const allFeatures = await getAllFeatures()
    const firstPage = allFeatures.slice(0, ITEMS_PER_PAGE)
    await screen.findByText(firstPage[0].heroHeadline)
    for (const feature of firstPage) {
      expect(screen.getByText(feature.heroHeadline)).toBeInTheDocument()
    }
  })

  it('links cards on first page to correct /features/:slug route', async () => {
    renderPage()
    const allFeatures = await getAllFeatures()
    const firstPage = allFeatures.slice(0, ITEMS_PER_PAGE)
    await screen.findByText(firstPage[0].heroHeadline)
    for (const feature of firstPage) {
      const links = screen.getAllByRole('link')
      const cardLink = links.find(l => l.getAttribute('href') === `/features/${feature.slug}/`)
      expect(cardLink).toBeDefined()
      expect(cardLink).toHaveTextContent(feature.heroHeadline)
    }
  })

  it('shows learn more link on each first-page card', async () => {
    renderPage()
    const allFeatures = await getAllFeatures()
    await screen.findByText(allFeatures[0].heroHeadline)
    await waitFor(() => {
      const learnMoreLinks = screen.getAllByText(/learn more/i)
      expect(learnMoreLinks.length).toBe(
        Math.min(allFeatures.length, ITEMS_PER_PAGE)
      )
    })
  })

  it('renders pagination controls when there are multiple pages', async () => {
    renderPage()
    const allFeatures = await getAllFeatures()
    await screen.findByText(allFeatures[0].heroHeadline)
    if (allFeatures.length > ITEMS_PER_PAGE) {
      await waitFor(() => {
        expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument()
      })
    }
  })

  it('sets correct document title after loading', async () => {
    renderPage()
    const allFeatures = await getAllFeatures()
    await screen.findByText(allFeatures[0].heroHeadline)
    expect(document.title).toBe('Features — Tablesmit')
  })

  it('sets correct meta description after loading', async () => {
    renderPage()
    const allFeatures = await getAllFeatures()
    await screen.findByText(allFeatures[0].heroHeadline)
    const meta = document.querySelector('meta[name="description"]')
    expect(meta).toHaveAttribute(
      'content',
      'Every feature you need to build clean, structured tables. Drag-to-resize, merge cells, custom headers, export to PDF and Excel.',
    )
  })

  it('sets correct canonical URL after loading', async () => {
    renderPage()
    const allFeatures = await getAllFeatures()
    await screen.findByText(allFeatures[0].heroHeadline)
    const link = document.querySelector('link[rel="canonical"]')
    expect(link).toHaveAttribute('href', 'https://tablesmit.com/features/')
  })
})
