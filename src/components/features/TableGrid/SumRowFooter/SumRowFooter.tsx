import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { SumRowFooterProps } from './SumRowFooter.types'

export function SumRowFooter({ cells, sumCols, columnTotals, borderStyle, borderColor, columnTextAlign, cellTextAlign }: SumRowFooterProps): ReactNode {
  const { t } = useTranslation(['common', 'table'])

  if (sumCols.length === 0) return null

  return (
    <tfoot>
      <tr className="border-t-2 border-primary/30 bg-surface text-xs font-semibold text-text-primary">
        {cells[0]?.map((_cell, colIndex) => {
          const total = columnTotals[colIndex]
          const isSum = sumCols.includes(colIndex)
          const isFirstSum = colIndex === sumCols[0]
          return (
            <td
              key={`footer-${colIndex}`}
              className="px-2 py-1.5"
              style={{
                border: borderStyle === 'none' ? 'none' : `1px ${borderStyle} ${borderColor}`,
                textAlign: (cellTextAlign[`R${cells.length}C${colIndex}`] || columnTextAlign[colIndex] || 'left') as React.CSSProperties['textAlign'],
              }}
            >
              {isSum ? (
                <span>
                  {isFirstSum ? <span className="mr-1 text-text-muted">{t('table.sum')}:</span> : null}
                  {total.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                </span>
              ) : ''}
            </td>
          )
        })}
      </tr>
    </tfoot>
  )
}
