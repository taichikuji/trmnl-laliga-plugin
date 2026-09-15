import test from 'node:test';
import assert from 'node:assert/strict';
import { render } from './render.mjs';

const modes = ['full', 'half_horizontal', 'half_vertical', 'quadrant'];
const blocked = { Status: 0, Answer: Array.from({ length: 11 }, (_, i) => ({ data: `192.0.2.${i}` })) };
const clear = { Status: 3 };
const belowThreshold = { Status: 0, Answer: Array.from({ length: 10 }, (_, i) => ({ data: `192.0.2.${i}` })) };

for (const mode of modes) {
  test(`${mode}: renders active blocking in Spanish`, async () => {
    const html = await render(mode, blocked);
    assert.match(html, /¿Hay ahora fútbol\?/);
    assert.match(html, />SÍ</);
    if (mode !== 'quadrant') assert.match(html, /\.\.\.y por tanto, cientos de webs legítimas están inaccesibles desde los principales ISPs españoles\./);
    assert.match(html, /text--red/);
    assert.equal((html.match(/class="layout /g) || []).length, 1);
    assert.equal((html.match(/class="title_bar"/g) || []).length, 1);
    assert.equal((html.match(/16:00/g) || []).length, 1);
    assert.doesNotMatch(html, /undefined|NaN|Liquid error/);
  });

  test(`${mode}: renders a clear signal in English`, async () => {
    const html = await render(mode, clear, 'English');
    assert.match(html, /Is there football now\?/);
    assert.match(html, />NO</);
    if (mode !== 'quadrant') assert.match(html, /\.\.\.but when there is, hundreds of legitimate websites are inaccessible from the main Spanish ISPs\./);
    assert.match(html, /text--black/);
  });

  test(`${mode}: requires more than ten addresses before reporting active blocking`, async () => {
    const html = await render(mode, belowThreshold);
    assert.match(html, />NO</);
    assert.doesNotMatch(html, />SÍ</);
    assert.doesNotMatch(html, /laliga-ball"/);
  });
}

test('football decoration only appears while blocking is active', async () => {
  assert.equal((await render('full', blocked)).match(/class="image image--adaptive laliga-ball"/g)?.length, 2);
  assert.doesNotMatch(await render('full', clear), /laliga-ball"/);
});

test('full layout stays direct and unboxed', async () => {
  const html = await render('full', clear);
  assert.doesNotMatch(html, /class="qr-code"|laliga-status|bg--yellow/);
});
