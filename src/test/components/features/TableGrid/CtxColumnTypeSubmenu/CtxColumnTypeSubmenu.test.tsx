import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CtxColumnTypeSubmenu } from '../../../../../components/features/TableGrid/TableCtxMenu/CtxColumnTypeSubmenu/CtxColumnTypeSubmenu'
import type { CtxColumnTypeSubmenuProps } from '../../../../../components/features/TableGrid/TableCtxMenu/CtxColumnTypeSubmenu/CtxColumnTypeSubmenu.types'

const baseProps: CtxColumnTypeSubmenuProps = {
  currentFormat: undefined,
  onChange: vi.fn(),
  onClose: vi.fn(),
}

function renderMenu(props = baseProps) {
  return render(<CtxColumnTypeSubmenu {...props} />)
}

describe('CtxColumnTypeSubmenu', () => {
  it('renders all column format options', () => {
    renderMenu()
    expect(screen.getByText('Text')).toBeInTheDocument()
    expect(screen.getByText('Number')).toBeInTheDocument()
    expect(screen.getByText('Currency')).toBeInTheDocument()
    expect(screen.getByText('Percentage')).toBeInTheDocument()
    expect(screen.getByText('Date')).toBeInTheDocument()
    expect(screen.getByText('Sum')).toBeInTheDocument()
    expect(screen.getByText('#')).toBeInTheDocument()
  })

  it('highlights the current format with primary colour', () => {
    renderMenu({ ...baseProps, currentFormat: 'number' })
    const btn = screen.getByText('Number')
    expect(btn.className).toContain('text-primary')
    expect(btn.className).toContain('font-semibold')
  })

  it('does not highlight non-current formats', () => {
    renderMenu({ ...baseProps, currentFormat: 'number' })
    const btn = screen.getByText('Text')
    const cls = btn.className
    expect(cls.includes('font-semibold') && cls.includes('text-primary')).toBe(false)
  })

  it('calls onChange with the correct format on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderMenu({ ...baseProps, onChange })

    await user.click(screen.getByText('Currency'))
    expect(onChange).toHaveBeenCalledWith('currency')
  })

  it('calls onClose after a format is selected', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderMenu({ ...baseProps, onClose })

    await user.click(screen.getByText('Currency'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders the correct number of format buttons', () => {
    renderMenu()
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(7)
  })
})
