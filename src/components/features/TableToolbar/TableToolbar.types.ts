import type { RefObject } from 'react'
import type { ExportFormat } from '../../../services/exportService/export.types'

export interface TableToolbarProps {
  tableRef: RefObject<HTMLDivElement | null>
  isExporting?: boolean
  onExport?: (format: ExportFormat) => void
}
