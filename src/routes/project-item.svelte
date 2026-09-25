<script lang="ts">
	import ScrollFrame from '$lib/project-reader/ScrollFrame.svelte';
	import { openReader, type ReaderItem } from '$lib/project-reader/reader';
	import type { IProject } from './types';

	let { project, items, index }: { project: IProject; items: ReaderItem[]; index: number } =
		$props();

	const small = $derived(project.images.small);

	function onopen(offset: number, origin: HTMLElement) {
		openReader(items, index, { offset, origin });
	}
</script>

<article class="project ln {project.position}">
	<div class="project-img">
		<ScrollFrame item={items[index]} aspect={Number(small.height) / Number(small.width)} {onopen} />
	</div>

	<div class="project-info">
		<h2>{project.name}</h2>

		<p class="project-desc">{project.description}</p>

		<ul class="tags">
			{#each project.tags as tag (tag)}
				<li class="tag">{tag}</li>
			{/each}
		</ul>

		<ul class="links">
			{#each project.links as link (link.link)}
				<li>
					<a href={link.link} target={link.target} rel="noopener" aria-label={link.aria}>
						<i class={link.icon} aria-hidden="true"></i>
						<span aria-hidden="true">{new URL(link.link).hostname.replace('www.', '')}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</article>

<style>
	article {
		display: grid;
		gap: 1.5rem;
		margin-bottom: 5rem;
	}

	article:last-child {
		margin-bottom: 0;
	}

	@media (min-width: 768px) {
		article {
			grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
			column-gap: 3rem;
			align-items: center;
		}

		.dir-rl .project-img {
			order: 2;
		}
	}

	h2 {
		margin: 0 0 1rem;
		font-size: var(--font-size-xl);
	}

	.project-desc {
		max-width: 48ch;
		margin: 0 0 1.5rem;
		font-size: var(--font-size-sm);
		line-height: var(--font-lineheight-lg);
		color: var(--color-text-dim);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin: 0 0 1.5rem;
		padding: 0;
		list-style: none;
	}

	.tag {
		font-size: 0.75rem;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--font-size-sm);
	}

	.links a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0;
		color: var(--color-text-highlight);
	}

	.links i {
		font-size: 1.25rem;
	}

	.links a:hover span {
		text-decoration: underline;
		text-decoration-thickness: 1px;
	}
</style>
