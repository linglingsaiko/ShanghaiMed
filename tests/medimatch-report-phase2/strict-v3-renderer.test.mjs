import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDir, '../..');
const rendererSource = readFileSync(path.join(repoRoot, 'public/medical-records/report-v3-renderer.js'), 'utf8');
const legacyRendererSource = readFileSync(path.join(repoRoot, 'public/medical-records/report-renderer.js'), 'utf8');
const CHAPTERS = [
  'patient_info', 'chief_complaint', 'timeline', 'lab_trends', 'imaging',
  'treatment_phases', 'medications', 'assessment', 'local_doctor_conclusion',
  'subspecialty_analysis', 'matched_doctors', 'selection_advice',
  'visit_preparation', 'travel_checklist', 'references_boundary'
];
const TITLES = [
  '患者基本信息', '主诉与核心临床问题', '就诊时间线', '检验趋势', '影像所见',
  '治疗经过与病情起伏分析', '目前用药方案', '目前病情评估', '当地医生结论',
  '上海专家专科选择分析', '匹配专家', '如何选择专家', '就诊前准备',
  '旅行与陪同注意事项', '引用与事实边界'
];
const clone = (value) => JSON.parse(JSON.stringify(value));
const readFixture = (name) => JSON.parse(readFileSync(path.join(testDir, 'fixtures', name), 'utf8'));
const completeReport = () => readFixture('complete.synthetic.json').report;

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

