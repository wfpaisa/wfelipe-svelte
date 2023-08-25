<script lang="ts">
	import type { IProject } from './types';

	export let project: IProject;

	export let index: number;
</script>

<article class="project project-{index}">
	<div class="project-img">
		<div class="project-img-in">
			<!-- <q-btn round dense class="btn-fullscreen" icon="sym_r_fullscreen" click="dialog = true" /> -->

			<!-- Preview image -->
			<img
				src={project.images.small.src}
				alt={project.images.small.alt}
				width={project.images.small.width}
				height={project.images.small.height}
			/>

			<!-- Full screen image -->
			<!-- <q-dialog v-model="dialog" maximized @show="onDialogShow()">
				<q-card class="dialog-card">
					<q-bar class="dialog-card-bar">
						<q-space />
						<q-btn dense flat icon="sym_r_close_fullscreen" v-close-popup />
					</q-bar>

					<q-card-section class="dialog-card-content">
						<img
							ref="imgFullScreen"
							:src="project.images.fullscreen.src"
							:alt="project.images.fullscreen.alt"
							:width="project.images.fullscreen.width"
							:height="project.images.fullscreen.height"
						/>
					</q-card-section>
				</q-card>
			</q-dialog> -->
		</div>
	</div>

	<div class="project-info">
		<div class="project-info-in">
			<div class="icons">
				<!-- <q-icon name="sym_r_stars" v-for="n in 3" :key="n" /> -->
			</div>

			<h2>{project.name}</h2>

			<div class="project-desc">
				{project.description}
				<br />
				{#each project.links as link}
					<a href={link.link} target={link.target} aria-label={link.aria}>
						<i class={link.icon} />
					</a>
				{/each}
			</div>

			<div class="tags">
				{#each project.tags as tag}
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
	@media (min-width: 480px) {
		article {
			gap: 1rem;
			flex-direction: row;
		}
	}
	article .project-img {
		width: 100%;
	}
	article .project-img .project-img-in {
		position: relative;
		z-index: 1;
	}
	article .project-img .project-img-in::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		box-shadow: 0 0 0 4px var(--bg-2);
		z-index: 1;
		top: 0%;
		left: 0%;
		transform: skew(0deg, 4deg);
		border-radius: 0.5rem;
		background-color: var(--bg-2);
	}
	article .project-img .project-img-in img {
		position: relative;
		object-fit: cover;
		width: 100%;
		display: block;
		margin: auto;
		border-radius: 0.5rem;
		transition: var(--transition);
		z-index: 2;
		cursor: pointer;
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
	article .project-info .project-info-in .icons {
		color: var(--color-green);
		font-size: var(--font-size-lg);
		margin: 0 -0.4rem;
	}
	article .project-info .project-info-in .icons i {
		margin: 0 0.15rem;
	}
	article .project-info .project-info-in h2 {
		margin: 1rem 0;
	}
	article .project-info .project-info-in .project-desc {
		font-size: var(--font-size-sm);
		line-height: 1.1rem;
	}
	article .project-info .project-info-in .project-desc a {
		color: var(--text-2);
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
	article img {
		max-width: 100%;
		height: auto;
	}
	.dir-lf .project-info-in {
		border-bottom: 1px solid rgba(18, 3, 3);
		box-shadow: 0 0.5rem 0.5rem #000;
	}
	@media (min-width: 480px) {
		.dir-lf .project-info-in {
			border-left: 1px solid rgba(18, 3, 3);
			border-bottom: none;
			box-shadow: -0.5rem 0 0.5rem #000;
		}
	}
	.dir-rl {
		flex-direction: column;
	}
	@media (min-width: 480px) {
		.dir-rl {
			flex-direction: row-reverse;
		}
	}
	.dir-rl .project-info-in {
		text-align: right;
		border-bottom: 1px solid rgba(18, 3, 3);
		box-shadow: 0 0.5rem 0.5rem #000;
	}
	@media (min-width: 480px) {
		.dir-rl .project-info-in {
			border-right: 1px solid rgba(18, 3, 3);
			border-bottom: none;
			box-shadow: 0.5rem 0 0.5rem #000;
		}
	}
	.dir-rl .project-info-in .tags {
		width: 100%;
		justify-content: flex-end;
	}
	.bg-default {
		background-color: #000;
	}
	.btn-fullscreen {
		background-color: var(--color-complement);
		color: black;
		position: absolute;
		z-index: 3;
		top: 1rem;
		right: 1rem;
	}
</style>
