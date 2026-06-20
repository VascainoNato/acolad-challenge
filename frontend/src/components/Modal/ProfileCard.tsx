import type { Profile } from '../../types/profile'
import Form from '../Icons/Form'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Stat from '../ui/Stat'

interface ProfileCardProps {
  profile: Profile
  onViewHistory: () => void
}

function ProfileCard({ profile, onViewHistory }: ProfileCardProps) {
  const { name, initials, role, languages, verified, stats } = profile

  return (
    <Card className="relative p-4 sm:p-6">
      <Button
        variant="icon"
        onClick={onViewHistory}
        aria-label="View professional history"
        title="View professional history"
        className="absolute top-4 right-4 h-10 w-10"
      >
        <Form className="h-5 w-5 dark:invert" />
      </Button>

      <div className="flex items-start gap-4 pr-12">
        <Avatar initials={initials} />
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{role}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {languages.map((language) => (
              <Badge key={language} size="md" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {language}
              </Badge>
            ))}
            {verified && (
              <Badge size="md" className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                Verified
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Stat value={stats.totalJobs} label="Total jobs" />
        <Stat value={stats.rating} accent={stats.ratingLabel} label="Avg rating" />
        <Stat value={stats.memberSince} label="Member since" />
      </div>
    </Card>
  )
}

export default ProfileCard
