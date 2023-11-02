import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "9r1s2v",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5000",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
