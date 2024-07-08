import { defineConfig } from "astro/config";
import lit from "@astrojs/lit";
import { dev } from "astro";

// https://astro.build/config
export default defineConfig({
  // Enable Lit to support LitHTML components and templates.
  integrations: [lit()],
  output: "static",
  site: "http://localhost:4321",
  vite: {
    ssr: {
      noExternal: ["open-props"],
    },
    lit: {
      // Enable the `lit-analyzer` plugin to provide diagnostics in the editor.
      litAnalyzer: true,
      dev,
    },
  },
});
