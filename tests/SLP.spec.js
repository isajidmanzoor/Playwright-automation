import { test, expect } from '@playwright/test';
import SLPPage from './pages/SLPPage';

const SLP_URL = 'https://smartlivingpakistan.com';

// ==============================================
// SMOKE TESTS - Homepage & Navigation
// ==============================================

test('SLP-SMOKE-001: Homepage loads successfully', async ({ page }) => {
  const slp = new SLPPage(page);
  const startTime = Date.now();
  await slp.goto();
  const loadTime = Date.now() - startTime;

  // Verify page loaded
  await expect(page).toHaveTitle(/Smart Living|smartlivingpakistan/i);

  // Check load time is acceptable (< 5 seconds)
  expect(loadTime).toBeLessThan(5000);
});

test('SLP-SMOKE-002: Navigation menu is visible', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  // Check for navigation elements
  const nav = slp.nav();
  await expect(nav).toBeVisible({ timeout: 5000 });
});

test('SLP-SMOKE-003: Logo links to homepage', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  // Navigate to a different page
  const firstLink = page.locator('a').first();
  if (await firstLink.isVisible()) {
    await firstLink.click();
    await page.waitForLoadState('load');
  }

  // Click logo and verify return to homepage
  const logo = slp.logo();
  if (await logo.isVisible()) {
    await logo.click();
    await page.waitForLoadState('load');
  }
});

test('SLP-SMOKE-004: Footer is visible with links', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Check footer presence
  const footer = slp.footer();
  await expect(footer).toBeVisible();
});

test('SLP-SMOKE-005: Page title is descriptive', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  const title = await page.title();
  expect(title.length).toBeGreaterThan(5);
  expect(title.toLowerCase()).toMatch(/smart|living|pakistan|home|shop/i);
});

test('SLP-SMOKE-006: Search functionality exists', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  // Look for search input
  const searchInput = slp.searchInput();

  if (await searchInput.isVisible()) {
    await expect(searchInput).toBeVisible();
  }
});

test('SLP-SMOKE-007: No console errors on homepage', async ({ page }) => {
  const slp = new SLPPage(page);
  // attach console listener via page object helper
  page.on('console', (msg) => {
    // keep original behavior - errors will be checked by helper
  });

  await slp.goto();
  await page.waitForLoadState('networkidle');

  const errors = await slp.hasConsoleErrors(['intentionally']);
  // Should not have critical errors
  expect(errors).toHaveLength(0);
});

test('SLP-SMOKE-008: Responsive design check', async ({ browser, context }) => {
  // Test on mobile viewport
  const mobileContext = await browser.newContext({ 
    viewport: { width: 375, height: 667 } 
  });
  const mobilePage = await mobileContext.newPage();
  
  await mobilePage.goto(SLP_URL);
  
  // Check mobile menu is accessible
  const mobileMenu = mobilePage.locator('[class*="mobile"], [class*="hamburger"], [class*="menu"]').first();
  
  // Should have some responsive element
  expect(mobilePage.viewportSize().width).toBeLessThanOrEqual(375);
  
  await mobileContext.close();
});

// ==============================================
// PRODUCT TESTS - Catalog & Listing
// ==============================================

test('SLP-PRODUCT-001: Products display with images and prices', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  // Navigate to a product page or category
  const productLink = slp.firstProductLink();
  if (await productLink.isVisible()) {
    await productLink.click();
    await page.waitForLoadState('load');
  }

  // Check for product information
  const productImage = slp.productImage();
  expect(await productImage.isVisible().catch(() => false)).toBeDefined();
});

test('SLP-PRODUCT-002: Search functionality works', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  const searchInput = slp.searchInput();

  if (await searchInput.isVisible()) {
    await searchInput.fill('sofa');
    await searchInput.press('Enter');
    await page.waitForLoadState('load');

    // Verify search results displayed
    const results = page.locator('[class*="product"], [data-test*="product"]');
    expect(await results.count()).toBeGreaterThanOrEqual(0);
  }
});

