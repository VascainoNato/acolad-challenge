export type TimelineKind = 'credential' | 'job'

export interface TimelineItem {
  id: string
  date: string // YYYY-MM-DD
  title: string
  subtitle: string
  kind: TimelineKind
  tag: string
}
