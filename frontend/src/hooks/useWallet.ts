import { useEffect, useRef, useState } from 'react'
import { useConnection } from '../context/ConnectionContext'
import { notify } from '../lib/toast'

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const { isOnline } = useConnection()
  const wasOnline = useRef(isOnline)

  const connect = () => {
    if (isConnected || isConnecting || !isOnline) return

    setIsConnecting(true)
    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)
      notify.walletConnected()
    }, 1000)
  }

  useEffect(() => {
    if (wasOnline.current && !isOnline) {
      setIsConnected(false)
      setIsConnecting(false)
    }
    wasOnline.current = isOnline
  }, [isOnline])

  return { isConnected, isConnecting, connect }
}
