import type { BiggerPictureInstance } from 'bigger-picture';
import 'bigger-picture/css';

let bp: BiggerPictureInstance;

/**
 * Dynamically imports bigger-picture and returns reusable instance.
 * If no target provided, instance will use document.body.
 */
export async function loadBp(target?: HTMLElement) {
	const BiggerPicture = (await import('bigger-picture/svelte')).default;
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
