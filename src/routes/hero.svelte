<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import Prompt from '$lib/log/Prompt.svelte';

	const i18n = getI18n();
</script>

<section id="intro" data-scroll="root">
	<div class="col">
		<Prompt cmd="whoami" live />

		<p class="name ln animated fadeInLeft delay-2">{i18n.t.hero.greeting}</p>
		<h1 class="ln animated fadeInLeft2 delay-3">
			<b>Felipe Uribe</b>. {i18n.t.hero.title}
		</h1>
		<p class="intro ln animated fadeInLeft2 delay-4">
			{i18n.t.hero.intro}
		</p>

		<p class="mail ln animated fadeInLeft2 delay-5">
			<span aria-hidden="true">→</span>
			<a href="mailto:hi@wfelipe.com" aria-label={i18n.t.social.mail}>hi@wfelipe.com</a>
		</p>
	</div>

	<div class="col next">
		<Prompt caret />
	</div>
</section>

<style>
	#intro {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-block-size: 100dvh;
		padding: calc(var(--layout-header) + 3rem) 0 0;
		box-sizing: border-box;
		background-size: var(--dot-container) var(--dot-container);
		background-image: radial-gradient(circle, var(--dot-color) var(--dot-size), transparent 0);
		background-position: center 0;
		background-attachment: fixed;

		animation-name: zoomAnimation;
		animation-duration: 1ms;
		animation-direction: alternate;
		animation-timeline: scroll(block root);
		--scroll-range: 0 100dvh;
		animation-range: var(--scroll-range);
	}

	@keyframes zoomAnimation {
		0% {
			background-size: var(--dot-container) var(--dot-container);
			background-position: center 0px;
		}
		100% {
			background-size: 4.8rem 4.8rem;
			background-position: center 4.8rem;
		}
	}

	.col {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.next {
		flex: none;
		padding-block: 2rem 1.5rem;
	}

	.next :global(.prompt) {
		margin: 0;
	}

	.name {
		margin: 0 0 0.75rem;
		color: var(--neon-cyan);
		font-size: var(--font-size-base);
	}

	h1 {
		max-width: 22ch;
		margin: 0;
		line-height: 1.08;
		font-size: clamp(2.25rem, 5.2vw + 0.5rem, 5.25rem);
		letter-spacing: -0.01em;
		text-wrap: balance;
		background: linear-gradient(
			to top right,
			var(--neon-green) calc(19% - 1px),
			transparent 19%,
			transparent calc(20% - 1px),
			var(--neon-pink) 20%,
			var(--neon-pink) calc(39% - 1px),
			transparent 39%,
			transparent calc(40% - 1px),
			var(--neon-cyan) 40%,
			var(--neon-cyan) calc(59% - 1px),
			transparent 59%,
			transparent calc(60% - 1px),
			var(--neon-pink) 60%,
			var(--neon-pink) calc(79% - 1px),
			transparent 79%,
			transparent calc(80% - 1px),
			var(--neon-green) 80%
		);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	/* The h1 is transparent text: its line number keeps a real color */
	h1.ln::before {
		line-height: 2;
		top: 0.5em;
	}

	.intro {
		max-width: 60ch;
		margin: 2rem 0 0;
		font-size: var(--font-size-md);
		font-weight: 100;
		font-family: var(--font-family-title);
		line-height: var(--font-lineheight-lg);
		letter-spacing: 0.02rem;
		color: var(--color-text);
	}

	.mail {
		margin: 1.75rem 0 0;
		font-size: var(--font-size-base);
		color: var(--color-text-dim);
	}

	.mail a {
		color: var(--color-text-highlight);
		text-decoration: underline;
		text-decoration-color: oklch(70% 0.27 var(--hue) / 40%);
		text-decoration-thickness: 1px;
	}

	.mail a:hover {
		text-decoration-color: currentColor;
	}

	@media (prefers-reduced-motion: reduce) {
		#intro {
			animation: none;
		}
	}
</style>
