# TechSalem: design tokens (extracted from the approved Figma file)

Every value below is measured from the Figma layers. Use these names as the Tailwind theme tokens.
The token names match the variables Figma Make recorded (e.g. `--color-navy`, `--color-ink-muted`).

## Colors
| Token | Hex | Used for |
|---|---|---|
| navy | #17233F | Headings, primary buttons, logo mark, dark sections |
| navy-dark | #10192E | Footer background (all pages) |
| purple | #5136A5 | Eyebrow labels, links, hero overlays, purple sections |
| red (accent) | #EF1747 | Accent blocks, CTA buttons on dark/purple, highlights |
| red-text | #D0143D | Form error messages ONLY (added in Phase 9, not in Figma). Contrast 5.46:1 on white, 5.05:1 on cloud; the brand red is 4.30:1 / 3.98:1, below WCAG AA for small text |
| zinc-950 (text) | #09090B | Main body text |
| ink-muted | #555563 | Secondary text, paragraphs |
| ink-soft | #4A4C56 | Section intro paragraph (Home services) |
| cloud (light bg) | #F6F6F8 | Light section backgrounds, EN/SV switch track |
| lavender | #F0EDF8 | Light purple card / section backgrounds |
| charcoal | #111315 | Dark sections: About "A focused, human approach", Support FAQ |
| line | #E6E7EE | Large faded numbers ("01", "02"), light dividers |
| white | #FFFFFF | |

Nav links: navy at 75% opacity. Card borders: black at 10% opacity.

## Gradients
Exact CSS values, calculated from the Figma file (fill order: image at the bottom, gradient on top).
Coded in `src/app/globals.css`.

| Gradient | CSS | Utility |
|---|---|---|
| Home hero overlay | `linear-gradient(89deg, rgba(23,35,64,1) 2%, rgba(47,43,107,1) 29%, rgba(72,51,151,0.33) 56.4%)` (keeps the last color after 56.4%) | `bg-overlay-home-hero` |
| About + Booking hero overlay | `linear-gradient(103deg, rgba(81,54,165,1) 3.4%, rgba(81,54,165,0) 95.3%)` | `bg-overlay-hero-about` |
| Services + Contact hero overlay | `linear-gradient(101deg, rgba(81,54,165,1) 2.9%, rgba(81,54,165,0) 72.3%)` | `bg-overlay-hero-services` |
| Support hero overlay | `linear-gradient(99deg, rgba(81,54,165,1) 6.8%, rgba(81,54,165,0) 101.4%)` | `bg-overlay-hero-support` |
| Hero accent bar (4×112px) | `180deg`: #7D4090 28.6% → … → #EF1747 100% (intermediate stops as in the spec) | `bg-accent-bar` |
| Brand gradient (Home "Let's build what's next" CTA) | `90deg`: navy #17233F 0% → purple #5136A5 50% → red #EF1747 100% (with the spec's intermediate stops) | `bg-brand` |
| About "100%" image section | `90deg`: black 15% → black 0% (left → right) | `bg-overlay-about-quote` |
| Image text-protection (Services image card) | `0deg`: black 75% 0% → 10% 50% → 0% 100% (bottom → top) | `bg-overlay-image-text` |

- Services hero: the spec lists its fills bottom-first as image → purple gradient → black 20%, so
  the solid black layer at 20% opacity sits **on top of** the gradient (`bg-black/20` layer above
  `bg-overlay-hero-services`).

## Typography
- Main font: **Manrope** (weights 300 Light, 400 Regular, 600 SemiBold, 700 Bold, 800 ExtraBold).
- Exception: the Home page's "How We Help Businesses Move Forward" services section and the
  "About TechSalem / Your Partner in Technology…" section use **Inter** (400, 600, 700) in the
  approved Figma. Check the decision in `design/README.md`.
- Headings use tight negative letter-spacing. Eyebrow labels are UPPERCASE with wide letter-spacing.

