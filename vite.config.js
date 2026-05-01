import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// This config allows Vite to be run from the root directory
// while keeping the source code in the 'client' folder.
export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  plugins: [react(), tailwindcss()],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  }
})
