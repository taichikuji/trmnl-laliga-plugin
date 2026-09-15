# LaLiga blocking status for TRMNL

A TRMNL plugin that shows whether the mass IP blocking associated with Spanish football matches is active.

Install it [from the TRMNL recipe directory](https://trmnl.com/recipes/294074).

## Features

- Clear active, inactive and unavailable states
- Spanish and English interfaces
- A restrained BWRY accent with a grayscale-safe fallback
- Responsive layouts for TRMNL OG, BWRY and TRMNL X
- Football decoration when blocking is active

The plugin checks the public `blocked.dns.hayahora.futbol` signal through Google DNS. A successful response with more than ten addresses means mass blocking is active; an `NXDOMAIN` response means no mass blocking is detected. Other responses are shown as unavailable instead of reporting a false negative. The status wording matches hayahora.futbol.

## Local development

Open `TRMNL/` with [TRMNLP](https://github.com/usetrmnl/trmnlp) to preview the layouts. Run the Liquid rendering checks with `pnpm test`.

## References

- [¿Hay ahora fútbol?](https://hayahora.futbol/)
- [Public Google DNS API](https://developers.google.com/speed/public-dns/docs/doh/json)
- [TRMNL screen templates](https://docs.trmnl.com/go/private-plugins/templates)
- [TRMNL X guide](https://trmnl.com/framework/docs/3.3/trmnl_x_guide)
- [TRMNL color palettes](https://trmnl.com/framework/docs/3.3/color_palettes)
