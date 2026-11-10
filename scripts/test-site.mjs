import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../assets/stellar-site.js', import.meta.url), 'utf8');
function mount(lang) {
  const projects = ['software', 'hardware', 'software hardware'].map(category => ({ dataset: { category }, hidden: false }));
  const filters = ['all', 'software', 'hardware'].map(filter => ({ dataset: { filter }, attributes: {}, setAttribute(key, value) { this.attributes[key] = value; }, addEventListener(_, handler) { this.click = handler; } }));
  const progress = { style: {} }, live = {}, group = { hidden: true };
  const root = { lang, get scrollHeight() { return 1000 + 400 * projects.filter(p => !p.hidden).length; } };
  const window = { innerHeight: 500, scrollY: 250, addEventListener() {} };
  const document = { documentElement: root, querySelector: s => s === '.top-progress' ? progress : s === '.filters' ? group : null,
    querySelectorAll: s => s.startsWith('.filter[') ? filters : s.startsWith('.mini-project') ? projects : [], getElementById: () => live };
  vm.runInNewContext(source, { document, window, requestAnimationFrame: callback => callback() });
  return { projects, filters, progress, live, group, root, window };
}
for (const lang of ['zh-CN', 'en']) {
  test(`${lang}: filtering refreshes progress without a scroll/resize event`, () => {
    const h = mount(lang), before = h.progress.style.transform;
    assert.equal(h.group.hidden, false);
    h.filters[1].click();
    assert.deepEqual(h.projects.map(p => p.hidden), [false, true, false]);
    assert.equal(h.live.textContent, lang === 'en' ? '2 projects shown' : '已显示 2 个项目');
    assert.deepEqual(h.filters.map(f => f.attributes['aria-pressed']), ['false', 'true', 'false']);
    assert.notEqual(h.progress.style.transform, before);
    assert.equal(h.progress.style.transform, 'scaleX(' + 250 / (1800 - 500) + ')');
    h.filters[0].click();
    assert.equal(h.progress.style.transform, before);
    assert.equal(h.projects.every(p => !p.hidden), true);
  });
}
