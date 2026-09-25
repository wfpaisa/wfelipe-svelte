<script lang="ts">
	let {
		cmd = '',
		path = '~',
		live = false,
		caret = false
	}: {
		cmd?: string;
		path?: string;
		/** Types on page load instead of on scroll (first screen) */
		live?: boolean;
		/** Blinking caret after the command: the session is waiting */
		caret?: boolean;
	} = $props();
</script>

<!-- Shell chrome around the content: screen readers get the headings and text instead -->
<p class="prompt ln" aria-hidden="true">
	<span class="who">felipe@wfelipe</span>:<span class="path">{path}</span>$
	{#if cmd}<span class="cmd" class:live data-scroll={live ? undefined : ''} style:--n={cmd.length}
			>{cmd}</span
		>{/if}{#if caret}<span class="caret"></span>{/if}
</p>

<style>
	.cmd {
		display: inline-block;
		vertical-align: bottom;
		overflow: hidden;
		width: calc(var(--n) * 1ch);
		white-space: pre;

		animation: type 1ms steps(var(--n), end) both;
		animation-timeline: view(block);
		--scroll-range: entry 100% cover 40%;
		animation-range: var(--scroll-range);
	}

	.cmd.live {
		animation-duration: calc(var(--n) * 55ms);
		animation-delay: 300ms;
		animation-timeline: auto;
		animation-range: normal;
	}

	@keyframes type {
		from {
			width: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cmd {
			animation: none;
		}
	}
</style>
