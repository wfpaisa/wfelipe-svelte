<script lang="ts">
	import { getI18n } from '$lib/i18n';

	const i18n = getI18n();
</script>

<sidebar class="right-side">
	<div class="socials-icons">
		<a
			href="https://github.com/wfpaisa/"
			target="_blank"
			rel="noopener"
			aria-label={i18n.t.social.github}
			title={i18n.t.social.github}
		>
			<i class="icon-logo-github"></i>
		</a>

		<a
			href="https://www.linkedin.com/in/felipe-uribe"
			target="_blank"
			rel="noopener"
			aria-label={i18n.t.social.linkedin}
			title={i18n.t.social.linkedin}
		>
			<i class="icon-logo-linkedin"></i>
		</a>

		<a
			href="https://www.opendesktop.org/u/wfpaisa"
			target="_blank"
			rel="noopener"
			aria-label={i18n.t.social.opendesktop}
			title={i18n.t.social.opendesktop}
		>
			<i class="icon-logo-tux"></i>
		</a>
	</div>
</sidebar>

<style>
	.right-side {
		grid-area: rightSide;
		width: 2.5rem;
		text-align: center;
	}

	.socials-icons {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		row-gap: 0.5rem;
		font-size: 1.5rem;
		position: fixed;
		right: 0.25rem;
		top: calc((100dvh / 2) - 4rem);
		z-index: 10;
	}

	.socials-icons a {
		color: var(--color-text-highlight);
	}

	.socials-icons a:hover {
		transform: scale(1.2);
	}
</style>
