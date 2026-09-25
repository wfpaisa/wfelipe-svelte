<script lang="ts">
	import { getI18n, localePath } from '$lib/i18n';
	import LanguageSwitcher from './language-switcher.svelte';

	const i18n = getI18n();

	const linksList = $derived([
		{ title: i18n.t.nav.about, link: '#about' },
		{ title: i18n.t.nav.work, link: '#work' },
		{ title: i18n.t.nav.projects, link: '#portfolio' }
	]);

	const socials = $derived([
		{ href: 'https://github.com/wfpaisa/', label: i18n.t.social.github, icon: 'icon-logo-github' },
		{
			href: 'https://www.linkedin.com/in/felipe-uribe',
			label: i18n.t.social.linkedin,
			icon: 'icon-logo-linkedin'
		},
		{
			href: 'https://www.opendesktop.org/u/wfpaisa',
			label: i18n.t.social.opendesktop,
			icon: 'icon-logo-tux'
		}
	]);

	/** Working directory shown in the statusline for each section */
	const paths: Record<string, string> = {
		intro: '~',
		about: '~/about',
		work: '~/experience',
		portfolio: '~/projects',
		projects: '~/open-source',
		contact: '~/contact'
	};

	let current = $state('intro');
	let read = $state(0);

	$effect(() => {
		const sections = document.querySelectorAll<HTMLElement>('main section[id]');
		// The section crossing the middle of the viewport is the working directory
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) current = entry.target.id;
				}
			},
			{ rootMargin: '-50% 0px -50% 0px' }
		);
		sections.forEach((section) => observer.observe(section));

		let frame = 0;
		const measure = () => {
			frame = 0;
			const max = document.documentElement.scrollHeight - innerHeight;
			read = max > 0 ? Math.round(Math.min(1, scrollY / max) * 100) : 0;
		};
		const onscroll = () => {
			frame ||= requestAnimationFrame(measure);
		};
		measure();
		addEventListener('scroll', onscroll, { passive: true });
		addEventListener('resize', onscroll, { passive: true });

		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
			removeEventListener('scroll', onscroll);
			removeEventListener('resize', onscroll);
		};
	});

	const goHome = (e: MouseEvent) => {
		e.preventDefault();

		// Follows the html `scroll-behavior`: smooth, or instant with reduced motion
		window.scrollTo({ top: 0 });
	};
</script>

<header class="status">
	<div class="start">
		<a
			href={localePath(i18n.locale)}
			class="icon-logo"
			title={i18n.t.nav.home}
			aria-label={i18n.t.nav.home}
			onclick={goHome}
		>
			<span class="path1"></span>
			<span class="path2"></span>
		</a>

		<LanguageSwitcher />

		<span class="cwd" aria-hidden="true">
			felipe@wfelipe:<b>{paths[current] ?? '~'}</b>$
		</span>
	</div>

	<nav>
		<!-- eslint-disable svelte/no-useless-mustaches -- explicit trailing space keeps the original link width (Svelte 5 trims whitespace) -->
		[{#each linksList as link, index (link.link)}<a
				href={link.link}
				aria-label={i18n.t.nav.goTo(link.title)}
				aria-current={paths[current]?.startsWith(paths[link.link.slice(1)])
					? 'location'
					: undefined}
				><span class="num">0{index + 1}.</span><span class="label"> {link.title}</span>{' '}</a
			>{/each}]
		<!-- eslint-enable svelte/no-useless-mustaches -->
	</nav>

	<div class="end">
		<ul class="socials">
			{#each socials as social (social.href)}
				<li>
					<a
						href={social.href}
						target="_blank"
						rel="noopener"
						aria-label={social.label}
						title={social.label}
					>
						<i class={social.icon} aria-hidden="true"></i>
					</a>
				</li>
			{/each}
		</ul>

		<span class="read" aria-hidden="true">{String(read).padStart(3, ' ')}%</span>
	</div>

	<span class="progress" data-scroll="root" aria-hidden="true"></span>
</header>

<style>
	.status {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		right: 0;
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto auto;
		align-items: center;
		column-gap: 1rem;
		min-height: var(--layout-header);
		padding: 0 var(--pad);
		font-size: var(--font-size-sm);
		background-color: color-mix(in oklch, var(--color-bg-base) 82%, transparent);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--border-color-1);
	}

	.start,
	.end {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-width: 0;
	}

	.icon-logo {
		display: inline-flex;
		position: relative;
		font-size: 1.75rem;
		color: var(--color-text-highlight);
		cursor: pointer;
	}

	.icon-logo:hover {
		transform: scale(1.12);
	}

	.cwd {
		display: none;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: var(--color-text-dim);
		font-weight: 300;
	}

	.cwd b {
		font-weight: 300;
		color: var(--color-text-highlight);
	}

	nav {
		white-space: nowrap;
		color: var(--color-text-dim);
	}

	nav a {
		position: relative;
		padding: 0.25rem 0.25rem;
		color: var(--color-text);
		font-weight: 300;
	}

	nav a::after {
		content: ',';
		color: var(--color-text-dim);
	}

	nav a:last-child::after {
		display: none;
	}

	@media (max-width: 559px) {
		nav a::after {
			content: none;
		}
	}

	nav a::before {
		content: '';
		position: absolute;
		z-index: -1;
		left: 0;
		bottom: 0;
		width: 0;
		height: 100%;
		border-radius: var(--border-radius-sm);
		background-color: oklch(72% 0.25 var(--hue) / 12%);
		transition: var(--transition);
	}

	nav a:hover {
		color: var(--color-text-highlight);
	}

	nav a:hover::before,
	nav a[aria-current]::before {
		width: 100%;
	}

	.num {
		color: var(--color-text-highlight);
	}

	.label {
		display: none;
	}

	.socials {
		display: none;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 1.125rem;
	}

	.socials a {
		display: inline-flex;
		padding: 0.375rem;
		color: var(--color-text-dim);
	}

	.socials a:hover {
		color: var(--color-text-highlight);
	}

	.read {
		min-width: 4ch;
		text-align: right;
		white-space: pre;
		font-variant-numeric: tabular-nums;
		color: var(--color-text-dim);
	}

	/* Scroll progress: cyan is reserved for "where you are" */
	.progress {
		position: absolute;
		left: 0;
		right: 0;
		bottom: -1px;
		height: 1px;
		background-color: var(--neon-cyan);
		transform-origin: left;
		transform: scaleX(0);

		animation: read-progress 1ms linear both;
		animation-timeline: scroll(block root);
		--scroll-range: 0% 100%;
		animation-range: var(--scroll-range);
	}

	@keyframes read-progress {
		to {
			transform: scaleX(1);
		}
	}

	@media (min-width: 560px) {
		.label {
			display: inline;
		}
	}

	@media (min-width: 900px) {
		.socials {
			display: flex;
		}
	}

	@media (min-width: 1100px) {
		.cwd {
			display: inline;
		}
	}

	@media (prefers-color-scheme: light) {
		.status {
			background-color: color-mix(in oklch, var(--color-bg-base) 70%, transparent);
		}
	}
</style>
