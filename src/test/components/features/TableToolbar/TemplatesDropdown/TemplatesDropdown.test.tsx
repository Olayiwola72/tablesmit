import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TemplatesDropdown } from '../../../../../components/features/TableToolbar/TemplatesDropdown/TemplatesDropdown'
import type { PresetDefinition } from '../../../../../config/ui.types'

const mockPresets: PresetDefinition[] = [
  { id: 'research-notes', label: 'Research Notes', rows: 5, cols: 3, headerStyle: 'first-row', headers: ['Topic', 'Source', 'Notes'] },
  { id: 'feature-matrix', label: 'Feature Matrix', rows: 4, cols: 4, headerStyle: 'first-row', headers: ['Feature', 'Priority', 'Status', 'Notes'] },
  { id: 'content-tracker', label: 'Content Tracker', rows: 6, cols: 4, headerStyle: 'both', headers: ['Title', 'Author', 'Status', 'Date'] },
]

describe('TemplatesDropdown', () => {
  it('renders the trigger button', () => {
    render(<TemplatesDropdown presets={mockPresets} onApplyPreset={vi.fn()} />)
    expect(screen.getByRole('button', { name: /templates/i })).toBeInTheDocument()
  })

  it('opens the menu on trigger click', async () => {
    const user = userEvent.setup()
    render(<TemplatesDropdown presets={mockPresets} onApplyPreset={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /templates/i }))
    expect(screen.getByText('Research Notes')).toBeInTheDocument()
    expect(screen.getByText('Feature Matrix')).toBeInTheDocument()
    expect(screen.getByText('Content Tracker')).toBeInTheDocument()
  })

  it('calls onApplyPreset with correct preset when item is clicked', async () => {
    const user = userEvent.setup()
    const onApplyPreset = vi.fn()
    render(<TemplatesDropdown presets={mockPresets} onApplyPreset={onApplyPreset} />)
    await user.click(screen.getByRole('button', { name: /templates/i }))
    await user.click(screen.getByText('Content Tracker'))
    expect(onApplyPreset).toHaveBeenCalledWith(mockPresets[2])
  })

  it('renders only the presets passed via props', async () => {
    const user = userEvent.setup()
    const singlePreset: PresetDefinition[] = [
      { id: 'budget', label: 'Budget Summary', rows: 3, cols: 2, headerStyle: 'first-row', headers: ['Item', 'Cost'] },
    ]
    render(<TemplatesDropdown presets={singlePreset} onApplyPreset={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /templates/i }))
    expect(screen.getByText('Budget Summary')).toBeInTheDocument()
    expect(screen.queryByText('Research Notes')).not.toBeInTheDocument()
  })

  it('handles empty presets array', async () => {
    const user = userEvent.setup()
    render(<TemplatesDropdown presets={[]} onApplyPreset={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /templates/i }))
    expect(screen.queryByText('Research Notes')).not.toBeInTheDocument()
    expect(screen.queryByText('Feature Matrix')).not.toBeInTheDocument()
  })
})
