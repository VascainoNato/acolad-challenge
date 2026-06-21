import type { ReactNode } from 'react'
import { useDialog } from '../../hooks/useDialog'

function Modal({
  onClose,
  labelledBy,
  children,
}: {
  onClose: () => void
  labelledBy?: string
  children: ReactNode
}) {
  const panelRef = useDialog<HTMLDivElement>({ open: true, onClose })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative z-10 w-full sm:max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto no-scrollbar bg-white dark:bg-gray-800 rounded-2xl p-6"
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
