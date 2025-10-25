
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Mantener solo el alias principal para la carpeta 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    // 1. Aumentamos el límite de advertencia para silenciar el aviso
    // La verdadera optimización viene en rollupOptions.
    chunkSizeWarningLimit: 1000, 
    rollupOptions: {
      output: {
        // 2. Implementación de Code Splitting para dividir el código por librerías
        manualChunks(id) {
          // Si el archivo viene de node_modules (librerías de terceros)
          if (id.includes('node_modules')) {
            // Agrupa las librerías de UI y gráficos grandes en un chunk específico
            if (
              id.includes('@radix-ui') || 
              id.includes('recharts') || 
              id.includes('embla-carousel-react')
            ) {
              return 'vendor-ui-data';
            }
            // Agrupa el resto de las dependencias de node_modules en un chunk general
            return 'vendor-base';
          }
          // El código de tu aplicación (todo lo que no está en node_modules)
          // se dejará en el chunk 'index' principal.
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
