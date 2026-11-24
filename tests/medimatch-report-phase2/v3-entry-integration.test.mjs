import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDir, '../..');
const entry = readFileSync(path.join(repoRoot, 'public/medical-records/index.html'), 'utf8');

function between(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1, startMarker);
  const end = source.indexOf(endMarker, start);
  assert.notEqual(end, -1, endMarker);
  return source.slice(start, end);
}

const singleWrapper = between(
  entry,
  '        function renderSingleFullReport(report) {',
  '\n        function renderFullReport(report)'
);
const multiWrapper = between(
  entry,
  '        function updateMultiFullReportCard(nodes, report) {',
  '\n        function updateMultiFullReportCardLegacy(nodes, report)'
);
const v3Helper = between(
  entry,
  '        function tryV3ReportRender(container, report) {',
  '\n        function renderSingleFullReport(report)'
);

test('v3 renderer is loaded after the legacy renderer and before the application', () => {
  const legacy = entry.indexOf('<script src="report-renderer.js"></script>');
  const v3 = entry.indexOf('<script src="report-v3-renderer.js"></script>');
  const inline = entry.indexOf('<script>\n      (() => {');
  assert.ok(legacy >= 0 && v3 > legacy && inline > v3);
});

test('v3 helper requires both the explicit v3 gate and a successful strict render', () => {
  const calls = [];
  const container = {};
  const report = { version: 'v3' };
  const context = {
    window: {
      location: { search: '' },
      MediMatchReportV3Renderer: {
        isV3PreviewRequested: (search) => search === '?report_renderer=v3',
        renderV3: (target, value) => { calls.push([target, value]); return true; }
      }
    }
  };
  vm.runInNewContext(v3Helper, context);
  assert.equal(vm.runInNewContext('tryV3ReportRender(container, report)', { ...context, container, report }), false);
  assert.equal(calls.length, 0);
  context.window.location.search = '?report_renderer=v3';
  const active = { ...context, container, report };
  assert.equal(vm.runInNewContext('tryV3ReportRender(container, report)', active), true);
  assert.deepEqual(calls, [[container, report]]);
  context.window.MediMatchReportV3Renderer.renderV3 = () => false;
  assert.equal(vm.runInNewContext('tryV3ReportRender(container, report)', { ...context, container, report }), false);
});

test('single-patient default remains legacy even when report_v3 is present', () => {
  const legacyReport = { sections: [{ id: 'summary', content: 'synthetic legacy' }] };
  const v3Report = { version: 'v3', synthetic: true };
  const legacyCalls = [];
  const structuredCalls = [];
  const v3Calls = [];
  const container = {};
  const context = {
    document: { querySelector: () => container },
    tryV3ReportRender: (target, value) => { v3Calls.push([target, value]); return false; },
    tryStructuredReportRender: (...args) => { structuredCalls.push(args); return false; },
    renderFullReport: (value) => legacyCalls.push(value),
    elements: { reportId: {} },
    currentReportId: 'synthetic-report',
    report: legacyReport,
    reportV3: v3Report
  };
  vm.runInNewContext(singleWrapper + '\nrenderSingleFullReport(report, reportV3);', context);
  assert.deepEqual(legacyCalls, [legacyReport]);
  assert.equal(v3Calls.length, 1, 'the v3 helper rejects the preview when its explicit gate is closed');
  assert.equal(structuredCalls.length, 1);
});

test('single-patient explicit v3 success uses report_v3 and failure falls back safely', () => {
  const legacyReport = { sections: [{ id: 'summary', content: 'synthetic legacy' }] };
  const v3Report = { version: 'v3', synthetic: true };
  const legacyCalls = [];
  const structuredCalls = [];
  const v3Calls = [];
  const container = {};
  const context = {
    document: { querySelector: () => container },
    tryV3ReportRender: (target, value) => { v3Calls.push([target, value]); return true; },
    tryStructuredReportRender: (...args) => { structuredCalls.push(args); return true; },
    renderFullReport: (value) => legacyCalls.push(value),
    elements: { reportId: {} },
    currentReportId: 'synthetic-report',
    report: legacyReport,
    reportV3: v3Report
  };
  vm.runInNewContext(singleWrapper + '\nrenderSingleFullReport(report, reportV3);', context);
  assert.deepEqual(v3Calls, [[container, v3Report]]);
  assert.equal(context.elements.reportId.textContent, 'synthetic-report');
  assert.equal(structuredCalls.length, 0);
  assert.equal(legacyCalls.length, 0);

  context.tryV3ReportRender = () => false;
  vm.runInNewContext(singleWrapper + '\nrenderSingleFullReport(report, reportV3);', context);
  assert.equal(structuredCalls.length, 1, 'invalid v3 preview retains the established structured fallback');
  assert.equal(legacyCalls.length, 0);
});

test('multi-patient explicit v3 uses independent signatures and default remains legacy', () => {
  const legacyReport = { sections: [{ id: 'summary', content: 'synthetic legacy' }] };
  const v3Report = { version: 'v3', synthetic: true };
  const report = { full_report: legacyReport, report_v3: v3Report };
  const nodes = { fullSignature: '', chapters: {} };
  const legacyCalls = [];
  const structuredCalls = [];
  const v3Calls = [];
  const context = {
    report,
    nodes,
    tryV3ReportRender: (target, value) => { v3Calls.push([target, value]); return true; },
    tryStructuredReportRender: (...args) => { structuredCalls.push(args); return false; },
    updateMultiFullReportCardLegacy: (...args) => legacyCalls.push(args)
  };
  vm.runInNewContext(multiWrapper + '\nupdateMultiFullReportCard(nodes, report);', context);
  assert.deepEqual(v3Calls, [[nodes.chapters, v3Report]]);
  assert.equal(nodes.fullSignature, JSON.stringify([legacyReport, v3Report]));
  assert.equal(structuredCalls.length, 0);
  assert.equal(legacyCalls.length, 0);
  vm.runInNewContext(multiWrapper + '\nupdateMultiFullReportCard(nodes, report);', context);
  assert.equal(v3Calls.length, 1, 'identical v3 report is deduplicated');

  context.tryV3ReportRender = () => false;
  context.nodes = { fullSignature: '', chapters: {} };
  vm.runInNewContext(multiWrapper + '\nupdateMultiFullReportCard(nodes, report);', context);
  assert.equal(structuredCalls.length, 1);
  assert.equal(legacyCalls.length, 1, 'failed strict preview must not suppress the legacy report');
});

test('paid single-patient unlock passes through report_v3 without changing the legacy payload', () => {
  assert.match(
    entry,
    /renderSingleFullReport\(report\.full_report \|\| report\.report_full \|\| null, report\.report_v3 \|\| null\);/
  );
});
