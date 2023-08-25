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
		width: 100%;
		height: 300px;
		background-size: 6rem 6rem;
		background-image: radial-gradient(circle, var(--bg-2) var(--dot-size), transparent 0);
		background-position: center 0;
	}
</style>
