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
