<script lang="ts">
	import LayoutHeader from './layout-header.svelte';
	import LayoutSidebarLeft from './layout-sidebar-left.svelte';
	import LayoutSidebarRight from './layout-sidebar-right.svelte';
	import '$lib/styles/styles.css';
	import { page } from '$app/state';
	import { messages, setI18n, toLocale } from '$lib/i18n';

	let { children } = $props();

	const locale = $derived(toLocale(page.params.lang));

	setI18n({
		get locale() {
			return locale;
		},
		get t() {
			return messages[locale];
		}
	});

	// Keep <html lang> right when switching language without a full reload
	$effect(() => {
		document.documentElement.lang = locale;
	});
</script>

<LayoutHeader />

<div class="layout">
	<LayoutSidebarLeft />

	<main>
		{@render children()}
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
