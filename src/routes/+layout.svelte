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

		<div class="palette">
			<div class="swatch" />
			<div class="swatch" />
			<div class="swatch" />
			<div class="swatch" />
			<div class="swatch" />
			<div class="swatch" />
			<div class="swatch" />
			<div class="swatch" />
			<div class="swatch" />
			<div class="swatch" />
		</div>
	</main>

	<LayoutSidebarRight />
</div>

<style>
	.layout {
		background-image: radial-gradient(500px 200px at 50% 0%, var(--color-9) 0%, transparent 100%);
		display: flex;
		flex-direction: column;
		padding: 0rem;
	}

	main {
		grid-area: main;
		/* background: rgb(232, 232, 222, 0.3); */
		/* overflow: auto; */
	}

	.palette {
		display: grid;
		grid-auto-rows: 2rem;
		grid-template-columns: 100%;
		display: none;
	}

	.swatch:nth-of-type(1) {
		background: var(--color-1);
	}
	.swatch:nth-of-type(2) {
		background: var(--color-2);
	}
	.swatch:nth-of-type(3) {
		background: var(--color-3);
	}
	.swatch:nth-of-type(4) {
		background: var(--color-4);
	}
	.swatch:nth-of-type(5) {
		background: var(--color-5);
	}
	.swatch:nth-of-type(6) {
		background: var(--color-6);
	}
	.swatch:nth-of-type(7) {
		background: var(--color-7);
	}
	.swatch:nth-of-type(8) {
		background: var(--color-8);
	}
	.swatch:nth-of-type(9) {
		background: var(--color-9);
	}
	.swatch:nth-of-type(10) {
		background: var(--color-10);
	}
</style>
