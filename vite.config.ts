
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // ESTE ES EL ÚNICO ALIAS CORRECTO Y NECESARIO
      '@': path.resolve(__dirname, './src'), 
      // *** SE ELIMINÓ TODO EL BLOQUE DE ALIASES CON NÚMEROS DE VERSIÓN ***
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    // Opcional: Aumentamos el límite para evitar la advertencia de Vercel
    chunkSizeWarningLimit: 1000, // 1MB
    rollupOptions: {
      output: {
        // Optimización: Agrupa todas las librerías de node_modules en un solo archivo 'vendor'
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; 
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
