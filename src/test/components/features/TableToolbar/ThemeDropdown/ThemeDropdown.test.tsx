import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ThemeDropdown } from '../../../../../components/features/TableToolbar/ThemeDropdown/ThemeDropdown'
import { TABLE_THEMES } from '../../../../../config/table/tableThemes/tableThemes'

describe('ThemeDropdown', () => {
  it('renders the trigger button', () => {
    render(<ThemeDropdown theme="default" onSetTheme={vi.fn()} />)
    expect(screen.getByRole('button', { name: /^theme$/i })).toBeInTheDocument()
  })

  it('opens the menu on trigger click showing theme buttons', async () => {
    const user = userEvent.setup()
    render(<ThemeDropdown theme="default" onSetTheme={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /^theme$/i }))
    const buttons = screen.getAllByRole('button', { name: /select table theme/i })
    expect(buttons.length).toBe(TABLE_THEMES.length)
  })

  it('shows theme label text for each theme', async () => {
    const user = userEvent.setup()
    render(<ThemeDropdown theme="default" onSetTheme={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /^theme$/i }))
    expect(screen.getByText('Default')).toBeInTheDocument()
    expect(screen.getByText('Minimal')).toBeInTheDocument()
    expect(screen.getByText('Dark header')).toBeInTheDocument()
    expect(screen.getByText('Striped')).toBeInTheDocument()
    expect(screen.getByText('Academic')).toBeInTheDocument()
    expect(screen.getByText('Monochrome')).toBeInTheDocument()
  })

  it('marks the active theme as selected with aria-pressed', async () => {
    const user = userEvent.setup()
    render(<ThemeDropdown theme="striped" onSetTheme={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /^theme$/i }))
    const buttons = screen.getAllByRole('button', { name: /select table theme/i })
    const selected = buttons.filter((b) => b.getAttribute('aria-pressed') === 'true')
    expect(selected).toHaveLength(1)
    expect(selected[0].textContent).toMatch(/striped/i)
  })

  it('calls onSetTheme with the correct theme id when a theme is clicked', async () => {
    const user = userEvent.setup()
    const onSetTheme = vi.fn()
    render(<ThemeDropdown theme="default" onSetTheme={onSetTheme} />)
    await user.click(screen.getByRole('button', { name: /^theme$/i }))
    const buttons = screen.getAllByRole('button', { name: /select table theme/i })
    const academicBtn = buttons.find((b) => b.textContent?.includes('Academic'))
    expect(academicBtn).toBeTruthy()
    await user.click(academicBtn!)
    expect(onSetTheme).toHaveBeenCalledWith('academic')
  })
})
