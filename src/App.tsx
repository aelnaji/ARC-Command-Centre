import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import KPIStrip from './components/kpi/KPIStrip'
import ModuleNetwork from './components/network/ModuleNetwork'
import ActionQueue from './components/queue/ActionQueue'
import ActivityFeed from './components/feed/ActivityFeed'
import SystemHealth from './components/health/SystemHealth'
import AIIntelligencePanel from './components/ai/AIIntelligencePanel'
import { useTheme } from './hooks/useTheme'
import { useAppStore } from './store/useAppStore'
import {
  Building2, HardHat, FileText, Users, Wrench, BarChart3, Settings, LayoutDashboard
} from 'lucide-react'

function PlaceholderModule({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: 'var(--accent-muted)', border: '1px solid var(--accent)' }}
      >
        <Icon size={28} style={{ color: 'var(--accent)' }} />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>This module is being loaded...</p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>Connect to ARC-Dashboard via module routing</p>
      </div>
    </div>
  )
}

function ModuleContent({ activeModule }: { activeModule: string }) {
  switch (activeModule) {
    case 'overview':
      return (
        <div className="space-y-5">
          <KPIStrip />
          <ModuleNetwork />
          <div className="grid grid-cols-2 gap-5">
            <ActionQueue />
            <ActivityFeed />
          </div>
          <SystemHealth />
        </div>
      )
    case 'projects':
      return <PlaceholderModule title="Projects" icon={Building2} />
    case 'project-mgmt':
      return <PlaceholderModule title="Project Management" icon={HardHat} />
    case 'documents':
      return <PlaceholderModule title="Documents" icon={FileText} />
    case 'hr':
      return <PlaceholderModule title="HR & Workforce" icon={Users} />
    case 'assets':
      return <PlaceholderModule title="Assets & Equipment" icon={Wrench} />
    case 'reports':
      return <PlaceholderModule title="Reports" icon={BarChart3} />
    case 'settings':
      return <PlaceholderModule title="Settings" icon={Settings} />
    default:
      return <PlaceholderModule title="Module" icon={LayoutDashboard} />
  }
}

export default function App() {
  const { theme } = useTheme()
  const { activeModule } = useAppStore()

  useEffect(() => {
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
            className="flex-1 overflow-y-auto p-6"
            style={{ marginTop: '56px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <ModuleContent activeModule={activeModule} />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        <AIIntelligencePanel />
      </div>
    </BrowserRouter>
  )
}
