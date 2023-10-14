<script lang="ts">
	import ImgMe from '$lib/images/me.jpg';
</script>

<section id="about">
	<div class="preloadimage" />

	<div class="container">
		<div class="flex-center">
			<div>
				<h2 class="scroll-view sv-grow-up"><span class="number">01.</span> About me</h2>

				<p class="scroll-view sv-grow-up">
					Since I was very young, I have always been a curious person and I have loved understanding
					how things work. Later, when I discovered the world of computers and familiarized myself
					with the philosophy of "I am because we all are" (Ubuntu), my interest in open-source
					software became a true passion. I love the idea of being able to modify and adapt
					technology to my needs and preferences, and that drives me to continue learning and
					exploring in this field.
				</p>

				<p class="scroll-view sv-grow-up">
					Here are a few *technologies I have been working with recently.
				</p>
				<ul class="scroll-view sv-grow-up">
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
				<div class="me scroll-view">
					<img src={ImgMe} alt="Felipe Uribe" height="341" width="341" />
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
		padding: var(--layout-header) 2rem 2rem 2rem;
		position: relative;
		/* background-image: radial-gradient(400px 400px at 70% 50%, var(--color-9) 0%, transparent 100%); */
		background-image: linear-gradient(
			45deg,
			oklch(80% 0.2 var(--hue) / 0%) 0%,
			oklch(50% 0.27 var(--hue-v) / 6%) 80%
		);
		background-attachment: fixed;
	}

	.container {
		display: flex;
	}

	.flex-center {
		display: flex;
		gap: 2rem;
		align-items: start;
		flex-direction: column-reverse;
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
		animation-name: sv-fade-in-right;
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
		height: auto;
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

	li {
		margin-bottom: 0.5rem;
	}

	@keyframes sv-fade-in-right {
		from {
			opacity: 0;
			transform: translateX(-100px) scale(1.4);
		}

		to {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
	}

	@media (min-width: 900px) {
		ul {
			column-count: 2;
		}

		/* @keyframes sv-fade-in-right {
			from {
				opacity: 0;
				transform: translate3d(50px, -140px, 0) rotateZ(-10deg) scale(0.9);
			}

			to {
				opacity: 1;
				transform: translate3d(0, 0, 0) rotateZ(0deg) scale(1);
			}
		} */
	}
</style>
