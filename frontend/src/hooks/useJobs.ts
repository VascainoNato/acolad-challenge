import { useEffect, useState } from 'react'
import { jobService } from '../services/jobService'
import type { Job } from '../types/job'

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    jobService
      .getAll()
      .then((data) => {
        if (active) setJobs(data)
      })
      .catch(() => {
        if (active) setError(true)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const upcoming = jobs.filter((job) => job.status === 'upcoming')
  const recent = jobs.filter((job) => job.status === 'completed')

  return { jobs, upcoming, recent, isLoading, error }
}
