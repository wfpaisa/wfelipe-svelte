<script lang="ts">
	import type { IPortfolioItem } from './types';

	export let item: IPortfolioItem;

	export let index: number;
</script>

<article class="item transition item-{index}">
	<div class="img">
		<!-- <img src={item.preview} alt="" /> -->
	</div>

	<h1 class="name">{item.name}</h1>

	<div class="tags">
		{#each item.tags as tag}
			<div class="tag">{tag}</div>
		{/each}
	</div>

	<div class="actions">
		<!-- Fullscreen -->
		<!-- <li @click="dialog = !dialog" v-if="item.dialog"> -->
		{#if item.dialog}
			<!-- <q-btn label="preview" class="btn-custom" icon="sym_r_photo" size="sm" /> -->
			<span class="btn">Preview</span>
		{/if}

		<!-- video -->
		{#if item.video}
			<a href="/" target="_blank" class="btn">
				<!-- <q-btn label="Video" class="btn-custom" icon="sym_r_movie" size="sm" /> -->
				<span>Video</span>
			</a>
		{/if}
	</div>

	<!-- Full screen image -->
	<!-- <q-dialog v-model="dialog" maximized @show="onDialogShow()">
    <q-card class="dialog-card">
      <q-bar class="dialog-card-bar">
        <q-space />
        <q-btn dense flat icon="sym_r_close_fullscreen" v-close-popup />
      </q-bar>

      <q-card-section class="dialog-card-content">
        <div ref="imgFullScreen" v-html="item.dialog"></div>
      </q-card-section>
    </q-card>
  </q-dialog> -->
</article>

<style>
	.item {
		display: flex;
		flex-direction: column;
		padding: 0px;
		transition: var(--transition);
		/* background-color: var(--bg-2); */
		box-shadow: inset 0 0 0 1px var(--bg-3);
	}

	.img {
		width: 100%;
		height: 22rem;
		/* background-image: radial-gradient(400px 400px at 70% 50%, var(--color-9) 0%, transparent 100%); */
		background-image: linear-gradient(
			90deg,
			rgba(131, 3, 190, 0.2) 0%,
			rgba(0, 212, 255, 0.4) 100%
		);
		overflow: hidden;
	}

	.img img {
		width: 100%;
		height: auto;
		opacity: 0.4;
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
		justify-content: space-between;
		gap: 0.25rem;
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
		background-color: var(--text-v-1);
		color: var(--bg-1);
		padding: 4px 1rem;
		/* border-radius: 88px; */
		cursor: pointer;
	}

	.btn:hover {
		box-shadow: 0 0 40px rgba(0, 212, 255, 0.6);
	}
</style>
