import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MobileFloatingActions } from '../../../../components/features/MobileFloatingActions/MobileFloatingActions'

describe('MobileFloatingActions', () => {
  it('renders settings and presets buttons', () => {
    render(
      <MobileFloatingActions onOpenSettings={vi.fn()} onOpenPresets={vi.fn()} />,
    )
    expect(screen.getByRole('button', { name: /open settings/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open presets/i })).toBeInTheDocument()
  })

  it('calls onOpenSettings when settings button is clicked', async () => {
    const user = userEvent.setup()
    const onOpenSettings = vi.fn()
    render(
      <MobileFloatingActions onOpenSettings={onOpenSettings} onOpenPresets={vi.fn()} />,
    )
    await user.click(screen.getByRole('button', { name: /open settings/i }))
    expect(onOpenSettings).toHaveBeenCalledOnce()
  })

  it('calls onOpenPresets when presets button is clicked', async () => {
    const user = userEvent.setup()
    const onOpenPresets = vi.fn()
    render(
      <MobileFloatingActions onOpenSettings={vi.fn()} onOpenPresets={onOpenPresets} />,
    )
    await user.click(screen.getByRole('button', { name: /open presets/i }))
    expect(onOpenPresets).toHaveBeenCalledOnce()
  })

  it('has md:hidden class on both buttons', () => {
    const { container } = render(
      <MobileFloatingActions onOpenSettings={vi.fn()} onOpenPresets={vi.fn()} />,
    )
    const divs = container.querySelectorAll('.md\\:hidden')
    expect(divs).toHaveLength(2)
  })
})
