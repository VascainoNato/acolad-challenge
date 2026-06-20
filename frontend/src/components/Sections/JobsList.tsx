import type { Job } from '../../types/job'
import JobCard from '../Cards/JobCard'

interface JobsListProps {
  upcoming: Job[]
  recent: Job[]
  onSelect: (job: Job) => void
}

function JobsList({ upcoming, recent, onSelect }: JobsListProps) {
  return (
    <div className="flex flex-col gap-6">
      {upcoming.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Upcoming</h3>
          {upcoming.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => onSelect(job)} />
          ))}
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Recent jobs ({recent.length})</h3>
        {recent.map((job) => (
          <JobCard key={job.id} job={job} onClick={() => onSelect(job)} />
        ))}
      </section>
    </div>
  )
}

export default JobsList
