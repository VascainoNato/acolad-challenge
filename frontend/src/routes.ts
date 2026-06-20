import type { ComponentType } from 'react'
import Dashboard from './components/Screens/Dashboard'
import Wallet from './components/Screens/Wallet'
import AI from './components/Screens/AI'
import House from './components/Icons/House'
import WalletCards from './components/Icons/WalletCards'
import Sparkles from './components/Icons/Sparkles'

export interface AppRoute {
  path: string
  label: string
  Icon: ComponentType
  Component: ComponentType
  mobileOnly?: boolean
}

export const routes: AppRoute[] = [
  { path: '/', label: 'Dashboard', Icon: House, Component: Dashboard },
  { path: '/wallet', label: 'Wallet', Icon: WalletCards, Component: Wallet },
  { path: '/ai', label: 'AI Assistant', Icon: Sparkles, Component: AI, mobileOnly: true },
]
