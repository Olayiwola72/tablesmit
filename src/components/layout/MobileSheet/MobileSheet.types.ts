import type { ReactNode } from 'react'

export interface MobileSheetProps {
  title: string
  open: boolean
  onClose: () => void
  children: ReactNode
}