function loadRenderer({ includeLegacy = false } = {}) {
  const document = {
    head: new FakeNode('head'),
    currentScript: { src: 'https://preview.invalid/medical-records/report-v3-renderer.js' },
    createElement: (tag) => new FakeNode(tag)
  };
  const window = { location: { href: 'https://preview.invalid/medical-records/' } };
  const context = { window, document, URL, URLSearchParams };
  if (includeLegacy) vm.runInNewContext(legacyRendererSource, context);
  vm.runInNewContext(rendererSource, context);
  return {
    renderer: window.MediMatchReportV3Renderer,
    legacyRenderer: window.MediMatchReportRenderer,
    document,
    window
  };
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

function chapters(root) {
  return byClass(root, 'mmr-v3-chapter');
}

function chapterById(root, id) {
  return chapters(root).find((item) => item.attributes['data-chapter'] === id);
}

function renderReport(report, renderer) {
  const loaded = renderer ? { renderer } : loadRenderer();
  const container = new FakeNode('div');
  const result = loaded.renderer.renderV3(container, report);
  return { result, container, root: container.children[0], renderer: loaded.renderer };
}

function sentinelContainer() {
  const container = new FakeNode('div');
  const sentinel = new FakeNode('p');
  sentinel.textContent = 'LEGACY FALLBACK SENTINEL';
  container.appendChild(sentinel);
  return { container, sentinel };
}

function assertRejected(report, renderer) {
  const loaded = renderer ? { renderer } : loadRenderer();
  const { container, sentinel } = sentinelContainer();
  const result = loaded.renderer.renderV3(container, report);
  assert.equal(result, false);
  assert.equal(container.replaceCount, 0);
  assert.equal(container.children.length, 1);
  assert.equal(container.children[0], sentinel);
  assert.equal(allText(container).trim(), 'LEGACY FALLBACK SENTINEL');
}

test('all frontend v3 fixtures are standalone, explicitly synthetic JSON reports', () => {
  for (const name of ['complete.synthetic.json', 'insufficient.synthetic.json', 'not_applicable.synthetic.json']) {
    const fixture = readFixture(name);
    assert.equal(fixture.synthetic, true, name);
    assert.match(fixture.case_id, /synthetic/, name);
    assert.equal(fixture.report.version, 'v3', name);
    assert.equal(fixture.report.language, 'zh', name);
    assert.deepEqual(Object.keys(fixture.report.chapter_status), CHAPTERS, name);
    assert.equal(fixture.base_fixture, undefined, `${name} must not depend on another fixture`);
    assert.doesNotMatch(JSON.stringify(fixture), /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/, name);
  }
});

test('explicit v3 gate is independent and leaves the legacy API and structured gate unchanged', () => {
  const { renderer, legacyRenderer, window } = loadRenderer({ includeLegacy: true });
  assert.equal(window.MediMatchReportRenderer, legacyRenderer);
  assert.notEqual(renderer, legacyRenderer);
  assert.equal(Object.isFrozen(renderer), true);
  for (const search of ['', null, undefined, '?report_renderer=legacy', '?report_renderer=structured', '?report_renderer=v3-old']) {
    assert.equal(renderer.isV3PreviewRequested(search), false, String(search));
  }
  assert.equal(renderer.isV3PreviewRequested('?report_renderer=v3'), true);
  assert.equal(renderer.isV3PreviewRequested('?x=1&report_renderer=v3'), true);
  assert.equal(legacyRenderer.isStructuredPreviewRequested('?report_renderer=structured'), true);
  assert.equal(legacyRenderer.isStructuredPreviewRequested('?report_renderer=v3'), false);
});

test('strict renderer accepts the exact production PMID format but rejects arbitrary uppercase IDs', () => {
  const report = completeReport();
  report.treatment_phases[0].ebm_note.source_id = 'PMID_00000001';
  const { result, root, renderer } = renderReport(report);
  assert.equal(result, true);
  assert.ok(allText(root).includes('PMID_00000001'));

  const invalid = clone(report);
  invalid.treatment_phases[0].ebm_note.source_id = 'OTHER_00000001';
  assertRejected(invalid, renderer);
});

test('complete report renders exactly fifteen ordered chapters and every chapter field', () => {
  const report = completeReport();
  const snapshot = JSON.stringify(report);
  const { result, root } = renderReport(report);
  assert.equal(result, true);
  assert.equal(JSON.stringify(report), snapshot, 'rendering must not mutate the report');
  assert.equal(root.attributes['data-renderer'], 'v3-strict');
  assert.equal(root.attributes['data-version'], 'v3');
  assert.equal(root.attributes['data-language'], 'zh');
  assert.equal(chapters(root).length, 15);
  assert.deepEqual(chapters(root).map((item) => item.attributes['data-chapter']), CHAPTERS);
  assert.deepEqual(byTag(root, 'h3').map(allText), TITLES);
  assert.ok(chapters(root).every((item) => item.attributes['data-chapter-status'] === 'complete'));
  assert.equal(byClass(root, 'mmr-v3-status-complete').length, 15);
  assert.equal(byClass(root, 'mmr-table').length, 5);
  assert.equal(byClass(root, 'mmr-phase').length, 2);
  assert.equal(byClass(root, 'mmr-ebm-note').length, 2);
  assert.equal(byClass(root, 'mmr-info-box').length, 1);
  assert.equal(byClass(root, 'mmr-alert-box').length, 2);
  assert.equal(byClass(root, 'mmr-doctor-card').length, 1);
  assert.equal(byClass(root, 'mmr-list-group').length, 5);
  assert.equal(byTag(root, 'a').length, 0);

  const content = allText(root);
  const expectedText = [
    '合成患者A（化名）', '女 / 42 岁', '合成职业', '合成城市', '膝骨关节炎（完全合成病例）', '3 年（合成）', '未提供',
    '合成膝部不适主诉。', '仅用于结构测试的合成核心问题。',
    '2026-01', '检验记录', '合成检验记录', '合成处置',
    'ESR', 'CRP', '68 ↑', '45 ↑', '0–20', '0–8', 'mm/h', 'mg/L', '所有数值均为合成结构测试数据。',
    '双膝X线（合成）', '合成影像所见', '合成意义',
    '合成阶段', '2026-01 – 2026-02', '稳定', '合成治疗经过', '合成原因', 'synthetic_only',
    '合成知识库条目，仅验证结构，不是真实文献。',
    '合成药物', '5mg 每日一次', '口服', '仅结构测试',
    '评分需医生评估（合成样例）', '合成安全提示', '合成当地医生结论，不是真实诊断。',
    '骨科（合成）', '合成分析点', '合成分析内容', 'synthetic_analysis', '合成亚专科循证文本，仅用于前端结构测试。',
    '推荐 1', '合成医生', '合成职称', '合成医院', '合成科室', '合成擅长', '合成排名占位文本', '合成匹配理由',
    '合成优先事项', '合成选择维度', '合成随访建议', '合成病历材料', '合成待补资料',
    '合成证件清单', '合成行前事项', '合成到院事项', '本样例不验证循证真实性。', '合成免责声明，不构成诊断或治疗建议。'
  ];
  expectedText.forEach((value) => assert.ok(content.includes(value), `missing rendered text: ${value}`));
  assert.doesNotMatch(content, /registration_fee|挂号费/);
});

test('insufficient_data keeps all titles, shows explicit notices and renders only supplied fields', () => {
  const { result, root } = renderReport(readFixture('insufficient.synthetic.json').report);
  assert.equal(result, true);
  assert.equal(chapters(root).length, 15);
  assert.deepEqual(chapters(root).map((item) => item.attributes['data-chapter']), CHAPTERS);
  CHAPTERS.slice(0, 12).forEach((id) => {
    assert.equal(chapterById(root, id).attributes['data-chapter-status'], 'insufficient_data', id);
  });
  CHAPTERS.slice(12).forEach((id) => {
    assert.equal(chapterById(root, id).attributes['data-chapter-status'], 'complete', id);
  });
  assert.equal(byClass(root, 'mmr-v3-status-insufficient_data').length, 12);
  assert.equal(byClass(root, 'mmr-v3-state-notice').length, 12);
  assert.equal(byTag(chapterById(root, 'timeline'), 'table').length, 0);
  assert.equal(byClass(chapterById(root, 'matched_doctors'), 'mmr-doctor-card').length, 0);
  const content = allText(root);
  assert.match(content, /现有资料不足：仅展示已提供的信息，空缺内容不作推断。/);
  assert.match(content, /合成主诉/);
  assert.match(content, /评分需医生评估/);
  assert.match(content, /68/);
  assert.doesNotMatch(content, /68\s*[↑↓]/);
});

test('not_applicable keeps fixed positions with visible state and no fabricated chapter body', () => {
  const { result, root } = renderReport(readFixture('not_applicable.synthetic.json').report);
  assert.equal(result, true);
  assert.equal(chapters(root).length, 15);
  assert.deepEqual(chapters(root).map((item) => item.attributes['data-chapter']), CHAPTERS);
  for (const id of ['imaging', 'matched_doctors']) {
    const chapter = chapterById(root, id);
    assert.equal(chapter.attributes['data-chapter-status'], 'not_applicable', id);
    assert.match(allText(chapter), /本章不适用：保留章节位置，不生成医疗内容。/, id);
    assert.equal(byTag(chapter, 'table').length, 0, id);
    assert.equal(byClass(chapter, 'mmr-doctor-card').length, 0, id);
  }
  assert.equal(byClass(root, 'mmr-v3-status-not_applicable').length, 2);
  assert.equal(byClass(root, 'mmr-v3-state-notice').length, 12);
});

test('strict validator rejects non-v3, non-Chinese and legacy payloads without replacing fallback DOM', () => {
  assertRejected(null);
  assertRejected([]);
  assertRejected('legacy');
  assertRejected({ sections: [{ id: 'summary', content: 'synthetic legacy' }] });
  for (const [key, value] of [['version', 'v2'], ['language', 'en'], ['generated_at', null]]) {
    const report = completeReport();
    report[key] = value;
    assertRejected(report);
  }
});

test('strict validator rejects every wrong chapter payload type and preserves original DOM', async (t) => {
  const wrongValues = {
    patient_info: [], chief_complaint: [], timeline: {}, lab_trends: [], imaging: {},
    treatment_phases: {}, medications: {}, assessment: [], local_doctor_conclusion: [],
    subspecialty_analysis: [], matched_doctors: {}, selection_advice: [],
    visit_preparation: [], travel_checklist: [], references_boundary: []
  };
  for (const id of CHAPTERS) {
    await t.test(id, () => {
      const report = completeReport();
      report[id] = wrongValues[id];
      assertRejected(report);
    });
  }
});

test('strict validator fails closed for missing, extra, reordered and malformed structures', async (t) => {
  const cases = [
    ['missing chapter', (report) => { delete report.imaging; }],
    ['extra outer chapter', (report) => { report.extra_chapter = {}; }],
    ['outer key order', (report) => {
      const reordered = {};
      Object.keys(report).reverse().forEach((key) => { reordered[key] = report[key]; });
      return reordered;
    }],
    ['timezone missing', (report) => { report.generated_at = '2026-11-24T13:00:00'; }],
    ['impossible ISO date', (report) => { report.generated_at = '2026-02-30T13:00:00Z'; }],
    ['patient key missing', (report) => { delete report.patient_info.name; }],
    ['patient key extra', (report) => { report.patient_info.extra = ''; }],
    ['patient field wrong type', (report) => { report.patient_info.name = 42; }],
    ['timeline row field missing', (report) => { delete report.timeline[0].treatment; }],
    ['duplicate lab test name', (report) => { report.lab_trends.tests[1].name = 'ESR'; }],
    ['lab value key missing', (report) => { delete report.lab_trends.rows[0].values.CRP; }],
    ['lab flag key extra', (report) => { report.lab_trends.rows[0].flags.UNKNOWN = ''; }],
    ['invalid lab flag', (report) => { report.lab_trends.rows[0].flags.ESR = 'high'; }],
    ['arrow on empty value', (report) => {
      report.lab_trends.rows[0].values.ESR = '';
      report.lab_trends.rows[0].flags.ESR = '↑';
    }],
    ['duplicate lab date', (report) => { report.lab_trends.rows.push(clone(report.lab_trends.rows[0])); }],
    ['invalid treatment outcome', (report) => { report.treatment_phases[0].outcome = 'better'; }],
    ['treatment outcome wrong type', (report) => { report.treatment_phases[0].outcome = ['stable']; }],
    ['invalid EBM source id', (report) => { report.treatment_phases[0].ebm_note.source_id = 'bad source'; }],
    ['empty EBM text', (report) => { report.treatment_phases[0].ebm_note.text = ''; }],
    ['empty assessment item', (report) => { report.assessment.info_box = ['']; }],
    ['non-sequential doctor rank', (report) => { report.matched_doctors[0].rank = 2; }],
    ['doctor rank wrong type', (report) => { report.matched_doctors[0].rank = '1'; }],
    ['phase 2 hospital website forbidden', (report) => { report.matched_doctors[0].hospital_website = 'https://example.invalid'; }],
    ['doctor URL extra field forbidden', (report) => { report.matched_doctors[0].doctor_url = 'https://example.invalid/doctor'; }],
    ['registration fee extra field forbidden', (report) => { report.matched_doctors[0].registration_fee = '100'; }],
    ['selection field missing', (report) => { delete report.selection_advice.continuity; }],
    ['empty required disclaimer', (report) => { report.references_boundary.disclaimer = ''; }],
    ['chapter status missing', (report) => { delete report.chapter_status.imaging; }],
    ['chapter status extra', (report) => { report.chapter_status.extra = 'complete'; }],
    ['chapter status wrong container type', (report) => { report.chapter_status = []; }],
    ['unknown chapter status', (report) => { report.chapter_status.imaging = 'partial'; }],
    ['chapter status wrong type', (report) => { report.chapter_status.imaging = null; }],
    ['chapter status coercible array rejected', (report) => { report.chapter_status.imaging = ['complete']; }],
    ['chapter status order changed', (report) => {
      const statuses = {};
      [...CHAPTERS].reverse().forEach((key) => { statuses[key] = report.chapter_status[key]; });
      report.chapter_status = statuses;
    }],
    ['empty payload cannot claim complete', (report) => { report.timeline = []; }],
    ['not_applicable cannot retain content', (report) => { report.chapter_status.imaging = 'not_applicable'; }]
  ];
  for (const [name, mutate] of cases) {
    await t.test(name, () => {
      const report = completeReport();
      const changed = mutate(report);
      assertRejected(changed || report);
    });
  }
});

test('lab values and flags are key-set strict but do not require JSON object key ordering', () => {
  const report = completeReport();
  report.lab_trends.rows[0].values = { CRP: '45', ESR: '68' };
  report.lab_trends.rows[0].flags = { CRP: '↑', ESR: '↑' };
  const { result, root } = renderReport(report);
  assert.equal(result, true);
  assert.match(allText(root), /68 ↑/);
  assert.match(allText(root), /45 ↑/);
});

test('ISO 8601 Z timezone is accepted without weakening required timezone validation', () => {
  const report = completeReport();
  report.generated_at = '2026-11-24T13:00:00Z';
  assert.equal(renderReport(report).result, true);
  report.generated_at = '2026-11-24';
  assertRejected(report);
});

test('malicious HTML and EBM strings remain literal text and create no elements or links', () => {
  const report = completeReport();
  const attacks = {
    image: '<img src=x onerror=alert(1)>',
    script: '<script>alert("synthetic")</script>',
    ebm: '<svg onload=alert(1)>合成循证文本</svg>',
    frame: '<iframe src="https://evil.invalid"></iframe>'
  };
  report.patient_info.name = attacks.image;
  report.matched_doctors[0].name = attacks.script;
  report.treatment_phases[0].ebm_note.text = attacks.ebm;
  report.references_boundary.guideline_notes = attacks.frame;
  const { result, root } = renderReport(report);
  assert.equal(result, true);
  const content = allText(root);
  Object.values(attacks).forEach((attack) => assert.ok(content.includes(attack), attack));
  for (const tag of ['img', 'script', 'svg', 'iframe', 'a']) assert.equal(byTag(root, tag).length, 0, tag);
  assert.doesNotMatch(rendererSource, /\.innerHTML|insertAdjacentHTML|\beval\s*\(|new\s+Function|document\.write/);
});

test('renderer never derives arrows from values or reference ranges when flags are blank', () => {
  const report = completeReport();
  report.lab_trends.rows[0].values = { ESR: '999', CRP: '-99' };
  report.lab_trends.rows[0].flags = { ESR: '', CRP: '' };
  const { result, root } = renderReport(report);
  assert.equal(result, true);
  const content = allText(root);
  assert.match(content, /999/);
  assert.match(content, /-99/);
  assert.doesNotMatch(content, /[↑↓]/);
});

test('two synthetic patients remain isolated and an invalid second report preserves fallback', () => {
  const { renderer } = loadRenderer();
  const firstReport = completeReport();
  const secondReport = completeReport();
  secondReport.patient_info.name = '合成患者B（独立测试）';
  secondReport.chief_complaint.chief = '患者B专属合成主诉。';
  secondReport.chief_complaint.core_problem = '患者B专属合成核心问题。';
  secondReport.matched_doctors[0].name = '患者B合成医生';
  const firstContainer = new FakeNode('div');
  const secondContainer = new FakeNode('div');
  assert.equal(renderer.renderV3(firstContainer, firstReport), true);
  const firstSnapshot = allText(firstContainer);
  assert.equal(renderer.renderV3(secondContainer, secondReport), true);
  const firstText = allText(firstContainer);
  const secondText = allText(secondContainer);
  assert.equal(firstText, firstSnapshot, 'second render must not mutate first patient DOM');
  assert.match(firstText, /合成患者A（化名）/);
  assert.doesNotMatch(firstText, /合成患者B|患者B专属|患者B合成医生/);
  assert.match(secondText, /合成患者B（独立测试）/);
  assert.match(secondText, /患者B专属合成核心问题。/);
  assert.match(secondText, /患者B合成医生/);
  assert.doesNotMatch(secondText, /合成患者A（化名）|合成膝部不适主诉。/);

  const invalidSecond = clone(secondReport);
  delete invalidSecond.matched_doctors;
  const { container, sentinel } = sentinelContainer();
  assert.equal(renderer.renderV3(container, invalidSecond), false);
  assert.equal(container.children[0], sentinel);
  assert.equal(container.replaceCount, 0);
  assert.equal(allText(firstContainer), firstSnapshot);
  assert.equal(allText(secondContainer), secondText);
});

test('v3 styles load once from the static same-origin stylesheet', () => {
  const { renderer, document } = loadRenderer();
  assert.equal(renderer.renderV3(new FakeNode('div'), completeReport()), true);
  assert.equal(renderer.renderV3(new FakeNode('div'), completeReport()), true);
  const links = document.head.children.filter((item) => item.tagName === 'LINK');
  assert.equal(links.length, 1);
  assert.equal(links[0].href, 'https://preview.invalid/medical-records/report-renderer.css');
  assert.equal(new URL(links[0].href).origin, 'https://preview.invalid');
  assert.equal(links[0].attributes['data-medimatch-renderer'], 'v3');
});
