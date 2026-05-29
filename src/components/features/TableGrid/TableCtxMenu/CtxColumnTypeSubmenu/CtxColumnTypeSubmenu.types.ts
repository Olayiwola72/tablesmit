import type { ColumnFormat } from '@/config/columnFormats/columnFormats.types'

export interface CtxColumnTypeSubmenuProps {
  currentFormat: string | undefined
  onChange: (format: ColumnFormat) => void
  onClose: () => void
}
