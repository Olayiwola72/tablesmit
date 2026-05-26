import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MoreOptionsAccordion } from '../../../../components/ui/MoreOptionsAccordion/MoreOptionsAccordion'

describe('MoreOptionsAccordion', () => {
  it('renders the label text', () => {
    render(<MoreOptionsAccordion label="More options">content</MoreOptionsAccordion>)
    expect(screen.getByText('More options')).toBeInTheDocument()
  })

  it('does not show children by default', () => {
    render(<MoreOptionsAccordion label="Options">hidden content</MoreOptionsAccordion>)
    expect(screen.queryByText('hidden content')).not.toBeInTheDocument()
  })

  it('reveals children on click', async () => {
    const user = userEvent.setup()
    render(<MoreOptionsAccordion label="Options">visible content</MoreOptionsAccordion>)
    await user.click(screen.getByText('Options'))
    expect(screen.getByText('visible content')).toBeInTheDocument()
  })

  it('hides children on second click', async () => {
    const user = userEvent.setup()
    render(<MoreOptionsAccordion label="Options">toggle me</MoreOptionsAccordion>)
    await user.click(screen.getByText('Options'))
    expect(screen.getByText('toggle me')).toBeInTheDocument()
    await user.click(screen.getByText('Options'))
    expect(screen.queryByText('toggle me')).not.toBeInTheDocument()
  })

  it('applies additional className', () => {
    render(<MoreOptionsAccordion label="Options" className="extra-class">content</MoreOptionsAccordion>)
    const btn = screen.getByText('Options').closest('div')
    expect(btn?.className).toContain('extra-class')
  })
})
