// vite.config.ts
import { defineConfig } from "file:///C:/Users/thepr/OneDrive/Escritorio/smart-layout/node_modules/vite/dist/node/index.js";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "file:///C:/Users/thepr/OneDrive/Escritorio/smart-layout/node_modules/glob/dist/mjs/index.js";
import { libInjectCss } from "file:///C:/Users/thepr/OneDrive/Escritorio/smart-layout/node_modules/vite-plugin-lib-inject-css/dist/index.mjs";
import react from "file:///C:/Users/thepr/OneDrive/Escritorio/smart-layout/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///C:/Users/thepr/OneDrive/Escritorio/smart-layout/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\thepr\\OneDrive\\Escritorio\\smart-layout";
var __vite_injected_original_import_meta_url = "file:///C:/Users/thepr/OneDrive/Escritorio/smart-layout/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [react(), dts({ include: ["lib"] }), libInjectCss()],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/main.ts"),
      formats: ["es"]
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      input: Object.fromEntries(
        glob.sync("lib/**/*.{ts,tsx}").map((file) => [
          relative("lib", file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
        ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0aGVwclxcXFxPbmVEcml2ZVxcXFxFc2NyaXRvcmlvXFxcXHNtYXJ0LWxheW91dFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdGhlcHJcXFxcT25lRHJpdmVcXFxcRXNjcml0b3Jpb1xcXFxzbWFydC1sYXlvdXRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3RoZXByL09uZURyaXZlL0VzY3JpdG9yaW8vc21hcnQtbGF5b3V0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IGV4dG5hbWUsIHJlbGF0aXZlLCByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCB7IGdsb2IgfSBmcm9tIFwiZ2xvYlwiO1xuaW1wb3J0IHsgbGliSW5qZWN0Q3NzIH0gZnJvbSBcInZpdGUtcGx1Z2luLWxpYi1pbmplY3QtY3NzXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBkdHMoeyBpbmNsdWRlOiBbXCJsaWJcIl0gfSksIGxpYkluamVjdENzcygpXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJsaWIvbWFpbi50c1wiKSxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCJdLFxuICAgIH0sXG4gICAgY29weVB1YmxpY0RpcjogZmFsc2UsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcInJlYWN0XCIsIFwicmVhY3QvanN4LXJ1bnRpbWVcIl0sXG4gICAgICBpbnB1dDogT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgICBnbG9iXG4gICAgICAgICAgLnN5bmMoXCJsaWIvKiovKi57dHMsdHN4fVwiKVxuICAgICAgICAgIC5tYXAoKGZpbGUpID0+IFtcbiAgICAgICAgICAgIHJlbGF0aXZlKFwibGliXCIsIGZpbGUuc2xpY2UoMCwgZmlsZS5sZW5ndGggLSBleHRuYW1lKGZpbGUpLmxlbmd0aCkpLFxuICAgICAgICAgICAgZmlsZVVSTFRvUGF0aChuZXcgVVJMKGZpbGUsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAgIF0pXG4gICAgICApLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV1bZXh0bmFtZV1cIixcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwiW25hbWVdLmpzXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlUsU0FBUyxvQkFBb0I7QUFDeFcsU0FBUyxTQUFTLFVBQVUsZUFBZTtBQUMzQyxTQUFTLHFCQUFxQjtBQUM5QixTQUFTLFlBQVk7QUFDckIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sU0FBUztBQU5oQixJQUFNLG1DQUFtQztBQUF3SyxJQUFNLDJDQUEyQztBQVNsUSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUM7QUFBQSxFQUM1RCxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ3ZDLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxTQUFTLG1CQUFtQjtBQUFBLE1BQ3ZDLE9BQU8sT0FBTztBQUFBLFFBQ1osS0FDRyxLQUFLLG1CQUFtQixFQUN4QixJQUFJLENBQUMsU0FBUztBQUFBLFVBQ2IsU0FBUyxPQUFPLEtBQUssTUFBTSxHQUFHLEtBQUssU0FBUyxRQUFRLElBQUksRUFBRSxNQUFNLENBQUM7QUFBQSxVQUNqRSxjQUFjLElBQUksSUFBSSxNQUFNLHdDQUFlLENBQUM7QUFBQSxRQUM5QyxDQUFDO0FBQUEsTUFDTDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
