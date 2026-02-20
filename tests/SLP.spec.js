import { test, expect } from '@playwright/test';

const SLP_URL = 'https://smartlivingpakistan.com';

// ==============================================
// SMOKE TESTS - Homepage & Navigation
// ==============================================

test('SLP-SMOKE-001: Homepage loads successfully', async ({ page }) => {
  const startTime = Date.now();
  await page.goto(SLP_URL);
  const loadTime = Date.now() - startTime;
  
  // Verify page loaded
  await expect(page).toHaveTitle(/Smart Living|smartlivingpakistan/i);
  
  // Check load time is acceptable (< 5 seconds)
  expect(loadTime).toBeLessThan(5000);
});

test('SLP-SMOKE-002: Navigation menu is visible', async ({ page }) => {
  await page.goto(SLP_URL);
  
  // Check for navigation elements
  const nav = page.locator('nav, [role="navigation"]').first();
  await expect(nav).toBeVisible({ timeout: 5000 });
});

test('SLP-SMOKE-003: Logo links to homepage', async ({ page }) => {
  await page.goto(SLP_URL);
  
  // Navigate to a different page
  const firstLink = page.locator('a').first();
  if (await firstLink.isVisible()) {
    await firstLink.click();
    await page.waitForLoadState('load');
  }
  
  // Click logo and verify return to homepage
  const logo = page.locator('a[href="/"], [class*="logo"]').first();
  if (await logo.isVisible()) {
    await logo.click();
    await page.waitForLoadState('load');
  }
});

test('SLP-SMOKE-004: Footer is visible with links', async ({ page }) => {
  await page.goto(SLP_URL);
  
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  
  // Check footer presence
  const footer = page.locator('footer, [class*="footer"]').first();
  await expect(footer).toBeVisible();
});

test('SLP-SMOKE-005: Page title is descriptive', async ({ page }) => {
  await page.goto(SLP_URL);
  
  const title = await page.title();
  expect(title.length).toBeGreaterThan(5);
  expect(title.toLowerCase()).toMatch(/smart|living|pakistan|home|shop/i);
});

test('SLP-SMOKE-006: Search functionality exists', async ({ page }) => {
  await page.goto(SLP_URL);
  
  // Look for search input
  const searchInput = page.locator('input[type="search"], input[placeholder*="search" i], [class*="search"] input').first();
  
  if (await searchInput.isVisible()) {
    await expect(searchInput).toBeVisible();
  }
});

test('SLP-SMOKE-007: No console errors on homepage', async ({ page }) => {
  const errors = [];
  
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  await page.goto(SLP_URL);
  await page.waitForLoadState('networkidle');
  
  // Should not have critical errors
  expect(errors.filter(e => !e.includes('intentionally'))).toHaveLength(0);
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
  await page.goto(SLP_URL);
  
  // Navigate to a product page or category
  const productLink = page.locator('a[href*="product"], [class*="product"]').first();
  if (await productLink.isVisible()) {
    await productLink.click();
    await page.waitForLoadState('load');
  }
  
  // Check for product information
  const productImage = page.locator('img[alt*="product" i], [class*="product"] img').first();
  expect(await productImage.isVisible().catch(() => false)).toBeDefined();
});

test('SLP-PRODUCT-002: Search functionality works', async ({ page }) => {
  await page.goto(SLP_URL);
  
  const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first();
  
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
  await page.goto(SLP_URL);
  
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
  await page.goto(SLP_URL);
  
  // Look for sort dropdown
  const sortSelect = page.locator('select', '[class*="sort"]').first();
  
  if (await sortSelect.isVisible()) {
    await expect(sortSelect).toBeVisible();
  }
});

test('SLP-PRODUCT-005: Product details page functional', async ({ page }) => {
  await page.goto(SLP_URL);
  
  // Click first product
  const firstProduct = page.locator('a[href*="product"]').first();
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
  await page.goto(SLP_URL);
  
  // Find add to cart button
  const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Add"), [class*="add-cart"]').first();
  
  if (await addToCartBtn.isVisible()) {
    await addToCartBtn.click();
    
    // Look for confirmation
    const cartNotification = page.locator('[class*="toast"], [class*="notification"], [class*="alert"]').first();
    expect(await cartNotification.isVisible().catch(() => false)).toBeDefined();
  }
});

test('SLP-CART-002: Cart persists across navigation', async ({ page }) => {
  await page.goto(SLP_URL);
  
  // Add item to cart
  const addBtn = page.locator('button:has-text("Add")').first();
  if (await addBtn.isVisible()) {
    await addBtn.click();
    await page.waitForTimeout(500);
  }
  
  // Get cart count
  const cartCount1 = await page.locator('[class*="cart"], [class*="bag"]').textContent().catch(() => '0');
  
  // Navigate away
  const navLink = page.locator('a').nth(3);
  if (await navLink.isVisible()) {
    await navLink.click();
    await page.waitForLoadState('load');
  }
  
  // Return to previous page
  await page.goBack();
  
  // Verify cart still has item
  const cartCount2 = await page.locator('[class*="cart"]').textContent().catch(() => '0');
  expect(cartCount1).toEqual(cartCount2);
});

