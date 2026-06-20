import type { Profile } from '../../types/profile'
import Card from '../ui/Card'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'

function WalletCard({ profile, isConnected }: { profile: Profile; isConnected: boolean }) {
  const { name, initials, role, languages, resident, walletId } = profile

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">EU Digital Identity Wallet</p>
        </div>
        {isConnected ? (
          <Badge size="md" className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
            Connected
          </Badge>
        ) : (
          <Badge size="md" className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300">
            Unverified
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-4 mt-6">
        <Avatar initials={initials} />
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-400 dark:text-gray-500">Languages</p>
            <p className="text-gray-800 dark:text-gray-200">{languages.join(' · ')}</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-400 dark:text-gray-500">Country</p>
            <p className="text-gray-800 dark:text-gray-200">{resident}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400 dark:text-gray-500">Wallet ID</p>
          <p className="text-gray-800 dark:text-gray-200 tracking-wide">{walletId}</p>
        </div>
      </div>
    </Card>
  )
}

export default WalletCard
