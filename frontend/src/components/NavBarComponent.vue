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
  <header class="sticky top-0 z-50 flex items-center flex-wrap min-h-14 md:h-[60px] px-6 bg-surface border-b border-border shadow-[var(--cp-shadow-sm)]">
    <!-- ── Logo ─────────────────────────────────────────────────────── -->
    <a href="/" class="flex items-center gap-[10px] no-underline shrink-0 mr-8" aria-label="CraftPortal home">
      <span class="flex items-center [filter:drop-shadow(0_0_6px_var(--cp-accent-glow))]" aria-hidden="true">
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
      <span class="text-base font-semibold tracking-[-0.3px] text-foreground">CraftPortal</span>
    </a>

    <!-- ── Desktop nav links ─────────────────────────────────────────── -->
    <nav class="hidden md:flex items-center gap-1 flex-1" aria-label="Main navigation">
      <a href="#" class="px-3 py-1.5 rounded-md text-sm font-medium text-muted no-underline transition-colors duration-150 hover:text-foreground hover:bg-surface-2">{{ t('nav.dashboard') }}</a>
      <a href="#" class="px-3 py-1.5 rounded-md text-sm font-medium text-muted no-underline transition-colors duration-150 hover:text-foreground hover:bg-surface-2">{{ t('nav.projects') }}</a>
      <a href="#" class="px-3 py-1.5 rounded-md text-sm font-medium text-muted no-underline transition-colors duration-150 hover:text-foreground hover:bg-surface-2">{{ t('nav.clients') }}</a>
      <a href="#" class="px-3 py-1.5 rounded-md text-sm font-medium text-muted no-underline transition-colors duration-150 hover:text-foreground hover:bg-surface-2">{{ t('nav.settings') }}</a>
    </nav>

    <!-- ── Controls ─────────────────────────────────────────────────── -->
    <div class="flex items-center gap-2 ml-auto shrink-0">
      <!-- Language switcher -->
      <div class="flex items-center bg-surface-2 border border-border rounded-lg p-[2px] gap-[2px]" :aria-label="t('lang.label')">
        <button
          v-for="lang in langs"
          :key="lang.code"
          class="px-[10px] py-1 border-none rounded-md text-xs font-semibold tracking-[0.04em] cursor-pointer transition-colors duration-150 leading-none"
          :class="locale === lang.code
            ? 'bg-accent text-white shadow-[0_1px_4px_var(--cp-accent-glow)]'
            : 'bg-transparent text-muted hover:text-foreground'"
          @click="setLocale(lang.code)"
        >
          {{ lang.label }}
        </button>
      </div>

      <!-- Theme toggle -->
      <button
        class="flex items-center justify-center w-[34px] h-[34px] border border-border rounded-lg bg-surface-2 text-muted cursor-pointer transition-colors duration-150 shrink-0 hover:text-accent hover:border-accent hover:bg-[var(--cp-accent-glow)]"
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
        class="flex md:hidden flex-col justify-center gap-[5px] w-[34px] h-[34px] border border-border rounded-lg bg-surface-2 cursor-pointer p-2 [&>span]:block [&>span]:h-[1.5px] [&>span]:bg-muted [&>span]:rounded-sm hover:[&>span]:bg-foreground"
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
    <nav v-if="mobileOpen" class="flex md:hidden w-full flex-col py-2 border-t border-border bg-surface" aria-label="Mobile navigation">
      <a href="#" class="px-4 py-[10px] text-sm font-medium text-muted no-underline transition-colors duration-150 hover:text-foreground hover:bg-surface-2" @click="mobileOpen = false">{{ t('nav.dashboard') }}</a>
      <a href="#" class="px-4 py-[10px] text-sm font-medium text-muted no-underline transition-colors duration-150 hover:text-foreground hover:bg-surface-2" @click="mobileOpen = false">{{ t('nav.projects') }}</a>
      <a href="#" class="px-4 py-[10px] text-sm font-medium text-muted no-underline transition-colors duration-150 hover:text-foreground hover:bg-surface-2" @click="mobileOpen = false">{{ t('nav.clients') }}</a>
      <a href="#" class="px-4 py-[10px] text-sm font-medium text-muted no-underline transition-colors duration-150 hover:text-foreground hover:bg-surface-2" @click="mobileOpen = false">{{ t('nav.settings') }}</a>
    </nav>
  </header>
</template>
