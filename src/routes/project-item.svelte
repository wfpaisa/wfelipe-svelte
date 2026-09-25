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

<article class="project project-{index} {project.position}">
	<div class="project-img">
		<div class="project-img-in">
			<ScrollFrame
				item={items[index]}
				aspect={Number(small.height) / Number(small.width)}
				{onopen}
			/>
		</div>
	</div>

	<div class="project-info">
		<div class="project-info-in">
			<h2>{project.name}</h2>

			<div class="project-desc">
				{project.description}
				<br />
				{#each project.links as link (link.link)}
					<a href={link.link} target={link.target} rel="noopener" aria-label={link.aria}>
						<i class={link.icon}></i>
					</a>
				{/each}
			</div>

			<div class="tags">
				{#each project.tags as tag (tag)}
					<span class="tag">
						{tag}
					</span>
				{/each}
			</div>
		</div>
	</div>
</article>

<style>
	article {
		display: flex;
		gap: 2rem;
		flex-direction: column;
		margin-bottom: 4rem;
		align-items: center;
	}

	article .project-img {
		width: 100%;
	}

	article .project-img .project-img-in {
		position: relative;
		z-index: 1;
		box-shadow: 0 0 1px 1px oklch(88% 0.04 var(--hue) / 20%);
		border-radius: var(--border-radius-base);
		transition: var(--transition);
	}

	article .project-img .project-img-in::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 1;
		top: 0%;
		left: 0%;
		border-radius: 0.5rem;
		background-color: oklch(88% 0.04 var(--hue) / 20%);
		transition: var(--transition);
	}

	article .project-img:hover .project-img-in::after {
		transform: rotateZ(-4deg);
	}

	article .project-img .project-img-in :global(.frame) {
		position: relative;
		z-index: 2;
	}

	article .project-info {
		width: 100%;
		position: relative;
		z-index: 3;
	}

	article .project-info .project-info-in {
		padding: 1rem;
		border-radius: var(--border-radius-base);
	}

	article .project-info .project-info-in h2 {
		margin: 1rem 0;
	}

	article .project-info .project-info-in .project-desc {
		font-size: var(--font-size-sm);
		line-height: 1.1rem;
	}

	article .project-info .project-info-in .project-desc a {
		color: var(--color-text-highlight);
		display: inline-block;
		font-size: var(--font-size-md);
		margin: 0.5rem 0;
	}

	article .project-info .project-info-in .project-desc a:hover {
		transform: scale(1.2, 1.2);
	}

	article .project-info .project-info-in .tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.2rem;
	}

	article a {
		align-items: center;
		padding: 0.5rem;
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.dir-lf .project-info-in {
		/* border-bottom: 1px solid rgba(18, 3, 3); */
		/* box-shadow: 0 0.2rem 0.5rem var(--color-8); */
	}

	.dir-rl {
		flex-direction: column;
	}

	.dir-rl .project-info-in {
		text-align: right;
		/* border-bottom: 1px solid rgba(18, 3, 3); */
		/* box-shadow: 0 0.2rem 0.5rem var(--color-8); */
	}

	.dir-rl .project-info-in .tags {
		width: 100%;
		justify-content: flex-end;
	}

	@media (min-width: 480px) {
		article {
			gap: 1rem;
			flex-direction: row;
		}

		.dir-lf .project-info-in {
			/* border-left: 1px solid rgba(18, 3, 3); */
			border-bottom: none;
			/* box-shadow: 0 0 1px 1px oklch(88% 0.04 var(--hue) / 20%); */
		}

		.dir-rl {
			flex-direction: row-reverse;
		}

		.dir-rl .project-info-in {
			/* border-right: 1px solid rgba(18, 3, 3); */
			border-bottom: none;
			/* box-shadow: 0 0 1px 1px oklch(88% 0.04 var(--hue) / 20%); */
		}
	}
</style>
