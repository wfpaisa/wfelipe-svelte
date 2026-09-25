<script lang="ts">
	import { getI18n, LANG_STORAGE_KEY, localePath, locales, type Locale } from '$lib/i18n';

	const i18n = getI18n();

	/** An explicit choice wins over the browser language on later visits */
	function remember(locale: Locale) {
		try {
			localStorage.setItem(LANG_STORAGE_KEY, locale);
		} catch {
			// Storage blocked: the choice still applies for this visit
		}
	}
</script>

<nav class="lang" aria-label={i18n.t.lang.label}>
	[{#each locales as locale, index (locale)}{#if index > 0}<span class="sep" aria-hidden="true"
				>/</span
			>{/if}<a
			href={localePath(locale)}
			hreflang={locale}
			lang={locale}
			title={i18n.t.lang[locale]}
			aria-current={i18n.locale === locale ? 'page' : undefined}
			data-sveltekit-noscroll
			onclick={() => remember(locale)}>{locale.toUpperCase()}</a
		>{/each}]
</nav>

<style>
	.lang {
		display: inline-flex;
		align-items: center;
		font-size: var(--font-size-sm);
		color: var(--color-text);
		white-space: nowrap;
	}

	.lang a {
		position: relative;
		padding: 0.125rem 0.375rem;
		border-radius: var(--border-radius-sm);
		color: var(--color-text);
		opacity: 0.6;
		letter-spacing: 0.05em;
	}

	.lang a:hover {
		opacity: 1;
		color: var(--color-text-highlight);
		background-color: oklch(72% 0.25 var(--hue) / 12%);
	}

	.lang a[aria-current='page'] {
		opacity: 1;
		color: var(--color-text-highlight);
	}

	.lang a:focus-visible {
		outline: 2px solid var(--neon-cyan);
		outline-offset: 1px;
	}

	.sep {
		opacity: 0.4;
	}
</style>
