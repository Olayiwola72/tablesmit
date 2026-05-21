import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import BlogListPage from '../../../pages/BlogListPage/BlogListPage'
import { getAllPosts } from '../../../services/blogService/blogService'

function renderPage(): void {
  render(
    <MemoryRouter>
      <BlogListPage />
    </MemoryRouter>,
  )
}

describe('BlogListPage', () => {
  it('renders page heading', async () => {
    renderPage()
    await waitFor(() => {
      expect(screen.getByText(/writing about tables/i)).toBeInTheDocument()
    })
  })

  it('renders a card for every blog post', async () => {
    renderPage()
    const posts = await getAllPosts()
    // Wait for any post title to appear, proving data loaded
    await screen.findByText(posts[0].title)
    for (const post of posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    }
  })

  it('links each card to the correct /blog/:slug route', async () => {
    renderPage()
    const posts = await getAllPosts()
    // Wait for data to load by looking for the first post title
    await screen.findByText(posts[0].title)
    // Now check each link's href using the card as a whole element
    for (const post of posts) {
      // The entire card is wrapped in a <Link>, so find it by its href
      const links = screen.getAllByRole('link')
      const cardLink = links.find(l => l.getAttribute('href') === `/blog/${post.slug}`)
      expect(cardLink).toBeDefined()
      expect(cardLink).toHaveTextContent(post.title)
    }
  })

  it('displays read time and author on each card', async () => {
    renderPage()
    const posts = await getAllPosts()
    // Wait for data to load
    await screen.findByText(posts[0].title)
    for (const post of posts) {
      const authorElements = screen.getAllByText(post.author)
      expect(authorElements.length).toBeGreaterThanOrEqual(1)
    }
  })
})
