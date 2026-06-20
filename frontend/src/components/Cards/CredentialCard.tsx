import type { Credential } from '../../types/credential'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { credentialStatusColor } from '../../lib/statusColors'

function CredentialCard({ credential, onClick }: { credential: Credential; onClick: () => void }) {
  return (
    <Card
      as="button"
      type="button"
      onClick={onClick}
      className="w-full text-left p-5 transition-shadow hover:shadow-md cursor-pointer focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400 dark:text-gray-500">{credential.type}</p>
          <h4 className="font-bold text-gray-900 dark:text-gray-100">{credential.name}</h4>
          <p className="text-gray-500 dark:text-gray-400">{credential.issuer}</p>
          {credential.expires && (
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Expires {credential.expires}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Badge className={credentialStatusColor[credential.status]}>{credential.status}</Badge>
          <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            {credential.trustLevel} trust
          </Badge>
        </div>
      </div>
    </Card>
  )
}

export default CredentialCard
