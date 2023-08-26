<script lang="ts">
	import { onMount } from 'svelte';
	import PortforlioItem from './portfolio-item.svelte';
	import type { IPortfolioItem } from './types';

	const items: IPortfolioItem[] = [
		{
			name: 'Monte',
			tags: ['Javascript', 'Prestashop', 'CSS', 'HTML', 'PHP'],
			image: {
				preview: '/images/projects/monte/monte-preview.webp',
				big: '/images/projects/monte/monte.webp',
				bigWidth: '1878',
				bigHeight: '12857'
			}
		},
		{
			name: 'Ecomodisimos - landing',
			tags: ['Javascript', 'Vtex', 'HTML', 'CSS'],
			image: {
				preview: '/images/projects/comodisimos/ecomodisimos-preview.webp',
				big: '/images/projects/comodisimos/ecomodisimos.webp',
				bigWidth: '5120',
				bigHeight: '9072'
			},
			youtubeId: 'T8f0HNz8K1I'
		},
		{
			name: 'Hogar universal',
			tags: ['Javascript', 'Drupal', 'CSS', 'HTML', 'PHP'],
			image: {
				preview: '/images/projects/universal/universal-preview.webp',
				big: '/images/projects/universal/universal.webp',
				bigWidth: '1400',
				bigHeight: '9732'
			}
		},
		{
			name: 'Comodisimos - Web',
			tags: ['Javascript', 'React', 'Design', 'Vtex', 'HTML', 'CSS'],
			image: {
				preview: '/images/projects/comodisimos/comodisimos-preview.webp',
				big: '/images/projects/comodisimos/comodisimos.webp',
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
				bigWidth: '1280',
				bigHeight: '5296'
			}
		},
		{
			name: 'Codigital',
			tags: ['Javascript', 'Prestashop', 'Drupal', 'CSS', 'HTML', 'Angular'],
			image: {
				preview: '/images/projects/codigital/codigital-preview.webp',
				big: '/images/projects/codigital/codigital.webp',
				bigWidth: '5120',
				bigHeight: '11462'
			},
			youtubeId: 'zJn9D0gBM9o'
		},
		{
			name: 'Ostinata',
			tags: ['Javascript', 'CSS', 'HTML', 'PHP'],
			image: {
				preview: '/images/projects/ostinatta/ostinatta-preview.webp',
				big: '/images/projects/ostinatta/ostinatta.webp',
				bigWidth: '1400',
				bigHeight: '10686'
			},
			youtubeId: 'G6pcljDeQz0'
		},
		{
			name: 'Todo en Artes',
			tags: ['Docker', 'Javascript', 'Design', 'Prestashop', 'PHP', 'CSS'],
			image: {
				preview: '/images/projects/todo-en-artes/todoenartes-preview.webp',
				big: '/images/projects/todo-en-artes/todoenartes.webp',
				bigWidth: '1916',
				bigHeight: '8169'
			}
		},
		{
			name: 'El Bellanita',
			tags: ['Javascript', 'Drupal', 'CSS', 'HTML', 'PHP'],
			image: {
				preview: '/images/projects/el-bellanita/el-bellanita-preview.webp',
				big: '/images/projects/el-bellanita/el-bellanita.webp',
				bigWidth: '2000',
				bigHeight: '4683'
			}
		},
		{
			name: 'Comodisimos - POS',
			tags: ['Vue', 'Javascript', 'Docker', 'Design', 'HTML', 'CSS', 'InfluxDB'],
			image: {
				preview: '/images/projects/comodisimos/comodisimos-pos-preview.webp',
				big: '/images/projects/comodisimos/comodisimos-pos.webp',
				bigWidth: '1920',
				bigHeight: '9032'
			},
			youtubeId: 'HPCiw_y72M4'
		}
	];
</script>

<section id="portfolio">
	<div class="container">
		<section class="items">
			<article class="item intro">
				<h2><span class="number">03.</span> Projects</h2>
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
