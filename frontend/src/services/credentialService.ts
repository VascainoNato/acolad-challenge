import { api } from './api'
import type { Credential } from '../types/credential'

export const credentialService = {
  async getAll(): Promise<Credential[]> {
    const { data } = await api.get<Credential[]>('/credentials')
    return data
  },
}
