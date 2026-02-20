# Smart Living Pakistan — Test Plan

Generated: February 18, 2026

## Purpose
Short, actionable test plan for the `tests/SLP.spec.js` coverage of Smart Living Pakistan (https://smartlivingpakistan.com).

## Scope
- Smoke and functional checks for the homepage and key public site elements (navigation, hero CTA, contact links, footer).
- Accessibility, basic SEO checks, and edge-case verifications (404, broken links).

## Test Objectives
- Confirm homepage loads and the expected title/hero content are present.
- Verify primary navigation links (Home, Products/Services, About, Contact) work.
- Validate CTA (Get Started / Contact) navigates correctly.
- Check contact links: `mailto:` and `tel:` and contact form presence (if exists).
- Verify footer content and social links.
- Run accessibility spot checks: images alt text, heading structure, link tex
.
- Confirm page load performance is acceptable (<=10s) on CI baseline.

## Test Suites & Cases

1) Homepage Smoke
- Case 1.1 — Page loads successfully
  - Steps: navigate to `/`; expect HTTP 200 and page title contains site name.
  - Pass criteria: `page.title()` matches expected value.

- Case 1.2 — Hero content & CTA
  - Steps: locate hero heading and CTA; click CTA.
  - Pass: hero heading visible; CTA navigates to `/contact` or opens contact modal.

2) Navigation
- Case 2.1 — Main nav links
  - Steps: click each top navigation link (Home, Services/Products, About, Contact).
  - Pass: each link navigates to the correct URL with expected heading visible.

- Case 2.2 — Logo returns home
  - Steps: click site logo from non-home page.
  - Pass: navigates back to homepage.

3) Contact & Footer
- Case 3.1 — Contact info links
  - Steps: inspect `mailto:` and `tel:` anchors in the contact/footer.
  - Pass: `href` attributes include `mailto:` and `tel:` values.

- Case 3.2 — Contact form (if present)
  - Steps: fill name/email/message and verify form accepts values.
  - Pass: inputs accept values; optionally submit in non-destructive mode (if dev/test endpoint available).

- Case 3.3 — Footer links & social
  - Steps: verify footer text, social links, privacy/terms links.
  - Pass: all expected links visible and have appropriate `href`.

4) Accessibility & SEO spot checks
- Case 4.1 — Images include `alt` attributes
- Case 4.2 — Heading structure: at least one `h1` and multiple `h2`
- Case 4.3 — Links have readable text or `aria-label`
- Case 4.4 — Meta tags present: `title`, `meta[name="description"]`, `canonical` (if applicable)

5) Performance & Edge cases
- Case 5.1 — Page load time within threshold
  - Pass: measured loadTime < 10,000 ms (CI baseline may vary).

- Case 5.2 — Invalid path handling
  - Steps: navigate to `/nonexistent-page` and assert graceful 404 or redirect.

- Case 5.3 — Broken links scan
  - Steps: optionally run a quick crawler (CI) to detect 4xx links on homepage.

## Selectors & Examples (Playwright)
- Homepage: `await page.goto('https://smartlivingpakistan.com');`
- Title assert: `await expect(page).toHaveTitle(/Smart Living Pakistan|SmartLiving/);`
- Hero CTA: `page.locator('text=Get Started').first()` or `page.locator('a[href*="contact"]')`
- Contact mail link: `page.locator('a[href^="mailto:"]')`
- Phone link: `page.locator('a[href^="tel:"]')`
- Footer: `page.locator('footer')`

## Test Data & Environment
- Run locally (headed) for exploratory debugging and headed reproduction.
- CI: run in headless `chromium` and optionally `webkit`/`safari` if supported.
- Timeouts: allow `await expect(...).toBeVisible({ timeout: 5000 })` for dynamic content.

## How to Run
- All tests:
```
npm test
```
- Single spec (SLP):
```
npx playwright test tests/SLP.spec.js --headed
```
- Rerun a failing test with trace and screenshot:
```
npx playwright test tests/SLP.spec.js -g "Check Smart Living Pakistan homepage title" --headed --trace on
```

## Acceptance Criteria
- All smoke tests pass on main branch for `chromium` within CI baseline.
- No critical accessibility regressions (missing H1 or missing `alt` on major images).
- Contact links functional.

## Notes & Recommendations
- If homepage content frequently changes (marketing updates), prefer text-contains locators rather than exact-match text.
- For flaky visual elements, add explicit waits or broaden locators.
- Consider adding simple link checker to CI to detect content regressions early.

---

Saved file: `specs/SLP-test-plan.md`