<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import Icon from '$lib/project-reader/Icon.svelte';
	import ScrollFrame from '$lib/project-reader/ScrollFrame.svelte';
	import { openReader, type ReaderItem } from '$lib/project-reader/reader';

	let { items, index }: { items: ReaderItem[]; index: number } = $props();

	const i18n = getI18n();
	const item = $derived(items[index]);

	function openFromFrame(progress: number, origin: HTMLElement) {
		openReader(items, index, { progress, origin });
	}

	function openVideo(e: MouseEvent) {
		if (e.metaKey || e.ctrlKey || e.shiftKey) return;
		e.preventDefault();
		const frame = (e.currentTarget as HTMLElement).closest('article')?.querySelector('a');
		openReader(items, index, { tab: 'video', origin: frame ?? null });
	}

	function openSite(e: MouseEvent) {
		if (e.metaKey || e.ctrlKey || e.shiftKey) return;
		e.preventDefault();
		const frame = (e.currentTarget as HTMLElement).closest('article')?.querySelector('a');
		openReader(items, index, { origin: frame ?? null });
	}
</script>

<article class="item item-{index}" data-scroll>
	<ScrollFrame {item} onopen={openFromFrame} />

	<div class="meta">
		<h3 class="name">{item.name}</h3>

		<ul class="tags" aria-label={i18n.t.reader.technologies}>
			{#each item.tags as tag (tag)}
				<li class="tag">{tag}</li>
			{/each}
		</ul>
	</div>

	<div class="actions">
		<a class="btn" href={item.full.src} onclick={openSite}>
			<Icon name="page" size={18} />
			{i18n.t.reader.readSite}
		</a>

		{#if item.youtubeId}
			<a
				class="btn ghost"
				href="https://youtu.be/{item.youtubeId}"
				target="_blank"
				rel="noopener"
				onclick={openVideo}
			>
				<Icon name="play" size={18} />
				{i18n.t.reader.video}
			</a>
		{/if}
	</div>
</article>

<style>
	.item {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		break-inside: avoid;
		margin-bottom: 1rem;
		border-radius: calc(var(--border-radius-base) + 0.5rem);
		box-shadow: 0 0 0 1px var(--border-color-1);
		transition: var(--transition);

		animation-name: sv-grow-up;
		animation-fill-mode: both;
		animation-timing-function: linear;
		animation-timeline: view(block);
		--scroll-range: cover 0% cover 30%;
		animation-range: var(--scroll-range);
		animation-duration: 1ms;
	}

	.item:hover {
		box-shadow: 0 0 0 1px oklch(50% 0.2 var(--hue) / 60%);
	}

	@keyframes sv-grow-up {
		from {
			transform: translate(0px, 3rem) scale(0.97);
			opacity: 0;
		}

		to {
			transform: translate(0px, 0px) scale(1);
			opacity: 1;
		}
	}

	.meta {
		padding: 1.25rem 0.5rem 0.5rem;
	}

	.name {
		margin: 0 0 0.75rem;
		font-family: var(--font-family-title);
		font-size: var(--font-size-lg);
		font-weight: 300;
		line-height: var(--font-lineheight-md);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tag {
		font-size: 0.75rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.5rem;
		padding: 0.75rem 0.5rem 0.5rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1.25rem;
		border-radius: 2rem;
		white-space: nowrap;
		background-color: var(--color-bg-highlight);
		color: #fff;
		cursor: pointer;
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

	.btn:focus-visible {
		outline: 2px solid var(--neon-cyan);
		outline-offset: 2px;
	}
</style>
