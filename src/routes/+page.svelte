<script lang="ts">
	import About from './about.svelte';
	import Hero from './hero.svelte';
	import Portfolio from './portfolio.svelte';
	import Projects from './projects.svelte';
	import Work from './work.svelte';
</script>

<svelte:head>
	<title>Felipe Uribe - Portfolio</title>
	<meta name="description" content="Felipe Uribe - Portfolio" />
</svelte:head>

<Hero />

<About />

<Work />

<div class="dots" />

<Portfolio />

<Projects />

<style>
	.dots {
		position: relative;
		display: block;
		width: 100%;
		height: 300px;
		background-size: 6rem 6rem;
		background-image: radial-gradient(circle, var(--bg-2) var(--dot-size), transparent 0);
		background-position: center 0;

		animation-name: zoomAnimation;
		animation-duration: 1ms;
		/* animation-direction: alternate; */
		/* animation-timeline: scroll(block root); */
		/* animation-range: 0 300px; */
		/* background-color: var(--color-4); */

		animation: zoomAnimation linear both;
		animation-timeline: view(block);
		animation-range: cover 30 cover 70;
	}

	@keyframes zoomAnimation {
		0% {
			background-size: 6rem 6rem;
			background-position: center 0px;
		}
		100% {
			background-size: 4rem 4rem;
			background-position: center 4rem;
		}
	}
</style>
