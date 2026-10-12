import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/video": {
        target: "https://xperience.realestate/trecasa",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/video/, "/anna/onepager/video"),
      },
      "/foto": {
        target: "https://xperience.realestate/trecasa",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/foto/, "/anna/onepager/foto"),
      },
      "/documentos": {
        target: "https://xperience.realestate/trecasa",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/documentos/, "/anna/onepager/documentos"),
      },
    },
  },
});
