import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDir, '../..');
const rendererSource = readFileSync(path.join(repoRoot, 'public/medical-records/report-v3-renderer.js'), 'utf8');
const cssSource = readFileSync(path.join(repoRoot, 'public/medical-records/report-renderer.css'), 'utf8');
const clone = (value) => JSON.parse(JSON.stringify(value));
const fixture = (name) => JSON.parse(readFileSync(path.join(testDir, 'fixtures', name), 'utf8'));
const completeReport = () => fixture('complete.synthetic.json').report;
const negative = fixture('negative-cases.synthetic.json');

class FakeNode {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.className = '';
    this.textContent = '';
    this.attributes = {};
    this.replaceCount = 0;
  }
  append(...items) {
    items.filter(Boolean).forEach((item) => {
      item.parent = this;
      this.children.push(item);
    });
  }
  appendChild(item) {
    item.parent = this;
    this.children.push(item);
    return item;
  }
  replaceChildren(...items) {
    this.replaceCount += 1;
    this.children = [];
    this.append(...items);
  }
  setAttribute(name, value) { this.attributes[name] = String(value); }
}

function loadRenderer() {
  const document = {
    head: new FakeNode('head'),
    currentScript: { src: 'https://preview.invalid/medical-records/report-v3-renderer.js' },
    createElement: (tag) => new FakeNode(tag)
  };
  const window = { location: { href: 'https://preview.invalid/medical-records/' } };
  const context = { window, document, URL, URLSearchParams };
  vm.runInNewContext(rendererSource, context);
  return { renderer: window.MediMatchReportV3Renderer, document, window };
}

function allText(node) {
  return [node.textContent || '', ...node.children.map(allText)].join(' ');
}
function byClass(node, className) {
  const own = String(node.className || '').split(/\s+/).includes(className) ? [node] : [];
  return [...own, ...node.children.flatMap((child) => byClass(child, className))];
}
function byTag(node, tagName) {
  const own = node.tagName === tagName.toUpperCase() ? [node] : [];
  return [...own, ...node.children.flatMap((child) => byTag(child, tagName))];
}
function chapters(root) { return byClass(root, 'mmr-v3-chapter'); }
function doctorChapter(root) {
  return chapters(root).find((item) => item.attributes['data-chapter'] === 'matched_doctors');
}
function renderReport(report, renderer) {
  const loaded = renderer ? { renderer } : loadRenderer();
  const container = new FakeNode('div');
  const result = loaded.renderer.renderV3(container, report);
  return { result, container, root: container.children[0], renderer: loaded.renderer };
}
function assertRejected(report, renderer) {
  const loaded = renderer ? { renderer } : loadRenderer();
  const container = new FakeNode('div');
  const sentinel = new FakeNode('p');
  sentinel.textContent = 'LEGACY FALLBACK SENTINEL';
  container.appendChild(sentinel);
  assert.equal(loaded.renderer.renderV3(container, report), false);
  assert.equal(container.replaceCount, 0);
  assert.equal(container.children.length, 1);
  assert.equal(container.children[0], sentinel);
  assert.equal(allText(container).trim(), 'LEGACY FALLBACK SENTINEL');
}

