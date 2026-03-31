import { ref } from 'vue'

const STORAGE_KEY = 'cp-theme'

// Shared reactive state across all component instances
const isDark = ref(true)

function applyTheme(dark: boolean) {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
}

export function useTheme() {
  /** Call once in the root App component (onMounted) to hydrate from storage */
  function initTheme() {
    const stored = localStorage.getItem(STORAGE_KEY)
    // Default to dark if nothing stored
    applyTheme(stored !== 'light')
  }

  function toggleTheme() {
    applyTheme(!isDark.value)
  }

  return { isDark, initTheme, toggleTheme }
}
