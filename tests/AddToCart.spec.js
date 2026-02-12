import { test, expect } from '@playwright/test';
import { login } from './helpers';

test('add to cart and checkout flow', async ({ page }) => {
  // Reuse login helper
  await login(page);

  // Now do add to cart flow
  await page.getByText('Sauce Labs Backpack').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill('test');
  await page.locator('[data-test="lastName"]').fill('QA');
  await page.locator('[data-test="postalCode"]').fill('65001');

  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="back-to-products"]').click();

  // Assertions
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();
});
