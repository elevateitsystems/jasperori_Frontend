# /design: source of truth for the TechSalem frontend

The approved Figma design, in forms Claude Code can read.

Live Figma file (needs a Figma login):
https://www.figma.com/design/nTGDCmFONETXClV6OyWJvv/

## What's here
| Path | What it is | How to use it |
|---|---|---|
| `figma/techsalem-approved.fig` | The original Figma file (exported 6 Nov 2026) | Master copy. It's a binary file: open it in Figma, don't try to parse it. |
| `screenshots/all-pages-overview.jpg` | All 6 pages side by side | Visual reference for layout, order and overall look |
| `screenshots/<page>.png` | (Optional, add later) One full-size PNG export per page | Best visual reference for pixel-level checks |
| `spec/<page>.md` | Exact spec per page, taken from the Figma layers | **Primary reference for building.** It has every text, font, size, line height, letter spacing, color, position, width/height, padding, gap, radius, shadow and image. |
| `design-tokens.md` | Colors, gradients, type scale, radius, shadows, layout | Use it to set up the Tailwind theme |

## How to read a spec file
- Each line is a Figma layer. Indentation shows nesting (parent → children).
- Top-level blocks are listed top-to-bottom in page order, one per page section.
- `x… y… W×H` is the position and size in px, relative to the page's top-left corner (page width 1600px).
- `flex-row` / `flex-col`, `gap`, `pad(t r b l)`, `justify-*`, `items-*` are Figma auto-layout = CSS flexbox.
- `bg` is the fill (solid color, gradient or `IMAGE[/images/...]`). Fills are listed bottom layer first, so gradients sit on top of images.
- Colors are shown as `#hex/token` and `@alpha` for opacity.
- `r4` means a 4px radius. `r33554400` means fully rounded (pill).
- `TEXT "…"` lines give the exact copy and font settings. `tw:` shows the Tailwind variable names recorded by Figma Make (as a hint for token names; the actual hex/size values in the line win).
- `icon/vector W×H` marks a small line icon. Pick the matching icon from `lucide-react` by looking at the screenshot (e.g. a 9×7 vector in a 16px box is an arrow-right).

## Known design notes
- The page frames contain a leftover frame from another project ("Explore Your Skills Pathway"). It's hidden behind other sections, so it's been removed from the specs. Do not build it.
- Placeholder copy (Service Area 01–04, Support area 01/02, Consulting service 01–03) is approved as-is for now. It must stay editable via content files.
- Font decision: the Home page "Services" and "About TechSalem" sections use **Inter** in Figma. Everything else uses Manrope. Default rule: build those sections in **Inter**, matching the approved Figma, unless told otherwise.
- The Booking page shows the time zone as "UTC". Keep the label as content so it can be changed to Europe/Stockholm later.
- Desktop only: there are no mobile designs. Responsive layouts are derived from the desktop design.
