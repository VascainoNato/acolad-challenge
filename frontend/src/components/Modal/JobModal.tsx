import type { Job } from '../../types/job'
import Modal from '../ui/Modal'
import CloseButton from '../ui/CloseButton'
import Badge from '../ui/Badge'
import Detail from '../ui/Detail'
import { jobStatusColor } from '../../lib/statusColors'

function JobModal({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <Modal onClose={onClose} labelledBy="job-modal-title">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 id="job-modal-title" className="text-xl font-bold text-gray-900 dark:text-gray-100">{job.client}</h3>
          <p className="text-gray-500 dark:text-gray-400">{job.type}</p>
        </div>
        <CloseButton onClose={onClose} />
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{job.category}</Badge>
        <Badge className={jobStatusColor[job.paymentStatus]}>{job.paymentStatus}</Badge>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <div className="flex gap-4">
          <Detail label="Date" value={job.date} />
          <Detail label="Time" value={job.time} />
        </div>
        <div className="flex gap-4">
          <Detail label="Duration" value={job.duration} />
          <Detail label="Location" value={job.location} />
        </div>
        <div className="flex gap-4">
          <Detail label="Contact" value={job.clientContact} />
          <Detail label="Payment" value={job.payment} />
        </div>
        <div className="flex gap-4">
          <Detail label="Languages" value={job.languages.join(', ')} />
          <Detail label="Rating" value={job.rating ? '★'.repeat(job.rating) : '—'} />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-gray-400 dark:text-gray-500">Notes</p>
        <p className="text-gray-700 dark:text-gray-300 mt-1">{job.notes}</p>
      </div>
    </Modal>
  )
}

export default JobModal
