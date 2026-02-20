import { test, expect } from '@playwright/test';
import { generateTestCase } from "../ai/aiAgent";
import { login } from '../helpers';

test('AI Generated Test Case', async ({ page }) => {

  // Use AI (at least once so import makes sense)
  const aiStep = generateTestCase("Add to cart flow");
  console.log(aiStep);

  // Reuse login helper
  await login(page);

  // Add to cart flow
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
