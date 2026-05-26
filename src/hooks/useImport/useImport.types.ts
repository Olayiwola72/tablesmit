export interface ImportApi {
  error: string | null
  isImporting: boolean
  importFile: (file: File, kind: 'csv' | 'excel') => Promise<void>
}
