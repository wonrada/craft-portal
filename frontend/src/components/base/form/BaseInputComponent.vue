<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue: string
  label?:       string
  placeholder?: string
  type?:        'text' | 'email' | 'password'
  error?:       string | null
  hint?:        string
  disabled?:    boolean
  id?:          string
  autocomplete?: string
  required?:    boolean
}

const props = withDefaults(defineProps<Props>(), {
  type:     'text',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>()

const inputId = computed(() => props.id ?? `input-${Math.random().toString(36).slice(2, 8)}`)
const showPassword = ref(false)

const resolvedType = computed(() => {
  if (props.type === 'password') return showPassword.value ? 'text' : 'password'
  return props.type
})

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function onBlur(e: FocusEvent) {
  emit('blur', e)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="text-[13px] font-medium text-muted tracking-[0.02em] cursor-pointer">
      {{ label }}
      <span v-if="required" class="text-accent ml-[2px]" aria-hidden="true">*</span>
    </label>

    <!-- Input wrapper -->
    <div class="relative flex items-center">
      <!-- Prefix icon slot -->
      <span v-if="$slots.prefix" class="absolute left-3 flex items-center text-subtle pointer-events-none" aria-hidden="true">
        <slot name="prefix" />
      </span>

      <input
        :id="inputId"
        :type="resolvedType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
        class="w-full h-[42px] px-3 bg-surface-2 border rounded-lg text-sm font-[inherit] text-foreground outline-none transition-[border-color,box-shadow,background] duration-150 placeholder:text-subtle disabled:opacity-50 disabled:cursor-not-allowed"
        :class="[
          $slots.prefix ? 'pl-[38px]' : '',
          type === 'password' ? 'pr-10' : '',
          error
            ? 'border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.18)]'
            : 'border-border focus:border-accent focus:shadow-[0_0_0_3px_var(--cp-accent-glow)] focus:bg-surface',
        ]"
        @input="onInput"
        @blur="onBlur"
      />

      <!-- Password toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute right-[10px] flex items-center justify-center w-6 h-6 bg-transparent border-none rounded cursor-pointer text-subtle transition-colors duration-150 hover:text-muted"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        @click="showPassword = !showPassword"
      >
        <!-- Eye open -->
        <svg
          v-if="!showPassword"
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
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <!-- Eye off -->
        <svg
          v-else
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
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      </button>
    </div>

    <!-- Error message -->
    <p v-if="error" :id="`${inputId}-error`" class="m-0 text-xs text-red-400" role="alert">
      {{ error }}
    </p>

    <!-- Hint text -->
    <p v-else-if="hint" :id="`${inputId}-hint`" class="m-0 text-xs text-subtle">
      {{ hint }}
    </p>
  </div>
</template>
