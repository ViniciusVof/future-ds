import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './src/config/envs',
  resolve: {
    alias: {
      components: "/src/components",
      routes: "/src/routes",
      pages: "/src/pages",
      assets: "/src/assets",
      services: "/src/services",
      config: "/src/config",
    },
  },
  plugins: [react()],
})
