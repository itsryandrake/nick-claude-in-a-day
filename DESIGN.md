# Design system

## Visual direction

This is a concise Ential project note for Nick. It is flat, editorial and easy to scan. The page uses headings, short paragraphs, lists, whitespace and a few fine rules. It does not use cards, nested panels, dashboard surfaces or decorative effects.

## Brand and local assets

The page uses the official Ential logo and locally bundled product marks. Every meaningful logo appears next to a text name. Decorative instances have empty alt text.

### Architecture marks

| Local asset | Source | SHA-256 |
| --- | --- | --- |
| `public/brand/ential-black.svg` | https://www.ential.com/images/brand/ential-black.svg | `7cb8b00b90fb9cdcc7334016282eddac57fbcd4b22cf6303140aac4d0dcade71` |
| `public/brand/architecture/claude.svg` | https://cdn.simpleicons.org/claude | `5119ef950a0d648b3fd62865791e73f07f32e18ddab84e4f21160f8c641c0f5f` |
| `public/brand/architecture/github.svg` | https://cdn.simpleicons.org/github | `476ba7aa67b86da7d6e7567b08a4bf0eb1a2fd28da5fc243f8ee39a2f1ea6773` |
| `public/brand/architecture/vercel.svg` | https://cdn.simpleicons.org/vercel | `075b9d221ef5a7ea63d85f140bd2d63007f31d3ed8ceec011abc3ffd529827e3` |
| `public/brand/architecture/godaddy.svg` | https://cdn.simpleicons.org/godaddy | `796a2af71b168ca9410eb5148f2ab39d2082c4c470c4b6822b46d2dfa4a21d12` |
| `public/brand/architecture/supabase.svg` | https://cdn.simpleicons.org/supabase | `75f9566421d97d4f1d8d7f34526189fd6e727ca83987432fc2477c2fc8388086` |

### Reference marks

| Local asset | Source | SHA-256 |
| --- | --- | --- |
| `public/brand/resources/skills.ico` | https://www.skills.sh/favicon.ico | `2b8ad2d33455a8f736fc3a8ebf8f0bdea8848ad4c0db48a2833bd0f9cd775932` |
| `public/brand/resources/taste.webp` | https://www.tasteskill.dev/favicon.webp | `0f9fa6f6fa0809fd5bb082647f5436dafd0513b92a290822302f38811e616a7e` |
| `public/brand/resources/impeccable.svg` | https://impeccable.style/favicon.svg | `dd7cc348f73d7294c0f16952f0cc8b6ba7f91b1146ca86bc11b01d1ef35cd8d4` |
| `public/brand/resources/variant.svg` | Official inline wordmark from https://variant.com/ with ink colour adapted for contrast | `c68e888edf7a631251e7438e00c49a4ed5b409e48554551af4052888c2b97538` |
| `public/brand/resources/dribbble.svg` | https://cdn.simpleicons.org/dribbble | `926b5cd2fc268d5beba023b089df83b1de315120c40bbea9ad9c87d2ce97ac6e` |
| `public/brand/resources/behance.png` | https://a5.behance.net/147f79687135c45fdce603559ea41869c391449f/img/site/favicon.png | `2c5dcad0a8cc6185e08de16cb0780642995aaf24a8c9cc609797c4911bc0b8fa` |
| `public/brand/resources/wispr-flow.png` | https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/6a840664d12190f8ec4ab592_flow-favicon.png | `82b1bf7d4a64df3f0f9bc6e77c264a44ace39a250e80c1203b608fac76c4470a` |

Simple Icons assets use the Simple Icons CC0 1.0 licence. Product names and marks remain the property of their owners.

## Tokens

- Ground: `#F7F6F2`
- Ink: `#11100F`
- Muted: `#5B5752`
- Rule: `#D8D3CB`
- Accent: `#F74603`
- Accent dark: `#BD3504`
- Typeface: Nunito Sans Variable

## Layout

The reading frame is 1120px wide. Major sections use a narrow heading column and a wider content column. The architecture section is one interactive SVG map: laptop and desktop push to and pull from GitHub, Vercel deploys the website, Supabase stores its data and GoDaddy points the domain. Step buttons and clickable nodes swap a plain explanation below the map. On narrow screens the map scrolls sideways. Work and Personal share two plain columns. Prompts, models and references are rows separated by rules.

## Interaction and accessibility

Copy buttons and the map step buttons are the only repeating controls. Each prompt carries a small looping SVG illustration that is hidden from assistive tech. They confirm success in place and expose a live status message. The page uses semantic landmarks, visible focus, 44px controls, local assets, WCAG AA contrast and a 390px layout without horizontal overflow. Reduced motion removes the page entrance, the map packets and the prompt illustrations' movement.

## Copy rules

The page speaks directly to Nick in short, natural sentences. It uses no long dashes, inflated claims, decorative labels or sales language. Prompts are written in Nick's own voice (first person) because he pastes them. They inspect the repo first, preserve working behaviour, propose a data model and UI, add tests, protect sensitive data and ask before external or irreversible actions.
