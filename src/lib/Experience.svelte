<script>
	import { onMount } from 'svelte';
	import { experience } from './content.js';
	import Arrow from './Arrow.svelte';
	let { en = false } = $props();
	const months = {
		es: [
			'ene.',
			'feb.',
			'mar.',
			'abr.',
			'may.',
			'jun.',
			'jul.',
			'ago.',
			'sept.',
			'oct.',
			'nov.',
			'dic.'
		],
		en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	};
	const thisMonth = () => {
		const today = new Date();
		return [today.getFullYear(), today.getMonth() + 1];
	};
	// Prerendered with the build date; the visitor's date replaces it once the page hydrates
	let now = $state(thisMonth());
	onMount(() => {
		const current = thisMonth();
		if (current[0] !== now[0] || current[1] !== now[1]) now = current;
	});
	const at = ([year, month]) => year + (month - 1) / 12;
	const first = Math.min(...experience.map((item) => at(item.start)));
	const span = $derived(at(now) + 1 / 12 - first);
	const lang = $derived(en ? 'en' : 'es');
	const date = (d) => months[lang][d[1] - 1] + ' ' + d[0];
	/** Inclusive length in years and months, the way CVs count it */
	function length(start, end) {
		const total = (end[0] - start[0]) * 12 + end[1] - start[1] + 1;
		const years = Math.floor(total / 12),
			rest = total % 12;
		const parts = [];
		if (years)
			parts.push(years + (en ? (years > 1 ? ' yrs' : ' yr') : years > 1 ? ' años' : ' año'));
		if (rest) parts.push(rest + (en ? (rest > 1 ? ' mos' : ' mo') : rest > 1 ? ' meses' : ' mes'));
		return parts.join(' ');
	}
</script>

<div class="timeline">
	<div class="timeline-axis" aria-hidden="true">
		<div><span>{Math.floor(first)}</span><span>{en ? 'Today' : 'Hoy'}</span></div>
	</div>
	<ol class="timeline-list">
		{#each experience as item (item.id)}
			{@const end = item.end ?? now}
			<li class="timeline-item" class:is-current={!item.end}>
				<div class="timeline-meta">
					<p class="timeline-dates">
						<time datetime={item.start.join('-')}>{date(item.start)}</time> — {#if item.end}<time
								datetime={item.end.join('-')}>{date(item.end)}</time
							>{:else}{en ? 'Present' : 'Actualidad'}{/if}
					</p>
					<h3>{item.name}</h3>
					<p class="timeline-role">{item.role[lang]}</p>
					<p class="timeline-place">{item.place} · {length(item.start, end)}</p>
					<span class="timeline-span" aria-hidden="true"
						><span
							style:left="{((at(item.start) - first) / span) * 100}%"
							style:width="{((at(end) + 1 / 12 - at(item.start)) / span) * 100}%"
						></span></span
					>
				</div>
				<div class="timeline-detail">
					<p>{item[lang]}</p>
					{#if item.highlights}<ul class="timeline-highlights">
							{#each item.highlights[lang] as highlight (highlight)}<li>{highlight}</li>{/each}
						</ul>{/if}
					<ul class="tags" aria-label={en ? 'Technologies' : 'Tecnologías'}>
						{#each item.stack as tag (tag)}<li>{tag === 'IA' && en ? 'AI' : tag}</li>{/each}
					</ul>
					{#if item.link}<a class="text-link" href={item.link} target="_blank" rel="noopener"
							>{item.link.replace('https://', '')}<Arrow /></a
						>{/if}
				</div>
			</li>
		{/each}
	</ol>
</div>
