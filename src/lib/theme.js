// The resolved theme lives on <html data-theme>, set before paint by the script in app.html. A saved choice wins;
// without one the page follows the system. Canvases read their colours from here and listen for `themechange`.
const KEY = 'theme';

export const PALETTES = {
	light: {
		ink: 'oklch(0.321 0.066 258)',
		primary: 'oklch(0.591 0.187 23)',
		rule: 'oklch(0.8 0.035 262)',
		// The nucleus tones come from the palette: two of ink, two blue greys between ink and rule, three of the accent.
		colors: [
			'oklch(0.321 0.066 258)',
			'oklch(0.41 0.08 259)',
			'oklch(0.52 0.075 261)',
			'oklch(0.6 0.08 262)',
			'oklch(0.52 0.17 22)',
			'oklch(0.591 0.187 23)',
			'oklch(0.68 0.13 27)'
		]
	},
	dark: {
		ink: 'oklch(0.923 0.031 263.5)',
		primary: 'oklch(0.549 0.219 15)',
		rule: 'oklch(0.38 0.03 270)',
		colors: [
			'oklch(0.923 0.031 263.5)',
			'oklch(0.8 0.05 262)',
			'oklch(0.68 0.07 263)',
			'oklch(0.56 0.07 266)',
			'oklch(0.549 0.219 15)',
			'oklch(0.64 0.19 20)',
			'oklch(0.74 0.13 27)'
		]
	}
};

// Indices into `colors` for loose dust and the page field: mostly the blue greys, a little ink and accent.
export const DUST_TONES = [1, 2, 2, 2, 3, 3, 3, 3, 5];

export const currentTheme = () =>
	document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

function system() {
	return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function stored() {
	try {
		const value = localStorage.getItem(KEY);
		return value === 'dark' || value === 'light' ? value : null;
	} catch {
		return null;
	}
}

/** Keeps the browser chrome colour in step with the page. */
export function syncThemeColor() {
	document
		.querySelector('meta[name="theme-color"]')
		?.setAttribute(
			'content',
			currentTheme() === 'dark' ? 'oklch(0.19 0.02 270)' : 'oklch(0.978 0.011 286)'
		);
}

function apply(theme) {
	if (document.documentElement.dataset.theme === theme) return;
	document.documentElement.dataset.theme = theme;
	syncThemeColor();
	dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

/** Saves and applies a theme. With an origin on screen, the new theme spreads from it in a soft circle. */
export function setTheme(theme, origin) {
	try {
		localStorage.setItem(KEY, theme);
	} catch {}
	if (currentTheme() === theme) return;
	if (
		!origin ||
		document.hidden ||
		!document.startViewTransition ||
		matchMedia('(prefers-reduced-motion: reduce)').matches
	)
		return apply(theme);
	reveal(theme, origin);
}

// The reveal: the new theme grows from the toggle in a circle with a soft edge (the mask lives in app.css), and a
// band of dust in both palettes rides that edge and drifts outward, so light and dark dissolve into each other.
const REVEAL_MS = 1100;
const FEATHER = 140;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function reveal(theme, origin) {
	// A toggle scrolled out of view still starts the reveal from the nearest edge
	const x = Math.min(innerWidth, Math.max(0, origin.x)),
		y = Math.min(innerHeight, Math.max(0, origin.y));
	const root = document.documentElement,
		end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + FEATHER;
	root.style.setProperty('--reveal-x', x + 'px');
	root.style.setProperty('--reveal-y', y + 'px');
	root.style.setProperty('--reveal-end', end + 'px');
	root.classList.add('theme-reveal');
	const dust = sprinkle(theme, x, y, end);
	const transition = document.startViewTransition(() => apply(theme));
	transition.ready.then(dust.start, dust.start);
	transition.finished.finally(() => root.classList.remove('theme-reveal'));
}

function sprinkle(theme, ox, oy, end) {
	const canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		ratio = Math.min(2, devicePixelRatio || 1),
		w = innerWidth,
		h = innerHeight;
	canvas.className = 'theme-dust';
	canvas.setAttribute('aria-hidden', 'true');
	canvas.width = w * ratio;
	canvas.height = h * ratio;
	document.body.append(canvas);
	if (!ctx) return { start: () => canvas.remove() };
	ctx.scale(ratio, ratio);
	const tones = (name) => DUST_TONES.map((i) => PALETTES[name].colors[i]),
		fresh = tones(theme),
		old = tones(theme === 'dark' ? 'light' : 'dark'),
		dots = [];
	let t0 = 0,
		last = 0;
	function spawn(r, now) {
		for (let n = 0; n < 34; n++) {
			const angle = Math.random() * Math.PI * 2,
				at = r + (Math.random() - 0.5) * FEATHER * 0.8,
				px = ox + Math.cos(angle) * at,
				py = oy + Math.sin(angle) * at;
			if (px < -4 || py < -4 || px > w + 4 || py > h + 4) continue;
			const speed = 0.02 + Math.random() * 0.09,
				pool = Math.random() < 0.6 ? fresh : old;
			dots.push({
				x: px,
				y: py,
				vx: Math.cos(angle) * speed - Math.sin(angle) * (Math.random() - 0.5) * 0.05,
				vy: Math.sin(angle) * speed + Math.cos(angle) * (Math.random() - 0.5) * 0.05,
				born: now,
				life: 450 + Math.random() * 550,
				size: 1.4 + Math.random() * 1.8,
				color: pool[(Math.random() * pool.length) | 0]
			});
		}
	}
	function frame(now) {
		const dt = Math.min(48, now - (last || now));
		last = now;
		const k = Math.min(1, (now - t0) / REVEAL_MS);
		if (k < 1) spawn(ease(k) * end - FEATHER / 2, now);
		ctx.clearRect(0, 0, w, h);
		for (let i = dots.length - 1; i >= 0; i--) {
			const q = dots[i],
				age = (now - q.born) / q.life;
			if (age >= 1) {
				dots.splice(i, 1);
				continue;
			}
			q.x += q.vx * dt;
			q.y += q.vy * dt;
			ctx.globalAlpha = (1 - age) * (1 - age) * Math.min(1, age * 6);
			ctx.fillStyle = q.color;
			ctx.fillRect(q.x - q.size / 2, q.y - q.size / 2, q.size, q.size);
		}
		if (k < 1 || dots.length) requestAnimationFrame(frame);
		else canvas.remove();
	}
	let started = false;
	return {
		start() {
			if (started) return;
			started = true;
			t0 = performance.now();
			requestAnimationFrame(frame);
		}
	};
}

/** Follows the system while nothing is saved. Returns a cleanup. */
export function watchSystemTheme() {
	const media = matchMedia('(prefers-color-scheme: dark)');
	const changed = () => {
		if (!stored()) apply(system());
	};
	media.addEventListener('change', changed);
	return () => media.removeEventListener('change', changed);
}
