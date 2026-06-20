import { useProfile } from '../../hooks/useProfile'
import { useWallet } from '../../hooks/useWallet'
import { useCredentials } from '../../hooks/useCredentials'
import { useCredentialModal } from '../../hooks/useCredentialModal'
import WalletActions from '../Buttons/WalletActions'
import WalletCard from '../Cards/WalletCard'
import CredentialsList from '../Sections/CredentialsList'
import CredentialModal from '../Modal/CredentialModal'
import Spinner from '../ui/Spinner'

function Wallet() {
  const { profile, isLoading: loadingProfile, error: profileError } = useProfile()
  const { isConnected, isConnecting, connect } = useWallet()
  const { credentials, isLoading: loadingCreds, error: credsError, isOpen, toggle } = useCredentials()
  const { selectedCredential, openCredential, closeCredential } = useCredentialModal()

  if (loadingProfile) {
    return <div className="p-4 text-gray-500 dark:text-gray-400">Loading...</div>
  }

  if (profileError || !profile) {
    return <div className="p-4 text-red-600 dark:text-red-400">Failed to load wallet data.</div>
  }

  return (
    <div className="h-full max-w-3xl mx-auto w-full flex flex-col gap-6 p-4 lg:p-8 overflow-y-auto no-scrollbar">
      <h1 className="sr-only">Identity Wallet</h1>
      <WalletActions
        onConnect={connect}
        isConnecting={isConnecting}
        isConnected={isConnected}
        onToggleCredentials={toggle}
      />

      <WalletCard profile={profile} isConnected={isConnected} />

      {isOpen &&
        (loadingCreds ? (
          <div className="flex justify-center py-6">
            <Spinner className="h-6 w-6" />
          </div>
        ) : credsError ? (
          <div className="text-red-600 dark:text-red-400">Failed to load credentials.</div>
        ) : (
          <CredentialsList credentials={credentials} onSelect={openCredential} />
        ))}

      {selectedCredential && (
        <CredentialModal credential={selectedCredential} onClose={closeCredential} />
      )}
    </div>
  )
}

export default Wallet
