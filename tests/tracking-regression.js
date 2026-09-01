/**
 * tracking-regression.js — Automated regression test for the tracking pipeline
 * (GA4 / GTM / Google Ads / Meta Pixel) on dubaiapprovalconsultants.com.
 *
 * WHY THIS EXISTS
 * ---------------------------------------------------------------------------
 * Aug 2026: GA4 went dark because dataLayer[0] was `page_view` (the official
 * `gtm.start` marker was missing) AND GTM was deferred to browser idle. GTM's
 * GA4 Configuration tag threw a tag error on `gtm.init` (GTM health beacon
 * `TS5googtag.TI5.TE2`) and the container-mode gtag.js never received its
 * config command, so GA4 never initialized. This test guards against that
 * exact regression so it can never silently ship again.
 *
 * WHAT IT ASSERTES (fails loudly — non-zero exit — for CI before every deploy)
 *   1. dataLayer[0] is the official `gtm.start` marker (event: "gtm.js").
 *   2. The GA4 Configuration tag reports NO tag error: container-mode gtag
 *      is healthy (`window.google_tag_data.gl` object present) AND a GA4
 *      collect request fires to analytics.google.com / stats.g.doubleclick.net.
 *   3. A successful /free-quote submission pushes `quote_submit_success`
 *      to the dataLayer (drives the Google Ads conversion tag).
 *
 * The Apps Script webhook POST is MOCKED (intercepted) so the test is
 * deterministic and does not create real leads. Everything else (GTM, GA4,
 * Meta) hits the real network — this test requires internet access, exactly
 * like GTM Preview mode.
 *
 * USAGE
 *   npm run build            # once, or rely on test:tracking:ci
 *   npm run test:tracking    # builds nothing; spawns next start on :3115
 *   npm run test:tracking:ci # next build + test:tracking (CI entry point)
 *
 *   # against an already-running server instead of spawning one:
 *   TARGET_URL=http://localhost:3100 npm run test:tracking
 *
 *   # override Chrome path (default: the documented Windows Chrome path):
 *   CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe" npm run test:tracking
 */
"use strict";

const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");
const path = require("path");

/* --------------------------------------------------------------------------
 * Configuration
 * ------------------------------------------------------------------------ */
const ROOT = path.resolve(__dirname, "..");
const CHROME =
  process.env.CHROME ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const TARGET_URL = process.env.TARGET_URL || null;
const SERVE_PORT = process.env.PORT || "3115";
const BASE_URL = TARGET_URL || `http://localhost:${SERVE_PORT}`;

// Must match APPS_SCRIPT.url in src/data/free-quote.ts (mock target).
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxCDHwI9ISmmUIUC_HTVMbDSZ0FUyWRgCulMfXVXYrtBtcQl5WP2qDpTPLA0Q2L7Hcf/exec";

// Proven GA4-health signals from the Aug 2026 investigation (Test 17 PASS):
// gl object in google_tag_data + a collect hit to either endpoint.
const COLLECT_RE = /(?:analytics\.google\.com|stats\.g\.doubleclick\.net)\/g\/collect/;

/* --------------------------------------------------------------------------
 * Small helpers
 * ------------------------------------------------------------------------ */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let failures = 0;
function check(name, ok, detail) {
  if (ok) {
    console.log(`  \u2713 ${name}`);
  } else {
    failures++;
    console.error(`  \u2717 ${name}${detail ? " — " + detail : ""}`);
  }
}

