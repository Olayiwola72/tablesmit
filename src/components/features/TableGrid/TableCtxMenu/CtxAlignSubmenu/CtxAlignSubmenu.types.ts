import type { TextAlign } from '../../../../../context/table.types'

export interface CtxAlignSubmenuProps {
  currentAlign: string
  onChange: (align: TextAlign) => void
  onClose: () => void
}
