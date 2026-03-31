<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

const { t, locale } = useI18n()
const { isDark, toggleTheme } = useTheme()

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'th', label: 'TH' },
]

const mobileOpen = ref(false)

function setLocale(code: string) {
  locale.value = code
  localStorage.setItem('cp-lang', code)
}
</script>

<template>
  <header class="navbar">
    <!-- ── Logo ─────────────────────────────────────────────────────── -->
    <a href="/" class="navbar-logo" aria-label="CraftPortal home">
      <span class="logo-icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="8" fill="var(--cp-accent)" />
          <path
            d="M8 14C8 10.686 10.686 8 14 8C16.21 8 18.143 9.19 19.196 10.97"
            stroke="white"
            stroke-width="2.2"
            stroke-linecap="round"
          />
          <circle cx="14" cy="14" r="2.5" fill="white" />
        </svg>
      </span>
      <span class="logo-text">CraftPortal</span>
    </a>

    <!-- ── Desktop nav links ─────────────────────────────────────────── -->
    <nav class="navbar-nav" aria-label="Main navigation">
      <a href="#" class="nav-link">{{ t('nav.dashboard') }}</a>
      <a href="#" class="nav-link">{{ t('nav.projects') }}</a>
      <a href="#" class="nav-link">{{ t('nav.clients') }}</a>
      <a href="#" class="nav-link">{{ t('nav.settings') }}</a>
    </nav>

    <!-- ── Controls ─────────────────────────────────────────────────── -->
    <div class="navbar-controls">
      <!-- Language switcher -->
      <div class="lang-switcher" :aria-label="t('lang.label')">
        <button
          v-for="lang in langs"
          :key="lang.code"
          class="lang-btn"
          :class="{ active: locale === lang.code }"
          @click="setLocale(lang.code)"
        >
          {{ lang.label }}
        </button>
      </div>

      <!-- Theme toggle -->
      <button
        class="theme-btn"
        :title="t('theme.toggle')"
        :aria-label="t('theme.toggle')"
        @click="toggleTheme"
      >
        <!-- Sun — shown in dark mode (click → go light) -->
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2"  x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
          <line x1="2"  y1="12" x2="5"  y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66" />
          <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22" />
        </svg>

        <!-- Moon — shown in light mode (click → go dark) -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      <!-- Mobile hamburger -->
      <button
        class="hamburger"
        :aria-expanded="mobileOpen"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- ── Mobile nav drawer ─────────────────────────────────────────── -->
    <nav v-if="mobileOpen" class="mobile-nav" aria-label="Mobile navigation">
      <a href="#" class="mobile-link" @click="mobileOpen = false">{{ t('nav.dashboard') }}</a>
      <a href="#" class="mobile-link" @click="mobileOpen = false">{{ t('nav.projects') }}</a>
      <a href="#" class="mobile-link" @click="mobileOpen = false">{{ t('nav.clients') }}</a>
      <a href="#" class="mobile-link" @click="mobileOpen = false">{{ t('nav.settings') }}</a>
    </nav>
  </header>
</template>

<style scoped>
/* ── Navbar shell ───────────────────────────────────────────────────────── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 0;
  height: 60px;
  padding: 0 24px;
  background: var(--cp-surface);
  border-bottom: 1px solid var(--cp-border);
  box-shadow: var(--cp-shadow-sm);
  flex-wrap: wrap;
}

/* ── Logo ───────────────────────────────────────────────────────────────── */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
  margin-right: 32px;
}

.logo-icon {
  display: flex;
  align-items: center;
  filter: drop-shadow(0 0 6px var(--cp-accent-glow));
}

.logo-text {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: var(--cp-text);
}

/* ── Desktop nav links ──────────────────────────────────────────────────── */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.nav-link {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--cp-text-muted);
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
}

.nav-link:hover {
  color: var(--cp-text);
  background: var(--cp-surface-2);
}

.nav-link.router-link-active {
  color: var(--cp-accent);
  background: var(--cp-accent-glow);
}

/* ── Controls ───────────────────────────────────────────────────────────── */
.navbar-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  flex-shrink: 0;
}

/* Language switcher pill */
.lang-switcher {
  display: flex;
  align-items: center;
  background: var(--cp-surface-2);
  border: 1px solid var(--cp-border);
  border-radius: 8px;
  padding: 2px;
  gap: 2px;
}

.lang-btn {
  padding: 4px 10px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  background: transparent;
  color: var(--cp-text-muted);
  transition: color 0.15s, background 0.15s;
  line-height: 1;
}

.lang-btn:hover {
  color: var(--cp-text);
}

.lang-btn.active {
  background: var(--cp-accent);
  color: #fff;
  box-shadow: 0 1px 4px var(--cp-accent-glow);
}

/* Theme toggle button */
.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--cp-border);
  border-radius: 8px;
  background: var(--cp-surface-2);
  color: var(--cp-text-muted);
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
  flex-shrink: 0;
}

.theme-btn:hover {
  color: var(--cp-accent);
  border-color: var(--cp-accent);
  background: var(--cp-accent-glow);
}

/* Hamburger (mobile) */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 34px;
  height: 34px;
  border: 1px solid var(--cp-border);
  border-radius: 8px;
  background: var(--cp-surface-2);
  cursor: pointer;
  padding: 8px;
}

.hamburger span {
  display: block;
  height: 1.5px;
  background: var(--cp-text-muted);
  border-radius: 2px;
  transition: background 0.15s;
}

.hamburger:hover span {
  background: var(--cp-text);
}

/* ── Mobile nav drawer ──────────────────────────────────────────────────── */
.mobile-nav {
  display: none;
  width: 100%;
  flex-direction: column;
  padding: 8px 0 12px;
  border-top: 1px solid var(--cp-border);
  background: var(--cp-surface);
}

.mobile-link {
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--cp-text-muted);
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
}

.mobile-link:hover {
  color: var(--cp-text);
  background: var(--cp-surface-2);
}

/* ── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .navbar {
    height: auto;
    min-height: 56px;
    align-items: center;
  }

  .navbar-nav {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-nav {
    display: flex;
  }
}
</style>
