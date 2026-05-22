import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ImportDropdown } from '../../../../../components/features/TableToolbar/ImportDropdown/ImportDropdown'

vi.mock('../../../../../hooks/useImport/useImport', () => ({
  useImport: () => ({ error: null, importFile: vi.fn() }),
}))

describe('ImportDropdown', () => {
  it('renders the Import trigger button', () => {
    render(<ImportDropdown />)
    expect(screen.getByRole('button', { name: /import/i })).toBeInTheDocument()
  })

  it('opens dropdown and renders CSV and Excel options', async () => {
    const user = userEvent.setup()
    render(<ImportDropdown />)
    await user.click(screen.getByRole('button', { name: /import/i }))
    expect(screen.getByText('Import from CSV')).toBeInTheDocument()
    expect(screen.getByText('Import from Excel')).toBeInTheDocument()
  })

  it('renders Clean data option as disabled', async () => {
    const user = userEvent.setup()
    render(<ImportDropdown />)
    await user.click(screen.getByRole('button', { name: /import/i }))
    const cleanOption = screen.getByText('Clean messy data')
    expect(cleanOption).toBeInTheDocument()
    expect(cleanOption.closest('[role="menuitem"]')).toHaveAttribute('aria-disabled', 'true')
  })
})
