<script lang="ts">
	type IconName = 'arrow-left' | 'arrow-right' | 'close' | 'play' | 'page' | 'mail';

	let { name, size = 20 }: { name: IconName; size?: number } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	{#if name === 'arrow-left'}
		<path d="M19 12H5M11 6l-6 6 6 6" />
	{:else if name === 'arrow-right'}
		<path d="M5 12h14M13 6l6 6-6 6" />
	{:else if name === 'close'}
		<path d="M6 6l12 12M18 6L6 18" />
	{:else if name === 'play'}
		<path d="M8 5.5v13l10.5-6.5z" />
	{:else if name === 'page'}
		<rect x="5" y="3" width="14" height="18" rx="2" />
		<path d="M9 8h6M9 12h6M9 16h3" />
	{:else if name === 'mail'}
		<rect x="3" y="5.5" width="18" height="13" rx="2" />
		<path d="M3.5 7l8.5 6 8.5-6" />
	{/if}
</svg>
