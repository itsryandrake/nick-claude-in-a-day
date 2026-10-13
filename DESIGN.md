# Design system

## Visual direction

This is an Ential working note for Nick. It uses a light editorial layout, bold black type and Ential orange. The delivery diagram is a real interactive explanation, while the DSQ and personal tracks use different compositions instead of repeated card rows. Space, background shifts and type establish sections without full-width divider rules.

## Brand and architecture assets

All logos are bundled locally. Every logo appears beside a text label. Logos inside labelled controls are decorative so assistive technology does not repeat the product name.

| Local asset | Source | SHA-256 | Note |
| --- | --- | --- | --- |
| `public/brand/ential-black.svg` | https://www.ential.com/images/brand/ential-black.svg | `7cb8b00b90fb9cdcc7334016282eddac57fbcd4b22cf6303140aac4d0dcade71` | Official Ential logo, used for Ential and the example live app |
| `public/brand/architecture/claude.svg` | https://cdn.simpleicons.org/claude | `5119ef950a0d648b3fd62865791e73f07f32e18ddab84e4f21160f8c641c0f5f` | Claude mark from Simple Icons |
| `public/brand/architecture/github.svg` | https://cdn.simpleicons.org/github | `476ba7aa67b86da7d6e7567b08a4bf0eb1a2fd28da5fc243f8ee39a2f1ea6773` | GitHub mark from Simple Icons |
| `public/brand/architecture/vercel.svg` | https://cdn.simpleicons.org/vercel | `075b9d221ef5a7ea63d85f140bd2d63007f31d3ed8ceec011abc3ffd529827e3` | Vercel mark from Simple Icons |
| `public/brand/architecture/godaddy.svg` | https://cdn.simpleicons.org/godaddy | `796a2af71b168ca9410eb5148f2ab39d2082c4c470c4b6822b46d2dfa4a21d12` | GoDaddy mark from Simple Icons |
| `public/brand/architecture/stripe.svg` | https://cdn.simpleicons.org/stripe | `7576775bf9915b696bbb9162268f5c56147d2b4221a76ac6a9ca92835239b7e9` | Stripe mark from Simple Icons |

Simple Icons assets are used under the Simple Icons CC0 1.0 license. Product names and marks remain the property of their owners.

## Tokens

- Ground: `#F7F6F2`
- Paper: `#FFFFFF`
- Ink: `#11100F`
- Muted: `#5B5752`
- Warm group: `#EEEAE2`
- Accent: `#F74603`
- Accent dark: `#BD3504`
- Soft accent: `#FFF0E9`
- Corners: 16px for main surfaces, 13px to 14px for controls and grouped content
- Typeface: Nunito Sans Variable with display tracking no tighter than `-0.04em`

## Layout

The page uses a 1320px frame. The opening pairs a direct note with the delivery diagram. The recap is a compact editorial list. The DSQ work track uses one large priority block and smaller supporting steps. The personal track centres the baby profile prototype, followed by finance, health and shared home areas. Models use three strong stacked surfaces. Below 1081px, the page becomes a single column.

## Interaction

Each architecture product is a native button with a visible selected state and `aria-pressed`. Selecting one updates a live detail region. The core path reads from Claude Code through GitHub and Vercel to the live app. GoDaddy DNS and optional Stripe checkout sit outside the core chain. Prompt controls copy complete prompts and confirm success in place.

## Copy rules

The page speaks directly to Nick in plain English. It avoids fake insight, inflated claims, fragments, decorative eyebrows and long dashes. Example baby values are labelled as examples. Prompts tell Claude to inspect the project first, preserve working behaviour, test changes, show assumptions and ask before external or irreversible actions.

## Motion and accessibility

One entrance sequence establishes the first viewport. Reduced motion removes it and smooth scrolling. The page uses semantic landmarks, a skip link, visible focus, 44px controls, keyboard-operable architecture buttons, accessible logo names, AA contrast and a 390px layout without horizontal overflow.
