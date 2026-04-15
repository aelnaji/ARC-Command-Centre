import { motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle, Wifi } from 'lucide-react'

type SvcStatus = 'online' | 'degraded' | 'offline'

interface Service {
  name: string
  status: SvcStatus
  latency?: string
  uptime: string
}

const services: Service[] = [
  { name: 'ARC Dashboard',   status: 'online',   latency: '12ms',  uptime: '99.9%' },
  { name: 'Document Store',  status: 'online',   latency: '28ms',  uptime: '99.7%' },
  { name: 'HR System',       status: 'online',   latency: '45ms',  uptime: '99.5%' },
  { name: 'ERP (Sage X3)',   status: 'degraded', latency: '340ms', uptime: '97.2%' },
  { name: 'Email Gateway',   status: 'online',   latency: '18ms',  uptime: '100%' },
  { name: 'Backup Service',  status: 'offline',  uptime: '0%' },
]

const statusCfg: Record<SvcStatus, { icon: React.ElementType; color: string; label: string }> = {
  online:   { icon: CheckCircle2,  color: '#22c55e', label: 'Online' },
  degraded: { icon: AlertTriangle, color: '#f59e0b', label: 'Degraded' },
  offline:  { icon: XCircle,       color: '#ef4444', label: 'Offline' },
}

export default function SystemHealth() {
  const onlineCount = services.filter(s => s.status === 'online').length

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>System Health</h2>
          <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{onlineCount}/{services.length} services operational</p>
        </div>
        <Wifi size={16} style={{ color: 'var(--accent)' }} />
      </div>

      {/* Overall bar */}
      <div className="mb-4">
        <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(onlineCount / services.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ backgroundColor: 'var(--accent)' }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {services.map((svc, i) => {
          const cfg = statusCfg[svc.status]
          const Icon = cfg.icon
          return (
            <motion.div
              key={svc.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3"
            >
              <Icon size={13} style={{ color: cfg.color, flexShrink: 0 }} />
              <span className="text-xs flex-1" style={{ color: 'var(--text-primary)' }}>{svc.name}</span>
              {svc.latency && (
                <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>{svc.latency}</span>
              )}
              <span
                className="text-xs px-1.5 py-0 rounded"
                style={{ backgroundColor: `${cfg.color}20`, color: cfg.color, fontSize: '10px' }}
              >{cfg.label}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
