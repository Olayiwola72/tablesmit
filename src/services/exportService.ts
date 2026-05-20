import type { ExportOptions } from '../types/export.types'

export async function exportTable(element: HTMLElement, options: ExportOptions): Promise<void> {
  const { exportTable: exec } = await import('./export/index')
  return exec(element, options)
}
