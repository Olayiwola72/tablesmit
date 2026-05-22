import type { ColumnFormat } from '@/types/table'

export interface CtxColumnTypeSubmenuProps {
  currentFormat: string | undefined
  onChange: (format: ColumnFormat) => void
  onClose: () => void
}
