import { Outlet } from 'react-router-dom'
import SidebarMenu from '../Sections/SidebarMenu'

function Content() {
  return (
    <main className="flex-1 min-h-0 bg-gray-200 dark:bg-gray-900 flex transition-colors">
      <SidebarMenu />
      <div className="flex-1 min-h-0 min-w-0">
        <Outlet />
      </div>
    </main>
  )
}

export default Content
