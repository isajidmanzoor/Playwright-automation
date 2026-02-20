# How to Execute the Complete Test Suite

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run All Tests
```bash
npm test
```

### 3. View Results
```bash
npm run report
```

---

## Detailed Execution Commands

### Run Everything
```bash
# Run all tests with default settings
npm test

# Run with specific worker count
npx playwright test --workers=4

# Run in headed mode (see browser)
npx playwright test --headed
```

### Run by Test File

```bash
# Original test suite (1 test)
npx playwright test tests/Login.spec.js

# Shopping tests (1 test)
npx playwright test tests/AddToCart.spec.js

# Homepage tests (1 test)
npx playwright test tests/HomePage.spec.js

# Navigation & Pages tests (33 tests)
npx playwright test tests/TestPlan.spec.js

# E-Commerce tests (50 tests)
npx playwright test tests/SLP.spec.js

# ✨ NEW: Dropdown tests (15 tests - 100% pass)
npx playwright test tests/Dropdown.spec.js

# ✨ NEW: Complete Website tests (80 tests)
npx playwright test tests/CompleteWebsiteTest.spec.js
```

### Run Specific Tests Using Grep

```bash
# By test name pattern
npx playwright test --grep "login"
npx playwright test --grep "dropdown"
npx playwright test --grep "homepage"

# Complete website tests by ID
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "CW-001"
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "CW-0[1-5]"

# Test specific suites
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Homepage"
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Navigation"
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Forms"
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Responsive"
```

### Generate Reports

```bash
# Show HTML report
npm run report

# Show report with specific project
npx playwright show-report

# Generate report in specific format
npx playwright test --reporter=html
```

### Interactive Mode

```bash
# UI mode (interactive testing)
npx playwright test --ui

# Debug specific test
npx playwright test tests/CompleteWebsiteTest.spec.js --debug

# Headed mode with pause
npx playwright test tests/CompleteWebsiteTest.spec.js --headed --workers=1
```

### Advanced Options

```bash
# Run single worker (slower but more stable)
npx playwright test --workers=1

# No parallelization, sequential execution
npx playwright test --workers=1 --reporter=list

# Verbose output
npx playwright test --reporter=verbose

# List all tests without running
npx playwright test --list

# Update snapshots (if using visual comparisons)
npx playwright test --update-snapshots
```

---

## Test Categories and Execution

### By Application

```bash
# Sauce Labs Tests (shopping demo)
npx playwright test tests/CompleteWebsiteTest.spec.js
npx playwright test tests/AddToCart.spec.js
npx playwright test tests/Login.spec.js

# DeltaPrime AI (SLP - Smart Living)
npx playwright test tests/SLP.spec.js

# General Pages & Navigation
npx playwright test tests/TestPlan.spec.js

# Form Elements & Dropdowns
npx playwright test tests/Dropdown.spec.js
```

### By Feature

```bash
# Authentication & Login
npx playwright test tests/Login.spec.js

# Shopping Cart & Checkout
npx playwright test tests/AddToCart.spec.js

# Navigation & Page Loading
npx playwright test tests/TestPlan.spec.js

# E-Commerce Operations
npx playwright test tests/SLP.spec.js

# Form Functionality
npx playwright test tests/Dropdown.spec.js

# Homepage Functionality
npx playwright test tests/HomePage.spec.js
```

### By Suite (Complete Website Tests)

```bash
# Homepage & Page Load Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Homepage"

# Navigation & Menu Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Navigation"

# Header & Footer Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Header"

# Forms & Validation Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Forms"

# Content Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Content"

# Buttons & Interactions Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Buttons"

# Links & Navigation Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Links"

# Responsive Design Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Responsive"

# Accessibility Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Accessibility"

# Performance & Security Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Performance"

# User Flows Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "User Flows"

# Error Handling Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Error"

# Edge Cases Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Edge"

# Browser Features Tests
npx playwright test tests/CompleteWebsiteTest.spec.js --grep "Browser"
```

---

## Performance & Optimization

### Fast Execution
```bash
# Maximum parallelization (8 workers)
npx playwright test --workers=8

# Run only failed tests
npx playwright test --only-failed

# Quick smoke test (first 5 tests only)
npx playwright test --grep "CW-00[1-5]"
```

### Detailed Testing
```bash
# Single worker for sequential execution
npx playwright test --workers=1

# With detailed output
npx playwright test --reporter=verbose

# With trace for debugging
npx playwright test --trace=on
```

---

## Continuous Integration

### GitHub Actions / CI/CD Setup
```bash
# Install dependencies
npm ci

# Run tests in CI environment
npm test -- --workers=1

# Generate report
npm run report

# Upload results
# (Configure in your CI/CD config file)
```

---

## Troubleshooting

### If Tests Fail

1. **Check browser installation:**
   ```bash
   npx playwright install chromium
   ```

2. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Run in debug mode:**
   ```bash
   npx playwright test --debug --headed
   ```

4. **Check test results:**
   ```bash
   ls -la test-results/
   npm run report
   ```

### If Specific Test Times Out

1. **Run with single worker:**
   ```bash
   npx playwright test tests/CompleteWebsiteTest.spec.js --workers=1
   ```

2. **Increase timeout:**
   - Edit the test file and adjust timeout manually
   - Or run with environment variable: `TIMEOUT=60000 npm test`

3. **Run in headed mode to watch:**
   ```bash
   npx playwright test tests/CompleteWebsiteTest.spec.js --headed
   ```

---

## Test Execution Timeline

| Action | Duration | Command |
|--------|----------|---------|
| Single test | ~2-5 sec | `npx playwright test tests/Login.spec.js` |
| One suite (15 tests) | ~30-40 sec | `npx playwright test tests/Dropdown.spec.js` |
| Website suite (80 tests) | ~2-3 min | `npx playwright test tests/CompleteWebsiteTest.spec.js` |
| All tests (170+ tests) | ~15-20 min | `npm test` |

---

## Documentation Reference

For more information, see:

- **COMPREHENSIVE_TEST_PLAN.md** - Overall testing strategy
- **TEST_EXECUTION_GUIDE.md** - Detailed execution examples
- **TEST_EXECUTION_REPORT.md** - Results from test runs
- **COMPLETE_WEBSITE_TEST_DOCUMENTATION.md** - Complete website test details
- **DROPDOWN_TEST_REPORT.md** - Dropdown test results
- **README_TESTING.md** - Quick reference guide

---

## Expected Results

### Successful Execution
```
✓ All tests passed
✓ 170+ tests completed
✓ 91.5% success rate
✓ Report generated in test-results/
✓ HTML report available at index.html
```

### Partial Issues
```
🔶 Some navigation tests may fail (DOM selector issues)
🔶 File upload test may timeout (network dependent)
→ This is expected and documented - see TEST_EXECUTION_REPORT.md
```

---

## Next Steps After Running Tests

1. ✅ Check HTML report: `npm run report`
2. ✅ Review failed tests in `test-results/`
3. ✅ Update selectors if DOM changed
4. ✅ Fix identified issues
5. ✅ Re-run to verify fixes
6. ✅ Integrate into CI/CD pipeline

---

**Ready to test! Choose a command above and run it in your terminal.**

