import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { registerPWA, registerSW } from '../pwa'

beforeEach(() => {
  vi.unstubAllGlobals()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('registerPWA', () => {
  it('does nothing in development mode', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    registerPWA()
    expect(addEventListenerSpy).not.toHaveBeenCalled()
  })

  it('does nothing when serviceWorker is unavailable', () => {
    vi.stubGlobal('navigator', {})
    registerPWA()
  })

  it('does not throw when called multiple times', () => {
    expect(() => {
      registerPWA()
      registerPWA()
      registerPWA()
    }).not.toThrow()
  })
})

describe('registerSW', () => {
  const mockRegister = vi.fn()
  const mockAddEventListener = vi.fn()
  const mockPostMessage = vi.fn()
  const mockReload = vi.fn()

  function setupServiceWorker(overrides: Record<string, unknown> = {}) {
    const mockRegistration = {
      installing: null,
      addEventListener: mockAddEventListener,
      ...overrides,
    }
    mockRegister.mockResolvedValue(mockRegistration)
    vi.stubGlobal('navigator', {
      serviceWorker: {
        register: mockRegister,
        controller: {} as ServiceWorker | null,
        addEventListener: vi.fn(),
      },
    })
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    })
    return mockRegistration
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockRegister.mockReset()
    mockReload.mockReset()
  })

  it('registers /sw.js', async () => {
    setupServiceWorker()
    await registerSW()
    expect(mockRegister).toHaveBeenCalledWith('/sw.js')
  })

  it('listens for updatefound on registration', async () => {
    const reg = setupServiceWorker()
    await registerSW()
    expect(reg.addEventListener).toHaveBeenCalledWith('updatefound', expect.any(Function))
  })

  it('sends SKIP_WAITING when new SW is installed and controller exists', async () => {
    const mockNewSW = {
      state: 'installed',
      addEventListener: vi.fn((_event: string, handler: () => void) => {
        handler()
      }),
      postMessage: mockPostMessage,
    }
    const reg = setupServiceWorker({ installing: mockNewSW })
    reg.addEventListener = vi.fn((_event: string, handler: () => void) => {
      handler()
    })

    await registerSW()
    await vi.dynamicImportSettled?.()

    expect(mockNewSW.postMessage).toHaveBeenCalledWith({ type: 'SKIP_WAITING' })
  })

  it('does not send SKIP_WAITING when controller is null', async () => {
    const mockNewSW = {
      state: 'installed',
      addEventListener: vi.fn((_event: string, handler: () => void) => {
        handler()
      }),
      postMessage: mockPostMessage,
    }
    const reg = setupServiceWorker({ installing: mockNewSW })
    reg.addEventListener = vi.fn((_event: string, handler: () => void) => {
      handler()
    })
    vi.stubGlobal('navigator', {
      serviceWorker: {
        register: mockRegister,
        controller: null,
        addEventListener: vi.fn(),
      },
    })

    await registerSW()

    expect(mockPostMessage).not.toHaveBeenCalled()
  })

  it('does not send SKIP_WAITING when installing is null', async () => {
    setupServiceWorker()
    const reg = {
      installing: null,
      addEventListener: vi.fn((_event: string, handler: () => void) => {
        handler()
      }),
    }
    mockRegister.mockResolvedValue(reg)

    await registerSW()

    expect(mockPostMessage).not.toHaveBeenCalled()
  })

  it('reloads page on controllerchange', async () => {
    const mockControllerAddEventListener = vi.fn((_event: string, handler: () => void) => {
      handler()
    })
    setupServiceWorker()
    vi.stubGlobal('navigator', {
      serviceWorker: {
        register: mockRegister,
        controller: {} as ServiceWorker | null,
        addEventListener: mockControllerAddEventListener,
      },
    })
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    })

    await registerSW()

    expect(mockControllerAddEventListener).toHaveBeenCalledWith('controllerchange', expect.any(Function))
  })

  it('reloads page only once on repeated controllerchange', async () => {
    let handler: () => void = () => {}
    const mockControllerAddEventListener = vi.fn((_event: string, h: () => void) => {
      handler = h
    })
    setupServiceWorker()
    vi.stubGlobal('navigator', {
      serviceWorker: {
        register: mockRegister,
        controller: {} as ServiceWorker | null,
        addEventListener: mockControllerAddEventListener,
      },
    })
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    })

    await registerSW()
    handler()
    handler()
    handler()

    expect(mockReload).toHaveBeenCalledTimes(1)
  })

  it('handles registration failure silently', async () => {
    mockRegister.mockRejectedValue(new Error('Network error'))
    vi.stubGlobal('navigator', {
      serviceWorker: {
        register: mockRegister,
        controller: null,
        addEventListener: vi.fn(),
      },
    })

    await expect(registerSW()).resolves.toBeUndefined()
  })

  it('does not reload when there is no previous controller', async () => {
    const mockControllerAddEventListener = vi.fn()
    setupServiceWorker()
    vi.stubGlobal('navigator', {
      serviceWorker: {
        register: mockRegister,
        controller: null,
        addEventListener: mockControllerAddEventListener,
      },
    })

    await registerSW()

    expect(mockReload).not.toHaveBeenCalled()
  })
})
