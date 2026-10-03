<script>
	import projectImages from './project-images.json';
	import { onMount, tick } from 'svelte';
	import { createField } from './field.js';
	import Hero from './Hero.svelte';
	import Arrow from './Arrow.svelte';
	import ProjectViewer from './ProjectViewer.svelte';
	import { projects, openSource, skills } from './content.js';
	import Experience from './Experience.svelte';
	let { lang = 'es' } = $props();
	const en = $derived(lang === 'en');
	let field;
	let openId = $state(null);
	onMount(() => {
		const engine = createField(field);
		const size = () => {
			const summary = document.querySelector('.project summary');
			if (summary)
				document.documentElement.style.setProperty('--summary-h', summary.offsetHeight + 1 + 'px');
		};
		size();
		addEventListener('resize', size);
		const stopGlide = ['wheel', 'touchstart', 'keydown'];
		stopGlide.forEach((type) => addEventListener(type, interrupt, { passive: true }));
		return () => {
			engine.destroy();
			removeEventListener('resize', size);
			stopGlide.forEach((type) => removeEventListener(type, interrupt));
		};
	});
	const summaryOf = (el) => (el?.matches('details.project') ? el.querySelector('summary') : null);
	const bodyOf = (id) => document.querySelector('#proyecto-' + id + ' .project-body');
	const FOLD = 480,
		GLIDE = 720;
	const ease = (t) => 1 - Math.pow(1 - t, 4);
	let closingId = $state(null);
	/** Screenshot or video, per project */
	let views = $state({});
	// The open project's summary is hidden once it has folded away; its body carries the name and a close button
	let expandedId = $state(null);
	let glide = 0,
		folds = [];
	/** Where the open project should rest: centered, with the neighbouring summaries in view above and below */
	function restingTop(details) {
		const prev = summaryOf(details.previousElementSibling),
			next = summaryOf(details.nextElementSibling);
		const above = prev ? prev.offsetHeight : 0,
			below = next ? next.offsetHeight : 0;
		const height = details.offsetHeight - details.querySelector('summary').offsetHeight;
		return above + Math.max(0, (innerHeight - above - below - height) / 2);
	}
	/** Animates an element's height (and vertical padding) between nothing and its natural size */
	function fold(el, closing, fade = closing) {
		const style = getComputedStyle(el),
			full = {
				height: el.offsetHeight + 'px',
				paddingTop: style.paddingTop,
				paddingBottom: style.paddingBottom
			},
			none = { height: '0px', paddingTop: '0px', paddingBottom: '0px' };
		if (fade) {
			full.opacity = 1;
			none.opacity = 0;
		}
		el.style.overflow = 'hidden';
		const animation = el.animate(closing ? [full, none] : [none, full], {
			duration: FOLD,
			easing: 'cubic-bezier(.45,0,.2,1)',
			fill: 'forwards'
		});
		folds.push(animation);
		return animation.finished.catch(() => {});
	}
	const release = (el) => {
		el.getAnimations().forEach((a) => a.cancel());
		el.style.overflow = '';
	};
	function settle() {
		cancelAnimationFrame(glide);
		for (const animation of folds) if (animation.playState === 'running') animation.finish();
		folds = [];
	}
	async function select(next, details) {
		settle();
		const previous = openId;
		if (previous === next) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			const before = details.getBoundingClientRect().top;
			openId = next;
			expandedId = next;
			await tick();
			// The summary is hidden at once, so focus moves to the close button that replaces it
			if (next) details.querySelector('.project-close')?.focus({ preventScroll: true });
			scrollTo({
				top: scrollY + details.getBoundingClientRect().top - (next ? restingTop(details) : before),
				behavior: 'instant'
			});
			return;
		}
		// The previous project stays open while it folds and its summary comes back, then closes for real
		if (previous) closingId = previous;
		expandedId = null;
		openId = next;
		await tick();
		const target = next ? restingTop(details) : 0;
		if (previous) {
			const body = bodyOf(previous),
				summary = document.querySelector('#proyecto-' + previous + ' summary');
			fold(summary, false);
			fold(body, true).then(async () => {
				if (closingId !== previous) return;
				closingId = null;
				await tick();
				release(body);
				release(summary);
			});
		}
		if (!next) return;
		const summary = details.querySelector('summary'),
			body = bodyOf(next);
		fold(summary, true);
		fold(body, false).then(async () => {
			if (openId !== next) return;
			expandedId = next;
			await tick();
			release(summary);
			release(body);
		});
		details.querySelector('.project-close')?.focus({ preventScroll: true });
		// Glide the project to its resting place while everything folds, frame by frame, so nothing jumps
		const from = details.getBoundingClientRect().top,
			start = performance.now();
		const step = (now) => {
			const t = Math.min(1, (now - start) / GLIDE);
			scrollTo({
				top: scrollY + details.getBoundingClientRect().top - (from + (target - from) * ease(t)),
				behavior: 'instant'
			});
			if (t < 1) glide = requestAnimationFrame(step);
		};
		glide = requestAnimationFrame(step);
	}
	function toggle(e, id) {
		e.preventDefault();
		select(openId === id ? null : id, e.currentTarget.parentElement);
	}
	// The close button folds away with the body; focus returns to the summary that comes back
	async function close(e) {
		const details = e.currentTarget.closest('details');
		await select(null, details);
		details.querySelector('summary')?.focus({ preventScroll: true });
	}
	const interrupt = () => cancelAnimationFrame(glide);
	function sync(e, id) {
		if (e.currentTarget.open) {
			if (closingId !== id && openId !== id) {
				openId = id;
				expandedId = id;
			}
		} else if (openId === id) openId = null;
	}
	const description = $derived(
		en
			? 'Interface design and frontend development. Explore Felipe Uribe’s web projects, experience, and open source work.'
			: 'Diseño de interfaces y desarrollo frontend. Explora los proyectos web, la trayectoria y el trabajo de código abierto de Felipe Uribe.'
	);
