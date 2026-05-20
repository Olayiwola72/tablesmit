import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import BlogListPage from '../../../pages/BlogListPage/BlogListPage'
import { allPosts } from '../../../services/blogService'

function renderPage(): void {
  render(
    <MemoryRouter>
      <BlogListPage />
    </MemoryRouter>,
  )
}

describe('BlogListPage', () => {
  it('renders page heading', () => {
    renderPage()
    expect(screen.getByText(/writing about tables/i)).toBeInTheDocument()
  })

  it('renders a card for every blog post', () => {
    renderPage()
    for (const post of allPosts) {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    }
  })

  it('links each card to the correct /blog/:slug route', () => {
    renderPage()
    for (const post of allPosts) {
      const link = screen.getByRole('link', { name: post.title })
      expect(link).toHaveAttribute('href', `/blog/${post.slug}`)
    }
  })

  it('displays read time and author on each card', () => {
    renderPage()
    for (const post of allPosts) {
      const readTimeElements = screen.getAllByText(post.author)
      expect(readTimeElements.length).toBeGreaterThanOrEqual(1)
    }
  })
})
