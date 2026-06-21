export type CredentialStatus = 'verified' | 'expiring' | 'expired'
export type TrustLevel = 'High' | 'Medium' | 'Low'

export interface Credential {
  id: string
  type: string
  name: string
  issuer: string
  issued: string
  expires: string | null
  status: CredentialStatus
  trustLevel: TrustLevel
}
