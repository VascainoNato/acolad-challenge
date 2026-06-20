import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { ConnectionProvider } from './context/ConnectionContext.tsx'

registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ConnectionProvider>
          <App />
        </ConnectionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
