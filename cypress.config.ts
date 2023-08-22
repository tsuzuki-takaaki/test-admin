import { defineConfig } from "cypress";

// refs: https://docs.cypress.io/guides/references/configuration
export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  viewportHeight: 800,
  viewportWidth: 1000,
});
