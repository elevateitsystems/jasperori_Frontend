# TechSalem: image map (taken from the approved Figma file)

The image files live in `public/images`. This guide lives in `design/` so nothing but real assets is served from `public/`.
These are the original files embedded in the Figma file: not re-exported or compressed.

| File | Size | Used in |
|---|---|---|
| home-hero-team-meeting.jpg | 1024x1280 | Home: hero background |
| home-about-presentation.jpg | 1200x1024 | Home: "About TechSalem" image |
| office-open-space.jpg | 1600x1068 | About: hero background + image next to the red "What we believe" quote block, Booking: hero background |
| about-quote-office.jpg | 1800x1350 | About: "100%" image section (despite the file name) |
| hero-office-wide.png | 1920x720 | Services: hero background, Support: hero background |
| services-card-office.jpg | 1600x1200 | Services: "Expertise shaped around the context." card |
| hero-glass-meeting-rooms.png | 1920x720 | Contact: hero background |
| contact-glass-corridor.jpg | 1600x1068 | Contact: image next to the red "What happens next?" block |

## Overlays used in Figma (applied on top of the images)
- Home hero: linear gradient #172340 (100%) -> #2F2B6B (100%) -> #483397 (33%)
- About / Services / Support / Contact / Booking hero: linear gradient #5136A5 (100%) -> #5136A5 (0%)
  - Services hero also has an extra black layer at 20% opacity
- About "100%" image section (about-quote-office.jpg): linear gradient black 15% -> 0%
- Services card: linear gradient black 75% -> 10% -> 0% (bottom-up, for the white text)

Correction (6 Nov 2026): an earlier version of this table swapped the two About images. The rows above
follow `design/spec/about.md` (the "100%" section uses about-quote-office.jpg; the quote block uses
office-open-space.jpg), which matches the approved screenshot.

## Custom crops (exact, from Figma)
Photo position inside its box in the 1600px design (left / top / width x height). All other images
use a normal centred cover fill. Coded in `src/lib/image-crops.ts`.
- Home hero (box 1600x1015): 427 / -28 / 1226x1532
- About split image next to the quote (box 798x520): 0 / -60 / 1061x641
- Services hero (box 1600x1015): 0 / 0 / 2707x1015

Note: home-hero-team-meeting.jpg is only 1024px wide but covers a 1600px hero, so it will look a bit soft on large screens.

Wide screens and phones (Phase 10): from 1600px up, the Home and Services hero crops keep their
1600px size and stick to the right (Home) / left (Services) edge. On phones and tablets the Home hero
photo uses the focal point `68% 30%` (stored with the image in `src/content/*/home.ts`) so the
seated people stay in view. home-hero-team-meeting.jpg is shown at 1226px wide on desktop, so it is
upscaled about 1.2x (2.4x on retina screens) and looks soft at 1920 and 2560; a 2500px+ original
from the client would fix this.
