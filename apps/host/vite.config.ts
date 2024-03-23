import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

import type { UserConfig } from 'vite'

const mode = process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : 'production'

const previewServer = {
  port: 3030,
  proxy: {
    '/header': 'http://localhost:3031',
    '/body': 'http://localhost:3032',
  },
} as const satisfies UserConfig['preview']

// https://vitejs.dev/config/
export default defineConfig({
  mode,
  define: {
    'process.env.NODE_ENV': mode,
  },
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: false,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      external: ['react', 'react-dom/client', 'framer-motion'],
    },
  },
  preview: previewServer,
})
