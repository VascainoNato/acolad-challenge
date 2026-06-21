function Avatar({ initials, className = '' }: { initials: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xl font-semibold ${className}`}
    >
      {initials}
    </div>
  )
}

export default Avatar
