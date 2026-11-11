'use strict';

// Final-51 isolated local-only frontend/payment regression harness. No real network is used.
// Derived from the verified final-49 browser harness; unrelated formal proxy tests are excluded.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
const HTML_PATH = path.join(ROOT, 'public/medical-records/index.html');
const html = fs.readFileSync(HTML_PATH, 'utf8');
const inlineMatch = html.match(/<script>([\s\S]*?)<\/script>/);
assert(inlineMatch, 'inline script not found');
const inlineScript = inlineMatch[1];

const results = [];
async function test(name, fn) {
  try {
    const detail = await fn();
    results.push({ name, ok: true, detail });
    console.log(`PASS ${name}${detail ? ` — ${detail}` : ''}`);
  } catch (error) {
    results.push({ name, ok: false, detail: error.stack || String(error) });
    console.error(`FAIL ${name}\n${error.stack || error}`);
  }
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

function response(data, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  };
}

async function settle() {
  for (let index = 0; index < 12; index += 1) {
    await new Promise((resolve) => setImmediate(resolve));
  }
}

class MockClassList {
  constructor(owner) { this.owner = owner; this.values = new Set(); }
  add(...names) { names.forEach((name) => this.values.add(name)); }
  remove(...names) { names.forEach((name) => this.values.delete(name)); }
  contains(name) { return this.values.has(name); }
  toggle(name, force) {
    const enabled = force === undefined ? !this.values.has(name) : Boolean(force);
    if (enabled) this.values.add(name); else this.values.delete(name);
    return enabled;
  }
  setFromString(value) {
    this.values = new Set(String(value || '').split(/\s+/).filter(Boolean));
  }
  toString() { return Array.from(this.values).join(' '); }
}

class MockElement {
  constructor(tagName = 'div', id = '') {
    this.tagName = String(tagName).toUpperCase();
    this.id = id;
    this.children = [];
    this.parentNode = null;
    this.dataset = {};
    this.style = {};
    this.attributes = {};
    this.listeners = {};
    this.hidden = false;
    this.disabled = false;
    this.value = '';
    this.type = '';
    this._textContent = '';
    this.classList = new MockClassList(this);
  }
  set className(value) { this.classList.setFromString(value); }
  get className() { return this.classList.toString(); }
  set textContent(value) {
    this._textContent = value === null || value === undefined ? '' : String(value);
    this.children = [];
  }
  get textContent() {
    return this._textContent + this.children.map((child) => child.textContent).join('');
  }
  append(...nodes) {
    nodes.forEach((node) => {
      const child = node instanceof MockElement ? node : new MockElement('span');
      if (!(node instanceof MockElement)) child.textContent = String(node);
      child.parentNode = this;
      this.children.push(child);
    });
  }
  appendChild(node) { this.append(node); return node; }
  replaceChildren(...nodes) { this.children = []; this._textContent = ''; this.append(...nodes); }
  remove() {
    if (!this.parentNode) return;
    this.parentNode.children = this.parentNode.children.filter((child) => child !== this);
    this.parentNode = null;
  }
  setAttribute(name, value) {
    this.attributes[name] = String(value);
    if (name === 'class') this.className = value;
    if (name === 'type') this.type = String(value);
  }
  getAttribute(name) { return Object.hasOwn(this.attributes, name) ? this.attributes[name] : null; }
  addEventListener(type, handler) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(handler);
  }
  dispatch(type, init = {}) {
    const event = {
      type,
      target: init.target || this,
      relatedTarget: init.relatedTarget || null,
      dataTransfer: init.dataTransfer || null,
      key: init.key || '',
      shiftKey: Boolean(init.shiftKey),
      defaultPrevented: false,
      preventDefault() { this.defaultPrevented = true; },
      stopPropagation() {},
      ...init,
    };
    (this.listeners[type] || []).forEach((handler) => handler(event));
    return event;
  }
  click() {
    if (this.disabled) return;
    this.dispatch('click', { target: this });
  }
  focus() { this.ownerDocument && (this.ownerDocument.activeElement = this); }
  select() {}
  scrollIntoView() {}
  checkValidity() {
    if (this.type !== 'email') return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
  }
  contains(other) {
    if (other === this) return true;
    return this.children.some((child) => child.contains(other));
  }
  descendants() {
    return this.children.flatMap((child) => [child, ...child.descendants()]);
  }
  matches(selector) {
    if (selector === 'button') return this.tagName === 'BUTTON';
    if (selector === '[data-file-status]') return Object.hasOwn(this.dataset, 'fileStatus');
    if (selector.startsWith('.')) return this.classList.contains(selector.slice(1));
    return false;
  }
  querySelectorAll(selector) {
    if (selector.includes(',')) return [];
    return this.descendants().filter((element) => element.matches(selector));
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
}

