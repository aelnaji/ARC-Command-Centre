import { useAppStore } from '../store/useAppStore'
import { useTheme } from '../hooks/useTheme'
import { useClock } from '../hooks/useClock'
import { Bell, Palette, MessageSquare, Search } from 'lucide-react'

export default function TopBar() {
  const { setThemePickerOpen, themePickerOpen, setChatOpen, chatOpen } = useAppStore()
  const { activeTheme, themes, setTheme } = useTheme()
  const time = useClock()

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center gap-4 px-6 h-14"
      style={{
        left: '240px',
        backgroundColor: 'var(--bg-sidebar)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Search */}
      <div
        className="flex items-center gap-2 flex-1 max-w-sm rounded-lg px-3 py-1.5"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <Search size={14} style={{ color: 'var(--text-dim)' }} />
        <span className="text-sm" style={{ color: 'var(--text-dim)' }}>Search modules...</span>
      </div>

      <div className="flex-1" />

      {/* Clock */}
      <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{time}</div>

      {/* AI Chat toggle */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="p-2 rounded-lg transition-all"
        style={{
          backgroundColor: chatOpen ? 'var(--accent-muted)' : 'transparent',
          border: '1px solid var(--border)',
          color: chatOpen ? 'var(--accent)' : 'var(--text-muted)',
        }}
      >
        <MessageSquare size={16} />
      </button>

      {/* Notifications */}
      <button
        className="p-2 rounded-lg relative"
        style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
      >
        <Bell size={16} />
        <span
          className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
        />
      </button>

      {/* Theme picker toggle */}
      <div className="relative">
        <button
          onClick={() => setThemePickerOpen(!themePickerOpen)}
          className="p-2 rounded-lg transition-all"
          style={{
            backgroundColor: themePickerOpen ? 'var(--accent-muted)' : 'transparent',
            border: '1px solid var(--border)',
            color: themePickerOpen ? 'var(--accent)' : 'var(--text-muted)',
          }}
        >
          <Palette size={16} />
        </button>

        {themePickerOpen && (
          <div
            className="absolute right-0 top-11 rounded-xl p-3 w-56 space-y-1 shadow-2xl"
            style={{ backgroundColor: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}
          >
            <div className="text-xs font-semibold mb-2 px-2" style={{ color: 'var(--text-muted)' }}>Select Theme</div>
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setThemePickerOpen(false) }}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left"
                style={{
                  backgroundColor: activeTheme?.id === t.id ? 'var(--accent-muted)' : 'transparent',
                  color: activeTheme?.id === t.id ? 'var(--accent)' : 'var(--text-muted)',
                }}
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: t.accent }}
                />
                <div>
                  <div className="text-xs font-medium">{t.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-dim)' }}>{t.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ backgroundColor: 'var(--accent-muted)', color: 'var(--accent)', border: '1px solid var(--accent)' }}
      >
        AN
      </div>
    </header>
  )
}
