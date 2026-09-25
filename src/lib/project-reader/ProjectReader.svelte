<script lang="ts">
	import { flushSync, onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import { getI18n } from '$lib/i18n';
	import {
		decoded,
		prefetch,
		registerReader,
		type OpenOptions,
		type ReaderItem,
		type ReaderTab
	} from './reader';

	const i18n = getI18n();
	const t = $derived(i18n.t.reader);

	let dialog: HTMLDialogElement | undefined = $state();
	let stage: HTMLElement | undefined = $state();
	let shot: HTMLElement | undefined = $state();
	let mini: HTMLElement | undefined = $state();

	let items: ReaderItem[] = $state([]);
	let index = $state(0);
	let tab: ReaderTab = $state('site');
	let loaded = $state(false);
	let failed = $state(false);
	/**
	 * Stand-in for the visible part of the screenshot while the card morphs in or out.
	 * The scrolling stage is wider and taller than what shows of the site, so it cannot
	 * be the morph target itself without distorting the zoom.
	 */
	let morph: {
		top: number;
		left: number;
		width: number;
		height: number;
		offset: number;
		src: string;
	} | null = $state(null);
	/** Visible part of the screenshot, as fractions of its height */
	let lens = $state({ top: 0, height: 1 });

	let origin: HTMLElement | null = null;
	let originIndex = -1;
	let dragging = false;
	let frameRequest = 0;

	const item = $derived(items[index]);
	const count = $derived(items.length);
	const prevItem = $derived(items[(index - 1 + count) % count]);
	const nextItem = $derived(items[(index + 1) % count]);
	const read = $derived(Math.round(Math.min(1, Math.max(0, lens.top + lens.height)) * 100));
	const pad = (n: number) => String(n).padStart(2, '0');

	function canAnimate() {
		return (
			typeof document.startViewTransition === 'function' &&
			!matchMedia('(prefers-reduced-motion: reduce)').matches
		);
	}

	/** Runs a view transition; a skipped one (hidden tab, rapid clicks) is not an error */
	function transition(update: () => void) {
		const t = document.startViewTransition(update);
		t.ready.catch(() => {});
		return t.finished.catch(() => {});
	}

	function updateLens() {
		if (!stage || !shot || !shot.offsetHeight) return;
		lens = {
			top: (stage.scrollTop - shot.offsetTop) / shot.offsetHeight,
			height: stage.clientHeight / shot.offsetHeight
		};
	}

	function onscroll() {
		cancelAnimationFrame(frameRequest);
		frameRequest = requestAnimationFrame(updateLens);
	}

	/** offset: 0..1 of the screenshot's height at the top of the stage */
	function scrollToOffset(offset: number) {
		if (!stage || !shot) return;
		stage.scrollTop = shot.offsetTop + offset * shot.offsetHeight;
		updateLens();
	}

	/** The part of the screenshot on screen right now, with what it is painting */
	function measureMorph() {
		if (!stage || !shot || !item) return null;
		const view = stage.getBoundingClientRect();
		const box = shot.getBoundingClientRect();
		const top = Math.max(box.top, view.top);
		const bottom = Math.min(box.bottom, view.bottom);
		if (bottom <= top) return null;
		return {
			top,
			left: box.left,
			width: box.width,
			height: bottom - top,
			offset: box.top - top,
			src: loaded ? item.full.src : item.strip
		};
	}

	function show(list: ReaderItem[], i: number, options: OpenOptions) {
		items = list;
		index = i;
		tab = options.tab ?? 'site';
		loaded = decoded.has(list[i].full.src);
		failed = false;
		flushSync();
		if (origin) origin.style.viewTransitionName = '';
		if (!dialog?.open) dialog?.showModal();
		document.documentElement.classList.add('reader-open');
		scrollToOffset(options.offset ?? 0);
		stage?.focus({ preventScroll: true });
	}

	/** Longest wait for the full screenshot before the zoom starts anyway */
	const DECODE_BUDGET = 250;

	async function open(list: ReaderItem[], i: number, options: OpenOptions) {
		origin = options.origin ?? null;
		originIndex = i;
		const site = (options.tab ?? 'site') === 'site';

		if (!origin || !canAnimate()) {
			show(list, i, options);
			return;
		}

		// Zoom into the sharp screenshot instead of swapping it in halfway
		if (site) {
			await Promise.race([
				prefetch(list[i].full.src),
				new Promise((resolve) => setTimeout(resolve, DECODE_BUDGET))
			]);
		}

		const source = origin;
		source.style.viewTransitionName = 'reader-shot';
		transition(() => {
			show(list, i, options);
			morph = site ? measureMorph() : null;
			flushSync();
		}).finally(() => {
			source.style.viewTransitionName = '';
			morph = null;
		});
	}

	function close() {
		const target = index === originIndex ? origin : null;
		const hide = () => {
			morph = null;
			flushSync();
			dialog?.close();
			document.documentElement.classList.remove('reader-open');
			if (target) target.style.viewTransitionName = 'reader-shot';
		};

		const from = target && tab === 'site' && canAnimate() ? measureMorph() : null;
		if (target && from) {
			// The visible part of the site shrinks back into the card
			morph = from;
			flushSync();
			transition(hide).finally(() => {
				target.style.viewTransitionName = '';
				target.focus({ preventScroll: true });
			});
		} else {
			hide();
			if (target) target.style.viewTransitionName = '';
			origin?.focus({ preventScroll: true });
		}
	}

	function change(update: () => void) {
		const run = () => {
			update();
			loaded = decoded.has(items[index].full.src);
			failed = false;
			flushSync();
			if (stage) stage.scrollTop = 0;
			updateLens();
		};
		if (canAnimate()) transition(run);
		else run();
	}

	function go(delta: number) {
		if (count < 2) return;
		change(() => {
			index = (index + delta + count) % count;
			tab = 'site';
		});
	}

	function setTab(next: ReaderTab) {
		if (next === tab) return;
		change(() => (tab = next));
	}

	function oncancel(e: Event) {
		// Esc: run our own close so it can animate
		e.preventDefault();
		close();
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.altKey || e.ctrlKey || e.metaKey) return;
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			go(1);
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			go(-1);
		}
	}

	function seek(e: PointerEvent) {
		if (!stage || !shot || !mini) return;
		const rect = mini.getBoundingClientRect();
		const fraction = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
		stage.scrollTop = shot.offsetTop + fraction * shot.offsetHeight - stage.clientHeight / 2;
	}

	function onminidown(e: PointerEvent) {
		dragging = true;
		mini?.setPointerCapture(e.pointerId);
		seek(e);
	}

	function onminimove(e: PointerEvent) {
		if (dragging) seek(e);
	}

	function onminiup(e: PointerEvent) {
		dragging = false;
		mini?.releasePointerCapture(e.pointerId);
	}

	onMount(() => {
		registerReader(open);
		addEventListener('resize', updateLens);
		return () => {
			registerReader(null);
			removeEventListener('resize', updateLens);
			document.documentElement.classList.remove('reader-open');
		};
	});
