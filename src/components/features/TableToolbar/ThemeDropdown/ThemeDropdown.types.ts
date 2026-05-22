import type { TableTheme } from '@/types/table'

export interface ThemeDropdownProps {
  theme: TableTheme
  onSetTheme: (theme: TableTheme) => void
}
