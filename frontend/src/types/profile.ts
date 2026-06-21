export interface ProfileStats {
  totalJobs: number
  rating: number
  ratingLabel: string
  memberSince: number
}

export interface Profile {
  name: string
  initials: string
  role: string
  languages: string[]
  verified: boolean
  issuer: string
  wallet: string
  walletId: string
  resident: string
  stats: ProfileStats
}
