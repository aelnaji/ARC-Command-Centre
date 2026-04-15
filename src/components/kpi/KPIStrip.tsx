import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Building2, Users, FileCheck, AlertTriangle } from 'lucide-react'

const kpis = [
  {
    label: 'Active Projects',
    value: '14',
    change: '+2',
    trend: 'up',
    icon: Building2,
    sub: '3 nearing deadline',
  },
  {
    label: 'Workforce On-Site',
    value: '287',
    change: '+12',
    trend: 'up',
    icon: Users,
    sub: 'Across all sites',
  },
  {
    label: 'Pending Approvals',
    value: '23',
    change: '-5',
    trend: 'down',
    icon: FileCheck,
    sub: '8 urgent',
  },
  {
    label: 'Open Incidents',
    value: '6',
    change: '+1',
    trend: 'up',
    icon: AlertTriangle,
    sub: '2 critical',
  },
]

export default function KPIStrip() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon
        const isUp = kpi.trend === 'up'
        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: 'var(--accent-muted)' }}
              >
                <Icon size={16} style={{ color: 'var(--accent)' }} />
              </div>
              <div
                className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: isUp ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                  color: isUp ? '#22c55e' : '#ef4444',
                }}
              >
                {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {kpi.change}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{kpi.value}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{kpi.label}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{kpi.sub}</div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
