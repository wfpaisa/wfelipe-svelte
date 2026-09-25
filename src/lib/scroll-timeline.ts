/**
 * Fallback for CSS scroll-driven animations (`animation-timeline`) in browsers
 * that do not support them yet.
 *
 * Elements opt in with `data-scroll` ("view" for `view()`, "root" for
 * `scroll(root)`) and declare their range once in CSS as `--scroll-range`,
 * which also feeds `animation-range`. The element's own CSS animation is paused
 * and its currentTime is driven from the scroll position, so the keyframes stay
 * in CSS and look the same as the native version.
 */

const DURATION = 1000;

type Kind = 'view' | 'root';
type Edge = { name: string; offset: string };

interface Tracked {
	kind: Kind;
	animation: Animation;
	range: [Edge, Edge];
}

export const supportsScrollTimeline = () =>
	typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');

/** "cover 0% cover 30%" | "entry 60% exit 40%" | "0 100dvh" */
function parseRange(value: string, kind: Kind): [Edge, Edge] {
	const tokens = value.trim().split(/\s+/).filter(Boolean);
	const edges: Edge[] = [];
	const fallbackName = kind === 'view' ? 'cover' : '';

	for (let i = 0; i < tokens.length && edges.length < 2; i++) {
		const isName = /^[a-z-]+$/.test(tokens[i]) && tokens[i] !== 'normal';
		if (isName) {
			const next = tokens[i + 1];
			const hasOffset = next !== undefined && !/^[a-z-]+$/.test(next);
			edges.push({
				name: tokens[i],
				offset: hasOffset ? next : edges.length === 0 ? '0%' : '100%'
			});
			if (hasOffset) i++;
		} else if (tokens[i] !== 'normal') {
			edges.push({ name: fallbackName, offset: tokens[i] });
		}
	}

	const start = edges[0] ?? { name: fallbackName, offset: '0%' };
	// A lone named range ("entry") spans that whole range
	const end = edges[1] ?? { name: start.name, offset: '100%' };
	return [start, end];
}

function toPx(offset: string, base: number) {
	const n = parseFloat(offset);
	if (Number.isNaN(n)) return 0;
	if (offset.endsWith('%')) return (n / 100) * base;
	if (/[dsl]?vh$/.test(offset)) return (n / 100) * innerHeight;
	if (offset.endsWith('rem'))
		return n * parseFloat(getComputedStyle(document.documentElement).fontSize);
	return n;
}

/** Document position of the layout box, ignoring transforms (like the native timeline) */
function layoutTop(el: HTMLElement) {
	let top = 0;
	let node: HTMLElement | null = el;
	while (node) {
		top += node.offsetTop;
		node = node.offsetParent as HTMLElement | null;
	}
	return top;
}

/** Scroll distance along the view timeline where a range edge sits */
function viewEdge(edge: Edge, h: number, vh: number) {
	const small = Math.min(h, vh);
	const ranges: Record<string, [number, number]> = {
		cover: [0, vh + h],
		entry: [0, small],
		exit: [Math.max(h, vh), small],
		contain: [small, Math.abs(vh - h)],
		'entry-crossing': [0, h],
		'exit-crossing': [vh, h]
	};
	const [start, length] = ranges[edge.name] ?? ranges.cover;
	return start + toPx(edge.offset, length);
}

function progress({ kind, range }: Tracked, el: HTMLElement) {
	const vh = innerHeight;
	let s: number, start: number, end: number;

	if (kind === 'root') {
		const max = document.documentElement.scrollHeight - vh;
		s = scrollY;
		start = toPx(range[0].offset, max);
		end = toPx(range[1].offset, max);
	} else {
		const h = el.offsetHeight;
		// How far the element has travelled into the viewport from below
		s = scrollY + vh - layoutTop(el);
		start = viewEdge(range[0], h, vh);
		end = viewEdge(range[1], h, vh);
	}

	// Unclamped on purpose: outside the range the animation's fill mode decides
	return end === start ? (s >= end ? 1 : 0) : (s - start) / (end - start);
}

/** Restart the element's CSS animation so it is live again, then take control of it */
function capture(el: HTMLElement): Animation | undefined {
	el.style.animationName = 'none';
	void getComputedStyle(el).animationName;
	el.style.animationName = '';

	const animation = el.getAnimations().find((a) => 'animationName' in a);
	if (!animation) return;

	animation.pause();
	animation.effect?.updateTiming({ duration: DURATION });
	return animation;
}

/**
 * Starts driving every `[data-scroll]` element from the scroll position.
 * Call it again after the DOM changes to pick up new elements; returns a
 * cleanup function. Does nothing where the native feature exists.
 */
export function scrollTimelineFallback() {
	if (supportsScrollTimeline() || typeof Element.prototype.getAnimations !== 'function') {
		return () => {};
	}

	const tracked = new Map<HTMLElement, Tracked>();

	for (const el of document.querySelectorAll<HTMLElement>('[data-scroll]')) {
		const kind: Kind = el.dataset.scroll === 'root' ? 'root' : 'view';
		const animation = capture(el);
		if (!animation) continue;
		const range = parseRange(getComputedStyle(el).getPropertyValue('--scroll-range'), kind);
		tracked.set(el, { kind, animation, range });
	}

	let frame = 0;
	const update = () => {
		frame = 0;
		for (const [el, entry] of tracked) {
			entry.animation.currentTime = progress(entry, el) * DURATION;
		}
	};
	const schedule = () => {
		frame ||= requestAnimationFrame(update);
	};

	update();
	addEventListener('scroll', schedule, { passive: true });
	addEventListener('resize', schedule, { passive: true });
	// Late layout shifts (images, fonts) move the ranges
	const observer = new ResizeObserver(schedule);
	observer.observe(document.body);

	return () => {
		cancelAnimationFrame(frame);
		removeEventListener('scroll', schedule);
		removeEventListener('resize', schedule);
		observer.disconnect();
		for (const { animation } of tracked.values()) animation.cancel();
	};
}
