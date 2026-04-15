import { useAppStore } from '../store/useAppStore'
import { useTheme } from '../hooks/useTheme'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Building2, HardHat, FileText, Users,
  Wrench, BarChart3, Settings, ChevronRight, Zap
} from 'lucide-react'

const modules = [
  { id: 'overview',        label: 'Command Overview',   icon: LayoutDashboard },
  { id: 'projects',       label: 'Projects',            icon: Building2 },
  { id: 'project-mgmt',  label: 'Project Management',  icon: HardHat },
  { id: 'documents',     label: 'Documents',           icon: FileText },
  { id: 'hr',            label: 'HR & Workforce',      icon: Users },
  { id: 'assets',        label: 'Assets & Equipment',  icon: Wrench },
  { id: 'reports',       label: 'Reports',             icon: BarChart3 },
  { id: 'settings',      label: 'Settings',            icon: Settings },
]

export default function Sidebar() {
  const { activeModule, setActiveModule } = useAppStore()
  const { activeTheme } = useTheme()

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-60 flex flex-col z-40"
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--accent-muted)', border: '1px solid var(--accent)' }}
        >
          <Zap size={18} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <div className="font-bold text-sm tracking-wide" style={{ color: 'var(--text-primary)' }}>ARC</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Command Centre</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {modules.map(({ id, label, icon: Icon }) => {
          const active = activeModule === id
          return (
            <motion.button
              key={id}
              whileHover={{ x: 3 }}
              onClick={() => setActiveModule(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all"
              style={{
                backgroundColor: active ? 'var(--accent-muted)' : 'transparent',
                borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
                color: active ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              <Icon size={16} />
              <span className="text-sm font-medium flex-1">{label}</span>
              {active && <ChevronRight size={12} />}
            </motion.button>
          )
        })}
      </nav>

      {/* Theme indicator */}
      <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="text-xs" style={{ color: 'var(--text-dim)' }}>Theme</div>
        <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
          {activeTheme?.name ?? 'ARC Metal Green'}
        </div>
      </div>
    </aside>
  )
}