test('phase3 frontend fixtures are standalone and explicitly synthetic', () => {
  for (const name of ['complete.synthetic.json', 'missing.synthetic.json']) {
    const item = fixture(name);
    assert.equal(item.synthetic, true);
    assert.match(item.case_id, /synthetic/);
    assert.equal(item.report.version, 'v3');
    assert.equal(item.base_fixture, undefined);
    assert.doesNotMatch(JSON.stringify(item), /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
  }
  assert.equal(negative.synthetic, true);
});

test('complete doctor card renders all required fields and one safe hospital link', () => {
  const report = completeReport();
  const snapshot = JSON.stringify(report);
  const { result, root } = renderReport(report);
  assert.equal(result, true);
  assert.equal(JSON.stringify(report), snapshot);
  const chapter = doctorChapter(root);
  const cards = byClass(chapter, 'mmr-doctor-card');
  assert.equal(cards.length, 1);
  const content = allText(cards[0]);
  for (const expected of [
    '合成主任医师', '合成骨科', '合成医院', '擅长：合成膝关节方向',
    '复旦榜：合成排名', '医院官网：', '匹配理由：合成匹配理由',
    'https://hospital.synthetic-fixture.org/'
  ]) assert.ok(content.includes(expected), expected);
  const links = byTag(cards[0], 'a');
  assert.equal(links.length, 1);
  assert.equal(links[0].href, 'https://hospital.synthetic-fixture.org/');
  assert.equal(links[0].target, '_blank');
  assert.equal(links[0].rel, 'noopener noreferrer');
  assert.equal(links[0].textContent, 'https://hospital.synthetic-fixture.org/');
  assert.doesNotMatch(content, /registration_fee|挂号费|99999|third-party/);
});

test('missing website and rank render honest notices without links or fabrication', () => {
  const { result, root } = renderReport(fixture('missing.synthetic.json').report);
  assert.equal(result, true);
  const chapter = doctorChapter(root);
  const content = allText(chapter);
  assert.match(content, /复旦榜：库内暂无排名信息/);
  assert.match(content, /医院官网：\s*请以医院官方渠道确认/);
  assert.equal(byTag(chapter, 'a').length, 0);
  assert.doesNotMatch(content, /undefined|null/);
});

test('dangerous URL protocols, credentials, ports and reserved domains fail closed', async (t) => {
  for (const value of negative.unsafe_websites) {
    await t.test(value, () => {
      const report = completeReport();
      report.matched_doctors[0].hospital_website = value;
      assertRejected(report);
    });
  }
  for (const value of negative.malformed_websites) {
    const report = completeReport();
    report.matched_doctors[0].hospital_website = value;
    assertRejected(report);
  }
});

test('website field loss and legacy doctor/fee fields remain strict schema failures', () => {
  for (const mutate of [
    (report) => { delete report.matched_doctors[0].hospital_website; },
    (report) => { report.matched_doctors[0].doctor_url = negative.third_party_doctor_url; },
    (report) => { report.matched_doctors[0].registration_fee = '99999'; }
  ]) {
    const report = completeReport();
    mutate(report);
    assertRejected(report);
  }
});

test('doctor text remains textContent and cannot inject markup or extra links', () => {
  const report = completeReport();
  report.matched_doctors[0].name = negative.xss_text;
  report.matched_doctors[0].specialties = '<script>alert(1)</script>合成擅长';
  report.matched_doctors[0].match_reason = '<iframe src="https://evil.invalid"></iframe>合成理由';
  const { result, root } = renderReport(report);
  assert.equal(result, true);
  const content = allText(doctorChapter(root));
  assert.ok(content.includes(negative.xss_text));
  assert.ok(content.includes('<script>alert(1)</script>合成擅长'));
  assert.ok(content.includes('<iframe'));
  for (const tag of ['img', 'script', 'iframe', 'svg']) assert.equal(byTag(root, tag).length, 0);
  assert.equal(byTag(doctorChapter(root), 'a').length, 1, 'only the validated hospital website may link');
  assert.doesNotMatch(rendererSource, /\.innerHTML|insertAdjacentHTML|\beval\s*\(|new\s+Function|document\.write/);
});

test('two synthetic patients and their hospital links remain isolated', () => {
  const { renderer } = loadRenderer();
  const first = completeReport();
  const second = completeReport();
  second.patient_info.name = '合成患者B（隔离测试）';
  second.matched_doctors[0].name = '患者B合成医生';
  second.matched_doctors[0].hospital_website = negative.cross_hospital_website;
  const firstContainer = new FakeNode('div');
  const secondContainer = new FakeNode('div');
  assert.equal(renderer.renderV3(firstContainer, first), true);
  assert.equal(renderer.renderV3(secondContainer, second), true);
  assert.equal(byTag(doctorChapter(firstContainer), 'a')[0].href, 'https://hospital.synthetic-fixture.org/');
  assert.equal(byTag(doctorChapter(secondContainer), 'a')[0].href, negative.cross_hospital_website);
  assert.doesNotMatch(allText(firstContainer), /患者B|other-hospital/);

  const invalidSecond = clone(second);
  invalidSecond.matched_doctors[0].hospital_website = 'javascript:alert(1)';
  const fallback = new FakeNode('div');
  const sentinel = new FakeNode('p');
  sentinel.textContent = 'SECOND PATIENT FALLBACK';
  fallback.appendChild(sentinel);
  assert.equal(renderer.renderV3(fallback, invalidSecond), false);
  assert.equal(fallback.children[0], sentinel);
  assert.equal(byTag(doctorChapter(firstContainer), 'a')[0].href, 'https://hospital.synthetic-fixture.org/');
});

test('existing CSS preserves long-URL wrapping, mobile rules and print card integrity', () => {
  assert.match(cssSource, /\.mmr-report \.mmr-url\s*\{\s*word-break:\s*break-all;/);
  assert.match(cssSource, /@media \(max-width: 640px\)/);
  assert.match(cssSource, /@media print/);
  assert.match(cssSource, /@page\s*\{\s*size:\s*A4/);
  assert.match(cssSource, /\.mmr-report \.mmr-doctor-card[\s\S]*?break-inside:\s*avoid/);
});
