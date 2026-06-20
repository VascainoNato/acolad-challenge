import { useState } from 'react'
import Sparkles from '../Icons/Sparkles'
import Chat from '../Sections/Chat'
import { useDialog } from '../../hooks/useDialog'

const FOCUS_RING =
  'rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900'

function ChatSidebar() {
  const [open, setOpen] = useState(false)
  const panelRef = useDialog<HTMLElement>({ open, onClose: () => setOpen(false) })

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        className={`hidden lg:block cursor-pointer ${FOCUS_RING}`}
      >
        <Sparkles />
      </button>

      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with IDA"
        aria-hidden={!open}
        inert={!open}
        className={`fixed top-0 right-0 z-50 h-full w-96 max-w-[90%] bg-white dark:bg-gray-900 dark:text-gray-100 shadow-xl transition-transform duration-300 ease-in-out transform-gpu will-change-transform flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-[80px] border-b border-gray-200 dark:border-gray-800 px-4">
          <div className="flex flex-col">
            <span className="font-medium leading-tight">IDA</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Identity Digital Assistant</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className={`text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer ${FOCUS_RING}`}
          >
            ✕
          </button>
        </div>
        <div className="flex-1 min-h-0">
          <Chat />
        </div>
      </aside>
    </>
  )
}

export default ChatSidebar
