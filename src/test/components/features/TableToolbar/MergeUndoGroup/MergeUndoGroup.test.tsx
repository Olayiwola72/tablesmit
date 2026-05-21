import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MergeUndoGroup } from '../../../../../components/features/TableToolbar/MergeUndoGroup/MergeUndoGroup'
import { TooltipProvider } from '../../../../../components/ui/Tooltip/Tooltip'

function wrap(ui: React.ReactElement) {
  return render(<TooltipProvider>{ui}</TooltipProvider>)
}

describe('MergeUndoGroup', () => {
  const defaultProps = {
    canMerge: false,
    canUndo: false,
    historyDepth: 0,
    onMerge: vi.fn(),
    onUnmerge: vi.fn(),
    onUndo: vi.fn(),
  }

  it('renders merge, unmerge, and undo buttons', () => {
    wrap(<MergeUndoGroup {...defaultProps} />)
    expect(screen.getByRole('button', { name: /^merge$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /unmerge/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^undo$/i })).toBeInTheDocument()
  })

  it('undo button is disabled when canUndo is false', () => {
    wrap(<MergeUndoGroup {...defaultProps} />)
    expect(screen.getByRole('button', { name: /^undo$/i })).toBeDisabled()
  })

  it('undo button is enabled when canUndo is true', () => {
    wrap(<MergeUndoGroup {...defaultProps} canUndo historyDepth={3} />)
    expect(screen.getByRole('button', { name: /^undo$/i })).not.toBeDisabled()
  })

  it('calls onMerge when merge button is clicked', async () => {
    const user = userEvent.setup()
    const onMerge = vi.fn()
    wrap(<MergeUndoGroup {...defaultProps} canMerge onMerge={onMerge} />)
    await user.click(screen.getByRole('button', { name: /^merge$/i }))
    expect(onMerge).toHaveBeenCalledOnce()
  })

  it('calls onUnmerge when unmerge button is clicked', async () => {
    const user = userEvent.setup()
    const onUnmerge = vi.fn()
    wrap(<MergeUndoGroup {...defaultProps} onUnmerge={onUnmerge} />)
    await user.click(screen.getByRole('button', { name: /unmerge/i }))
    expect(onUnmerge).toHaveBeenCalledOnce()
  })

  it('calls onUndo when undo button is clicked', async () => {
    const user = userEvent.setup()
    const onUndo = vi.fn()
    wrap(<MergeUndoGroup {...defaultProps} canUndo historyDepth={1} onUndo={onUndo} />)
    await user.click(screen.getByRole('button', { name: /^undo$/i }))
    expect(onUndo).toHaveBeenCalledOnce()
  })

  it('does not call onUndo when undo button is disabled', async () => {
    const user = userEvent.setup()
    const onUndo = vi.fn()
    wrap(<MergeUndoGroup {...defaultProps} onUndo={onUndo} />)
    const undoBtn = screen.getByRole('button', { name: /^undo$/i })
    expect(undoBtn).toBeDisabled()
    await user.click(undoBtn)
    expect(onUndo).not.toHaveBeenCalled()
  })
})
