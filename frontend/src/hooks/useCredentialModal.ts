import { useState } from 'react'
import type { Credential } from '../types/credential'

export function useCredentialModal() {
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)

  const openCredential = (credential: Credential) => setSelectedCredential(credential)
  const closeCredential = () => setSelectedCredential(null)

  return { selectedCredential, openCredential, closeCredential }
}