async function waitFor(desc, fn, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      if (await fn()) return true;
    } catch {
      /* retry */
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for: ${desc} (${timeoutMs}ms)`);
}

/* Click an option card inside the quote wizard by visible text. */
async function clickOption(page, text) {
  const ok = await page.evaluate((t) => {
    const btn = Array.from(
      document.querySelectorAll('form[name="quoteForm"] fieldset button[type="button"]')
    ).find((b) => (b.textContent || "").includes(t));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  }, text);
  if (!ok) throw new Error(`Option card not found: "${text}"`);
}

/* Click the wizard's primary nav button (Next / Submit). The nav buttons live
 * OUTSIDE the <fieldset> elements; option cards live inside them. */
async function clickPrimaryNav(page) {
  const ok = await page.evaluate(() => {
    const btn = Array.from(
      document.querySelectorAll('form[name="quoteForm"] button[type="button"]')
    )
      .filter((b) => !b.closest("fieldset"))
      .pop();
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  if (!ok) throw new Error("Primary nav button not found");
}

async function waitForOption(page, text, timeoutMs = 10000) {
  await waitFor(
    `option "${text}" to render`,
    () =>
      page.evaluate(
        (t) =>
          Array.from(
            document.querySelectorAll('form[name="quoteForm"] fieldset button[type="button"]')
          ).some((b) => (b.textContent || "").includes(t)),
        text
      ),
    timeoutMs
  );
}

/* --------------------------------------------------------------------------
 * Server orchestration (only when no TARGET_URL is given)
 * ------------------------------------------------------------------------ */
let server = null;
let serverLog = "";

async function startServer() {
  if (TARGET_URL) return null;
  console.log(`Starting production server: next start -p ${SERVE_PORT} ...`);
  server = spawn(
    process.execPath,
    [path.join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", SERVE_PORT],
    { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] }
  );
  server.stdout.on("data", (d) => (serverLog += d));
  server.stderr.on("data", (d) => (serverLog += d));

  await waitFor(
    `server ready at ${BASE_URL}`,
    async () => {
      if (server.exitCode !== null) {
        throw new Error("Server exited before becoming ready:\n" + serverLog);
      }
      try {
        const res = await fetch(BASE_URL + "/robots.txt");
        return res.status < 500; // any response means the server is up
      } catch {
        return false;
      }
    },
    90000
  );
  console.log(`Server ready at ${BASE_URL}`);
}

function stopServer() {
  if (!server || server.exitCode !== null) return;
  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", String(server.pid), "/f", "/t"], { stdio: "ignore" });
  } else {
    server.kill("SIGTERM");
  }
}

/* --------------------------------------------------------------------------
 * Browser + page helpers
 * ------------------------------------------------------------------------ */
async function newPage(browser) {
  const page = await browser.newPage();
  const collectUrls = [];
  const beacons = [];
  const consoleErrors = [];

  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = req.url();
    // Mock the Apps Script webhook so the "lead" is deterministic (no real lead).
    // The browser enforces CORS on the synthetic response, so we must echo the
    // Access-Control-Allow-Origin header for the page origin to read it.
    if (url.startsWith("https://script.google.com/macros/")) {
      req.respond({
        status: 200,
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: true }),
      });
      return;
    }
    if (COLLECT_RE.test(url)) collectUrls.push(url);
    if (/googletagmanager\.com\/a\?v=3&t=l/.test(url)) beacons.push(url);
    req.continue();
  });
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  return { page, collectUrls, beacons, consoleErrors };
}

async function assertNoGa4TagError(page, collectUrls, label) {
  const healthy = await waitFor(
    `${label}: GA4 config healthy (google_tag_data.gl + collect)`,
    async () => {
      const gl = await page.evaluate(
        () => !!(window.google_tag_data && window.google_tag_data.gl)
      );
      return gl && collectUrls.length > 0;
    },
    20000
  );
  check(
    `${label}: GA4 Configuration tag reports NO tag error (gl object present + collect fired)`,
    healthy,
    healthy ? "" : `collectUrls=${collectUrls.length}`
  );
}

/* --------------------------------------------------------------------------
 * Assertions
 * ------------------------------------------------------------------------ */
async function assertGtmStartMarker(page) {
  const dl0 = await page.evaluate(() => {
    const d = window.dataLayer;
    return Array.isArray(d) && d.length ? d[0] : null;
  });
  const ok =
    !!dl0 &&
    dl0.event === "gtm.js" &&
    typeof dl0["gtm.start"] === "number" &&
    dl0["gtm.start"] > 0;
  check(
    "dataLayer[0] is the official gtm.start marker (event: 'gtm.js')",
    ok,
    ok ? "" : `dataLayer[0]=${JSON.stringify(dl0)}`
  );
}

async function driveQuoteSubmission(page) {
  console.log("  Driving /free-quote wizard to completion (Apps Script POST mocked)...");
  await page.goto(BASE_URL + "/free-quote", { waitUntil: "domcontentloaded", timeout: 60000 });

  // Step 0 — Service
  await waitForOption(page, "DM Approval");
  await clickOption(page, "DM Approval");
  await clickPrimaryNav(page);

  // Step 1 — Location
  await waitForOption(page, "Dubai Mainland");
  await clickOption(page, "Dubai Mainland");
  await clickPrimaryNav(page);

  // Step 2 — Timeline
  await waitForOption(page, "Urgent");
  await clickOption(page, "Urgent");
  await clickPrimaryNav(page);

  // Step 3 — Details
  await page.waitForSelector("#quote-details", { timeout: 10000 });
  await page.type("#quote-details", "Regression test project - shop fit-out");
  await clickPrimaryNav(page);

  // Step 4 — Contact
  await page.waitForSelector("#quote-email", { timeout: 10000 });
  await page.type("#quote-name", "Tracking Regression");
  await page.type("#quote-phone", "+971500000000");
  await page.type("#quote-email", "regression@wasleen.test");
  await clickPrimaryNav(page); // Submit

  // Assert quote_submit_success reaches the dataLayer (drives Google Ads tag).
  const gotSuccess = await waitFor(
    "quote_submit_success in dataLayer",
    () =>
      page.evaluate(
        () =>
          (window.dataLayer || []).some(
            (d) => d && d.event === "quote_submit_success"
          )
      ),
    15000
  );
  check("quote_submit_success pushed to dataLayer after successful submit", gotSuccess);

  const dlEvents = await page.evaluate(() =>
    (window.dataLayer || [])
      .map((d) => d && d.event)
      .filter(Boolean)
  );
  const hasSubmit = dlEvents.includes("quote_submit");
  check("quote_submit pushed before quote_submit_success", hasSubmit, dlEvents.join(","));

  if (!gotSuccess) {
    // Diagnostics for debugging a failed conversion path (never silently passes).
    const diag = await page.evaluate(() => ({
      stillOnContactStep: !!document.querySelector("#quote-email"),
      errorScreen: /error|failed/i.test(document.body.innerText.slice(0, 400)),
      successScreen: /success|thank you|received/i.test(document.body.innerText.slice(0, 400)),
      text: document.body.innerText.slice(0, 300),
    }));
    console.error("  DIAGNOSTIC (conversion path):", JSON.stringify(diag, null, 2));
  }
}

/* --------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------ */
(async () => {
  let browser;
  try {
    await startServer();

    console.log(`Launching Chrome: ${CHROME}`);
    browser = await puppeteer.launch({
      executablePath: CHROME,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    });

    /* --- Scenario 1: homepage GTM/GA4 health --- */
    console.log("\n[1/2] Homepage — GTM bootstrap + GA4 health");
    const { page, collectUrls } = await newPage(browser);
    await page.goto(BASE_URL + "/", { waitUntil: "domcontentloaded", timeout: 60000 });

    await assertGtmStartMarker(page);
    await assertNoGa4TagError(page, collectUrls, "Homepage");
    await page.close();

    /* --- Scenario 2: free-quote conversion path --- */
    console.log("\n[2/2] Free-quote — conversion event");
    const { page: page2, collectUrls: collectUrls2 } = await newPage(browser);
    await page2.goto(BASE_URL + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
    await assertNoGa4TagError(page2, collectUrls2, "Free-quote page (before wizard)");
    await driveQuoteSubmission(page2);
    await page2.close();

    console.log("\n======================================================");
    if (failures === 0) {
      console.log("TRACKING REGRESSION: PASS \u2713");
      console.log("  - gtm.start marker at dataLayer[0]");
      console.log("  - GA4 Configuration tag: no tag error (gl + collect)");
      console.log("  - quote_submit_success fired");
    } else {
      console.error(`TRACKING REGRESSION: FAIL \u2717 (${failures} assertion(s) failed)`);
    }
    console.log("======================================================");
  } catch (err) {
    failures++;
    console.error("\nTRACKING REGRESSION: ERROR \u2717");
    console.error(err && err.stack ? err.stack : String(err));
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {
        /* ignore */
      }
    }
    stopServer();
  }

  // Loud, non-zero exit for CI. Never silently pass.
  process.exitCode = failures === 0 ? 0 : 1;
})();
