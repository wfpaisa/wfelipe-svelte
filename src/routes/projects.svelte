<script lang="ts">
	import PortforlioItem from './portfolio-item.svelte';
	import ProjectItem from './project-item.svelte';
	import type { IPortfolioItem, IProject } from './types';

	const projects: IProject[] = [
		// --- Plane icons
		{
			name: 'Icon theme',
			position: 'dir-lf',
			description:
				'A simple and modern set of icons, designed in Inkscape in the sizes: 16px, 24px, 32px, 48px, 64p 96px, 128px, uses JavaScript to generate each file in different sizes.',
			links: [
				{
					link: 'https://github.com/wfpaisa/plane-icon-theme',
					target: '_blank',
					aria: 'repo plane theme link',
					icon: 'icon-logo-github'
				},
				{
					link: 'https://www.gnome-look.org/p/1178976/',
					target: '_blank',
					aria: 'open project in gnome-look',
					icon: 'icon-logo-tux'
				}
			],
			tags: ['Design', 'SVG', 'Javascript'],
			images: {
				small: {
					src: '/images/projects/icon-theme/icon-theme.webp',
					alt: 'plane icon theme',
					width: '1600',
					height: '1000'
				},
				fullscreen: {
					src: '/images/projects/icon-theme/icon-theme-full.webp',
					alt: 'plane icon theme',
					width: '1920',
					height: '8219'
				}
			}
		},
		// --- Plane theme
		{
			name: 'Plane GTK theme',
			position: 'dir-rl',
			description:
				'A beautiful dark theme for Gnome Linux with a modern and minimalistic design, making it easy the eyes and providing a sleek look for your desktop.',
			tags: ['CSS', 'SASS', 'Javascript', 'Svg', 'Design'],
			images: {
				small: {
					src: '/images/projects/plane-theme/plane-theme-s.webp',
					alt: 'plane theme',
					width: '1920',
					height: '1200'
				},
				fullscreen: {
					src: '/images/projects/plane-theme/plane-theme-fullscreen.webp',
					alt: 'plane theme',
					width: '1920',
					height: '5325'
				}
			},
			links: [
				{
					link: 'https://github.com/wfpaisa/plane-theme',
					target: '_blank',
					aria: 'repo plane theme link',
					icon: 'icon-logo-github'
				},
				{
					link: 'https://www.gnome-look.org/p/1198768/',
					target: '_blank',
					aria: 'open project in gnome-look',
					icon: 'icon-logo-tux'
				}
			]
		}
	];
</script>

<section id="projects">
	<div class="container">
		{#each projects as project, index}
			<ProjectItem {project} {index} />
		{/each}
	</div>
</section>

<style>
	#projects {
		margin-bottom: 0rem;
		padding: 8rem 2rem 15rem 2rem;
		position: relative;
		z-index: 1;

		&::before {
			content: '';
			position: absolute;
			z-index: -2;
			top: 0px;
			width: 100%;
			height: 90%;
			left: 0px;
			line-break: anywhere;
			background-color: oklch(48% 0.04 var(--hue) / 10%);
			transform: skew(0, 3deg);
		}

		& h1 {
			position: relative;
			margin-bottom: 6rem;
		}

		& .projects-list {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			padding: 7px 1px;
			gap: 1rem;
			flex-wrap: wrap;
		}
	}
</style>
