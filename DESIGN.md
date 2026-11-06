# Portfolio design and publishing guide

This repository serves two distinct surfaces: a **GitHub profile README** and a **bilingual static portfolio**. It is a personal, evidence-aware engineering journal, not a flight-qualified product website.

## Design direction: aerospace editorial × engineering evidence

The brand is built around one visual idea: **an aspirational orbital mission map**, paired with documented engineering work. Use deliberate visual hierarchy rather than a collection of interchangeable SaaS cards.

**Palette:** deep navy `#030b15`, abyss `#071425`, ice white `#f2f8ff`, cyan `#91dfff`, muted technical blue `#8aa9c1`, cautious amber `#e2c997`. Cyan identifies a primary action or verified navigational target; amber signals validation status and boundaries.

**Typography:** a Chinese serif display family (Noto Serif SC / Source Han Serif SC with fallbacks) for the mission statements; Georgia for English display; restrained CJK-friendly sans serif for body text. Monospace appears only for useful engineering metadata.

**Layout rhythm:** a cinematic full-width hero, editorial statement, three asymmetrical project exhibits with **original conceptual diagrams**, grouped smaller projects with **actual category filters**, an evolving multi-stage path, explicit evidence links, a grounded personal timeline and a large contact zone with verified WeChat QR.

**Motion:** one hero entrance and action-driven interactions. No perpetual particle simulation, autoplay audio or attention-hijacking animations; honor reduced-motion preferences.

## Files

- `index.html`: complete Chinese portfolio.
- `en/index.html`: complete English portfolio; both versions share section order.
- `assets/stellar-site.css`: shared responsive visual system.
- `assets/stellar-site.js`: tiny progressive-enhancement script for filters, page progress and active navigation.
- `assets/stellar-orbit.svg`: concept illustration for the North Star, **not actual flight data**.
- `assets/project-{rocket,agent,cad}.svg`: project-specific original concept diagrams; no claim of actual manufactured CAD.
- `assets/stellar-banner.svg`: GitHub profile art shared by both READMEs.
- `assets/wechat-qr.svg`: approved personal contact QR; always keep the SVG data unchanged unless the owner supplies a new one.
- `scripts/check-portfolio.mjs`: no-dependency integrity checker, including README line-break and three-column table validation.
- `scripts/test-readme.mjs`: 44 regression cases exercising the actual README gate, including reintroduced defects and valid code examples.
- `.github/workflows/profile-quality.yml`: static checks for PRs and pushes.
- `README.md`, `README.en.md`: bilingual GitHub profile narratives.

## Open-source design inspirations

These are sources for workflow and interaction ideas, **not copied UI templates** and not dependencies of this site.

- [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md): strong visual direction, typography, hierarchy, meaningful layouts and anti-template self-critique.
- [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills): focus states, accessible motion, responsive behavior, meaningful controls and performance review.
- [React Bits](https://github.com/DavidHDev/react-bits): studied ideas for background composition and purposeful interaction; the site uses original CSS/JS instead of importing its React components.
- [Motion Primitives](https://github.com/ibelick/motion-primitives): studied fine-grained transitions and restraint; no React dependency is bundled.
- [Magic UI portfolio](https://github.com/magicuidesign/portfolio): studied portfolio narrative and project discoverability, without copying assets or site implementation.

Each source has its own license. This site intentionally ships independent, original HTML/CSS/JS/SVG and retains no third-party source snippets.

## Engineering accuracy policy

- Clearly distinguish **software tests**, **simulations**, **bench evidence**, **manufacturing approval**, and **flight qualification**.
- Do not invent customers, revenue, social handles, publications, certification, number of launches, downloads, usage counts or benchmark results.
- All public URLs must be verified. Private projects stay high-level and should not expose confidential code, keys, financial accounts or physical safety assumptions.
- Show approved early-stage personal hardware topics only as exploratory concepts.
- The QR code is the owner's approved personal WeChat contact. Publicly showing it intentionally enables strangers to reach the owner. If it expires, replace it after owner confirmation and retest the target URL.
- Keep both languages substantively aligned; check that any change to project status appears in both.

## Acceptance and deployment gates

1. Run `node --check assets/stellar-site.js`, `node scripts/check-portfolio.mjs` and `node scripts/test-readme.mjs`. Work directly on `main`; do not create branches or force-push.
2. Verify the new visual site in **real browsers**, especially 320, 390, 768, 1024 and 1440 CSS pixels, with actual screenshots and keyboard navigation. A static check is not a browser screenshot test.
3. Verify project references open the intended public repository and referenced evidence.
4. Verify WeChat QR scanning in the actual WeChat client (ideally two separate devices). Programmatic decoding cannot guarantee app behavior.
5. Confirm GitHub Pages has **actually** been enabled and the published root and English URLs load. A merged commit does not prove deployment. If needed select `main / (root)` in repository Settings → Pages.
6. When real project screenshots or videos are available and owner-approved, replace some concept visuals with authentic demonstrations and concise case studies, including validation boundaries.

This repository intentionally has no build pipeline or npm dependency for the published site. JavaScript is progressive enhancement; basic content, project links and contact methods remain usable without it.

## Responsive acceptance details

Compare document scroll width with `document.documentElement.clientWidth`, not just `window.innerWidth`: classic desktop scrollbars reduce the available width. Inspect heading text ranges and screenshots as well, because clipped containers can hide overflowing text. Verify 320, 360, 390, 768, 1024 and 1440 CSS-pixel viewports in both languages. Mobile navigation must remain available, and project filters must stay hidden when JavaScript is disabled.
