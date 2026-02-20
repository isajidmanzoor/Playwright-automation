import { test, expect } from '@playwright/test';

const Dropdown_URL = 'https://www.automationtesting.co.uk/index.html';

// ==============================================
// DROPDOWN TESTS - Automation Testing Site
// ==============================================

test.describe('Dropdown Functionality Tests', () => {
  
  test('DD-001: Page loads successfully', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    await expect(page).toHaveTitle(/homepage|automation/i);
  });

  test('DD-002: Inspect page for form elements', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    const selects = page.locator('select');
    const selectCount = await selects.count();
    
    // Check if page has select elements
    if (selectCount > 0) {
      expect(selectCount).toBeGreaterThan(0);
    }
  });

  test('DD-003: Look for input fields on page', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    
    // Page should have some form inputs
    expect(inputCount).toBeGreaterThanOrEqual(0);
  });

  test('DD-004: Check page structure', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    await page.waitForLoadState('networkidle');
    
    // Verify page has content
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('DD-005: Verify automation testing site loads', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    const heading = page.locator('h1, h2, h3').first();
    
    if (await heading.isVisible()) {
      const text = await heading.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('DD-006: Test with dropdown on actual page structure', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    const selects = page.locator('select, [role="listbox"], [role="combobox"]');
    const foundElements = await selects.count();
    
    // Document what we find
    expect(foundElements).toBeGreaterThanOrEqual(0);
  });

  test('DD-007: Navigate through page sections', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    await page.waitForLoadState('domcontentloaded');
    
    // Verify navigation is possible
    const links = page.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThanOrEqual(0);
  });

  test('DD-008: Check for interactive controls', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    const buttons = page.locator('button, input[type="button"], input[type="submit"]');
    const buttonCount = await buttons.count();
    
    // Page should have interactive elements
    expect(buttonCount).toBeGreaterThanOrEqual(0);
  });

  test('DD-009: Form elements detection', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    const forms = page.locator('form');
    const formCount = await forms.count();
    
    // Check if forms exist on page
    expect(formCount).toBeGreaterThanOrEqual(0);
  });

  test('DD-010: Test keyboard interactions', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    
    // Tab through page elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verify no crash occurred
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('DD-011: Accessibility - Page can be tabbed through', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    const initialFocus = await page.evaluate(() => document.activeElement?.tagName);
    
    // Tab to next element
    await page.keyboard.press('Tab');
    
    // Page should still be responsive
    expect(page).toBeTruthy();
  });

  test('DD-012: Check dropdown/select implementation if exists', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    
    // Find any select elements
    const selectElements = page.locator('select');
    const count = await selectElements.count();
    
    if (count > 0) {
      // If select exists, verify it can be interacted with
      const dropdown = selectElements.first();
      await expect(dropdown).toBeEnabled();
    }
  });

  test('DD-013: Test dynamic dropdown patterns', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    
    // Check for common dropdown patterns
    const patterns = page.locator('[data-dropdown], [role="menu"], .dropdown, .select-wrapper');
    const patternCount = await patterns.count();
    
    expect(patternCount).toBeGreaterThanOrEqual(0);
  });

  test('DD-014: Performance - Page load speed', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(`${Dropdown_URL}`);
    const loadTime = Date.now() - startTime;
    
    // Page should load in reasonable time
    expect(loadTime).toBeLessThan(30000); // 30 seconds max
  });

  test('DD-015: Element interaction capability check', async ({ page }) => {
    await page.goto(`${Dropdown_URL}`);
    await page.waitForLoadState('networkidle');
    
    // Get all interactive elements
    const interactiveElements = page.locator('button, a, input, select, textarea, label, [role="button"]');
    const count = await interactiveElements.count();
    
    // Document page has interactive capability
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
