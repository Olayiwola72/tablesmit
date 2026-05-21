export type Theme = 'light' | 'dark'

export interface ThemeApi {
  theme: Theme
  toggle: () => void
}
