import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	compilerOptions: {
		// Force runes mode for the project, except for libraries
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},

	kit: {
		adapter: adapter({
			// See https://svelte.dev/docs/kit/adapter-cloudflare#Options
			// Cloudflare allows 100 rules in _routes.json and `<all>` expands to one rule per
			// file, so it gets truncated. The site is fully prerendered: exclude the build,
			// the prerendered pages and whole static folders so no request runs the Worker.
			routes: {
				include: ['/*'],
				exclude: [
					'<build>',
					'<prerendered>',
					'/favicon.png',
					'/favicon/*',
					'/fonts/*',
					'/images/*',
					'/styles/*'
				]
			}
		})
	}
};

export default config;
