<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import Prompt from '$lib/log/Prompt.svelte';

	const i18n = getI18n();

	const count = $derived(i18n.t.work.items.length);
</script>

<section id="work">
	<div class="col">
		<Prompt path="~" cmd="git log --graph" />

		<h2 class="ln scroll-view sv-grow-up" data-scroll>
			<span class="number">02.</span>
			{i18n.t.work.title}
		</h2>

		<!-- Newest first, like `git log`: the top commit is today -->
		<ol class="graph ln">
			{#each i18n.t.work.items as text, index (index)}
				<li class:head={index === 0}>
					<span class="node" aria-hidden="true"></span>
					<p class="scroll-view sv-grow-up-inline" data-scroll>
						<span class="ref" aria-hidden="true">
							<span class="hash">{String(count - index).padStart(2, '0')}</span>
							{#if index === 0}<span class="head-ref">HEAD</span>{/if}
						</span>
						{text}
					</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	#work {
		padding: clamp(4rem, 8vw, 7rem) 0;
	}

	h2 {
		margin: 0 0 3rem;
	}

	h2.ln::before {
		top: 0.6em;
	}

	.graph {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* ol li::before from the global styles numbers lists; the graph draws its own */
	.graph li::before {
		display: none;
	}

	li {
		position: relative;
		padding: 0 0 2.25rem 2.5rem;
	}

	/* The branch: one line joining every commit */
	li::after {
		content: '';
		position: absolute;
		top: 0.9rem;
		bottom: -0.35rem;
		left: 0.3125rem;
		width: 1px;
		background-color: oklch(70% 0.27 var(--hue) / 35%);
	}

	li:last-child::after {
		display: none;
	}

	.node {
		position: absolute;
		top: 0.35rem;
		left: 0;
		width: 0.625rem;
		height: 0.625rem;
		box-sizing: border-box;
		border-radius: 50%;
		border: 1px solid var(--color-text-highlight);
		background-color: var(--color-bg-base);
	}

	.head .node {
		background-color: var(--color-text-highlight);
		box-shadow: 0 0 0 4px oklch(70% 0.27 var(--hue) / 18%);
	}

	p {
		max-width: 64ch;
		margin: 0;
		line-height: var(--font-lineheight-lg);
	}

	.ref {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		margin-bottom: 0.375rem;
		font-size: var(--font-size-sm);
	}

	.hash {
		color: var(--color-text-highlight);
		font-variant-numeric: tabular-nums;
	}

	.head-ref {
		padding: 0 0.5rem;
		border-radius: var(--border-radius-sm);
		border: 1px solid oklch(70% 0.27 var(--hue) / 50%);
		color: var(--color-text-highlight);
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		line-height: 1.6;
	}

	.head p {
		font-family: var(--font-family-title);
		font-size: var(--font-size-md);
		font-weight: 100;
		line-height: 1.45;
	}

	.head .ref {
		font-family: var(--font-family-body);
	}
</style>
