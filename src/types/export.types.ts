export type ExportFormat = 'pdf' | 'png' | 'jpeg' | 'excel'

export interface ExportOptions {
  format: ExportFormat
  filename?: string
  quality?: number
}

export interface ExportStrategy {
  export(element: HTMLElement, options: ExportOptions): Promise<void>
}
