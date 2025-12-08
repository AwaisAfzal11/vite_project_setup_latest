// This enables absolute imports (e.g., Components/Navbar instead of ../../Components/Navbar).

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      Components: path.resolve(__dirname, './src/Components'),
      Pages: path.resolve(__dirname, './src/Pages'),
      Assets: path.resolve(__dirname, './src/assets'), // Note: Vite uses lowercase 'assets' by default
    },
  },
})