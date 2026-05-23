import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CtxAlignSubmenu } from '../../../../../../components/features/TableGrid/TableCtxMenu/CtxAlignSubmenu/CtxAlignSubmenu'

const baseProps = {
  currentAlign: '',
  onChange: vi.fn(),
  onClose: vi.fn(),
}

function renderMenu(props = baseProps) {
  return render(<CtxAlignSubmenu {...props} />)
}

describe('CtxAlignSubmenu', () => {
  it('renders all alignment options', () => {
    renderMenu()
    expect(screen.getByText('Align left')).toBeInTheDocument()
    expect(screen.getByText('Align center')).toBeInTheDocument()
    expect(screen.getByText('Align right')).toBeInTheDocument()
  })

  it('highlights the current alignment with primary colour', () => {
    renderMenu({ ...baseProps, currentAlign: 'center' })
    const btn = screen.getByText('Align center')
    expect(btn.className).toContain('text-primary')
    expect(btn.className).toContain('font-semibold')
  })

  it('does not highlight non-current alignment', () => {
    renderMenu({ ...baseProps, currentAlign: 'center' })
    const btn = screen.getByText('Align left')
    const cls = btn.className
    expect(cls.includes('font-semibold') && cls.includes('text-primary')).toBe(false)
  })

  it('renders an icon for each alignment option', () => {
    renderMenu()
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
    buttons.forEach(btn => {
      expect(btn.querySelector('svg')).toBeInTheDocument()
    })
  })

  it('calls onChange with correct alignment value on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderMenu({ ...baseProps, onChange })

    await user.click(screen.getByText('Align right'))
    expect(onChange).toHaveBeenCalledWith('right')
  })

  it('calls onClose after an alignment is selected', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderMenu({ ...baseProps, onClose })

    await user.click(screen.getByText('Align left'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders the correct number of alignment buttons', () => {
    renderMenu()
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })
})
