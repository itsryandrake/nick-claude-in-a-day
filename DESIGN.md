# Design system

## Visual direction

An Ential working note for Nick. The page uses a crisp light editorial surface, bold black sans-serif type and one saturated orange accent. The interactive delivery flow is the first viewport's visual focus. The design avoids dark AI styling, neon, glass, decorative grids and repeated card layouts.

## Brand assets and provenance

- Local logo: `public/brand/ential-black.svg`
- First-party source: https://www.ential.com/images/brand/ential-black.svg
- Retrieved from the official Ential website for this project.
- SHA-256: `7cb8b00b90fb9cdcc7334016282eddac57fbcd4b22cf6303140aac4d0dcade71`

## Tokens

- Ground: `#F7F6F2`
- Paper: `#FFFFFF`
- Ink: `#11100F`
- Muted: `#5B5752`
- Accent: `#F74603`
- Accent dark: `#C83300`
- Soft accent: `#FFF0E9`
- Corners: 14px for major surfaces, 12px for interactive nodes
- Typeface: Nunito Sans Variable with tight display tracking

## Layout

The page uses a 1320px frame. Desktop opens with a split composition: direct note to Nick on the left and the working delivery flow on the right. Later sections change rhythm between sticky editorial lists, a dark model panel, a three-part linear method and a source index. Below 901px the page becomes a strict single column.

## Interaction

The architecture flow is the signature interaction. Build path: Claude Code to GitHub to Vercel to the app. Domain path: GoDaddy DNS points to Vercel. Selecting any node updates one stable detail region. The selected state uses border, fill and `aria-pressed`.

## Motion

One entrance sequence establishes hierarchy in the hero. Hover and active movement provide direct feedback. Reduced-motion mode removes the entrance and smooth scrolling while preserving every state.

## Accessibility

Semantic landmarks, a visible skip link, strong focus rings, keyboard-operable node buttons, 44px minimum controls, AA contrast and responsive reading order are required. The logo has intrinsic dimensions to prevent layout shift.
