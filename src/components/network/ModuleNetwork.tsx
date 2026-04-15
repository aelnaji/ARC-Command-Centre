import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import {
  LayoutDashboard, Building2, HardHat, FileText,
  Users, Wrench, BarChart3, ExternalLink
} from 'lucide-react'

const modules = [
  { id: 'overview',      label: 'Command Overview',  icon: LayoutDashboard, status: 'live',    desc: 'Central dashboard' },
  { id: 'projects',     label: 'Projects',           icon: Building2,       status: 'live',    desc: '14 active projects' },
  { id: 'project-mgmt', label: 'Project Management', icon: HardHat,         status: 'live',    desc: 'Timelines & certs' },
  { id: 'documents',   label: 'Documents',           icon: FileText,        status: 'live',    desc: 'Doc control hub' },
  { id: 'hr',          label: 'HR & Workforce',      icon: Users,           status: 'live',    desc: '287 on-site staff' },
  { id: 'assets',      label: 'Assets & Equipment',  icon: Wrench,          status: 'coming',  desc: 'Fleet & machinery' },
  { id: 'reports',     label: 'Reports',             icon: BarChart3,       status: 'coming',  desc: 'Analytics & BI' },
]

const statusColor: Record<string, string> = {
  live:   '#22c55e',
  coming: '#f59e0b',
  offline: '#ef4444',
}

export default function ModuleNetwork() {
  const { setActiveModule } = useAppStore()

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Module Network</h2>
          <p className="text-xs" style={{ color: 'var(--text-dim)' }}>ARC-Dashboard integrated modules</p>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--accent-muted)', color: 'var(--accent)' }}>
          {modules.filter(m => m.status === 'live').length} live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {modules.map((mod, i) => {
          const Icon = mod.icon
          const isLive = mod.status === 'live'
          return (
            <motion.button
              key={mod.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => isLive && setActiveModule(mod.id)}
              disabled={!isLive}
              className="flex items-center gap-3 p-3 rounded-lg text-left transition-all"
              style={{
                backgroundColor: 'var(--bg-page)',
                border: '1px solid var(--border)',
                opacity: isLive ? 1 : 0.5,
                cursor: isLive ? 'pointer' : 'default',
              }}
            >
              <div
                className="p-2 rounded-lg flex-shrink-0"
                style={{ backgroundColor: 'var(--accent-muted)' }}
              >
                <Icon size={14} style={{ color: 'var(--accent)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{mod.label}</div>
                <div className="text-xs" style={{ color: 'var(--text-dim)' }}>{mod.desc}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: statusColor[mod.status] }}
                />
                {isLive && <ExternalLink size={10} style={{ color: 'var(--text-dim)' }} />}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
