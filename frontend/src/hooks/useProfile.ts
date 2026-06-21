import { useEffect, useState } from 'react'
import { profileService } from '../services/profileService'
import type { Profile } from '../types/profile'

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    profileService
      .get()
      .then((data) => {
        if (active) setProfile(data)
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

  return { profile, isLoading, error }
}
