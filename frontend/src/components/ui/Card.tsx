import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type CardProps<T extends ElementType> = {
  as?: T
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

function Card<T extends ElementType = 'div'>({ as, className = '', children, ...rest }: CardProps<T>) {
  const Component = (as || 'div') as ElementType
  return (
    <Component
      className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 transition-colors ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Card
