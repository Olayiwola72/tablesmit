import { describe, it, expect, vi, afterEach } from 'vitest'
import { exportTable } from '../../../services/exportService/exportService'

vi.mock('../../../services/exportService/index', () => ({
  exportTable: vi.fn().mockResolvedValue(undefined),
}))

describe('exportService (exportTable dispatch)', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('calls the index exportTable with element and options', async () => {
    const el = document.createElement('div')
    const opts = { format: 'pdf' as const }

    await expect(exportTable(el, opts)).resolves.toBeUndefined()
  })

  it('throws when index exportTable rejects', async () => {
    const mod = await import('../../../services/exportService/index')
    vi.mocked(mod.exportTable).mockRejectedValueOnce(new Error('fail'))

    const el = document.createElement('div')
    const opts = { format: 'pdf' as const }

    await expect(exportTable(el, opts)).rejects.toThrow('fail')
  })
})
