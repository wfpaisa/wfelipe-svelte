import adapter from '@sveltejs/adapter-cloudflare';

export default {
	kit: {
		adapter: adapter({
			// Cloudflare allows 100 rules in _routes.json and `<all>` expands to one rule per
			// file, so it gets truncated. The site is fully prerendered: exclude the build,
			// the prerendered pages and the static files so no request runs the Worker.
			routes: {
				include: ['/*'],
				exclude: [
					'<build>',
					'<prerendered>',
					'/favicon.svg',
					'/felipe-uribe.jpg',
					'/robots.txt',
					'/sitemap.xml',
					'/projects/*'
				]
			}
		})
	}
};
