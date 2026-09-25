<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import type { ReaderItem } from '$lib/project-reader/reader';
	import PortforlioItem from './portfolio-item.svelte';
	import type { IPortfolioItem } from './types';

	const i18n = getI18n();

	const items: IPortfolioItem[] = [
		{
			name: 'Monte',
			tags: ['JavaScript', 'PrestaShop', 'CSS', 'HTML', 'PHP'],
			image: {
				preview: '/images/projects/monte/monte-preview.webp',
				big: '/images/projects/monte/monte.webp',
				strip: '/images/projects/monte/monte-strip.webp',
				bigWidth: '1878',
				bigHeight: '12857'
			}
		},
		{
			name: 'eComodísimos — Landing',
			tags: ['JavaScript', 'VTEX', 'HTML', 'CSS'],
			image: {
				preview: '/images/projects/comodisimos/ecomodisimos-preview.webp',
				big: '/images/projects/comodisimos/ecomodisimos.webp',
				strip: '/images/projects/comodisimos/ecomodisimos-strip.webp',
				bigWidth: '5120',
				bigHeight: '9072'
			},
			youtubeId: 'T8f0HNz8K1I'
		},
		{
			name: 'Hogar Universal',
			tags: ['JavaScript', 'Drupal', 'CSS', 'HTML', 'PHP'],
			image: {
				preview: '/images/projects/universal/universal-preview.webp',
				big: '/images/projects/universal/universal.webp',
				strip: '/images/projects/universal/universal-strip.webp',
				bigWidth: '1400',
				bigHeight: '9732'
			}
		},
		{
			name: 'Comodísimos — Web',
			tags: ['JavaScript', 'React', 'Design', 'VTEX', 'HTML', 'CSS'],
			image: {
				preview: '/images/projects/comodisimos/comodisimos-preview.webp',
				big: '/images/projects/comodisimos/comodisimos.webp',
				strip: '/images/projects/comodisimos/comodisimos-strip.webp',
				bigWidth: '3072',
				bigHeight: '16153'
			},
			youtubeId: 'tjfFMJEdKUs'
		},
		{
			name: 'Natalia Lafourcade',
			tags: ['CSS', 'HTML', 'PHP'],
			image: {
				preview: '/images/projects/natalia/natalia-lafourcade-preview.webp',
				big: '/images/projects/natalia/natalia-lafourcade.webp',
				strip: '/images/projects/natalia/natalia-lafourcade-strip.webp',
				bigWidth: '1280',
				bigHeight: '5296'
			}
		},
		{
			name: 'CoDigital',
			tags: ['JavaScript', 'PrestaShop', 'Drupal', 'CSS', 'HTML', 'Angular'],
			image: {
				preview: '/images/projects/codigital/codigital-preview.webp',
				big: '/images/projects/codigital/codigital.webp',
				strip: '/images/projects/codigital/codigital-strip.webp',
				bigWidth: '5120',
				bigHeight: '11462'
			},
			youtubeId: 'zJn9D0gBM9o'
		},
		{
			name: 'Ostinata',
			tags: ['JavaScript', 'CSS', 'HTML', 'PHP'],
			image: {
				preview: '/images/projects/ostinatta/ostinatta-preview.webp',
				big: '/images/projects/ostinatta/ostinatta.webp',
				strip: '/images/projects/ostinatta/ostinatta-strip.webp',
				bigWidth: '1400',
				bigHeight: '10686'
			},
			youtubeId: 'G6pcljDeQz0'
		},
		{
			name: 'Todo en Artes',
			tags: ['Docker', 'JavaScript', 'Design', 'PrestaShop', 'PHP', 'CSS'],
			image: {
				preview: '/images/projects/todo-en-artes/todoenartes-preview.webp',
				big: '/images/projects/todo-en-artes/todoenartes.webp',
				strip: '/images/projects/todo-en-artes/todoenartes-strip.webp',
				bigWidth: '1916',
				bigHeight: '8169'
			}
		},
		{
			name: 'El Bellanita',
			tags: ['JavaScript', 'Drupal', 'CSS', 'HTML', 'PHP'],
			image: {
				preview: '/images/projects/el-bellanita/el-bellanita-preview.webp',
				big: '/images/projects/el-bellanita/el-bellanita.webp',
				strip: '/images/projects/el-bellanita/el-bellanita-strip.webp',
				bigWidth: '2000',
				bigHeight: '4683'
			}
		},
		{
			name: 'Comodísimos — POS',
			tags: ['Vue', 'JavaScript', 'Docker', 'Design', 'HTML', 'CSS', 'InfluxDB'],
			image: {
				preview: '/images/projects/comodisimos/comodisimos-pos-preview.webp',
				big: '/images/projects/comodisimos/comodisimos-pos.webp',
				strip: '/images/projects/comodisimos/comodisimos-pos-strip.webp',
				bigWidth: '1920',
				bigHeight: '9032'
			},
			youtubeId: 'HPCiw_y72M4'
		}
	];

	const readerItems: ReaderItem[] = items.map((item) => ({
		name: item.name,
		tags: item.tags,
		full: {
			src: item.image.big,
			width: Number(item.image.bigWidth),
			height: Number(item.image.bigHeight)
		},
		strip: item.image.strip,
		youtubeId: item.youtubeId
	}));
</script>

<section id="portfolio">
	<div class="container">
		<section class="items">
			<article class="item intro">
				<h2><span class="number">03.</span> {i18n.t.projects.title}</h2>
				<p>{i18n.t.projects.intro}</p>
			</article>

			{#each readerItems as item, index (item.name)}
				<PortforlioItem items={readerItems} {index} />
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
		padding: calc(var(--layout-header) + 4rem) 2rem;
		position: relative;
	}

	.container {
		display: flex;
		flex-direction: column;
	}

	.items {
		width: 100%;
	}

	.item.intro {
		padding: 2rem 0;
		margin-bottom: 1rem;
	}

	@media (min-width: 668px) {
		.items {
			columns: 2;
		}
	}
</style>
