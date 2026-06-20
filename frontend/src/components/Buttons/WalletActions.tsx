import Button from '../ui/Button'
import Spinner from '../ui/Spinner'
import { useConnection } from '../../context/ConnectionContext'

interface WalletActionsProps {
  onConnect: () => void
  isConnecting: boolean
  isConnected: boolean
  onToggleCredentials: () => void
}

function WalletActions({
  onConnect,
  isConnecting,
  isConnected,
  onToggleCredentials,
}: WalletActionsProps) {
  const { isOnline } = useConnection()

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <Button
        variant="secondary"
        onClick={onConnect}
        disabled={isConnecting || isConnected || !isOnline}
        title={isOnline ? undefined : "You're offline — connect when you're back online"}
        className="flex-1 disabled:cursor-not-allowed"
      >
        {isConnecting && <Spinner className="h-5 w-5" />}
        {isConnected ? 'Wallet Connected' : isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>

      <Button variant="secondary" onClick={onToggleCredentials} className="flex-1">
        Credentials
      </Button>
    </div>
  )
}

export default WalletActions
