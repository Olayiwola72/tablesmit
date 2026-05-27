export function tryParseNumber(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const num = Number(trimmed.replace(/[$,%\s,]/g, ''))
  return Number.isNaN(num) ? null : num
}
