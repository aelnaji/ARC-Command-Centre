import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { Bot, Send, X, Minimize2, Maximize2, Sparkles } from 'lucide-react'

interface Message {
  id: number
  role: 'user' | 'assistant'
  text: string
}

const suggestions = [
  'Summarize pending approvals',
  'Which projects are behind schedule?',
  'Show HR alerts this week',
  'System health overview',
]

const mockReply = (q: string): string => {
  if (q.toLowerCase().includes('approv')) return 'You have 3 pending approvals: 2 payment certificates and 1 subcontractor invoice. The oldest is 4 hours old.'
  if (q.toLowerCase().includes('project')) return 'Projects Al Reef Phase 3 and Mussafah Commercial Block are currently behind schedule by 7 and 12 days respectively.'
  if (q.toLowerCase().includes('hr')) return 'HR alerts this week: 1 new hire onboarded, 2 leave requests pending, 1 safety incident logged at Site B-7.'
  if (q.toLowerCase().includes('health') || q.toLowerCase().includes('system')) return 'System status: 4/6 services online. ERP (Sage X3) is degraded at 340ms latency. Backup Service is offline.'
  return 'I can help you query any ARC module. Try asking about projects, approvals, HR, or system health.'
}

export default function AIIntelligencePanel() {
  const { chatOpen, setChatOpen, chatMinimized, setChatMinimized, chatFullscreen, setChatFullscreen } = useAppStore()
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', text: 'Hello! I am your ARC Intelligence Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now(), role: 'user', text: input }
    const reply: Message = { id: Date.now() + 1, role: 'assistant', text: mockReply(input) }
    setMessages(prev => [...prev, userMsg, reply])
    setInput('')
  }

  if (!chatOpen) return null

  const panelW = chatFullscreen ? '100%' : '380px'
  const panelH = chatFullscreen ? '100%' : chatMinimized ? '48px' : '520px'

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="fixed bottom-4 right-4 z-50 flex flex-col rounded-xl overflow-hidden shadow-2xl"
      style={{
        width: panelW,
        height: panelH,
        backgroundColor: 'var(--bg-sidebar)',
        border: '1px solid var(--border)',
        transition: 'height 0.3s ease, width 0.3s ease',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
        style={{ borderBottom: chatMinimized ? 'none' : '1px solid var(--border)' }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--accent-muted)' }}
        >
          <Bot size={14} style={{ color: 'var(--accent)' }} />
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>ARC Intelligence</div>
          {!chatMinimized && <div className="text-xs" style={{ color: 'var(--text-dim)' }}>Enterprise AI Assistant</div>}
        </div>
        <div className="flex gap-1">
          <button onClick={() => setChatMinimized(!chatMinimized)} className="p-1 rounded" style={{ color: 'var(--text-muted)' }}>
            <Minimize2 size={12} />
          </button>
          <button onClick={() => setChatFullscreen(!chatFullscreen)} className="p-1 rounded" style={{ color: 'var(--text-muted)' }}>
            <Maximize2 size={12} />
          </button>
          <button onClick={() => setChatOpen(false)} className="p-1 rounded" style={{ color: 'var(--text-muted)' }}>
            <X size={12} />
          </button>
        </div>
      </div>

      {!chatMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[80%] px-3 py-2 rounded-lg text-xs leading-relaxed"
                  style={{
                    backgroundColor: msg.role === 'user' ? 'var(--accent-muted)' : 'var(--bg-card)',
                    color: msg.role === 'user' ? 'var(--accent)' : 'var(--text-primary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1 mb-1" style={{ color: 'var(--accent)' }}>
                      <Sparkles size={10} />
                      <span style={{ fontSize: '10px', fontWeight: 600 }}>ARC AI</span>
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length < 3 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => { setInput(s); }}
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-2 flex-shrink-0"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about any module..."
              className="flex-1 text-xs bg-transparent outline-none"
              style={{ color: 'var(--text-primary)' }}
            />
            <button
              onClick={send}
              className="p-1.5 rounded-lg"
              style={{ backgroundColor: 'var(--accent-muted)', color: 'var(--accent)' }}
            >
              <Send size={12} />
            </button>
          </div>
        </>
      )}
    </motion.div>
  )
}
