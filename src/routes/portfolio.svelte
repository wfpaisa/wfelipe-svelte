<script lang="ts">
	import { getI18n } from '$lib/i18n';
	import type { ReaderItem } from '$lib/project-reader/reader';
	import Prompt from '$lib/log/Prompt.svelte';
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
	<div class="col">
		<Prompt path="~" cmd="ls -l projects/" />

		<h2 class="ln"><span class="number">03.</span> {i18n.t.projects.title}</h2>
		<p class="intro ln">{i18n.t.projects.intro}</p>

		<p class="total ln" aria-hidden="true">total {readerItems.length}</p>

		<div class="items ln">
			{#each readerItems as item, index (item.name)}
				<PortforlioItem items={readerItems} {index} />
			{/each}
		</div>
	</div>
</section>

<style>
	#portfolio {
		padding: clamp(4rem, 8vw, 7rem) 0 4rem;
	}

	h2 {
		margin: 0 0 1.5rem;
	}

	h2.ln::before {
		top: 0.6em;
	}

	.intro {
		max-width: 52ch;
		margin: 0 0 3rem;
		font-family: var(--font-family-title);
		font-size: var(--font-size-md);
		font-weight: 100;
		line-height: 1.45;
	}

	.total {
		margin: 0 0 1rem;
		font-size: var(--font-size-sm);
		color: var(--color-text-dim);
	}

	@media (min-width: 668px) {
		.items {
			columns: 2;
			column-gap: 1rem;
		}
	}
</style>
