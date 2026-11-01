# Design & maintenance / 设计与维护说明

## Purpose / 目标

Public profile and portfolio for Jiaji Guo (郭家吉), an aircraft manufacturing engineering undergraduate working across AI software and aerospace experiments.

**Audience:** open-source collaborators, engineering teams, researchers, potential product partners, and interested international visitors.

**Brand direction:** aerospace mission log — original technical orbit diagram, deliberately restrained deep-space blues, readable typography, and evidence-qualified engineering content.

This is a personal portfolio **not** an academic appointment, certified aerospace product catalogue, or a promise that physical-flight testing has been completed.

## Site map / 文件

- `README.md` — GitHub profile, Chinese.
- `README.en.md` — full English GitHub profile.
- `index.html` — Chinese static portfolio landing page.
- `en/index.html` — English static portfolio landing page.
- `assets/site.css` — shared styles and responsive breakpoints.
- `assets/mission-orbit.svg` — original vector illustration; it represents a concept, not hardware/flight evidence.
- `assets/favicon.svg` — original site mark.

The site has **no build step, npm dependency, externally loaded JS, external image dependency, cookie, analytics tracker, or external web font**. Language switching uses ordinary links, so both versions are indexable and usable without JavaScript.

## External design references / 借鉴的开源 Skills

Ideas adapted, not copied verbatim or presented as endorsements:

- [Anthropic · frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) — subject-specific visual language, memorable hero, typography, and avoidance of generic card-grid templates.
- [Vercel Labs · web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) — semantic HTML, focus-visible states, predictable navigation, viewport responsiveness, performance, legible copy and accessible locale links.
- [Awesome GitHub Profile README gallery](https://github.com/astra-intelligence/awesome-github-profile-readme-1) — profile hierarchy, discoverability and short project summaries.

We do not include or ship third-party skill code. Copy and assets are original.

## Published WeChat contact / 已上线的微信入口

**Owner-approved as of 2026-11-01:** the owner supplied their personal WeChat QR screenshot and explicitly asked for it to be embedded publicly.

- `assets/wechat-qr.svg` contains a compact, original vector rendering of the **same decoded WeChat contact URL** (no avatar, region text or profile screenshot metadata).
- The original screenshot and its cropped derivative are **not** published. Only the QR payload and the approved public contact URL are used.
- Both `index.html` and `en/index.html` embed the SVG using correct relative paths and provide a direct mobile-friendly WeChat contact link.
- Both GitHub READMEs include a linked SVG QR code; do not publish an unapproved WeChat ID, phone number or any extra social usernames.
- Local verification: the supplied screenshot decoded to the same link; the vector was rendered at 166, 190, 220 and 600 pixels and programmatically decoded successfully at each size.
- **Not yet verified:** physical handset scan and the live deployed website. Test both before claiming end-to-end production validation.
- The WeChat contact URL or QR may expire or change. If that happens, ask the owner for a current screenshot, verify the decoded value, regenerate SVG, update bilingual pages and retest scanning.

## Add verified public social links / 社交平台入口

Add exact public URLs to the contact area in both pages and to the contact sections of both READMEs. No guessing usernames; never put a personal phone number on a public page without approval.

## Deployment

This repository contains static HTML compatible with GitHub Pages. If GitHub Pages is not enabled:

1. In the repository **Settings → Pages**, use **Deploy from a branch**.
2. Set **main** and **/(root)** and save.
3. Once GitHub reports a public Pages URL, open it and verify both the root and `/en/` pages; do not assume deployment succeeded because a commit exists.

For a project site the likely Pages path is `https://guo6x.github.io/guo6x/`, but do not advertise it until GitHub confirms it is live.

## Editorial rules / 内容真实性

- Project validation states must be supported by source repositories, not inferred from aspirations.
- No false metrics (revenue, users, launches, certification, flight tests, GitHub stars).
- Keep private projects described at a high level; do not expose code or confidential engineering constraints.
- Distinguish **software tests**, **simulation**, **physical bench tests**, and **flight qualification**.
- Update both languages together whenever projects, contact info or affiliation changes.
- Avoid posting sensitive financial details, partner information, or personal travel data in the portfolio.

## Review & next improvements / 复盘与下一步

### Completed in this iteration

- Actual, owner-approved WeChat QR replaces the nonfunctional placeholder in both locales and both READMEs.
- Mobile visitors can also tap a direct contact link rather than attempting to scan their own screen.
- QR modules have the original contact data, high contrast, a four-module quiet zone and a scalable format.
- A three-item **Engineering Evidence** area links to real public source documentation for AI Rocket, Omni-Context and FlowBreak, including limitations rather than marketing-only claims.

### Remaining acceptance gates (not claimed as completed)

1. **P0 · Live site:** Confirm GitHub Pages has been enabled and the real Chinese and English pages are reachable. If needed, go to Settings → Pages and select main/(root); check the actual published URL. Never equate a GitHub commit with a deployed webpage.
2. **P0 · Human scan:** Test the published QR with a separate phone using WeChat and test direct contact links on Android and iOS. Programmatic QR decode does not prove the WeChat application accepts the link.
3. **P1 · Browser visual QA:** Use a real browser and screenshots at 320/390/768/1024/1440px, check overflow and correct page language, test keyboard navigation, color contrast and social link behavior.
4. **P1 · Authentic product demos:** Add selected, owner-approved real photos, screenshots, reproducible demonstrations and short outcome-focused case studies; avoid invented metrics or polished mockups that imply hardware has been tested.
5. **P1 · Social verification:** Add only actual verified Bilibili/WeChat Official Account/Xiaohongshu/other social URLs. Decide which accounts genuinely need public exposure.
6. **P2 · Distribution:** Consider a custom domain and a photographic/project-specific share image compatible with social preview crawlers once actual site publication is confirmed. Current SVG-based branding may not be used as an OG preview by every platform.
7. **P2 · Outcome evidence:** Add user feedback, released builds, external collaborations or verified impact only when independently substantiated.

### Design critique

The core narrative and bilingual consistency are now substantially clearer, but the profile still depends too heavily on words and a conceptual orbit image. The strongest next enhancement would be **real evidence-rich project stories**, not more animation, glow, badges or generic technical claims. Project count is not the same as proof of impact.

## Accessibility & QA

- Verify both locale pages with JavaScript disabled.
- Check at 320, 390, 768, 1024 and 1440 CSS-pixel widths for overflow and readability.
- Test the keyboard skip link, language controls and all project links.
- Check headings hierarchy, image alternative text and no dead contact links.
- Confirm the current viewport works with `prefers-reduced-motion` and browser zoom.
