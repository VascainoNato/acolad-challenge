import type { Credential } from '../../types/credential'
import CredentialCard from '../Cards/CredentialCard'

interface CredentialsListProps {
  credentials: Credential[]
  onSelect: (credential: Credential) => void
}

function CredentialsList({ credentials, onSelect }: CredentialsListProps) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="font-semibold text-gray-700 dark:text-gray-300">Verified Credentials ({credentials.length})</h3>
      {credentials.map((credential) => (
        <CredentialCard
          key={credential.id}
          credential={credential}
          onClick={() => onSelect(credential)}
        />
      ))}
    </section>
  )
}

export default CredentialsList
