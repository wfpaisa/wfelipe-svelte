import type { BiggerPictureInstance } from 'bigger-picture';
import 'bigger-picture/css';

let bp: BiggerPictureInstance;

/**
 * Dynamically imports bigger-picture and returns reusable instance.
 * If no target provided, instance will use document.body.
 *
 * Uses the precompiled vanilla build: the `bigger-picture/svelte` source
 * targets Svelte 3 and is not compatible with Svelte 5.
 */
export async function loadBp(target?: HTMLElement) {
	const BiggerPicture = (await import('bigger-picture/vanilla')).default;
	if (target) {
		return BiggerPicture({ target });
	}
	if (!bp) {
		bp = BiggerPicture({
			target: document.body
		});
	}
	return bp;
}
