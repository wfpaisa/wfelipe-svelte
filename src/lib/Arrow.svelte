<script>
	let { replay = false } = $props();
</script>

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
	{#if replay}<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" /><path
			d="M10 8.2v7.6l6-3.8z"
			fill="currentColor"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linejoin="round"
		/>{:else}<path
			d="M3 12h17m-7-7 7 7-7 7"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>{/if}
</svg>
