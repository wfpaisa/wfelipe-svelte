<script lang="ts">
	import { flushSync, onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import { registerReader, type OpenOptions, type ReaderItem, type ReaderTab } from './reader';

	let dialog: HTMLDialogElement | undefined = $state();
	let stage: HTMLElement | undefined = $state();
	let shot: HTMLElement | undefined = $state();
	let mini: HTMLElement | undefined = $state();

	let items: ReaderItem[] = $state([]);
	let index = $state(0);
	let tab: ReaderTab = $state('site');
	let loaded = $state(false);
	/** Drops the stage's transition name while the dialog fades out, so the card can take it */
	let closing = $state(false);
	let failed = $state(false);
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

	function scrollToProgress(progress: number) {
		if (!stage || !shot) return;
		const range = Math.max(0, shot.offsetHeight - stage.clientHeight);
		stage.scrollTop = shot.offsetTop + progress * range;
		updateLens();
	}

	function show(list: ReaderItem[], i: number, options: OpenOptions) {
		items = list;
		index = i;
		closing = false;
		tab = options.tab ?? 'site';
		loaded = false;
		failed = false;
		flushSync();
		if (origin) origin.style.viewTransitionName = '';
		if (!dialog?.open) dialog?.showModal();
		document.documentElement.classList.add('reader-open');
		scrollToProgress(options.progress ?? 0);
		stage?.focus({ preventScroll: true });
	}

	function open(list: ReaderItem[], i: number, options: OpenOptions) {
		origin = options.origin ?? null;
		originIndex = i;

		if (origin && canAnimate()) {
			// The card's frame morphs into the reader's stage
			origin.style.viewTransitionName = 'reader-shot';
			document.startViewTransition(() => show(list, i, options));
		} else {
			show(list, i, options);
		}
	}

	function close() {
		const target = index === originIndex ? origin : null;
		const hide = () => {
			closing = true;
			flushSync();
			dialog?.close();
			document.documentElement.classList.remove('reader-open');
			if (target) target.style.viewTransitionName = 'reader-shot';
		};

		if (target && tab === 'site' && canAnimate()) {
			document
				.startViewTransition(hide)
				.finished.catch(() => {})
				.finally(() => {
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
			loaded = false;
			failed = false;
			flushSync();
			if (stage) stage.scrollTop = 0;
			updateLens();
		};
		if (canAnimate()) document.startViewTransition(run);
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
	aria-label={item ? `${item.name}, project ${index + 1} of ${count}` : 'Project'}
	{oncancel}
	{onkeydown}
>
	{#if item}
		<header class="bar">
			<p class="where">
				<span class="count">[{pad(index + 1)}/{pad(count)}]</span>
				<span class="name">{item.name}</span>
			</p>
			<ul class="bar-tags" aria-label="Technologies">
				{#each item.tags as tag (tag)}
					<li class="tag">{tag}</li>
				{/each}
			</ul>
		</header>

		<div class="controls">
			{#if item.youtubeId}
				<div class="tabs" role="group" aria-label="View">
					<button type="button" aria-pressed={tab === 'site'} onclick={() => setTab('site')}>
						<Icon name="page" size={18} /> Site
					</button>
					<button type="button" aria-pressed={tab === 'video'} onclick={() => setTab('video')}>
						<Icon name="play" size={18} /> Video
					</button>
				</div>
			{/if}

			{#if count > 1}
				<div class="steps">
					<button
						type="button"
						class="icon-btn"
						aria-label="Previous project: {prevItem.name}"
						title="Previous (←)"
						onclick={() => go(-1)}
					>
						<Icon name="arrow-left" />
					</button>
					<button
						type="button"
						class="icon-btn"
						aria-label="Next project: {nextItem.name}"
						title="Next (→)"
						onclick={() => go(1)}
					>
						<Icon name="arrow-right" />
					</button>
				</div>
			{/if}
		</div>

		<button type="button" class="close" aria-label="Close project" onclick={close}>
			<span class="close-key" aria-hidden="true">Esc</span>
			<Icon name="close" />
		</button>

		<div class="body" class:with-video={tab === 'video'} class:closing>
			{#if tab === 'site'}
				<!-- Focusable so the screenshot scrolls with the keyboard (WCAG 2.1.1) -->
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<div
					bind:this={stage}
					class="stage"
					tabindex="0"
					role="region"
					aria-label="{item.name}, full page screenshot"
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
								alt="Full page screenshot of {item.name}"
								width={item.full.width}
								height={item.full.height}
								decoding="async"
								onload={() => (loaded = true)}
								onerror={() => (failed = true)}
							/>
						</figure>
					{/key}

					{#if failed}
						<p class="notice" role="status">
							The full-resolution screenshot did not load. You are seeing a lighter version.
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

						<p class="outro-title">Want a site like this one?</p>
						<div class="outro-actions">
							<a class="btn" href="mailto:hi@wfelipe.com">
								<Icon name="mail" size={18} /> hi@wfelipe.com
							</a>
							{#if count > 1}
								<button type="button" class="btn ghost" onclick={() => go(1)}>
									Next: {nextItem.name}
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
				<div class="video">
					<iframe
						src="https://www.youtube-nocookie.com/embed/{item.youtubeId}?autoplay=1&rel=0"
						title="{item.name} video walkthrough"
						allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
						allowfullscreen
					></iframe>
				</div>
			{/if}
		</div>
	{/if}
</dialog>

<style>
	:global(html.reader-open) {
		overflow: hidden;
	}

	:global(::view-transition-group(reader-shot)) {
		animation-duration: 0.55s;
		animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
	}

	:global(::view-transition-old(reader-shot)),
	:global(::view-transition-new(reader-shot)) {
		height: 100%;
		object-fit: cover;
		object-position: top;
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
		view-transition-name: reader-shot;
		background-image: radial-gradient(circle, var(--dot-color) 1.5px, transparent 0);
		background-size: 2rem 2rem;
	}

	.body.closing {
		view-transition-name: none;
	}

	.body.with-video {
		grid-template-columns: minmax(0, 1fr);
	}

	.stage {
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

	/* Light strip fills the box while the full screenshot loads */
	.shot-light {
		position: absolute;
		inset: 0;
		height: 100%;
		filter: blur(6px);
		transform: scale(1.02);
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
		background-color: oklch(from var(--neon-cyan) l c h / 18%);
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
