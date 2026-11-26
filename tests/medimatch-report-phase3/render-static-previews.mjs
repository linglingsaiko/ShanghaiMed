import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDir, '../..');
const outputDir = path.join(testDir, 'artifacts');
const rendererSource = readFileSync(path.join(repoRoot, 'public/medical-records/report-v3-renderer.js'), 'utf8');
const rendererStyles = readFileSync(path.join(repoRoot, 'public/medical-records/report-renderer.css'), 'utf8');

class FakeNode {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.className = '';
    this.textContent = '';
    this.attributes = {};
  }
  append(...items) { items.filter(Boolean).forEach((item) => this.children.push(item)); }
  appendChild(item) { this.children.push(item); return item; }
  replaceChildren(...items) { this.children = [...items]; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
}

function loadRenderer() {
  const document = {
    head: new FakeNode('head'),
    currentScript: { src: 'https://preview.invalid/medical-records/report-v3-renderer.js' },
    createElement: (tag) => new FakeNode(tag),
  };
  const window = { location: { href: 'https://preview.invalid/medical-records/' } };
  vm.runInNewContext(rendererSource, { window, document, URL, URLSearchParams });
  return window.MediMatchReportV3Renderer;
}

function render(report, renderer) {
  const container = new FakeNode('div');
  if (renderer.renderV3(container, report) !== true) {
    throw new Error('Strict v3 renderer rejected a phase 3 synthetic fixture');
  }
  return container.children[0];
}

function escapeHtml(value) {
  return String(value).replace(/\0/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function serialize(node) {
  const attributes = { ...node.attributes };
  if (node.className) attributes.class = node.className;
  for (const key of ['id', 'href', 'target', 'rel']) {
    if (node[key] !== undefined && node[key] !== '') attributes[key] = node[key];
  }
  const serializedAttributes = Object.entries(attributes)
    .map(([key, value]) => ` ${key}="${escapeHtml(value)}"`).join('');
  const tag = node.tagName.toLowerCase();
  const content = `${escapeHtml(node.textContent || '')}${node.children.map(serialize).join('')}`;
  return `<${tag}${serializedAttributes}>${content}</${tag}>`;
}

const renderer = loadRenderer();
const cases = [
  ['complete.synthetic.json', '样例 A｜完整字段', '职称、科室、医院、擅长、库内排名、官网和推荐理由均来自合成 fixture。'],
  ['missing.synthetic.json', '样例 B｜缺失字段', '官网与排名为空时必须显示诚实提示，不生成链接、不补造信息。'],
];
const sections = cases.map(([fileName, title, description]) => {
  const fixture = JSON.parse(readFileSync(path.join(testDir, 'fixtures', fileName), 'utf8'));
  if (fixture.synthetic !== true) throw new Error(`Non-synthetic fixture rejected: ${fileName}`);
  const root = serialize(render(fixture.report, renderer));
  return `<section class="preview-case"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p>${root}</section>`;
}).join('\n');

const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MediMatch 阶段 3 医生卡片合成样张</title>
<style>
:root { color-scheme: light; --page-bg: #edf2f6; --ink: #1a2332; --brand: #0d4a6e; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; max-width: 100%; }
body { background: var(--page-bg); color: var(--ink); font-family: "Noto Sans CJK SC", "Microsoft YaHei", sans-serif; }
.preview-header { padding: 24px 32px 10px; }
.preview-header-inner { max-width: 1080px; margin: 0 auto; }
.preview-header h1 { margin: 0 0 8px; color: var(--brand); font-size: 26px; line-height: 1.35; }
.preview-notice { margin: 0; padding: 10px 14px; border-left: 4px solid #b98217; background: #fff8e6; line-height: 1.6; }
.preview-shell { max-width: 1080px; margin: 14px auto 32px; padding: 28px 32px; background: #fff; box-shadow: 0 2px 14px rgba(13, 74, 110, .08); overflow-wrap: anywhere; }
.preview-case + .preview-case { margin-top: 28px; padding-top: 24px; border-top: 2px solid #dbe5eb; }
.preview-case > h2 { margin: 0 0 6px; color: var(--brand); font-size: 21px; }
.preview-case > p { margin: 0 0 16px; color: #52606d; line-height: 1.6; }
a:focus-visible { outline: 3px solid #c46b13; outline-offset: 3px; }
/* 仅隐藏与本步样张无关的章节；医生卡片由真实严格 v3 渲染器生成。 */
.mmr-v3-chapter:not([data-chapter="matched_doctors"]), .mmr-v3-report-head { display: none !important; }
${rendererStyles}
@media (max-width: 640px) {
  .preview-header { padding: 16px 14px 6px; }
  .preview-header h1 { font-size: 21px; }
  .preview-shell { margin: 8px 10px 20px; padding: 18px 14px; }
  .preview-case > h2 { font-size: 18px; }
}
@media print {
  body { background: #fff; }
  .preview-header { display: none; }
  .preview-shell { max-width: none; margin: 0; padding: 0; box-shadow: none; }
  .preview-case { break-inside: avoid; }
  .preview-case + .preview-case { margin-top: 16px; padding-top: 14px; }
}
</style>
</head>
<body>
<header class="preview-header"><div class="preview-header-inner">
  <h1>MediMatch｜阶段 3 医生卡片</h1>
  <p class="preview-notice"><strong>仅限内部验收：</strong>全部身份、病情、医院、医生、排名与网址均为合成 fixture，不代表真实患者、医生或生产报告。本页不连接支付、AI、邮件或生产 API。</p>
</div></header>
<main class="preview-shell">${sections}</main>
</body>
</html>`;

mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, 'MediMatch_阶段3_医生卡片_合成样张.html');
writeFileSync(outputPath, html);
console.log(outputPath);
