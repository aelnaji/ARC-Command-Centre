import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle2, XCircle, PauseCircle, ChevronRight } from 'lucide-react'

type Status = 'pending' | 'approved' | 'rejected' | 'on-hold'

interface Action {
  id: string
  title: string
  module: string
  requestedBy: string
  time: string
  status: Status
  priority: 'high' | 'medium' | 'low'
}

const initial: Action[] = [
  { id: '1', title: 'Payment Certificate #PC-2024-089', module: 'Project Management', requestedBy: 'Ahmed K.', time: '2h ago', status: 'pending', priority: 'high' },
  { id: '2', title: 'Subcontractor Invoice Approval', module: 'Project Management', requestedBy: 'Sara M.', time: '4h ago', status: 'pending', priority: 'high' },
  { id: '3', title: 'Leave Request — J. Thompson', module: 'HR & Workforce', requestedBy: 'HR Dept', time: '1d ago', status: 'on-hold', priority: 'medium' },
  { id: '4', title: 'Equipment Deployment Order', module: 'Assets', requestedBy: 'Ops Team', time: '1d ago', status: 'pending', priority: 'medium' },
  { id: '5', title: 'Site Access Permit — Block D', module: 'Projects', requestedBy: 'Site Mgr', time: '2d ago', status: 'approved', priority: 'low' },
]

const statusConfig: Record<Status, { icon: React.ElementType; color: string; label: string }> = {
  pending:  { icon: Clock,        color: '#f59e0b', label: 'Pending' },
  approved: { icon: CheckCircle2, color: '#22c55e', label: 'Approved' },
  rejected: { icon: XCircle,      color: '#ef4444', label: 'Rejected' },
  'on-hold':{ icon: PauseCircle,  color: '#6366f1', label: 'On Hold' },
}

export default function ActionQueue() {
  const [actions, setActions] = useState<Action[]>(initial)
  const [filter, setFilter] = useState<Status | 'all'>('all')

  const filtered = filter === 'all' ? actions : actions.filter(a => a.status === filter)

  const updateStatus = (id: string, status: Status) =>
    setActions(prev => prev.map(a => a.id === id ? { ...a, status } : a))

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Action Queue</h2>
          <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{actions.filter(a => a.status === 'pending').length} pending approvals</p>
        </div>
        <div className="flex gap-1">
          {(['all', 'pending', 'on-hold'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-xs px-2 py-1 rounded-lg capitalize"
              style={{
                backgroundColor: filter === f ? 'var(--accent-muted)' : 'transparent',
                color: filter === f ? 'var(--accent)' : 'var(--text-dim)',
                border: '1px solid var(--border)',
              }}
            >{f}</button>
          ))}
        </div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        <AnimatePresence>
          {filtered.map(action => {
            const S = statusConfig[action.status]
            const StatusIcon = S.icon
            return (
              <motion.div
                key={action.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)' }}
              >
                <StatusIcon size={14} style={{ color: S.color, marginTop: 2, flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{action.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{action.module}</span>
                    <span className="text-xs" style={{ color: 'var(--text-dim)' }}>·</span>
                    <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{action.time}</span>
                  </div>
                  {action.status === 'pending' && (
                    <div className="flex gap-1 mt-2">
                      <button
                        onClick={() => updateStatus(action.id, 'approved')}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e' }}
                      >Approve</button>
                      <button
                        onClick={() => updateStatus(action.id, 'rejected')}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ backgroundColor: 'rgba(239,68,68,0.15)', color: '#ef4444' }}
                      >Reject</button>
                      <button
                        onClick={() => updateStatus(action.id, 'on-hold')}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ backgroundColor: 'rgba(99,102,241,0.15)', color: '#6366f1' }}
                      >Hold</button>
                    </div>
                  )}
                </div>
                <div
                  className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                  style={{ backgroundColor: `${S.color}20`, color: S.color }}
                >
                  {S.label}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
