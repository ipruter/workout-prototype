import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// use root in dev; GH Pages subpath only in prod
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/workout-prototype/' : '/',
}));
