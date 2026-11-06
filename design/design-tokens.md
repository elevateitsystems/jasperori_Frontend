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
| zinc-950 (text) | #09090B | Main body text |
| ink-muted | #555563 | Secondary text, paragraphs |
| ink-soft | #4A4C56 | Section intro paragraph (Home services) |
| cloud (light bg) | #F6F6F8 | Light section backgrounds, EN/SV switch track |
| lavender | #F0EDF8 | Light purple card / section backgrounds |
| line | #E6E7EE | Large faded numbers ("01", "02"), light dividers |
| white | #FFFFFF | |

Nav links: navy at 75% opacity. Card borders: black at 10% opacity.

## Gradients
- **Home hero overlay** (on top of the photo): linear #172340 0% → #2F2B6B 50% → #483397 at 33% opacity, 100%
- **Inner-page hero overlay** (About, Services, Support, Contact, Booking): linear #5136A5 100% → #5136A5 0%. Services adds black at 20% on top.
- **Hero accent bar** (4×112px vertical bar next to the hero text): #7D4090 → #EF1747
- **Brand gradient** (Home "Let's build what's next" CTA): navy #17233F → purple #5136A5 → red #EF1747
- **Image text-protection** (Services image card): black 75% → 10% → 0% from the bottom up
- **About quote image**: black 15% → 0%

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
