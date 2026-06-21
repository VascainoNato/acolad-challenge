function CloseButton({ onClose, className = '' }: { onClose: () => void; className?: string }) {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      className={`text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 cursor-pointer ${className}`}
    >
      ✕
    </button>
  )
}

export default CloseButton
