import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ImportDropdown } from '../../../../../components/features/TableToolbar/ImportDropdown/ImportDropdown'
import { useImport } from '../../../../../hooks/useImport/useImport'

vi.mock('../../../../../hooks/useImport/useImport', () => ({
  useImport: vi.fn(),
}))

beforeEach(() => {
  vi.mocked(useImport).mockReturnValue({ error: null, importFile: vi.fn() })
})

describe('ImportDropdown', () => {
  it('renders the trigger button', () => {
    render(<ImportDropdown />)
    expect(screen.getByRole('button', { name: /import/i })).toBeInTheDocument()
  })

  it('opens the menu on trigger click', async () => {
    const user = userEvent.setup()
    render(<ImportDropdown />)
    await user.click(screen.getByRole('button', { name: /import/i }))
    expect(screen.getByText('Import from CSV')).toBeInTheDocument()
    expect(screen.getByText('Import from Excel')).toBeInTheDocument()
  })

  it('renders a disabled "Clean messy data" menu item', async () => {
    const user = userEvent.setup()
    render(<ImportDropdown />)
    await user.click(screen.getByRole('button', { name: /import/i }))
    const cleanBtn = screen.getByText('Clean messy data')
    expect(cleanBtn).toBeInTheDocument()
    expect(cleanBtn.closest('[aria-disabled="true"]') ?? cleanBtn.closest('button[disabled]')).toBeTruthy()
  })

  it('renders hidden file input for CSV', () => {
    render(<ImportDropdown />)
    const csvInput = document.querySelector('input[accept=".csv,text/csv"]')
    expect(csvInput).toBeInTheDocument()
    expect(csvInput).toHaveClass('hidden')
  })

  it('renders hidden file input for Excel', () => {
    render(<ImportDropdown />)
    const excelInput = document.querySelector('input[accept=".xlsx,.xls"]')
    expect(excelInput).toBeInTheDocument()
    expect(excelInput).toHaveClass('hidden')
  })

  it('shows error message when useImport returns an error', () => {
    vi.mocked(useImport).mockReturnValueOnce({ error: 'Could not read file.', importFile: vi.fn() })
    render(<ImportDropdown />)
    expect(screen.getByText('Could not read file.')).toBeInTheDocument()
  })
})
