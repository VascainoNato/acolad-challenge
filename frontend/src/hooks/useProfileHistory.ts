import { useMemo, useState } from 'react'
import { aiService } from '../services/aiService'
import { buildTimeline } from '../lib/timeline'
import type { Credential } from '../types/credential'
import type { Job } from '../types/job'

const ERROR_MESSAGE =
  "Sorry, I couldn't generate the summary right now. Please try again in a moment."

/**
 * Drives the "Professional history" modal: builds the combined credentials+jobs
 * timeline and streams an IDA-generated summary of that history.
 */
export function useProfileHistory(credentials: Credential[], jobs: Job[]) {
  const [isOpen, setIsOpen] = useState(false)
  const [summary, setSummary] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const timeline = useMemo(
    () => buildTimeline(credentials, jobs),
    [credentials, jobs],
  )

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
    setSummary('')
  }

  async function generateSummary() {
    if (isGenerating) return
    setSummary('')
    setIsGenerating(true)

    try {
      await aiService.generateProfile((chunk) => setSummary((s) => s + chunk))
    } catch {
      setSummary((s) => s || ERROR_MESSAGE)
    } finally {
      setIsGenerating(false)
    }
  }

  return { isOpen, summary, isGenerating, timeline, open, close, generateSummary }
}
