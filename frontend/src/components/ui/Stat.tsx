import type { ReactNode } from 'react'

function Stat({
  value,
  label,
  accent,
}: {
  value: ReactNode
  label: string
  accent?: string
}) {
  return (
    <div className="flex-1 text-center rounded-xl bg-gray-50 dark:bg-gray-700/50 py-5">
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      {accent && <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{accent}</p>}
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  )
}

export default Stat
