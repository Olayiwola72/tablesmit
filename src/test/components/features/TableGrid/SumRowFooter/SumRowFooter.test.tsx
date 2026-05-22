import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SumRowFooter } from '../../../../../components/features/TableGrid/SumRowFooter/SumRowFooter'
import type { SumRowFooterProps } from '../../../../../components/features/TableGrid/SumRowFooter/SumRowFooter.types'

const baseCells = [
  [
    { id: 'R0C0', value: '10', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
    { id: 'R0C1', value: '20', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
    { id: 'R0C2', value: '30', colSpan: 1, rowSpan: 1, isMerged: false, isHidden: false },
  ],
]

const baseProps: SumRowFooterProps = {
  cells: baseCells,
  sumCols: [0, 2],
  columnTotals: { 0: 100, 1: 200, 2: 300 },
  borderStyle: 'solid',
  borderColor: '#E5E7EB',
  columnTextAlign: {},
  cellTextAlign: {},
}

function renderFooter(props = baseProps) {
  return render(<SumRowFooter {...props} />)
}

describe('SumRowFooter', () => {
  it('returns null when sumCols is empty', () => {
    const { container } = renderFooter({ ...baseProps, sumCols: [] })
    expect(container.innerHTML).toBe('')
  })

  it('renders a tfoot element', () => {
    renderFooter()
    expect(document.querySelector('tfoot')).toBeInTheDocument()
  })

  it('renders a row with role="row"', () => {
    renderFooter()
    expect(screen.getByRole('row')).toBeInTheDocument()
  })

  it('renders "Sum:" label only on the first sum column', () => {
    renderFooter()
    expect(screen.getByText(/Sum:/i)).toBeInTheDocument()
  })

  it('renders formatted total values for sum columns', () => {
    renderFooter()
    expect(screen.getByText('100.00')).toBeInTheDocument()
    expect(screen.getByText('300.00')).toBeInTheDocument()
  })

  it('does not render a total value for non-sum columns', () => {
    renderFooter()
    expect(screen.queryByText('200.00')).not.toBeInTheDocument()
  })

  it('applies border style none correctly', () => {
    renderFooter({ ...baseProps, borderStyle: 'none' })
    const tds = document.querySelectorAll<HTMLElement>('tfoot td')
    expect(tds.length).toBeGreaterThan(0)
    tds.forEach(td => {
      // jsdom serializes inline border: none to border-top-style: none
      expect(td.style.borderTopStyle).toBe('none')
    })
  })

  it('applies solid border style correctly', () => {
    renderFooter({ ...baseProps, borderStyle: 'solid', borderColor: '#000' })
    const tds = document.querySelectorAll<HTMLElement>('tfoot td')
    const style = tds[0].getAttribute('style') ?? ''
    expect(style).toContain('solid')
    expect(style).toContain('rgb(0, 0, 0)')
  })

  it('applies column-level text alignment', () => {
    renderFooter({ ...baseProps, columnTextAlign: { 0: 'center' } })
    const tds = document.querySelectorAll<HTMLElement>('tfoot td')
    expect(tds[0].style.textAlign).toBe('center')
  })

  it('applies cell-level text alignment over column alignment', () => {
    renderFooter({ ...baseProps, cellTextAlign: { [`R${baseCells.length}C0`]: 'right' }, columnTextAlign: { 0: 'center' } })
    const tds = document.querySelectorAll<HTMLElement>('tfoot td')
    expect(tds[0].style.textAlign).toBe('right')
  })
})