| Role | Font / weight | Size / line height | Letter spacing |
|---|---|---|---|
| Watermark number ("01", "02" behind Home support cards, navy at 4%) | Manrope 800 | 96 / 96 | 0 |
| Hero H1 (inner pages) | Manrope 800 | 88 / 81.84 | -5.72px (-0.065em) |
| Hero H1 (Home) | Manrope 800 | 68 / 70.72 | -3.74px (-0.055em) |
| H2 large | Manrope 800 | 60 / ~58.8 | -3.6px (-0.06em) |
| H2 | Manrope 800 | 48 / 48–49 | -2.16 to -2.4px (-0.045 to -0.05em) |
| H3 large | Manrope 800 | 36 / 40 | -1.44 to -1.8px |
| H3 | Manrope 800 | 30 / 36 | -1.2px |
| Lead light | Manrope 300 | 30 / 36 or 24 / 32 | 0 |
| Title 24 | Manrope 600/700/800 | 24 / 32 | 0 |
| Title 20 / logo | Manrope 800 | 20 / 28 | -0.64px |
| Body large | Manrope 400 | 18 / 32 | 0 |
| Body | Manrope 400 | 16 / 28 or 16 / 32 | 0 |
| Body small | Manrope 400 | 14 / 20, 14 / 24, 14 / 28 | 0 |
| Nav / button | Manrope 600 (nav), 700 (buttons) | 14 / 20 | 0 |
| Eyebrow | Manrope 800 or 700, UPPERCASE | 12 / 16 | 1.44–2.4px (0.12–0.2em) |
| Micro label | Manrope 700/800, UPPERCASE | 10 / 15 | 1.6–2.4px |
| Language switch | Manrope 800 | 11 / 16.5 | 0 |

## Radius
- 4px: buttons, logo mark, most cards (the main radius)
- 6px, 8px, 12px, 16px: some cards and inputs (see the page spec)
- Fully rounded (pill): EN/SV switch track and buttons (`33554400` in the spec means pill/9999px)

## Shadows
- Small (EN/SV active button): 0 1px 2px -1px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.1)
- Button glow (white hero button): 0 14px 32px rgba(23,35,63,.18)
- Glass card (Home about image, "Our focus" box): navy at 85% + 1px red border + 24px background blur
- Large white CTA button: 0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)

## Layout
- Design frame width: 1600px
- Header: 68px tall, white, horizontal padding 140px, so the content container is 1320px wide
- Section vertical padding: mostly 120px top and bottom
- Hero: 1015px tall frame (including its overlay), starting right under the header
- Icons: thin line icons (lucide style), mostly 16px and 20px, in 44px squares on cards

## Notes from implementation (Phase 1)
These were checked against the spec files when the tokens were coded in `src/app/globals.css`.
- **Gradients:** the Phase 1 directions were estimates from the screenshot. They have been
  replaced by the exact values in the Gradients table above (Phase 2).
- **Type variants actually used** beyond the table above: 72/70.56 (Contact intro heading);
  60px at line heights 57.6, 58.8, 60 and 61.2; 48px at 48, 48.96 and 51.84 (About quote);
  36/45 (Services image card); 20/28 Bold without letter spacing (titles; the logo is the
  ExtraBold -0.64px variant); 18/28 Bold; 16/24 ExtraBold; 12/16 Regular and Bold.
- **Inter sections** (Home Services + About TechSalem): 36/40 Bold -0.9px; 13/19.5 SemiBold
  uppercase 1.56px; 20/28 SemiBold; 18/29.25 Regular; 14/22.75 Regular; 14/20 SemiBold; 12/16 Regular.
- **Logo mark** (Phase 2): the spec's two 8×24px bars (purple at x24 y7, red at x7 y12 inside the
  36×36 square) are the origins of *rotated* layers: purple is rotated 45°, red -45°. Both end up
  centred in the square and form the "X" visible in the screenshot, with red on top. Coded as an
  inline SVG in `src/components/ui/Logo.tsx`.
- **Footer** (Phase 2): the 1px white/10 line is the bottom border of the column grid. The bottom
  bar's frame is 44px tall (28px top padding + 16px text), so the listed 28px bottom padding takes
  no space; the footer's own 40px bottom padding follows. Total height 377px.
