import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/n8n": {
        target: "https://garvitdayal.app.n8n.cloud",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/n8n/,
            "/webhook/eb22e461-2f50-4fcc-bf3e-d334a17b7766"
          ),
        secure: true,
      },
    },
  },
});