const IDS = [
  'upload-section', 'drop-zone', 'file-input', 'file-panel', 'file-list', 'file-count',
  'clear-files', 'file-error', 'file-error-text', 'start-analysis', 'start-analysis-text',
  'progress-section', 'progress-pill', 'upload-progress', 'upload-fill', 'upload-percent',
  'upload-status', 'analysis-progress', 'analysis-fill', 'analysis-percent', 'analysis-note',
  'preview-section', 'locked-module', 'payment-status', 'full-report', 'print-report',
  'report-date', 'report-id', 'access-credentials', 'accepted-report-id',
  'accepted-access-code', 'credentials-feedback', 'report-center', 'refresh-reports',
  'reports-state', 'report-list', 'report-center-feedback', 'claim-form', 'claim-report-id',
  'claim-access-code', 'claim-submit', 'auth-panel', 'auth-state', 'auth-email', 'auth-code',
  'request-code', 'verify-code', 'logout-button', 'auth-feedback', 'email-login-form',
  'email-unavailable', 'analysis-email-block', 'analysis-email', 'consent-modal',
  'consent-dialog', 'agree-consent', 'decline-consent', 'consent-declined', 'reopen-consent',
  'chief-complaint-input', 'paypal-button-container', 'copy-report-id', 'copy-access-code',
];

function createPage(route, options = {}) {
  const byId = new Map();
  const document = {
    activeElement: null,
    body: new MockElement('body', 'body'),
    head: new MockElement('head', 'head'),
    getElementById(id) { return byId.get(id) || null; },
    createElement(tag) { const element = new MockElement(tag); element.ownerDocument = document; return element; },
    execCommand() { return true; },
  };
  IDS.forEach((id) => {
    const tag = id.includes('button') || ['clear-files', 'refresh-reports', 'claim-submit', 'request-code', 'verify-code', 'print-report', 'agree-consent', 'decline-consent', 'reopen-consent', 'copy-report-id', 'copy-access-code'].includes(id)
      ? 'button'
      : id.includes('form') ? 'form'
        : id.includes('input') || ['auth-email', 'auth-code', 'analysis-email', 'claim-report-id', 'claim-access-code', 'accepted-access-code', 'file-input'].includes(id) ? 'input'
          : id === 'report-list' || id === 'file-list' ? 'ul' : 'div';
    const element = new MockElement(tag, id);
    element.ownerDocument = document;
    byId.set(id, element);
  });
  byId.get('auth-email').type = 'email';
  byId.get('analysis-email').type = 'email';
  [
    'file-panel', 'file-error', 'progress-section', 'preview-section', 'payment-status',
    'full-report', 'access-credentials', 'credentials-feedback', 'report-center-feedback',
    'auth-panel', 'logout-button', 'auth-feedback', 'email-unavailable', 'analysis-email-block',
    'consent-modal', 'consent-declined', 'paypal-button-container',
  ].forEach((id) => { byId.get(id).hidden = true; });

  const uploadStatusPill = new MockElement('span');
  uploadStatusPill.className = 'status-pill';
  byId.get('upload-section').append(uploadStatusPill);
  const summaryList = new MockElement('dl'); summaryList.className = 'summary-list';
  const departmentName = new MockElement('div'); departmentName.className = 'department-name';
  const departmentSecondary = new MockElement('p'); departmentSecondary.className = 'department-secondary';
  byId.get('preview-section').append(summaryList, departmentName, departmentSecondary);
  const reportChapters = new MockElement('div'); reportChapters.className = 'report-chapters';
  byId.get('full-report').append(reportChapters);
  const steps = Array.from({ length: 5 }, () => {
    const step = new MockElement('li'); step.className = 'analysis-step';
    const icon = new MockElement('span'); icon.className = 'step-icon';
    const status = new MockElement('span'); status.className = 'step-status';
    step.append(icon, status);
    return step;
  });
  document.querySelector = (selector) => selector === '.report-chapters' ? reportChapters : null;
  document.querySelectorAll = (selector) => selector === '.analysis-step' ? steps : [];

  const store = new Map([['shanghaimed-medical-records-consent', 'agreed']]);
  const calls = [];
  const paypalConfigs = [];
  const window = {
    location: { origin: 'https://local.test' },
    matchMedia: () => ({ matches: false }),
    localStorage: {
      getItem: (key) => store.has(key) ? store.get(key) : null,
      setItem: (key, value) => store.set(key, String(value)),
      removeItem: (key) => store.delete(key),
    },
    requestAnimationFrame: (callback) => { callback(); return 1; },
    addEventListener() {},
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    isSecureContext: true,
    print() {},
    paypal: options.paypal === false ? undefined : {
      Buttons(config) {
        paypalConfigs.push(config);
        return { render: async () => {} };
      },
    },
  };
  const fetchImpl = async (url, fetchOptions = {}) => {
    const parsed = new URL(url);
    const apiPath = parsed.pathname.replace('/api/phase3', '') + parsed.search;
    calls.push({ path: apiPath, options: fetchOptions });
    const result = await route(apiPath, fetchOptions, calls);
    if (!result) throw new Error(`No local mock route for ${apiPath}`);
    return result;
  };
  const navigator = { language: 'zh-CN', clipboard: { writeText: async () => {} } };
  const context = vm.createContext({
    window, document, navigator, fetch: fetchImpl, FormData, Event,
    console, setTimeout, clearTimeout, setInterval, clearInterval,
  });
  vm.runInContext(inlineScript, context, { filename: 'medical-records-inline.actual.js' });
  return { byId, calls, paypalConfigs, window, document, store, reportChapters };
}

