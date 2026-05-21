import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { CookieConsent } from '../../../../components/ui/CookieConsent/CookieConsent'

const CONSENT_KEY = 'tablesmit-consent'

describe('CookieConsent', () => {
  afterEach(() => {
    localStorage.removeItem(CONSENT_KEY)
  })

  it('renders dialog when no consent stored', () => {
    render(<CookieConsent />)
    expect(screen.getByRole('dialog', { name: 'Cookie consent' })).toBeInTheDocument()
  })

  it('renders accept and decline buttons', () => {
    render(<CookieConsent />)
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument()
  })

  it('renders privacy policy link', () => {
    render(<CookieConsent />)
    expect(screen.getByRole('link', { name: 'Learn more about our privacy policy' })).toBeInTheDocument()
  })

  it('hides after accepting', async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)
    await user.click(screen.getByRole('button', { name: 'Accept' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(localStorage.getItem(CONSENT_KEY)).toBe('accepted')
  })

  it('hides after declining', async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)
    await user.click(screen.getByRole('button', { name: 'Decline' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(localStorage.getItem(CONSENT_KEY)).toBe('declined')
  })

  it('does not show when consent previously accepted', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    render(<CookieConsent />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('does not show when consent previously declined', () => {
    localStorage.setItem(CONSENT_KEY, 'declined')
    render(<CookieConsent />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
