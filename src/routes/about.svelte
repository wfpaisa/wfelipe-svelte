<script lang="ts">
	import ImgMe from '$lib/images/me.jpg';
</script>

<svelte:head>
	<title>WFelipe</title>
	<meta name="description" content="Felipe Uribe - Portfolio" />
</svelte:head>

<section id="about">
	<div class="preloadimage" />

	<div class="container">
		<div class="flex-center">
			<div>
				<h2><span class="number">01</span>. About me</h2>

				<p>
					Since I was very young, I have always been a curious person and I have loved understanding
					how things work. Later, when I discovered the world of computers and familiarized myself
					with the philosophy of "I am because we all are" (Ubuntu), my interest in open-source
					software became a true passion. I love the idea of being able to modify and adapt
					technology to my needs and preferences, and that drives me to continue learning and
					exploring in this field.
				</p>

				<p>Here are a few *technologies I have been working with recently.</p>
				<ul>
					<li><span class="tag">CSS/Sass</span></li>
					<li><span class="tag">Javascript/NodeJs</span></li>
					<li><span class="tag">Vue/React/Angular</span></li>
					<li><span class="tag">Strapi</span></li>
					<li><span class="tag">HTML</span></li>
					<li><span class="tag">Linux/Docker</span></li>
					<li><span class="tag">Inkscape/Figma/SVG</span></li>
					<li><span class="tag">UX/UI</span></li>
					<li><span class="tag">PostgreSQL/InfluxDB</span></li>
				</ul>
			</div>

			<div>
				<div class="me">
					<img src={ImgMe} alt="Felipe Uribe" />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	#about {
		display: flex;
		align-items: center;
		min-height: 100dvh;
	}

	.container {
		display: flex;
	}

	.flex-center {
		display: flex;
		gap: 2rem;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	@media (min-width: 600px) {
		.flex-center {
			flex-direction: row;
		}
	}

	.me {
		background-color: var(--text-2);
		display: inline-block;
		opacity: 0.4;
		border-radius: 0.5rem;
		position: relative;
		transition: var(--transition);
	}

	.me:hover {
		transform: scale(1.1, 1.1) translate(0.5rem, -0.5rem);
		opacity: 1;
	}

	.me img {
		max-width: 16rem;
		filter: grayscale(100%);
		display: block;
		mix-blend-mode: multiply;
		background-color: var(--bg-1);
		border-radius: 0.5rem;
	}

	.me img:hover {
		mix-blend-mode: normal;
		filter: grayscale(0%);
	}

	ul {
		font-size: var(--font-size-sm);
		color: var(--text-2);
		list-style: none;
		padding: 0px;
		margin: 0px;
	}

	@media (min-width: 900px) {
		ul {
			column-count: 2;
		}
	}

	li {
		margin-bottom: 0.5rem;
	}
</style>
