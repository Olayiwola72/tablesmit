import { colors } from '../../config/colors/colorsConfig'

export function getContrastText(hex: string): string {
  const normalized = hex.replace('#', '')
  const red = Number.parseInt(normalized.slice(0, 2), 16)
  const green = Number.parseInt(normalized.slice(2, 4), 16)
  const blue = Number.parseInt(normalized.slice(4, 6), 16)
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000
  return brightness > colors.contrastText.threshold
    ? colors.contrastText.lightBackgroundText
    : colors.contrastText.darkBackgroundText
}

const DARK_BG_MAP: Record<string, string> = {
  '#ffffff': '#0f172a',
  '#f3f4f6': '#1e293b',
  '#f9fafb': '#334155',
}

export function getDarkBg(hex: string): string {
  return DARK_BG_MAP[hex.toLowerCase()] ?? hex
}
