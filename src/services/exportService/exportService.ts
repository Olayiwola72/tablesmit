import type { ExportOptions } from './export.types'

export async function exportTable(element: HTMLElement, options: ExportOptions): Promise<void> {
  const { exportTable: exec } = await import('./index')
  return exec(element, options)
}
