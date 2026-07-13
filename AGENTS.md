# AGENTS.md

## Project

### Product

Papelera El Clan is a static Spanish-language commercial landing page.

- `index.html` and `styles.css`: static page and responsive presentation.
- `assets/`: brand and browser assets.
- `tools/check-site-data.mjs`: business-data drift check.

## Source of truth

### Business data

- `assets/site-data.js`: source of truth for repeated business data.
- `assets/site-render.js`: applies that data while preserving readable HTML fallbacks.

## Project rules

### Local rules

- Keep visible UI copy in natural Spanish Unicode. Preserve accents, punctuation, brand spelling, and verified business text exactly.
- Use README, versioned data, or user confirmation for business facts. Do not invent products, benefits, schedules, service areas, shipping terms, ratings, or contact details.
- Edit repeated phone, WhatsApp, address, hours, social, Maps, rating, and commercial values in `assets/site-data.js`.
- Keep `data-site-*` bindings and readable HTML fallbacks synchronized.
- Preserve confirmed categories, identity, assets, accessibility, and simple responsive structure; do not add unverified products.
- Keep direct `index.html` opening and static Vercel `Other` deployment functional.
- Do not add frameworks, package managers, build steps, or dependencies unless explicitly requested.

## Validation

### Site checks

```sh
node tools/check-site-data.mjs
```

- Run it after changing HTML, bindings, or business data.
- For visual or content changes, open `index.html` and check responsive layout, links, fallbacks, semantics, image alternatives, labels, and meta description.
