import { api } from './api'
import type { Job } from '../types/job'

export const jobService = {
  async getAll(): Promise<Job[]> {
    const { data } = await api.get<Job[]>('/jobs')
    return data
  },

  async getById(id: string): Promise<Job> {
    const { data } = await api.get<Job>(`/jobs/${id}`)
    return data
  },
}
