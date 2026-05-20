import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, it, expect } from 'vitest'
import BlogPostPage from '../../../pages/BlogPostPage/BlogPostPage'

function renderPost(slug: string): void {
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/blog/${slug}`]}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/blog" element={<div>Blog list page</div>} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  )
}

describe('BlogPostPage', () => {
  it('renders the post title as H1 for valid slug', () => {
    renderPost('how-to-make-a-table-in-markdown')
    expect(screen.getByRole('heading', { level: 1, name: /how to make a table in markdown/i })).toBeInTheDocument()
  })

  it('renders the post content as Markdown', () => {
    renderPost('how-to-make-a-table-in-markdown')
    expect(screen.getByText(/Markdown tables are simpler/)).toBeInTheDocument()
  })

  it('redirects to /blog for unknown slugs', () => {
    renderPost('nonexistent-slug')
    expect(screen.getByText('Blog list page')).toBeInTheDocument()
  })

  it('shows tags as pill badges', () => {
    renderPost('how-to-make-a-table-in-markdown')
    expect(screen.getByText('markdown')).toBeInTheDocument()
    expect(screen.getByText('tutorial')).toBeInTheDocument()
    expect(screen.getByText('tables')).toBeInTheDocument()
  })

  it('includes CTA link to home at the bottom', () => {
    renderPost('how-to-make-a-table-in-markdown')
    expect(screen.getByRole('link', { name: /open tablesmit/i })).toHaveAttribute('href', '/')
  })
})
