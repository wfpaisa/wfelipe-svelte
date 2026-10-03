// The nucleus is computed at runtime. Letter origins are sampled from the live headline.
// Once per visit it is preceded by a story told in particles, «Del diseño al sistema», read from left to right: a
// sentence says what is told, then each era of Felipe's career gets its own chapter. Its year, company, line and
// tools are on the left; the particles leave the year and build the interface of that era on the right, which holds
// to be read. In the time jump the interface comes apart and flows back into the next year while the year counter
// and the timeline run, and the cycle starts again from that year.
// At «hoy» the last interface flattens into the top plane of the nucleus, a stack of five layers (design, grid,
// components, logic, data) that unfolds into the system beneath it and writes the headline. At rest the stack keeps
// folding and unfolding slowly; the nucleus, the dust and the headline answer the pointer.
//
// The script, with its copy, its timings and what each interface shows, is GUION.md at the root of the repository.
// Any change to CHAPTERS, INTRO_COPY, the timings, SITES or STACK goes into GUION.md in the same change, and the
// other way round: a change asked for in the script is made here.
import { DUST_TONES, PALETTES, currentTheme } from './theme.js';
import { experience } from './content.js';

// One chapter per era, in order. The year and the company come from the career in content.js; the line says in a
// few words what was built then, and the words are the tools of that era, typed while its interface is built.
const CHAPTERS = [
	{
		id: 'webcreativa',
		es: 'Desarrollé más de 97 sitios web y me especialicé en ecommerce y CMS.',
		en: 'I developed over 97 websites and specialized in ecommerce and CMS.',
		words: {
			es: ['HTML', 'CSS', 'jQuery', 'PHP', 'Joomla', 'WordPress'],
			en: ['HTML', 'CSS', 'jQuery', 'PHP', 'Joomla', 'WordPress']
		}
	},
	{
		id: 'codigital',
		es: 'Desarrollé tiendas y aplicaciones, del frontend al backend, con interfaces que destacaban por sus detalles.',
		en: 'I developed stores and applications, from frontend to backend, with interfaces that stood out for their details.',
		words: {
			es: ['AngularJS', 'Node.js', 'API REST', 'Drupal', 'Sass'],
			en: ['AngularJS', 'Node.js', 'REST API', 'Drupal', 'Sass']
		}
	},
	{
		id: 'todo-artes',
		es: 'Alcanzando miles de ventas, diseñé y desarrollé una tienda en línea, desde las interfaces hasta las integraciones.',
		en: 'Reaching thousands of sales, I designed and developed an online store, from interfaces to integrations.',
		words: {
			es: ['PrestaShop', 'PHP', 'Docker', 'pagos', 'envíos'],
			en: ['PrestaShop', 'PHP', 'Docker', 'payments', 'shipping']
		}
	},
	{
		id: 'comodisimos',
		es: 'Desarrollé el frontend del POS que acompañó un salto en las ventas de la empresa.',
		en: 'I developed the frontend of the POS that accompanied a jump in the company’s sales.',
		words: {
			es: ['React', 'Vue', 'VTEX', 'Docker'],
			en: ['React', 'Vue', 'VTEX', 'Docker']
		}
	},
	{
		id: 'puntos',
		es: 'Creé el sistema de componentes y la arquitectura frontend con microfrontends. Acompañé al equipo en UX e IA.',
		en: 'I created the component system and frontend architecture with microfrontends. I supported the team in UX and AI.',
		words: {
			es: ['Angular', 'TypeScript', 'Vitest', 'Docker', 'IA'],
			en: ['Angular', 'TypeScript', 'Vitest', 'Docker', 'AI']
		}
	}
].map((chapter) => {
	const era = experience.find((item) => item.id === chapter.id);
	return { ...chapter, name: era.name, year: era.start[0] };
});
// The year each era starts, from Felipe's professional history.
const YEARS = CHAPTERS.map((chapter) => chapter.year);
// The act index of the particles that stay dust for the whole story.
const DUST = CHAPTERS.length;
const NOW = Math.max(new Date().getFullYear(), YEARS.at(-1) + 1);
const NOW_LABEL = { es: 'HOY', en: 'TODAY' };
// The opening sentence: it tells the visitor that what follows is a career told through time.
const INTRO_COPY = {
	es: `Cómo ha cambiado mi trabajo en la web desde ${YEARS[0]}.`,
	en: `How my work on the web has changed since ${YEARS[0]}.`
};
// Backing-store pixel budget for the hero: a full 4K hero fits, larger stores lower their density instead.
const HERO_BUDGET = 2.2e6;

// The script in seconds, the same on every screen, paced for an average reader (see «Ritmo» in GUION.md): each
// chapter's copy stays up long enough to be read at about 13 characters a second while the eye also follows the
// interface, a finished interface stays complete for 2 s before it leaves and no particle flight takes under a second.
// INTRO: the sentence is typed and the timeline draws in.
// Each chapter is split into the steps below (seconds from its start, when its year has landed): caption = company and
// line arrive; words = the tools are typed; build = the particles set off from the year, module by module, and land
// TRAVEL seconds later (live details set off up to 1.25 build units, so everything has landed 2 s before the jump);
// jump = when the time jump starts. The jump lasts JUMP seconds: the interface comes apart into the next year while
// the counter runs to it. The last chapter has no jump: it holds HOLD_LAST seconds, then folds into the nucleus.
const INTRO = 4.8,
	STEPS = { caption: [0, 1.2], words: [0.5, 2.2], build: [1.6, 4.6], jump: 8.6 },
	JUMP = 2.4,
	HOLD_LAST = 10;
// Seconds a particle takes to fly between the year and its place in an interface, either way. On the way back the
// interface comes apart from the side nearest the year: RETURN_SPREAD seconds between its left and right edges.
const TRAVEL = 1.2,
	RETURN_SPREAD = 0.7;
// The interfaces always turn the same way: clockwise seen from above, so the near side moves left. One comes in turned
// TURN_IN radians and tilted TILT_IN, turns on to face the visitor as it is built and keeps drifting the same way at
// DRIFT radians a second, tilted TILT; the nucleus unfolds turning the same way. A turn back would read as a jolt.
const TURN_IN = 0.35,
	TILT_IN = 0.18,
	TILT = 0.05,
	DRIFT = 0.018;
function makePlan() {
	let s = INTRO;
	const acts = CHAPTERS.map((_, i) => {
		const at = ([a, b]) => [s + a, s + b];
		const act = {
			start: s,
			caption: at(STEPS.caption),
			words: at(STEPS.words),
			build: at(STEPS.build),
			jump: i === CHAPTERS.length - 1 ? null : at([STEPS.jump, STEPS.jump + JUMP])
		};
		s += STEPS.jump + JUMP;
		return act;
	});
	const f = acts.at(-1).start + HOLD_LAST;
	return {
		acts,
		// The opening sentence is typed in this window, then stays to be read before the first year arrives.
		intro: [0.4, 2.8],
		// Collapse: the last interface flattens into the top plane of the nucleus while the year runs to today and
		// flips to «HOY»; the stack is drawn under it, unfolds into its five layers and writes the headline.
		fold: [f, f + 2.2],
		years: [f, f + 1.6],
		hoy: [f + 1.6, f + 2.1],
		core: [f + 0.7, f + 2.2],
		unfold: [f + 2.2, f + 3.6],
		handoff: [f + 2.3, f + 3.2],
		write: [f + 2.7, f + 4.4],
		reveal: [f + 3, f + 4.6],
		copy: [f + 3.9, f + 5.1],
		end: f + 5.1
	};
}
const plan = makePlan();
const INK_INDEX = 7;
// Headline stipple: fine dots scattered at random (no grid, so no mesh or maze pattern), denser along the edges of
// the letterforms the way the nucleus gathers along its ribbons. Densities are dots per dot-area: light inside the
// strokes, packed in a band along their outline whose width is `edge` of the font size.
const STIPPLE = { inside: 0.38, outline: 1.9, edge: 0.017 };
// Colours follow the page theme; the arrays are refilled in place so every reader sees the switch.
let INK, PRIMARY, RULE;
const colors = [];
// Story tones: 0 ink, 1 primary, 2 rule, 3+ the nucleus colours.
const TONES = [];
const T_INK = 0,
	T_ACCENT = 1,
	T_FAINT = 2,
	T_LIFT = 4,
	T_MID = 5,
	T_GREY = 6;
// The nucleus is written with the nucleus colours only: a story tone maps to its index in `colors`.
const colorOf = (tone) => (tone >= 3 ? tone - 3 : [0, 5, 3][tone]);
function usePalette(theme) {
	const p = PALETTES[theme];
	INK = p.ink;
	PRIMARY = p.primary;
	RULE = p.rule;
	colors.splice(0, colors.length, ...p.colors);
	TONES.splice(0, TONES.length, INK, PRIMARY, RULE, ...colors);
}
usePalette('light');
const LEVELS = [0.16, 0.32, 0.5, 0.7, 0.9];
const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const span = (e, [a, b]) => clamp((e - a) / (b - a));
const smooth = (t) => t * t * (3 - 2 * t);
const outCubic = (t) => 1 - Math.pow(1 - t, 3);

// Interfaces are drawn in stage units: x and y run from 0 to 1 across a stage whose height is ASPECT of its width.
// Each primitive belongs to a module whose `at` says when it is built (0–1 across the build, up to 1.25 for the
// details that come alive afterwards). `sweep` makes its particles land in order along it, so lines are typed and
// bars grow; `flow` keeps them travelling along it; `clone` builds it over the first copy, then slides it out.
const ASPECT = 0.62;
// Lengths of running text lines, in turn.
const TEXT = [1, 0.84, 0.93, 0.6];
function ui(draw) {
	const out = [];
	let at = 0;
	const push = (shape, o) =>
		out.push({ tone: T_INK, sweep: 0, clone: 0, flow: 0, weight: 1, at, ...shape, ...o });
	const rectPoints = (x, y, w, h) => [
		[x, y],
		[x + w, y],
		[x + w, y + h],
		[x, y + h],
		[x, y]
	];
	const api = {
		at: (value) => (at = value),
		path: (pts, o) => push({ kind: 'p', pts }, o),
		line: (x, y, x2, y2, o) =>
			api.path(
				[
					[x, y],
					[x2, y2]
				],
				o
			),
		rect: (x, y, w, h, o) => api.path(rectPoints(x, y, w, h), o),
		// An image placeholder: a frame crossed by its diagonals.
		image: (x, y, w, h, o) => {
			api.rect(x, y, w, h, o);
			api.line(x, y, x + w, y + h, o);
			api.line(x + w, y, x, y + h, o);
		},
		block: (x, y, w, h, o) => push({ kind: 'f', x, y, w, h }, o),
		// A filled bar that grows upwards when swept.
		bar: (x, y, w, h, o) => push({ kind: 'b', x, y, w, h }, o),
		// Circles take their radius in stage widths, so they stay round.
		ring: (x, y, r, o) => push({ kind: 'c', x, y, r }, o),
		disc: (x, y, r, o) => push({ kind: 'o', x, y, r }, o),
		// A check mark in a box `s` stage widths wide, square on screen.
		check: (x, y, s, o) =>
			api.path(
				[
					[x, y + (s * 0.55) / ASPECT],
					[x + s * 0.38, y + s / ASPECT],
					[x + s, y]
				],
				o
			),
		// `n` lines of running text, typed from left to right.
		text: (x, y, w, n, o = {}) => {
			for (let i = 0; i < n; i++) {
				const ly = y + i * (o.gap || 0.04);
				api.line(x, ly, x + w * TEXT[i % TEXT.length], ly, { tone: T_MID, sweep: 0.1, ...o });
			}
		}
	};
	draw(api);
	return out;
}
// A browser window: frame, title bar, three dots and the address field.
function browser(u, x = 0, y = 0, w = 1, h = 1) {
	u.at(0);
	u.rect(x, y, w, h);
	u.line(x, y + 0.075 * h, x + w, y + 0.075 * h);
	for (let i = 0; i < 3; i++) u.disc(x + 0.02 + i * 0.02, y + 0.0375 * h, 0.005, { tone: T_MID });
	u.rect(x + 0.1 + 0.05 * w, y + 0.018 * h, 0.4 * w, 0.04 * h, { tone: T_MID });
}

