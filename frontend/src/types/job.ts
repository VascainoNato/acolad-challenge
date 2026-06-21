export type JobStatus = 'completed' | 'upcoming'
export type JobCategory = 'Healthcare' | 'Legal' | 'Government'
export type PaymentStatus = 'paid' | 'pending' | 'cancelled'

export interface Job {
  id: string
  client: string
  clientContact: string
  type: string
  category: JobCategory
  date: string
  time: string
  duration: string
  status: JobStatus
  payment: string
  paymentStatus: PaymentStatus
  location: string
  languages: string[]
  notes: string
  rating: number | null
}
