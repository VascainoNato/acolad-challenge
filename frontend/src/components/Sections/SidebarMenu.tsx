  import { NavLink } from 'react-router-dom'
  import { routes } from '../../routes'

  function SidebarMenu() {
    return (
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 gap-1 transition-colors justify-between">
        <div>
        {routes
          .filter((route) => !route.mobileOnly)
          .map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${
                isActive
                  ? 'bg-gray-100 dark:bg-gray-800 font-medium dark:text-gray-100'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
        </div>
        <a className="w-full justify-center flex" href="https://github.com/VascainoNato" target="_blank" rel="noopener noreferrer">
          <span className="text-xs dark:text-gray-500 w-full text-center cursor-pointer">
            Made with ❤️ by Rafael Satyro
          </span>
        </a>
      </aside>
    )
  }

  export default SidebarMenu
