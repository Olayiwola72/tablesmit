export function registerPWA(): void {
  if (!import.meta.env.PROD) return
  if (!('serviceWorker' in navigator)) return
  window.addEventListener('load', () => { registerSW() })
}

export async function registerSW(): Promise<void> {
  try {
    const reg = await navigator.serviceWorker.register('/sw.js')

    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing
      if (!newSW) return
      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
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
