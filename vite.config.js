import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Carregar variáveis de ambiente
export default defineConfig({
  plugins: [react()],

  base: process.env.NODE_ENV === 'production' ? '/AUDI/' : '/', // Ajusta a base dependendo do ambiente

  build: {
    outDir: 'dist/AUDI',  // Direciona a saída para a pasta correta
    assetsDir: 'assets',  // Mantém a pasta assets dentro de dist/AUDI
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', // Definição do nome dos arquivos
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },

  publicDir: 'public', // Garantir que a pasta public seja copiada para a build
});
