import { useConnection } from '../../context/ConnectionContext'

function OfflineBanner() {
  const { status } = useConnection()
  if (status !== 'offline') return null

  return (
    <div className="bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 text-center text-sm py-1.5 px-4">
      You're offline — showing your saved wallet. IDA is unavailable until you reconnect.
    </div>
  )
}

export default OfflineBanner
