<script lang="ts">
</script>

<section id="intro">
	<article class="container">
		<div class="intro-info">
			<span class="name animated fadeInLeft delay-2"> Hi, my name is </span>
			<h1 class="animated fadeInLeft2 delay-3">
				<b>Felipe Uribe</b>. Bringing ideas to life on the web through coding and design.
			</h1>
			<p class="animated fadeInLeft2 delay-4">
				As a developer who enjoys creating digital experiences in both design and development, I am
				constantly working on building products that are accessible and human-centered. I firmly
				believe in the power of technology to improve people's lives, and I always strive to make it
				more inclusive and user-friendly.
			</p>
		</div>
	</article>

	<div class="mouse">
		<span class="animated infinite mouse-effect-scrolldown" />
	</div>
</section>

<style>
	#intro {
		padding: var(--layout-header) 2rem 0 2rem;
		min-block-size: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-size: 6rem 6rem;
		background-image: radial-gradient(circle, var(--bg-2) 3px, transparent 0);
		background-position: center 0;
		background-attachment: fixed;

		animation-name: zoomAnimation;
		animation-duration: 1ms;
		animation-direction: alternate;
		animation-timeline: scroll(block root);
		animation-range: 0 100dvh;
	}

	@keyframes zoomAnimation {
		0% {
			background-size: 6rem 6rem;
			background-position: center 0px;
		}
		100% {
			background-size: 4.8rem 4.8rem;
			background-position: center 4.8rem;
		}
	}

	/* separation bar */
	#intro::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 0.5rem;
		background-image: url('$lib/images/bg1.svg');
		background-attachment: fixed;
		bottom: 0rem;
		margin-bottom: -0.25rem;
		z-index: 1;
	}

	.name {
		color: var(--text-3);
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

		background: linear-gradient(to right, var(--text-2), var(--text-v-2));
		-webkit-background-clip: text;
		background-attachment: fixed;
		background-clip: text;
		color: transparent;
	}

	b {
		color: var(--text-3);
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
		border: 1px solid var(--text-1);
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
		background: var(--text-1);
		position: absolute;
		left: 50%;
		bottom: 2px;
		margin-left: -2px;
		border-radius: 4px;
	}
</style>
