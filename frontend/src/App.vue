<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBarComponent from '@/components/NavBarComponent.vue'
import { useTheme } from '@/composables/useTheme'

const { initTheme } = useTheme()
const route = useRoute()

onMounted(() => initTheme())
</script>

<template>
  <NavBarComponent v-if="!route.meta.hideNav" />
  <router-view />
</template>
