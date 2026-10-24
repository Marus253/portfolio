import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" → fonctionne sur GitHub Pages (sous-dossier /portfolio/) comme en local
export default defineConfig({
  plugins: [react()],
  base: "./",
});
