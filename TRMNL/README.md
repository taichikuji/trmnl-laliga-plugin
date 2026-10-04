# TRMNL LaLiga Blocking Status

A TRMNL plugin that monitors the public DNS signal maintained by [hayahora.futbol](https://hayahora.futbol/).

## States

- **Active:** red answer, the source wording and football decoration
- **Clear:** direct black answer with the source wording

All states remain readable in grayscale. The layouts scale for TRMNL OG, BWRY, TRMNL X landscape and TRMNL X portrait.

## Templates

- **shared.liquid:** signal interpretation, translations, shared result and title bar
- **full.liquid:** complete status and description
- **half_horizontal.liquid:** compact horizontal status
- **half_vertical.liquid:** compact stacked status
- **quadrant.liquid:** minimal answer for the smallest slot


## Setup

Choose Spanish or English, save, and Force Refresh. The public hayahora.futbol signal is polled through Google DNS; no personal API key is needed.

## Public recipe review

The original plugin design, parsing logic and markup are also offered under [CC BY 4.0](../LICENSE), matching [TRMNL’s public plugin license](https://trmnl.com/plugin-license). Third-party content keeps its own terms. For support, [open a GitHub issue](https://github.com/taichikuji/trmnl-laliga-plugin/issues).

All four layouts render a native title bar. Display icons are monochrome SVGs, so raster dithering is unnecessary. Data requests run in native polling; no Serverless fetch is needed. The redundant pass-through transform has been removed.

Before submitting, save each setting in TRMNL, check all four views on OG and X (landscape and portrait), use a public demo preview, and review CHEF feedback. Repository checks and a successful upload do not replace these dashboard checks or human approval.
