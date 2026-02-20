import { test, expect } from '@playwright/test';

test('Check contact page title', async ({ page }) => {
  await page.goto('https://deltaprimeaisolutions.com/contact');

  // Hard assertions
  await expect(page).toHaveTitle(/DeltaPrime AI/);
  await expect(page).toHaveURL(/contact/);

  const nav = page.getByLabel('Main navigation');

  await nav.getByRole('link', { name: 'Home', exact: true }).click();
  await nav.getByRole('link', { name: 'Services', exact: true }).click();
  await nav.getByRole('link', { name: 'About', exact: true }).click();
});

test('Darkmode vs Lightmode', async ({ page }) => {
  await page.goto('https://deltaprimeaisolutions.com');

  await page.getByRole('button', { name: /dark mode/i }).click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: /light mode/i }).click();
  await page.waitForTimeout(2000);

  const nav = page.getByLabel('Main navigation');
  await nav.getByRole('link', { name: 'Get Started', exact: true }).click();
});
