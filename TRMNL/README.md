# TRMNL LaLiga Blocking Status

A TRMNL plugin that monitors the public DNS signal maintained by [hayahora.futbol](https://hayahora.futbol/).

## Previews

Previews render the current Liquid templates in Spanish with a synthetic active-blocking response of 325 IPs, at 12:00 CET on 25 October 2026. They are demo images, not live blocking status.

| Full View | Half Horizontal View |
|------------|----------------------|
| ![Full blocking status view](media/preview_full.webp) | ![Half horizontal blocking status view](media/preview_half_horizontal.webp) |

| Half Vertical View | Quadrant View |
|-------------------|----------------|
| ![Half vertical blocking status view](media/preview_half_vertical.webp) | ![Quadrant blocking status view](media/preview_quadrant.webp) |

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
