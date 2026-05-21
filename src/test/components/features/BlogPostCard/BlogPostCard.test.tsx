import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import type { BlogPost } from '../../../../services/blogService/blogService.types'
import { BlogPostCard } from '../../../../components/features/BlogPostCard/BlogPostCard'

function renderCard(post: BlogPost): void {
  render(
    <MemoryRouter>
      <BlogPostCard post={post} />
    </MemoryRouter>,
  )
}

const basePost: BlogPost = {
  slug: 'test-post',
  title: 'Test Post Title',
  date: '2025-09-15',
  description: 'A test blog post description.',
  author: 'Test Author',
  tags: ['testing', 'blog'],
  readTime: 4,
  featured: false,
  content: '## Content',
}

describe('BlogPostCard', () => {
  it('renders title', () => {
    renderCard(basePost)
    expect(screen.getByText('Test Post Title')).toBeInTheDocument()
  })

  it('renders description', () => {
    renderCard(basePost)
    expect(screen.getByText('A test blog post description.')).toBeInTheDocument()
  })

  it('renders author', () => {
    renderCard(basePost)
    expect(screen.getByText('Test Author')).toBeInTheDocument()
  })

  it('renders tags', () => {
    renderCard(basePost)
    expect(screen.getByText('testing')).toBeInTheDocument()
    expect(screen.getByText('blog')).toBeInTheDocument()
  })

  it('shows featured badge when post is featured', () => {
    renderCard({ ...basePost, featured: true })
    expect(screen.getByText(/featured/i)).toBeInTheDocument()
  })

  it('does not show featured badge when post is not featured', () => {
    renderCard(basePost)
    expect(screen.queryByText(/featured/i)).not.toBeInTheDocument()
  })

  it('links to the correct blog post slug', () => {
    renderCard(basePost)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/test-post')
  })

  it('renders read time', () => {
    renderCard(basePost)
    expect(screen.getByText('4 min read')).toBeInTheDocument()
  })
})
