import { motion } from 'framer-motion'
import {
  FileText, UserCheck, AlertTriangle, CheckCircle2,
  Building2, Truck, ClipboardList
} from 'lucide-react'

const events = [
  { id: 1, icon: CheckCircle2, color: '#22c55e', text: 'Payment Cert #PC-2024-088 approved', time: '5m ago', module: 'Project Mgmt' },
  { id: 2, icon: UserCheck,   color: '#3b82f6', text: 'New hire onboarded — Khalid Al Mansoori', time: '22m ago', module: 'HR' },
  { id: 3, icon: AlertTriangle, color: '#f59e0b', text: 'Safety incident logged at Site B-7', time: '1h ago', module: 'Projects' },
  { id: 4, icon: FileText,    color: '#8b5cf6', text: 'BOQ document uploaded for Contract #447', time: '2h ago', module: 'Documents' },
  { id: 5, icon: Building2,   color: '#22c55e', text: 'Project "Al Reef Phase 3" status updated', time: '3h ago', module: 'Projects' },
  { id: 6, icon: Truck,       color: '#f59e0b', text: 'Equipment delivery confirmed — Crane #CR-04', time: '4h ago', module: 'Assets' },
  { id: 7, icon: ClipboardList, color: '#3b82f6', text: 'Monthly progress report submitted', time: '6h ago', module: 'Reports' },
  { id: 8, icon: CheckCircle2, color: '#22c55e', text: 'Subcontractor payment processed', time: '8h ago', module: 'Project Mgmt' },
]

export default function ActivityFeed() {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div>
        <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Activity Feed</h2>
        <p className="text-xs" style={{ color: 'var(--text-dim)' }}>Real-time enterprise events</p>
      </div>

      <div className="space-y-1 max-h-80 overflow-y-auto">
        {events.map((ev, i) => {
          const Icon = ev.icon
          return (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-3 py-2.5 px-3 rounded-lg"
              style={{ backgroundColor: 'var(--bg-page)' }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `${ev.color}20` }}
              >
                <Icon size={12} style={{ color: ev.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs" style={{ color: 'var(--text-primary)' }}>{ev.text}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="text-xs px-1.5 py-0 rounded"
                    style={{ backgroundColor: 'var(--accent-muted)', color: 'var(--accent)', fontSize: '10px' }}
                  >{ev.module}</span>
                  <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{ev.time}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
