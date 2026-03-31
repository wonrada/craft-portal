<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { useTheme } from '@/composables/useTheme'

const { initTheme } = useTheme()

onMounted(() => initTheme())
</script>

<template>
  <NavBar />
  <main class="main-content">
    <!-- Page views will be rendered here via <router-view> -->
    <slot />
  </main>
</template>

<style scoped>
.main-content {
  flex: 1;
  padding: 32px 24px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>
