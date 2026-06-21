import { api } from './api'
import type { Profile } from '../types/profile'

export const profileService = {
  async get(): Promise<Profile> {
    const { data } = await api.get<Profile>('/profile')
    return data
  },
}
