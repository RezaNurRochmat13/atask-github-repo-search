// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/atask-github-repo-search/', // Ganti dengan nama repository kamu
  plugins: [react()],
});