#!/usr/bin/env node
// Exercise the actual README gate; no dependency, duplicate linter or Git history required.
// Run from any directory: node scripts/test-readme.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const load = file => readFileSync(resolve(root, file), 'utf8');
const names = ['README.md', 'README.en.md'];
const docs = Object.fromEntries(names.map(file => [file, load(file)]));
const source = load('scripts/check-portfolio.mjs');
const begin = source.indexOf('for (const md of ["README.md", "README.en.md"]) {');
const end = source.indexOf('\nfor (const svg of ', begin);
assert(begin >= 0 && end > begin, 'Could not isolate the actual README gate');
const compiled = new vm.Script(source.slice(begin, end), { filename: 'actual-readme-gate.mjs' });
function run(data) {
  const failures = [];
  compiled.runInNewContext({ read: name => data[name], check: (ok, message) => {
    if (!ok) failures.push(message);
  } }, { timeout: 1000 });
  return failures;
}
let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log('PASS:', name);
}
function mutation(name, file, transform, expected) {
  test(name + ' [' + file + ']', () => {
    const next = transform(docs[file]);
    assert.notEqual(next, docs[file], 'Mutation did not alter fixture');
    const failures = run({ ...docs, [file]: next });
    assert(failures.some(message => message.includes(file) && message.includes(expected)),
      'Expected diagnostic ' + expected + ', got: ' + JSON.stringify(failures));
  });
}
const changeRow = (s, transform) => s.split('\n').map(line =>
  line.startsWith('| **LocalMiniDrama** |') ? transform(line) : line).join('\n');

test('Fixed bilingual README gate passes', () => assert.deepEqual(run(docs), []));
test('Reintroduced original defects fail: three escapes and two merged rows', () => {
  const bad = Object.fromEntries(names.map(file => [file,
    docs[file].replace('\n| **LocalMiniDrama**', '\\n| **LocalMiniDrama**')]));
  bad['README.md'] = bad['README.md'].replace('\n\n*Engineering first.', '\n\\n*Engineering first.');
  assert.notEqual(bad['README.md'], docs['README.md']);
  const failures = run(bad);
  assert.equal(failures.filter(x => x.includes('literal newline escape')).length, 3);
  assert.equal(failures.filter(x => x.includes('three non-empty cells')).length, 2);
  for (const file of names) assert(failures.some(x => x.includes(file) && x.includes('standalone row for LocalMiniDrama')));
});
for (const file of names) {
  mutation('Literal newline in prose', file, s => 'Broken\\nparagraph\n\n' + s, 'literal newline escape');
  mutation('Literal CRLF in prose', file, s => 'Broken\\r\\nparagraph\n\n' + s, 'literal newline escape');
  mutation('Two rows glued with a literal newline', file,
    s => s.replace('\n| **LocalMiniDrama**', '\\n| **LocalMiniDrama**'), 'literal newline escape');
  mutation('Two rows glued without escape text', file,
    s => s.replace('\n| **LocalMiniDrama**', '| **LocalMiniDrama**'), 'three non-empty cells');
  mutation('Extra table column', file, s => changeRow(s, l => l + ' Extra |'), 'three non-empty cells');
  mutation('Missing table column', file,
    s => changeRow(s, l => l.split('|').slice(0, -2).join('|') + '|'), 'three non-empty cells');
  mutation('Empty table cell', file,
    s => changeRow(s, l => { const parts = l.split('|'); parts[2] = ' '; return parts.join('|'); }), 'three non-empty cells');
  mutation('Invalid delimiter row', file,
    s => s.replace('| --- | --- | --- |', '| text | --- | --- |'), 'invalid project table delimiter');
  mutation('Missing delimiter row', file,
    s => s.replace('| --- | --- | --- |\n', ''), 'invalid project table delimiter');
  mutation('Two-column table header', file,
    s => s.replace(/^\| (?:项目|Project) .*$/m, '| Name | Status |'), 'three non-empty cells');
  mutation('Blank line splits table', file,
    s => s.replace('\n| **LocalMiniDrama**', '\n\n| **LocalMiniDrama**'), 'project table rows must be contiguous');
  mutation('Lost trailing pipe', file, s => changeRow(s, l => l.slice(0, -1)), 'three non-empty cells');
  mutation('Duplicate LocalMiniDrama row', file, s => changeRow(s, l => l + '\n' + l), 'standalone row for LocalMiniDrama');
  mutation('Deleted LocalMiniDrama row', file,
    s => s.split('\n').filter(l => !l.startsWith('| **LocalMiniDrama** |')).join('\n'), 'standalone row for LocalMiniDrama');
  mutation('Deleted dsh-pilot row', file,
    s => s.split('\n').filter(l => !l.startsWith('| **[dsh-pilot]')).join('\n'), 'standalone row for dsh-pilot');
  mutation('Missing project heading', file,
    s => s.replace(file === 'README.md' ? '## 精选项目' : '## Selected work', '## Removed section'), 'project section missing');
  test('Legitimate code examples and comments are exempt [' + file + ']', () => {
    const appendix = '\nExample `\\n` and ``code ` \\r\\n``.\n'
      + '\n```js\nconst x = "\\n";\n| fake | table | ignored |\n```\n'
      + '\n~~~~text\n\\r\\n\n~~~\n\\n\n~~~~\n'
      + '\n<!-- intentionally show \\n in a comment -->\n';
    assert.deepEqual(run({ ...docs, [file]: docs[file] + appendix }), []);
  });
  test('Escaped pipe in a table cell is valid [' + file + ']', () => {
    const next = changeRow(docs[file], l => l.replace(' | ', ' | A \\| B '));
    assert.deepEqual(run({ ...docs, [file]: next }), []);
  });
  test('Aligned delimiter cells are valid [' + file + ']', () => {
    const next = docs[file].replace('| --- | --- | --- |', '| :--- | :---: | ---: |');
    assert.deepEqual(run({ ...docs, [file]: next }), []);
  });
  test('Real CRLF line endings remain valid [' + file + ']', () => {
    assert.deepEqual(run({ ...docs, [file]: docs[file].replaceAll('\n', '\r\n') }), []);
  });
  test('Additional real project rows remain valid [' + file + ']', () => {
    const next = docs[file].replace('\n| **LocalMiniDrama**', '\n| NewProject | Details | Prototype |\n| **LocalMiniDrama**');
    assert.deepEqual(run({ ...docs, [file]: next }), []);
  });
}
console.log(JSON.stringify({ passed, failed: 0, scope: 'actual README gate; no browser or deployment assertion' }));