const SITES = [
	// 2009 · Webcreativa: a fixed-width content site: tab menu, banner slider, two articles, a sidebar and a footer.
	ui((u) => {
		browser(u);
		u.at(0.1);
		u.line(0.1, 0.075, 0.1, 1, { tone: T_MID });
		u.line(0.9, 0.075, 0.9, 1, { tone: T_MID });
		u.at(0.16);
		u.block(0.13, 0.115, 0.12, 0.065);
		for (let i = 0; i < 5; i++)
			u.rect(0.45 + i * 0.087, 0.13, 0.078, 0.05, { tone: i ? T_MID : T_ACCENT });
		u.line(0.1, 0.205, 0.9, 0.205);
		u.at(0.3);
		u.image(0.13, 0.24, 0.74, 0.24);
		for (let i = 0; i < 4; i++)
			(i ? u.ring : u.disc)(0.455 + i * 0.03, 0.52, 0.0055, { tone: i ? T_MID : T_ACCENT });
		[0.58, 0.76].forEach((y, i) => {
			u.at(0.46 + i * 0.12);
			u.image(0.13, y, 0.11, 0.13, { tone: T_MID });
			u.block(0.27, y + 0.005, 0.24 - i * 0.04, 0.024);
			u.text(0.27, y + 0.06, 0.3, 3);
		});
		u.at(0.7);
		u.rect(0.63, 0.58, 0.19, 0.055, { tone: T_MID });
		u.block(0.82, 0.58, 0.05, 0.055);
		u.block(0.63, 0.68, 0.12, 0.02);
		for (let i = 0; i < 4; i++) {
			const y = 0.73 + i * 0.045;
			u.disc(0.636, y, 0.003, { tone: T_MID });
			u.line(0.648, y, 0.648 + 0.17 * TEXT[i], y, { tone: T_MID, sweep: 0.06 });
		}
		u.at(0.84);
		u.line(0.1, 0.93, 0.9, 0.93);
		u.line(0.4, 0.962, 0.6, 0.962, { tone: T_MID, sweep: 0.08 });
	}),
	// 2014 · CO/Digital: a client's single-page site, its phone version and the REST API that feeds both.
	ui((u) => {
		browser(u, 0, 0, 0.6, 1);
		u.at(0.12);
		u.block(0.03, 0.11, 0.08, 0.04);
		for (let i = 0; i < 4; i++)
			u.line(0.3 + i * 0.065, 0.13, 0.35 + i * 0.065, 0.13, { tone: T_MID });
		u.at(0.22);
		u.block(0.03, 0.21, 0.29, 0.036);
		u.block(0.03, 0.265, 0.21, 0.036);
		u.text(0.03, 0.34, 0.26, 2);
		u.rect(0.03, 0.42, 0.12, 0.06, { tone: T_ACCENT });
		// Geometric shapes, as on the agency's own site.
		u.ring(0.47, 0.31, 0.07);
		u.ring(0.405, 0.4, 0.03, { tone: T_ACCENT });
		u.path(
			[
				[0.5, 0.41],
				[0.56, 0.5],
				[0.44, 0.5],
				[0.5, 0.41]
			],
			{ tone: T_MID }
		);
		for (let c = 0; c < 3; c++) {
			const x = 0.03 + c * 0.19;
			u.at(0.38 + c * 0.06);
			u.ring(x + 0.02, 0.6, 0.018);
			u.block(x, 0.66, 0.12, 0.02);
			u.text(x, 0.71, 0.15, 2);
		}
		u.at(0.58);
		u.rect(0.03, 0.84, 0.3, 0.065, { tone: T_MID });
		u.block(0.35, 0.84, 0.1, 0.065);
		u.at(0.64);
		u.rect(0.66, 0.06, 0.15, 0.88);
		u.line(0.66, 0.14, 0.81, 0.14);
		u.ring(0.735, 0.895, 0.011, { tone: T_MID });
		u.at(0.72);
		u.block(0.675, 0.17, 0.045, 0.025);
		for (let i = 0; i < 3; i++)
			u.line(0.775, 0.17 + i * 0.016, 0.795, 0.17 + i * 0.016, { tone: T_MID });
		u.block(0.675, 0.24, 0.12, 0.022);
		u.block(0.675, 0.28, 0.085, 0.022);
		u.rect(0.675, 0.33, 0.065, 0.04, { tone: T_ACCENT });
		u.ring(0.735, 0.5, 0.032);
		u.text(0.675, 0.62, 0.12, 3, { gap: 0.035 });
		u.at(0.84);
		for (let i = 0; i < 3; i++) {
			const y = 0.3 + i * 0.14;
			u.rect(0.87, y, 0.13, 0.11);
			u.disc(0.89, y + 0.055, 0.005, { tone: T_ACCENT });
			u.line(0.91, y + 0.055, 0.98, y + 0.055, { tone: T_MID });
		}
		// Requests travel between the interfaces and the API.
		u.at(1);
		u.line(0.81, 0.5, 0.87, 0.5, { tone: T_ACCENT, flow: 0.45 });
		u.path(
			[
				[0.6, 0.7],
				[0.63, 0.7],
				[0.63, 0.965],
				[0.935, 0.965],
				[0.935, 0.72]
			],
			{ tone: T_ACCENT, flow: 0.3 }
		);
	}),
	// 2018 · Todo en Artes: an online store: search, cart, filters, a product grid and checkout in three steps.
	ui((u) => {
		browser(u);
		u.at(0.1);
		u.block(0.03, 0.105, 0.12, 0.05);
		u.rect(0.24, 0.105, 0.42, 0.05, { tone: T_MID });
		u.ring(0.635, 0.13, 0.009);
		u.line(0.642, 0.145, 0.65, 0.158);
		u.path([
			[0.855, 0.11],
			[0.868, 0.11],
			[0.878, 0.155],
			[0.915, 0.155],
			[0.925, 0.125],
			[0.872, 0.125]
		]);
		u.disc(0.882, 0.172, 0.004);
		u.disc(0.912, 0.172, 0.004);
		u.ring(0.965, 0.13, 0.012, { tone: T_MID });
		u.at(0.2);
		u.line(0, 0.2, 1, 0.2, { tone: T_MID });
		for (let i = 0; i < 6; i++) {
			const x = 0.03 + i * 0.11;
			u.line(x, 0.235, x + 0.07 * TEXT[i % 4], 0.235, { tone: i ? T_MID : T_INK, sweep: 0.05 });
		}
		u.line(0, 0.27, 1, 0.27, { tone: T_MID });
		u.at(0.3);
		u.block(0.03, 0.31, 0.1, 0.022);
		for (let i = 0; i < 5; i++) {
			const y = 0.37 + i * 0.055;
			u.rect(0.03, y, 0.016, 0.026, { tone: i === 1 ? T_ACCENT : T_MID });
			u.line(0.058, y + 0.013, 0.058 + 0.11 * TEXT[(i + 1) % 4], y + 0.013, { tone: T_MID });
		}
		u.line(0.03, 0.68, 0.19, 0.68, { tone: T_MID });
		u.disc(0.06, 0.68, 0.006);
		u.disc(0.16, 0.68, 0.006);
		for (let i = 0; i < 8; i++) {
			const x = 0.24 + (i % 4) * 0.19,
				y = 0.31 + Math.floor(i / 4) * 0.3;
			u.at(0.42 + i * 0.055);
			u.image(x, y, 0.17, 0.16);
			u.line(x, y + 0.19, x + 0.13 * TEXT[i % 4], y + 0.19, { tone: T_MID, sweep: 0.06 });
			u.block(x, y + 0.215, 0.045, 0.024);
			u.rect(x + 0.1, y + 0.21, 0.07, 0.034, { tone: T_ACCENT });
		}
		// Checkout in three steps: cart, shipping, payment.
		u.at(0.88);
		u.line(0.32, 0.935, 0.88, 0.935, { tone: T_MID });
		for (let i = 0; i < 3; i++) u.ring(0.32 + i * 0.28, 0.935, 0.012);
		// It comes alive: a product lands in the cart and the checkout advances step by step.
		u.at(1);
		u.disc(0.926, 0.105, 0.01, { tone: T_ACCENT });
		u.line(0.32, 0.935, 0.88, 0.935, { tone: T_ACCENT, sweep: 0.2 });
		for (let i = 0; i < 3; i++)
			u.disc(0.32 + i * 0.28, 0.935, 0.008, { tone: T_ACCENT, at: 1 + i * 0.06 });
	}),
	// 2019 · Comodísimos: the sales system: navigation, figures, a chart that grows and sales arriving in a table.
	ui((u) => {
		browser(u);
		u.at(0.1);
		u.line(0.15, 0.075, 0.15, 1, { tone: T_MID });
		u.block(0.025, 0.105, 0.1, 0.045);
		for (let i = 0; i < 6; i++) {
			const y = 0.22 + i * 0.085,
				tone = i ? T_MID : T_ACCENT;
			u.ring(0.04, y, 0.01, { tone });
			u.line(0.06, y, 0.06 + 0.065 * TEXT[i % 4], y, { tone });
		}
		u.at(0.2);
		u.rect(0.18, 0.1, 0.3, 0.05, { tone: T_MID });
		u.ring(0.955, 0.125, 0.014);
		for (let i = 0; i < 4; i++) {
			const x = 0.18 + i * 0.205;
			u.at(0.28 + i * 0.05);
			u.rect(x, 0.19, 0.19, 0.14, { tone: T_MID });
			u.block(x + 0.015, 0.215, 0.08, 0.036);
			u.line(x + 0.015, 0.29, x + 0.1, 0.29, { tone: T_MID });
			u.path(
				[
					[x + 0.12, 0.3],
					[x + 0.14, 0.275],
					[x + 0.155, 0.285],
					[x + 0.175, 0.24]
				],
				{ tone: i === 1 ? T_ACCENT : T_MID }
			);
		}
		u.at(0.5);
		u.line(0.18, 0.38, 0.18, 0.93);
		u.line(0.18, 0.93, 0.6, 0.93);
		for (let k = 0; k < 3; k++)
			u.line(0.18, 0.52 + k * 0.135, 0.6, 0.52 + k * 0.135, { tone: T_FAINT });
		const bars = [0.24, 0.32, 0.27, 0.4, 0.35, 0.44, 0.5, 0.42];
		bars.forEach((h, i) =>
			u.bar(0.2 + i * 0.05, 0.93 - h, 0.03, h, {
				at: 0.58,
				sweep: 0.4,
				tone: i === 6 ? T_ACCENT : T_MID
			})
		);
		u.at(0.66);
		u.rect(0.64, 0.38, 0.34, 0.55, { tone: T_MID });
		u.block(0.66, 0.41, 0.1, 0.022);
		u.line(0.64, 0.46, 0.98, 0.46, { tone: T_MID });
		for (let i = 0; i < 6; i++) {
			const y = 0.505 + i * 0.07;
			u.at(0.72 + i * 0.07);
			u.disc(0.665, y, 0.006, { tone: i % 3 ? T_MID : T_ACCENT });
			u.line(0.685, y, 0.685 + 0.13 * TEXT[i % 4], y, { tone: T_MID, sweep: 0.05 });
			u.block(0.885, y - 0.012, 0.075, 0.024);
		}
		// The trend is drawn over the bars once they are up.
		u.at(1);
		u.path(
			bars.map((h, i) => [0.215 + i * 0.05, 0.93 - h - 0.07]),
			{ tone: T_ACCENT, sweep: 0.2 }
		);
	}),
	// 2022 · Puntos Colombia: Angular components, a card cloned into a list, a form, and the tests that cover them.
	ui((u) => {
		browser(u);
		u.at(0.1);
		u.block(0.03, 0.105, 0.1, 0.045);
		for (let i = 0; i < 3; i++)
			u.line(0.22 + i * 0.08, 0.128, 0.27 + i * 0.08, 0.128, { tone: T_MID });
		u.ring(0.565, 0.128, 0.014, { tone: T_MID });
		u.line(0.62, 0.075, 0.62, 1, { tone: T_MID });
		// One card component is assembled, then cloned twice into a list.
		u.at(0.2);
		for (let i = 0; i < 3; i++) {
			const x = 0.03 + i * 0.195,
				clone = { clone: i * 0.195 };
			u.rect(x, 0.21, 0.175, 0.29, clone);
			u.ring(x + 0.032, 0.27, 0.016, { tone: T_ACCENT, ...clone });
			u.block(x + 0.06, 0.255, 0.085, 0.022, clone);
			u.line(x + 0.02, 0.35, x + 0.155, 0.35, { tone: T_MID, ...clone });
			u.line(x + 0.02, 0.39, x + 0.12, 0.39, { tone: T_MID, ...clone });
			u.rect(x + 0.02, 0.43, 0.075, 0.042, clone);
		}
		u.at(0.55);
		u.rect(0.03, 0.57, 0.36, 0.065, { tone: T_MID });
		u.line(0.045, 0.582, 0.045, 0.623, { tone: T_ACCENT });
		u.rect(0.42, 0.575, 0.065, 0.055);
		u.disc(0.465, 0.6025, 0.013, { tone: T_ACCENT });
		u.at(0.62);
		u.rect(0.03, 0.68, 0.026, 0.042);
		u.check(0.034, 0.69, 0.018, { tone: T_ACCENT });
		u.line(0.07, 0.7, 0.2, 0.7, { tone: T_MID });
		u.rect(0.26, 0.675, 0.225, 0.06, { tone: T_MID });
		u.path(
			[
				[0.455, 0.695],
				[0.465, 0.712],
				[0.475, 0.695]
			],
			{ tone: T_MID }
		);
		u.at(0.7);
		u.block(0.03, 0.8, 0.15, 0.075);
		u.rect(0.2, 0.8, 0.15, 0.075, { tone: T_ACCENT });
		// The test runner: a progress bar and one row per spec, pending.
		u.at(0.62);
		u.block(0.65, 0.105, 0.13, 0.03);
		u.line(0.65, 0.19, 0.97, 0.19, { tone: T_MID });
		for (let i = 0; i < 8; i++) {
			const y = 0.26 + i * 0.085;
			u.at(0.68 + i * 0.035);
			u.ring(0.666, y, 0.01, { tone: T_MID });
			u.line(0.69, y, 0.69 + 0.25 * TEXT[i % 4], y, { tone: T_MID, sweep: 0.08 });
		}
		// Every spec passes, one after another, and the bar fills.
		u.at(0.98);
		u.line(0.65, 0.19, 0.97, 0.19, { tone: T_ACCENT, sweep: 0.24 });
		for (let i = 0; i < 8; i++)
			u.check(0.66, 0.26 + i * 0.085 - 0.012, 0.013, {
				tone: T_ACCENT,
				at: 0.98 + i * 0.028,
				sweep: 0.04
			});
	})
];

