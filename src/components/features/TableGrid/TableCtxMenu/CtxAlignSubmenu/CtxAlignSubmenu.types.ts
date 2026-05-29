import type { TextAlign } from '@/context/TableState/TableState.types'

export interface CtxAlignSubmenuProps {
  currentAlign: string
  onChange: (align: TextAlign) => void
  onClose: () => void
}
