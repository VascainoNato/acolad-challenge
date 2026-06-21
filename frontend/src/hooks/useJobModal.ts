import { useState } from 'react'
import type { Job } from '../types/job'

export function useJobModal() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const openJob = (job: Job) => setSelectedJob(job)
  const closeJob = () => setSelectedJob(null)

  return { selectedJob, openJob, closeJob }
}