// The nucleus: an interface and the system beneath it, five planes from top to bottom. Each plane is drawn in plane
// units (u across, v from the far edge) with the same primitives as the interfaces; `weight` thins or thickens a
// primitive's share of the points. The threads cross every plane where an element of the design has its component,
// its node and its data.
const NODES = [
	[0.5, 0.05],
	[0.32, 0.34],
	[0.79, 0.28],
	[0.715, 0.47],
	[0.18, 0.75],
	[0.5, 0.75],
	[0.82, 0.75]
];
const STACK = {
	width: 1.5,
	depth: 1,
	gap: 0.28,
	layers: [
		// Design: the interface as it is seen.
		ui((u) => {
			u.rect(0, 0, 1, 1);
			u.line(0, 0.1, 1, 0.1);
			u.block(0.04, 0.03, 0.12, 0.045);
			for (let i = 0; i < 4; i++)
				u.line(0.58 + i * 0.1, 0.05, 0.65 + i * 0.1, 0.05, { tone: T_MID });
			u.image(0.04, 0.16, 0.55, 0.36, { tone: T_LIFT });
			u.block(0.64, 0.18, 0.3, 0.045);
			u.block(0.64, 0.25, 0.22, 0.045);
			[1, 0.85, 0.6].forEach((l, i) =>
				u.line(0.64, 0.33 + i * 0.035, 0.64 + 0.3 * l, 0.33 + i * 0.035, { tone: T_MID })
			);
			u.rect(0.64, 0.44, 0.15, 0.06, { tone: T_ACCENT });
			u.block(0.64, 0.44, 0.15, 0.06, { tone: T_ACCENT });
			for (let c = 0; c < 3; c++) {
				const x = 0.04 + c * 0.32;
				u.rect(x, 0.6, 0.28, 0.3, { tone: T_LIFT });
				u.image(x + 0.02, 0.62, 0.24, 0.13, { tone: T_MID });
				u.line(x + 0.02, 0.8, x + 0.2, 0.8, { tone: T_MID });
				u.line(x + 0.02, 0.84, x + 0.15, 0.84, { tone: T_MID });
			}
		}),
		// Grid: twelve columns and the rows the design sits on.
		ui((u) => {
			u.rect(0, 0, 1, 1, { tone: T_GREY });
			for (let c = 1; c < 12; c++) u.line(c / 12, 0, c / 12, 1, { tone: T_GREY, weight: 0.35 });
			for (let r = 1; r < 8; r++) u.line(0, r / 8, 1, r / 8, { tone: T_GREY, weight: 0.15 });
		}),
		// Components: the blocks the design is made of, in its own footprint.
		ui((u) => {
			u.rect(0, 0, 1, 1, { tone: T_MID });
			u.block(0, 0, 1, 0.1, { tone: T_LIFT, weight: 0.35 });
			u.block(0.04, 0.16, 0.55, 0.36, { tone: T_LIFT, weight: 0.3 });
			u.block(0.64, 0.18, 0.3, 0.22, { tone: T_MID, weight: 0.4 });
			u.block(0.64, 0.44, 0.15, 0.06, { tone: T_ACCENT, weight: 1.6 });
			for (let c = 0; c < 3; c++)
				u.block(0.04 + c * 0.32, 0.6, 0.28, 0.3, { tone: T_LIFT, weight: 0.3 });
		}),
		// Logic: the component tree as nodes and links, a node under each block.
		ui((u) => {
			u.rect(0, 0, 1, 1, { tone: T_MID });
			[
				[0, 1],
				[0, 2],
				[2, 3],
				[0, 4],
				[0, 5],
				[0, 6],
				[4, 5],
				[5, 6]
			].forEach(([a, b]) => u.line(...NODES[a], ...NODES[b], { tone: T_GREY }));
			NODES.forEach(([x, y], i) => u.disc(x, y, 0.028, { tone: i === 3 ? T_ACCENT : T_INK }));
		}),
		// Data: records as a matrix of points, one row in accent.
		ui((u) => {
			u.rect(0, 0, 1, 1, { tone: T_MID });
			for (let i = 0; i < 16; i++)
				for (let j = 0; j < 11; j++)
					if ((i * 7 + j * 3) % 10 < 7)
						u.disc(0.04 + i * 0.0613, 0.05 + j * 0.09, 0.006, { tone: j === 5 ? 7 : T_GREY });
		})
	],
	// [u, v, tone]: the button, the main image and the middle card, through every layer.
	threads: [
		[0.715, 0.47, T_ACCENT],
		[0.32, 0.34, 7],
		[0.5, 0.75, T_ACCENT]
	]
};
// Height of each plane when unfolded, top (design) to bottom (data); screen y grows downwards.
const STACK_Y = STACK.layers.map((_, i) => (i - (STACK.layers.length - 1) / 2) * STACK.gap);
// The rest pose: a three-quarter view from above. FOLDED is how far the stack closes when it breathes.
const REST_YAW = -0.62,
	REST_PITCH = 0.46,
	FOLDED = 0.06;
// At rest the stack breathes: it stays open, folds into the design, stays folded and opens again (seconds).
const BREATH = { open: 7, close: 2.4, shut: 2.2, reopen: 2.4 };
// The gate before the story, in seconds: the play forms, holds, breaks up toward the control; a click's wave lasts `wave`.
const GATE = { form: 1.8, hold: 1.4, dissolve: 5, fall: 2.4, wave: 1.3 };

