import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    historyApiFallback: true, // Ensures routes fallback to index.html
    watch: {
      usePolling: true, // Enable polling to prevent 'too many open files' error
      interval: 1000, // Adjust as needed (higher values reduce system load)
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Optional, ensures all chunks are handled correctly
      },
    },
  },
});
