import type { Job } from '../../types/job'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { jobStatusColor } from '../../lib/statusColors'

function JobCard({ job, onClick }: { job: Job; onClick: () => void }) {
  return (
    <Card
      as="button"
      type="button"
      onClick={onClick}
      className="w-full text-left p-5 transition-shadow hover:shadow-md cursor-pointer focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-gray-900 dark:text-gray-100">{job.client}</h4>
            <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{job.category}</Badge>
          </div>
          <p className="text-gray-500 dark:text-gray-400">{job.type}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            {job.date} · {job.duration}
            {job.rating ? ` · ${'★'.repeat(job.rating)}` : ''}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-gray-900 dark:text-gray-100">{job.payment}</p>
          <Badge className={jobStatusColor[job.paymentStatus]}>{job.paymentStatus}</Badge>
        </div>
      </div>
    </Card>
  )
}

export default JobCard
