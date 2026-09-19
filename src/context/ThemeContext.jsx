import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { defaultTheme, presets } from '../theme/defaultTheme'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'hr-theme-settings'

// Deep-merge saved settings over defaults, so if a saved file is missing a
// newer field (or the store is updated with new theme options later), we
// always fall back safely instead of crashing.
function mergeWithDefaults(saved) {
  const merged = { ...defaultTheme }
  for (const key of Object.keys(defaultTheme)) {
    if (saved && saved[key] !== undefined) {
      if (Array.isArray(defaultTheme[key])) {
        merged[key] = Array.isArray(saved[key]) ? saved[key] : defaultTheme[key]
      } else if (typeof defaultTheme[key] === 'object') {
        merged[key] = { ...defaultTheme[key], ...saved[key] }
      } else {
        merged[key] = saved[key]
      }
    }
  }
  return merged
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultTheme
    return mergeWithDefaults(JSON.parse(raw))
  } catch {
    return defaultTheme
  }
}

// Applies color values as CSS custom properties on the document root.
// Tailwind v4 compiles utilities like `bg-navy` to reference var(--color-navy),
// so updating these variables live updates every matching element on the
// entire site instantly, with no rebuild needed.
function applyCssVariables(theme) {
  const root = document.documentElement
  root.style.setProperty('--color-navy', theme.colors.primary)
  root.style.setProperty('--color-gold', theme.colors.accent)
  root.style.setProperty('--color-cream', theme.colors.background)
  root.style.setProperty('--color-ink', theme.colors.text)
  root.style.setProperty('--color-ink-muted', theme.colors.muted)
  root.style.setProperty('--color-surface', theme.colors.surface)
  root.style.setProperty('--font-display', `"${theme.typography.headingFont}", ui-serif, Georgia, serif`)
  root.style.setProperty('--font-sans', `"${theme.typography.bodyFont}", ui-sans-serif, system-ui, sans-serif`)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(loadInitial)
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    applyCssVariables(theme)
  }, [theme])

  const updateSection = useCallback((section, values) => {
    setTheme((prev) => ({ ...prev, [section]: { ...prev[section], ...values } }))
  }, [])

  const updateTheme = useCallback((next) => {
    setTheme(mergeWithDefaults(next))
  }, [])

  const setTrustBadges = useCallback((badges) => {
    setTheme((prev) => ({ ...prev, trustBadges: badges }))
  }, [])

  const saveTheme = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
    setSavedAt(Date.now())
  }, [theme])

  const resetTheme = useCallback(() => {
    setTheme(defaultTheme)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTheme))
    setSavedAt(Date.now())
  }, [])

  const applyPreset = useCallback((presetName) => {
    const preset = presets[presetName]
    if (!preset) return
    setTheme((prev) => ({ ...prev, colors: { ...prev.colors, ...preset.colors }, typography: { ...prev.typography, ...preset.typography } }))
  }, [])

  const exportTheme = useCallback(() => {
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'hr-theme-settings.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [theme])

  const importTheme = useCallback((file, onError) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        updateTheme(parsed)
      } catch {
        onError?.('That file could not be read as a valid theme JSON.')
      }
    }
    reader.readAsText(file)
  }, [updateTheme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        savedAt,
        updateSection,
        updateTheme,
        setTrustBadges,
        saveTheme,
        resetTheme,
        applyPreset,
        exportTheme,
        importTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
