<script lang="ts">
</script>

<svelte:head>
	<title>WFelipe</title>
	<meta name="description" content="Felipe Uribe - Portfolio" />
</svelte:head>

<section id="intro">
	<article class="container">
		<div class="intro-info">
			<span class="name animated fadeInLeft delay-1s"> Hi, my name is </span>
			<h1 class="animated fadeInLeft2 delay-2s">
				<b>Felipe Uribe</b>. Bringing ideas to life on the web through coding and design.
			</h1>
			<p class="animated fadeInLeft2 delay-3s">
				As a developer who enjoys creating digital experiences in both design and development, I am
				constantly working on building products that are accessible and human-centered. I firmly
				believe in the power of technology to improve people's lives, and I always strive to make it
				more inclusive and user-friendly.
			</p>
		</div>
	</article>

	<div class="mouse">
		<span class="animated infinite scrolldown" />
	</div>
</section>

<style>
	#intro {
		--dot-size: 2px;
		padding-top: var(--layout-header);
		min-block-size: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-size: 2rem 2rem;
		background-image: radial-gradient(circle, var(--bg-2) var(--dot-size), transparent 0);
		background-position: center 0;
		background-attachment: fixed;
	}

	/* separation bar */
	#intro::after {
		content: '';
		position: absolute;
		border-top: 1px solid hsla(var(--color-acent-base), 70%, 0%);
		border-bottom: 1px solid hsla(var(--color-acent-base), 70%, 0%);
		width: calc(100% - 2rem);
		height: 0.5rem;
		background-image: url('$lib/images/bg1.svg');
		background-attachment: fixed;
		bottom: -2rem;
		margin-bottom: 1rem;
	}

	.name {
		color: var(--text-v-1);
		letter-spacing: 0;
		font-weight: normal;
		display: inline-block;
		font-size: var(--font-size-base);
		font-family: var(--font-family-body);
	}

	h1 {
		margin: 0px;
		line-height: var(--font-lineheight-md);
		font-size: var(--font-size-xxxl);
	}

	b {
		color: var(--text-v-1);
	}

	p {
		font-size: var(--font-size-md);
		font-weight: 100;
		font-family: var(--font-family-title);
		color: hsl(var(--color-acent-base), 94%);
		line-height: var(--font-lineheight-md);
		letter-spacing: 0.05rem;
	}

	.mouse {
		background-color: var(--bg-2);
		border-radius: 8px;
		border: 1px solid var(--text-2);
		bottom: 40px;
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
		height: 30px;
		left: 50%;
		position: absolute;
		width: 20px;
		margin-left: -10px;
	}

	.mouse span {
		display: inline-block;
		height: 8px;
		width: 4px;
		background: var(--text-2);
		position: absolute;
		left: 50%;
		bottom: 2px;
		margin-left: -2px;
		border-radius: 4px;
	}
</style>
