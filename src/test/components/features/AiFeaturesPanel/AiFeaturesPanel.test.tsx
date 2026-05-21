import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AiFeaturesPanel } from '../../../../components/features/AiFeaturesPanel/AiFeaturesPanel'

vi.mock('../../../../utils/toast/toast', () => ({
  toast: { info: vi.fn() },
}))

describe('AiFeaturesPanel', () => {
  it('renders the section label', () => {
    render(<AiFeaturesPanel />)
    expect(screen.getByText('AI Features')).toBeInTheDocument()
  })

  it('renders the Coming soon badge', () => {
    render(<AiFeaturesPanel />)
    expect(screen.getByText('Coming soon')).toBeInTheDocument()
  })

  it('renders feature list items', () => {
    render(<AiFeaturesPanel />)
    expect(screen.getByText('Generate from text')).toBeInTheDocument()
    expect(screen.getByText('Summarize table')).toBeInTheDocument()
    expect(screen.getByText('Clean messy data')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<AiFeaturesPanel />)
    expect(screen.getByText(/AI features are in development/i)).toBeInTheDocument()
  })

  it('renders the Join Waitlist button', () => {
    render(<AiFeaturesPanel />)
    expect(screen.getByRole('button', { name: 'Join Waitlist' })).toBeInTheDocument()
  })

  it('shows info toast when waitlist button is clicked', async () => {
    const { toast } = await import('../../../../utils/toast/toast')
    const user = userEvent.setup()
    render(<AiFeaturesPanel />)
    await user.click(screen.getByRole('button', { name: 'Join Waitlist' }))
    expect(toast.info).toHaveBeenCalled()
  })

  it('renders an accessible mailto link', () => {
    render(<AiFeaturesPanel />)
    const mailtoLink = document.querySelector('a[href^="mailto:"]')
    expect(mailtoLink).toBeInTheDocument()
    expect(mailtoLink).toHaveClass('sr-only')
  })
})
