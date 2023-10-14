<script lang="ts">
</script>

<section id="work">
	<div class="container">
		<div class="flex-center">
			<h2><span class="number">02.</span> Work</h2>

			<p>
				<i>05</i>
				<span class="scroll-view sv-grow-up-inline">
					Currently, in my free time, I experiment with new technologies, decorate interfaces and
					iconography for Linux operating systems, and contribute to open-source. Professionally, I
					contribute to the development of web application interfaces for PuntosColombia.
				</span>
			</p>
			<p>
				<i>04</i>
				<span class="scroll-view sv-grow-up-inline">
					Previously, I created the design for the web, implemented servers in containers, and
					created the design and front-end development for the sales and commercial management
					system for Comodisimos.
				</span>
			</p>
			<p>
				<i>03</i>
				<span class="scroll-view sv-grow-up-inline">
					Before that, I created the design, strategy, development, server implementation, and
					production launch for the website for Todo en Artes.
				</span>
			</p>
			<p>
				<i>02</i>
				<span class="scroll-view sv-grow-up-inline">
					Before all of this, I worked at two digital marketing agencies: the first, "WebCreativa,"
					where I honed my web development skills, discovered my passion for user interfaces, and
					learned a lot about design and user experience. At the second agency I worked at,
					"CoDigital," I was able to apply much of my knowledge by developing products in more
					detail and focusing on experiences.
				</span>
			</p>
			<p>
				<i>01</i>
				<span class="scroll-view sv-grow-up-inline">
					However, during these 14 years, when work allowed me, I have worked as a freelancer,
					discovering and applying all my motivation in the projects I have been involved in.
				</span>
			</p>
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
		background-color: var(--text-2);
		position: absolute;
		left: 1.5rem;
		z-index: 1;
		opacity: 0.2;
	}

	p:last-child::before {
		display: none;
	}

	p i {
		color: var(--text-2);
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

	p span {
		display: inline-block;
	}
</style>
