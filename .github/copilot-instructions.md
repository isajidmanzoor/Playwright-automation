## Purpose
This project contains Playwright end-to-end tests. These instructions give an AI coding agent the repo-specific context and conventions needed to make safe, useful edits to tests and configuration.

## Big picture
- **Test runner:** Playwright Test configured in [playwright.config.js](playwright.config.js). Tests live under the `tests/` folder and `testDir` is `./tests`.
- **One project:** Uses a single Playwright project named `chromium` targeting `Desktop Chrome` (see [playwright.config.js](playwright.config.js)).
- **Artifacts:** Test results and failure context are saved under `test-results/` (example: `test-results/.../error-context.md`).

## How to run (quick)
- **Run all tests (CLI):** `npm test` (runs `playwright test`).
- **Run headed (visible browser):** `npx playwright test --headed` or `npm run test:ui`.
- **Open HTML report:** `npm run report` (runs `playwright show-report`).
- **Run a single file:** `npx playwright test tests/UploadFile/UploadFile.spec.js`.

## Project conventions & patterns
- Tests use ESM-style imports (`import { test, expect } from '@playwright/test'`).
- Prefer querying using test ids / data attributes. Existing tests use `data-test` and Playwright's test-id helpers: examples: `page.locator('[data-test="username"]')`, `page.getByTestId('file-input')`, `page.getByText('Sauce Labs Backpack')`.
- Small helper utilities are stored alongside tests: see `tests/helpers.js` which exports a `login(page)` helper reused in `tests/AddToCart.spec.js`.
- Timeouts: some tests specify per-test timeouts (e.g., `{ timeout: 60000 }`) and use explicit expectation timeouts like `.toBeVisible({ timeout: 20000 })`. Follow existing timeout patterns when extending or fixing flaky tests.
- Uploads: tests reference files from the `uploads/` directory via `path.join(process.cwd(), 'uploads', 'image.jpeg')` (see `tests/UploadFile/UploadFile.spec.js`).

## Common patterns to follow when editing tests
- Use existing helpers rather than duplicating login steps — import from [tests/helpers.js](tests/helpers.js).
- Use `page.getByTestId(...)`, `page.locator(...)`, and `page.getByText(...)` consistently as shown in tests.
- When investigating failures, inspect `test-results/` for captured artifacts and `error-context.md` for DOM snapshots.
- Avoid removing explicit per-test timeouts without validating test stability locally (some flows need longer timeouts, e.g., file upload flow).

## Files worth checking when changing behavior
- Configuration: [playwright.config.js](playwright.config.js)
- Test helpers: [tests/helpers.js](tests/helpers.js)
- Upload example: [tests/UploadFile/UploadFile.spec.js](tests/UploadFile/UploadFile.spec.js)
- Login + flow: [tests/Login.spec.js](tests/Login.spec.js) and [tests/AddToCart.spec.js](tests/AddToCart.spec.js)

## Debugging tips (repo-specific)
- Re-run failing test headed: `npx playwright test tests/UploadFile/UploadFile.spec.js --headed --project=chromium` to watch the browser.
- Use `--debug` or `--inspect` with Playwright for step-through debugging if needed.
- Check `test-results/` for screenshots, traces, and `error-context.md` produced by failed runs.

## Dependencies and environment
- Dev dependency: `@playwright/test` (see `package.json`). Node engine is not pinned here — run with a modern Node LTS.

## When to raise to maintainers
- If you need to change global timeouts or the Playwright project matrix in `playwright.config.js`, ask — these reflect test runtime expectations.
- If adding new external services or network calls, confirm CI capability for outbound access.

---
If anything here is unclear or you want additional examples (e.g., how to add a new helper, or adjust timeouts consistently), tell me which area to expand.
