import i18n from 'i18next'
import { toast } from './utils/toast/toast'

function pwaMessage(): string {
  try {
    return i18n.isInitialized ? i18n.t('toast.pwaUpdate') : 'A new version is available. Reloading…'
  } catch {
    return 'A new version is available. Reloading…'
  }
}

let lastVersion: string | null = null

export function registerPWA(): void {
  if (!import.meta.env.PROD) return
  if (!('serviceWorker' in navigator)) return
  window.addEventListener('load', () => {
    registerSW()
    startVersionPolling()
  })
}

export async function registerSW(): Promise<void> {
  try {
    const reg = await navigator.serviceWorker.register('/sw.js')

    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing
      if (!newSW) return
      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
          toast.info(pwaMessage())
          newSW.postMessage({ type: 'SKIP_WAITING' })
        }
      })
    })

    let refreshing = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return
      refreshing = true
      window.location.reload()
    })
  } catch {
    /* Service worker unavailable */
  }
}

async function checkForUpdates(): Promise<void> {
  try {
    const res = await fetch('/version.json?t=' + Date.now(), { cache: 'no-store' })
    if (!res.ok) return
    const data = await res.json() as { version: string }
    if (lastVersion === null) {
      lastVersion = data.version
      return
    }
    if (data.version !== lastVersion) {
      lastVersion = data.version
      toast.info(pwaMessage())
      setTimeout(() => { window.location.reload() }, 2000)
    }
  } catch {
    /* Polling unavailable */
  }
}

let pollingInterval: ReturnType<typeof setInterval> | null = null

function startVersionPolling(): void {
  if (pollingInterval) return
  checkForUpdates()
  pollingInterval = setInterval(checkForUpdates, 60_000)
}

if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (pollingInterval) clearInterval(pollingInterval)
  })
}
