import { Toaster } from 'react-hot-toast'
import { useTheme } from '../../context/ThemeContext'

export default function AppToaster() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f9fafb' : '#111827',
          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
        },
      }}
    />
  )
}
