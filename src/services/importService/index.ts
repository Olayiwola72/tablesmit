import type { ImportFormat, ImportResult, ImportStrategy } from './import.types'

async function loadImporter(format: ImportFormat): Promise<ImportStrategy> {
  switch (format) {
    case 'csv': {
      const { CsvImporter } = await import('./impl/csvImporter')
      return new CsvImporter()
    }
    case 'excel': {
      const { ExcelImporter } = await import('./impl/excelImporter')
      return new ExcelImporter()
    }
  }
}

export async function importFile(file: File): Promise<ImportResult> {
  const name = file.name.toLowerCase()
  const format: ImportFormat = name.endsWith('.csv') ? 'csv' : 'excel'
  const importer = await loadImporter(format)
  return importer.importFile(file)
}

export async function importCsv(file: File): Promise<ImportResult> {
  const importer = await loadImporter('csv')
  return importer.importFile(file)
}

export async function importExcel(file: File): Promise<ImportResult> {
  const importer = await loadImporter('excel')
  return importer.importFile(file)
}
