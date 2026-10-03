import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const base = process.env.PREVIEW_URL || 'http://localhost:5174';
const browser = await chromium.launch({
	executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
	args: ['--no-sandbox']
});
const failures = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on('pageerror', (e) => failures.push(e.message));
await mkdir('.impeccable/review', { recursive: true });
async function ready(path = '/') {
	await page.goto(base + path, { waitUntil: 'networkidle' });
	await page.evaluate(() => document.fonts.ready);
	await page.evaluate(() =>
		Promise.all(
			Array.from(document.images).map((img) => {
				img.loading = 'eager';
				return img.decode().catch(() => {});
			})
		)
	);
}
async function noOverflow(label) {
	assert.ok(
		await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
		label +
			' has horizontal overflow: ' +
			JSON.stringify(
				await page.evaluate(() =>
					Array.from(document.querySelectorAll('body *'))
						.filter((el) => el.getBoundingClientRect().right > innerWidth + 1)
						.map((el) => ({
							tag: el.tagName,
							class: el.className,
							right: el.getBoundingClientRect().right
						}))
						.slice(0, 15)
				)
			)
	);
}
try {
	await ready();
	assert.equal(await page.locator('h1').count(), 1);
	assert.equal(await page.locator('html').getAttribute('lang'), 'es');
	assert.equal(await page.locator('.project').count(), 12);
	const replay = page.locator('.motion-controls button');
	const hero = page.locator('.hero');
	const reveal = () => hero.evaluate((el) => el.style.getPropertyValue('--reveal'));
	// First visit opens with the play gate; a click sends a wave and then starts the story.
	await page.waitForTimeout(1500);
	assert.equal(await reveal(), '', 'The gate shows no story yet');
	await page.waitForTimeout(3600);
	await hero.click({ position: { x: 300, y: 250 } });
	await page.waitForTimeout(2500);
	assert.equal(await reveal(), '0', 'Story hides the headline while it plays');
	assert.match(
		await replay.textContent(),
		/Saltar animación/,
		'Control offers skipping during the story'
	);
	// The story lasts 63.9 s (GUION.md).
	await page.waitForTimeout(63200);
	assert.equal(await reveal(), '', 'Headline is restored when the story ends');
	assert.match(await replay.textContent(), /Ver evolución/, 'Replay becomes available');
	// Nothing is remembered: a reload starts again at the gate, without the story.
	await ready();
	await page.waitForTimeout(800);
	assert.equal(await reveal(), '', 'A reload returns to the gate, not to the story');
	await page.waitForTimeout(3600);
	await replay.click();
	await page.waitForTimeout(3000);
	assert.equal(await reveal(), '0', 'Replay plays the story again');
	await page.keyboard.press('Escape');
	await page.waitForTimeout(100);
	assert.equal(await reveal(), '', 'A key press skips to the end');
	await replay.click();
	await page.waitForTimeout(1000);
	await replay.click();
	await page.waitForTimeout(100);
	assert.equal(await reveal(), '', 'Skip control ends the story');
	assert.match(await replay.textContent(), /Ver evolución/);
	await noOverflow('Desktop');
	await page.screenshot({ path: '.impeccable/review/desktop.png', fullPage: true });
	for (const width of [1280, 1600]) {
		await page.setViewportSize({ width, height: 1000 });
		await noOverflow('Desktop ' + width);
	}
	await page.setViewportSize({ width: 390, height: 844 });
	await ready();
	await page.waitForTimeout(5200);
	await noOverflow('Mobile');
	const menu = page.locator('.menu-toggle');
	await menu.click();
	assert.equal(await menu.getAttribute('aria-expanded'), 'true');
	await page.locator('#main-nav').getByRole('link', { name: 'Trayectoria', exact: true }).click();
	assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
	assert.ok(page.url().endsWith('#trayectoria'));
	await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
	await page.waitForTimeout(400);
	await page.screenshot({ path: '.impeccable/review/mobile.png', fullPage: true });
	await page.setViewportSize({ width: 320, height: 760 });
	await noOverflow('Small mobile');
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await ready();
	assert.ok(await page.locator('.motion-controls button').isDisabled());
	assert.equal(
		await page.locator('.hero').evaluate((el) => el.style.getPropertyValue('--reveal')),
		''
	);
	await page.setViewportSize({ width: 1440, height: 1000 });
	await ready('/en/');
	assert.equal(await page.locator('html').getAttribute('lang'), 'en');
	await noOverflow('English desktop');
	await page.getByRole('link', { name: 'Plane GTK', exact: false }).first().click();
	assert.ok(
		await page.locator('#proyecto-plane').evaluate((el) => el.open),
		'Featured link opens matching project'
	);
	await page.locator('#proyecto-plane summary').focus();
	await page.keyboard.press('Enter');
	assert.ok(
		await page.locator('#proyecto-plane').evaluate((el) => !el.open),
		'Project disclosure responds to keyboard'
	);
	assert.equal(await page.locator('.email').getAttribute('href'), 'mailto:hi@wfelipe.com');
	await page.setViewportSize({ width: 390, height: 844 });
	await ready('/en/');
	await noOverflow('English mobile');
	await page.screenshot({ path: '.impeccable/review/english-mobile.png', fullPage: true });
	await page.setViewportSize({ width: 1536, height: 1024 });
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await ready();
	await page.waitForTimeout(5200);
	await page.screenshot({ path: '.impeccable/review/hero-repro.png' });
	await page.locator('.motion-controls button').click();
	await page.waitForTimeout(2000);
	await page.screenshot({ path: '.impeccable/review/transition.png' });
	// Static content and links remain useful when client-side JavaScript is disabled.
	const plain = await browser.newPage({ javaScriptEnabled: false });
	await plain.goto(base);
	assert.equal(await plain.locator('.project').count(), 12);
	assert.equal(await plain.locator('h1').count(), 1);
	await plain.close();
	assert.deepEqual(failures, [], 'No browser errors');
	console.log(
		'PASS: Spanish/English, 320–1600px, story playback, skip, replay and restoration, reduced motion, mobile navigation, keyboard project controls, featured links, contact, and no-JS content.'
	);
} finally {
	await browser.close();
}
