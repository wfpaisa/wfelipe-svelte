<script lang="ts">
	import PortforlioItem from './portfolio-item.svelte';
	import type { IPortfolioItem } from './types';

	const items: IPortfolioItem[] = [
		{
			name: 'Codigital',
			tags: ['Javascript', 'Prestashop', 'Drupal', 'CSS', 'HTML', 'Angular'],
			preview: '/images/projects/codigital/codigital.webp',
			dialog: '<img src="/images/projects/codigital/codigital.webp" width="5120" height="11462"/>',
			video: 'https://youtu.be/zJn9D0gBM9o'
		},
		{
			name: 'Monte',
			tags: ['Javascript', 'Prestashop', 'CSS', 'HTML', 'PHP'],
			preview: '/images/projects/monte/monte.webp',
			dialog: '<img src="/images/projects/monte/monte.webp" width="1878" height="12857"/>'
		},
		{
			name: 'Ecomodisimos - landing',
			tags: ['Javascript', 'Vtex', 'HTML', 'CSS'],
			preview: '/images/projects/comodisimos/ecomodisimos.webp',
			dialog:
				'<img src="/images/projects/comodisimos/ecomodisimos.webp" width="5120" height="9072"/>',
			video: 'https://youtu.be/T8f0HNz8K1I'
		},
		{
			name: 'Hogar universal',
			tags: ['Javascript', 'Drupal', 'CSS', 'HTML', 'PHP'],
			preview: '/images/projects/universal/universal.webp',
			dialog: '<img src="/images/projects/universal/universal.webp" width="1400" height="9732"/>'
		},
		{
			name: 'Comodisimos - Web',
			tags: ['Javascript', 'React', 'Design', 'Vtex', 'HTML', 'CSS'],
			preview: '/images/projects/comodisimos/comodisimos.webp',
			dialog:
				'<img src="/images/projects/comodisimos/comodisimos.webp" width="3072" height="16153"/>',
			video: 'https://youtu.be/tjfFMJEdKUs'
		},
		{
			name: 'Comodisimos - POS',
			tags: ['Vue', 'Javascript', 'Docker', 'Design', 'HTML', 'CSS', 'InfluxDB'],
			preview: '/images/projects/comodisimos/comodisimos-pos.webp',
			dialog:
				'<img src="/images/projects/comodisimos/comodisimos-pos.webp" width="1920" height="9032"/>',
			video: 'https://youtu.be/HPCiw_y72M4'
		},
		{
			name: 'Ostinata',
			tags: ['Javascript', 'CSS', 'HTML', 'PHP'],
			preview: '/images/projects/ostinatta/ostinatta.webp',
			dialog: '<img src="/images/projects/ostinatta/ostinatta.webp" width="1400" height="10686"/>',
			video: 'https://youtu.be/G6pcljDeQz0'
		},
		{
			name: 'Todo en Artes',
			tags: ['Docker', 'Javascript', 'Design', 'Prestashop', 'PHP', 'CSS'],
			preview: '/images/projects/todo-en-artes/todoenartes.webp',
			dialog:
				'<img src="/images/projects/todo-en-artes/todoenartes.webp" width="1916" height="8169"/>'
		},
		{
			name: 'El Bellanita',
			tags: ['Javascript', 'Drupal', 'CSS', 'HTML', 'PHP'],
			preview: '/images/projects/el-bellanita/el-bellanita.webp',
			dialog:
				'<img src="/images/projects/el-bellanita/el-bellanita.webp" width="2000" height="4683"/>'
		},
		{
			name: 'Natalia Lafourcade',
			tags: ['CSS', 'HTML', 'PHP'],
			preview: '/images/projects/natalia/natalia-lafourcade.png',
			dialog:
				'<img src="/images/projects/natalia/natalia-lafourcade.png" width="1280" height="5296"/>'
		}
	];
</script>

<section id="portfolio">
	<div class="container">
		<section class="items">
			<article class="item intro">
				<h2><span class="number">03.</span> Portfolio</h2>
				<p>
					In these 14 years, I have helped bring to life more than 300 websites, here are some of
					the highlights.
				</p>
			</article>

			{#each items as item, index}
				<PortforlioItem {item} {index} />
			{/each}
		</section>
	</div>
</section>

<style>
	#portfolio {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100dvh;
		padding: calc(var(--layout-header) + 4rem) 0;
		position: relative;

		/* background-image: linear-gradient(
			0deg,
			oklch(80% 0.2 var(--hue) / 0%) 60%,
			oklch(80% 0.2 var(--hue) / 3%) 100%
		); */
	}

	.container {
		display: flex;
		flex-direction: column;
	}

	.items {
		width: 100%;
		gap: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		grid-auto-rows: min-content;
		gap: 1rem;
	}

	.item.intro {
		grid-row: span 1 !important;
		padding: 4rem 0;
	}

	:global(.items .item) {
		grid-row: span 2;
	}

	@media (min-width: 768px) {
		.items {
			/* grid-template-columns: 1fr 1fr; */
			grid-template-columns: repeat(2, minmax(20rem, 1fr));
		}
	}

	@media (min-width: 1200px) {
		.items {
			/* grid-template-columns: 1fr 1fr; */
		}
	}
</style>
