<script lang="ts">
	import LayoutHeader from './layout-header.svelte';
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

	// Keep <html lang> in sync when switching languages without a full reload.
	$effect(() => {
		document.documentElement.lang = locale;
	});
</script>

<LayoutHeader />

<main class="log">
	{@render children()}
</main>

<style>
	/* One session, one line count; the gutter rule runs the whole page */
	.log {
		position: relative;
		counter-reset: line;
	}

	.log::before {
		content: '';
		position: absolute;
		z-index: 1;
		top: 0;
		bottom: 0;
		left: calc(max(var(--pad), (100% - var(--col)) / 2) + var(--gutter) * 0.72 - 0.25rem);
		width: 1px;
		background-color: var(--border-color-1);
		pointer-events: none;
	}
</style>
