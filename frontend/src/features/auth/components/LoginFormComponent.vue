<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../composables/useAuth'
import { Button, InputField } from '@/components/base'

const { t } = useI18n()
const router = useRouter()
const { form, fieldErrors, serverError, loading, login } = useAuth()

async function handleSubmit() {
  const ok = await login()
  if (ok) router.push('/')
}

// Translate error keys returned by the composable
function te(key?: string): string | undefined {
  if (!key) return undefined
  // If the key starts with 'auth.' it's an i18n key, otherwise it's a raw server message
  return key.startsWith('auth.') ? t(key) : key
}
</script>

<template>
  <form class="flex flex-col gap-[18px]" novalidate @submit.prevent="handleSubmit">
    <!-- Server-level error -->
    <div v-if="serverError" class="flex items-center gap-2 px-[14px] py-3 bg-red-400/10 border border-red-400/30 rounded-lg text-[13px] text-red-400" role="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {{ te(serverError) }}
    </div>

    <!-- Email -->
    <InputField
      v-model="form.email"
      type="email"
      :label="t('auth.login.email')"
      :placeholder="t('auth.login.emailPlaceholder')"
      :error="te(fieldErrors.email)"
      autocomplete="email"
      required
    >
      <template #prefix>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </template>
    </InputField>

    <!-- Password -->
    <div class="flex items-center justify-between -mb-[10px]">
      <label class="text-[13px] font-medium text-muted">{{ t('auth.login.password') }}</label>
      <a href="#" class="text-xs text-accent no-underline transition-colors duration-150 hover:text-accent-2 hover:underline">{{ t('auth.login.forgotPassword') }}</a>
    </div>
    <InputField
      v-model="form.password"
      type="password"
      :placeholder="t('auth.login.passwordPlaceholder')"
      :error="te(fieldErrors.password)"
      autocomplete="current-password"
      required
    >
      <template #prefix>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </template>
    </InputField>

    <!-- Submit -->
    <Button
      type="submit"
      :loading="loading"
      full-width
      size="lg"
    >
      {{ loading ? t('auth.login.submitting') : t('auth.login.submit') }}
    </Button>
  </form>
</template>
