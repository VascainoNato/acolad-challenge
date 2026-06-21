import { createContext, useContext, type ReactNode } from 'react'
import { useConnectionState, type ConnectionStatus } from '../hooks/useConnection'

interface ConnectionContextValue {
  status: ConnectionStatus
  isOnline: boolean
  check: () => void
}

const ConnectionContext = createContext<ConnectionContextValue | undefined>(undefined)

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const value = useConnectionState()
  return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>
}

export function useConnection() {
  const context = useContext(ConnectionContext)
  if (!context) {
    throw new Error('useConnection must be used within a ConnectionProvider')
  }
  return context
}
