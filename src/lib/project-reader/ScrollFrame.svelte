<script lang="ts">
	import type { ReaderItem } from './reader';

	let {
		item,
		aspect = 1.25,
		onopen
	}: {
		item: ReaderItem;
		/** Frame height / width */
		aspect?: number;
		onopen: (progress: number, origin: HTMLElement) => void;
	} = $props();

	let frame: HTMLAnchorElement | undefined = $state();
	let scrub: number | null = $state(null);

	const ratio = $derived(item.full.height / item.full.width);
	/** How many full-size pixels the frame shows at once */
	const visible = $derived(Math.min(item.full.width * aspect, item.full.height));
	const format = (n: number) => n.toLocaleString('en-US');

	const readout = $derived(
		scrub === null
			? `${format(item.full.width)} × ${format(item.full.height)}`
			: `y ${format(Math.round(scrub * (item.full.height - visible)))} / ${format(item.full.height)}`
	);

	function onpointermove(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || !frame) return;
		const rect = frame.getBoundingClientRect();
		// Dead zones at top and bottom so the first and last screens are easy to reach
		const y = (e.clientY - rect.top) / rect.height;
		scrub = Math.min(1, Math.max(0, (y - 0.12) / 0.76));
	}

	function onpointerleave() {
		scrub = null;
	}

	/** Where the frame is showing the site right now; the ambient drift counts as the top */
	function currentProgress() {
		return scrub ?? 0;
	}

	function onclick(e: MouseEvent) {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || !frame) return;
		e.preventDefault();
		onopen(currentProgress(), frame);
	}
</script>

<a
	bind:this={frame}
	href={item.full.src}
	class="frame"
	class:scrubbing={scrub !== null}
	style:--aspect={aspect}
	style:--ratio={ratio}
	style:--hp={scrub ?? 0}
	aria-label="Read the full {item.name} site"
	{onpointermove}
	{onpointerleave}
	{onclick}
>
	<img
		class="shot"
		src={item.strip}
		alt=""
		width="600"
		height={Math.round(600 * ratio)}
		loading="lazy"
		decoding="async"
	/>

	<span class="rail" aria-hidden="true"><span class="thumb"></span></span>
	<span class="readout" aria-hidden="true">{readout}</span>
</a>

<style>
	@property --sp {
		syntax: '<number>';
		inherits: true;
		initial-value: 0;
	}

	.frame {
		--p: 0;
		/* Share of the page the frame shows at once: also the scrollbar thumb size */
		--view: min(1, calc(var(--aspect) / var(--ratio)));

		display: block;
		position: relative;
		width: 100%;
		aspect-ratio: 1 / var(--aspect);
		overflow: hidden;
		container-type: size;
		border-radius: var(--border-radius-base);
		background-color: oklch(18% 0.04 var(--hue));
		box-shadow: 0 0 0 1px var(--border-color-1);
		cursor: zoom-in;
		isolation: isolate;

		/* Ambient drift: a small, fixed movement as the card crosses the viewport.
		   The full travel through the site only happens under the pointer. */
		animation: frame-drift linear both;
		animation-timeline: view(block);
		animation-range: entry 60% exit 40%;
	}

	.frame.scrubbing {
		--p: var(--hp);
	}

	.frame.scrubbing .shot {
		translate: 0 calc(var(--p) * (100cqh - 100%));
	}

	@keyframes frame-drift {
		from {
			--sp: 0;
		}
		to {
			--sp: 1;
		}
	}

	.shot {
		position: absolute;
		inset: 0 0 auto 0;
		width: 100%;
		height: auto;
		max-width: none;
		/* At most 6% of the frame height, whatever the length of the site */
		translate: 0 calc(var(--sp) * -6cqh);
		transition: translate 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		user-select: none;
		-webkit-user-drag: none;
	}

	/* Scrollbar that doubles as a depth gauge: a short thumb means a long site */
	.rail {
		position: absolute;
		top: 0.5rem;
		bottom: 0.5rem;
		right: 0.375rem;
		width: 3px;
		border-radius: 3px;
		background-color: oklch(12% 0.04 var(--hue) / 55%);
		opacity: 0.7;
		transition: opacity 0.3s ease-out;
	}

	.thumb {
		position: absolute;
		left: 0;
		width: 100%;
		height: max(calc(var(--view) * 100%), 1.25rem);
		top: calc(var(--p) * (100% - max(calc(var(--view) * 100%), 1.25rem)));
		border-radius: inherit;
		background-color: var(--neon-cyan);
		transition: top 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.readout {
		position: absolute;
		left: 0.5rem;
		bottom: 0.5rem;
		padding: 0.125rem 0.5rem;
		border-radius: var(--border-radius-sm);
		background-color: oklch(12% 0.04 var(--hue) / 80%);
		color: oklch(92% 0.03 var(--hue));
		font-family: var(--font-family-body);
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.02em;
		line-height: 1.4;
		pointer-events: none;
	}

	.frame:hover .rail,
	.frame:focus-visible .rail {
		opacity: 1;
	}

	.scrubbing .readout {
		color: var(--neon-cyan);
	}

	.frame:focus-visible {
		outline: 2px solid var(--neon-cyan);
		outline-offset: 3px;
	}

	@media (prefers-reduced-motion: reduce) {
		.frame {
			animation: none;
		}

		.shot,
		.thumb {
			transition-duration: 0.01s;
		}
	}
</style>