</script>

<svelte:head>
	<title
		>{en
			? 'Felipe Uribe — Design, code and systems'
			: 'Felipe Uribe — Diseño, código y sistemas'}</title
	>
	<meta name="description" content={description} /><meta
		name="theme-color"
		content="oklch(0.978 0.011 286)"
	/>
	<link rel="canonical" href={'https://wfelipe.com/' + (en ? 'en/' : '')} />
	<link rel="alternate" hreflang="es" href="https://wfelipe.com/" /><link
		rel="alternate"
		hreflang="en"
		href="https://wfelipe.com/en/"
	/><link rel="alternate" hreflang="x-default" href="https://wfelipe.com/" />
	<meta
		property="og:title"
		content={en
			? 'Felipe Uribe — Design, code and systems'
			: 'Felipe Uribe — Diseño, código y sistemas'}
	/><meta property="og:description" content={description} /><meta
		property="og:type"
		content="website"
	/><meta property="og:url" content={'https://wfelipe.com/' + (en ? 'en/' : '')} /><meta
		property="og:locale"
		content={en ? 'en_US' : 'es_CO'}
	/>
</svelte:head>
<a class="skip-link" href="#hero-title">{en ? 'Skip to content' : 'Saltar al contenido'}</a>
<canvas bind:this={field} class="page-field" aria-hidden="true"></canvas>
<main>
	<Hero {lang} />
	<section id="proyectos" class="work section-shell" aria-labelledby="work-title">
		<div class="section-intro">
			<h2 id="work-title">{en ? 'Ideas made real.' : 'Ideas que se construyen.'}</h2>
			<p>
				{en
					? 'A selection of web interfaces and products. Open a project to explore its design and technologies.'
					: 'Una selección de interfaces y productos web. Abre un proyecto para explorar su diseño y sus tecnologías.'}
			</p>
		</div>
		<div class="project-list">
			{#each projects as project (project.id)}
				<details
					class="project"
					class:closing={closingId === project.id}
					class:expanded={expandedId === project.id}
					id={'proyecto-' + project.id}
					open={openId === project.id || closingId === project.id}
					ontoggle={(e) => sync(e, project.id)}
				>
					<summary onclick={(e) => toggle(e, project.id)}
						><span class="project-name">{project.name}</span><span class="project-stack"
							>{project.tags.slice(0, 3).join(' / ')}</span
						><span class="expand-icon" aria-hidden="true"></span></summary
					>
					<div class="project-body">
						<button
							type="button"
							class="project-close"
							aria-label={(en ? 'Close ' : 'Cerrar ') + project.name}
							onclick={close}
							><span aria-hidden="true">{en ? 'Close' : 'Cerrar'}</span><span
								class="expand-icon"
								aria-hidden="true"
							></span></button
						>
						<div class="project-notes">
							<h3>{project.name}</h3>
							<p class="project-site">{en ? project.site.en : project.site.es}</p>
							{#if project.es}<p>{en ? project.en : project.es}</p>{/if}
							<ul class="tags" aria-label={en ? 'Technologies' : 'Tecnologías'}>
								{#each project.tags as tag (tag)}<li>
										{tag === 'Diseño / Design' ? (en ? 'Design' : 'Diseño') : tag}
									</li>{/each}
							</ul>
							{#if project.video}<div
									class="view-switch"
									role="group"
									aria-label={en ? 'View' : 'Vista'}
								>
									<button
										type="button"
										aria-pressed={views[project.id] !== 'video'}
										onclick={() => (views[project.id] = 'site')}
										>{en ? 'Screenshot' : 'Captura'}</button
									><button
										type="button"
										aria-pressed={views[project.id] === 'video'}
										onclick={() => (views[project.id] = 'video')}>Video</button
									>
								</div>{/if}
						</div>
						<ProjectViewer
							id={project.id}
							name={project.name}
							image={projectImages[project.id]}
							video={project.video}
							view={views[project.id] ?? 'site'}
							active={openId === project.id || closingId === project.id}
							{en}
						/>
					</div>
				</details>
			{/each}
		</div>
	</section>
	<section id="trayectoria" class="experience section-shell" aria-labelledby="experience-title">
		<div class="section-intro">
			<h2 id="experience-title">
				{en ? 'Design and code.\nIn retrospect.' : 'Diseño y código.\nEn retrospectiva.'}
			</h2>
			<p>
				{en
					? 'Since 2006 I have worked across interface design and frontend development, in agencies, in-house teams, and on my own, taking web projects from the first sketch to production.'
					: 'Desde 2006 trabajo entre el diseño de interfaces y el desarrollo frontend, en agencias, en empresas y por mi cuenta, llevando proyectos web desde el primer boceto hasta producción.'}
			</p>
		</div>
		<Experience {en} />
	</section>
	<section id="sobre-mi" class="about section-shell" aria-labelledby="about-title">
		<div class="about-photo">
			<img
				src="/felipe-uribe.jpg"
				alt="Felipe Uribe"
				width="341"
				height="341"
				loading="lazy"
				decoding="async"
			/>
		</div>
		<div class="about-content">
			<h2 id="about-title">
				{en ? 'Curiosity is\nmy starting point.' : 'La curiosidad\nes el punto de partida.'}
			</h2>
			<p>
				{en
					? 'I have been building websites since 2006. I care about interfaces and user experience, and I build web applications with JavaScript technologies.'
					: 'Desde 2006 creo sitios web. Cuido las interfaces y la experiencia de usuario, y construyo aplicaciones web con tecnologías JavaScript.'}
			</p>
			<p>
				{en
					? 'I have always wanted to understand how things work. That curiosity led me to computers, Linux, and free software. Learning, adapting, building, and improving are still what I enjoy most.'
					: 'Siempre he querido entender cómo funcionan las cosas. Esa curiosidad me llevó a los computadores, Linux y el software libre. Aprender, adaptar, construir y mejorar sigue siendo lo que más disfruto.'}
			</p>
			<p>
				{en
					? 'I am curious, punctual, and dedicated, and that has helped me meet every challenge I have taken on. I keep learning, in computing and in any field where creativity and curiosity matter.'
					: 'Soy curioso, puntual y dedicado, y eso me ha permitido sacar adelante cada reto que me he propuesto. Sigo aprendiendo, en la informática y en cualquier campo donde la creatividad y la curiosidad importan.'}
			</p>
			<p>
				{en
					? 'My next step is to bring that perspective to frontend architecture and direction: clear interfaces, solid code, and the details that make a website easy to use.'
					: 'Mi siguiente paso es aportar esa perspectiva a la arquitectura y la dirección frontend: interfaces claras, código sólido y los detalles que facilitan el uso de un sitio.'}
			</p>
			<h3>{en ? 'Tools I work with' : 'Herramientas con las que trabajo'}</h3>
			<ul class="skills">
				{#each skills as skill (skill)}<li>{skill}</li>{/each}
			</ul>
		</div>
	</section>
	<section class="open-source section-shell" aria-labelledby="open-title">
		<div class="section-intro">
			<h2 id="open-title">{en ? 'Built to share.' : 'Crear para compartir.'}</h2>
			<p>
				{en
					? 'Outside my day-to-day work, I explore tools and design themes and icons for Linux.'
					: 'Fuera del trabajo diario exploro herramientas y diseño temas e iconos para Linux.'}
			</p>
		</div>
		{#each openSource as project (project.id)}<details
				class="project"
				class:closing={closingId === project.id}
				class:expanded={expandedId === project.id}
				id={'proyecto-' + project.id}
				open={openId === project.id || closingId === project.id}
				ontoggle={(e) => sync(e, project.id)}
			>
				<summary onclick={(e) => toggle(e, project.id)}
					><span class="project-name">{project.name}</span><span class="project-stack"
						>{en ? 'Open source' : 'Código abierto'}</span
					><span class="expand-icon" aria-hidden="true"></span></summary
				>
				<div class="project-body">
					<button
						type="button"
						class="project-close"
						aria-label={(en ? 'Close ' : 'Cerrar ') + project.name}
						onclick={close}
						><span aria-hidden="true">{en ? 'Close' : 'Cerrar'}</span><span
							class="expand-icon"
							aria-hidden="true"
						></span></button
					>
					<div class="project-notes">
						<h3>{project.name}</h3>
						<p>{en ? project.en : project.es}</p>
						<ul class="tags">
							{#each project.tags as tag (tag)}<li>{tag}</li>{/each}
						</ul>
						<a class="text-link" href={project.repo} target="_blank" rel="noopener"
							>{en ? 'Explore repository' : 'Explorar repositorio'}<Arrow /></a
						>{#if project.download}<a
								class="text-link"
								href={project.download}
								target="_blank"
								rel="noopener">GNOME-Look<Arrow /></a
							>{/if}
					</div>
					<ProjectViewer
						id={project.id}
						name={project.name}
						image={projectImages[project.id]}
						view="site"
						active={openId === project.id || closingId === project.id}
						{en}
					/>
				</div>
			</details>{/each}
	</section>
	<section id="contacto" class="contact section-shell" aria-labelledby="contact-title">
		<h2 id="contact-title">
			{en ? 'Let’s build\nwhat comes next.' : 'Construyamos\nlo que sigue.'}
		</h2>
		<div class="contact-content">
			<p>
				{en
					? 'Interested in working together or talking about a frontend opportunity? Let’s connect.'
					: '¿Quieres que trabajemos juntos o conversemos sobre una oportunidad frontend? Hablemos.'}
			</p>
			<a class="email" href="mailto:hi@wfelipe.com">hi@wfelipe.com<Arrow /></a>
			<nav class="socials" aria-label={en ? 'Professional profiles' : 'Perfiles profesionales'}>
				<a href="https://github.com/wfpaisa/" target="_blank" rel="noopener">GitHub<Arrow /></a><a
					href="https://www.linkedin.com/in/felipe-uribe"
					target="_blank"
					rel="noopener">LinkedIn<Arrow /></a
				><a href="https://www.opendesktop.org/u/wfpaisa" target="_blank" rel="noopener"
					>OpenDesktop<Arrow /></a
				>
			</nav>
		</div>
	</section>
</main>
<footer class="footer">
	<a href={en ? '/en/' : '/'}>Felipe Uribe</a><span
		>{en ? 'Design · Code · Systems' : 'Diseño · Código · Sistemas'}</span
	><a href="#hero-title">{en ? 'Back to top' : 'Volver al inicio'}<Arrow /></a>
</footer>
