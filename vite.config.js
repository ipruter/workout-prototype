import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/workout-prototype/', // IMPORTANT: repo name with slashes
})

