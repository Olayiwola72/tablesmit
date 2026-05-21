import type { TableTheme } from '../../../../context/table.types'

export interface ThemeDropdownProps {
  theme: TableTheme
  onSetTheme: (theme: TableTheme) => void
}
