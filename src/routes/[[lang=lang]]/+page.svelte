<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { getI18n, localePath, locales } from '$lib/i18n';
	import { scrollTimelineFallback } from '$lib/scroll-timeline';
	import ProjectReader from '$lib/project-reader/ProjectReader.svelte';
	import About from '../about.svelte';
	import Contact from '../contact.svelte';
	import Hero from '../hero.svelte';
	import Portfolio from '../portfolio.svelte';
	import Projects from '../projects.svelte';
	import Work from '../work.svelte';

	const i18n = getI18n();
	const site = 'https://wfelipe.com';

	// Scroll animations for browsers without `animation-timeline`; rescans after a language change
	let stopScrollFallback = () => {};
	afterNavigate(() => {
		stopScrollFallback();
		stopScrollFallback = scrollTimelineFallback();
	});
	$effect(() => () => stopScrollFallback());
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

<Work />

<Portfolio />

<Projects />

<Contact />

<ProjectReader />
