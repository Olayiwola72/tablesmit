import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TableSkeleton } from '../../../../components/ui/TableSkeleton/TableSkeleton'

const ROWS = 5
const COLS = 5

describe('TableSkeleton', () => {
  it('renders a skeleton overlay', () => {
    render(<TableSkeleton rows={ROWS} cols={COLS} visible />)
    expect(screen.getByTestId('table-skeleton')).toBeInTheDocument()
  })

  it('has aria-hidden="true"', () => {
    render(<TableSkeleton rows={ROWS} cols={COLS} visible />)
    expect(screen.getByTestId('table-skeleton')).toHaveAttribute('aria-hidden', 'true')
  })

  it('contains the correct number of pulsing cells (rows × cols)', () => {
    render(<TableSkeleton rows={ROWS} cols={COLS} visible />)
    const skeleton = screen.getByTestId('table-skeleton')
    expect(skeleton.querySelectorAll('.animate-pulse')).toHaveLength(ROWS * COLS)
  })

  it('header row cells have primary-colored shimmer', () => {
    render(<TableSkeleton rows={ROWS} cols={COLS} visible />)
    const skeleton = screen.getByTestId('table-skeleton')
    const firstRowCells = skeleton.children[0]?.querySelectorAll('.animate-pulse')
    expect(firstRowCells?.length).toBe(COLS)
    firstRowCells?.forEach((cell) => {
      expect(cell.className).toContain('from-primary/15')
    })
  })

  it('body cells have default shimmer (not primary)', () => {
    render(<TableSkeleton rows={ROWS} cols={COLS} visible />)
    const skeleton = screen.getByTestId('table-skeleton')
    const secondRowCells = skeleton.children[1]?.querySelectorAll('.animate-pulse')
    expect(secondRowCells?.length).toBe(COLS)
    secondRowCells?.forEach((cell) => {
      expect(cell.className).not.toContain('from-primary')
    })
  })

  it('uses pointer-events-none to allow interaction underneath', () => {
    render(<TableSkeleton rows={ROWS} cols={COLS} visible />)
    expect(screen.getByTestId('table-skeleton').className).toContain('pointer-events-none')
  })

  it('is visible when visible prop is true', () => {
    render(<TableSkeleton rows={ROWS} cols={COLS} visible />)
    expect(screen.getByTestId('table-skeleton').style.opacity).toBe('1')
  })

  it('is hidden when visible prop is false', () => {
    render(<TableSkeleton rows={ROWS} cols={COLS} visible={false} />)
    expect(screen.getByTestId('table-skeleton').style.opacity).toBe('0')
  })
})
