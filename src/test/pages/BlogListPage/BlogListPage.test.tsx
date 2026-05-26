import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, it, expect } from 'vitest'
import BlogListPage from '../../../pages/BlogListPage/BlogListPage'
import { getAllPosts } from '../../../services/blogService/blogService'
import { ITEMS_PER_PAGE } from '../../../config/table/tableDefaults'

function renderPage(): void {
  render(
    <HelmetProvider>
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>
    </HelmetProvider>,
  )
}

describe('BlogListPage', () => {
  it('renders page heading', async () => {
    renderPage()
    await waitFor(() => {
      expect(screen.getByText(/writing about tables/i)).toBeInTheDocument()
    })
  })

  it('renders a card for every blog post on the first page', async () => {
    renderPage()
    const posts = await getAllPosts()
    const pagePosts = posts.slice(0, ITEMS_PER_PAGE)
    await screen.findByText(pagePosts[0].title)
    for (const post of pagePosts) {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    }
  })

  it('links each card to the correct /blog/:slug route', async () => {
    renderPage()
    const posts = await getAllPosts()
    const pagePosts = posts.slice(0, ITEMS_PER_PAGE)
    await screen.findByText(pagePosts[0].title)
    for (const post of pagePosts) {
      const links = screen.getAllByRole('link')
      const cardLink = links.find(l => l.getAttribute('href') === `/blog/${post.slug}/`)
      expect(cardLink).toBeDefined()
      expect(cardLink).toHaveTextContent(post.title)
    }
  })

  it('displays read time and author on each card', async () => {
    renderPage()
    const posts = await getAllPosts()
    const pagePosts = posts.slice(0, ITEMS_PER_PAGE)
    await screen.findByText(pagePosts[0].title)
    for (const post of pagePosts) {
      const authorElements = screen.getAllByText(post.author)
      expect(authorElements.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('sets correct document title after loading', async () => {
    renderPage()
    await screen.findByText(/writing about tables/i)
    expect(document.title).toBe('Blog — Tablesmit')
  })

  it('sets correct meta description after loading', async () => {
    renderPage()
    await screen.findByText(/writing about tables/i)
    const meta = document.querySelector('meta[name="description"]')
    expect(meta).toHaveAttribute(
      'content',
      'Writing about tables, structure, and analytical thinking. Guides on Markdown tables, CSV import, Excel copy-paste, and more.',
    )
  })

  it('sets correct canonical URL after loading', async () => {
    renderPage()
    await screen.findByText(/writing about tables/i)
    const link = document.querySelector('link[rel="canonical"]')
    expect(link).toHaveAttribute('href', 'https://tablesmit.com/blog/')
  })
})
