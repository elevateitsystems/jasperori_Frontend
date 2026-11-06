# TechSalem website – project rules

Read `AGENTS.md` as well. It is managed by Next.js and explains where to find the docs for the installed Next.js version, which may differ from what you remember.

## Project

- Website for TechSalem, a technology and business consulting firm based in Sweden.
- This repository is the frontend only. Another developer will connect a backend or CMS later, so keep content and logic easy to swap out.
- Project path: `/Users/samin/Desktop/mdwoalinur/jasperori_f073152d76fc7_250_webaura_1`
- Never create, change, move or delete files outside this project folder. The parent folder holds client documents that must stay untouched.

## Source of truth: the Figma design

- The client-approved Figma design is the only source of truth. Match it exactly: spacing, sizes, colors, typography and layout.
- Never invent new sections, components, styles or copy that are not in the design.
- Reference screenshots of the design are in the `design/` folder.
- If the design is unclear or something is missing, ask before guessing.

## Design basics

- Font: Manrope everywhere.
- Desktop design width: 1600px.
- Colors:
  - Navy: #17233F
  - Purple: #5136A5
  - Accent pink-red: #EF1747
  - Text: #09090B
  - Muted text: #555563
  - Light background: #F6F6F8
  - Lavender: #F0EDF8
  - White: #FFFFFF
- Gradients run from navy, through purple, to pink-red.
- Define colors, fonts and other design values once as Tailwind theme tokens and reuse them. Do not scatter raw hex values through components.

## Pages

- Home
- About
- Services
- Support (two support pages that share one template)
- Contact
- Booking
- Privacy policy
- Cookie policy

## Languages and content

- The site is in English (under `/en`) and Swedish (under `/sv`).
- Never write visible text directly in components. All text, link labels, alt text and image paths live in typed content files under `src/content`, with an English and a Swedish version, so a CMS can replace them later.
- Both languages must always have the same content structure.

## Images

- All site images live in `public/images`.
- Always render images with the Next.js Image component, with meaningful alt text (or empty alt text for purely decorative images).

## Code rules

- TypeScript in strict mode. No `any` unless there is no other option, and explain why when it is used.
- Server components by default. Use a client component only when interaction requires it, and keep it as small as possible.
- Build reusable components and place them in the right folder:
  - `src/components/layout` for header, footer and page shell
  - `src/components/sections` for page sections such as hero, CTA banner and contact strip
  - `src/components/ui` for small building blocks such as buttons, cards, accordion and inputs
  - `src/lib` for helpers, `src/types` for shared types, `src/i18n` for language routing and config
- Use semantic HTML (proper headings in order, landmarks, lists, buttons for actions, links for navigation).
- Accessibility: alt text on images, labels on every form field, visible keyboard focus, sufficient color contrast, and everything usable with a keyboard.
- Mobile-first responsive: build the small-screen layout first, then scale up to the 1600px desktop design.
- Styling uses Tailwind CSS. Combine conditional classes with the clsx and tailwind-merge helpers.
- Formatting is handled by Prettier (2 spaces, single quotes, semicolons, line width 100). Do not fight it by hand.
- Do not add new libraries unless the task asks for them.

## Workflow

- After every task, run lint, typecheck and build (and format check). Fix all errors and warnings before finishing.
- End every task with a short summary of the files that were added, changed or removed.
