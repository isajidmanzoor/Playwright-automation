# Test Execution Guide - Run Tests by Functionality

**Date:** February 20, 2026

---

## Quick Start

### Run All Tests
```bash
npm test
```

### Run Tests in UI Mode (Interactive)
```bash
npm run test:ui
```

### View HTML Report
```bash
npm run report
```

---

## Run Tests by Module/Functionality

### 1. Authentication Tests Only
```bash
# Run login tests only
npx playwright test tests/Login.spec.js

# With UI mode
npx playwright test tests/Login.spec.js --ui

# In headed mode (visible browser)
npx playwright test tests/Login.spec.js --headed
```

**Expected Results:** 1 test should pass

---

### 2. Shopping Cart & Checkout Tests
```bash
# Run shopping cart tests
npx playwright test tests/AddToCart.spec.js

# View in headed mode
npx playwright test tests/AddToCart.spec.js --headed
```

**Expected Results:** 1 test should pass

---

### 3. Homepage Tests
```bash
# Run homepage tests
npx playwright test tests/HomePage.spec.js
```

**Expected Results:** 1 test should pass

---

### 4. Navigation & DeltaPrime Tests
```bash
# Run all navigation tests for DeltaPrime site
npx playwright test tests/TestPlan.spec.js

# Run a specific test suite
npx playwright test tests/TestPlan.spec.js --grep "Navigation and Page Loading"

# Run with verbose output
npx playwright test tests/TestPlan.spec.js --reporter=verbose
```

**Expected Results:** 28/33 tests pass (84.8%)

### 4a. Run Specific TestPlan.spec.js Test Suites

```bash
# Navigation Tests
npx playwright test tests/TestPlan.spec.js --grep "Navigation and Page Loading"

# Hero Section Tests
npx playwright test tests/TestPlan.spec.js --grep "Homepage Hero Section"

# Services Tests
npx playwright test tests/TestPlan.spec.js --grep "Services Page"

# About Page Tests
npx playwright test tests/TestPlan.spec.js --grep "About Page"

# Contact Page Tests
npx playwright test tests/TestPlan.spec.js --grep "Contact Page"

# Footer Tests
npx playwright test tests/TestPlan.spec.js --grep "Footer"

# Feature Tests
npx playwright test tests/TestPlan.spec.js --grep "Why Choose DeltaPrime"
```

---

### 5. Smart Living Pakistan (SLP) - Complete Suite
```bash
# Run all SLP tests
npx playwright test tests/SLP.spec.js

# View in UI mode for interactive debugging
npx playwright test tests/SLP.spec.js --ui
```

**Expected Results:** 47/50 tests pass (94%)

### 5a. Run Specific SLP Test Categories

```bash
# Smoke Tests (Homepage, Navigation, Basic Features)
npx playwright test tests/SLP.spec.js --grep "SLP-SMOKE"

# Product Tests
npx playwright test tests/SLP.spec.js --grep "SLP-PRODUCT"

# Cart Tests
npx playwright test tests/SLP.spec.js --grep "SLP-CART"

# Checkout Tests
npx playwright test tests/SLP.spec.js --grep "SLP-CHECKOUT"

# Account Tests
npx playwright test tests/SLP.spec.js --grep "SLP-ACCOUNT"

# Contact Tests
npx playwright test tests/SLP.spec.js --grep "SLP-CONTACT"

# Performance Tests
npx playwright test tests/SLP.spec.js --grep "SLP-PERFORMANCE"

# Security Tests
npx playwright test tests/SLP.spec.js --grep "SLP-SECURITY"

# Accessibility Tests
npx playwright test tests/SLP.spec.js --grep "SLP-ACCESSIBILITY"
```

---

### 6. File Upload Tests
```bash
# Run file upload tests
npx playwright test tests/UploadFile/UploadFile.spec.js

# With debugging
npx playwright test tests/UploadFile/UploadFile.spec.js --debug
```

**Expected Results:** 0/1 tests pass (timeout issue)

---

