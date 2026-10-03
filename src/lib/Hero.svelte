<script>
	import { onMount } from 'svelte';
	import { createNucleus } from './nucleus.js';
	import Arrow from './Arrow.svelte';
	import { currentTheme, setTheme, syncThemeColor, watchSystemTheme } from './theme.js';
	let { lang = 'es' } = $props();
	let canvas,
		headline,
		engine,
		playing = $state(false),
		reduced = $state(false),
		menu = $state(false),
		theme = $state('light');
	const en = $derived(lang === 'en');
	const nav = $derived(
		en
			? ['Projects', 'Experience', 'About', 'Contact']
			: ['Proyectos', 'Trayectoria', 'Sobre mí', 'Contacto']
	);
	const ids = ['proyectos', 'trayectoria', 'sobre-mi', 'contacto'];
	onMount(() => {
		theme = currentTheme();
		syncThemeColor();
		const themed = (e) => (theme = e.detail);
		addEventListener('themechange', themed);
		const unwatch = watchSystemTheme();
		// The phone hero fills what is left of the first screen under the header, so the control is in the first view
		const bar = document.querySelector('.site-header');
		const measure = () =>
			bar && document.documentElement.style.setProperty('--header-h', bar.offsetHeight + 'px');
		measure();
		addEventListener('resize', measure);
		let disposed = false,
			removeListener = () => {};
		(async () => {
			await document.fonts.ready;
			if (disposed || !canvas) return;
			const media = matchMedia('(prefers-reduced-motion: reduce)');
			reduced = media.matches;
			const listener = () => {
				reduced = media.matches;
			};
			media.addEventListener('change', listener);
			engine = createNucleus(canvas, headline, (value) => (playing = value), { lang });
			removeListener = () => media.removeEventListener('change', listener);
		})();
		return () => {
			disposed = true;
			engine?.destroy();
			removeListener();
			unwatch();
			removeEventListener('resize', measure);
			removeEventListener('themechange', themed);
		};
	});
</script>

<header class="site-header">
	<a class="wordmark" href={en ? '/en/' : '/'}>Felipe Uribe</a><span
		class="header-rule"
		aria-hidden="true"
	></span>
	<button
		class="menu-toggle"
		aria-expanded={menu}
		aria-controls="main-nav"
		onclick={() => (menu = !menu)}>{menu ? (en ? 'Close' : 'Cerrar') : en ? 'Menu' : 'Menú'}</button
	>
	<nav id="main-nav" class:open={menu} aria-label={en ? 'Main navigation' : 'Navegación principal'}>
		{#each nav as text, i (text)}<a href={'#' + ids[i]} onclick={() => (menu = false)}>{text}</a
			>{/each}
	</nav>
	<nav class="languages" aria-label={en ? 'Language' : 'Idioma'}>
		<a href="/" lang="es" hreflang="es" aria-current={!en ? 'page' : undefined}>ES</a><a
			href="/en/"
			lang="en"
			hreflang="en"
			aria-current={en ? 'page' : undefined}>EN</a
		>
	</nav>
	<button
		type="button"
		class="theme-toggle"
		aria-pressed={theme === 'dark'}
		aria-label={en ? 'Dark mode' : 'Modo oscuro'}
		onclick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		><svg viewBox="0 0 20 20" aria-hidden="true"
			><circle cx="10" cy="10" r="8.5" /><path d="M10 1.5a8.5 8.5 0 0 1 0 17z" /></svg
		></button
	>
</header>
<section class="hero" aria-labelledby="hero-title">
	<canvas bind:this={canvas} class="nucleus" aria-hidden="true"></canvas>
	<div class="hero-copy">
		<h1 id="hero-title" tabindex="-1" bind:this={headline}>
			<span data-line>{en ? 'FROM DESIGN' : 'DEL DISEÑO'}</span><span data-line
				>{en ? 'TO SYSTEM.' : 'AL SISTEMA.'}</span
			>
		</h1>
		<p>
			{en ? 'I connect interface design ' : 'Conecto el diseño de interfaces '}<br
				class="desktop-break"
			/>{en ? 'with building web products.' : 'con la construcción de productos web.'}
		</p>
		<div class="hero-actions">
			<a class="button primary" href="#proyectos"
				>{en ? 'View projects' : 'Ver proyectos'}<Arrow /></a
			><a class="button secondary" href="#contacto">{en ? 'Contact' : 'Contacto'}<Arrow /></a>
		</div>
	</div>
	<div class="motion-controls">
		<button disabled={reduced} onclick={() => (playing ? engine?.skip() : engine?.replay())}
			><Arrow replay={!playing} /><span class="label"
				>{playing
					? en
						? 'Skip animation'
						: 'Saltar animación'
					: reduced
						? en
							? 'Motion disabled'
							: 'Movimiento desactivado'
						: en
							? 'Watch evolution'
							: 'Ver evolución'}</span
			></button
		>
	</div>
</section>
<section class="featured" aria-labelledby="featured-title">
	<div class="featured-heading">
		<h2 id="featured-title">{en ? 'Featured projects' : 'Proyectos destacados'}</h2>
		<span aria-hidden="true"></span><a href="#proyectos">{en ? 'View all' : 'Ver todos'}<Arrow /></a
		>
	</div>
	<div class="featured-links">
		{#each [{ id: 'comodisimos', title: 'Comodísimos — Web', es: 'Experiencia web para una marca colombiana del hogar.', en: 'A web experience for a Colombian home furnishing brand.' }, { id: 'todo-artes', title: 'Todo en Artes', es: 'Sitio web para una tienda especializada en arte y cultura.', en: 'A website for a store specializing in art and culture.' }, { id: 'plane', title: 'Plane GTK', es: 'Tema de escritorio de código abierto para entornos Linux.', en: 'An open source desktop theme for Linux environments.' }] as project (project.id)}
			<a
				href={'#proyecto-' + project.id}
				onclick={() => {
					const target = document.getElementById('proyecto-' + project.id);
					if (target instanceof HTMLDetailsElement) target.open = true;
				}}
				><h3>{project.title}<Arrow /></h3>
				<p>{en ? project.en : project.es}</p></a
			>
		{/each}
	</div>
</section>
