// Node 22+, a running portfolio and Chrome with --remote-debugging-port=9333.
// No browser dependency: drive real session history through Chrome's native protocol.
import assert from "node:assert/strict";
import { once } from "node:events";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000/";
const endpoint = process.env.CHROME_DEBUG_URL || "http://127.0.0.1:9333";
const { webSocketDebuggerUrl } = await (await fetch(`${endpoint}/json/version`)).json();
const socket = new WebSocket(webSocketDebuggerUrl);
await once(socket, "open");
let sequence = 0;
const pending = new Map();
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (!pending.has(message.id)) return;
  const { resolve, reject, timer } = pending.get(message.id);
  clearTimeout(timer);
  pending.delete(message.id);
  if (message.error) reject(new Error(JSON.stringify(message.error)));
  else resolve(message.result);
});
function send(method, params = {}, sessionId) {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 15000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
}
const { browserContextId } = await send("Target.createBrowserContext");
let targetId;
try {
  ({ targetId } = await send("Target.createTarget", { url: "about:blank", browserContextId }));
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const call = (method, params) => send(method, params, sessionId);
  const evaluate = async (expression, userGesture = false) => {
    const result = await call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true, userGesture });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  async function waitFor(expression) {
    for (let i = 0; i < 100; i++) {
      try { if (await evaluate(expression)) return; }
      catch (error) {
        if (!/context.*(destroyed|not found)|Cannot find context|Inspected target navigated or closed/i.test(error.message)) throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw new Error(`Not reached: ${expression}; URL=${await evaluate("location.href")}`);
  }
  const reload = async () => {
    const before = await evaluate("performance.timeOrigin");
    await call("Page.reload");
    await waitFor(`performance.timeOrigin !== ${before} && document.readyState === 'complete'`);
  };
  const click = selector => evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`, true);
  const tap = async selector => {
    await call("Page.bringToFront");
    const { x, y } = await evaluate(`(() => { const e=document.querySelector(${JSON.stringify(selector)}); e.scrollIntoView({block:'center'}); const r=e.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
    await call("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    await call("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  };
  const traverse = async delta => {
    const { currentIndex, entries } = await call("Page.getNavigationHistory");
    assert.ok(entries[currentIndex + delta], "Expected a browser history entry");
    await call("Page.navigateToHistoryEntry", { entryId: entries[currentIndex + delta].id });
  };
  const back = () => traverse(-1);
  await call("Page.enable");
  await call("Page.bringToFront");
  await call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await call("Emulation.setTouchEmulationEnabled", { enabled: true });
  const forward = () => traverse(1);
  const launcher = "!!document.querySelector('.ios-home') && !document.querySelector('.desktop').classList.contains('mobile-app-open') && !document.querySelector('dialog[open]')";
  const projects = "document.querySelector('.desktop')?.classList.contains('mobile-app-open') && document.querySelector('.view-heading')?.textContent.includes('Du concret') && !document.querySelector('dialog[open]')";
  const openProjects = () => evaluate("[...document.querySelectorAll('.ios-home button')].find(b=>b.textContent.trim()==='Projets').click()", true);
  for (const ecosystem of ["google", "apple"]) {
    console.log(`Checking ${ecosystem} at ${base}`);
    await call("Page.navigate", { url: "about:blank" });
    await waitFor("location.href === 'about:blank'");
    await call("Page.navigate", { url: base });
    await waitFor("!!document.querySelector('.experience-dialog[open]')");
    await click(`.option-${ecosystem}`);
    await waitFor(launcher);
    const rootLength = await evaluate("history.length");
    await openProjects();
    await waitFor(projects);
    await back();
    await new Promise(resolve => setTimeout(resolve, 250));
    assert.equal(await evaluate("location.origin"), new URL(base).origin, "Native Back must not leave the portfolio from Projects");
    await waitFor(launcher);
    await forward();
    await waitFor(projects);
    await click(".project-card");
    await waitFor("!!document.querySelector('.project-dialog[open]')");
    await back();
    await waitFor(projects);
    await forward();
    await waitFor("!!document.querySelector('.project-dialog[open]')");
    await reload();
    await waitFor("!!document.querySelector('.project-dialog[open]')");
    await click(".project-dialog .dialog-top button");
    await waitFor(projects);
    await back();
    await waitFor(launcher); // No ghost modal entry left by the close button.
    await openProjects();
    await waitFor(projects);
    const beforeDuplicate = await evaluate("history.length");
    await click(".ios-tabs button:nth-child(2)");
    assert.equal(await evaluate("history.length"), beforeDuplicate, "Repeated current tab must not add history");
    await click(".ios-tabs button:last-child");
    await waitFor("document.querySelector('.view-heading')?.textContent.includes('ensemble')");
    await back();
    await waitFor(projects);
    await click(".ios-app-settings");
    await waitFor("!!document.querySelector('.ios-settings[open]')");
    await call("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
    await call("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
    await waitFor(projects);
    await click(".ios-app-settings");
    await waitFor("!!document.querySelector('.ios-settings[open]')");
    await click(".ios-settings [data-experience-trigger]");
    await waitFor("!!document.querySelector('.experience-dialog[open]')");
    await back();
    await waitFor("!!document.querySelector('.ios-settings[open]')");
    await back();
    await waitFor(projects);
    await back();
    await waitFor(launcher);
    await click(".ios-search-trigger");
    await waitFor("!!document.querySelector('.ios-spotlight[open]')");
    await evaluate("[...document.querySelectorAll('.ios-search-results button')].find(b=>b.textContent.includes('Voakajy')).click()", true);
    await waitFor("!!document.querySelector('.project-dialog[open]')");
    await back();
    await waitFor("!!document.querySelector('.ios-spotlight[open]')");
    await back();
    await waitFor(launcher);
    assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true);
    assert.ok(await evaluate("history.length") > rootLength);
    await evaluate("localStorage.removeItem('portfolio-experience')");
    await back();
    await waitFor("location.href === 'about:blank'"); // Root stays escapable: no Back trap.
    console.log(`PASS ${ecosystem}: native Back/Forward, project close, reload, tabs, nested settings, search, root exit.`);
  }
  await call("Page.navigate", { url: base });
  await waitFor("!!document.querySelector('.experience-dialog[open]')");
  await call("Page.bringToFront");
  await evaluate(`window.fullscreenCalls=0; const request=document.documentElement.requestFullscreen.bind(document.documentElement); document.documentElement.requestFullscreen=(...args)=>{window.fullscreenCalls++; return request(...args);}`);
  assert.equal(await evaluate("!!document.fullscreenElement"), false, "No fullscreen before a user gesture");
  await tap(".option-google");
  await waitFor("!!document.fullscreenElement");
  assert.equal(await evaluate("window.fullscreenCalls"), 1);
  await evaluate("document.exitFullscreen()");
  await waitFor("!document.fullscreenElement");
  await tap(".ios-launch-app");
  assert.equal(await evaluate("window.fullscreenCalls"), 1, "Do not force fullscreen again after an exit");
  await click(".ios-app-settings");
  await waitFor("!!document.querySelector('.ios-settings[open]')");
  await click(".fullscreen-control");
  await waitFor("!!document.fullscreenElement");
  await click(".fullscreen-control");
  await waitFor("!document.fullscreenElement");
  console.log("PASS fullscreen: first real tap, no forced re-entry, settings enter/exit.");

  // Rejected/absent APIs must leave navigation usable, with installation guidance.
  await evaluate("document.documentElement.requestFullscreen=()=>Promise.reject(new Error('denied by test'))");
  await click(".fullscreen-control");
  await waitFor("document.querySelector('.ios-settings .mobile-fullscreen-note')?.textContent.includes('Partager')");
  await back();
  await waitFor("!document.querySelector('dialog[open]')");
  await back();
  await waitFor(launcher);
  await evaluate("Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, value: false }); document.dispatchEvent(new Event('fullscreenchange'))");
  await waitFor("document.querySelector('.ios-home .mobile-fullscreen-note')?.textContent.includes('Partager')");
  await openProjects();
  await waitFor(projects);
  await back();
  await waitFor(launcher);
  console.log("PASS fullscreen fallback: denied/unsupported API, navigation preserved.");

  const manifest = await (await fetch(new URL("/manifest.webmanifest", base))).json();
  assert.equal(manifest.display, "fullscreen");
  assert.equal(manifest.start_url, "/");
  for (const icon of manifest.icons) assert.equal((await fetch(new URL(icon.src, base))).status, 200);
  assert.equal(await evaluate("document.querySelector('meta[name=mobile-web-app-capable]')?.content"), "yes");
  assert.equal(await evaluate("document.querySelector('meta[name=apple-mobile-web-app-title]')?.content"), "Randry");
  console.log("PASS installed-app metadata and icons.");

  await call("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  const mouseClick = async selector => {
    const point = await evaluate(`(() => { const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
    await call("Input.dispatchMouseEvent", { type: "mousePressed", button: "left", clickCount: 1, ...point });
    await call("Input.dispatchMouseEvent", { type: "mouseReleased", button: "left", clickCount: 1, ...point });
  };
  for (const ecosystem of ["google", "apple"]) {
    await evaluate(`localStorage.setItem('portfolio-experience', ${JSON.stringify(ecosystem)})`);
    await reload();
    await waitFor("!!document.querySelector('.desktop:not(.preference-loading)')");
    const power = ecosystem === "google" ? ".chrome-system-controls .desktop-power" : ".menubar .desktop-power";
    await mouseClick("nav[aria-label='Navigation principale'] button:nth-child(2)");
    await waitFor(projects);
    await waitFor("!!document.fullscreenElement");
    await waitFor(`document.querySelector(${JSON.stringify(power)})?.getAttribute('aria-pressed') === 'true'`);
    assert.match(await evaluate(`document.querySelector(${JSON.stringify(power)}).textContent`), /Éteindre/);
    const before = await evaluate("({view:history.state.portfolioView,length:history.length,url:location.href})");
    await click(power);
    await waitFor("!document.fullscreenElement");
    assert.deepEqual(await evaluate("({view:history.state.portfolioView,length:history.length,url:location.href})"), before, "Power only exits fullscreen; preserve page, tab and history");
    await mouseClick("nav[aria-label='Navigation principale'] button:last-child");
    await waitFor("document.querySelector('.view-heading')?.textContent.includes('ensemble')");
    assert.equal(await evaluate("!!document.fullscreenElement"), false, "Do not re-enter after Power");
    await click(power);
    await waitFor("!!document.fullscreenElement");
    await evaluate("document.exitFullscreen()"); // Same fullscreenchange as browser Escape.
    await waitFor("!document.fullscreenElement");
    await back();
    await waitFor(projects);
    assert.equal(await evaluate("!!document.fullscreenElement"), false, "Native Back must not force fullscreen");
    console.log(`PASS desktop ${ecosystem}: first click, Power exit, preserved navigation, manual re-entry.`);
  }
  await evaluate("localStorage.removeItem('portfolio-experience')");
  await call("Page.navigate", { url: "about:blank" });
  await waitFor("location.href === 'about:blank'");
  await call("Page.navigate", { url: base });
  await waitFor("!!document.querySelector('.experience-dialog[open]')");
  await mouseClick(".option-google");
  await waitFor("!!document.fullscreenElement");
  await waitFor("document.querySelector('.chrome-system-controls .desktop-power')?.getAttribute('aria-pressed') === 'true'");
  await click(".chrome-system-controls .desktop-power");
  await waitFor("!document.fullscreenElement");
  await evaluate("Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, value: false }); document.dispatchEvent(new Event('fullscreenchange'))");
  await waitFor("document.querySelector('.chrome-system-controls .desktop-power').disabled");
  await call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  assert.equal(await evaluate("[...document.querySelectorAll('.desktop-power')].filter(e=>e.getClientRects().length).length"), 0);
  console.log("PASS desktop first-visit chooser, unsupported API, desktop-only Power control.");
} finally {
  try {
    if (targetId) await send("Target.closeTarget", { targetId });
    await send("Target.disposeBrowserContext", { browserContextId });
  }
  catch (error) { console.error(`Browser cleanup failed: ${error.message}`); process.exitCode = 1; }
  finally { socket.close(); }
}
