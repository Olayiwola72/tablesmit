import type { TextAlign } from '@/types/table'

export interface CtxAlignSubmenuProps {
  currentAlign: string
  onChange: (align: TextAlign) => void
  onClose: () => void
}
