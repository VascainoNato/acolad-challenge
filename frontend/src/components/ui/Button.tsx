import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900'

const variantClasses: Record<Variant, string> = {
  primary: `rounded-lg bg-green-600 text-white font-medium px-4 py-2 transition-colors hover:bg-green-700 ${FOCUS_RING} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`,
  secondary: `flex items-center justify-center gap-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium px-6 py-8 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-70 ${FOCUS_RING} cursor-pointer`,
  outline: `rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${FOCUS_RING} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`,
  ghost: `text-xs font-medium text-gray-500 dark:text-gray-400 transition-colors hover:text-green-700 dark:hover:text-green-400 rounded ${FOCUS_RING} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`,
  icon: `flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 ${FOCUS_RING} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`,
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

function Button({ variant = 'primary', className = '', type = 'button', children, ...rest }: ButtonProps) {
  return (
    <button type={type} className={`${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export default Button
