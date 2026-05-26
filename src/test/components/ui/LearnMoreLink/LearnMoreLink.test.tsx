import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LearnMoreLink } from '../../../../components/ui/LearnMoreLink/LearnMoreLink'

describe('LearnMoreLink', () => {
  it('renders the label text', () => {
    const { container } = render(<LearnMoreLink label="Learn more" />)
    const span = container.querySelector('span')
    expect(span?.textContent).toContain('Learn more')
  })

  it('renders the arrow', () => {
    const { container } = render(<LearnMoreLink label="Read more" />)
    const span = container.querySelector('span')
    expect(span?.textContent).toContain('→')
  })

  it('has the correct style classes', () => {
    const { container } = render(<LearnMoreLink label="View all" />)
    const span = container.querySelector('span')
    expect(span?.className).toContain('text-sm')
    expect(span?.className).toContain('font-medium')
    expect(span?.className).toContain('text-primary')
  })
})
