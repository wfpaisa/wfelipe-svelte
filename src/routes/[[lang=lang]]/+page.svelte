<script lang="ts">
	import { getI18n, localePath, locales } from '$lib/i18n';
	import ProjectReader from '$lib/project-reader/ProjectReader.svelte';
	import About from '../about.svelte';
	import Hero from '../hero.svelte';
	import Portfolio from '../portfolio.svelte';
	import Projects from '../projects.svelte';
	import Work from '../work.svelte';

	const i18n = getI18n();
	const site = 'https://wfelipe.com';
</script>

<svelte:head>
	<title>{i18n.t.meta.title}</title>
	<meta name="description" content={i18n.t.meta.description} />
	{#each locales as locale (locale)}
		<link rel="alternate" hreflang={locale} href="{site}{localePath(locale)}" />
	{/each}
	<link rel="alternate" hreflang="x-default" href="{site}/" />
</svelte:head>

<Hero />

<About />

<div class="dots"></div>

<Work />

<div class="dots"></div>

<Portfolio />

<Projects />

<ProjectReader />

<style>
	.dots {
		position: relative;
		display: block;
		width: 100%;
		height: 300px;
		background-size: var(--dot-container) var(--dot-container);

		--dot-color: oklch(26% 0.04 var(--hue));
		background-image: radial-gradient(circle, var(--dot-color) var(--dot-size), transparent 0);
		background-position: center 0;

		animation-name: zoomAnimation;
		animation-duration: 1ms;
		animation: zoomAnimation linear both;
		animation-timeline: view(block);
		animation-range: cover 30 cover 70;

		@media (prefers-color-scheme: light) {
			background-color: black;
		}
	}

	@keyframes zoomAnimation {
		0% {
			background-size: var(--dot-container) var(--dot-container);
			background-position: center 0px;
		}
		100% {
			background-size: 4rem 4rem;
			background-position: center 4rem;
		}
	}
</style>
