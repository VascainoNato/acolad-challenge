import { useProfile } from '../../hooks/useProfile'
import { useJobs } from '../../hooks/useJobs'
import { useCredentials } from '../../hooks/useCredentials'
import { useJobModal } from '../../hooks/useJobModal'
import { useProfileHistory } from '../../hooks/useProfileHistory'
import ProfileCard from '../Modal/ProfileCard'
import JobsList from '../Sections/JobsList'
import JobModal from '../Modal/JobModal'
import ProfileHistoryModal from '../Modal/ProfileHistoryModal'

function Dashboard() {
  const { profile, isLoading: loadingProfile, error: profileError } = useProfile()
  const { jobs, upcoming, recent, isLoading: loadingJobs, error: jobsError } = useJobs()
  const { credentials } = useCredentials()
  const { selectedJob, openJob, closeJob } = useJobModal()
  const history = useProfileHistory(credentials, jobs)

  if (loadingProfile || loadingJobs) {
    return <div className="p-4 text-gray-500 dark:text-gray-400">Loading...</div>
  }

  if (profileError || jobsError || !profile) {
    return <div className="p-4 text-red-600 dark:text-red-400">Failed to load dashboard data.</div>
  }

  return (
    <div className="h-full max-w-3xl mx-auto w-full flex flex-col gap-6 p-4 lg:p-8">
      <h1 className="sr-only">Dashboard</h1>
      <ProfileCard profile={profile} onViewHistory={history.open} />
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <JobsList upcoming={upcoming} recent={recent} onSelect={openJob} />
      </div>

      {selectedJob && <JobModal job={selectedJob} onClose={closeJob} />}

      {history.isOpen && (
        <ProfileHistoryModal
          summary={history.summary}
          isGenerating={history.isGenerating}
          timeline={history.timeline}
          onClose={history.close}
          onGenerateSummary={history.generateSummary}
        />
      )}
    </div>
  )
}

export default Dashboard
