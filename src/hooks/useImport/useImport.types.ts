export interface ImportApi {
  error: string | null
  importFile: (file: File, kind: 'csv' | 'excel') => Promise<void>
}
