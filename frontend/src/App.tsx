import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Pages/Header'
import Content from './components/Pages/Content'
import OfflineBanner from './components/Pages/OfflineBanner'
import AppToaster from './components/ui/AppToaster'
import { routes } from './routes'

function App() {
  return (
    <div className="flex flex-col h-dvh overflow-hidden dark:bg-gray-900 transition-colors">
      <AppToaster />
      <OfflineBanner />
      <Header />
      <Routes>
        <Route element={<Content />}>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </div>
  )
}

export default App
