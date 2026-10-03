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

export function setTheme(theme) {
	try {
		localStorage.setItem(KEY, theme);
	} catch {}
	apply(theme);
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
