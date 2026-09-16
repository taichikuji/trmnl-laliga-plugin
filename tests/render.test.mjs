import { expect, test } from 'bun:test';
import { render } from './render.mjs';

const modes = ['full', 'half_horizontal', 'half_vertical', 'quadrant'];
const blocked = { Status: 0, Answer: Array.from({ length: 11 }, (_, i) => ({ data: `192.0.2.${i}` })) };
const clear = { Status: 3 };
const belowThreshold = { Status: 0, Answer: Array.from({ length: 10 }, (_, i) => ({ data: `192.0.2.${i}` })) };

for (const mode of modes) {
  test(`${mode}: renders active blocking in Spanish`, async () => {
    const html = await render(mode, blocked);
    expect(html).toMatch(/¿Hay ahora fútbol\?/);
    expect(html).toMatch(/>SÍ</);
    if (mode !== 'quadrant') expect(html).toMatch(/\.\.\.y por tanto, cientos de webs legítimas están inaccesibles desde los principales ISPs españoles\./);
    expect(html).toMatch(/text--red/);
    expect((html.match(/class="layout /g) || []).length).toBe(1);
    expect((html.match(/class="title_bar"/g) || []).length).toBe(1);
    expect(html).toMatch(/Actualizado · \d{2}:\d{2}/);
    expect(html).not.toMatch(/undefined|NaN|Liquid error/);
  });

  test(`${mode}: renders a clear signal in English`, async () => {
    const html = await render(mode, clear, 'English');
    expect(html).toMatch(/Is there football now\?/);
    expect(html).toMatch(/>NO</);
    if (mode !== 'quadrant') expect(html).toMatch(/\.\.\.but when there is, hundreds of legitimate websites are inaccessible from the main Spanish ISPs\./);
    expect(html).toMatch(/text--black/);
  });

  test(`${mode}: requires more than ten addresses before reporting active blocking`, async () => {
    const html = await render(mode, belowThreshold);
    expect(html).toMatch(/>NO</);
    expect(html).not.toMatch(/>SÍ</);
    expect(html).not.toMatch(/laliga-ball"/);
  });
}

test('football decoration only appears while blocking is active', async () => {
  expect((await render('full', blocked)).match(/class="image image--adaptive laliga-ball"/g)?.length).toBe(2);
  expect(await render('full', clear)).not.toMatch(/laliga-ball"/);
});

test('full layout stays direct and unboxed', async () => {
  const html = await render('full', clear);
  expect(html).not.toMatch(/class="qr-code"|laliga-status|bg--yellow/);
});
