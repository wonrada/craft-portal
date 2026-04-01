<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LoginFormComponent from '@/features/auth/components/LoginFormComponent.vue'

const { t } = useI18n()
</script>

<template>
  <div
    class="min-h-svh flex items-center justify-center p-6 bg-bg"
    style="background-image: radial-gradient(ellipse 70% 55% at 50% 40%, var(--cp-accent-glow) 0%, transparent 65%)"
  >
    <div class="w-full max-w-[420px] bg-surface border border-border rounded-2xl p-10 shadow-[var(--cp-shadow-md)]">
      <!-- Brand -->
      <div class="flex items-center gap-[10px] mb-7">
        <div class="flex items-center [filter:drop-shadow(0_0_8px_var(--cp-accent-glow))]" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="var(--cp-accent)" />
            <path
              d="M8 14C8 10.686 10.686 8 14 8C16.21 8 18.143 9.19 19.196 10.97"
              stroke="white"
              stroke-width="2.2"
              stroke-linecap="round"
            />
            <circle cx="14" cy="14" r="2.5" fill="white" />
          </svg>
        </div>
        <span class="text-lg font-semibold tracking-[-0.3px] text-foreground">CraftPortal</span>
      </div>

      <!-- Heading -->
      <div class="mb-6">
        <h1 class="m-0 mb-1.5 text-[22px] font-semibold tracking-[-0.4px] text-foreground">{{ t('auth.login.title') }}</h1>
        <p class="m-0 text-sm text-muted">{{ t('auth.login.subtitle') }}</p>
      </div>

      <!-- Divider -->
      <div class="h-px bg-border mb-6" aria-hidden="true" />

      <!-- Form -->
      <LoginFormComponent />
    </div>
  </div>
</template>
