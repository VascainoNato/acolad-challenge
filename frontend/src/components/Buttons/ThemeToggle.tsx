import sun from '../../assets/sun.svg'
import moonStar from '../../assets/moon-star.svg'
import { useTheme } from '../../context/ThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative h-6 w-6 cursor-pointer"
    >
      <img
        src={sun}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-6 w-6 transition-all duration-500 ease-in-out ${
          isDark ? 'scale-0 opacity-0 -rotate-90' : 'scale-100 opacity-100 rotate-0'
        }`}
      />
      <img
        src={moonStar}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-6 w-6 dark:invert transition-all duration-500 ease-in-out ${
          isDark ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-90'
        }`}
      />
    </button>
  )
}

export default ThemeToggle
