<script lang="ts">
</script>

<section id="work">
	<div class="container">
		<div class="flex-center">
			<h2><span class="number">02.</span> Work</h2>

			<p>
				<span>05</span>Currently, in my free time, I experiment with new technologies, decorate
				interfaces and iconography for Linux operating systems, and contribute to open-source.
				Professionally, I contribute to the development of web application interfaces for
				PuntosColombia.
			</p>
			<p>
				<span>04</span>Previously, I created the design for the web, implemented servers in
				containers, and created the design and front-end development for the sales and commercial
				management system for Comodisimos.
			</p>
			<p>
				<span>03</span>Before that, I created the design, strategy, development, server
				implementation, and production launch for the website for Todo en Artes.
			</p>
			<p>
				<span>02</span>Before all of this, I worked at two digital marketing agencies: the first,
				"WebCreativa," where I honed my web development skills, discovered my passion for user
				interfaces, and learned a lot about design and user experience. At the second agency I
				worked at, "CoDigital," I was able to apply much of my knowledge by developing products in
				more detail and focusing on experiences.
			</p>
			<p>
				<span>01</span>However, during these 14 years, when work allowed me, I have worked as a
				freelancer, discovering and applying all my motivation in the projects I have been involved
				in.
			</p>
		</div>

		<hr style="margin: 4rem 0" />

		<!-- <PortfolioList /> -->
	</div>
</section>

<style>
	#work {
		display: flex;
		align-items: center;
		min-height: 100dvh;
		padding: calc(var(--layout-header) + 4rem) 2rem;
		position: relative;
		/* background-image: linear-gradient(
			180deg,
			oklch(80% 0.2 var(--hue) / 0%) 60%,
			oklch(80% 0.2 var(--hue) / 3%) 100%
		); */
	}

	.container {
		display: flex;
	}

	/* separation bar */
	/* #work::after {
		content: '';
		position: absolute;
		width: calc(100% - 2rem);
		height: 0.5rem;
		background-image: url('$lib/images/bg1.svg');
		background-attachment: fixed;
		bottom: 0rem;
		margin-bottom: 0rem;
	} */

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
		background-color: var(--text-2);
		position: absolute;
		left: 1.5rem;
		z-index: 1;
		opacity: 0.2;
	}

	p:last-child::before {
		display: none;
	}

	p span {
		color: var(--text-2);
		margin-right: 0.5rem;
		position: absolute;
		top: 0.3rem;
		left: 0.75rem;
		z-index: 2;
		font-size: 80%;
		padding: 0 0.3rem;
	}

	p span::after {
		background: var(--bg-1);
		border: 1px solid var(--text-2);
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
</style>
