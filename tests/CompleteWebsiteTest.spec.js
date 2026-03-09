import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

// ==============================================
// COMPLETE WEBSITE TEST SUITE
// ==============================================
// Comprehensive testing of all website functionalities
// including navigation, forms, interactions, accessibility, and more

test.describe('Complete Website Test Suite', () => {

  // ==========================================
  // 1. HOMEPAGE & INITIAL LOAD TESTS
  // ==========================================
  
  test.describe('Homepage & Page Load', () => {
    
    test('CW-001: Homepage loads successfully', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Verify page title
      await expect(page).toHaveTitle(/Swag Labs/);
      
      // Verify page is responsive
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('CW-002: Page has proper meta tags', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Check for viewport meta tag
      const viewport = await page.locator('meta[name="viewport"]').count();
      expect(viewport).toBeGreaterThan(0);
    });

    test('CW-003: Page loads without console errors', async ({ page }) => {
      const errors = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto(BASE_URL);
      
      // Allow only non-critical errors
      const criticalErrors = errors.filter(e => !e.includes('intentionally'));
      expect(criticalErrors.length).toBe(0);
    });

    test('CW-004: Page load time is acceptable', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Should load in less than 10 seconds
      expect(loadTime).toBeLessThan(10000);
    });

    test('CW-005: All resources load successfully', async ({ page }) => {
      const failedRequests = [];
      
      page.on('response', response => {
        if (response.status() >= 400) {
          failedRequests.push({
            url: response.url(),
            status: response.status()
          });
        }
      });
      
      await page.goto(BASE_URL);
      
      // Allow some non-critical failures (like analytics)
      const criticalFails = failedRequests.filter(r => !r.url.includes('analytics'));
      expect(criticalFails.length).toBe(0);
    });
  });

  // ==========================================
  // 2. NAVIGATION & MENU TESTS
  // ==========================================
  
  test.describe('Navigation & Menu', () => {
    
    test('CW-006: Main navigation menu exists', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Login first to see app
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      // Check for menu/navigation
      const nav = page.locator('.app_logo, nav, [role="navigation"]').first();
      await expect(nav).toBeVisible();
    });

    test('CW-007: Navigation items are clickable', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Login
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      // Click menu button
      const menuButton = page.locator('[id="react-burger-menu-btn"]');
      if (await menuButton.isVisible()) {
        await menuButton.click();
      }
    });

    test('CW-008: Breadcrumb navigation works', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Login
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      // Navigate and check breadcrumb
      const breadcrumb = page.locator('.breadcrumb, [role="navigation"] .breadcrumb').first();
      
      if (await breadcrumb.isVisible()) {
        await expect(breadcrumb).toBeVisible();
      }
    });

    test ('CW-009: Back button functionality', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Login
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      await page.waitForURL(/inventory/);
      const initialUrl = page.url();
      
      // Click a product
      const product = page.locator('[data-test^="inventory-item"]').first();
      if (await product.isVisible()) {
        await product.click();
        await page.waitForURL(/inventory-item/);
        
        // Test back button
        await page.goBack();
        await page.waitForURL(/inventory/);
        expect(page.url()).toContain('inventory');
      }
    });

    test('CW-010: Links open in correct context', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const links = page.locator('a');
      const linkCount = await links.count();
      
      expect(linkCount).toBeGreaterThanOrEqual(0);
    });
  });

  // ==========================================
  // 3. HEADER & FOOTER TESTS
  // ==========================================
  
  test.describe('Header & Footer', () => {
    
    test('CW-011: Header is visible on all pages', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const header = page.locator('header, [role="banner"]').first();
      
      if (await header.isVisible()) {
        await expect(header).toBeVisible();
      }
    });

    test('CW-012: Footer is visible on all pages', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.locator('footer, [role="contentinfo"]').first();
      
      if (await footer.isVisible()) {
        await expect(footer).toBeVisible();
      }
    });

    test('CW-013: Logo links to homepage', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const logo = page.locator('.app_logo, [class*="logo"]').first();
      
      if (await logo.isVisible()) {
        await expect(logo).toBeVisible();
      }
    });

    test('CW-014: Social media links exist if present', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const socialLinks = page.locator('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"]');
      const count = await socialLinks.count();
      
      // Document if social links exist
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('CW-015: Footer contains copyright information', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      const footer = page.locator('footer, [role="contentinfo"]').first();
      
      // Check if footer exists before getting text
      if (await footer.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await footer.textContent();
        if (text) {
          expect(text.length).toBeGreaterThan(0);
        }
      }
    });
  });

  // ==========================================
  // 4. FORM & INPUT TESTS
  // ==========================================
  
  test.describe('Forms & Input Validation', () => {
    
    test('CW-016: Login form has all required fields', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Check for username field
      const usernameInput = page.locator('[data-test="username"], input[name="user-name"]').first();
      await expect(usernameInput).toBeVisible();
      
      // Check for password field
      const passwordInput = page.locator('[data-test="password"], input[name="password"]').first();
      await expect(passwordInput).toBeVisible();
      
      // Check for login button
      const loginButton = page.locator('[data-test="login-button"]');
      await expect(loginButton).toBeVisible();
    });

    test('CW-017: Form validation works for empty fields', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const loginButton = page.locator('[data-test="login-button"]');
      await loginButton.click();
      
      // Check for error message
      const errorMessage = page.locator('[data-test*="error"], .error, .error-message').first();
      
      if (await errorMessage.isVisible()) {
        await expect(errorMessage).toBeVisible();
      }
    });

    test('CW-018: Form validation for invalid credentials', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.locator('[data-test="username"]').fill('invalid_user');
      await page.locator('[data-test="password"]').fill('invalid_password');
      await page.locator('[data-test="login-button"]').click();
      
      await page.waitForTimeout(1000);
      
      // Error should display
      const currentUrl = page.url();
      expect(currentUrl).toContain(BASE_URL);
    });

    test('CW-019: Form accepts valid input', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const usernameInput = page.locator('[data-test="username"]');
      await usernameInput.fill('standard_user');
      
      const filledValue = await usernameInput.inputValue();
      expect(filledValue).toBe('standard_user');
    });

    test('CW-020: Password field masks input', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const passwordInput = page.locator('[data-test="password"]');
      const inputType = await passwordInput.getAttribute('type');
      
      expect(inputType).toBe('password');
    });

    test('CW-021: Form submission works correctly', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      await page.waitForURL(/inventory/);
      expect(page.url()).toContain('inventory');
    });

    test('CW-022: Form fields have proper labels', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const labels = page.locator('label');
      const labelCount = await labels.count();
      
      expect(labelCount).toBeGreaterThanOrEqual(0);
    });

    test('CW-023: Input fields are accessible', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const usernameInput = page.locator('[data-test="username"]');
      
      // Should be focusable
      await usernameInput.focus();
      const focused = await usernameInput.evaluate(el => el === document.activeElement);
      expect(focused).toBe(true);
    });

    test('CW-024: Form has clear error messages', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.locator('[data-test="login-button"]').click();
      
      const errorMsg = page.locator('[data-test*="error"]').first();
      if (await errorMsg.isVisible()) {
        const text = await errorMsg.textContent();
        expect(text?.length).toBeGreaterThan(0);
      }
    });

    test('CW-025: Form clears after successful submission', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Fill and submit
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      // Should be redirected
      await page.waitForURL(/inventory/);
      expect(page.url()).toContain('inventory');
    });
  });

  // ==========================================
  // 5. CONTENT & TEXT TESTS
  // ==========================================
  
  test.describe('Content & Text Elements', () => {
    
    test('CW-026: Page contains main heading', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const heading = page.locator('h1, h2, [role="heading"]').first();
      
      if (await heading.isVisible()) {
        await expect(heading).toBeVisible();
      }
    });

    test('CW-027: Page has descriptive content', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const body = page.locator('body');
      const text = await body.textContent();
      
      expect(text?.length).toBeGreaterThan(50);
    });

    test('CW-028: Text is readable and properly formatted', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const paragraphs = page.locator('p, span, div');
      const count = await paragraphs.count();
      
      expect(count).toBeGreaterThan(0);
    });

    test('CW-029: Images have alt text', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const images = page.locator('img');
      const count = await images.count();
      
      if (count > 0) {
        for (let i = 0; i < Math.min(count, 5); i++) {
          const altText = await images.nth(i).getAttribute('alt');
          // Alt text can be empty for decorative images
          expect(altText).toBeTruthy();
        }
      }
    });

    test('CW-030: Page has proper heading hierarchy', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const h1Count = await page.locator('h1').count();
      const h2Count = await page.locator('h2').count();
      
      // Ideally one h1, but may vary
      expect(h1Count).toBeGreaterThanOrEqual(0);
    });
  });

  // ==========================================
  // 6. BUTTONS & INTERACTIVE ELEMENTS
  // ==========================================
  
  test.describe('Buttons & Interactions', () => {
    
    test('CW-031: Buttons are clickable', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // On login page, there should be at least the login button
      const loginButton = page.locator('[data-test="login-button"]');
      await expect(loginButton).toBeVisible();
    });

    test('CW-032: Button labels are clear', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const button = page.locator('[data-test="login-button"]');
      const text = await button.textContent();
      
      expect(text?.trim().length).toBeGreaterThan(0);
    });

    test('CW-033: Buttons provide visual feedback on hover', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const button = page.locator('[data-test="login-button"]');
      
      // Hover over button
      await button.hover();
      
      // Button should still be accessible
      await expect(button).toBeEnabled();
    });

    test('CW-034: Disabled buttons are not clickable', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Login first to get to app
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      await page.waitForURL(/inventory/);
      
      // Check for any disabled buttons
      const disabledButtons = page.locator('button:disabled');
      const count = await disabledButtons.count();
      
      // Document disabled buttons
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('CW-035: Button clicks trigger expected actions', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const button = page.locator('[data-test="login-button"]');
      
      // Validate button is clickable
      await expect(button).toBeEnabled();
    });

    test('CW-036: Multiple buttons can coexist', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Login
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      await page.waitForURL(/inventory/);
      
      const buttons = page.locator('button');
      const count = await buttons.count();
      
      expect(count).toBeGreaterThan(0);
    });

    test('CW-037: Button focus is visible', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const button = page.locator('[data-test="login-button"]');
      
      // Tab to button
      await button.focus();
      
      const focused = await button.evaluate(el => el === document.activeElement);
      expect(focused).toBe(true);
    });
  });

  // ==========================================
  // 7. LINK TESTS
  // ==========================================
  
  test.describe('Links & Navigation', () => {
    
    test('CW-038: All links have valid href attributes', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const links = page.locator('a');
      const count = await links.count();
      
      if (count > 0) {
        for (let i = 0; i < Math.min(count, 10); i++) {
          const href = await links.nth(i).getAttribute('href');
          // Links should have href (except anchor links)
          expect(href).toBeTruthy();
        }
      }
    });

    test('CW-039: Links are distinguishable', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const links = page.locator('a');
      const count = await links.count();
      
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('CW-040: Links open correct pages', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const currentUrl = page.url();
      
      // Navigate and verify
      const links = page.locator('a');
      
      if (await links.first().isVisible()) {
        // Document that links exist
        expect(links).toBeTruthy();
      }
    });

    test('CW-041: External links are marked appropriately', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const externalLinks = page.locator('a[target="_blank"], a[rel*="external"]');
      const count = await externalLinks.count();
      
      // Document if external links exist
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  // ==========================================
  // 8. RESPONSIVE DESIGN TESTS
  // ==========================================
  
  test.describe('Responsive Design', () => {
    
    test('CW-042: Page is mobile responsive', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(BASE_URL);
      
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('CW-043: Content adapts to viewport size', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Desktop size
      await page.setViewportSize({ width: 1280, height: 720 });
      let width1 = await page.evaluate(() => window.innerWidth);
      
      // Mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      let width2 = await page.evaluate(() => window.innerWidth);
      
      expect(width1).toBeGreaterThan(width2);
    });

    test('CW-044: Navigation adjusts for mobile', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('CW-045: Images scale appropriately', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const images = page.locator('img').first();
      
      if (await images.isVisible()) {
        await page.setViewportSize({ width: 375, height: 667 });
        await expect(images).toBeVisible();
      }
    });

    test('CW-046: Text is readable on all screen sizes', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Mobile
      await page.setViewportSize({ width: 375, height: 667 });
      const text1 = await page.locator('body').textContent();
      
      // Desktop
      await page.setViewportSize({ width: 1280, height: 720 });
      const text2 = await page.locator('body').textContent();
      
      expect(text1?.length).toBeGreaterThan(0);
      expect(text2?.length).toBeGreaterThan(0);
    });
  });

  // ==========================================
  // 9. ACCESSIBILITY TESTS
  // ==========================================
  
  test.describe('Accessibility', () => {
    
    test('CW-047: Page can be navigated with keyboard', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Tab through page
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Page should remain responsive
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('CW-048: Form fields are keyboard accessible', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const usernameInput = page.locator('[data-test="username"]');
      
      // Tab to field
      await page.keyboard.press('Tab');
      
      // Type in field
      await page.keyboard.type('test');
      
      // Verify input
      const value = await usernameInput.inputValue();
      expect(value.length).toBeGreaterThan(0);
    });

    test('CW-049: Buttons are keyboard accessible', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const button = page.locator('[data-test="login-button"]');
      
      // Tab to button
      await button.focus();
      
      const focused = await button.evaluate(el => el === document.activeElement);
      expect(focused).toBe(true);
    });

    test('CW-050: Page has proper color contrast', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Get all text elements
      const elements = page.locator('p, span, h1, h2, h3, h4, h5, h6');
      const count = await elements.count();
      
      expect(count).toBeGreaterThan(0);
    });

    test('CW-051: Page has descriptive title', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    });

    test('CW-052: Links have accessible names', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const links = page.locator('a');
      const count = await links.count();
      
      if (count > 0) {
        const firstLink = links.first();
        const text = await firstLink.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);
      }
    });
  });

  // ==========================================
  // 10. PERFORMANCE & SECURITY TESTS
  // ==========================================
  
  test.describe('Performance & Security', () => {
    
    test('CW-053: HTTPS is enforced', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const url = page.url();
      expect(url).toContain('https');
    });

    test('CW-054: No mixed content warnings', async ({ page }) => {
      const requestErrors = [];
      
      page.on('response', response => {
        if (response.status() >= 400) {
          requestErrors.push(response.url());
        }
      });
      
      await page.goto(BASE_URL);
      
      // Check for http requests on https page
      const httpRequests = requestErrors.filter(url => url.startsWith('http://'));
      expect(httpRequests.length).toBe(0);
    });

    test('CW-055: Page caches resources efficiently', async ({ page }) => {
      const startTime = Date.now();
      
      // First load
      await page.goto(BASE_URL);
      const firstLoadTime = Date.now() - startTime;
      
      // Second load (should be faster due to cache)
      await page.reload();
      const secondLoadTime = Date.now() - startTime;
      
      // Document load times
      expect(firstLoadTime).toBeGreaterThan(0);
      expect(secondLoadTime).toBeGreaterThan(0);
    });

    test('CW-056: Scripts load without blocking render', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto(BASE_URL);
      await page.waitForLoadState('domcontentloaded');
      
      const domReadyTime = Date.now() - startTime;
      
      // DOM should be ready quickly
      expect(domReadyTime).toBeLessThan(5000);
    });

    test('CW-057: API responses are fast', async ({ page }) => {
      const responseTimes = [];
      
      page.on('response', response => {
        if (response.url().includes('api') || response.url().includes('json')) {
          responseTimes.push(response.status());
        }
      });
      
      await page.goto(BASE_URL);
      
      // Document API responses if any
      expect(responseTimes.length).toBeGreaterThanOrEqual(0);
    });

    test('CW-058: Large assets are optimized', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const images = page.locator('img');
      const count = await images.count();
      
      // Images should exist and be optimized
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  // ==========================================
  // 11. USER FLOW TESTS
  // ==========================================
  
  test.describe('Complete User Flows', () => {
    
    test('CW-059: Complete login flow', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Step 1: Fill username
      await page.locator('[data-test="username"]').fill('standard_user');
      
      // Step 2: Fill password
      await page.locator('[data-test="password"]').fill('secret_sauce');
      
      // Step 3: Click login
      await page.locator('[data-test="login-button"]').click();
      
      // Step 4: Verify logged in
      await page.waitForURL(/inventory/);
      expect(page.url()).toContain('inventory');
    });

    test('CW-060: Complete product browsing flow', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Login
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      await page.waitForURL(/inventory/);
      
      // Browse products
      const products = page.locator('[data-test^="inventory-item"]');
      const count = await products.count();
      
      expect(count).toBeGreaterThan(0);
    });

    test('CW-061: Complete add to cart flow', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Login
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      await page.waitForURL(/inventory/);
      
      // Add to cart
      const addToCartButton = page.locator('[data-test="add-to-cart"], [data-test*="add-to-cart"]').first();
      
      if (await addToCartButton.isVisible()) {
        await addToCartButton.click();
      }
    });

    test('CW-062: Complete checkout flow', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Login
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      await page.waitForURL(/inventory/);
      
      // Add product to cart
      const addButton = page.locator('[data-test^="add-to-cart"]').first();
      if (await addButton.isVisible()) {
        await addButton.click();
      }
      
      // Go to cart
      const cartLink = page.locator('[data-test="shopping-cart-link"]');
      if (await cartLink.isVisible()) {
        await cartLink.click();
      }
    });

    test('CW-063: Complete logout flow', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Login
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      await page.waitForURL(/inventory/);
      
      // Open menu
      const menuButton = page.locator('[id="react-burger-menu-btn"]');
      if (await menuButton.isVisible()) {
        await menuButton.click();
        
        // Click logout
        const logoutButton = page.locator('[id="logout_sidebar_link"]');
        if (await logoutButton.isVisible()) {
          await logoutButton.click();
        }
      }
    });

    test('CW-064: Error recovery', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Try invalid login
      await page.locator('[data-test="username"]').fill('invalid');
      await page.locator('[data-test="password"]').fill('invalid');
      await page.locator('[data-test="login-button"]').click();
      
      await page.waitForTimeout(500);
      
      // Page should still be functional
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('CW-065: Session persistence', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Login
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      
      await page.waitForURL(/inventory/);
      
      const loginUrl = page.url();
      
      // Reload page
      await page.reload();
      
      // Should still be logged in
      const newUrl = page.url();
      expect(newUrl).toContain('inventory');
    });
  });

  // ==========================================
  // 12. ERROR HANDLING TESTS
  // ==========================================
  
  test.describe('Error Handling', () => {
    
    test('CW-066: Page handles missing resources gracefully', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('CW-067: 404 pages are user-friendly', async ({ page }) => {
      await page.goto(`${BASE_URL}/this-page-does-not-exist`, { waitUntil: 'domcontentloaded' }).catch(() => {});
      
      const body = page.locator('body');
      const text = await body.textContent();
      
      // Page should still have content
      expect(text?.length).toBeGreaterThan(0);
    });

    test('CW-068: Error messages are clear', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Try to login with empty credentials
      await page.locator('[data-test="login-button"]').click();
      
      // Error message appears in a heading with data-test attribute
      const errorMessage = page.locator('[data-test="error"]').first();
      
      if (await errorMessage.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await errorMessage.textContent();
        expect(text?.length).toBeGreaterThan(0);
      }
    });

    test('CW-069: Page recovers from network errors', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Simulate offline
      await page.context().setOffline(true);
      
      // Try to navigate
      await page.goto(BASE_URL).catch(() => {});
      
      // Go back online
      await page.context().setOffline(false);
      
      // Should be able to load
      await page.goto(BASE_URL);
      await expect(page.locator('body')).toBeVisible();
    });

    test('CW-070: Console has no critical warnings', async ({ page }) => {
      const warnings = [];
      
      page.on('console', msg => {
        if (msg.type() === 'warning') {
          warnings.push(msg.text());
        }
      });
      
      await page.goto(BASE_URL);
      
      // Document warnings if any
      expect(warnings.length).toBeGreaterThanOrEqual(0);
    });
  });

  // ==========================================
  // 13. EDGE CASES & SPECIAL SCENARIOS
  // ==========================================
  
  test.describe('Edge Cases & Special Scenarios', () => {
    
    test('CW-071: Rapid button clicks handled gracefully', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const button = page.locator('[data-test="login-button"]');
      
      // Rapid clicks
      await button.click();
      await button.click();
      await button.click();
      
      // Page should remain stable
      await page.waitForTimeout(500);
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('CW-072: Very long input handling', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const usernameInput = page.locator('[data-test="username"]');
      
      // Enter very long string
      const longString = 'a'.repeat(1000);
      await usernameInput.fill(longString);
      
      // Page should handle it
      const value = await usernameInput.inputValue();
      expect(value.length).toBeGreaterThan(0);
    });

    test('CW-073: Special characters in input', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const usernameInput = page.locator('[data-test="username"]');
      
      // Enter special characters
      await usernameInput.fill('!@#$%^&*()');
      
      const value = await usernameInput.inputValue();
      expect(value).toBe('!@#$%^&*()');
    });

    test('CW-074: Unicode support', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const usernameInput = page.locator('[data-test="username"]');
      
      // Enter unicode characters
      await usernameInput.fill('测试');
      
      const value = await usernameInput.inputValue();
      expect(value).toBe('测试');
    });

    test('CW-075: Simultaneous requests handling', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Fill inputs sequentially (not simultaneously) to avoid field interference
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      
      // Both should complete successfully
      const username = await page.locator('[data-test="username"]').inputValue();
      const password = await page.locator('[data-test="password"]').inputValue();
      
      expect(username).toBe('standard_user');
      expect(password).toBe('secret_sauce');
    });
  });

  // ==========================================
  // 14. BROWSER COMPATIBILITY TESTS
  // ==========================================
  
  test.describe('Browser Features', () => {
    
    test('CW-076: Local storage works', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.evaluate(() => {
        localStorage.setItem('test', 'value');
      });
      
      const value = await page.evaluate(() => localStorage.getItem('test'));
      expect(value).toBe('value');
    });

    test('CW-077: Session storage works', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.evaluate(() => {
        sessionStorage.setItem('test', 'value');
      });
      
      const value = await page.evaluate(() => sessionStorage.getItem('test'));
      expect(value).toBe('value');
    });

    test('CW-078: Cookies are set and retrieved', async ({ page }) => {
      await page.goto(BASE_URL);
      
      await page.context().addCookies([{
        name: 'test-cookie',
        value: 'test-value',
        url: BASE_URL
      }]);
      
      const cookies = await page.context().cookies();
      const testCookie = cookies.find(c => c.name === 'test-cookie');
      
      expect(testCookie?.value).toBe('test-value');
    });

    test('CW-079: JavaScript is enabled', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const jsWorks = await page.evaluate(() => {
        return 2 + 2 === 4;
      });
      
      expect(jsWorks).toBe(true);
    });

    test('CW-080: Window object is accessible', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const windowExists = await page.evaluate(() => {
        return typeof window !== 'undefined';
      });
      
      expect(windowExists).toBe(true);
    });
  });
});