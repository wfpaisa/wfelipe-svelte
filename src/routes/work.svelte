<script lang="ts">
	import { getI18n } from '$lib/i18n';

	const i18n = getI18n();
</script>

<section id="work">
	<div class="container">
		<div class="flex-center">
			<h2><span class="number">02.</span> {i18n.t.work.title}</h2>

			{#each i18n.t.work.items as text, index (index)}
				<p>
					<i>{String(i18n.t.work.items.length - index).padStart(2, '0')}</i>
					<span class="scroll-view sv-grow-up-inline">{text}</span>
				</p>
			{/each}
		</div>
	</div>
</section>

<style>
	#work {
		display: flex;
		align-items: center;
		min-height: 100dvh;
		padding: calc(var(--layout-header) + 4rem) 2rem;
		position: relative;
	}

	.container {
		display: flex;
	}

	h2 {
		margin-bottom: 2rem;
	}

	p {
		position: relative;
		padding: 0rem 0rem 1.5rem 3.5rem;
		margin: 0px;
	}

	p::before {
		content: '';
		height: 100%;
		width: 1px;
		background-color: var(--color-text-highlight);
		position: absolute;
		left: 1.5rem;
		z-index: 1;
		opacity: 0.2;
	}

	p:last-child::before {
		display: none;
	}

	p i {
		color: var(--color-text-highlight);
		margin-right: 0.5rem;
		position: absolute;
		top: 0.3rem;
		left: 0.75rem;
		z-index: 2;
		font-size: 80%;
		padding: 0 0.3rem;
		font-style: normal;
	}

	p i::after {
		backdrop-filter: blur(8px);
		border: 1px solid var(--color-text-highlight);
		border-left-width: 4px;
		border-radius: 0.2rem;
		content: '';
		height: 120%;
		width: 120%;
		position: absolute;
		top: -0.18rem;
		left: -0.45rem;
		z-index: -1;
	}

	p span {
		display: inline-block;
	}
</style>
