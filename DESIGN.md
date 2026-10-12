# Design system

## Visual direction

A calm technical folio. The drafting grid is functional only where the delivery architecture appears. The rest of the page uses open space, measured rules and asymmetric editorial rhythm.

## Tokens

- Ground: `#edf4f7`
- Paper: `#f8fbfc`
- Ink: `#10223a`
- Muted: `#42586b`
- Accent: `#176f9f`
- Soft accent: `#dceef6`
- Corners: 14px for interactive containers; circles only for timeline markers
- Typeface: Nunito Sans Variable, with tabular numerals for sequence labels

Dark mode uses the same cool blue family with light text and a brighter blue accent.

## Layout

The page uses a 1240px content frame, asymmetric hero, staggered outcome track, interactive architecture canvas, two-column Skills/model split, linear subagent sequence and paired reference links. Mobile layouts become a strict single column below 768px.

## Interaction

The architecture node is the signature interaction. Selecting a node updates one stable detail region. Hover lifts nodes by 3px; active state is communicated by border, fill and `aria-pressed`, not color alone.

## Motion

One authored entrance settles the hero from a small blur and clip. All other movement is direct interaction feedback. `prefers-reduced-motion` removes authored animation and smooth scrolling.

## Accessibility

Semantic landmarks, visible skip link and focus rings, keyboard-operable node buttons, descriptive diagram text, minimum 44px controls, AA-oriented tokens and responsive reading order are required.
