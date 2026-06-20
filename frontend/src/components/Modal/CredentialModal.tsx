import type { Credential } from '../../types/credential'
import Sparkles from '../Icons/Sparkles'
import Modal from '../ui/Modal'
import CloseButton from '../ui/CloseButton'
import Badge from '../ui/Badge'
import Detail from '../ui/Detail'
import Button from '../ui/Button'
import TypingDots from '../ui/TypingDots'
import { credentialStatusColor } from '../../lib/statusColors'
import { useTrustExplanation } from '../../hooks/useTrustExplanation'
import { useConnection } from '../../context/ConnectionContext'

function CredentialModal({ credential, onClose }: { credential: Credential; onClose: () => void }) {
  const { explanation, isExplaining, explain } = useTrustExplanation(credential.id)
  const { isOnline } = useConnection()
  const hasExplanation = isExplaining || explanation.length > 0

  return (
    <Modal onClose={onClose} labelledBy="credential-modal-title">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400 dark:text-gray-500">{credential.type}</p>
          <h3 id="credential-modal-title" className="text-xl font-bold text-gray-900 dark:text-gray-100">{credential.name}</h3>
        </div>
        <CloseButton onClose={onClose} />
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <Badge className={credentialStatusColor[credential.status]}>{credential.status}</Badge>
        <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          {credential.trustLevel} trust
        </Badge>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <div className="flex gap-4">
          <Detail label="Issuer" value={credential.issuer} />
          <Detail label="Type" value={credential.type} />
        </div>
        <div className="flex gap-4">
          <Detail label="Issued" value={credential.issued} />
          <Detail label="Expires" value={credential.expires ?? 'No expiry'} />
        </div>
        <div className="flex gap-4">
          <Detail label="Status" value={credential.status} />
          <Detail label="Trust level" value={credential.trustLevel} />
        </div>
      </div>

      <Button
        variant="outline"
        onClick={explain}
        disabled={isExplaining || !isOnline}
        title={isOnline ? undefined : "You're offline — IDA is unavailable"}
        className="mt-5 inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Sparkles className="h-4 w-4 dark:invert" />
        Why is this trusted?
      </Button>

      {hasExplanation && (
        <div className="mt-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 dark:invert" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Trust explained by IDA</p>
          </div>
          <div className="mt-3 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
            {explanation || <TypingDots />}
          </div>
        </div>
      )}
    </Modal>
  )
}

export default CredentialModal
