<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import type { ReaderItem } from '$lib/project-reader/reader';
	import Prompt from '$lib/log/Prompt.svelte';
	import ProjectItem from './project-item.svelte';
	import type { IProject } from './types';

	const i18n = getI18n();

	const projects: IProject[] = $derived([
		// --- Plane icons
		{
			name: 'Icon theme',
			position: 'dir-lf',
			description: i18n.t.projects.iconTheme,
			links: [
				{
					link: 'https://github.com/wfpaisa/plane-icon-theme',
					target: '_blank',
					aria: i18n.t.projects.github('Icon theme'),
					icon: 'icon-logo-github'
				},
				{
					link: 'https://www.gnome-look.org/p/1178976/',
					target: '_blank',
					aria: i18n.t.projects.gnomeLook('Icon theme'),
					icon: 'icon-logo-tux'
				}
			],
			tags: ['Design', 'SVG', 'JavaScript'],
			images: {
				small: {
					src: '/images/projects/icon-theme/icon-theme.webp',
					alt: 'plane icon theme',
					width: '1600',
					height: '1000'
				},
				strip: '/images/projects/icon-theme/icon-theme-full-strip.webp',
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
			description: i18n.t.projects.planeTheme,
			tags: ['CSS', 'Sass', 'JavaScript', 'SVG', 'Design'],
			images: {
				small: {
					src: '/images/projects/plane-theme/plane-theme-s.webp',
					alt: 'plane theme',
					width: '1920',
					height: '1200'
				},
				strip: '/images/projects/plane-theme/plane-theme-fullscreen-strip.webp',
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
					aria: i18n.t.projects.github('Plane GTK theme'),
					icon: 'icon-logo-github'
				},
				{
					link: 'https://www.gnome-look.org/p/1198768/',
					target: '_blank',
					aria: i18n.t.projects.gnomeLook('Plane GTK theme'),
					icon: 'icon-logo-tux'
				}
			]
		}
	]);

	const readerItems: ReaderItem[] = $derived(
		projects.map((project) => ({
			name: project.name,
			tags: project.tags,
			full: {
				src: project.images.fullscreen.src,
				width: Number(project.images.fullscreen.width),
				height: Number(project.images.fullscreen.height)
			},
			strip: project.images.strip,
			description: project.description,
			links: project.links
		}))
	);
</script>

<section id="projects">
	<div class="col">
		<Prompt path="~" cmd="ls open-source/" />

		<p class="total ln" aria-hidden="true">total {projects.length}</p>

		{#each projects as project, index (project.name)}
			<ProjectItem {project} items={readerItems} {index} />
		{/each}
	</div>
</section>

<style>
	#projects {
		padding: 5rem 0 3rem;
	}

	.total {
		margin: 0 0 2rem;
		font-size: var(--font-size-sm);
		color: var(--color-text-dim);
	}
</style>
