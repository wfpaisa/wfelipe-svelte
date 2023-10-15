<script>
	import LayoutHeader from './layout-header.svelte';
	import LayoutSidebarLeft from './layout-sidebar-left.svelte';
	import LayoutSidebarRight from './layout-sidebar-right.svelte';
	import '$lib/styles/styles.css';
</script>

<LayoutHeader />

<div class="layout">
	<LayoutSidebarLeft />

	<main>
		<slot />
	</main>

	<LayoutSidebarRight />
</div>

<style>
	.layout {
		background-image: radial-gradient(
			500px 200px at 50% 0%,
			oklch(22% 0.08 var(--hue)) 0%,
			transparent 100%
		);

		@media (prefers-color-scheme: light) {
			background-image: radial-gradient(
				500px 200px at 50% 0%,
				oklch(96% 0.02 var(--hue)) 0%,
				transparent 100%
			);
		}

		display: flex;
		flex-direction: column;
		padding: 0rem;
	}

	main {
		grid-area: main;
	}
</style>
