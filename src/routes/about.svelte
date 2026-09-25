<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import Prompt from '$lib/log/Prompt.svelte';
	import ImgMe from '$lib/images/me.jpg';

	const i18n = getI18n();

	const stack = [
		'CSS/Sass',
		'JavaScript/Node.js',
		'Vue/React/Angular',
		'Strapi',
		'HTML',
		'Linux/Docker',
		'Inkscape/Figma/SVG',
		'UX/UI',
		'PostgreSQL/InfluxDB'
	];
</script>

<section id="about">
	<div class="col">
		<Prompt path="~" cmd="cat about.md" />

		<div class="grid">
			<div class="text">
				<h2 class="ln scroll-view sv-grow-up" data-scroll>
					<span class="number">01.</span>
					{i18n.t.about.title}
				</h2>

				<p class="body ln scroll-view sv-grow-up" data-scroll>{i18n.t.about.body}</p>

				<p class="ln scroll-view sv-grow-up" data-scroll>{i18n.t.about.stack}</p>

				<!-- `ls` output: plain columns, the way the shell prints a directory -->
				<ul class="stack ln scroll-view sv-grow-up" data-scroll>
					{#each stack as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>

			<figure class="me scroll-view" data-scroll>
				<div class="frame">
					<img src={ImgMe} alt="Felipe Uribe" height="341" width="341" />
				</div>
				<figcaption aria-hidden="true">me.jpg <span>341 × 341</span></figcaption>
			</figure>
		</div>
	</div>
</section>

<style>
	#about {
		padding: clamp(5rem, 10vw, 9rem) 0 clamp(4rem, 8vw, 7rem);
	}

	.grid {
		display: grid;
		gap: 3rem;
	}

	@media (min-width: 820px) {
		.grid {
			grid-template-columns: minmax(0, 1fr) 17rem;
			column-gap: 4rem;
			align-items: start;
		}
	}

	h2 {
		margin: 0 0 2.5rem;
	}

	h2.ln::before {
		top: 0.6em;
	}

	p {
		max-width: 62ch;
		margin: 0 0 1.5rem;
		line-height: var(--font-lineheight-lg);
	}

	.body {
		font-family: var(--font-family-title);
		font-size: var(--font-size-md);
		font-weight: 100;
		line-height: 1.45;
		margin-bottom: 2.5rem;
	}

	.stack {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(13.5rem, 1fr));
		gap: 0.375rem 1.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--font-size-sm);
		color: var(--color-text-highlight);
	}

	/* Photo: a duotone that turns to color on hover */
	.me {
		margin: 0;
		animation-name: sv-fade-in-right;
	}

	.frame {
		position: relative;
		border-radius: var(--border-radius-base);
		overflow: hidden;
		background-color: oklch(48% 0.2 var(--hue));
		box-shadow: 0 0 0 1px var(--border-color-1);
	}

	.frame img {
		display: block;
		width: 100%;
		height: auto;
		filter: grayscale(100%);
		mix-blend-mode: multiply;
		opacity: 0.85;
		transition:
			filter 0.5s var(--ease-out),
			opacity 0.5s var(--ease-out);
	}

	.me:hover img {
		filter: grayscale(0%);
		mix-blend-mode: normal;
		opacity: 1;
	}

	figcaption {
		display: flex;
		justify-content: space-between;
		margin-top: 0.625rem;
		font-size: 0.75rem;
		color: var(--color-text-dim);
		font-variant-numeric: tabular-nums;
	}

	figcaption span {
		color: var(--color-gutter);
	}

	@media (max-width: 819px) {
		.me {
			max-width: 14rem;
		}
	}

	@keyframes sv-fade-in-right {
		from {
			opacity: 0;
			transform: translateX(2rem) scale(0.96);
		}

		to {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
	}
</style>
