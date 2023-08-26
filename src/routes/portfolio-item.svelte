<script lang="ts">
	import type { IPortfolioItem } from './types';

	export let item: IPortfolioItem;

	export let index: number;

	import type { BiggerPictureInstance } from 'bigger-picture';
	import { loadBp } from '$lib/bigger-picture/load-bp';
	import { onMount } from 'svelte';

	let bp: BiggerPictureInstance;

	let previewElement: HTMLElement;

	/**
	 * Preview from image
	 * @param e
	 */
	function openBiggerPicture() {
		bp.open({
			items: document.querySelectorAll('#portfolio .preview'),
			el: previewElement
		});
	}

	/**
	 * Preview from video button
	 * @param e
	 */
	function openVideo(e: Event) {
		e.preventDefault();
		const target = e.currentTarget as HTMLElement;

		bp.open({
			items: target,
			el: target
		});
	}

	onMount(async () => {
		bp = await loadBp(); // use onMount to define variable so it runs only in the browser
	});
</script>

<article class="item transition item-{index} item-project">
	<div
		bind:this={previewElement}
		class="preview"
		data-img={item.image.big}
		data-thumb={item.image.preview}
		data-alt={item.name}
		data-caption={item.name}
		data-width={item.image.bigWidth}
		data-height={item.image.bigHeight}
		on:click={openBiggerPicture}
		role="button"
		tabindex="0"
		on:keydown={(e) => e.key === 'Enter' && openBiggerPicture()}
	>
		<img src={item.image.preview} alt={item.name} width="1000" height="1200" />
	</div>

	<h1 class="name">{item.name}</h1>

	<div class="tags">
		{#each item.tags as tag}
			<div class="tag">{tag}</div>
		{/each}
	</div>

	<div class="actions">
		<div
			class="btn"
			on:click={openBiggerPicture}
			role="button"
			tabindex="0"
			on:keydown={(e) => e.key === 'Enter' && openBiggerPicture()}
		>
			Preview
		</div>

		<!-- video -->
		{#if item.youtubeId}
			<a
				target="_blank"
				class="btn"
				href="https://youtu.be/{item.youtubeId}"
				data-width="1920"
				data-height="1080"
				data-thumb="/images/no-img.png"
				data-iframe="https://www.youtube.com/embed/{item.youtubeId}"
				on:click={openVideo}
			>
				Video
			</a>
		{/if}
	</div>
</article>

<style>
	.item {
		display: flex;
		flex-direction: column;
		padding: 0px;
		transition: var(--transition);
		box-shadow: inset 0 0 0 1px var(--bg-3);
		break-inside: avoid;
		margin-bottom: 1rem;
		border-radius: 0.25rem;
	}

	.preview {
		width: 100%;
		height: 22rem;
		background-image: linear-gradient(
			90deg,
			rgba(131, 3, 190, 0.2) 0%,
			rgba(0, 212, 255, 0.4) 100%
		);
		overflow: hidden;
	}

	.preview:focus-visible {
		box-shadow: 0 0 2rem oklch(72% 0.25 var(--hue) / 40%);
		outline: 0;
	}

	.preview img {
		width: 100%;
		height: auto;
		opacity: 0.4;
		cursor: pointer;
		transition: var(--transition);
		border-radius: 0rem;
	}

	.item:hover .preview img {
		opacity: 1;
		transform: scale(1.1);
		border-radius: 0.5rem;
	}

	.name {
		font-size: var(--font-size-base);
		font-weight: 300;
		color: var(--text-1);
		font-family: var(--font-family-body);
		margin-top: 1rem;
		padding: 0 1rem;
	}

	.tags {
		padding: 1rem;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: 0.5rem;
	}

	.tag {
		font-size: 80%;
	}

	.dialog-card {
		width: 80%;
		max-width: 100%;
	}

	.actions {
		width: 100%;
		opacity: 1;
		display: flex;
		padding: 1rem 0 0 0;
		justify-content: flex-end;
		gap: 1rem;
	}

	.btn-custom {
		background-color: var(--color-complement);
		color: black;
		font-weight: bold;
		letter-spacing: 2px;
		transition: var(--transition);

		&:hover {
			transform: scale(1.05, 1.05);
		}
	}

	.btn {
		background-color: var(--color-6);
		color: var(--bg-1);
		padding: 0.5rem 1.5rem;
		color: var(--text-1);
		/* border-radius: 88px; */
		cursor: pointer;
	}

	.btn:hover,
	.btn:focus-visible {
		box-shadow: 0 0 20px var(--color-6);
		outline: 0;
	}
</style>
