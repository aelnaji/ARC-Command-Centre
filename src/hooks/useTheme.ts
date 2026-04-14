import { useState, useCallback } from 'react'

export type ThemeId =
  | 'theme-arc-green'
  | 'theme-midnight-blue'
  | 'theme-cyber-gold'
  | 'theme-crimson-steel'
  | 'theme-void-dark'
  | 'theme-ghost-white'

export interface ThemeDefinition {
  id: ThemeId
  name: string
  subtitle: string
  accent: string
  bg: string
  sidebar: string
}

export const THEMES: ThemeDefinition[] = [
  { id: 'theme-arc-green',     name: 'ARC Metal Green', subtitle: 'Company Default', accent: '#22c55e', bg: '#0d1a10', sidebar: '#0f1f13' },
  { id: 'theme-midnight-blue', name: 'Midnight Blue',   subtitle: 'Corporate',       accent: '#3b82f6', bg: '#0a0e1f', sidebar: '#0d1228' },
  { id: 'theme-cyber-gold',    name: 'Cyber Gold',      subtitle: 'Executive',       accent: '#f59e0b', bg: '#120f07', sidebar: '#170d05' },
  { id: 'theme-crimson-steel', name: 'Crimson Steel',   subtitle: 'Operations',      accent: '#ef4444', bg: '#140a0a', sidebar: '#1a0c0c' },
  { id: 'theme-void-dark',     name: 'Void Dark',       subtitle: 'Neutral',         accent: '#6366f1', bg: '#0f0f0f', sidebar: '#141414' },
  { id: 'theme-ghost-white',   name: 'Ghost White',     subtitle: 'Daylight',        accent: '#334155', bg: '#f8fafc', sidebar: '#f1f5f9' },
]

const STORAGE_KEY = 'arc-theme'

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null
    return saved && THEMES.find(t => t.id === saved) ? saved : 'theme-arc-green'
  })

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id)
    localStorage.setItem(STORAGE_KEY, id)
  }, [])

  const activeTheme = THEMES.find(t => t.id === theme)!

  return { theme, setTheme, activeTheme, themes: THEMES }
}
