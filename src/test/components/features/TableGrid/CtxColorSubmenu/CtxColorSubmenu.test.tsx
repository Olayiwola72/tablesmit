import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CtxColorSubmenu } from '../../../../../components/features/TableGrid/TableCtxMenu/CtxColorSubmenu/CtxColorSubmenu'

const baseProps = {
  current: '',
  onChange: vi.fn(),
  onClose: vi.fn(),
  customLabel: 'Custom',
  removeColorLabel: 'Remove color',
}

function renderMenu(props = baseProps) {
  return render(<CtxColorSubmenu {...props} />)
}

describe('CtxColorSubmenu', () => {
  it('renders color preset buttons', () => {
    renderMenu()
    const presets = screen.getAllByRole('button')
    expect(presets.length).toBeGreaterThanOrEqual(18)
  })

  it('renders the custom color label', () => {
    renderMenu()
    expect(screen.getByText('Custom')).toBeInTheDocument()
  })

  it('shows remove color button when current is set', () => {
    renderMenu({ ...baseProps, current: '#FF5722' })
    expect(screen.getByText('Remove color')).toBeInTheDocument()
  })

  it('hides remove color button when current is empty', () => {
    renderMenu()
    expect(screen.queryByText('Remove color')).not.toBeInTheDocument()
  })

  it('calls onChange and onClose when a preset is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onClose = vi.fn()
    renderMenu({ ...baseProps, onChange, onClose })

    const firstPreset = screen.getAllByRole('button')[0]
    await user.click(firstPreset)

    expect(onChange).toHaveBeenCalledOnce()
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('highlights the current color preset with a ring', () => {
    renderMenu({ ...baseProps, current: '#FFE4E1' })
    const buttons = screen.getAllByRole('button')
    // First preset should have the ring
    expect(buttons[0].className).toContain('ring-2')
    expect(buttons[0].className).toContain('ring-primary')
  })

  it('renders a color input for custom colors', () => {
    renderMenu()
    const input = screen.getByLabelText('Custom')
    expect(input).toBeInTheDocument()
  })

  it('calls onChange and onClose when remove color is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onClose = vi.fn()
    renderMenu({ ...baseProps, current: '#FF5722', onChange, onClose })

    await user.click(screen.getByText('Remove color'))
    expect(onChange).toHaveBeenCalledWith('')
    expect(onClose).toHaveBeenCalledOnce()
  })
})