- **Fluid headings** (Phase 3): heading styles grow from 360px to 1280px viewport width and are the
  exact spec size from 1280px up. Line heights are spec ratios, letter spacing is in em.
- **Exact image crops** (Phase 4; Figma custom crops, "stretch" in the spec). Photo position and
  size inside its box in the 1600px design. Coded in `src/lib/image-crops.ts` (`CroppedImage`):
  | Image | Box | Photo left / top / width x height |
  |---|---|---|
  | Home hero (`home-hero-team-meeting.jpg`) | 1600x1015 | 427 / -28 / 1226x1532 (left 26.7%, width 76.6%, 53px past the right edge) |
  | About split image (`office-open-space.jpg`) | 798x520 | 0 / -60 / 1061x641 (133% wide, left-aligned) |
  | Services hero (`hero-office-wide.png`) | 1600x1015 | 0 / 0 / 2707x1015 (fills the height, left-aligned, cut on the right) |

  All other images use a normal centred cover fill. The About crop is not proportional to the
  photo (1061x641 vs 1600x1068), so Figma squashes it slightly; the site fills that exact box with
  object-cover instead, without distortion.
- **Icons** (Phase 3), matched by comparing the spec's vector boxes with lucide's geometry:
  service cards = `network`, `workflow`, `chart-column`, `shield-check` (the screenshot shows a
  shield with a check, not a clipboard); support cards = `headphones`; "Learn More" =
  `arrow-up-right`; buttons and "Discover TechSalem" = `arrow-right`.
- **Home CTA ring** (Phase 3): the 384px ring is at x1600, y-160 relative to the banner, i.e.
  entirely outside it, so it is clipped and invisible, as in the approved screenshot.
- **Services layout notes** (Phase 5): the bento grid starts 62px above the end of the cloud
  perspective section (the cards overlap its bottom padding; white below). The "Next step" band is
  a 1200px grid (the 1136px inner width + 32px each side): the red panel ends at x1400 and the
  purple continues to the right. Inner-page heroes come in two layouts: `accent-bar` (About) and
  `simple` (Services, Support, Contact, Booking: red-square eyebrow, one square-cornered button).
- **Support layout notes** (Phase 6): the "How it works" block starts 11px before the 912px
  lavender section ends (no background of its own), so its content sits 117px below the lavender.
  Step rows have a top border only (no line under the last row). The FAQ has lines above the first
  question, between questions and below the last. The Support hero image is a plain centred cover
  fill (not the Services crop). Accordions (About capabilities, Support FAQ) share one component,
  `src/components/ui/Accordion.tsx`, with a variant per style.
- **Contact layout notes** (Phase 7): the "Let's talk" block has no section frame; it starts 139px
  below the hero and ends 89px above the split. The "Direct contact" split frame is 1630px wide and
  cut off at 1600px; the site builds what is visible (photo 814px = 50.875%, red panel to the screen
  edge). The hero button links to `#lets-talk` (same-page anchor). Separator grids (Home "Why",
  Contact steps) share `src/components/ui/SeparatedGrid.tsx`.
- **Booking notes** (Phase 8): the booking section starts 2px below the hero (top padding 130px).
  The 5 day columns are 105px with 8.5px gaps; slots 87x40 (44px tall on touch screens). Slot
  states not in the design: hover lavender, selected navy with white text, unavailable crossed out.
  The privacy note under the button (not in the design) makes the form box 32px taller (804px).
  Booking logic lives in `src/lib/booking/` (service interface + mock; see its README).
- **Text pages without a design** (Phase 9: Privacy, Cookies, 404): `SimplePageHeader` (navy band,
  the "simple" hero eyebrow, H1 in the 60px h2-xl style) and `Prose` (720px column, H2
  ExtraBold 24/32, H3 Bold 18/28, text 16/28 ink-muted, purple square list markers, bordered
  tables that scroll inside their wrapper on small screens). The Booking page stacks below `xl`.
