import type { Credential } from '../types/credential'
import type { Job } from '../types/job'
import type { TimelineItem } from '../types/timeline'

export function buildTimeline(credentials: Credential[], jobs: Job[]): TimelineItem[] {
  const credentialItems: TimelineItem[] = credentials.map((c) => ({
    id: `credential-${c.id}`,
    date: c.issued,
    title: c.name,
    subtitle: `Credential issued · ${c.issuer}`,
    kind: 'credential',
    tag: `${c.trustLevel} trust`,
  }))

  const jobItems: TimelineItem[] = jobs.map((j) => ({
    id: `job-${j.id}`,
    date: j.date,
    title: j.client,
    subtitle: j.type,
    kind: 'job',
    tag: j.category,
  }))

  return [...credentialItems, ...jobItems].sort((a, b) => b.date.localeCompare(a.date))
}
