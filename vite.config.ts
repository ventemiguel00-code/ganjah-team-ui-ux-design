
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // ...
  build: {
    target: 'esnext',
    outDir: 'build',
    // <-- AÑADE ESTA LÍNEA
    chunkSizeWarningLimit: 1000, 
  },
  server: {
    port: 3000,
    open: true,
  },
});
