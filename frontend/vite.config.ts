import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? "./" : "/",
  server: {
    port: 18744,
    strictPort: true,
    proxy: {
      "/api": {
        target: process.env.RS_WEB_API_TARGET || "http://127.0.0.1:18743",
        changeOrigin: true
      }
    }
  }
});
