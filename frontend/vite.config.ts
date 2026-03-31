import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Allow HMR to work when accessed through the nginx reverse proxy
    hmr: {
      clientPort: 80,
    },
  },
})
