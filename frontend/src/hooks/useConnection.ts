import { useCallback, useEffect, useRef, useState } from 'react'
import { notify } from '../lib/toast'

export type ConnectionStatus = 'online' | 'offline' | 'checking'

const PROBE_URL = '/api/profile'
const TIMEOUT_MS = 4000

async function probe(): Promise<boolean> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(PROBE_URL, {
      method: 'HEAD',
      cache: 'no-store',
      signal: controller.signal,
    })
    return res.ok
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

export function useConnectionState() {
  const [status, setStatus] = useState<ConnectionStatus>(
    typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : 'checking',
  )

  const check = useCallback(async () => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setStatus('offline')
      return
    }
    setStatus('checking')
    const reachable = await probe()
    setStatus(reachable ? 'online' : 'offline')
  }, [])

  const prevStatus = useRef<ConnectionStatus>(status)
  useEffect(() => {
    if (status === 'checking') return
    const prev = prevStatus.current
    if (prev === 'offline' && status === 'online') {
      notify.backOnline()
    } else if (prev === 'online' && status === 'offline') {
      notify.offline()
    }
    prevStatus.current = status
  }, [status])

  useEffect(() => {
    let cancelled = false

    if (typeof navigator === 'undefined' || navigator.onLine) {
      probe().then((reachable) => {
        if (!cancelled) setStatus(reachable ? 'online' : 'offline')
      })
    }

    const onOnline = () => check()
    const onOffline = () => setStatus('offline')
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      cancelled = true
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [check])

  return { status, isOnline: status === 'online', check }
}