### 7. Assertion & Utility Tests
```bash
# Run assertion tests
npx playwright test tests/assertion.spec.js

# Run AI generated tests
npx playwright test tests/ai/ai.spec.js

# Run seed tests
npx playwright test tests/seed.spec.ts
```

**Expected Results:** All pass

---

## Advanced Test Execution Options

### Run with Specific Browser
```bash
# Run with specific project
npx playwright test tests/Login.spec.js --project=chromium
```

### Run with Debug Mode
```bash
# Step-through debugging
npx playwright test tests/Login.spec.js --debug

# Pause on failure
npx playwright test tests/Login.spec.js --headed --pause-on-error
```

### Run with Custom Timeout
```bash
# Set timeout in milliseconds
npx playwright test tests/TestPlan.spec.js --timeout=60000
```

### Run with Verbose Reporting
```bash
# Verbose output
npx playwright test tests/SLP.spec.js --reporter=verbose

# List all tests without running
npx playwright test tests/SLP.spec.js --list
```

### Run Failed Tests Only
```bash
# Re-run last failed tests
npx playwright test -g "test-failed"

# Note: Run tests once to generate test-results, then use --failed flag
npx playwright test --reporter=json > results.json
```

### Run with Retries
```bash
# Retry failed tests 3 times
npx playwright test tests/SLP.spec.js --retries=3
```

### Parallel Execution
```bash
# Run with specific number of workers
npx playwright test --workers=4

# Single worker (sequential)
npx playwright test --workers=1
```

---

## Test Coverage by Line/Code

### Run Specific Test by Name
```bash
# Run exact test
npx playwright test tests/Login.spec.js -g "login with valid credentials"

# Run tests matching pattern
npx playwright test tests/SLP.spec.js -g "SLP-PRODUCT-001"

# Multiple patterns
npx playwright test tests/SLP.spec.js -g "SLP-CART|SLP-CHECKOUT"
```

### Run Test at Specific Line
```bash
# Run test at specific line number
npx playwright test tests/TestPlan.spec.js:7
```

---

## Generate Reports

### View HTML Report
```bash
# Show interactive HTML report
npm run report
# OR
npx playwright show-report
```

### Generate JSON Report
```bash
npx playwright test --reporter=json > results.json
```

### Generate JUnit XML Report
```bash
npx playwright test --reporter=junit > results.xml
```

### Generate Markdown Report
```bash
npx playwright test --reporter=markdown > TEST_RESULTS.md
```

### View Test Trace (for debugging)
```bash
# Generate trace and view it
npx playwright test tests/Login.spec.js --trace=on
npx playwright show-trace test-results/.../trace.zip
```

---

## Continuous Integration / CI/CD Commands

### GitHub Actions / CI Environment
```bash
# Run tests in CI mode
npm test -- --reporter=github

# Run with retries for flaky tests
npm test -- --retries=2

# Run with timeout for CI
npm test -- --timeout=60000
```

### Create Test Reports for CI
```bash
# Run all tests and generate report
npm test && npm run report
```

---

## Troubleshooting Test Execution

### Test is Timing Out
```bash
# Increase timeout and run in headed mode to observe
npx playwright test tests/UploadFile/UploadFile.spec.js --headed --timeout=120000

# Check what's happening
npx playwright test tests/UploadFile/UploadFile.spec.js --headed --debug
```

### Test is Flaky (Intermittently Fails)
```bash
# Run test multiple times
npx playwright test tests/SLP.spec.js -g "SLP-SMOKE-003" --repeat-each=5

# Run with retries
npx playwright test tests/SLP.spec.js --retries=3
```

### Check Test for Errors
```bash
# Run with verbose reporter to see details
npx playwright test tests/TestPlan.spec.js --reporter=verbose

# See full error output in headed mode
npx playwright test tests/TestPlan.spec.js --headed --reporter=verbose
```

### View Failure Screenshots
```bash
# After test fails, view artifacts
open test-results/test-name-project/

# Check error-context.md for DOM snapshot
cat test-results/test-name-project/error-context.md
```

---

