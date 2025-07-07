import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vite.dev/config/


export default defineConfig({
  plugins: [react()],
   resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  server: {
    https: false,
    port: 5173,
    host: true,
  },
})