</script>

<dialog
	bind:this={dialog}
	class="reader"
	aria-label={item ? t.dialog(item.name, index + 1, count) : undefined}
	{oncancel}
	{onkeydown}
>
	{#if item}
		<header class="bar">
			<p class="where">
				<span class="count">[{pad(index + 1)}/{pad(count)}]</span>
				<span class="name">{item.name}</span>
			</p>
			<ul class="bar-tags" aria-label={t.technologies}>
				{#each item.tags as tag (tag)}
					<li class="tag">{tag}</li>
				{/each}
			</ul>
		</header>

		<div class="controls">
			{#if item.youtubeId}
				<div class="tabs" role="group" aria-label={t.view}>
					<button type="button" aria-pressed={tab === 'site'} onclick={() => setTab('site')}>
						<Icon name="page" size={18} />
						{t.site}
					</button>
					<button type="button" aria-pressed={tab === 'video'} onclick={() => setTab('video')}>
						<Icon name="play" size={18} />
						{t.video}
					</button>
				</div>
			{/if}

			{#if count > 1}
				<div class="steps">
					<button
						type="button"
						class="icon-btn"
						aria-label={t.previous(prevItem.name)}
						title={t.previousHint}
						onclick={() => go(-1)}
					>
						<Icon name="arrow-left" />
					</button>
					<button
						type="button"
						class="icon-btn"
						aria-label={t.next(nextItem.name)}
						title={t.nextHint}
						onclick={() => go(1)}
					>
						<Icon name="arrow-right" />
					</button>
				</div>
			{/if}
		</div>

		<button type="button" class="close" aria-label={t.close} onclick={close}>
			<span class="close-key" aria-hidden="true">Esc</span>
			<Icon name="close" />
		</button>

		<div class="body" class:with-video={tab === 'video'}>
			{#if tab === 'site'}
				<!-- Focusable so the screenshot scrolls with the keyboard (WCAG 2.1.1) -->
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<div
					bind:this={stage}
					class="stage"
					tabindex="0"
					role="region"
					aria-label={t.stage(item.name)}
					{onscroll}
				>
					{#key item.full.src}
						<figure class="shot" bind:this={shot} class:loaded>
							<img
								class="shot-light"
								src={item.strip}
								alt=""
								width="600"
								height={Math.round((600 * item.full.height) / item.full.width)}
							/>
							<img
								class="shot-full"
								src={item.full.src}
								alt={t.screenshot(item.name)}
								width={item.full.width}
								height={item.full.height}
								decoding="async"
								onload={() => {
									decoded.add(item.full.src);
									loaded = true;
								}}
								onerror={() => (failed = true)}
							/>
						</figure>
					{/key}

					{#if failed}
						<p class="notice" role="status">
							{t.failed}
						</p>
					{/if}

					<footer class="outro">
						{#if item.description}
							<p class="outro-desc">{item.description}</p>
						{/if}

						{#if item.links?.length}
							<ul class="outro-links">
								{#each item.links as link (link.link)}
									<li>
										<a href={link.link} target={link.target} rel="noopener" aria-label={link.aria}>
											<i class={link.icon} aria-hidden="true"></i>
										</a>
									</li>
								{/each}
							</ul>
						{/if}

						<p class="outro-title">{t.cta}</p>
						<div class="outro-actions">
							<a class="btn" href="mailto:hi@wfelipe.com">
								<Icon name="mail" size={18} /> hi@wfelipe.com
							</a>
							{#if count > 1}
								<button type="button" class="btn ghost" onclick={() => go(1)}>
									{t.nextShort(nextItem.name)}
									<Icon name="arrow-right" size={18} />
								</button>
							{/if}
						</div>
					</footer>
				</div>

				<div class="minimap" aria-hidden="true">
					<!-- Pointer shortcut only; the stage above is the keyboard path -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						bind:this={mini}
						class="mini"
						style:--ratio={item.full.height / item.full.width}
						onpointerdown={onminidown}
						onpointermove={onminimove}
						onpointerup={onminiup}
						onpointercancel={onminiup}
					>
						<img src={item.strip} alt="" draggable="false" />
						<span
							class="lens"
							style:top="{Math.min(1, Math.max(0, lens.top)) * 100}%"
							style:height="{Math.min(1, lens.height) * 100}%"
						></span>
					</div>
					<span class="mini-read">{read}%</span>
				</div>
			{:else}
				<div class="video" class:morph-target={!morph}>
					<iframe
						src="https://www.youtube-nocookie.com/embed/{item.youtubeId}?autoplay=1&rel=0"
						title={t.videoTitle(item.name)}
						allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
						allowfullscreen
					></iframe>
				</div>
			{/if}
		</div>
	{/if}

	{#if morph}
		<div
			class="morph"
			aria-hidden="true"
			style:top="{morph.top}px"
			style:left="{morph.left}px"
			style:width="{morph.width}px"
			style:height="{morph.height}px"
		>
			<img src={morph.src} alt="" style:translate="0 {morph.offset}px" />
		</div>
	{/if}
</dialog>

<style>
	/* Keep the scrollbar's space: if the viewport width changes, the browser drops
	   the view transition (and the page behind would jump sideways) */
	:global(html.reader-open) {
		overflow: hidden;
		scrollbar-gutter: stable;
	}

	/* Card and reader show the same page at the same spot, only wider: both images
	   scale by width from the top, and the group clips them, so the zoom is a window
	   opening onto the page instead of two pictures swapping. */
	:global(::view-transition-group(reader-shot)) {
		overflow: clip;
		border-radius: var(--border-radius-base);
		animation-duration: 0.5s;
		animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
	}

	:global(::view-transition-old(reader-shot)),
	:global(::view-transition-new(reader-shot)) {
		width: 100%;
		height: auto;
		animation-duration: 0.3s;
		animation-timing-function: ease-out;
	}

	.reader {
		--bar-h: 3.5rem;

		position: fixed;
		inset: 0;
		width: 100%;
		height: 100dvh;
		max-width: none;
		max-height: none;
		margin: 0;
		padding: 0;
		border: 0;
		color: var(--color-text);
		background-color: var(--color-bg-base);
		overflow: hidden;
		opacity: 0;
		transition:
			opacity 0.25s ease-out,
			display 0.25s allow-discrete,
			overlay 0.25s allow-discrete;
	}

	.reader[open] {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto auto;
		grid-template-rows: var(--bar-h) minmax(0, 1fr);
		grid-template-areas:
			'bar controls close'
			'body body body';
		opacity: 1;
	}

	@starting-style {
		.reader[open] {
			opacity: 0;
		}
	}

	.reader::backdrop {
		background-color: oklch(12% 0.04 var(--hue) / 70%);
	}

	/* ---- Top bar ---- */
	.bar {
		grid-area: bar;
		display: flex;
		align-items: center;
		gap: 1.5rem;
		min-width: 0;
		padding: 0 1rem 0 1.5rem;
		border-bottom: 1px solid var(--border-color-1);
	}

	.where {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		min-width: 0;
		margin: 0;
	}

	.count {
		color: var(--color-text-highlight);
		font-size: var(--font-size-sm);
		font-variant-numeric: tabular-nums;
		flex: none;
	}

	.name {
		font-family: var(--font-family-title);
		font-size: var(--font-size-md);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.bar-tags {
		display: flex;
		gap: 0.375rem;
		margin: 0;
		padding: 0;
		list-style: none;
		overflow: hidden;
		mask-image: linear-gradient(to right, #000 85%, transparent);
	}

	.bar-tags .tag {
		flex: none;
		font-size: 0.75rem;
	}

	.controls {
		grid-area: controls;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0 1rem;
		border-bottom: 1px solid var(--border-color-1);
	}

	.tabs {
		display: flex;
		padding: 0.1875rem;
		border-radius: 99px;
		box-shadow: inset 0 0 0 1px var(--border-color-1);
	}

	.tabs button {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.3125rem 0.875rem;
		border: 0;
		border-radius: 99px;
		background: none;
		color: inherit;
		font: inherit;
		font-size: var(--font-size-sm);
		cursor: pointer;
		transition: var(--transition);
	}

	.tabs button[aria-pressed='true'] {
		background-color: var(--color-bg-highlight);
		color: #fff;
	}

	.tabs button:not([aria-pressed='true']):hover {
		color: var(--color-text-highlight);
	}

	.steps {
		display: flex;
		gap: 0.25rem;
	}

	.icon-btn,
	.close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		min-width: 2.5rem;
		height: 2.5rem;
		padding: 0 0.5rem;
		border: 0;
		border-radius: 99px;
		background: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		transition: var(--transition);
	}

	.icon-btn:hover,
	.close:hover {
		color: var(--color-text-highlight);
		background-color: oklch(50% 0.27 var(--hue) / 12%);
	}

	.close {
		grid-area: close;
		align-self: center;
		margin-right: 1rem;
		padding: 0 0.75rem;
	}

	.close-key {
		font-size: 0.75rem;
		color: var(--color-text-highlight);
	}

	.close-key::before {
		content: '[ ';
	}

	.close-key::after {
		content: ' ]';
	}

	.reader :focus-visible {
		outline: 2px solid var(--neon-cyan);
		outline-offset: 2px;
	}

	/* ---- Body ---- */
	.body {
		grid-area: body;
		display: grid;
		grid-template-columns: minmax(0, 1fr) 9rem;
		min-height: 0;
		background-image: radial-gradient(circle, var(--dot-color) 1.5px, transparent 0);
		background-size: 2rem 2rem;
	}

	.body.with-video {
		grid-template-columns: minmax(0, 1fr);
	}

	.stage {
		/* offsetParent for the screenshot, so offsetTop is measured inside the scroll */
		position: relative;
		overflow-y: auto;
		overscroll-behavior: contain;
		scroll-behavior: auto;
		scrollbar-width: none;
		padding: 2rem 2rem 0;
	}

	.stage::-webkit-scrollbar {
		display: none;
	}

	.stage:focus-visible {
		outline-offset: -2px;
	}

	.shot {
		position: relative;
		width: min(100%, 72rem);
		margin: 0 auto;
		border-radius: var(--border-radius-base) var(--border-radius-base) 0 0;
		overflow: hidden;
		box-shadow:
			0 0 0 1px var(--border-color-1),
			0 1.5rem 4rem -1rem oklch(5% 0.04 var(--hue) / 60%);
		background-color: oklch(18% 0.04 var(--hue));
	}

	.shot-full {
		display: block;
		width: 100%;
		height: auto;
		max-width: none;
	}

	/* Light strip fills the box while the full screenshot loads: the same image the
	   card shows, so the zoom never lands on a blur */
	.shot-light {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.morph {
		position: fixed;
		z-index: 1;
		overflow: hidden;
		border-radius: var(--border-radius-base) var(--border-radius-base) 0 0;
		pointer-events: none;
		view-transition-name: reader-shot;
	}

	.morph img {
		display: block;
		width: 100%;
		height: auto;
		max-width: none;
	}

	/* Without a screenshot to zoom into (video tab), the card morphs into the player */
	.video.morph-target {
		view-transition-name: reader-shot;
	}

	.shot-full {
		position: relative;
		opacity: 0;
		transition: opacity 0.4s ease-out;
	}

	.loaded .shot-full {
		opacity: 1;
	}

	.notice {
		width: min(100%, 72rem);
		margin: 1rem auto 0;
		font-size: var(--font-size-sm);
		color: var(--neon-pink);
	}

	.outro {
		width: min(100%, 72rem);
		margin: 0 auto;
		padding: 4rem 0 5rem;
		text-align: center;
	}

	.outro-desc {
		max-width: 60ch;
		margin: 0 auto 1rem;
		font-size: var(--font-size-sm);
		line-height: var(--font-lineheight-lg);
	}

	.outro-links {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin: 0 0 2.5rem;
		padding: 0;
		list-style: none;
		font-size: var(--font-size-md);
	}

	.outro-links a {
		padding: 0.5rem;
	}

	.outro-title {
		margin: 0 0 1.5rem;
		font-family: var(--font-family-title);
		font-size: var(--font-size-xl);
		line-height: var(--font-lineheight-md);
		text-wrap: balance;
	}

	.outro-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1.5rem;
		border: 0;
		border-radius: 2rem;
		background-color: var(--color-bg-highlight);
		color: #fff;
		font: inherit;
		cursor: pointer;
		transition: var(--transition);
	}

	.btn:hover {
		background-color: oklch(56% 0.27 var(--hue));
		box-shadow: 0 0.25rem 1rem -0.25rem oklch(50% 0.27 var(--hue) / 60%);
	}

	.btn.ghost {
		background: none;
		color: var(--color-text);
		box-shadow: inset 0 0 0 1px var(--color-bg-highlight);
	}

	.btn.ghost:hover {
		color: var(--color-text-highlight);
		background-color: oklch(50% 0.27 var(--hue) / 12%);
	}

	/* ---- Minimap ---- */
	.minimap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		min-height: 0;
		padding: 2rem 1rem 1.5rem;
		border-left: 1px solid var(--border-color-1);
		background-color: var(--color-bg-base);
	}

	.mini {
		position: relative;
		height: min(100%, calc(7rem * var(--ratio)));
		aspect-ratio: 1 / var(--ratio);
		max-width: 100%;
		border-radius: var(--border-radius-sm);
		overflow: hidden;
		box-shadow: 0 0 0 1px var(--border-color-1);
		cursor: grab;
		touch-action: none;
		user-select: none;
	}

	.mini:active {
		cursor: grabbing;
	}

	.mini img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: fill;
		opacity: 0.55;
		pointer-events: none;
	}

	.lens {
		position: absolute;
		left: 0;
		right: 0;
		min-height: 4px;
		border: 1px solid var(--neon-cyan);
		border-radius: 2px;
		background-color: color-mix(in oklch, var(--neon-cyan) 18%, transparent);
		box-shadow: 0 0 0 100vmax oklch(12% 0.04 var(--hue) / 35%);
		pointer-events: none;
	}

	.mini-read {
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
		color: var(--color-text-highlight);
	}

	/* ---- Video ---- */
	.video {
		display: grid;
		place-items: center;
		padding: 2rem;
		min-height: 0;
	}

	.video iframe {
		width: min(100%, calc((100dvh - var(--bar-h) - 4rem) * 16 / 9));
		aspect-ratio: 16 / 9;
		border: 0;
		border-radius: var(--border-radius-base);
		box-shadow: 0 0 0 1px var(--border-color-1);
		background-color: #000;
	}

	/* ---- Small screens: controls move to a bottom bar ---- */
	@media (max-width: 719px) {
		.reader[open] {
			grid-template-columns: minmax(0, 1fr) auto;
			grid-template-rows: var(--bar-h) minmax(0, 1fr) auto;
			grid-template-areas:
				'bar close'
				'body body'
				'controls controls';
		}

		.bar {
			padding-left: 1rem;
			border-bottom: 1px solid var(--border-color-1);
		}

		.bar-tags,
		.close-key,
		.minimap {
			display: none;
		}

		.close {
			margin-right: 0.5rem;
			padding: 0;
			border-bottom: 0;
		}

		.body {
			grid-template-columns: minmax(0, 1fr);
		}

		.controls {
			justify-content: space-between;
			padding: 0.5rem 1rem calc(0.5rem + env(safe-area-inset-bottom));
			border-bottom: 0;
			border-top: 1px solid var(--border-color-1);
		}

		.steps {
			margin-left: auto;
		}

		.stage {
			padding: 1rem 1rem 0;
		}

		.video {
			padding: 1rem;
		}

		.video iframe {
			width: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reader,
		.shot-full {
			transition-duration: 0.01s;
		}
	}
</style>
