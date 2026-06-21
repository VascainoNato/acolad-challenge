import { useState } from 'react'
import { aiService } from '../services/aiService'

const ERROR_MESSAGE =
  "Sorry, I couldn't explain this credential's trust level right now. Please try again in a moment."

export function useTrustExplanation(credentialId: string) {
  const [explanation, setExplanation] = useState('')
  const [isExplaining, setIsExplaining] = useState(false)

  async function explain() {
    if (isExplaining) return
    setExplanation('')
    setIsExplaining(true)

    try {
      await aiService.explainTrust(credentialId, (chunk) => setExplanation((s) => s + chunk))
    } catch {
      setExplanation((s) => s || ERROR_MESSAGE)
    } finally {
      setIsExplaining(false)
    }
  }

  return { explanation, isExplaining, explain }
}