function baseRoute(state = {}) {
  return async (apiPath) => {
    if (apiPath === '/auth/config') return response({ email_enabled: state.emailEnabled !== false });
    if (apiPath === '/auth/me') return response(state.me || { authenticated: false });
    if (apiPath === '/reports') return response({ reports: state.reports || [] });
    if (apiPath === '/pay/config') return response({ enabled: true, client_id: 'local-client', env: 'sandbox' });
    throw new Error(`Unexpected route ${apiPath}`);
  };
}

function reportButton(page) {
  const button = page.byId.get('report-list').descendants().find((element) => element.tagName === 'BUTTON');
  assert(button, 'report open button was not rendered');
  return button;
}

function allVisibleText(page) {
  return Array.from(page.byId.values()).map((element) => `${element.textContent}\n${element.value}`).join('\n');
}

async function runStaleOpenReport(logoutStatus) {
  const oldDetail = deferred();
  let loggedOut = false;
  const route = async (apiPath) => {
    if (apiPath === '/auth/config') return response({ email_enabled: true });
    if (apiPath === '/auth/me') return response({ authenticated: true, user: { email: 'before@example.com' } });
    if (apiPath === '/reports') return response({ reports: loggedOut ? [] : [{ report_id: 'R-OLD', status: 'completed' }] });
    if (apiPath === '/reports/R-OLD') return oldDetail.promise;
    if (apiPath === '/auth/logout') {
      loggedOut = true;
      return response(logoutStatus === 200 ? {} : { error: 'local logout failure' }, logoutStatus);
    }
    throw new Error(`Unexpected ${apiPath}`);
  };
  const page = createPage(route);
  await settle();
  page.byId.get('file-input').dispatch('change', {
    target: { files: [{ name: 'sensitive-record.pdf', size: 1024 }] },
  });
  page.byId.get('chief-complaint-input').value = 'SENSITIVE-CHIEF-COMPLAINT';
  page.byId.get('claim-report-id').value = 'R-CLAIM-SENSITIVE';
  page.byId.get('claim-access-code').value = 'CLAIM-CODE-SENSITIVE';
  page.byId.get('accepted-access-code').value = 'ONE-TIME-CODE-SENSITIVE';
  page.byId.get('auth-email').value = 'before@example.com';
  page.byId.get('auth-code').value = '123456';
  reportButton(page).click();
  await settle();
  assert(page.calls.some((call) => call.path === '/reports/R-OLD'), 'old report request did not start');
  page.byId.get('logout-button').click();
  await settle();
  oldDetail.resolve(response({
    report_id: 'R-OLD', status: 'completed', paid: true,
    preview: { summary: 'SENSITIVE-DELAYED-PREVIEW', specialty: 'SENSITIVE-SPECIALTY' },
    full_report: { sections: [{ title: 'SENSITIVE-TITLE', content: 'SENSITIVE-FULL-REPORT' }] },
  }));
  await settle();
  const visible = allVisibleText(page);
  assert(!visible.includes('SENSITIVE-DELAYED-PREVIEW'), 'delayed preview was rendered after logout');
  assert(!visible.includes('SENSITIVE-FULL-REPORT'), 'delayed full report was rendered after logout');
  assert(!visible.includes('R-OLD'), 'old report id was rendered after logout');
  assert.equal(page.byId.get('preview-section').hidden, true);
  assert.equal(page.byId.get('full-report').hidden, true);
  assert.equal(page.reportChapters.children.length, 0);
  assert.equal(page.byId.get('chief-complaint-input').value, '');
  assert.equal(page.byId.get('claim-report-id').value, '');
  assert.equal(page.byId.get('claim-access-code').value, '');
  assert.equal(page.byId.get('accepted-access-code').value, '');
  assert.equal(page.byId.get('file-list').children.length, 0);
  assert.equal(page.byId.get('file-input').value, '');
  assert.equal(page.byId.get('auth-email').value, '');
  assert.equal(page.byId.get('auth-code').value, '');
  const feedback = page.byId.get('auth-feedback').textContent;
  if (logoutStatus === 200) assert(feedback.includes('已安全退出登录'));
  else assert(feedback.includes('页面敏感内容已清除'));
  return `logout=${logoutStatus}; delayed detail and all checked sensitive inputs stayed cleared`;
}

