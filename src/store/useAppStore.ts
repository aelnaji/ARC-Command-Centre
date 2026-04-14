import { create } from 'zustand'

interface AppStore {
  activeModule: string
  setActiveModule: (m: string) => void
  chatOpen: boolean
  setChatOpen: (v: boolean) => void
  chatMinimized: boolean
  setChatMinimized: (v: boolean) => void
  chatFullscreen: boolean
  setChatFullscreen: (v: boolean) => void
  themePickerOpen: boolean
  setThemePickerOpen: (v: boolean) => void
}

export const useAppStore = create<AppStore>(set => ({
  activeModule: 'overview',
  setActiveModule: (m) => set({ activeModule: m }),
  chatOpen: false,
  setChatOpen: (v) => set({ chatOpen: v, chatMinimized: false }),
  chatMinimized: false,
  setChatMinimized: (v) => set({ chatMinimized: v }),
  chatFullscreen: false,
  setChatFullscreen: (v) => set({ chatFullscreen: v }),
  themePickerOpen: false,
  setThemePickerOpen: (v) => set({ themePickerOpen: v }),
}))
