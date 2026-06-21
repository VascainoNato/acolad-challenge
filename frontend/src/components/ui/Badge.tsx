import type { ReactNode } from 'react'

type BadgeSize = 'sm' | 'md'

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
}

function Badge({
  size = 'sm',
  className = '',
  children,
}: {
  size?: BadgeSize
  className?: string
  children: ReactNode
}) {
  return <span className={`rounded-full ${sizeClasses[size]} ${className}`}>{children}</span>
}

export default Badge
