import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.tsx', // or your custom entry file
    },
  },
});
