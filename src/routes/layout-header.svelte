<script lang="ts">
	import { page } from '$app/stores';

	const linksList = [
		{
			title: 'About',
			caption: 'Felipe Uribe',
			icon: 'sym_r_fingerprint',
			link: '#about'
		},

		{
			title: 'Work',
			caption: 'My history',
			icon: 'sym_r_business_center',
			link: '#work'
		},

		{
			title: 'Projects',
			caption: 'All projects',
			icon: 'sym_r_code_blocks',
			link: '#portfolio',
			external: false
		}
	];

	const goHome = (e: MouseEvent) => {
		e.preventDefault();

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
</script>

<header>
	<div class="logo">
		<a href="/" class="icon-logo" title="Change color" on:click={goHome}>
			<span class="path1" />
			<span class="path2" />
		</a>
	</div>

	<nav>
		[{#each linksList as link, index}
			<a href={link.link} aria-label="link to section ${link.title}">
				<span>0{index + 1}.</span>
				{link.title}
			</a>{/each}]
	</nav>
</header>

<style>
	header {
		grid-area: header;
		position: fixed;
		z-index: 10;
		top: 0px;
		backdrop-filter: blur(8px);
		min-height: var(--layout-header);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		column-gap: 1rem;
		width: 100vw;

		@media (prefers-color-scheme: light) {
			background-color: rgba(255, 255, 255, 0.4);
		}
	}

	.logo {
		display: inline-block;
	}

	.logo .icon-logo {
		font-size: 2rem;
		transition: var(--transition);
		color: var(--color-text-highlight);
		cursor: pointer;
		display: inline-flex;
		position: relative;
	}

	.logo .icon-logo:hover {
		transform: scale(1.2);
	}

	nav {
		text-align: right;
	}

	nav a {
		border-bottom: 1px solid transparent;
		color: var(--color-text);
		display: inline-block;
		font-size: var(--font-size-sm);
		font-weight: 300;
		padding: 0rem 0.25rem;
		text-decoration: none;
		transition: all 0.2s ease-in-out;
		position: relative;
	}

	@media (min-width: 768px) {
		nav a {
			padding: 0.25rem 0.5rem;
		}
	}

	nav a:hover {
		color: var(--color-text-highlight);
	}

	nav a::after {
		content: ',';
	}

	nav a:last-child::after {
		display: none;
	}

	nav a::before {
		content: '';
		display: block;
		width: 0px;
		height: 100%;
		position: absolute;
		bottom: 0;
		background-color: oklch(72% 0.25 var(--hue) / 12%);
		transition: var(--transition);
		z-index: -1;
		left: 0;
		border-radius: var(--border-radius-sm);
	}

	nav a span {
		color: var(--color-text-highlight);
		margin-right: -4px;
	}

	nav a:hover::before {
		width: 100%;
	}
</style>
