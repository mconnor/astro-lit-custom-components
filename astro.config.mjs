import { defineConfig } from 'astro/config';
import lit from '@astrojs/lit';

// https://astro.build/config
export default defineConfig({
	// Enable Lit to support LitHTML components and templates.
  integrations: [lit()],
    output: 'static',
  site: 'http://localhost:4321',
	vite: {
    ssr: {
      noExternal: ['date-fns', 'open-props'],
    },
  },
});
