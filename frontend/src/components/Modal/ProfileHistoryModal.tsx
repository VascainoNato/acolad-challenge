import { useState } from 'react'
import Sparkles from '../Icons/Sparkles'
import Modal from '../ui/Modal'
import CloseButton from '../ui/CloseButton'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import TypingDots from '../ui/TypingDots'
import type { TimelineItem } from '../../types/timeline'
import { useConnection } from '../../context/ConnectionContext'

type Filter = 'jobs' | 'credentials' | 'both'

function TimelineRow({ item }: { item: TimelineItem }) {
  const isCredential = item.kind === 'credential'
  const dotColor = isCredential ? 'bg-emerald-500' : 'bg-indigo-500'
  const tagColor = isCredential
    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
    : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'

  return (
    <li className="relative pl-6">
      <span className={`absolute left-0 top-1.5 h-3 w-3 rounded-full ${dotColor} ring-4 ring-white dark:ring-gray-800`} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{item.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.subtitle}</p>
          <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{item.date}</p>
        </div>
        <Badge className={`shrink-0 ${tagColor}`}>{item.tag}</Badge>
      </div>
    </li>
  )
}

interface ProfileHistoryModalProps {
  summary: string
  isGenerating: boolean
  timeline: TimelineItem[]
  onClose: () => void
  onGenerateSummary: () => void
}

function ProfileHistoryModal({
  summary,
  isGenerating,
  timeline,
  onClose,
  onGenerateSummary,
}: ProfileHistoryModalProps) {
  const [filter, setFilter] = useState<Filter>('jobs')
  const { isOnline } = useConnection()

  const jobsCount = timeline.filter((i) => i.kind === 'job').length
  const credentialsCount = timeline.filter((i) => i.kind === 'credential').length

  const filtered = timeline.filter((item) => {
    if (filter === 'both') return true
    if (filter === 'jobs') return item.kind === 'job'
    return item.kind === 'credential'
  })

  const filters: { key: Filter; label: string }[] = [
    { key: 'jobs', label: `Jobs (${jobsCount})` },
    { key: 'credentials', label: `Credentials (${credentialsCount})` },
    { key: 'both', label: 'Both' },
  ]

  const hasSummary = isGenerating || summary.length > 0

  return (
    <Modal onClose={onClose} labelledBy="history-modal-title">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 id="history-modal-title" className="text-xl font-bold text-gray-900 dark:text-gray-100">Professional history</h3>
          <p className="text-gray-500 dark:text-gray-400">Maria's credentials & interpreting work</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="icon"
            onClick={onGenerateSummary}
            disabled={isGenerating || !isOnline}
            aria-label="Generate AI summary"
            title={isOnline ? 'Generate AI summary' : "You're offline — IDA is unavailable"}
            className="h-9 w-9 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-5 w-5 dark:invert" />
          </Button>
          <CloseButton onClose={onClose} />
        </div>
      </div>

      {hasSummary && (
        <div className="mt-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 dark:invert" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Summary by IDA</p>
          </div>
          <div className="mt-3 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
            {summary || <TypingDots />}
          </div>
        </div>
      )}

      <div className="mt-5 flex gap-2 rounded-xl bg-gray-100 dark:bg-gray-700 p-1">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${
              filter === f.key
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500">No history to show for this filter.</p>
        ) : (
          <ol className="relative ml-1 flex flex-col gap-5 border-l border-gray-200 dark:border-gray-700 pl-3">
            {filtered.map((item) => (
              <TimelineRow key={item.id} item={item} />
            ))}
          </ol>
        )}
      </div>
    </Modal>
  )
}

export default ProfileHistoryModal
