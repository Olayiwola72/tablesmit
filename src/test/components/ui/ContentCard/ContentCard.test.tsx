import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import type { ContentCardProps } from '../../../../components/ui/ContentCard/ContentCard.types'
import { ContentCard } from '../../../../components/ui/ContentCard/ContentCard'

function renderCard(props: Partial<ContentCardProps> = {}): void {
  const defaultProps: ContentCardProps = {
    linkTo: '/some-page/',
    title: 'Default Title',
    description: 'Default description text.',
    learnMoreLabel: 'Learn More',
    ...props,
  }
  render(
    <MemoryRouter>
      <ContentCard {...defaultProps} />
    </MemoryRouter>,
  )
}

describe('ContentCard', () => {
  it('renders title', () => {
    renderCard({ title: 'Test Title' })
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders description', () => {
    renderCard({ description: 'Test description.' })
    expect(screen.getByText('Test description.')).toBeInTheDocument()
  })

  it('renders learn more link', () => {
    renderCard({ learnMoreLabel: 'Read More' })
    expect(screen.getByText('Read More →')).toBeInTheDocument()
  })

  it('links to the provided path', () => {
    renderCard({ linkTo: '/test-path/' })
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test-path/')
  })

  it('shows featured badge when featured is true and featuredLabel is set', () => {
    renderCard({ featured: true, featuredLabel: 'Featured' })
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('does not show featured badge when featured is false', () => {
    renderCard({ featured: false, featuredLabel: 'Featured' })
    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('does not show featured badge when featuredLabel is not set', () => {
    renderCard({ featured: true })
    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('renders date when provided', () => {
    renderCard({ date: '15 September 2025' })
    expect(screen.getByText('15 September 2025')).toBeInTheDocument()
  })

  it('does not render date when not provided', () => {
    renderCard({})
    expect(screen.queryByRole('time')).not.toBeInTheDocument()
  })

  it('renders metadata when provided', () => {
    renderCard({ metadata: <>4 min read</> })
    expect(screen.getByText('4 min read')).toBeInTheDocument()
  })

  it('does not render metadata when not provided', () => {
    renderCard({})
    const metadataContainer = screen.queryByText('4 min read')
    expect(metadataContainer).not.toBeInTheDocument()
  })
})
