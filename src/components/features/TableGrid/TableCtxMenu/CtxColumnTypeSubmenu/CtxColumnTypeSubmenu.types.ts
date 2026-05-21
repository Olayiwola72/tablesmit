import type { ColumnFormat } from '../../../../../context/table.types'

export interface CtxColumnTypeSubmenuProps {
  currentFormat: string | undefined
  onChange: (format: ColumnFormat) => void
  onClose: () => void
}
