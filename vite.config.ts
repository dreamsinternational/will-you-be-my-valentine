import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";
  const isProd = mode === "production";

  return {
    base: isVercel || !isProd ? "/" : "/will-you-be-my-valentine",
    plugins: [react()],
    build: {
      sourcemap: false,
    },
  };
});
