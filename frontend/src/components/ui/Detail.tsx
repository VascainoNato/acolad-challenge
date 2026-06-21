function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1">
      <p className="text-sm text-gray-400 dark:text-gray-500">{label}</p>
      <p className="text-gray-800 dark:text-gray-200">{value}</p>
    </div>
  )
}

export default Detail
