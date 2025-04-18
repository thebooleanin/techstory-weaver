import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Listen on all IPv6 and IPv4 addresses
    port: 8080, // Port for the Vite dev server
    proxy: {
      // Proxy API requests to your backend
      "/api": {
         target: "http://13.200.161.40:5000", // Backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api prefix
      },
      // Proxy static file requests to your backend
      "/uploads": {
         target: "http://13.200.161.40:5000", // Backend URL
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
   
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias for src directory
    },
  },
}));