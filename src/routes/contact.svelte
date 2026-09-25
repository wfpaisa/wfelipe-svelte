<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import Prompt from '$lib/log/Prompt.svelte';

	const i18n = getI18n();

	const profiles = $derived([
		{ href: 'https://github.com/wfpaisa/', label: i18n.t.social.github, icon: 'icon-logo-github' },
		{
			href: 'https://www.linkedin.com/in/felipe-uribe',
			label: i18n.t.social.linkedin,
			icon: 'icon-logo-linkedin'
		},
		{
			href: 'https://www.opendesktop.org/u/wfpaisa',
			label: i18n.t.social.opendesktop,
			icon: 'icon-logo-tux'
		}
	]);

	/** github.com/wfpaisa, as the address bar would show it */
	const short = (href: string) => href.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '');
</script>

<section id="contact">
	<div class="col">
		<Prompt path="~" cmd="mail hi@wfelipe.com" />

		<h2 class="ln">{i18n.t.reader.cta}</h2>

		<p class="mail ln">
			<a href="mailto:hi@wfelipe.com" aria-label={i18n.t.social.mail}>hi@wfelipe.com</a>
		</p>

		<ul class="profiles ln">
			{#each profiles as profile (profile.href)}
				<li>
					<a href={profile.href} target="_blank" rel="noopener" aria-label={profile.label}>
						<i class={profile.icon} aria-hidden="true"></i>
						<span aria-hidden="true">{short(profile.href)}</span>
					</a>
				</li>
			{/each}
		</ul>

		<Prompt caret />
	</div>
</section>

<style>
	#contact {
		padding: clamp(5rem, 10vw, 9rem) 0 4rem;
	}

	h2 {
		max-width: 16ch;
		margin: 0 0 2.5rem;
		font-size: clamp(2.25rem, 4.6vw + 0.5rem, 4.5rem);
		line-height: 1.05;
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	h2.ln::before {
		top: 0.7em;
	}

	.mail {
		margin: 0 0 3rem;
	}

	.mail a {
		position: relative;
		font-size: clamp(1.375rem, 2.4vw + 0.75rem, 2.5rem);
		color: var(--color-text-highlight);
		padding-bottom: 0.25rem;
	}

	/* Underline that fills from the left, the same gesture as the nav */
	.mail a::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1px;
		background-color: currentColor;
		opacity: 0.35;
		transform-origin: left;
		transition:
			opacity 0.3s var(--ease-out),
			transform 0.3s var(--ease-out);
	}

	.mail a:hover::after {
		opacity: 1;
		transform: scaleY(2);
	}

	.profiles {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 2rem;
		margin: 0 0 clamp(3rem, 8vw, 6rem);
		padding: 0;
		list-style: none;
		font-size: var(--font-size-sm);
	}

	.profiles a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0;
		color: var(--color-text-dim);
	}

	.profiles a:hover {
		color: var(--color-text-highlight);
	}

	.profiles i {
		font-size: 1.25rem;
		color: var(--color-text-highlight);
	}
</style>
