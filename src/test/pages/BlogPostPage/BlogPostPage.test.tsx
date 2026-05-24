import type { BlogPost } from '../../../services/blogService/blogService.types'
import { act, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, it, expect, vi } from 'vitest'
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

vi.mock('../../../services/blogService/blogService', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../services/blogService/blogService')>()
  return {
    ...actual,
    getPostBySlug: vi.fn(actual.getPostBySlug),
  }
})

describe('BlogPostPage', () => {
  it('renders the post title as H1 for valid slug', async () => {
    renderPost('how-to-make-a-table-in-markdown')
    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /how to make a table in markdown/i,
        })
      ).toBeInTheDocument()
    })
  })

  it('renders the post content as Markdown', async () => {
    renderPost('how-to-make-a-table-in-markdown')
    await waitFor(() => {
      expect(
        screen.getByText(/Markdown tables are simpler/)
      ).toBeInTheDocument()
    })
  })

  it('redirects to /blog for unknown slugs', async () => {
    renderPost('nonexistent-slug')
    await waitFor(() => {
      expect(screen.getByText('Blog list page')).toBeInTheDocument()
    })
  })

  it('shows tags as pill badges', async () => {
    renderPost('how-to-make-a-table-in-markdown')
    await waitFor(() => {
      expect(screen.getByText('markdown')).toBeInTheDocument()
      expect(screen.getByText('tutorial')).toBeInTheDocument()
      expect(screen.getByText('tables')).toBeInTheDocument()
    })
  })

  it('includes CTA link to home at the bottom', async () => {
    renderPost('how-to-make-a-table-in-markdown')
    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: /open tablesmit/i })
      ).toHaveAttribute('href', '/')
    })
  })

  it('sets correct document title from post data', async () => {
    renderPost('how-to-make-a-table-in-markdown')
    await waitFor(() => {
      expect(document.title).toMatch(/How to Make a Table in Markdown/)
    })
  })

  it('sets correct meta description from post data', async () => {
    renderPost('how-to-make-a-table-in-markdown')
    await waitFor(() => {
      const meta = document.querySelector('meta[name="description"]')
      expect(meta).toHaveAttribute('content', expect.stringContaining('Markdown'))
    })
  })

  it('sets canonical URL without double-slash', async () => {
    renderPost('how-to-make-a-table-in-markdown')
    await waitFor(() => {
      const link = document.querySelector('link[rel="canonical"]')
      expect(link).toHaveAttribute('href', 'https://tablesmit.com/blog/how-to-make-a-table-in-markdown')
    })
  })

  it('lazy-loads react-markdown via dynamic import, not static import', async () => {
    const { readFileSync } = await import('fs')
    const content = readFileSync('src/pages/BlogPostPage/BlogPostPage.tsx', 'utf-8')
    expect(content).toContain("import('react-markdown'")
    expect(content).not.toContain("from 'react-markdown'")
  })

  it('shows loading spinner before post data resolves', async () => {
    const { getPostBySlug } = await import('../../../services/blogService/blogService')
    let resolvePost!: (value: BlogPost | undefined) => void
    const deferred = new Promise<BlogPost | undefined>(resolve => { resolvePost = resolve })
    vi.mocked(getPostBySlug).mockReturnValueOnce(deferred)

    renderPost('how-to-make-a-table-in-markdown')

    await waitFor(() => {
      expect(document.querySelector('.animate-spin')).toBeInTheDocument()
    })

    await act(async () => { resolvePost(undefined) })
  })
})
