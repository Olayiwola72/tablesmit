import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

/* DataTransfer + ClipboardEvent polyfill for jsdom (used by clipboard paste tests) */
if (typeof DataTransfer === 'undefined') {
  const DataTransferMock = class DataTransfer {
    data: Record<string, string> = {}
    setData(type: string, value: string): void { this.data[type] = value }
    getData(type: string): string { return this.data[type] ?? '' }
    get types(): string[] { return Object.keys(this.data) }
    get items(): DataTransferItem[] {
      return Object.entries(this.data).map(
        ([type, value]) => ({ type, kind: 'string' as const, getAsString: (cb: (s: string) => void) => cb(value) }) as unknown as DataTransferItem,
      )
    }
    get files(): FileList { return [] as unknown as FileList }
    clearData(): void { this.data = {} }
  }
  globalThis.DataTransfer = DataTransferMock as unknown as typeof DataTransfer
}

if (typeof ClipboardEvent === 'undefined') {
  globalThis.ClipboardEvent = class ClipboardEvent extends Event {
    clipboardData: DataTransfer | null
    constructor(type: string, opts?: ClipboardEventInit) {
      super(type, opts)
      this.clipboardData = opts?.clipboardData ?? null
    }
  } as unknown as typeof ClipboardEvent
}

afterEach(() => {
  cleanup()
})
