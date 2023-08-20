<sidebar class="right-side">
	<div class="socials-icons">
		<a
			href="https://github.com/wfpaisa/"
			target="_blank"
			aria-label="Felipe Uribe Github profile"
			title="Felipe Uribe Github profile"
		>
			<i class="icon-logo-github" />
		</a>

		<a
			href="https://www.linkedin.com/in/felipe-uribe"
			target="_blank"
			aria-label="Felipe Uribe Linkedin profile"
			title="Felipe Uribe Linkedin profile"
		>
			<i class="icon-logo-linkedin" />
		</a>

		<a
			href="https://www.opendesktop.org/u/wfpaisa"
			target="_blank"
			aria-label="Felipe Uribe OpenDesktop profile"
			title="Felipe Uribe OpenDesktop profile"
		>
			<i class="icon-logo-tux" />
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
	}

	.socials-icons a {
		color: var(--text-v-1);
	}

	.socials-icons a:hover {
		color: var(--text-3);
	}
</style>
