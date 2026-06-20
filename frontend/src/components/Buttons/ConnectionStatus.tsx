import Badge from '../ui/Badge'
import Spinner from '../ui/Spinner'
import { useConnection } from '../../context/ConnectionContext'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900'

function ConnectionStatus() {
  const { status, check } = useConnection()
  const isChecking = status === 'checking'
  const isOnline = status === 'online'

  const badgeColor = isChecking
    ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
    : isOnline
      ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
      : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'

  const dotColor = isOnline ? 'bg-green-500' : 'bg-red-500'
  const label = isChecking ? 'Checking…' : isOnline ? 'Online' : 'Offline'

  return (
    <button
      type="button"
      onClick={check}
      disabled={isChecking}
      aria-label="Re-check connection"
      aria-live="polite"
      className={`rounded-full cursor-pointer disabled:cursor-wait ${FOCUS_RING}`}
    >
      <Badge className={`inline-flex items-center gap-1.5 ${badgeColor}`}>
        {isChecking ? (
          <Spinner className="h-3 w-3" />
        ) : (
          <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} aria-hidden="true" />
        )}
        <span>{label}</span>
        <span className="sr-only">{`Connection: ${label}`}</span>
      </Badge>
    </button>
  )
}

export default ConnectionStatus
