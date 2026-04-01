<script setup lang="ts">
interface Props {
  variant?:   'primary' | 'secondary' | 'ghost'
  size?:      'sm' | 'md' | 'lg'
  type?:      'button' | 'submit' | 'reset'
  loading?:   boolean
  disabled?:  boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant:   'primary',
  size:      'md',
  type:      'button',
  loading:   false,
  disabled:  false,
  fullWidth: false,
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading"
    class="inline-flex items-center justify-center gap-2 border rounded-lg font-[inherit] font-medium cursor-pointer transition-colors duration-150 whitespace-nowrap outline-none focus-visible:shadow-[0_0_0_3px_var(--cp-accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[
      variant === 'primary'
        ? 'bg-accent text-white border-accent hover:bg-accent-2 hover:border-accent-2 hover:shadow-[0_4px_14px_var(--cp-accent-glow)]'
        : '',
      variant === 'secondary'
        ? 'bg-surface-2 text-foreground border-border hover:bg-surface hover:border-accent hover:text-accent'
        : '',
      variant === 'ghost'
        ? 'bg-transparent text-muted border-transparent hover:bg-surface-2 hover:text-foreground'
        : '',
      size === 'sm' ? 'h-8 px-3 text-xs' : '',
      size === 'md' ? 'h-[42px] px-5 text-sm' : '',
      size === 'lg' ? 'h-[50px] px-7 text-[15px]' : '',
      fullWidth ? 'w-full' : '',
    ]"
  >
    <!-- Spinner -->
    <svg
      v-if="loading"
      class="animate-spin shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>

    <slot />
  </button>
</template>
