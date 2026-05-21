import { render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ShortcutsModal } from '../../../../components/features/ShortcutsModal/ShortcutsModal'

describe('ShortcutsModal', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not render by default', () => {
    render(<ShortcutsModal />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens on Ctrl+/', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('opens on ? key when not in input', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '?' })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('shows the title when open', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    expect(screen.getByText('Keyboard Shortcuts')).toBeInTheDocument()
  })

  it('renders shortcut items when open', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    expect(screen.getByText(/Undo/i)).toBeInTheDocument()
    expect(screen.getByText(/Find/i)).toBeInTheDocument()
  })

  it('closes on Escape key', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on overlay click', async () => {
    const { user } = await import('@testing-library/user-event')
    const u = user.setup()
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    const overlay = document.querySelector('.fixed.inset-0')
    expect(overlay).toBeInTheDocument()
    if (overlay) await u.click(overlay)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on close button click', async () => {
    const { user } = await import('@testing-library/user-event')
    const u = user.setup()
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    await u.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the toggle hint text', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    expect(screen.getByText(/to toggle this list/i)).toBeInTheDocument()
  })
})
