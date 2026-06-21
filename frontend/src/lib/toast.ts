import { toast } from 'react-hot-toast'

export const notify = {
  backOnline: () => toast.success('Back online', { id: 'net-online' }),
  offline: () => toast.error('You are offline', { id: 'net-offline' }),
  walletConnected: () => toast.success('Wallet connected', { id: 'wallet-connected' }),
}

export { toast }
