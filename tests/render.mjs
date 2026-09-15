import { readFileSync } from 'node:fs';
import { Liquid } from 'liquidjs';

export async function render(mode, data, language = 'Spanish') {
  const partials = new Map();
  const shared = readFileSync(new URL('../TRMNL/src/shared.liquid', import.meta.url), 'utf8')
    .replace(/{% template (\w+) %}([\s\S]*?){% endtemplate %}/g, (_, key, body) => {
      partials.set(key, body);
      return '';
    });

  const engine = new Liquid({
    strictFilters: true,
    relativeReference: false,
    fs: {
      resolve: (_, file) => file,
      exists: async file => partials.has(file),
      existsSync: file => partials.has(file),
      readFile: async file => partials.get(file),
      readFileSync: file => partials.get(file),
      contains: () => true
    }
  });

  engine.registerFilter('base64_encode', value => Buffer.from(value).toString('base64'));
  engine.registerFilter('qr_code', value => `<svg class="qr-code" data-url="${value}"></svg>`);

  return engine.parseAndRender(
    shared + readFileSync(new URL(`../TRMNL/src/${mode}.liquid`, import.meta.url), 'utf8'),
    {
      ...data,
      trmnl: {
        system: { timestamp_utc: '2026-09-15T12:00:00Z' },
        user: { utc_offset: 7200 },
        plugin_settings: { custom_fields_values: { language } }
      }
    }
  );
}
