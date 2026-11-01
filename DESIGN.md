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

## Add a confirmed WeChat QR / 添加本人确认的微信二维码

1. Obtain the **personal** WeChat QR code from the profile owner and confirm that they intend to publish it. Do not publish a work-team QR or a code from someone else.
2. Save the image as `assets/wechat-qr.png`. Avoid unrelated EXIF metadata if possible.
3. In `index.html` and `en/index.html`, replace the `.qr-placeholder` element with a proper `<img>` tag:
   - Chinese: `src="assets/wechat-qr.png"`
   - English: `src="../assets/wechat-qr.png"`
   - Add meaningful language-specific `alt`, and `width="126" height="126" loading="lazy"`.
4. Embed the approved image in both READMEs and change the placeholder text.
5. Open both pages and verify the QR can be scanned from a real phone.
6. If that code expires, remove or replace it promptly.

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

## Accessibility & QA

- Verify both locale pages with JavaScript disabled.
- Check at 320, 390, 768, 1024 and 1440 CSS-pixel widths for overflow and readability.
- Test the keyboard skip link, language controls and all project links.
- Check headings hierarchy, image alternative text and no dead contact links.
- Confirm the current viewport works with `prefers-reduced-motion` and browser zoom.
