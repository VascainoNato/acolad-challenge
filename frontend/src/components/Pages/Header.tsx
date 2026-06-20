import { useLocation } from 'react-router-dom'
import Logo from '../Icons/Logo'
import MobileMenu from './MobileMenu'
import ChatSidebar from './ChatSidebar'
import UserAvatar from '../Buttons/UserAvatar'
import ThemeToggle from '../Buttons/ThemeToggle'
import ConnectionStatus from '../Buttons/ConnectionStatus'
import { routes } from '../../routes'

function Header() {
  const { pathname } = useLocation()
  const currentLabel = routes.find((route) => route.path === pathname)?.label

  return (
    <header className="h-[80px] flex items-center justify-between px-4 lg:px-12 border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 transition-colors">
      <div className="flex items-center gap-2">
        <Logo />
        {currentLabel && (
          <span className="hidden md:block text-sm font-medium dark:text-gray-400">
            {currentLabel}
          </span>
        )}
      </div>
      <div className="flex items-center gap-6 lg:gap-10">
        <ConnectionStatus />
        <ThemeToggle />
        <MobileMenu />
        <ChatSidebar />
        <UserAvatar />
      </div>
    </header>
  )
}

export default Header
