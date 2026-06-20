import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Menu from '../Icons/Menu'
import { routes } from '../../routes'
import { useDialog } from '../../hooks/useDialog'

const FOCUS_RING =
  'rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900'

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const panelRef = useDialog<HTMLElement>({ open, onClose: () => setOpen(false) })

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className={`lg:hidden cursor-pointer ${FOCUS_RING}`}
      >
        <Menu />
      </button>

      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[80%] flex-col bg-white dark:bg-gray-900 dark:text-gray-100 shadow-xl transition-transform duration-300 ease-in-out transform-gpu will-change-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-[80px] border-b border-gray-200 dark:border-gray-800 px-4">
          <span className="font-medium">Menu</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className={`text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer ${FOCUS_RING}`}
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-1 flex-col p-4 gap-1">
          {routes.map(({ path, label, Icon }) => (
            <NavLink
              key={path}
              to={path}
              end
              onClick={() => setOpen(false)}
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
        </nav>
        <a
          className="w-full justify-center flex p-4"
          href="https://github.com/VascainoNato"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-xs dark:text-gray-500 w-full text-center cursor-pointer">
            Made with ❤️ by Rafael Satyro
          </span>
        </a>
      </aside>
    </>
  )
}

export default MobileMenu
