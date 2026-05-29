import type { TableTheme } from '@/context/TableState/TableState.types'

export interface ThemeDropdownProps {
  theme: TableTheme
  onSetTheme: (theme: TableTheme) => void
}