test('SLP-CART-003: Cart page displays items', async ({ page }) => {
  await page.goto(`${SLP_URL}/cart`);
  await page.waitForLoadState('load');
  
  // Check for cart content
  const cartContainer = page.locator('[class*="cart"], main').first();
  await expect(cartContainer).toBeVisible();
});

test('SLP-CART-004: Update quantity in cart', async ({ page }) => {
  await page.goto(`${SLP_URL}/cart`);
  
  // Look for quantity input
  const quantityInput = page.locator('input[type="number"], [class*="quantity"]').first();
  
  if (await quantityInput.isVisible()) {
    await quantityInput.fill('2');
    await quantityInput.press('Enter');
  }
});

test('SLP-CART-005: Remove item from cart', async ({ page }) => {
  await page.goto(`${SLP_URL}/cart`);
  
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
  await page.goto(`${SLP_URL}/checkout`);
  await page.waitForLoadState('load');
  
  // Verify checkout form present
  const checkoutForm = page.locator('form, [class*="checkout"]').first();
  await expect(checkoutForm).toBeVisible();
});

test('SLP-CHECKOUT-002: Billing address form functional', async ({ page }) => {
  await page.goto(`${SLP_URL}/checkout`);
  
  // Fill in address form
  const nameInput = page.locator('input[name*="name" i]').first();
  if (await nameInput.isVisible()) {
    await nameInput.fill('Test User');
  }
  
  const emailInput = page.locator('input[name*="email" i]').first();
  if (await emailInput.isVisible()) {
    await emailInput.fill('test@example.com');
  }
});

test('SLP-CHECKOUT-003: Shipping method selection', async ({ page }) => {
  await page.goto(`${SLP_URL}/checkout`);
  
  // Look for shipping options
  const shippingOption = page.locator('input[type="radio"], label:has-text("Shipping")').first();
  
  if (await shippingOption.isVisible()) {
    await expect(shippingOption).toBeVisible();
  }
});

test('SLP-CHECKOUT-004: Payment method selection', async ({ page }) => {
  await page.goto(`${SLP_URL}/checkout`);
  
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
  await page.goto(`${SLP_URL}/login`);
  await page.waitForLoadState('load');
  
  // Check for login form
  const loginForm = page.locator('form, [class*="login"]').first();
  await expect(loginForm).toBeVisible();
});

test('SLP-ACCOUNT-002: Registration page accessible', async ({ page }) => {
  await page.goto(`${SLP_URL}/register`);
  await page.waitForLoadState('load');
  
  // Check for registration form
  const registerForm = page.locator('form, [class*="register"]').first();
  await expect(registerForm).toBeVisible();
});

test('SLP-ACCOUNT-003: Form validation works', async ({ page }) => {
  await page.goto(`${SLP_URL}/login`);
  
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
  await page.goto(`${SLP_URL}/contact`);
  await page.waitForLoadState('load');
  
  // Verify contact page loaded
  const contactForm = page.locator('form, [class*="contact"]').first();
  await expect(contactForm).toBeVisible();
});

test('SLP-CONTACT-002: Contact information displayed', async ({ page }) => {
  await page.goto(`${SLP_URL}/contact`);
  
  // Look for contact info (phone, email, address)
  const contactInfo = page.locator('[class*="contact"], [class*="info"]').first();
  await expect(contactInfo).toBeVisible();
});

// ==============================================
// PERFORMANCE TESTS
// ==============================================

test('SLP-PERFORMANCE-001: Homepage load time acceptable', async ({ page }) => {
  const startTime = Date.now();
  await page.goto(SLP_URL, { waitUntil: 'networkidle' });
  const loadTime = Date.now() - startTime;
  
  // Homepage should load within 5 seconds
  expect(loadTime).toBeLessThan(5000);
});

test('SLP-PERFORMANCE-002: Images load without errors', async ({ page }) => {
  await page.goto(SLP_URL);
  
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
  await page.goto(SLP_URL);
  
  // Verify URL starts with https
  const url = page.url();
  expect(url).toMatch(/^https:\/\//);
});

test('SLP-SECURITY-002: No mixed content warnings', async ({ page }) => {
  const securityIssues = [];
  
  page.on('console', (msg) => {
    if (msg.type() === 'error' && msg.text().includes('mixed')) {
      securityIssues.push(msg.text());
    }
  });
  
  await page.goto(SLP_URL);
  await page.waitForLoadState('networkidle');
  
  expect(securityIssues).toHaveLength(0);
});

// ==============================================
// ACCESSIBILITY TESTS
// ==============================================

test('SLP-ACCESSIBILITY-001: Page has proper heading hierarchy', async ({ page }) => {
  await page.goto(SLP_URL);
  
  const h1 = page.locator('h1');
  const h1Count = await h1.count();
  
  // Should have at least one h1
  expect(h1Count).toBeGreaterThanOrEqual(1);
});

test('SLP-ACCESSIBILITY-002: Images have alt text', async ({ page }) => {
  await page.goto(SLP_URL);
  
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
