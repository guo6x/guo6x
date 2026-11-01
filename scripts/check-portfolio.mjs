#!/usr/bin/env node
// Portfolio integrity checks: no npm dependencies, no network, no generated output.
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname, relative, extname } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (name) => readFileSync(resolve(root, name), "utf8");
const required = [
  "index.html", "en/index.html", "README.md", "README.en.md", "DESIGN.md",
  "assets/stellar-site.css", "assets/stellar-site.js",
  "assets/stellar-orbit.svg", "assets/stellar-banner.svg",
  "assets/project-rocket.svg", "assets/project-agent.svg",
  "assets/project-cad.svg", "assets/wechat-qr.svg", "assets/favicon.svg"
];
let failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
required.forEach((path) => check(existsSync(resolve(root, path)), "Missing: " + path));

for (const filename of ["index.html", "en/index.html"]) {
  const body = read(filename).replace(/<!--[\s\S]*?-->/g, "");
  const english = filename.startsWith("en/");
  const prefix = english ? "../" : "";
  const seen = [...body.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const anchors = new Set(seen);
  check(seen.length === anchors.size, filename + " contains duplicate IDs");
  for (const m of body.matchAll(/\bhref="#([^"]+)"/g)) {
    check(anchors.has(m[1]), filename + " invalid in-page anchor: #" + m[1]);
  }
  const refs = [...body.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(m => m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|#)/i.test(ref)) continue;
    const dest = resolve(dirname(resolve(root, filename)), ref);
    check(dest.startsWith(root), filename + " reference escapes root: " + ref);
    check(existsSync(dest), filename + " references missing file: " + ref);
  }
  check(body.includes('lang="' + (english ? "en" : "zh-CN") + '"'), filename + " wrong lang");
  check(body.includes('href="' + prefix + 'assets/stellar-site.css"'), filename + " missing CSS");
  check(body.includes('src="' + prefix + 'assets/stellar-site.js"'), filename + " missing JS");
  check(body.includes('src="' + prefix + 'assets/wechat-qr.svg"'), filename + " QR source missing");
  check(body.includes("https://u.wechat.com/"), filename + " QR contact link missing");
  check(body.includes('aria-current="page"'), filename + " missing current language");
  check(body.includes("aria-live="), filename + " filter live region missing");
  check(body.includes("aria-pressed="), filename + " filter button missing");
  check((body.match(/<h1\b/g) || []).length === 1, filename + " should have exactly one H1");
  check((body.match(/class="exhibit /g) || []).length === 3, filename + " featured exhibits should be 3");
  check((body.match(/class="mini-project"/g) || []).length === 9, filename + " mini projects should be 9");
  check((body.match(/class="proof-item"/g) || []).length === 3, filename + " evidence entries should be 3");
  for (const id of ["main", "mission", "work", "path", "evidence", "about", "contact"]) {
    check(anchors.has(id), filename + " missing content section: " + id);
  }
  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    check(/\balt="/.test(m[0]), filename + " has image without alt text");
    check(/\bwidth="/.test(m[0]) && /\bheight="/.test(m[0]), filename + " image is missing dimensions");
  }
  for (const m of body.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    check(/\brel="noopener noreferrer"/.test(m[0]), filename + " new tab link lacks safe rel");
  }
  console.log("Checked locale:", filename, "anchors:", anchors.size);
}

const css = read("assets/stellar-site.css");
check((css.match(/\{/g) || []).length === (css.match(/\}/g) || []).length, "CSS unmatched braces");
check(css.includes("prefers-reduced-motion"), "Reduced motion accessibility rule missing");
check(css.includes("max-width:420px"), "Small-mobile responsive breakpoint missing");
check(css.includes(":focus-visible"), "Focus-visible rule missing");
const js = read("assets/stellar-site.js");
check(js.includes("aria-pressed") && js.includes("requestAnimationFrame"), "Expected accessible interactions missing");

for (const md of ["README.md", "README.en.md"]) {
  const s = read(md);
  check(s.includes("assets/stellar-banner.svg"), md + " outdated profile banner");
  check(s.includes("assets/wechat-qr.svg"), md + " QR missing");
  check(s.includes("u.wechat.com/"), md + " direct contact missing");
  check(s.includes("README.en.md") && s.includes("README.md"), md + " reciprocal language links missing");
}

for (const svg of ["stellar-orbit", "stellar-banner", "project-rocket", "project-agent", "project-cad", "wechat-qr", "favicon"]) {
  const s = read("assets/" + svg + ".svg");
  check(s.trim().startsWith("<svg") && s.trim().endsWith("</svg>"), svg + ".svg malformed envelope");
  check(!/<script\b|onload=|onerror=/i.test(s), svg + ".svg unexpected executable content");
}

if (failures.length) {
  failures.forEach((error) => console.error("FAIL:", error));
  process.exitCode = 1;
} else {
  console.log("PASS: bilingual portfolio assets and content integrity (" + required.length + " files).");
}
