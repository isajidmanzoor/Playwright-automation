import { test, expect } from '@playwright/test';

test('Navigate to Islamic Wall Art page', async ({ page }) => {
  await page.goto('https://smartivingpakistan.com/');
  await page.getByLabel('Primary Navigation')
            .getByRole('link', { name: 'Islamic Wall Art' })
            .click();

  await expect(page).toHaveURL(/islamic-wall-art/);
});

test('Navigate to Garden Lights page', async ({ page }) => {
  await page.goto('https://smartlivingpakistan.com/');
  await page.getByLabel('Primary Navigation')
            .getByRole('link', { name: 'Garden Lights' })
            .click();

  await expect(page).toHaveURL(/garden-lights/);
});