async function runVerifyCase(verification, meAfterVerify) {
  let verifySeen = false;
  let authMeCount = 0;
  const route = async (apiPath) => {
    if (apiPath === '/auth/config') return response({ email_enabled: true });
    if (apiPath === '/auth/me') {
      authMeCount += 1;
      if (!verifySeen) return response({ authenticated: false });
      if (meAfterVerify.networkFailure) return response({ error: 'local auth/me failure' }, 500);
      return response(meAfterVerify.data);
    }
    if (apiPath === '/reports') return response({ reports: [] });
    if (apiPath === '/auth/verify') {
      verifySeen = true;
      return response(verification, 200);
    }
    throw new Error(`Unexpected ${apiPath}`);
  };
  const page = createPage(route);
  await settle();
  const initialMeCount = authMeCount;
  page.byId.get('auth-email').value = 'person@example.com';
  page.byId.get('auth-code').value = '123456';
  page.byId.get('email-login-form').dispatch('submit');
  await settle();
  const feedback = page.byId.get('auth-feedback').textContent;
  assert(!feedback.includes('验证成功'), `unexpected success feedback: ${feedback}`);
  assert(!feedback.includes('已验证并登录'), `unexpected success feedback: ${feedback}`);
  assert(!page.byId.get('auth-state').textContent.startsWith('已登录'), page.byId.get('auth-state').textContent);
  assert.equal(page.byId.get('logout-button').hidden, true);
  return `verify=${JSON.stringify(verification)}; auth/me calls before/after=${initialMeCount}/${authMeCount}; feedback=${feedback}`;
}

