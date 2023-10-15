<sidebar class="left-side">
	<div class="link-content">
		<a href="mailto:hi@wfelipe.com" class="link-email" aria-label="mail to wfelipe">
			hi@wfelipe.com
		</a>
	</div>
</sidebar>

<style>
	.left-side {
		width: 2rem;
	}

	.link-content {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
		top: calc(100dvh - 20.25rem);
		z-index: 10;
		left: 0.5rem;
	}

	.link-content::after {
		border-left: 1px solid var(--color-text-highlight);
		content: '';
		display: inline-block;
		height: 8rem;
		margin-top: 1rem;
		width: 1px;
	}

	.link-email {
		color: var(--color-text-highlight);
		font-size: var(--font-size-sm);
		font-weight: 300;
		letter-spacing: 0.2rem;
		transform: rotate(-180deg);
		writing-mode: vertical-lr;
	}
</style>