export function createNucleus(canvas, headline, onState, { lang = 'es' } = {}) {
	const ctx = canvas.getContext('2d', { alpha: true });
	if (!ctx) return { replay() {}, skip() {}, destroy() {} };
	const hero = canvas.parentElement;
	const motion = matchMedia('(prefers-reduced-motion: reduce)');
	const copy = lang === 'en' ? 'en' : 'es',
		nowLabel = NOW_LABEL[copy];
	let width = 0,
		height = 0,
		dpr = 1,
		points = [],
		letters = [],
		raf = 0,
		start = 0;
	let visible = true,
		destroyed = false,
		moving = false;
	// x/y: normalised offset for parallax; px/py: canvas pixels for the magnet and ripples.
	const pointer = { x: 0, y: 0, px: -1e4, py: -1e4, inside: false };
	// The nucleus turns slowly on its own; a drag adds velocity that decays over a few seconds.
	const turn = { yaw: 0, pitch: 0, velocity: 0, pitchVelocity: 0, drag: null };
	let ripples = [],
		spin = 0,
		lastTime = 0,
		storyYaw = 0;
	// Story layout: the stage holds the interfaces, the caption column the sentence, the year and each chapter's
	// copy, and the ruler is the timeline from the first year to today.
	let small = false,
		stage = null,
		caption = null,
		ruler = null,
		intro = [],
		chapters = [],
		particles = [],
		nucleusY = 0;
	let seed = 117;
	const random = () => {
		seed = (seed * 16807) % 2147483647;
		return (seed - 1) / 2147483646;
	};
	const sourceCanvas = document.createElement('canvas');
	const sourceContext = sourceCanvas.getContext('2d', { willReadFrequently: true });
	const buckets = Array.from({ length: TONES.length * LEVELS.length }, () => []);

	function samplePixels(draw, step) {
		sourceCanvas.width = Math.ceil(width);
		sourceCanvas.height = Math.ceil(height);
		sourceContext.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
		draw(sourceContext);
		const data = sourceContext.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height).data,
			out = [];
		for (let y = 0; y < sourceCanvas.height; y += step)
			for (let x = 0; x < sourceCanvas.width; x += step)
				if (data[(y * sourceCanvas.width + x) * 4 + 3] > 110) out.push({ x, y });
		return out;
	}
	function shuffle(list) {
		for (let i = list.length - 1; i > 0; i--) {
			const j = Math.floor(random() * (i + 1));
			[list[i], list[j]] = [list[j], list[i]];
		}
		return list;
	}

	// A point on a primitive in canvas pixels: t runs along it (the order of a sweep), u spreads across fills.
	const placed = { x: 0, y: 0 };
	function place(p, t, u) {
		if (p.kind === 'p') {
			let d = t * p.length,
				i = 0;
			while (i < p.lengths.length - 1 && d > p.lengths[i]) d -= p.lengths[i++];
			const [ax, ay] = p.points[i],
				[bx, by] = p.points[i + 1],
				k = p.lengths[i] ? d / p.lengths[i] : 0;
			placed.x = ax + (bx - ax) * k;
			placed.y = ay + (by - ay) * k;
		} else if (p.kind === 'f') {
			placed.x = p.X + t * p.W;
			placed.y = p.Y + u * p.H;
		} else if (p.kind === 'b') {
			placed.x = p.X + u * p.W;
			placed.y = p.Y + p.H - t * p.H;
		} else {
			const angle = t * Math.PI * 2 - Math.PI / 2,
				r = p.kind === 'o' ? Math.sqrt(u) * p.R : p.R;
			placed.x = p.X + Math.cos(angle) * r;
			placed.y = p.Y + Math.sin(angle) * r;
		}
		return placed;
	}
	// Points spread over primitives in proportion to their size in the frame ({x, y, w, h} in pixels).
	function samplePrims(list, count, frame) {
		const prims = list.map((p) => {
			const q = { ...p, clone: p.clone * frame.w };
			if (p.kind === 'p') {
				q.points = p.pts.map(([x, y]) => [frame.x + x * frame.w, frame.y + y * frame.h]);
				q.lengths = q.points
					.slice(1)
					.map(([x, y], i) => Math.hypot(x - q.points[i][0], y - q.points[i][1]));
				q.length = q.lengths.reduce((sum, l) => sum + l, 0);
				q.weight = q.length;
			} else if (p.kind === 'f' || p.kind === 'b') {
				q.X = frame.x + p.x * frame.w;
				q.Y = frame.y + p.y * frame.h;
				q.W = p.w * frame.w;
				q.H = p.h * frame.h;
				q.weight = q.W * q.H * 0.14;
			} else {
				q.X = frame.x + p.x * frame.w;
				q.Y = frame.y + p.y * frame.h;
				q.R = p.r * frame.w;
				q.weight =
					p.kind === 'o'
						? Math.max(Math.PI * q.R * q.R * 0.14, Math.PI * q.R * 1.2)
						: Math.PI * 2 * q.R;
			}
			q.weight *= p.weight;
			return q;
		});
		const total = prims.reduce((sum, p) => sum + p.weight, 0),
			out = [];
		for (let i = 0; i < count; i++) {
			let pick = random() * total,
				prim = prims[0];
			for (const p of prims) {
				pick -= p.weight;
				if (pick <= 0) {
					prim = p;
					break;
				}
			}
			// Flowing particles gather in packets so their travel reads as data moving.
			const t = prim.flow ? (Math.floor(random() * 6) + random() * 0.35) / 6 : random(),
				u = random();
			const { x, y } = place(prim, t, u);
			out.push({
				x,
				y,
				t,
				u,
				prim: prim.flow ? prim : null,
				flow: prim.flow,
				tone: prim.tone,
				layer: prim.layer,
				clone: prim.clone,
				slide: prim.at + 0.3,
				// When it sets off from the year, in build units: its module, its place along a sweep and a little spread.
				arrive: prim.at + prim.sweep * t + random() * (prim.sweep ? 0.04 : 0.12)
			});
		}
		return out;
	}
	const sampleSite = (list, count) => samplePrims(list, count, stage);
	// The nucleus points: the five planes of STACK and the threads through them, in nucleus units around the centre.
	function sampleStack(count) {
		const { width: w, depth: d } = STACK,
			frame = { x: 0, y: 0, w: 720, h: (720 * d) / w },
			prims = STACK.layers.flatMap((list, layer) => list.map((p) => ({ ...p, layer }))),
			threads = Math.round(count * 0.05);
		const out = samplePrims(prims, count - threads, frame).map((s) => ({
			x: (s.x / frame.w - 0.5) * w,
			z: (0.5 - s.y / frame.h) * d,
			layer: s.layer,
			color: colorOf(s.tone)
		}));
		for (let i = 0; i < threads; i++) {
			const [u, v, tone] = STACK.threads[i % STACK.threads.length];
			out.push({
				x: (u - 0.5) * w + (random() - 0.5) * 0.006,
				z: (0.5 - v) * d + (random() - 0.5) * 0.006,
				layer: STACK.layers.length,
				t: random(),
				color: colorOf(tone)
			});
		}
		// Shuffled, so any stride through the points (the letters, the story particles) samples every layer.
		return shuffle(out).map((p) => ({
			...p,
			jy: (random() - 0.5) * 0.012,
			size: 0.8 + random() * 1.15
		}));
	}

	function stageCenter() {
		return { x: stage.x + stage.w / 2, y: stage.y + stage.h / 2 };
	}
	function wrap(text, font, max) {
		sourceContext.font = font;
		const lines = [];
		let line = '';
		for (const word of text.split(' ')) {
			const next = line ? line + ' ' + word : word;
			if (line && sourceContext.measureText(next).width > max) {
				lines.push(line);
				line = word;
			} else line = next;
		}
		if (line) lines.push(line);
		return lines;
	}

	function layoutStory() {
		// The caption column starts where the headline does, so the year sits where the headline will be written.
		const canvasRect = canvas.getBoundingClientRect(),
			box = headline.getBoundingClientRect(),
			display = parseFloat(getComputedStyle(headline).fontSize) || 120;
		const left = Math.max(16, box.left - canvasRect.left),
			top = Math.max(16, box.top - canvasRect.top + (small ? 4 : display * 0.08));
		const yearSize = Math.round(display * (small ? 0.9 : 0.74)),
			nameSize = small ? 13 : Math.round(Math.min(16, Math.max(14, width * 0.0105))),
			lineSize = small ? 20 : Math.round(Math.min(28, Math.max(22, width * 0.018))),
			wordSize = small ? 13 : Math.round(Math.min(16, Math.max(13, width * 0.0105))),
			introSize = small ? 26 : Math.round(Math.min(46, Math.max(26, width * 0.027)));
		// Wide screens keep the bottom strip free for the motion control; on phones the control overlays the canvas.
		ruler = small
			? { x0: left, x1: width - left, y: height - 98 }
			: { x0: left, x1: width * 0.96, y: height - 66 - 26 };
		let column = width - 2 * left;
		if (!small) {
			// The stage takes the right half; the caption column keeps the rest.
			const areaTop = 24,
				areaBottom = ruler.y - 52,
				w = Math.min(width * 0.5, (areaBottom - areaTop) / ASPECT),
				h = w * ASPECT;
			stage = { x: width * 0.96 - w, y: (areaTop + areaBottom) / 2 - h / 2, w, h };
			column = Math.min(560, stage.x - 56 - left);
		}
		sourceContext.font = `400 ${yearSize}px Anton`;
		const cell = Math.max(...'0123456789'.split('').map((d) => sourceContext.measureText(d).width)),
			cap = sourceContext.measureText('0').actualBoundingBoxAscent || yearSize * 0.8;
		caption = {
			x: left,
			top,
			yearSize,
			yearBase: top + yearSize * 0.9,
			cell,
			cap,
			squeeze: small ? 0.78 : 0.76,
			nameSize,
			lineSize,
			wordSize,
			introSize
		};
		intro = wrap(INTRO_COPY[copy], `600 ${introSize}px Manrope`, column).map((text, i) => ({
			text,
			y: top + introSize * (0.95 + i * 1.18)
		}));
		let bottom = 0;
		chapters = CHAPTERS.map((chapter) => {
			const lines = wrap(chapter[copy], `600 ${lineSize}px Manrope`, column).map((text, k) => ({
				text,
				y: caption.yearBase + lineSize * (1.8 + k * 1.35)
			}));
			const nameY = lines.at(-1).y + nameSize * 1.9;
			let x = left,
				y = nameY + nameSize + wordSize * 1.7;
			sourceContext.font = `400 ${wordSize}px "DM Mono"`;
			const words = chapter.words[copy].map((text) => {
				const w = sourceContext.measureText(text).width;
				if (x > left && x + w > left + column) {
					x = left;
					y += wordSize * 2.3;
				}
				const item = { text, x, y, w, size: wordSize };
				x += w + wordSize * 1.6;
				return item;
			});
			bottom = Math.max(bottom, y + wordSize);
			return { name: chapter.name, nameY, lines, words };
		});
		if (small) {
			// Phones stack the caption, the stage and the timeline.
			const areaTop = bottom + 30,
				areaBottom = ruler.y - 44,
				w = Math.min(width - left, (areaBottom - areaTop) / ASPECT),
				h = w * ASPECT;
			stage = { x: width / 2 - w / 2, y: (areaTop + areaBottom) / 2 - h / 2, w, h };
		}
		// Each year in particles: the points of its digits as the counter draws them. The particles of an era set off
		// from its year and come back into the next one.
		const years = YEARS.map((year) =>
			shuffle(
				samplePixels((c2) => {
					c2.font = `400 ${caption.yearSize}px Anton`;
					c2.fillStyle = '#000';
					[...String(year)].forEach((digit, i) => digitAt(c2, digit, i, caption.yearBase));
				}, 2)
			)
		);
		// The number of particles grows with the career: each era adds its own to those of the eras before.
		const count = small ? 5000 : 12000,
			dust = small ? 1000 : 2200,
			born = [0.5, 0.62, 0.75, 0.87, 1].map((share) => Math.floor(count * share));
		const sites = SITES.map((list, i) => sampleSite(list, born[i]));
		particles = Array.from({ length: count + dust }, (_, i) => {
			// Particles 0–count belong to the interfaces, born in the era of their first one; the rest is dust.
			const found = born.findIndex((b) => i < b),
				act = found < 0 ? DUST : found;
			const loose = random() < 0.08,
				angle = random() * Math.PI * 2,
				reach = loose ? 2 + random() * 6 : random() * 0.9,
				last = sites.at(-1)[i];
			return {
				act,
				years: years.map((list) => list[i % list.length]),
				sites: sites.map((s) => s[i]),
				// Where it lands when the last interface lies down on the top plane of the nucleus: the same spot of
				// the plane as of the interface, its top edge at the back.
				flat: last && {
					x: ((last.x - stage.x) / stage.w - 0.5) * STACK.width,
					z: (0.5 - (last.y - stage.y) / stage.h) * STACK.depth,
					layer: 0,
					jy: 0
				},
				hr: Math.sqrt(random()),
				ha: random() * Math.PI * 2,
				z: Math.pow(random(), 0.8),
				phase: random() * Math.PI * 2,
				speed: 0.6 + random() * 0.8,
				jx: Math.cos(angle) * reach,
				jy: Math.sin(angle) * reach,
				jz: (random() - 0.5) * (loose ? 30 : 8),
				delay: random() * 0.3,
				dustTone: 3 + DUST_TONES[Math.floor(random() * DUST_TONES.length)]
			};
		});
	}

	function resize() {
		const rect = canvas.getBoundingClientRect();
		width = rect.width;
		height = rect.height;
		// Phones keep their full density (the budget still bounds them) so the halftone headline stays fine.
		dpr = Math.min(
			devicePixelRatio || 1,
			rect.width < 700 ? 3 : 1.5,
			Math.sqrt(HERO_BUDGET / Math.max(1, rect.width * rect.height))
		);
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		seed = 117;
		small = width < 700;
		magnetReach = small ? 70 : 110;
		magnetLimit = small ? 34 : 52;
		nucleusY = parseFloat(getComputedStyle(hero).getPropertyValue('--nucleus-y')) || 0;
		// The stack is drawn with fewer points than a volume would need: its planes are lines, rules and dots.
		points = sampleStack(small ? 8000 : 24000);
		// The headline is drawn only with particles: its pixels are sampled densely enough for the strokes to read as
		// solid, and they are the landing places for the particles that leave the nucleus in the last act.
		letters = [];
		let sampled = 0,
			lines = 0;
		const dotPx = Math.min(2, Math.max(1, Math.round(dpr)));
		const canvasRect = canvas.getBoundingClientRect();
		for (const element of headline.querySelectorAll('[data-line]')) {
			const box = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			lines++;
			if (box.bottom < canvasRect.top || box.top > canvasRect.bottom) continue;
			sampled++;
			const source = document.createElement('canvas');
			source.width = Math.ceil(box.width);
			source.height = Math.ceil(box.height);
			const c = source.getContext('2d');
			const text = element.textContent;
			c.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
			c.textBaseline = 'alphabetic';
			const metrics = c.measureText(text);
			c.scale(box.width / metrics.width, 1);
			c.fillText(text, 0, parseFloat(style.paddingTop) + parseFloat(style.fontSize) * 0.86);
			const data = c.getImageData(0, 0, source.width, source.height).data;
			// A blurred copy tells how far inside a stroke a point is: about half alpha on the outline, full deep inside.
			const soft = document.createElement('canvas');
			soft.width = source.width;
			soft.height = source.height;
			const sc = soft.getContext('2d');
			sc.filter = `blur(${Math.max(1.4, parseFloat(style.fontSize) * STIPPLE.edge)}px)`;
			sc.drawImage(source, 0, 0);
			const blur = sc.getImageData(0, 0, soft.width, soft.height).data;
			// One size of fine dot, scattered at random: packed along the outline, light inside the strokes.
			// Pulled by the pointer, a dot takes its nucleus colour.
			const tries = Math.round(
				((source.width * source.height * dpr * dpr) / (dotPx * dotPx)) * STIPPLE.outline
			);
			for (let n = 0; n < tries; n++) {
				const x = random() * source.width,
					y = random() * source.height,
					k = (Math.floor(y) * source.width + Math.floor(x)) * 4 + 3;
				if (data[k] <= 110) continue;
				const outline = clamp((1 - blur[k] / 255) / 0.42);
				if (
					random() * STIPPLE.outline >
					STIPPLE.inside + (STIPPLE.outline - STIPPLE.inside) * outline
				)
					continue;
				const i = letters.length,
					p = points[(i * 31) % points.length];
				letters.push({
					x: box.left - canvasRect.left + x,
					y: box.top - canvasRect.top + y,
					p,
					line: x / box.width,
					delay: random() * 0.3,
					color: INK_INDEX,
					loose: p.color,
					px: dotPx
				});
			}
		}
		// The real text stays in the document for reading and assistive tech; it is only hidden when every line is drawn.
		headline.classList.toggle('particle-headline', lines > 0 && sampled === lines);
		document.documentElement.classList.remove('headline-pending');
		for (const p of points) p.px = Math.max(1, Math.round(p.size * dpr));
		coreLayer.key = letterLayer.key = '';
		layoutStory();
		if (gate) buildGate();
		draw(performance.now());
	}

	// On phones the canvas covers the whole hero; --nucleus-y keeps the nucleus below the actions.
	let magnetReach = 110,
		magnetLimit = 52;
	function center() {
		return {
			x: width * (small ? 0.52 : 0.78),
			y: small ? nucleusY || height * 0.72 : height * 0.45
		};
	}
	function radius() {
		return width * (small ? 0.34 : 0.2);
	}
	// The nucleus pose is resolved once per frame; position() then only multiplies. `fold` is how open the stack is:
	// 1 shows the five layers apart, FOLDED closes them onto the design plane.
	const view = { x: 0, y: 0, r: 0, fold: 1, cosYaw: 1, sinYaw: 0, cosPitch: 1, sinPitch: 0 };
	function setView(fold) {
		const c = center(),
			yaw = REST_YAW + storyYaw + turn.yaw,
			pitch = REST_PITCH + turn.pitch;
		view.x = c.x;
		view.y = c.y;
		view.r = radius();
		view.fold = fold;
		view.cosYaw = Math.cos(yaw);
		view.sinYaw = Math.sin(yaw);
		view.cosPitch = Math.cos(pitch);
		view.sinPitch = Math.sin(pitch);
	}
	// How open the stack is at rest: it holds open, folds into the design, holds and opens again.
	let restSince = 0;
	function restFold(time) {
		if (motion.matches) return 1;
		const { open, close, shut, reopen } = BREATH,
			s = ((time - restSince) / 1000) % (open + close + shut + reopen);
		const k =
			s < open
				? 1
				: s < open + close
					? 1 - smooth((s - open) / close)
					: s < open + close + shut
						? 0
						: smooth((s - open - close - shut) / reopen);
		return FOLDED + (1 - FOLDED) * k;
	}
	function position(p) {
		// A plane sits at its height times the fold; a thread runs from the top plane to the bottom one.
		const top = STACK_Y[0],
			py =
				(p.layer < STACK_Y.length ? STACK_Y[p.layer] : top + (STACK_Y.at(-1) - top) * p.t) *
					view.fold +
				p.jy;
		const x = p.x * view.cosYaw + p.z * view.sinYaw,
			z = -p.x * view.sinYaw + p.z * view.cosYaw;
		const y = py * view.cosPitch - z * view.sinPitch,
			depth = py * view.sinPitch + z * view.cosPitch;
		return {
			x: view.x + view.r * x + pointer.x * (depth + 1) * 9,
			y: view.y + view.r * y + pointer.y * depth * 8
		};
	}

	// Click ripples displace whatever is drawn after the story.
	// Both write into a shared point so the per-particle loops allocate nothing.
	const moved = { x: 0, y: 0 };
	function displace(x, y, time) {
		for (const r of ripples) {
			const age = Math.max(0, (time - r.t) / 1000),
				front = age * (small ? 520 : 760),
				dx = x - r.x,
				dy = y - r.y;
			const d = Math.sqrt(dx * dx + dy * dy),
				band = (d - front) / 42;
			if (band > -3 && band < 3 && d > 0.01) {
				const f = Math.exp(-band * band) * 30 * (1 - age / 1.5);
				x += (dx / d) * f;
				y += (dy / d) * f;
			}
		}
		moved.x = x;
		moved.y = y;
		return moved;
	}

	// The nucleus and the headline are written straight into pixel buffers: tens of thousands of points cost a loop,
	// not a vector path. Each has its own buffer and its own cached layer: while nothing moves (no drag, no pointer,
	// no ripple, no settling particle, no breath) a frame is a drawImage of each layer, and while the stack breathes
	// only the nucleus is written again. Only the rows a buffer touched are cleared and uploaded.
	// Palette colours are OKLCH strings; a one-pixel probe lets the canvas resolve them to sRGB bytes.
	const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
	const toRgb = () =>
		[...colors, INK].map((color) => {
			probe.clearRect(0, 0, 1, 1);
			probe.fillStyle = color;
			probe.fillRect(0, 0, 1, 1);
			return [...probe.getImageData(0, 0, 1, 1).data.subarray(0, 3)];
		});
	let rgb = toRgb();
	const surface = () => {
		const c = document.createElement('canvas');
		return {
			canvas: c,
			context: c.getContext('2d'),
			image: null,
			pixels: null,
			top: 0,
			bottom: 0,
			key: ''
		};
	};
	const coreLayer = surface(),
		letterLayer = surface();
	let coreMagnet = false,
		letterMagnet = false;
	// Clears what the surface drew last time, lets `fill` write its points through `dot`, then uploads the rows used.
	function paint(s, fill) {
		const W = canvas.width,
			H = canvas.height;
		if (s.canvas.width !== W || s.canvas.height !== H) {
			s.canvas.width = W;
			s.canvas.height = H;
		}
		if (!s.image || s.image.width !== W || s.image.height !== H) {
			s.image = ctx.createImageData(W, H);
			s.pixels = new Uint32Array(s.image.data.buffer);
			s.top = 0;
			s.bottom = H;
		}
		const pixels = s.pixels;
		pixels.fill(0, s.top * W, s.bottom * W);
		let top = H,
			bottom = 0;
		fill((x, y, size, colour) => {
			const ix = (x * dpr) | 0,
				iy = (y * dpr) | 0;
			if (ix < 0 || iy < 0 || ix + size > W || iy + size > H) return;
			for (let row = 0, o = iy * W + ix; row < size; row++, o += W)
				for (let k = 0; k < size; k++) pixels[o + k] = colour;
			if (iy < top) top = iy;
			if (iy + size > bottom) bottom = iy + size;
		});
		s.context.clearRect(0, 0, W, H);
		if (bottom > top) s.context.putImageData(s.image, 0, 0, 0, top, W, bottom - top);
		s.top = top;
		s.bottom = Math.max(top, bottom);
	}
	// write: progress of the last act's writing (the letters fly in from the nucleus), -2 before it, -1 at rest.
	// How built the resting hero is: 1 normally; while the gate gives way to it, its particles gather from all over the hero.
	let build = 1;
	const hash = (i, salt) => {
		const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
		return v - Math.floor(v);
	};
	// Where particle i is on its way in: it sets off from a place of its own at its own moment.
	const dim = () => 0.55 + 0.45 * build;
	const gathered = { x: 0, y: 0, shown: true };
	function gather(i, x, y, salt) {
		const k = clamp((build - hash(i, salt + 3) * 0.45) / 0.55);
		// Fewer particles, and fainter, while the hero builds; the rest join as it completes.
		gathered.shown = k > 0 && hash(i, salt + 4) < 0.25 + 0.75 * build * build;
		const f = smooth(k),
			sx = hash(i, salt + 1) * width,
			sy = hash(i, salt + 2) * height;
		gathered.x = sx + (x - sx) * f;
		gathered.y = sy + (y - sy) * f;
		return gathered;
	}
	function drawNucleus(time, alpha, interactive, write = -1) {
		const live = interactive && (ripples.length || pointer.inside || coreMagnet || letterMagnet);
		const coreKey = [
			canvas.width,
			canvas.height,
			alpha,
			build,
			view.x,
			view.y,
			view.r,
			view.fold,
			view.cosYaw,
			view.sinYaw,
			view.cosPitch,
			view.sinPitch,
			pointer.x,
			pointer.y
		].join();
		if (live || coreKey !== coreLayer.key) {
			coreLayer.key = live ? '' : coreKey;
			// Lower layers and threads fade as the stack folds, so a folded stack reads as the design with the system
			// showing faintly through it.
			const a = 0.94 * alpha * dim() * 255,
				lower = 0.28 + 0.72 * view.fold;
			const palettes = [...STACK_Y.map((_, i) => (i ? lower : 1)), view.fold].map((k) => {
				const level = Math.round(a * k);
				return rgb.map(([r, g, b]) => ((level << 24) | (b << 16) | (g << 8) | r) >>> 0);
			});
			magnetActive = false;
			paint(coreLayer, (dot) => {
				for (let i = 0; i < points.length; i++) {
					const p = points[i];
					let { x, y } = position(p);
					if (live) {
						if (ripples.length) ({ x, y } = displace(x, y, time));
						({ x, y } = magnet(p, x, y, time));
					}
					if (build < 1) {
						const g = gather(i, x, y, 0);
						if (!g.shown) continue;
						({ x, y } = g);
					}
					dot(x, y, p.px, palettes[p.layer][p.color]);
				}
			});
			coreMagnet = magnetActive;
		}
		// The headline shares the magnet and the ripples with the nucleus; while it is written its letters fly from
		// the nucleus, so it follows the nucleus key.
		const letterKey = [canvas.width, canvas.height, write, build, write >= 0 ? coreKey : ''].join();
		if (live || letterKey !== letterLayer.key) {
			letterLayer.key = live ? '' : letterKey;
			const ink = rgb.map(
				([r, g, b]) => ((Math.round(242 * dim()) << 24) | (b << 16) | (g << 8) | r) >>> 0
			);
			magnetActive = false;
			paint(letterLayer, (dot) => {
				for (let i = 0; i < letters.length; i++) {
					const l = letters[i],
						at = letterAt(l, i, time, write, live);
					if (!at) continue;
					if (build < 1) {
						const g = gather(i, at.x, at.y, 7);
						if (g.shown) dot(g.x, g.y, l.px, ink[at.color]);
					} else dot(at.x, at.y, l.px, ink[at.color]);
				}
			});
			letterMagnet = magnetActive;
		}
		ctx.globalAlpha = 1;
		ctx.drawImage(coreLayer.canvas, 0, 0, width, height);
		ctx.drawImage(letterLayer.canvas, 0, 0, width, height);
	}
	// Where a headline particle is this frame: flying in from the nucleus while it writes, otherwise in its letterform
	// with the same click ripples and magnet as the nucleus.
	const letterPos = { x: 0, y: 0, color: 0 };
	function letterAt(l, i, time, write, live) {
		if (write === -2) return null;
		if (write >= 0) {
			const t = clamp((write - l.delay) / 0.7);
			if (t <= 0) return null;
			const from = position(l.p),
				eased = smooth(t),
				arc = Math.sin(t * Math.PI) * 50 * Math.sin(i * 0.17);
			letterPos.x = from.x + (l.x - from.x) * eased;
			letterPos.y = from.y + (l.y - from.y) * eased - arc;
			letterPos.color = t < 0.6 ? l.p.color : l.color;
			return letterPos;
		}
		let x = l.x,
			y = l.y;
		if (live) {
			if (ripples.length) ({ x, y } = displace(x, y, time));
			({ x, y } = magnet(l, x, y, time));
		}
		letterPos.x = x;
		letterPos.y = y;
		letterPos.color =
			l.mx || l.my ? (Math.abs(l.mx) + Math.abs(l.my) > 2 ? l.loose : l.color) : l.color;
		return letterPos;
	}

	// Angular velocity of the dust (radians per second): it gathers speed with every era and a little in each time
	// jump, so time seems to run faster; at rest it turns slowly.
	function omega(e) {
		if (!moving) return 0.035;
		const acts = plan.acts;
		let era = 0;
		while (era < acts.length - 1 && e >= acts[era + 1].start) era++;
		let w = (0.06 + 0.035 * era) * (1 - span(e, [plan.fold[1], plan.end])) + 0.035;
		for (const act of acts) if (act.jump) w += 0.3 * Math.sin(Math.PI * span(e, act.jump));
		return w;
	}
	function dustPos(q, time) {
		const c = stageCenter(),
			max = Math.hypot(width, height) * 0.53,
			angle = q.ha + spin * (0.5 / (0.35 + q.hr)),
			r = q.hr * max;
		return {
			x:
				c.x +
				Math.cos(angle) * r +
				Math.sin(time * 0.0004 * q.speed + q.phase) * 10 +
				pointer.x * (q.z - 0.4) * 44,
			y:
				c.y +
				Math.sin(angle) * r * 0.78 +
				Math.cos(time * 0.00032 * q.speed + q.phase * 1.3) * 8 +
				pointer.y * (q.z - 0.4) * 32,
			z: q.z
		};
	}
	// The interfaces turn in space so they read as objects, always the same way (see TURN_IN): one being built comes
	// in turned and tilted back, turns on to face the visitor and keeps drifting the same way. The drift stays small so
	// their details can be read. A positive pitch tilts the top away, seen from above like the nucleus.
	function siteYaw(k, e) {
		const build = plan.acts[k].build,
			progress = (e - build[0]) / (build[1] - build[0]);
		return -TURN_IN * (1 - outCubic(clamp(progress / 0.9))) + DRIFT * (e - build[0]);
	}
	function project(x, y, z, yaw, pitch) {
		const focal = Math.max(width, height) * 1.1;
		const c = stageCenter(),
			dx = x - c.x,
			dy = y - c.y;
		const xr = dx * Math.cos(yaw) + z * Math.sin(yaw),
			zr = -dx * Math.sin(yaw) + z * Math.cos(yaw);
		const yr = dy * Math.cos(pitch) + zr * Math.sin(pitch),
			depth = -dy * Math.sin(pitch) + zr * Math.cos(pitch);
		const scale = focal / (focal + depth);
		return {
			x: c.x + xr * scale + pointer.x * 24,
			y: c.y + yr * scale + pointer.y * 16,
			z: clamp(0.55 - depth / (stage.w * 0.6))
		};
	}
	function sitePoint(q, k, e, time) {
		const s = q.sites[k],
			build = plan.acts[k].build,
			progress = (e - build[0]) / (build[1] - build[0]),
			breathe = 1 + 0.35 * Math.sin(time * 0.0018 + q.phase);
		let x = s.x,
			y = s.y;
		if (s.flow) ({ x, y } = place(s.prim, (s.t + e * s.flow) % 1, s.u));
		if (s.clone) x -= s.clone * (1 - smooth(clamp((progress - s.slide) / 0.28)));
		const into = 1 - outCubic(clamp(progress / 0.9));
		return {
			...project(
				x + q.jx * breathe,
				y + q.jy * breathe,
				q.jz,
				siteYaw(k, e),
				TILT + TILT_IN * into
			),
			tone: s.tone
		};
	}
	// Where a particle waits in the digits of year k.
	function yearPixel(q, k) {
		return { x: q.years[k].x, y: q.years[k].y, z: 0.5 };
	}
	// The flight between the year and an interface: across first, then down into the stage, so on wide screens the
	// particles pass above the copy; the way back is the same path reversed, up out of the interface and then across
	// into the year. On phones the copy lies between the year and the stage, so particles thin out as they cross it.
	function flight(a, b, t) {
		const across = smooth(clamp(t * 1.25)),
			down = smooth(clamp(t * 1.25 - 0.25));
		return {
			x: a.x + (b.x - a.x) * across,
			y: a.y + (b.y - a.y) * down,
			z: a.z + (b.z - a.z) * across,
			veil: small ? 1 - 0.65 * Math.sin(Math.PI * t) : 1
		};
	}

	const HIDDEN = { x: 0, y: 0, z: 0, tone: T_INK, alpha: 0 };
	function particleState(q, e, time) {
		// Returns position, depth (z, 0 far – 1 near), tone and opacity for elapsed time e.
		const acts = plan.acts,
			intro = smooth(span(e, [0, 0.8]));
		if (q.act === DUST)
			return {
				...dustPos(q, time),
				tone: q.dustTone,
				alpha:
					e < plan.fold[0]
						? intro * 0.6
						: 0.6 + 0.2 * span(e, plan.fold) - 0.25 * span(e, plan.copy)
			};
		if (e < plan.fold[0]) {
			// k: the era whose interface the particle belongs to now.
			let k = q.act;
			while (k < acts.length - 1 && e >= acts[k + 1].build[0]) k++;
			const act = acts[k],
				s = q.sites[k],
				leave = act.build[0] + s.arrive * (act.build[1] - act.build[0]),
				t = clamp((e - leave) / TRAVEL);
			// Until it sets off it waits hidden in the digits of the year, which is drawn over it.
			if (t <= 0) return HIDDEN;
			// It leaves the year in ink and takes its tone on the way to its place in the interface.
			const to = sitePoint(q, k, e, time);
			let pos = flight(yearPixel(q, k), to, t),
				tone = t < 0.5 ? T_INK : to.tone,
				alpha = smooth(clamp(t / 0.2)) * pos.veil;
			if (act.jump && e >= act.jump[0]) {
				// Time jump: the interface comes apart, from the side nearest the year, and flows back into the next one.
				const order = clamp((s.x - stage.x) / stage.w),
					r = clamp((e - act.jump[0] - order * RETURN_SPREAD - q.delay * 0.3) / TRAVEL);
				if (r > 0) {
					pos = flight(yearPixel(q, k + 1), pos, 1 - r);
					if (r > 0.5) tone = T_INK;
					alpha *= pos.veil * (1 - smooth(clamp((r - 0.8) / 0.2)));
				}
			}
			return { ...pos, tone, alpha };
		}
		// Collapse: the last interface lies down whole on the top plane of the folded stack, then rides that plane as the
		// stack unfolds and hands over to it.
		const from = sitePoint(q, acts.length - 1, e, time),
			target = position(q.flat),
			t = smooth(clamp((span(e, plan.fold) - q.delay * 0.3) / 0.8));
		return {
			x: from.x + (target.x - from.x) * t,
			y: from.y + (target.y - from.y) * t,
			z: from.z + (0.5 - from.z) * t,
			tone: from.tone,
			alpha: 1 - span(e, plan.handoff)
		};
	}

	function drawParticles(list, alphaScale) {
		// Batched by tone and opacity; size follows depth.
		for (const b of buckets) b.length = 0;
		for (const s of list) {
			if (s.alpha * alphaScale <= 0.02) continue;
			const level = Math.round(
				clamp((0.3 + 0.7 * s.z) * s.alpha * alphaScale) * (LEVELS.length - 1)
			);
			buckets[s.tone * LEVELS.length + level].push(s);
		}
		buckets.forEach((items, i) => {
			if (!items.length) return;
			ctx.fillStyle = TONES[Math.floor(i / LEVELS.length)];
			ctx.globalAlpha = LEVELS[i % LEVELS.length];
			ctx.beginPath();
			for (const s of items) {
				const size = 0.8 + s.z * 1.7;
				ctx.rect(s.x, s.y, size, size);
			}
			ctx.fill();
		});
	}

	// The year shown at elapsed time e: it holds on each era's year and, in each time jump, runs through every year
	// on its way to the next one at an even pace. The collapse runs it on to today.
	function yearAt(e) {
		const acts = plan.acts;
		if (e >= plan.fold[0]) return YEARS.at(-1) + (NOW - YEARS.at(-1)) * span(e, plan.years);
		for (let i = acts.length - 2; i >= 0; i--)
			if (e >= acts[i].jump[0]) return YEARS[i] + (YEARS[i + 1] - YEARS[i]) * span(e, acts[i].jump);
		return YEARS[0];
	}
	function setFont(size, family, weight = 400, tracking = 0) {
		ctx.font = `${weight} ${size}px ${family}`;
		if ('letterSpacing' in ctx) ctx.letterSpacing = `${tracking * size}px`;
	}
	// Digit i of the year counter on baseline y, in the font set on c2: squeezed and centred in a cell as wide as the
	// widest digit, so the counter does not shift as it turns. The year the particles leave from is drawn the same way.
	function digitAt(c2, digit, i, y) {
		const { x, cell, squeeze } = caption;
		c2.save();
		c2.translate(x + (i * cell + (cell - c2.measureText(digit).width) / 2) * squeeze, y);
		c2.scale(squeeze, 1);
		c2.fillText(digit, 0, 0);
		c2.restore();
	}

	function drawIntro(e) {
		// The opening sentence, typed with a caret, says what the story is about before the first year arrives.
		const out = smooth(span(e, [INTRO - 0.6, INTRO - 0.1]));
		if (out >= 1) return;
		const size = caption.introSize,
			total = intro.reduce((sum, line) => sum + line.text.length, 0);
		let left = Math.floor(span(e, plan.intro) * total),
			caret = { x: caption.x, y: intro[0].y };
		setFont(size, 'Manrope', 600, -0.03);
		ctx.textAlign = 'left';
		ctx.fillStyle = INK;
		ctx.globalAlpha = 1 - out;
		for (const line of intro) {
			const chars = Math.min(left, line.text.length),
				text = line.text.slice(0, chars);
			left -= chars;
			ctx.fillText(text, caption.x, line.y - out * 10);
			caret = { x: caption.x + ctx.measureText(text).width + 4, y: line.y - out * 10 };
			if (chars < line.text.length) break;
		}
		const typing = e >= plan.intro[0] && e < plan.intro[1];
		if (typing || Math.floor(e / 0.4) % 2 === 0) {
			ctx.fillStyle = PRIMARY;
			ctx.fillRect(caret.x, caret.y - size * 0.78, 2, size * 0.92);
		}
		setFont(size, 'Manrope');
	}

	function drawYear(e) {
		// An odometer in the headline face: each digit rolls up when its year turns, so a jump reads as years passing.
		// It rolls in after the intro, runs to today in the collapse, flips to «HOY» and fades as the headline arrives.
		const enter = smooth(span(e, [INTRO - 0.3, INTRO + 0.4])),
			leave = smooth(span(e, [plan.write[0] - 0.1, plan.write[0] + 0.5]));
		if (enter <= 0 || leave >= 1) return;
		const { x, yearBase: base, yearSize: size, cap, squeeze } = caption,
			lineH = cap * 1.25,
			hoy = smooth(span(e, plan.hoy)),
			lift = (1 - enter) * lineH;
		ctx.save();
		ctx.beginPath();
		// The window is exactly one row of digits, so a turning digit is cut at the edges like a counter.
		ctx.rect(x - size * 0.2, base - cap - size * 0.03, size * 3.6, cap + size * 0.07);
		ctx.clip();
		ctx.globalAlpha = 1 - leave;
		ctx.fillStyle = INK;
		ctx.textAlign = 'left';
		setFont(size, 'Anton');
		if (hoy < 1) {
			const value = yearAt(e),
				y = base + lift - hoy * lineH;
			// A digit turns over in the last stretch of its unit, so every year pauses before the next one.
			const turn = (f) => smooth(clamp((f - 0.6) / 0.4));
			for (let k = 3, i = 0; k >= 0; k--, i++) {
				const unit = 10 ** k,
					whole = Math.floor(value / unit),
					digit = whole % 10,
					rest = value - whole * unit,
					roll = k === 0 ? turn(rest) : turn(clamp(rest - (unit - 1)));
				digitAt(ctx, String(digit), i, y - roll * lineH);
				if (roll > 0) digitAt(ctx, String((digit + 1) % 10), i, y + (1 - roll) * lineH);
			}
		}
		if (hoy > 0) {
			ctx.save();
			ctx.translate(x, base + (1 - hoy) * lineH);
			ctx.scale(squeeze, 1);
			ctx.fillText(nowLabel, 0, 0);
			ctx.restore();
		}
		ctx.restore();
	}

	function drawCaptions(e) {
		// Each chapter: the company and its line arrive under the year, then its tools are typed one after another,
		// each underlined like the tags of the projects. Everything leaves with the time jump.
		const acts = plan.acts;
		ctx.textAlign = 'left';
		chapters.forEach((chapter, i) => {
			const act = acts[i],
				end = act.jump ? act.jump[0] : plan.fold[0],
				out = smooth(span(e, [end, end + 0.6]));
			if (e < act.caption[0] || out >= 1) return;
			const name = smooth(span(e, [act.caption[0] + 0.1, act.caption[0] + 0.8])),
				line = smooth(span(e, [act.caption[0] + 0.4, act.caption[1]])),
				keep = 1 - out,
				drift = out * 8;
			ctx.fillStyle = INK;
			setFont(caption.lineSize, 'Manrope', 600, -0.02);
			ctx.globalAlpha = name * keep;
			for (const l of chapter.lines) ctx.fillText(l.text, caption.x, l.y + (1 - name) * 8 - drift);
			setFont(caption.nameSize, 'Manrope');
			ctx.globalAlpha = line * keep * 0.86;
			ctx.fillText(chapter.name, caption.x, chapter.nameY + (1 - line) * 10 - drift);
			setFont(caption.wordSize, '"DM Mono"');
			const each = (act.words[1] - act.words[0]) / chapter.words.length;
			chapter.words.forEach((w, k) => {
				const typed = span(e, [act.words[0] + k * each, act.words[0] + (k + 1) * each]),
					chars = Math.ceil(typed * w.text.length);
				if (chars <= 0) return;
				ctx.globalAlpha = 0.92 * keep;
				ctx.fillStyle = INK;
				ctx.fillText(w.text.slice(0, chars), w.x, w.y - drift);
				ctx.globalAlpha = keep;
				ctx.fillStyle = RULE;
				ctx.fillRect(w.x, w.y + 6 - drift, w.w * typed, 1);
			});
		});
	}

	function drawRuler(e) {
		// The timeline: one tick per year from the first era to today, longer and labelled at each era. It draws in
		// with the intro; the passed stretch is inked and the accent dot is the present of the story.
		const reach = smooth(span(e, [0.6, 2.8])),
			alpha = 1 - smooth(span(e, [plan.write[0] - 0.2, plan.write[0] + 0.4]));
		if (reach <= 0 || alpha <= 0) return;
		const { x0, x1, y } = ruler,
			years = NOW - YEARS[0],
			value = yearAt(e),
			at = (year) => x0 + ((x1 - x0) * (year - YEARS[0])) / years,
			head = at(value),
			end = x0 + (x1 - x0) * reach;
		let current = 0;
		while (current < YEARS.length - 1 && value >= YEARS[current + 1] - 0.01) current++;
		if (value >= NOW - 0.01) current = YEARS.length;
		ctx.globalAlpha = alpha;
		ctx.lineWidth = 1;
		ctx.strokeStyle = RULE;
		ctx.beginPath();
		ctx.moveTo(x0, y);
		ctx.lineTo(end, y);
		ctx.stroke();
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = INK;
		ctx.beginPath();
		ctx.moveTo(x0, y);
		ctx.lineTo(Math.min(head, end), y);
		ctx.stroke();
		ctx.lineWidth = 1;
		for (let i = 0; i <= years; i++) {
			const x = at(YEARS[0] + i);
			if (x > end + 0.5) break;
			const major = YEARS.includes(YEARS[0] + i) || i === years,
				len = major ? 10 : 5;
			ctx.strokeStyle = x <= head + 0.5 ? INK : RULE;
			ctx.beginPath();
			ctx.moveTo(x, y - len);
			ctx.lineTo(x, y);
			ctx.stroke();
		}
		// Labels for each era and for today; on narrow rulers a label that would touch the current one is left out.
		const labels = [
			...YEARS.map((year, i) => ({ text: String(year), x: at(year), i })),
			{ text: nowLabel, x: x1, i: YEARS.length }
		];
		setFont(small ? 10 : 11, '"DM Mono"', 500, 0.04);
		ctx.textAlign = 'center';
		const placedLabels = [];
		const labelWidth = (l) => ctx.measureText(l.text).width + 8;
		const mine = labels[current];
		for (const l of [mine, ...labels.filter((l) => l !== mine)]) {
			if (l.x > end + 0.5) continue;
			const w = labelWidth(l),
				x = Math.min(x1 - w / 2 + 4, Math.max(x0 + w / 2 - 4, l.x));
			if (placedLabels.some((p) => Math.abs(p.x - x) < (p.w + w) / 2)) continue;
			placedLabels.push({ x, w });
			ctx.fillStyle = l.i === current ? PRIMARY : INK;
			ctx.globalAlpha = alpha * (l.i === current ? 1 : l.i < current ? 0.72 : 0.42);
			ctx.fillText(l.text, x, y - 17);
		}
		ctx.textAlign = 'left';
		if (e > INTRO - 0.5) {
			ctx.globalAlpha = alpha * smooth(span(e, [INTRO - 0.5, INTRO]));
			ctx.fillStyle = PRIMARY;
			ctx.beginPath();
			ctx.arc(head, y, 3.5, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	function drawStory(time, e) {
		// The stack is born folded under the last interface, turned a little away; it settles into the rest pose
		// as it unfolds into its five layers, turning the way everything turns (see TURN_IN).
		storyYaw = -0.9 * (1 - smooth(span(e, [plan.core[0], plan.unfold[1]])));
		setView(FOLDED + (1 - FOLDED) * smooth(span(e, plan.unfold)));
		const core = smooth(span(e, plan.core)),
			write = e >= plan.write[0] ? span(e, plan.write) : -2;
		if (core > 0 || write > -2) drawNucleus(time, core, false, write);
		const states = [];
		for (const q of particles) states.push(particleState(q, e, time));
		drawParticles(states, 1);
		drawRuler(e);
		drawCaptions(e);
		drawIntro(e);
		drawYear(e);
		ctx.globalAlpha = 1;
		// The nucleus writes the headline in particles; --reveal still tracks the act for the copy and tests.
		const reveal = span(e, plan.reveal);
		hero.style.setProperty('--reveal', String(reveal));
		hero.classList.add('revealing');
		hero.style.setProperty('--copy', String(smooth(span(e, plan.copy))));
	}

	function drawRest(time) {
		storyYaw = 0;
		const interactive = !motion.matches;
		// The stack breathes; dust stays in the whole hero, turning slowly, with depth parallax, the magnet and the
		// click ripples.
		setView(restFold(time));
		drawNucleus(time, 1, interactive);
		drawDust(time, interactive);
	}
	// The dust that fills the hero, with depth parallax, the magnet and the click ripples.
	function drawDust(time, interactive) {
		const states = [];
		for (const q of particles)
			if (q.act === DUST) {
				const pos = dustPos(q, time);
				if (gate) {
					// At the gate the dust fills the whole hero; it drifts into its resting spread as the hero builds.
					const k = smooth(clamp((build - q.delay) / 0.7));
					const ux =
							(q.phase / (Math.PI * 2)) * width + Math.sin(time * 0.0004 * q.speed + q.phase) * 10,
						uy =
							(q.ha / (Math.PI * 2)) * height +
							Math.cos(time * 0.00032 * q.speed + q.phase * 1.3) * 8;
					pos.x = ux + (pos.x - ux) * k;
					pos.y = uy + (pos.y - uy) * k;
				}
				if (interactive) {
					const d = displace(pos.x, pos.y, time);
					const m = magnet(q, d.x, d.y, time);
					pos.x = m.x;
					pos.y = m.y;
				}
				states.push({ x: pos.x, y: pos.y, z: q.z, tone: q.dustTone, alpha: 1 });
			}
		drawParticles(states, 0.75 * dim());
	}

	// Magnetic pull with an elastic release: near the pointer a particle is drawn toward it, stretches until it
	// reaches the cursor or its limit, snaps free and springs back to its place before it can be caught again.
	let magnetActive = false;
	function magnet(o, bx, by, time) {
		const near = pointer.inside && !turn.drag;
		moved.x = bx;
		moved.y = by;
		if (
			!o.mx &&
			!o.my &&
			!o.mvx &&
			!o.mvy &&
			(!near || Math.abs(bx - pointer.px) > magnetReach || Math.abs(by - pointer.py) > magnetReach)
		)
			return moved;
		magnetActive = true;
		const mx = o.mx || 0,
			my = o.my || 0,
			x = bx + mx,
			y = by + my;
		let ax = -mx * 0.07,
			ay = -my * 0.07;
		if (near && !(o.free > time)) {
			const dx = pointer.px - x,
				dy = pointer.py - y,
				d = Math.hypot(dx, dy);
			if (d < magnetReach) {
				if (d < 5 || Math.hypot(mx, my) > magnetLimit) o.free = time + 650;
				else {
					const pull = 1 - d / magnetReach;
					ax += (dx / d) * pull * 4.4;
					ay += (dy / d) * pull * 4.4;
				}
			}
		}
		o.mvx = ((o.mvx || 0) + ax) * 0.84;
		o.mvy = ((o.mvy || 0) + ay) * 0.84;
		o.mx = mx + o.mvx;
		o.my = my + o.mvy;
		if (Math.abs(o.mx) + Math.abs(o.my) < 0.05 && Math.abs(o.mvx) + Math.abs(o.mvy) < 0.05) {
			o.mx = o.my = o.mvx = o.mvy = 0;
		}
		moved.x = bx + o.mx;
		moved.y = by + o.my;
		return moved;
	}

	function step(time) {
		// Integrates the turn of the dust and the nucleus spin with its inertia.
		const dt = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 0;
		lastTime = time;
		spin += omega((time - start) / 1000) * dt;
		if (!moving && !turn.drag) {
			turn.yaw += turn.velocity * dt;
			turn.velocity *= Math.pow(0.45, dt);
			turn.pitch = Math.max(-0.7, Math.min(0.7, turn.pitch + turn.pitchVelocity * dt));
			turn.pitchVelocity *= Math.pow(0.3, dt);
			turn.pitch *= Math.pow(0.55, dt);
		}
		ripples = ripples.filter((r) => time - r.t < 1500);
	}

	// The gate: before anything else the particles gather into a play symbol, hold it, and break up toward the
	// «Watch evolution» control. A click anywhere sends a ripple through the hero; when it dies, the story starts.
	let gate = null,
		gateInk = '#000',
		gateAccent = '#c00';
	function readGateColors() {
		const style = getComputedStyle(hero);
		gateInk = style.getPropertyValue('--ink').trim() || gateInk;
		gateAccent = style.getPropertyValue('--primary').trim() || gateAccent;
	}
	function buildGate() {
		const cx = width / 2,
			cy = small ? height * 0.42 : height * 0.5,
			R = Math.min(width * (small ? 0.3 : 0.5), height * 0.3),
			step = small ? 3 : 4,
			line = Math.max(4, R * 0.05);
		// The particles are absorbed by the label: they land anywhere along the text, right of the icon.
		const canvasRect = canvas.getBoundingClientRect(),
			button = hero.querySelector('.motion-controls button')?.getBoundingClientRect(),
			icon = hero.querySelector('.motion-controls button svg')?.getBoundingClientRect(),
			x0 = (icon ? icon.right + 10 : button ? button.left + 60 : width * 0.85) - canvasRect.left,
			x1 = (button ? button.right : width * 0.97) - canvasRect.left,
			by = button ? button.top + button.height / 2 - canvasRect.top : height - 40;
		const ring = samplePixels((c) => {
				c.strokeStyle = '#000';
				c.lineWidth = line;
				c.beginPath();
				c.arc(cx, cy, R, 0, Math.PI * 2);
				c.stroke();
			}, step),
			triangle = samplePixels((c) => {
				c.fillStyle = c.strokeStyle = '#000';
				c.lineJoin = 'round';
				c.lineWidth = line * 1.6;
				c.beginPath();
				c.moveTo(cx - R * 0.3, cy - R * 0.46);
				c.lineTo(cx - R * 0.3, cy + R * 0.46);
				c.lineTo(cx + R * 0.5, cy);
				c.closePath();
				c.fill();
				c.stroke();
			}, step);
		const reach = Math.max(width, height) * 0.7;
		gate.dots = [
			...ring.map((q) => ({ ...q, accent: false })),
			...triangle.map((q) => ({ ...q, accent: true }))
		].map((q) => {
			const angle = random() * Math.PI * 2,
				far = reach * (0.55 + random() * 0.6);
			return {
				tx: q.x,
				ty: q.y,
				accent: q.accent,
				sx: cx + Math.cos(angle) * far,
				sy: cy + Math.sin(angle) * far * 0.7,
				bx: x0 + random() * (x1 - x0),
				by: by + (random() - 0.5) * 9,
				delay: random(),
				pull: 0,
				phase: random() * Math.PI * 2
			};
		});
		// Genie frame: an axis from the middle of the play to the middle of the label; u runs along it, v across it.
		const hx = (x0 + x1) / 2,
			dx = hx - cx,
			dy = by - cy,
			length = Math.hypot(dx, dy),
			ax = dx / length,
			ay = dy / length;
		const order = gate.dots.map((q) => (q.tx - cx) * ax + (q.ty - cy) * ay);
		const low = Math.min(...order),
			high = Math.max(...order);
		gate.dots.forEach((q, i) => {
			q.ox = cx;
			q.oy = cy;
			q.ax = ax;
			q.ay = ay;
			q.u = order[i];
			q.v = (q.tx - cx) * -ay + (q.ty - cy) * ax;
			q.reach = length;
			q.wave = (random() - 0.5) * 24;
			// The side facing the label leaves first, the far side follows: a stream, never all at once.
			q.pull = 0.8 * (1 - (order[i] - low) / (high - low)) + 0.2 * random();
			// The first to arrive land on the first letters: the label is written from left to right.
			q.bx = x0 + clamp(q.pull) * (x1 - x0);
		});
	}
	function beginGate() {
		gate = { t0: performance.now(), clicked: 0, ready: false, dots: [] };
		hero.classList.add('gate', 'gate-hide');
		hero.style.setProperty('--copy', '0');
		readGateColors();
		buildGate();
	}
	function endGate() {
		if (!gate) return;
		gate = null;
		hero.classList.remove('gate', 'gate-hide');
		hero.style.removeProperty('--absorb');
		hero.style.removeProperty('--type');
		build = 1;
	}
	// The magic lamp: the play is pulled into the label like a genie into its lamp. Each particle keeps its place on
	// the way, but the shape narrows to a neck as it nears the text, and the part nearest the label goes in first.
	const lamp = { x: 0, y: 0 };
	function genie(q, k) {
		const g = smooth(k),
			neck = Math.pow(g, 1.6),
			along = q.u + (q.reach - q.u) * g,
			side = q.v * (1 - neck) + Math.sin(g * Math.PI * 2) * q.wave * (1 - g);
		lamp.x = q.ox + q.ax * along - q.ay * side;
		lamp.y = q.oy + q.ay * along + q.ax * side;
		// The last stretch lands on its own spot of the text.
		const land = Math.pow(g, 4);
		lamp.x += (q.bx - lamp.x) * land;
		lamp.y += (q.by - lamp.y) * land;
		return lamp;
	}
	function drawGate(time) {
		const e = (time - gate.t0) / 1000,
			d0 = GATE.form + GATE.hold,
			size = small ? 2 : 2.4;
		// As the play breaks up the hero appears behind it, and its label brightens as the particles are absorbed.
		const open = clamp((e - d0) / GATE.dissolve);
		if (open > 0 && !gate.opened) {
			gate.opened = true;
			hero.classList.remove('gate-hide');
		}
		if (gate.opened) {
			build = open;
			// The words arrive once most of the particles are home.
			hero.style.setProperty('--copy', String(smooth(clamp((open - 0.6) / 0.4))));
			// The label is written left to right as the particles land on it.
			hero.style.setProperty(
				'--type',
				String(clamp((e - d0 - GATE.fall * 0.85) / (GATE.dissolve - GATE.fall * 0.85)))
			);
			hero.style.setProperty('--absorb', String(smooth(clamp((open - 0.45) / 0.55))));
			drawRest(time);
			build = 1;
			if (width >= 700) ctx.clearRect(0, height - 66, width, 66);
		}
		if (open >= 1 && !gate.ready) {
			gate.ready = true;
			hero.style.removeProperty('--absorb');
			hero.style.removeProperty('--type');
		}
		if (!gate.opened) {
			build = 0;
			drawDust(time, true);
			build = 1;
		}
		if (!gate.ready) {
			for (const accent of [false, true]) {
				ctx.fillStyle = accent ? gateAccent : gateInk;
				for (const q of gate.dots) {
					if (q.accent !== accent) continue;
					let x = q.tx,
						y = q.ty,
						scale = 1,
						alpha = 1;
					if (e < GATE.form) {
						const k = clamp((e - q.delay * 0.7) / (GATE.form - 0.7)),
							f = 1 - Math.pow(1 - k, 3);
						x = q.sx + (q.tx - q.sx) * f;
						y = q.sy + (q.ty - q.sy) * f;
						alpha = Math.min(1, k * 3);
					} else if (e < d0) {
						x += Math.sin(time / 600 + q.phase) * 0.7;
						y += Math.cos(time / 700 + q.phase) * 0.7;
					} else {
						const k = clamp((e - d0 - q.pull * (GATE.dissolve - GATE.fall)) / GATE.fall);
						if (k > 0) {
							genie(q, k);
							x = lamp.x;
							y = lamp.y;
							scale = 1 - 0.5 * k;
							alpha = 1 - smooth(clamp((k - 0.9) / 0.1));
						}
					}
					if (alpha <= 0.01) continue;
					if (ripples.length) {
						const m = displace(x, y, time);
						x = m.x;
						y = m.y;
					}
					const px = size * scale;
					ctx.globalAlpha = alpha;
					ctx.fillRect(x - px / 2, y - px / 2, px, px);
				}
			}
			ctx.globalAlpha = 1;
		}
		if (gate.clicked && time - gate.clicked >= GATE.wave * 1000) replay();
	}

	function draw(time) {
		ctx.clearRect(0, 0, width, height);
		if (gate) {
			if (!motion.matches) step(time);
			drawGate(time);
			return;
		}
		const active = moving && !motion.matches,
			elapsed = (time - start) / 1000;
		if (!motion.matches) step(time);
		if (active) drawStory(time, elapsed);
		else drawRest(time);
		ctx.globalAlpha = 1;
		if (width >= 700) ctx.clearRect(0, height - 66, width, 66);
		if (active && elapsed >= plan.end) finish();
	}
	// On phones the story holds the page still: a swipe must not drag the hero away mid-animation, and the only way
	// out is the «Skip animation» control.
	let locked = false;
	const keepStill = (event) => {
		if (locked && event.cancelable) event.preventDefault();
	};
	function lock(on) {
		locked = on;
		document.documentElement.classList.toggle('story-lock', on);
	}
	function centre() {
		hero.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
	function finish() {
		if (!moving) return;
		lock(false);
		moving = false;
		storyYaw = 0;
		// The breath starts open, as the story leaves the stack.
		restSince = performance.now();
		hero.style.removeProperty('--reveal');
		hero.classList.remove('revealing');
		hero.style.removeProperty('--copy');
		onState(false);
	}
	let last = 0,
		cost = 0;
	function frame(time) {
		if (destroyed) return;
		// Adaptive pace: every frame while drawing stays cheap, every other frame when the device struggles.
		if (visible && !document.hidden && time - last > (cost > 11 ? 32 : 14)) {
			const begin = performance.now();
			draw(time);
			last = time;
			cost = cost * 0.9 + (performance.now() - begin) * 0.1;
		}
		if (!motion.matches) raf = requestAnimationFrame(frame);
	}
	function replay() {
		if (motion.matches) {
			draw(performance.now());
			return;
		}
		endGate();
		if (small) {
			centre();
			lock(true);
		}
		hero.style.setProperty('--reveal', '0');
		hero.style.setProperty('--copy', '0');
		hero.classList.add('revealing');
		document.documentElement.classList.remove('story-pending');
		ripples = [];
		turn.yaw = 0;
		turn.pitch = 0;
		turn.velocity = 0;
		turn.pitchVelocity = 0;
		start = performance.now();
		moving = true;
		onState(true);
	}
	function skip() {
		if (moving) {
			finish();
			draw(performance.now());
		}
	}

	// Any click, key or focus skips the story, except on the motion control, which handles skipping itself.
	function interrupt(event) {
		if (!moving) return false;
		// A touch may be the start of a swipe: only the control skips the story on a phone.
		if (event.pointerType === 'touch') return true;
		const onControl = event.target?.closest?.('.motion-controls');
		if (
			event.type === 'keydown'
				? ['Shift', 'Control', 'Alt', 'Meta', 'Tab'].includes(event.key) ||
					(onControl && ['Enter', ' '].includes(event.key))
				: onControl
		)
			return true;
		skip();
		return true;
	}
	function local(event) {
		const r = canvas.getBoundingClientRect();
		return { x: event.clientX - r.left, y: event.clientY - r.top };
	}
	function pointerDown(event) {
		if (gate) {
			if (!gate.clicked && !event.target.closest('a,button')) {
				const at = local(event);
				gate.clicked = performance.now();
				ripples.push({ x: at.x, y: at.y, t: gate.clicked });
				if (small) {
					centre();
					lock(true);
				}
			}
			return;
		}
		if (interrupt(event) || motion.matches || event.target.closest('a,button')) return;
		// Dragging the background turns the nucleus; text keeps its native selection and only answers with a ripple.
		const rotates = !event.target.closest('.hero-copy');
		turn.drag = {
			x: event.clientX,
			y: event.clientY,
			t: event.timeStamp,
			at: local(event),
			moved: false,
			rotates
		};
		if (rotates) {
			hero.setPointerCapture?.(event.pointerId);
			hero.classList.add('dragging');
		}
	}
	function pointerMove(event) {
		const at = local(event);
		pointer.x = at.x / width - 0.5;
		pointer.y = at.y / height - 0.5;
		pointer.px = at.x;
		pointer.py = at.y;
		pointer.inside = true;
		const drag = turn.drag;
		if (!drag) return;
		if (Math.hypot(at.x - drag.at.x, at.y - drag.at.y) > 6) drag.moved = true;
		if (drag.rotates) {
			const dx = event.clientX - drag.x,
				dy = event.clientY - drag.y,
				dt = Math.max(8, event.timeStamp - drag.t) / 1000;
			turn.yaw += dx * 0.007;
			turn.pitch = Math.max(-0.7, Math.min(0.7, turn.pitch + dy * 0.005));
			turn.velocity = turn.velocity * 0.5 + ((dx * 0.007) / dt) * 0.5;
			turn.pitchVelocity = turn.pitchVelocity * 0.5 + ((dy * 0.005) / dt) * 0.5;
			drag.x = event.clientX;
			drag.y = event.clientY;
			drag.t = event.timeStamp;
		}
	}
	function pointerUp(event) {
		const drag = turn.drag;
		turn.drag = null;
		hero.classList.remove('dragging');
		// A pause before letting go leaves the nucleus without extra spin.
		if (drag && event.timeStamp - drag.t > 90) {
			turn.velocity = 0;
			turn.pitchVelocity = 0;
		}
		if (!drag || drag.moved) return;
		const at = local(event);
		ripples.push({ x: at.x, y: at.y, t: performance.now() });
	}
	function pointerLeave() {
		pointer.inside = false;
	}
	// Starting to scroll from the very top answers like a click at the bottom centre of the hero; back at the top it re-arms.
	let atTop = scrollY <= 0;
	function scrolled() {
		if (scrollY <= 0) {
			atTop = true;
			return;
		}
		if (!atTop) return;
		atTop = false;
		if (moving || gate || motion.matches) return;
		ripples.push({ x: width / 2, y: height * 0.92, t: performance.now() });
	}
	function hidden() {
		if (document.hidden) skip();
	}
	function changed() {
		cancelAnimationFrame(raf);
		endGate();
		lock(false);
		hero.style.removeProperty('--copy');
		finish();
		draw(performance.now());
		if (!motion.matches) raf = requestAnimationFrame(frame);
	}
	function themed() {
		usePalette(currentTheme());
		readGateColors();
		rgb = toRgb();
		coreLayer.key = letterLayer.key = '';
		if (motion.matches) draw(performance.now());
	}
	const observer = new ResizeObserver(resize);
	observer.observe(canvas);
	const intersection = new IntersectionObserver((entries) => {
		visible = entries[0].isIntersecting;
	});
	intersection.observe(canvas);
	hero.addEventListener('pointermove', pointerMove, { passive: true });
	hero.addEventListener('pointerleave', pointerLeave);
	hero.addEventListener('pointerdown', pointerDown);
	hero.addEventListener('pointerup', pointerUp);
	hero.addEventListener('pointercancel', pointerUp);
	hero.addEventListener('focusin', interrupt);
	document.addEventListener('touchmove', keepStill, { passive: false });
	motion.addEventListener('change', changed);
	addEventListener('keydown', interrupt);
	document.addEventListener('visibilitychange', hidden);
	addEventListener('scroll', scrolled, { passive: true });
	addEventListener('themechange', themed);
	usePalette(currentTheme());
	rgb = toRgb();
	resize();
	if (!motion.matches) {
		raf = requestAnimationFrame(frame);
		beginGate();
	}
	document.documentElement.classList.remove('story-pending');
	return {
		replay,
		skip,
		destroy() {
			destroyed = true;
			cancelAnimationFrame(raf);
			endGate();
			finish();
			headline.classList.remove('particle-headline');
			observer.disconnect();
			intersection.disconnect();
			motion.removeEventListener('change', changed);
			hero.removeEventListener('pointermove', pointerMove);
			hero.removeEventListener('pointerleave', pointerLeave);
			hero.removeEventListener('pointerdown', pointerDown);
			hero.removeEventListener('pointerup', pointerUp);
			hero.removeEventListener('pointercancel', pointerUp);
			hero.removeEventListener('focusin', interrupt);
			removeEventListener('keydown', interrupt);
			document.removeEventListener('touchmove', keepStill);
			lock(false);
			document.removeEventListener('visibilitychange', hidden);
			removeEventListener('scroll', scrolled);
			removeEventListener('themechange', themed);
		}
	};
}
