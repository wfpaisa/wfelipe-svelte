<script>
	let { id, name, image, video = null, view = 'site', active = false, en = false } = $props();
	let stage = $state();
	let mini = $state();
	let loaded = $state(false);
	let lens = $state({ top: 0, height: 1 });
	let dragging = false;
	let frame = 0;
	const strip = $derived('/projects/' + id + '.webp');
	const ratio = $derived(image.fullHeight / image.fullWidth);
	const youtubeId = $derived(video?.split('/').pop());
	const read = $derived(Math.round(Math.min(1, lens.top + lens.height) * 100));

	function measure() {
		if (!stage || !stage.scrollHeight) return;
		lens = {
			top: stage.scrollTop / stage.scrollHeight,
			height: stage.clientHeight / stage.scrollHeight
		};
	}
	function onscroll() {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(measure);
	}
	function seek(e) {
		const rect = mini.getBoundingClientRect();
		const fraction = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
		stage.scrollTop = fraction * stage.scrollHeight - stage.clientHeight / 2;
	}
	function ondown(e) {
		dragging = true;
		mini.setPointerCapture(e.pointerId);
		seek(e);
	}
	function onmove(e) {
		if (dragging) seek(e);
	}
	function onup(e) {
		dragging = false;
		mini.releasePointerCapture(e.pointerId);
	}

	// With a mouse, the pointer's height over the screenshot sets how far down it is, eased so it never jumps.
	// Touch keeps its own native scrolling; the wheel and the keyboard take over until the mouse moves again.
	const LAG = 460;
	let aim = 0;
	let glide = 0;
	let before = 0;
	// The image trails the pointer: each frame it closes a share of the gap, the same at any refresh rate
	function follow(now = performance.now()) {
		const gap = aim - stage.scrollTop;
		if (Math.abs(gap) < 0.5) return;
		const step = Math.min(64, now - (before || now - 16));
		before = now;
		stage.scrollTop += gap * (1 - Math.exp(-step / LAG));
		glide = requestAnimationFrame(follow);
	}
	function hover(e) {
		if (e.pointerType !== 'mouse') return;
		const rect = stage.getBoundingClientRect();
		// A margin at both ends so the very top and bottom can be reached
		const fraction = Math.min(1, Math.max(0, ((e.clientY - rect.top) / rect.height - 0.08) / 0.84));
		aim = fraction * (stage.scrollHeight - stage.clientHeight);
		cancelAnimationFrame(glide);
		before = 0;
		follow();
	}
	const stop = () => cancelAnimationFrame(glide);

	$effect(() => {
		if (!active || !stage) return;
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(stage);
		return () => {
			observer.disconnect();
			stop();
		};
	});
</script>

<div class="viewer" class:playing={view === 'video'} style:--ratio={ratio}>
	{#if view === 'video'}
		<div class="player">
			{#if active}<iframe
					src="https://www.youtube-nocookie.com/embed/{youtubeId}?autoplay=1&rel=0"
					title={en ? 'Video of ' + name : 'Video de ' + name}
					allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
					allowfullscreen
				></iframe>{/if}
		</div>
	{:else}
		<!-- Focusable so the screenshot scrolls with the keyboard -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			bind:this={stage}
			class="stage"
			tabindex="0"
			role="region"
			aria-label={en
				? 'Full screenshot of ' + name + ', scroll to explore'
				: 'Captura completa de ' + name + ', desplázate para explorarla'}
			{onscroll}
			onpointermove={hover}
			onpointerleave={stop}
			onwheel={stop}
			ondragstart={(e) => e.preventDefault()}
		>
			<figure class="shot" class:loaded>
				<img
					class="shot-light"
					src={strip}
					alt=""
					width="600"
					height={Math.round(600 * ratio)}
					loading="lazy"
					decoding="async"
				/>
				{#if active}
					<img
						class="shot-full"
						src={image.full}
						alt={en ? 'Interface of ' + name : 'Interfaz de ' + name}
						width={image.fullWidth}
						height={image.fullHeight}
						decoding="async"
						onload={() => {
							loaded = true;
							measure();
						}}
					/>
				{/if}
			</figure>
		</div>
		<div class="minimap" aria-hidden="true">
			<!-- Pointer shortcut only; the stage is the keyboard path -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				bind:this={mini}
				class="mini"
				onpointerdown={ondown}
				onpointermove={onmove}
				onpointerup={onup}
				onpointercancel={onup}
			>
				<img src={strip} alt="" draggable="false" loading="lazy" decoding="async" />
				<span
					class="lens"
					style:top="{Math.max(0, lens.top) * 100}%"
					style:height="{Math.min(1, lens.height) * 100}%"
				></span>
			</div>
			<span class="mini-read">{read}%</span>
		</div>
	{/if}
</div>
