import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { RowColumnActions } from '../../../../../components/features/TableToolbar/RowColumnActions/RowColumnActions'
import { MAX_ROWS, MAX_COLS } from '../../../../../config/table/tableDefaults'

describe('RowColumnActions', () => {
  it('renders all four action buttons', () => {
    render(
      <RowColumnActions
        rows={5}
        cols={5}
        onAddRow={vi.fn()}
        onAddColumn={vi.fn()}
        onRemoveRow={vi.fn()}
        onRemoveColumn={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: /^add row$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^add column$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^remove row$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^remove column$/i })).toBeInTheDocument()
  })

  it('calls onAddRow when Add Row button is clicked', async () => {
    const user = userEvent.setup()
    const onAddRow = vi.fn()
    render(
      <RowColumnActions
        rows={5}
        cols={5}
        onAddRow={onAddRow}
        onAddColumn={vi.fn()}
        onRemoveRow={vi.fn()}
        onRemoveColumn={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('button', { name: /^add row$/i }))
    expect(onAddRow).toHaveBeenCalledOnce()
  })

  it('calls onAddColumn when Add Column button is clicked', async () => {
    const user = userEvent.setup()
    const onAddColumn = vi.fn()
    render(
      <RowColumnActions
        rows={5}
        cols={5}
        onAddRow={vi.fn()}
        onAddColumn={onAddColumn}
        onRemoveRow={vi.fn()}
        onRemoveColumn={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('button', { name: /^add column$/i }))
    expect(onAddColumn).toHaveBeenCalledOnce()
  })

  it('calls onRemoveRow when Remove Row button is clicked', async () => {
    const user = userEvent.setup()
    const onRemoveRow = vi.fn()
    render(
      <RowColumnActions
        rows={5}
        cols={5}
        onAddRow={vi.fn()}
        onAddColumn={vi.fn()}
        onRemoveRow={onRemoveRow}
        onRemoveColumn={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('button', { name: /^remove row$/i }))
    expect(onRemoveRow).toHaveBeenCalledOnce()
  })

  it('calls onRemoveColumn when Remove Column button is clicked', async () => {
    const user = userEvent.setup()
    const onRemoveColumn = vi.fn()
    render(
      <RowColumnActions
        rows={5}
        cols={5}
        onAddRow={vi.fn()}
        onAddColumn={vi.fn()}
        onRemoveRow={vi.fn()}
        onRemoveColumn={onRemoveColumn}
      />,
    )
    await user.click(screen.getByRole('button', { name: /^remove column$/i }))
    expect(onRemoveColumn).toHaveBeenCalledOnce()
  })

  it('disables add row button at MAX_ROWS', () => {
    render(
      <RowColumnActions
        rows={MAX_ROWS}
        cols={5}
        onAddRow={vi.fn()}
        onAddColumn={vi.fn()}
        onRemoveRow={vi.fn()}
        onRemoveColumn={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: /^add row$/i })).toBeDisabled()
  })

  it('disables remove row button when rows <= 1', () => {
    render(
      <RowColumnActions
        rows={1}
        cols={5}
        onAddRow={vi.fn()}
        onAddColumn={vi.fn()}
        onRemoveRow={vi.fn()}
        onRemoveColumn={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: /^remove row$/i })).toBeDisabled()
  })

  it('disables add column button at MAX_COLS', () => {
    render(
      <RowColumnActions
        rows={5}
        cols={MAX_COLS}
        onAddRow={vi.fn()}
        onAddColumn={vi.fn()}
        onRemoveRow={vi.fn()}
        onRemoveColumn={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: /^add column$/i })).toBeDisabled()
  })

  it('disables remove column button when cols <= 1', () => {
    render(
      <RowColumnActions
        rows={5}
        cols={1}
        onAddRow={vi.fn()}
        onAddColumn={vi.fn()}
        onRemoveRow={vi.fn()}
        onRemoveColumn={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: /^remove column$/i })).toBeDisabled()
  })

  it('does not fire onAddRow when button is disabled', async () => {
    const user = userEvent.setup()
    const onAddRow = vi.fn()
    render(
      <RowColumnActions
        rows={MAX_ROWS}
        cols={5}
        onAddRow={onAddRow}
        onAddColumn={vi.fn()}
        onRemoveRow={vi.fn()}
        onRemoveColumn={vi.fn()}
      />,
    )
    const btn = screen.getByRole('button', { name: /^add row$/i })
    expect(btn).toBeDisabled()
    await user.click(btn)
    expect(onAddRow).not.toHaveBeenCalled()
  })
})
