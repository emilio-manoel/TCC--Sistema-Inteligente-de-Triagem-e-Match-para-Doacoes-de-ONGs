import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import reactCompilerPreset from 'babel-plugin-react-compiler'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ plugins: [reactCompilerPreset] })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://tcc-backend-26nv.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

