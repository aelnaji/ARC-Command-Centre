import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import KPIStrip from './components/kpi/KPIStrip'
import ModuleNetwork from './components/network/ModuleNetwork'
import ActionQueue from './components/queue/ActionQueue'
import ActivityFeed from './components/feed/ActivityFeed'
import SystemHealth from './components/health/SystemHealth'
import AIIntelligencePanel from './components/ai/AIIntelligencePanel'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme } = useTheme()

  useEffect(() => {
    // Apply theme class to html element
    const html = document.documentElement
    const themeClasses = [
      'theme-arc-green','theme-midnight-blue','theme-cyber-gold',
      'theme-crimson-steel','theme-void-dark','theme-ghost-white'
    ]
    themeClasses.forEach(c => html.classList.remove(c))
    html.classList.add(theme)
  }, [theme])

  return (
    <BrowserRouter>
      <div className="min-h-screen flex relative hex-grid" style={{ backgroundColor: 'var(--bg-page)' }}>
        {/* Background orbs */}
        <div className="orb-green" />
        <div className="orb-cyan" />

        <Sidebar />

        <div className="flex-1 flex flex-col" style={{ marginLeft: '240px' }}>
          <TopBar />
          <main
            className="flex-1 overflow-y-auto p-6 space-y-5"
            style={{ marginTop: '56px' }}
          >
            <KPIStrip />
            <ModuleNetwork />
            <div className="grid grid-cols-2 gap-5">
              <ActionQueue />
              <ActivityFeed />
            </div>
            <SystemHealth />
          </main>
        </div>

        <AIIntelligencePanel />
      </div>
    </BrowserRouter>
  )
}
