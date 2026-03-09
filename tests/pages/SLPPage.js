import { expect } from '@playwright/test';

const SLP_URL = 'https://smartlivingpakistan.com';

export class SLPPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  async goto(path = '', options = {}) {
    await this.page.goto(`${SLP_URL}${path}`, options);
    await this.page.waitForLoadState('load');
  }

  nav() {
    return this.page.locator('nav, [role="navigation"]').first();
  }

  logo() {
    return this.page.locator('a[href="/"], [class*="logo"]').first();
  }

  footer() {
    return this.page.locator('footer, [class*="footer"]').first();
  }

  searchInput() {
    return this.page.locator('input[type="search"], input[placeholder*="search" i], [class*="search"] input').first();
  }

  firstProductLink() {
    return this.page.locator('a[href*="product"], [class*="product"]').first();
  }

  productImage() {
    return this.page.locator('img[alt*="product" i], [class*="product"] img').first();
  }

  addToCartButton() {
    return this.page.locator('button:has-text("Add to Cart"), button:has-text("Add"), [class*="add-cart"]').first();
  }

  cartSelector() {
    return this.page.locator('[class*="cart"], [class*="bag"]').first();
  }

  async goToCart() {
    await this.goto('/cart');
  }

  async goToCheckout() {
    await this.goto('/checkout');
  }

  async goToLogin() {
    await this.goto('/login');
  }

  async goToRegister() {
    await this.goto('/register');
  }

  async goToContact() {
    await this.goto('/contact');
  }

  async getCartCountText() {
    return await this.cartSelector().textContent().catch(() => '0');
  }

  async fillBilling({ name, email }) {
    const nameInput = this.page.locator('input[name*="name" i]').first();
    if (await nameInput.isVisible()) await nameInput.fill(name || 'Test User');

    const emailInput = this.page.locator('input[name*="email" i]').first();
    if (await emailInput.isVisible()) await emailInput.fill(email || 'test@example.com');
  }

  async imagesCount(limit = 5) {
    const imgs = this.page.locator('img');
    return Math.min(await imgs.count(), limit);
  }

  async hasConsoleErrors(ignoreText = []) {
    const errors = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    // allow caller to navigate first
    await this.page.waitForLoadState('networkidle');
    return errors.filter(e => !ignoreText.some(i => e.includes(i)));
  }
}

export default SLPPage;
