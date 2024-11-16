import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import pluginChecker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.VITE_PORT) || 5174, // Fallback to 3000 if VITE_PORT is not defined
  },
  plugins: [
    tsconfigPaths(),
    pluginChecker({ typescript: true }),
    react(),
    svgr({
      include: '**/*.svg',
    }),
  ],
  resolve: {},
});
