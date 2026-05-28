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
    const items = screen.getAllByText(/Undo|Find/i)
    expect(items.length).toBeGreaterThanOrEqual(1)
  })

  it('closes on Escape key', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on Ctrl+P when open', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'p', ctrlKey: true })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on Ctrl+Z when open (listed in SHORTCUTS)', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    fireEvent.keyDown(document, { key: 'z', ctrlKey: true })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('does not close on Ctrl+C when open (not in SHORTCUTS)', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'c', ctrlKey: true })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('does not close on plain Ctrl key press when open', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Control' })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('does not open on Ctrl+P when closed', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: 'p', ctrlKey: true })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on close button click', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the toggle hint text', () => {
    render(<ShortcutsModal />)
    fireEvent.keyDown(document, { key: '/', ctrlKey: true })
    expect(screen.getByText(/to toggle this list/i)).toBeInTheDocument()
  })
})
