import type { Handle } from '@sveltejs/kit';
import { toLocale } from '$lib/i18n';

/** Fills <html lang="%lang%"> in app.html for each prerendered language */
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', toLocale(event.params.lang))
	});