async function runCaptureCase(captured) {
  const route = async (apiPath) => {
    if (apiPath === '/auth/config') return response({ email_enabled: false });
    if (apiPath === '/reports') return response({ reports: [{ report_id: 'R-PAY', status: 'completed' }] });
    if (apiPath === '/reports/R-PAY') return response({
      report_id: 'R-PAY', task_id: 'T-PAY', file_ids: ['F-PAY'], status: 'completed',
      preview: { summary: 'Free preview only', specialty: 'Test specialty' },
    });
    if (apiPath === '/pay/config') return response({ enabled: true, client_id: 'local-client', env: 'sandbox' });
    if (apiPath === '/pay/capture') return response(captured, 200);
    throw new Error(`Unexpected ${apiPath}`);
  };
  const page = createPage(route);
  await settle();
  reportButton(page).click();
  await settle();
  assert.equal(page.paypalConfigs.length, 1, 'PayPal onApprove mock was not installed');
  let rejected = false;
  try {
    await page.paypalConfigs[0].onApprove({ orderID: 'LOCAL-ORDER' });
  } catch (error) {
    rejected = true;
  }
  await settle();
  assert(rejected, 'capture onApprove unexpectedly resolved');
  assert.equal(page.byId.get('full-report').hidden, true, 'full report unlocked');
  assert.equal(page.document.body.classList.contains('is-paid'), false, 'body gained is-paid');
  assert.equal(page.reportChapters.children.length, 0, 'full report chapters rendered');
  assert(page.byId.get('payment-status').classList.contains('alert-error'));
  return `capture=${JSON.stringify(captured)}; full report remained locked`;
}

function payPalConfigRoute(env) {
  return async (apiPath) => {
    if (apiPath === '/auth/config') return response({ email_enabled: false });
    if (apiPath === '/reports') return response({ reports: [{ report_id: 'R-SDK', status: 'completed' }] });
    if (apiPath === '/reports/R-SDK') return response({
      report_id: 'R-SDK', task_id: 'T-SDK', file_ids: ['F-SDK'], status: 'completed',
      preview: { summary: 'Free preview only', specialty: 'Synthetic specialty' },
    });
    if (apiPath === '/pay/config') return response({ enabled: true, client_id: 'local-client', env });
    throw new Error(`Unexpected ${apiPath}`);
  };
}

async function openSdkPage(env) {
  const page = createPage(payPalConfigRoute(env), { paypal: false });
  await settle();
  reportButton(page).click();
  await settle();
  return page;
}

async function assertSdkOrigin(env, expectedOrigin) {
  const page = await openSdkPage(env);
  const scripts = page.document.head.children.filter((element) => element.tagName === 'SCRIPT');
  assert.equal(scripts.length, 1, 'exactly one PayPal SDK script must be appended');
  const url = new URL(scripts[0].src);
  assert.equal(url.origin, expectedOrigin);
  assert.equal(url.pathname, '/sdk/js');
  assert.equal(url.searchParams.get('client-id'), 'local-client');
  assert.equal(url.searchParams.get('currency'), 'USD');
  assert.equal(url.searchParams.get('intent'), 'capture');
  page.window.paypal = {
    Buttons(config) {
      page.paypalConfigs.push(config);
      return { render: async () => {} };
    },
  };
  scripts[0].onload();
  await settle();
  assert.equal(page.paypalConfigs.length, 1, 'PayPal Buttons did not render after synthetic SDK load');
  return `${env}: ${url.origin}${url.pathname}`;
}

async function assertSdkRejected(env) {
  const page = await openSdkPage(env);
  const scripts = page.document.head.children.filter((element) => element.tagName === 'SCRIPT');
  assert.equal(scripts.length, 0, `invalid env ${String(env)} appended an SDK script`);
  assert.equal(page.paypalConfigs.length, 0);
  assert(page.byId.get('paypal-button-container').textContent.includes('支付组件加载失败'));
  assert.equal(page.byId.get('full-report').hidden, true);
  return `env=${JSON.stringify(env)} rejected without SDK load`;
}

