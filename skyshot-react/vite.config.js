import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Trigger redeploy
export default defineConfig({
  base: '/skyshot/',
  plugins: [react()],
});
