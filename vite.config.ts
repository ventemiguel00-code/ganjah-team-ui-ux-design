
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Mantenemos solo el alias esencial para la carpeta 'src'
      '@': path.resolve(__dirname, './src'),
      // Se eliminaron todos los aliases con números de versión
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    // 1. Aumentamos el límite de advertencia para evitar el mensaje en Vercel
    chunkSizeWarningLimit: 1000, // 1MB
    rollupOptions: {
      output: {
        // 2. Implementación de Code Splitting agresiva y simple
        manualChunks(id) {
          // Si el archivo proviene de la carpeta de dependencias (node_modules)
          if (id.includes('node_modules')) {
            // Se agrupará TODO el código de librerías de terceros en un único archivo 'vendor'
            return 'vendor';
          }
          // El resto del código es el de tu aplicación
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