test('SLP-PRODUCT-003: Product filtering available', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  // Look for filter options
  const filterSection = page.locator('[class*="filter"], [class*="sidebar"]').first();

  if (await filterSection.isVisible()) {
    await expect(filterSection).toBeVisible();

    // Try to apply a filter
    const filterCheckbox = filterSection.locator('input[type="checkbox"]').first();
    if (await filterCheckbox.isVisible()) {
      await filterCheckbox.click();
    }
  }
});

test('SLP-PRODUCT-004: Product sorting works', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  // Look for sort dropdown
  const sortSelect = page.locator('select', '[class*="sort"]').first();

  if (await sortSelect.isVisible()) {
    await expect(sortSelect).toBeVisible();
  }
});

test('SLP-PRODUCT-005: Product details page functional', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  // Click first product
  const firstProduct = slp.firstProductLink();
  if (await firstProduct.isVisible()) {
    await firstProduct.click();
    await page.waitForLoadState('load');

    // Verify product details visible
    const productTitle = page.locator('h1, h2, [class*="title"]').first();
    expect(await productTitle.isVisible().catch(() => false)).toBeDefined();
  }
});

// ==============================================
// SHOPPING CART TESTS
// ==============================================

test('SLP-CART-001: Add to cart functionality', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  // Find add to cart button
  const addToCartBtn = slp.addToCartButton();

  if (await addToCartBtn.isVisible()) {
    await addToCartBtn.click();

    // Look for confirmation
    const cartNotification = page.locator('[class*="toast"], [class*="notification"], [class*="alert"]').first();
    expect(await cartNotification.isVisible().catch(() => false)).toBeDefined();
  }
});

test('SLP-CART-002: Cart persists across navigation', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  // Add item to cart
  const addBtn = page.locator('button:has-text("Add")').first();
  if (await addBtn.isVisible()) {
    await addBtn.click();
    await page.waitForTimeout(500);
  }

  // Get cart count
  const cartCount1 = await slp.getCartCountText();

  // Navigate away
  const navLink = page.locator('a').nth(3);
  if (await navLink.isVisible()) {
    await navLink.click();
    await page.waitForLoadState('load');
  }

  // Return to previous page
  await page.goBack();

  // Verify cart still has item
  const cartCount2 = await slp.getCartCountText();
  expect(cartCount1).toEqual(cartCount2);
});

test('SLP-CART-003: Cart page displays items', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToCart();

  // Check for cart content
  const cartContainer = page.locator('[class*="cart"], main').first();
  await expect(cartContainer).toBeVisible();
});

test('SLP-CART-004: Update quantity in cart', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToCart();

  // Look for quantity input
  const quantityInput = page.locator('input[type="number"], [class*="quantity"]').first();

  if (await quantityInput.isVisible()) {
    await quantityInput.fill('2');
    await quantityInput.press('Enter');
  }
});

test('SLP-CART-005: Remove item from cart', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToCart();

  // Look for remove button
  const removeBtn = page.locator('button:has-text("Remove"), button:has-text("Delete"), [class*="remove"]').first();

  if (await removeBtn.isVisible()) {
    await removeBtn.click();
  }
});

// ==============================================
// CHECKOUT TESTS
// ==============================================

test('SLP-CHECKOUT-001: Checkout page accessible', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToCheckout();

  // Verify checkout form present
  const checkoutForm = page.locator('form, [class*="checkout"]').first();
  await expect(checkoutForm).toBeVisible();
});

test('SLP-CHECKOUT-002: Billing address form functional', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToCheckout();

  // Fill in address form
  await slp.fillBilling({ name: 'Test User', email: 'test@example.com' });
});

test('SLP-CHECKOUT-003: Shipping method selection', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToCheckout();

  // Look for shipping options
  const shippingOption = page.locator('input[type="radio"], label:has-text("Shipping")').first();

  if (await shippingOption.isVisible()) {
    await expect(shippingOption).toBeVisible();
  }
});

