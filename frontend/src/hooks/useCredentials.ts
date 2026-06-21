import { useEffect, useState } from 'react'
import { credentialService } from '../services/credentialService'
import type { Credential } from '../types/credential'

export function useCredentials() {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [loaded, setLoaded] = useState(false)

  const toggle = () => setIsOpen((open) => !open)

  useEffect(() => {
    if (!isOpen || loaded) return

    let active = true
    setIsLoading(true)

    credentialService
      .getAll()
      .then((data) => {
        if (active) {
          setCredentials(data)
          setLoaded(true)
        }
      })
      .catch(() => {
        if (active) setError(true)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [isOpen, loaded])

  return { credentials, isLoading, error, isOpen, toggle }
}
