import assert from 'node:assert/strict';

export async function checkFilmProgram(browser, url = process.env.JOURNAL_URL || 'http://127.0.0.1:5173/') {
  const context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  try {
    const page = await context.newPage();
    await page.addInitScript(() => sessionStorage.setItem('six-flights-film-seen', '1'));
    const media = [];
    page.on('request', request => {
      if (new URL(request.url()).pathname.endsWith('.mp4')) media.push(request.url());
    });
    await page.goto(url, { waitUntil: 'networkidle' });
    const reflection = page.getByRole('button', { name: /^Watch reflection film/i });
    const trailer = page.getByRole('button', { name: /^Watch game trailer/i });
    await reflection.waitFor();
    await trailer.waitFor();
    await page.waitForFunction(() => [...document.querySelectorAll('.screening-poster img')].filter(img => img.naturalWidth).length === 2);
    const primaryBox = await reflection.locator('img').boundingBox();
    const secondaryBox = await trailer.locator('img').boundingBox();
    assert(primaryBox.width >= secondaryBox.width * 1.75, 'the reflection has the larger desktop poster');
    assert.equal(media.length, 0, 'browsing the program does not download a movie');

    await page.setViewportSize({ width: 390, height: 844 });
    const mainMobile = await reflection.locator('img').boundingBox();
    const extraMobile = await trailer.locator('img').boundingBox();
    assert(extraMobile.y >= mainMobile.y + mainMobile.height && extraMobile.width >= 135, 'both phone posters are identifiable, with the reflection first');
    assert(extraMobile.y + extraMobile.height <= 844, 'the trailer poster is visible before scrolling');

    await reflection.click();
    const mainVideo = page.locator('video[aria-label*="reflection film"]');
    await page.waitForFunction(() => document.querySelector('video[aria-label*="reflection film"]').readyState >= 1);
    await mainVideo.evaluate(video => { video.pause(); video.currentTime = 2; });
    assert(!media.some(source => source.includes('look-in-the-mirror')), 'watching the reflection does not fetch the trailer');
    await page.keyboard.press('Escape');
    await reflection.waitFor();
    await page.waitForFunction(() => document.activeElement?.dataset.film === 'reflection');
    await trailer.click();
    const trailerVideo = page.locator('video[aria-label*="game trailer"]');
    await trailerVideo.waitFor();
    assert(await mainVideo.evaluate(video => video.paused && video.currentTime >= 1.9), 'the reflection retains its place');
    assert(await trailerVideo.locator('track[kind="captions"][srclang="en"]').count());
    await page.getByRole('button', { name: /Back to the films/ }).click();
    await reflection.click();
    assert(await mainVideo.evaluate(video => video.currentTime >= 1.9));
    await page.getByRole('button', { name: 'Enter the game', exact: true }).click();
    await page.waitForFunction(() => !document.querySelector('.filmdialog[open]') && [...document.querySelectorAll('video')].every(video => video.paused));
    await page.reload();
    await reflection.waitFor();
    await trailer.waitFor();
    await page.goto(new URL('?show=find&at=monAfter', url).href);
    await page.locator('.live .knockbtn').waitFor();
    assert.equal(await page.locator('.filmdialog[open]').count(), 0, 'a shared notebook page opens directly');
  } finally {
    await context.close();
  }
}