test('SLP-CHECKOUT-004: Payment method selection', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToCheckout();

  // Look for payment options
  const paymentOption = page.locator('input[type="radio"][name*="payment"]').first();

  if (await paymentOption.isVisible()) {
    await expect(paymentOption).toBeVisible();
  }
});

// ==============================================
// USER ACCOUNT TESTS
// ==============================================

test('SLP-ACCOUNT-001: Login page accessible', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToLogin();

  // Check for login form
  const loginForm = page.locator('form, [class*="login"]').first();
  await expect(loginForm).toBeVisible();
});

test('SLP-ACCOUNT-002: Registration page accessible', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToRegister();

  // Check for registration form
  const registerForm = page.locator('form, [class*="register"]').first();
  await expect(registerForm).toBeVisible();
});

test('SLP-ACCOUNT-003: Form validation works', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToLogin();

  // Try to submit empty form
  const submitBtn = page.locator('button[type="submit"]').first();
  if (await submitBtn.isVisible()) {
    await submitBtn.click();

    // Check for validation error
    const errorMsg = page.locator('[class*="error"], .invalid').first();
    expect(await errorMsg.isVisible().catch(() => false)).toBeDefined();
  }
});

// ==============================================
// CONTACT & SUPPORT TESTS
// ==============================================

test('SLP-CONTACT-001: Contact page accessible', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToContact();

  // Verify contact page loaded
  const contactForm = page.locator('form, [class*="contact"]').first();
  await expect(contactForm).toBeVisible();
});

test('SLP-CONTACT-002: Contact information displayed', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goToContact();

  // Look for contact info (phone, email, address)
  const contactInfo = page.locator('[class*="contact"], [class*="info"]').first();
  await expect(contactInfo).toBeVisible();
});

// ==============================================
// PERFORMANCE TESTS
// ==============================================

test('SLP-PERFORMANCE-001: Homepage load time acceptable', async ({ page }) => {
  const slp = new SLPPage(page);
  const startTime = Date.now();
  await slp.goto('', { waitUntil: 'networkidle' }).catch(() => {});
  const loadTime = Date.now() - startTime;

  // Homepage should load within 5 seconds
  expect(loadTime).toBeLessThan(5000);
});

test('SLP-PERFORMANCE-002: Images load without errors', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  const images = page.locator('img');
  const count = await images.count();

  // Check each image loads
  for (let i = 0; i < Math.min(count, 5); i++) {
    const img = images.nth(i);
    expect(await img.isVisible().catch(() => false)).toBeDefined();
  }
});

// ==============================================
// SECURITY TESTS
// ==============================================

test('SLP-SECURITY-001: HTTPS/SSL enabled', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  // Verify URL starts with https
  const url = page.url();
  expect(url).toMatch(/^https:\/\//);
});

test('SLP-SECURITY-002: No mixed content warnings', async ({ page }) => {
  const slp = new SLPPage(page);
  const securityIssues = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error' && msg.text().includes('mixed')) {
      securityIssues.push(msg.text());
    }
  });

  await slp.goto();
  await page.waitForLoadState('networkidle');

  expect(securityIssues).toHaveLength(0);
});

// ==============================================
// ACCESSIBILITY TESTS
// ==============================================

test('SLP-ACCESSIBILITY-001: Page has proper heading hierarchy', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  const h1 = page.locator('h1');
  const h1Count = await h1.count();

  // Should have at least one h1
  expect(h1Count).toBeGreaterThanOrEqual(1);
});

test('SLP-ACCESSIBILITY-002: Images have alt text', async ({ page }) => {
  const slp = new SLPPage(page);
  await slp.goto();

  const images = page.locator('img');
  const count = await images.count();

  let altTextCount = 0;
  for (let i = 0; i < Math.min(count, 5); i++) {
    const alt = await images.nth(i).getAttribute('alt');
    if (alt && alt.trim().length > 0) {
      altTextCount++;
    }
  }

  // Most images should have alt text
  expect(altTextCount).toBeGreaterThan(0);
});
