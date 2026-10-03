// A still field of the nucleus particles fixed to the visible area behind the whole page. It is drawn once, on load
// and on resize, and never reacts to the pointer. The hero draws its own particles over an opaque background, so the
// field never repaints on scroll.
import { DUST_TONES, PALETTES, currentTheme } from './theme.js';

const LEVELS = [0.3, 0.5, 0.72];

export function createField(canvas) {
	const ctx = canvas.getContext('2d', { alpha: true });
	if (!ctx) return { destroy() {} };
	let width = 0,
		height = 0,
		dpr = 1,
		seed = 211;
	const random = () => {
		seed = (seed * 16807) % 2147483647;
		return (seed - 1) / 2147483646;
	};
	const snap = (v) => Math.round(v * dpr) / dpr;

	function resize() {
		const colors = PALETTES[currentTheme()].colors;
		width = innerWidth;
		height = innerHeight;
		// Still, so it is drawn at full density: a still canvas costs nothing to composite, scrolling included.
		dpr = Math.min(devicePixelRatio || 1, 2);
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		seed = 211;
		// About one particle per 5500 px² of window keeps the field present without competing with the content.
		const buckets = Array.from({ length: colors.length * LEVELS.length }, () => []),
			min = 1 / dpr;
		for (let n = Math.round((width * height) / 5500); n > 0; n--) {
			const z = Math.pow(random(), 0.9),
				x = random() * width,
				y = random() * height;
			const level = Math.min(LEVELS.length - 1, Math.floor(z * LEVELS.length)),
				color = DUST_TONES[Math.floor(random() * DUST_TONES.length)];
			buckets[color * LEVELS.length + level].push(
				snap(x),
				snap(y),
				Math.max(min, snap((0.7 + random() * 0.9) * (0.7 + z * 0.6)))
			);
		}
		ctx.clearRect(0, 0, width, height);
		buckets.forEach((items, i) => {
			if (!items.length) return;
			ctx.globalAlpha = LEVELS[i % LEVELS.length];
			ctx.fillStyle = colors[Math.floor(i / LEVELS.length)];
			ctx.beginPath();
			for (let k = 0; k < items.length; k += 3)
				ctx.rect(items[k], items[k + 1], items[k + 2], items[k + 2]);
			ctx.fill();
		});
		ctx.globalAlpha = 1;
	}

	addEventListener('resize', resize);
	addEventListener('themechange', resize);
	resize();
	return {
		destroy() {
			removeEventListener('resize', resize);
			removeEventListener('themechange', resize);
		}
	};
}
