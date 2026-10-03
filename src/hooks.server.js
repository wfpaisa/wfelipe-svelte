export const handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', event.url.pathname.startsWith('/en') ? 'en' : 'es')
	});
