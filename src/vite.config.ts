import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // ESTE ES EL ÚNICO ALIAS NECESARIO
      '@': path.resolve(__dirname, './src'), 
      // ELIMINADO: Todo el bloque de aliases con números de versión
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    // AÑADIMOS ESTO PARA EVITAR LA ADVERTENCIA DE VERCEL (Opcional, pero recomendado)
    chunkSizeWarningLimit: 1000, 
    rollupOptions: {
      output: {
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
