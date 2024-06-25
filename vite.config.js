import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "./src/main.js", // Ensure this is the correct path to your entry file
    },
  },
  optimizeDeps: {
    include: [], // Add specific dependencies here if needed
  },
});
