<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import ImgMe from '$lib/images/me.jpg';

	const i18n = getI18n();
</script>

<section id="about">
	<div class="preloadimage"></div>

	<div class="container">
		<div class="flex-center">
			<div>
				<h2 data-scroll class="scroll-view sv-grow-up">
					<span class="number">01.</span>
					{i18n.t.about.title}
				</h2>

				<p data-scroll class="scroll-view sv-grow-up">{i18n.t.about.body}</p>

				<p data-scroll class="scroll-view sv-grow-up">{i18n.t.about.stack}</p>
				<ul data-scroll class="scroll-view sv-grow-up">
					<li><span class="tag">CSS/Sass</span></li>
					<li><span class="tag">JavaScript/Node.js</span></li>
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
				<div class="me scroll-view" data-scroll>
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
		background-color: var(--color-text-highlight);
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
		border-radius: 0.5rem;
		height: auto;
	}

	.me img:hover {
		mix-blend-mode: normal;
		filter: grayscale(0%);
	}

	ul {
		font-size: var(--font-size-sm);
		color: var(--color-text-highlight);
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

	h2 + p::first-letter {
		font-size: 3.5rem;
		font-weight: bold;
		/* color: var(--neon-pink); */
		float: left;
		line-height: 3rem;
		margin-right: 0.25rem;
	}
</style>