## Test Organization Map

```
tests/
├── Login.spec.js                    (1 test)     ✅ Auth
├── AddToCart.spec.js                (1 test)     ✅ Shopping
├── HomePage.spec.js                 (1 test)     ✅ Homepage
├── TestPlan.spec.js                 (33 tests)   🔶 Navigation
├── SLP.spec.js                      (50 tests)   🔶 E-Commerce
├── UploadFile/
│   └── UploadFile.spec.js          (1 test)     ❌ Upload
├── assertion.spec.js                (2 tests)    ✅ Utilities
├── assertion.spec copy.js           (duplicate)
├── ai/
│   └── ai.spec.js                  (1 test)     ✅ AI Test Gen
├── seed.spec.ts                     (1 test)     ✅ Setup
├── Dropdown.spec.js                 (empty)
└── helpers.js                       (utilities)
```

---

## Quick Command Reference

| Task | Command |
|------|---------|
| Run all | `npm test` |
| Run one file | `npx playwright test tests/FILE.spec.js` |
| Run one test | `npx playwright test tests/FILE.spec.js -g "TEST_NAME"` |
| Run by pattern | `npx playwright test tests/FILE.spec.js --grep "PATTERN"` |
| Interactive mode | `npm run test:ui` |
| View report | `npm run report` |
| Headed mode | `npx playwright test --headed` |
| Debug mode | `npx playwright test --debug` |
| Verbose output | `npx playwright test --reporter=verbose` |
| Retries | `npx playwright test --retries=3` |
| Specific workers | `npx playwright test --workers=4` |

---

## Best Practices for Running Tests

1. **Run Full Suite First**: Always run `npm test` initially to see overall status
2. **Run Isolated Tests for Debugging**: Use specific test names when debugging
3. **Use Headed Mode**: When tests fail, re-run with `--headed` to visually debug
4. **Check Reports**: Always check HTML report after failures: `npm run report`
5. **View Artifacts**: Check `test-results/` for error details and screenshots
6. **Use Debug Mode for Complex Tests**: Use `--debug` flag for step-through debugging
7. **Retry Flaky Tests**: Use `--retries` for intermittent failures during CI/CD

---

## Performance Tips

- **Parallel Execution**: Tests run in 8 workers by default (fast)
- **Run Specific Suite**: Instead of all, run specific test file to save time
- **Use Grep**: Filter tests with `--grep` to run subset of tests
- **Disable Headed Mode**: Headless mode is faster for CI/CD

---

## Environment Variables

```bash
# Disable auto-wait timeout
PWDEBUG=1 npm test

# Slow down execution for debugging (milliseconds)
PWDEBUG=1000 npm test

# Set custom base URL
BASEURL=https://example.com npm test
```

---

## Debugging Failed Tests

1. **Check Error Log**: `cat test-results/*/error-context.md`
2. **Review Screenshot**: `open test-results/*/test-failed-1.png`
3. **Run in Headed Mode**: `npx playwright test FILE.spec.js --headed`
4. **Run with Debug**: `npx playwright test FILE.spec.js --debug`
5. **Check Trace**: `npx playwright show-trace test-results/.../trace.zip`

---

## Documentation Files

- **COMPREHENSIVE_TEST_PLAN.md**: Overall test plan and strategy
- **TEST_EXECUTION_REPORT.md**: Results from latest test run
- **DETAILED_TEST_CASES.md**: Individual test case documentation
- **TEST_EXECUTION_GUIDE.md**: This file (commands and execution)

---

## Support & Issues

**Common Issues:**

1. **Timeout**: Test takes too long
   - Solution: `npx playwright test --timeout=120000`

2. **Element Not Found**: DOM selector is wrong
   - Solution: Run in `--debug` mode and inspect element

3. **Network Error**: Website unreachable
   - Solution: Check internet connection and URL accessibility

4. **Screenshot/Trace Not Generated**: 
   - Solution: Check `test-results/` directory or enable tracing

---

*Guide Created: February 20, 2026*
*Updated for Playwright Test Framework*