(async () => {
  await test('node --check actual inline JavaScript', async () => {
    const temp = `/tmp/medimatch-inline-${process.pid}-${Date.now()}.js`;
    fs.writeFileSync(temp, inlineScript, { flag: 'wx' });
    execFileSync(process.execPath, ['--check', temp], { stdio: 'pipe' });
    return temp;
  });

  await test('PayPal sandbox config selects only the Sandbox SDK host', () =>
    assertSdkOrigin('sandbox', 'https://www.sandbox.paypal.com'));
  await test('PayPal live config selects only the Live SDK host', () =>
    assertSdkOrigin('live', 'https://www.paypal.com'));
  await test('missing PayPal SDK environment fails closed', async () => {
    for (const env of [undefined, null, '']) await assertSdkRejected(env);
    return 'undefined, null and empty env rejected';
  });
  await test('unknown PayPal SDK environment fails closed', async () => {
    for (const env of ['production', 'staging', 'sandbox ', ' paypal ']) await assertSdkRejected(env);
    return 'unknown and whitespace variants rejected';
  });
  await test('case-mismatched PayPal SDK environment fails closed', async () => {
    for (const env of ['Sandbox', 'SANDBOX', 'Live', 'LIVE']) await assertSdkRejected(env);
    return 'case variants rejected for both environments';
  });
  await test('stale PayPal config cannot render after report generation changes', async () => {
    const firstConfig = deferred();
    let configCalls = 0;
    const route = async (apiPath) => {
      if (apiPath === '/auth/config') return response({ email_enabled: false });
      if (apiPath === '/reports') return response({ reports: [
        { report_id: 'R-PAY-A', status: 'completed' },
        { report_id: 'R-PAY-B', status: 'completed' },
      ] });
      if (apiPath === '/reports/R-PAY-A' || apiPath === '/reports/R-PAY-B') {
        const suffix = apiPath.endsWith('A') ? 'A' : 'B';
        return response({
          report_id: `R-PAY-${suffix}`, task_id: `T-PAY-${suffix}`, file_ids: [`F-PAY-${suffix}`],
          status: 'completed', preview: { summary: `Preview ${suffix}` },
        });
      }
      if (apiPath === '/pay/config') {
        configCalls += 1;
        if (configCalls === 1) return firstConfig.promise;
        return response({ enabled: true, client_id: 'local-client', env: 'sandbox' });
      }
      throw new Error(`Unexpected ${apiPath}`);
    };
    const page = createPage(route);
    await settle();
    const buttons = page.byId.get('report-list').descendants().filter((element) => element.tagName === 'BUTTON');
    assert.equal(buttons.length, 2);
    buttons[0].click();
    await settle();
    assert.equal(configCalls, 1);
    buttons[1].click();
    await settle();
    assert.equal(configCalls, 2);
    assert.equal(page.paypalConfigs.length, 1, 'current report did not render PayPal');
    firstConfig.resolve(response({ enabled: true, client_id: 'stale-client', env: 'live' }));
    await settle();
    assert.equal(page.paypalConfigs.length, 1, 'stale report rendered a second PayPal button set');
    assert(!page.calls.some((call) => call.path === '/pay/orders'));
    return 'payPalRenderVersion discarded stale config and preserved current report buttons';
  });

  await test('delayed openReport response cannot render after successful logout', () => runStaleOpenReport(200));
  await test('delayed openReport response cannot render after failed logout', () => runStaleOpenReport(500));

  await test('delayed loadReports response cannot render after logout', async () => {
    const oldReports = deferred();
    let refreshStarted = false;
    let loggedOut = false;
    const route = async (apiPath) => {
      if (apiPath === '/auth/config') return response({ email_enabled: true });
      if (apiPath === '/auth/me') return response({ authenticated: true, user: { email: 'before@example.com' } });
      if (apiPath === '/reports') {
        if (refreshStarted && !loggedOut) return oldReports.promise;
        return response({ reports: [] });
      }
      if (apiPath === '/auth/logout') { loggedOut = true; return response({}); }
      throw new Error(`Unexpected ${apiPath}`);
    };
    const page = createPage(route);
    await settle();
    refreshStarted = true;
    page.byId.get('refresh-reports').click();
    await settle();
    page.byId.get('logout-button').click();
    await settle();
    oldReports.resolve(response({ reports: [{ report_id: 'STALE-LIST-SENSITIVE', status: 'completed' }] }));
    await settle();
    assert(!allVisibleText(page).includes('STALE-LIST-SENSITIVE'));
    assert.equal(page.byId.get('report-list').children.length, 0);
    assert.equal(page.byId.get('refresh-reports').disabled, false);
    return 'stale list discarded and refresh control left usable';
  });

  await test('verify 200 {} never displays login success', () => runVerifyCase({}, { networkFailure: true }));
  await test('verify authenticated=true + auth/me 500 never displays login success', () => runVerifyCase({ authenticated: true }, { networkFailure: true }));
  await test('verify authenticated=true + auth/me authenticated=false never displays login success', () => runVerifyCase({ authenticated: true }, { data: { authenticated: false } }));

  await test('capture 200 {} cannot unlock full report', () => runCaptureCase({}));
  await test('capture payment_verified=true without full_report cannot unlock', () => runCaptureCase({ payment_verified: true }));

  await test('delayed capture failure after logout cannot rewrite payment UI', async () => {
    const capture = deferred();
    const route = async (apiPath) => {
      if (apiPath === '/auth/config') return response({ email_enabled: true });
      if (apiPath === '/auth/me') return response({ authenticated: true, user: { email: 'before@example.com' } });
      if (apiPath === '/reports') return response({ reports: [{ report_id: 'R-PAY', status: 'completed' }] });
      if (apiPath === '/reports/R-PAY') return response({
        report_id: 'R-PAY', file_ids: ['F-PAY'], status: 'completed', preview: { summary: 'preview' },
      });
      if (apiPath === '/pay/config') return response({ enabled: true, client_id: 'local-client', env: 'sandbox' });
      if (apiPath === '/pay/capture') return capture.promise;
      if (apiPath === '/auth/logout') return response({});
      throw new Error(`Unexpected ${apiPath}`);
    };
    const page = createPage(route);
    await settle();
    reportButton(page).click();
    await settle();
    const approval = page.paypalConfigs[0].onApprove({ orderID: 'LOCAL-ORDER' });
    approval.catch(() => {});
    await settle();
    page.byId.get('logout-button').click();
    await settle();
    assert.equal(page.byId.get('payment-status').hidden, true, 'logout did not initially clear payment UI');
    capture.resolve(response({}, 200));
    await settle();
    assert.equal(page.byId.get('payment-status').hidden, true, 'stale capture rewrote payment UI');
    assert(!page.byId.get('payment-status').textContent.includes('支付确认失败'));
    assert.equal(page.byId.get('full-report').hidden, true, 'stale capture unlocked full report');
    return 'stale capture response and error were both discarded after logout';
  });

  await test('account-A openReport cannot render after direct switch to account B', async () => {
    const oldDetail = deferred();
    let verified = false;
    const route = async (apiPath) => {
      if (apiPath === '/auth/config') return response({ email_enabled: true });
      if (apiPath === '/auth/me') return response(verified
        ? { authenticated: true, user: { email: 'account-b@example.com' } }
        : { authenticated: true, user: { email: 'account-a@example.com' } });
      if (apiPath === '/reports') return response({ reports: verified
        ? [{ report_id: 'R-ACCOUNT-B', status: 'completed' }]
        : [{ report_id: 'R-ACCOUNT-A', status: 'completed' }] });
      if (apiPath === '/reports/R-ACCOUNT-A') return oldDetail.promise;
      if (apiPath === '/auth/verify') { verified = true; return response({ authenticated: true }); }
      throw new Error(`Unexpected ${apiPath}`);
    };
    const page = createPage(route);
    await settle();
    assert(page.byId.get('auth-state').textContent.includes('account-a@example.com'));
    reportButton(page).click();
    await settle();
    page.byId.get('auth-email').value = 'account-b@example.com';
    page.byId.get('auth-code').value = '123456';
    page.byId.get('email-login-form').dispatch('submit');
    await settle();
    assert(page.byId.get('auth-state').textContent.includes('account-b@example.com'));
    assert(allVisibleText(page).includes('R-ACCOUNT-B'));
    oldDetail.resolve(response({
      report_id: 'R-ACCOUNT-A', status: 'completed',
      preview: { summary: 'SENSITIVE-ACCOUNT-A-REPORT', specialty: 'Account A specialty' },
    }));
    await settle();
    assert.equal(page.byId.get('preview-section').hidden, true, 'stale account-A preview rendered');
    assert(!allVisibleText(page).includes('SENSITIVE-ACCOUNT-A-REPORT'));
    assert(!allVisibleText(page).includes('R-ACCOUNT-A'));
    assert(allVisibleText(page).includes('R-ACCOUNT-B'));
    assert(page.byId.get('auth-state').textContent.includes('account-b@example.com'));
    return 'account switch invalidated old detail and rendered only account-B data';
  });

  await test('account-A loadReports cannot render after direct switch to account B', async () => {
    const oldReports = deferred();
    let verified = false;
    let refreshStarted = false;
    let delayedRouteCalls = 0;
    const route = async (apiPath) => {
      if (apiPath === '/auth/config') return response({ email_enabled: true });
      if (apiPath === '/auth/me') return response(verified
        ? { authenticated: true, user: { email: 'account-b@example.com' } }
        : { authenticated: true, user: { email: 'account-a@example.com' } });
      if (apiPath === '/reports') {
        if (refreshStarted) {
          delayedRouteCalls += 1;
          if (delayedRouteCalls === 1) return oldReports.promise;
          return response({ reports: [{ report_id: 'R-ACCOUNT-B', status: 'completed' }] });
        }
        return response({ reports: [{ report_id: 'R-ACCOUNT-A-INITIAL', status: 'completed' }] });
      }
      if (apiPath === '/auth/verify') { verified = true; return response({ authenticated: true }); }
      throw new Error(`Unexpected ${apiPath}`);
    };
    const page = createPage(route);
    await settle();
    refreshStarted = true;
    page.byId.get('refresh-reports').click();
    await settle();
    page.byId.get('auth-email').value = 'account-b@example.com';
    page.byId.get('auth-code').value = '123456';
    page.byId.get('email-login-form').dispatch('submit');
    await settle();
    assert(page.byId.get('auth-state').textContent.includes('account-b@example.com'));
    assert(page.byId.get('auth-feedback').textContent.includes('邮箱验证成功'));
    assert(allVisibleText(page).includes('R-ACCOUNT-B'));
    oldReports.resolve(response({ reports: [{ report_id: 'R-ACCOUNT-A-DELAYED-SENSITIVE', status: 'completed' }] }));
    await settle();
    assert(!allVisibleText(page).includes('R-ACCOUNT-A-DELAYED-SENSITIVE'));
    assert(allVisibleText(page).includes('R-ACCOUNT-B'));
    assert(page.byId.get('auth-state').textContent.includes('account-b@example.com'));
    return 'new account-B list completed independently and stale account-A list was discarded';
  });

  await test('delayed upload cannot write status or file ids after logout', async () => {
    const upload = deferred();
    const route = async (apiPath) => {
      if (apiPath === '/auth/config') return response({ email_enabled: true });
      if (apiPath === '/auth/me') return response({ authenticated: true, user: { email: 'before@example.com' } });
      if (apiPath === '/reports') return response({ reports: [] });
      if (apiPath === '/upload') return upload.promise;
      if (apiPath === '/auth/logout') return response({});
      if (apiPath.startsWith('/analyze')) throw new Error('stale upload must not start analysis');
      throw new Error(`Unexpected ${apiPath}`);
    };
    const page = createPage(route);
    await settle();
    page.byId.get('file-input').dispatch('change', {
      target: { files: [{ name: 'old-record.pdf', size: 1024 }] },
    });
    page.byId.get('start-analysis').click();
    await settle();
    assert(page.calls.some((call) => call.path === '/upload'));
    page.byId.get('logout-button').click();
    await settle();
    assert.equal(page.byId.get('file-list').children.length, 0);
    upload.resolve(response({ file_ids: ['OLD-INTERNAL-FILE-ID'] }));
    await settle();
    assert.notEqual(page.byId.get('upload-status').textContent, '文件上传完成，即将开始 AI 分析');
    assert.notEqual(page.byId.get('upload-percent').textContent, '100%');
    assert(!page.calls.some((call) => call.path.startsWith('/analyze')));
    assert.equal(page.byId.get('file-list').children.length, 0);
    return 'stale upload status/progress and file IDs were discarded; no analyze request or file row returned';
  });

  const failed = results.filter((result) => !result.ok);
  console.log(`SUMMARY total=${results.length} pass=${results.length - failed.length} fail=${failed.length}`);
  process.exitCode = failed.length ? 1 : 0;
})();
