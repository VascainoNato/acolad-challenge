import type { CredentialStatus } from '../types/credential'
import type { PaymentStatus } from '../types/job'

export const jobStatusColor: Record<PaymentStatus, string> = {
  paid: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}

export const credentialStatusColor: Record<CredentialStatus, string> = {
  verified: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  expiring: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  expired: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}
