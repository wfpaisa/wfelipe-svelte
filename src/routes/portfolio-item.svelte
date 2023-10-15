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
		style:background-image="url({item.image.preview})"
	>
		<!-- <img src={item.image.preview} alt={item.name} width="1000" height="1200" /> -->
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
		box-shadow: 0 0 0 1px var(--border-color-1);
		break-inside: avoid;
		margin-bottom: 1rem;
		border-radius: var(--border-radius-base);

		animation-name: sv-grow-up;
		animation-fill-mode: both;
		animation-timing-function: linear;
		animation-timeline: view(block);
		animation-range: cover 0 cover 30%;
		animation-duration: 1ms;
	}

	@keyframes sv-grow-up {
		from {
			transform: translate(0px, 200px) scale(0.9);
			opacity: 0;
		}

		to {
			transform: translate(0px, 0px) scale(1);
			opacity: 1;
		}
	}

	.preview {
		width: 100%;
		height: 22rem;
		/* overflow: hidden; */
		border-radius: var(--border-radius-base);

		background-size: 100% auto;
		background-position: 0px -200px;
		background-repeat: no-repeat;

		animation-name: sv-grow-up2;
		animation-fill-mode: both;
		animation-timing-function: linear;
		animation-timeline: view(block);
		animation-range: cover 30% cover 80%;
		animation-duration: 1ms; /* Firefox requires this to apply the animation */
		cursor: pointer;
	}

	@keyframes sv-grow-up2 {
		from {
			background-position: 0px 0px;
		}

		to {
			background-position: 0px -200px;
		}
	}

	.preview:focus-visible {
		box-shadow: 0 0 2rem oklch(72% 0.25 var(--hue) / 40%);
		outline: 0;
	}

	.name {
		font-size: var(--font-size-base);
		font-weight: 300;
		color: var(--color-text);
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
		padding: 0.5rem;
		justify-content: flex-end;
		gap: 1rem;
	}

	.btn {
		background-color: var(--color-bg-highlight);
		padding: 0.5rem 1.5rem;
		color: white;
		border-radius: 2rem;
		cursor: pointer;
	}

	.btn:hover,
	.btn:focus-visible {
		box-shadow: 0 0 10px var(--color-bg-highlight);
		outline: 0;
	}
</style>
