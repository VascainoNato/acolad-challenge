function Spinner({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <span
      className={`rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-300 animate-spin ${className}`}
    />
  )
}

export default Spinner
