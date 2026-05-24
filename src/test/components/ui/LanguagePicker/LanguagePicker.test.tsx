import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LanguagePicker } from '../../../../components/ui/LanguagePicker/LanguagePicker'

const LOCALE_NAMES = ['English', 'العربية', 'Français', 'Español', 'Português', '日本語', 'Deutsch', 'Norsk']

describe('LanguagePicker', () => {
  it('renders the trigger button with correct aria-label', () => {
    render(<LanguagePicker />)
    expect(screen.getByRole('button', { name: 'Select language' })).toBeInTheDocument()
  })

  it('shows the current language name on the trigger', () => {
    render(<LanguagePicker />)
    expect(screen.getByRole('button', { name: 'Select language' })).toHaveTextContent('English')
  })

  it('opens dropdown and displays all 8 locales on click', async () => {
    const user = userEvent.setup()
    render(<LanguagePicker />)
    await user.click(screen.getByRole('button', { name: 'Select language' }))
    const menu = screen.getByRole('menu')
    LOCALE_NAMES.forEach((name) => {
      expect(within(menu).getByText(name)).toBeInTheDocument()
    })
  })

  it('shows a checkmark on the current language in the dropdown', async () => {
    const user = userEvent.setup()
    render(<LanguagePicker />)
    await user.click(screen.getByRole('button', { name: 'Select language' }))
    const menu = screen.getByRole('menu')
    const englishItem = within(menu).getByText('English').closest('[role="menuitem"]')
    expect(englishItem?.querySelector('svg')).toBeInTheDocument()
  })

  it('does not show a checkmark on other locales', async () => {
    const user = userEvent.setup()
    render(<LanguagePicker />)
    await user.click(screen.getByRole('button', { name: 'Select language' }))
    const menu = screen.getByRole('menu')
    const frenchItem = within(menu).getByText('Français').closest('[role="menuitem"]')
    expect(frenchItem?.querySelector('svg')).toBeNull()
  })

  it('calls onSelect callback when a locale is chosen', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<LanguagePicker onSelect={onSelect} />)
    await user.click(screen.getByRole('button', { name: 'Select language' }))
    await user.click(screen.getByText('Français'))
    expect(onSelect).toHaveBeenCalledOnce()
  })


})
